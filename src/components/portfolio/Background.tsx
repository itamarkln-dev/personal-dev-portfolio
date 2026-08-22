/**
 * Fixed backdrop: grid, a slow-drifting violet wash, and a vignette. Pure
 * CSS — no canvas, no particles. The wash animates via background-position,
 * not filter: blur() or transform on a huge layer, so it never forces a
 * full-viewport repaint (that's what froze the old blur() glow on iOS).
 */
export default function Background() {
  return (
    <div className="bg">
      <div className="grid" />
      <div className="glow" />
      <div className="vig" />
    </div>
  )
}
