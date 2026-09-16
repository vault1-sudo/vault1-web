// Placeholder mark — swap for your real vault1.png / brand SVG when available.
// Used in both the header (larger) and footer (smaller).
export default function Logo({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2L20 6V12C20 16.5 16.5 20.5 12 22C7.5 20.5 4 16.5 4 12V6L12 2Z"
        fill="#05130D"
      />
      <path
        d="M9 12L11 14L15.5 9.5"
        stroke="#0FBE7A"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
