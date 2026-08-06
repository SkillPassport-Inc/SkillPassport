import { forwardRef } from 'react';

const Input = forwardRef(({ label, icon, error, hint, style, type = 'text', ...props }, ref) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      {label && (
        <label
          style={{
            fontSize: '12px',
            fontWeight: 600,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            color: 'var(--sp-text-secondary)',
          }}
        >
          {label}
        </label>
      )}
      <div style={{ position: 'relative' }}>
        {icon && (
          <span
            style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--sp-text-tertiary)',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {icon}
          </span>
        )}
        <input
          ref={ref}
          type={type}
          style={{
            width: '100%',
            background: 'var(--sp-surface-card)',
            border: `1px solid ${error ? 'var(--sp-error)' : 'var(--sp-border)'}`,
            borderRadius: 'var(--sp-radius-md)',
            padding: icon ? '10px 16px 10px 40px' : '10px 16px',
            color: 'var(--sp-text-on-surface)',
            fontSize: '14px',
            fontFamily: 'var(--sp-font)',
            outline: 'none',
            transition: 'border-color var(--sp-transition)',
            ...style,
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = 'var(--sp-accent)';
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = error ? 'var(--sp-error)' : 'var(--sp-border)';
          }}
          {...props}
        />
      </div>
      {error && (
        <span style={{ fontSize: '12px', color: 'var(--sp-error)' }}>{error}</span>
      )}
      {hint && !error && (
        <span style={{ fontSize: '12px', color: 'var(--sp-text-tertiary)' }}>{hint}</span>
      )}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;
