import { forwardRef } from 'react';
import { motion } from 'framer-motion';

const variants = {
  primary: {
    background: 'var(--sp-accent)',
    color: 'white',
    border: 'none',
    hoverBg: 'var(--sp-accent-hover)',
  },
  secondary: {
    background: 'transparent',
    color: 'var(--sp-text-on-surface)',
    border: '1px solid var(--sp-border)',
    hoverBg: 'var(--sp-surface-container-high)',
  },
  ghost: {
    background: 'transparent',
    color: 'var(--sp-text-secondary)',
    border: 'none',
    hoverBg: 'var(--sp-surface-container-high)',
  },
  danger: {
    background: 'var(--sp-error)',
    color: 'white',
    border: 'none',
    hoverBg: '#DC2626',
  },
};

const sizes = {
  sm: { padding: '6px 12px', fontSize: '13px', height: '32px' },
  md: { padding: '8px 16px', fontSize: '14px', height: '40px' },
  lg: { padding: '12px 24px', fontSize: '16px', height: '48px' },
};

const Button = forwardRef(
  ({ variant = 'primary', size = 'md', loading, icon, children, style, disabled, onClick, className, type = 'button' }, ref) => {
    const v = variants[variant] || variants.primary;
    const s = sizes[size] || sizes.md;

    return (
      <motion.button
        ref={ref}
        type={type}
        className={className}
        onClick={onClick}
        whileHover={{ scale: disabled ? 1 : 1.01 }}
        whileTap={{ scale: disabled ? 1 : 0.98 }}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          background: v.background,
          color: v.color,
          border: v.border,
          borderRadius: 'var(--sp-radius-md)',
          fontWeight: 500,
          cursor: disabled || loading ? 'not-allowed' : 'pointer',
          opacity: disabled || loading ? 0.5 : 1,
          transition: 'all var(--sp-transition)',
          fontFamily: 'var(--sp-font)',
          letterSpacing: '0',
          whiteSpace: 'nowrap',
          ...s,
          ...style,
        }}
        onMouseEnter={(e) => {
          if (!disabled && !loading) {
            e.currentTarget.style.background = v.hoverBg;
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = v.background;
        }}
        disabled={disabled || loading}
      >
        {loading ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ animation: 'spin 1s linear infinite' }}>
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="31.4 31.4" strokeLinecap="round" />
          </svg>
        ) : icon ? (
          icon
        ) : null}
        {children}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
export default Button;
