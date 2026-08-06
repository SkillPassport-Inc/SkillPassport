const badgeStyles = {
  default: {
    background: 'var(--sp-surface-container-high)',
    color: 'var(--sp-text-secondary)',
    border: '1px solid var(--sp-border)',
  },
  accent: {
    background: 'var(--sp-accent-muted)',
    color: 'var(--sp-accent-light)',
    border: '1px solid rgba(79, 70, 229, 0.3)',
  },
  success: {
    background: 'var(--sp-success-muted)',
    color: 'var(--sp-success)',
    border: '1px solid rgba(34, 197, 94, 0.3)',
  },
  warning: {
    background: 'var(--sp-warning-muted)',
    color: 'var(--sp-warning)',
    border: '1px solid rgba(245, 158, 11, 0.3)',
  },
  error: {
    background: 'var(--sp-error-muted)',
    color: 'var(--sp-error)',
    border: '1px solid rgba(239, 68, 68, 0.3)',
  },
};

export default function Badge({ children, variant = 'default', size = 'sm', icon }) {
  const s = badgeStyles[variant] || badgeStyles.default;
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        padding: size === 'sm' ? '2px 8px' : '4px 12px',
        borderRadius: 'var(--sp-radius-full)',
        fontSize: size === 'sm' ? '11px' : '12px',
        fontWeight: 600,
        letterSpacing: '0.02em',
        textTransform: 'uppercase',
        whiteSpace: 'nowrap',
        ...s,
      }}
    >
      {icon}
      {children}
    </span>
  );
}
