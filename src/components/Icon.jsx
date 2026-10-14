export default function Icon({ name, size = 18 }) {
  const props = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
  };

  const icons = {
    check: (
      <svg {...props}>
        <path d="m5 12 4 4L19 6" />
      </svg>
    ),
    external: (
      <svg {...props}>
        <path d="M15 3h6v6M21 3l-9 9" />
        <path d="M10 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5" />
      </svg>
    ),
    clock: (
      <svg {...props}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    ),
    github: (
      <svg {...props}>
        <path d="M9 19c-4 1-4-2-6-2M15 22v-4a3.5 3.5 0 0 0-1-2.7c3.3-.4 6.8-1.6 6.8-7.3a5.7 5.7 0 0 0-1.6-4 5.3 5.3 0 0 0-.1-4S17.8-.4 15 1.5a14 14 0 0 0-6 0C6.2-.4 4.9 0 4.9 0a5.3 5.3 0 0 0-.1 4 5.7 5.7 0 0 0-1.6 4c0 5.7 3.5 6.9 6.8 7.3A3.5 3.5 0 0 0 9 18v4" />
      </svg>
    ),
    mail: (
      <svg {...props}>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </svg>
    ),
    folder: (
      <svg {...props}>
        <path d="M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      </svg>
    ),
    bot: (
      <svg {...props}>
        <rect x="5" y="8" width="14" height="10" rx="3" />
        <path d="M12 4v4" />
        <path d="M9 13h.01" />
        <path d="M15 13h.01" />
        <path d="M9 18v2" />
        <path d="M15 18v2" />
      </svg>
    ),
    download: (
      <svg {...props}>
        <path d="M12 3v12" />
        <path d="m7 10 5 5 5-5" />
        <path d="M5 21h14" />
      </svg>
    ),
    eye: (
      <svg {...props}>
        <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
    arrow: (
      <svg {...props}>
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </svg>
    ),
    education: (
      <svg {...props}>
        <path d="m22 10-10-5-10 5 10 5 10-5Z" />
        <path d="M6 12v5c3 2 9 2 12 0v-5" />
      </svg>
    ),
    book: (
      <svg {...props}>
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15Z" />
      </svg>
    ),
    chart: (
      <svg {...props}>
        <path d="M4 19V5" />
        <path d="M4 19h16" />
        <path d="m7 15 4-4 3 3 5-7" />
      </svg>
    ),
    code: (
      <svg {...props}>
        <path d="m8 9-4 3 4 3" />
        <path d="m16 9 4 3-4 3" />
        <path d="m14 5-4 14" />
      </svg>
    ),
    phone: (
      <svg {...props}>
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.78 19.78 0 0 1 3.08 5.18 2 2 0 0 1 5.06 3h3a2 2 0 0 1 2 1.72c.12.9.33 1.77.62 2.6a2 2 0 0 1-.45 2.11L9 10.66a16 16 0 0 0 4.34 4.34l1.23-1.23a2 2 0 0 1 2.11-.45c.83.29 1.7.5 2.6.62A2 2 0 0 1 22 16.92Z" />
      </svg>
    ),
    mapPin: (
      <svg {...props}>
        <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    send: (
      <svg {...props}>
        <path d="m22 2-7 20-4-9-9-4 20-7Z" />
        <path d="M22 2 11 13" />
      </svg>
    ),
    copy: (
      <svg {...props}>
        <rect x="9" y="9" width="11" height="11" rx="2" />
        <rect x="4" y="4" width="11" height="11" rx="2" />
      </svg>
    ),
  };

  return icons[name] || icons.code;
}
