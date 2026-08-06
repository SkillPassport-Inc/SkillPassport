import { motion } from 'framer-motion';
import Card from '../components/Card.jsx';

const commitData = [40, 55, 30, 65, 80, 45, 70, 60, 85, 50, 75, 90];
const languageData = [
  { name: 'Java', pct: 38, color: '#F89820' },
  { name: 'JavaScript', pct: 28, color: '#F7DF1E' },
  { name: 'Python', pct: 18, color: '#3776AB' },
  { name: 'Go', pct: 10, color: '#00ADD8' },
  { name: 'Other', pct: 6, color: '#71717A' },
];

const codingMetrics = [
  { label: 'Total Commits', value: '1,480', change: '+124 this month' },
  { label: 'Pull Requests', value: '98', change: '+12 merged' },
  { label: 'Code Reviews', value: '156', change: '+28 completed' },
  { label: 'Avg. Quality Score', value: '94%', change: '+2.1%' },
  { label: 'Test Coverage', value: '87%', change: '+5.3%' },
  { label: 'Open Source PRs', value: '34', change: '+8 accepted' },
];

export default function Analytics() {
  const maxCommit = Math.max(...commitData);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h1 style={{ fontSize: '36px', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--sp-text-primary)', marginBottom: '4px' }}>Analytics</h1>
        <p style={{ fontSize: '16px', color: 'var(--sp-text-secondary)' }}>Deep insights into your coding activity and growth.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
        {codingMetrics.map((m) => (
          <div key={m.label}>
            <Card padding="20px">
              <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--sp-text-tertiary)' }}>{m.label}</span>
              <div style={{ fontSize: '28px', fontWeight: 700, color: 'var(--sp-text-primary)', margin: '4px 0', letterSpacing: '-0.02em' }}>{m.value}</div>
              <span style={{ fontSize: '12px', color: 'var(--sp-success)', fontWeight: 500 }}>{m.change}</span>
            </Card>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px' }}>
        <Card padding="24px" hover={false}>
          <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--sp-text-primary)', marginBottom: '24px' }}>Commit Frequency</h3>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '200px' }}>
            {commitData.map((val, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: `${(val / maxCommit) * 100}%`,
                  background: `rgba(79, 70, 229, ${0.3 + (val / maxCommit) * 0.7})`,
                  borderRadius: '4px 4px 0 0',
                  minWidth: 0,
                }}
              />
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((m) => (
              <span key={m} style={{ fontSize: '10px', color: 'var(--sp-text-tertiary)', flex: 1, textAlign: 'center' }}>{m}</span>
            ))}
          </div>
        </Card>

        <Card padding="24px" hover={false}>
          <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--sp-text-primary)', marginBottom: '24px' }}>Languages</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {languageData.map((lang) => (
              <div key={lang.name}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                  <span style={{ color: 'var(--sp-text-primary)', fontWeight: 500 }}>{lang.name}</span>
                  <span style={{ color: 'var(--sp-text-tertiary)' }}>{lang.pct}%</span>
                </div>
                <div style={{ height: '4px', background: 'var(--sp-border)', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{ width: `${lang.pct}%`, height: '100%', background: lang.color, borderRadius: '2px' }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </motion.div>
  );
}
