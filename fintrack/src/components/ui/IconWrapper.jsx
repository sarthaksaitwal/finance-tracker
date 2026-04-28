/**
 * IconWrapper — coloured square/circle container for emoji or SVG icons.
 * Matches the screenshot's icon style for transaction rows and stat cards.
 */
export default function IconWrapper({
  children,
  bg = 'rgba(255,255,255,0.06)',
  size = 40,
  radius = 10,
  fontSize = 18,
  className = '',
}) {
  return (
    <div
      className={`flex items-center justify-center flex-shrink-0 ${className}`}
      style={{
        width: size,
        height: size,
        borderRadius: radius,
        background: bg,
        fontSize,
      }}
      aria-hidden="true"
    >
      {children}
    </div>
  )
}
