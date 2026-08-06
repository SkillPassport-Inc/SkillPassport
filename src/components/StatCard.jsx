import { motion } from 'framer-motion';

export default function StatCard({ label, value, icon, change, badge, sublabel }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ duration: 0.2 }}
      style={{
        background: 'var(--sp-surface-card)',
        border: '1px solid var(--sp-border)',
        borderRadius: 'var(--sp-radius-lg)',
        padding: 'var(--sp-space-lg)',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        transition: 'border-color var(--sp-transition), box-shadow var(--sp-transition)',
        cursor: 'default',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.borderColor = 'var(--sp-border-hover)';
        el.style.boxShadow = '0 0 20px rgba(79, 70, 229, 0.08)';
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.borderColor = 'var(--sp-border)';
        el.style.boxShadow = 'none';
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <span
          style={{
            fontSize: '12px',
            fontWeight: 600,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            color: 'var(--sp-text-secondary)',
          }}
        >
          {label}
        </span>
        <span style={{ color: 'var(--sp-accent)', opacity: 0.8 }}>{icon}</span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.4 }}
        style={{
          fontSize: '36px',
          fontWeight: 700,
          letterSpacing: '-0.02em',
          color: 'var(--sp-text-primary)',
          lineHeight: 1.1,
          marginTop: '4px',
        }}
      >
        {value}
      </motion.div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: 'auto' }}>
        {change && (
          <span
            style={{
              fontSize: '12px',
              fontWeight: 600,
              color: change.positive ? 'var(--sp-success)' : 'var(--sp-error)',
              display: 'flex',
              alignItems: 'center',
              gap: '2px',
            }}
          >
            {change.positive ? '↑' : '↓'} {change.value}
          </span>
        )}
        {badge && (
          <span
            style={{
              background: 'var(--sp-accent-muted)',
              color: 'var(--sp-accent-light)',
              padding: '2px 8px',
              borderRadius: 'var(--sp-radius-sm)',
              fontSize: '11px',
              fontWeight: 700,
              border: '1px solid rgba(79, 70, 229, 0.3)',
            }}
          >
            {badge}
          </span>
        )}
        {sublabel && (
          <span style={{ fontSize: '13px', color: 'var(--sp-text-tertiary)' }}>{sublabel}</span>
        )}
      </div>
    </motion.div>
  );
}
