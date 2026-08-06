export default function SkillBar({ name, level, category, verified }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 16px',
        background: 'var(--sp-surface)',
        border: '1px solid var(--sp-border)',
        borderRadius: 'var(--sp-radius-md)',
        gap: '16px',
        transition: 'border-color var(--sp-transition)',
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--sp-accent)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--sp-border)';
      }}
    >
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--sp-text-primary)' }}>{name}</span>
          {verified && (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--sp-accent)" style={{ flexShrink: 0 }}>
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
            </svg>
          )}
        </div>
        {category && (
          <span style={{ fontSize: '11px', color: 'var(--sp-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
            {category}
          </span>
        )}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: '140px' }}>
        <div
          style={{
            flex: 1,
            height: '4px',
            background: 'var(--sp-border)',
            borderRadius: 'var(--sp-radius-full)',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: `${level}%`,
              height: '100%',
              background: 'var(--sp-accent)',
              borderRadius: 'var(--sp-radius-full)',
              transition: 'width 1s ease-out',
            }}
          />
        </div>
        <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--sp-accent-light)', minWidth: '36px', textAlign: 'right' }}>
          {level}%
        </span>
      </div>
    </div>
  );
}
