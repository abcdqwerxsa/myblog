export function Logo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer frame — precision-cut square */}
      <rect
        x="1.5"
        y="1.5"
        width="29"
        height="29"
        rx="3"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.9"
      />

      {/* Inner milled recess */}
      <rect
        x="5"
        y="5"
        width="22"
        height="22"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="0.75"
        opacity="0.3"
      />

      {/* T — vertical stroke */}
      <rect x="8" y="8" width="1.5" height="16" fill="currentColor" opacity="0.85" />

      {/* T — horizontal bar */}
      <rect x="8" y="8" width="10" height="1.5" fill="currentColor" opacity="0.85" />

      {/* L — vertical stroke */}
      <rect x="21" y="17" width="1.5" height="7" fill="currentColor" opacity="0.85" />

      {/* L — horizontal bar */}
      <rect x="21" y="22.5" width="5" height="1.5" fill="currentColor" opacity="0.85" />

      {/* Status lens — precision indicator dot */}
      <circle cx="26.5" cy="5.5" r="1.5" fill="currentColor" opacity="0.6" />
    </svg>
  );
}
