import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, OrbitControls } from '@react-three/drei';
import './SkillsGlobe.css';

function fibonacciSphere(count, radius) {
  const golden = Math.PI * (3 - Math.sqrt(5));

  return Array.from({ length: count }, (_, index) => {
    const y = 1 - (2 * (index + 0.5)) / count;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * index;

    return new THREE.Vector3(Math.cos(theta) * r, y, Math.sin(theta) * r).multiplyScalar(radius);
  });
}

const ICON_PX = 40;
const RADIUS = 3.35;
const DRAG_THRESHOLD = 6;
const UNMOUNT_DELAY_MS = 1500;

const world = new THREE.Vector3();
const direction = new THREE.Vector3();
const cameraDirection = new THREE.Vector3();
const ndc = new THREE.Vector3();
const view = new THREE.Vector3();

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

function Globe({ count, radius, accent, items, motion }) {
  const group = useRef(null);
  const points = useMemo(() => fibonacciSphere(count, radius), [count, radius]);
  const shell = radius * 0.85;
  const iconWorld = THREE.MathUtils.clamp((radius * 0.8) / Math.sqrt(count), 0.32, 0.6);

  useFrame((state, delta) => {
    const currentGroup = group.current;
    if (!currentGroup) return;

    const { camera } = state;
    const { width, height } = state.size;

    if (motion) currentGroup.rotation.y += delta * 0.06;

    currentGroup.updateWorldMatrix(true, false);
    camera.updateMatrixWorld();
    cameraDirection.copy(camera.position).normalize();

    const tanHalfFov = Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2);

    points.forEach((point, index) => {
      const el = items.current[index];
      if (!el) return;

      world.copy(point).applyMatrix4(currentGroup.matrixWorld);

      const front = THREE.MathUtils.clamp(
        (direction.copy(world).normalize().dot(cameraDirection) - 0.1) * 2,
        0,
        1
      );

      ndc.copy(world).project(camera);
      const x = (ndc.x + 1) * 0.5 * width;
      const y = (1 - ndc.y) * 0.5 * height;
      const depth = -view.copy(world).applyMatrix4(camera.matrixWorldInverse).z;
      const pxPerUnit = height / (2 * tanHalfFov * depth);
      const scale = ((iconWorld * pxPerUnit) / ICON_PX) * (0.8 + 0.4 * front);

      el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) scale(${scale})`;
      el.style.opacity = String(front);
      el.style.zIndex = String(Math.round(front * 100));
      el.style.pointerEvents = front > 0.8 ? 'auto' : 'none';
      el.style.visibility = front < 0.02 ? 'hidden' : 'visible';
    });
  });

  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[shell, 2]} />
        <meshBasicMaterial color={accent} wireframe transparent opacity={0.16} />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[shell, 2]} />
        <meshBasicMaterial color={accent} wireframe transparent opacity={0.04} side={THREE.BackSide} />
      </mesh>
      <mesh>
        <sphereGeometry args={[shell * 0.98, 32, 32]} />
        <meshBasicMaterial color="#000" transparent opacity={0.18} side={THREE.DoubleSide} />
      </mesh>
      <mesh>
        <sphereGeometry args={[shell * 1.04, 32, 32]} />
        <meshBasicMaterial
          color={accent}
          transparent
          opacity={0.07}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}

function FitCamera({ radius }) {
  const camera = useThree((state) => state.camera);
  const aspect = useThree((state) => state.size.width / state.size.height);

  useLayoutEffect(() => {
    const verticalFov = THREE.MathUtils.degToRad(camera.fov);
    const horizontalFov = 2 * Math.atan(Math.tan(verticalFov / 2) * aspect);
    camera.position.setLength(radius / Math.sin(Math.min(verticalFov, horizontalFov) / 2));
  }, [camera, aspect, radius]);

  return null;
}

export default function SkillsGlobe({ skills, lang = 'pt' }) {
  const container = useRef(null);
  const items = useRef([]);
  const dragStart = useRef(null);
  const [visible, setVisible] = useState(true);
  const [mounted, setMounted] = useState(true);
  const [motion] = useState(() => !prefersReducedMotion());

  useEffect(() => {
    const element = container.current;
    if (!element || !('IntersectionObserver' in window)) return undefined;

    let timer;
    const observer = new IntersectionObserver(
      ([entry]) => {
        clearTimeout(timer);
        setVisible(entry.isIntersecting);

        if (entry.isIntersecting) {
          setMounted(true);
        } else {
          timer = setTimeout(() => setMounted(false), UNMOUNT_DELAY_MS);
        }
      },
      { rootMargin: '200px 0px' }
    );

    observer.observe(element);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  const onPointerDown = (event) => {
    dragStart.current = { x: event.clientX, y: event.clientY };
  };

  const onClickCapture = (event) => {
    const start = dragStart.current;
    if (start && Math.hypot(event.clientX - start.x, event.clientY - start.y) > DRAG_THRESHOLD) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  return (
    <div className="skills-globe">
      <div
        ref={container}
        className="skills-globe__stage"
        onPointerDown={onPointerDown}
        onClickCapture={onClickCapture}
      >
        {mounted && (
          <Canvas
            eventSource={container}
            frameloop={visible ? 'always' : 'never'}
            camera={{ position: [0, 0, 9], fov: 50 }}
            dpr={[1, 1.5]}
            gl={{ alpha: true, antialias: true }}
          >
            <fog attach="fog" args={['#101319', 10, 25]} />
            <FitCamera radius={RADIUS * 1.2} />
            <Float
              speed={motion ? 1 : 0}
              rotationIntensity={motion ? 0.2 : 0}
              floatIntensity={motion ? 0.2 : 0}
            >
              <Globe
                count={skills.length}
                radius={RADIUS}
                accent="#2dd4bf"
                items={items}
                motion={motion}
              />
            </Float>
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              autoRotate={motion}
              autoRotateSpeed={0.8}
              minPolarAngle={Math.PI / 3}
              maxPolarAngle={Math.PI / 1.5}
            />
          </Canvas>
        )}

        <ul className="skills-globe__layer">
          {skills.map((skill, index) => (
            <li key={skill.name} className="skills-globe__li">
              <a
                ref={(el) => {
                  items.current[index] = el;
                }}
                className="skills-globe__item"
                href={skill.link}
                target="_blank"
                rel="noopener noreferrer"
                draggable={false}
                aria-label={skill.name}
              >
                <img className="skills-globe__icon" src={skill.iconUrl} alt="" draggable={false} loading="lazy" />
                <span className="skills-globe__label">{skill.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <p className="skills-globe__hint">
        {lang === 'pt'
          ? 'Arraste para girar o globo e clique em uma tecnologia para saber mais.'
          : 'Drag to rotate the globe and click a technology to learn more.'}
      </p>
    </div>
  );
}
