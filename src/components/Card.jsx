import { motion } from 'framer-motion';

export default function Card({ children, glow = false, hover = true, padding = 'var(--sp-space-lg)', className = '', style, onClick }) {
  return (
    <motion.div
      whileHover={hover ? { scale: 1.01, y: -2 } : undefined}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      onClick={onClick}
      className={className}
      style={{
        background: 'var(--sp-surface-card)',
        border: '1px solid var(--sp-border)',
        borderRadius: 'var(--sp-radius-lg)',
        padding,
        transition: 'border-color var(--sp-transition), box-shadow var(--sp-transition)',
        cursor: onClick ? 'pointer' : 'default',
        position: 'relative',
        overflow: 'hidden',
        ...style,
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.borderColor = glow ? 'var(--sp-accent)' : 'var(--sp-border-hover)';
        if (glow) el.style.boxShadow = 'var(--sp-shadow-glow)';
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.borderColor = 'var(--sp-border)';
        el.style.boxShadow = 'none';
      }}
    >
      {children}
    </motion.div>
  );
}
