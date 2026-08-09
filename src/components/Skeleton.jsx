export default function Skeleton({ width = '100%', height = '20px', circle = false, borderRadius, style }) {
  return (
    <div
      className="skeleton-box"
      style={{
        width,
        height,
        borderRadius: circle ? '50%' : (borderRadius || '6px'),
        display: 'inline-block',
        ...style,
      }}
    />
  );
}
