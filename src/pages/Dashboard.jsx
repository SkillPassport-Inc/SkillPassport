import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore.js';
import StatCard from '../components/StatCard.jsx';
import Card from '../components/Card.jsx';
import SyncPlatformModal from '../components/SyncPlatformModal.jsx';
import AddSkillModal from '../components/AddSkillModal.jsx';
import Button from '../components/Button.jsx';

const skillGrowthData = [
  { month: 'Jan', score: 50 },
  { month: 'Feb', score: 55 },
  { month: 'Mar', score: 60 },
  { month: 'Apr', score: 65 },
  { month: 'May', score: 70 },
  { month: 'Jun', score: 75 },
  { month: 'Jul', score: 80 },
  { month: 'Aug', score: 85 },
  { month: 'Sep', score: 88 },
  { month: 'Oct', score: 90 },
  { month: 'Nov', score: 92 },
  { month: 'Dec', score: 94 },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const user = useAppStore((state) => state.user);
  const skills = useAppStore((state) => state.skills);
  const activities = useAppStore((state) => state.activities);
  const repositories = useAppStore((state) => state.repositories);
  const certifications = useAppStore((state) => state.certifications);

  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);
  const [isAddSkillOpen, setIsAddSkillOpen] = useState(false);

  const topSkills = skills.slice(0, 5);

  // Real Date-Based Activity Matrix (Last 49 Calendar Days)
  const todayDate = new Date();
  const activityMatrixDays = Array.from({ length: 49 }).map((_, idx) => {
    const d = new Date(todayDate);
    d.setDate(d.getDate() - (48 - idx));
    const dateStr = d.toISOString().split('T')[0]; // 'YYYY-MM-DD'
    const formattedDate = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const count = user.activityLog?.[dateStr] || 0;
    return { dateStr, formattedDate, count };
  });

  const maxScore = 100;
  const chartWidth = 100;
  const chartHeight = 100;
  const points = skillGrowthData.map((d, i) => ({
    x: (i / (skillGrowthData.length - 1)) * chartWidth,
    y: chartHeight - ((d.score - 40) / (maxScore - 40)) * chartHeight,
  }));

  const linePath = points.map((p, i) => (i === 0 ? `M${p.x},${p.y}` : `L${p.x},${p.y}`)).join(' ');
  const areaPath = `${linePath} L${chartWidth},${chartHeight} L0,${chartHeight} Z`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              fontSize: '36px',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              color: 'var(--sp-text-primary)',
              marginBottom: '4px',
            }}
          >
            Welcome, {user.name || 'Developer'}.
          </motion.h1>
          <p style={{ fontSize: '16px', color: 'var(--sp-text-secondary)' }}>
            Here's your verified technical identity & real work evidence.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => setIsAddSkillOpen(true)}
            style={{
              background: 'var(--sp-surface-card)',
              border: '1px solid var(--sp-border)',
              borderRadius: 'var(--sp-radius-md)',
              padding: '8px 16px',
              color: 'var(--sp-text-on-surface)',
              fontSize: '13px',
              fontWeight: 500,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span>+</span> Add Skill
          </button>
          <button
            onClick={() => setIsSyncModalOpen(true)}
            style={{
              background: 'var(--sp-accent)',
              color: 'white',
              border: 'none',
              borderRadius: 'var(--sp-radius-md)',
              padding: '8px 16px',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span>⟠</span> Sync GitHub Account
          </button>
        </div>
      </div>

      {/* Empty State Banner if no skills or repos yet */}
      {skills.length === 0 && repositories.length === 0 && (
        <Card padding="32px" glow>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
            <div style={{ maxWidth: '640px' }}>
              <div style={{ display: 'inline-flex', background: 'var(--sp-accent-muted)', color: 'var(--sp-accent-light)', padding: '4px 10px', borderRadius: 'var(--sp-radius-full)', fontSize: '12px', fontWeight: 600, marginBottom: '12px' }}>
                🚀 Getting Started
              </div>
              <h2 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--sp-text-primary)', marginBottom: '8px' }}>
                Connect your platforms to generate your verified identity
              </h2>
              <p style={{ fontSize: '14px', color: 'var(--sp-text-secondary)', lineHeight: 1.6 }}>
                SkillPassport needs to analyze your public code repositories to calculate skill proof, quality scores, and commitment metrics.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <Button onClick={() => navigate('/onboarding')}>
                Complete Profile Setup →
              </Button>
              <Button variant="secondary" onClick={() => setIsSyncModalOpen(true)}>
                ⟠ Sync GitHub Username
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        <StatCard
          label="Overall Score"
          value={`${user.overallScore || 0}%`}
          icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>}
          sublabel="Passport score"
        />
        <StatCard
          label="Verified Skills"
          value={skills.length}
          icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>}
          sublabel="in active stack"
        />
        <StatCard
          label="Analyzed Repositories"
          value={repositories.length}
          icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>}
          sublabel="AI reviewed"
        />
        <StatCard
          label="Certifications"
          value={certifications.length}
          icon={<span>🏆</span>}
          sublabel="Verified credentials"
        />
      </div>

      {/* Charts Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px', minHeight: '360px' }}>
        <Card padding="24px" hover={false}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--sp-text-primary)' }}>Skill Verification Growth</h3>
          </div>

          <div style={{ position: 'relative', height: '240px', borderLeft: '1px solid var(--sp-border)', borderBottom: '1px solid var(--sp-border)' }}>
            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0 }}>
              <defs>
                <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--sp-accent)" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="var(--sp-accent)" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d={areaPath} fill="url(#chartFill)" />
              <path d={linePath} fill="none" stroke="var(--sp-accent)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
            </svg>
            <div style={{ position: 'absolute', bottom: '-24px', width: '100%', display: 'flex', justifyContent: 'space-between', padding: '0 4px' }}>
              {['Jan', 'Mar', 'Jun', 'Sep', 'Dec'].map((m) => (
                <span key={m} style={{ fontSize: '11px', color: 'var(--sp-text-tertiary)' }}>{m}</span>
              ))}
            </div>
          </div>
        </Card>

        <Card padding="24px" hover={false}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--sp-text-primary)' }}>Activity Matrix</h3>
            <span style={{ fontSize: '12px', color: 'var(--sp-text-tertiary)' }}>Last 49 Days</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', flex: 1, marginBottom: '16px' }}>
            {activityMatrixDays.map((day) => {
              let bg = 'rgba(255, 255, 255, 0.05)';
              let border = '1px solid rgba(255, 255, 255, 0.08)';

              if (day.count >= 4) {
                bg = '#818CF8';
                border = '1px solid #C084FC';
              } else if (day.count === 3) {
                bg = '#4F46E5';
                border = '1px solid #6366F1';
              } else if (day.count === 2) {
                bg = 'rgba(79, 70, 229, 0.65)';
                border = '1px solid rgba(129, 140, 248, 0.4)';
              } else if (day.count === 1) {
                bg = 'rgba(79, 70, 229, 0.3)';
                border = '1px solid rgba(79, 70, 229, 0.3)';
              }

              return (
                <div
                  key={day.dateStr}
                  title={`${day.formattedDate}: ${day.count} ${day.count === 1 ? 'activity' : 'activities'} logged`}
                  style={{
                    aspectRatio: '1',
                    borderRadius: '4px',
                    background: bg,
                    border: border,
                    cursor: 'pointer',
                    transition: 'transform 0.15s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.2)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />
              );
            })}
          </div>

          {/* Activity Intensity Legend */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '6px', fontSize: '11px', color: 'var(--sp-text-tertiary)' }}>
            <span>No Login</span>
            <div style={{ width: 10, height: 10, borderRadius: '2px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.08)' }} />
            <div style={{ width: 10, height: 10, borderRadius: '2px', background: 'rgba(79, 70, 229, 0.3)' }} />
            <div style={{ width: 10, height: 10, borderRadius: '2px', background: 'rgba(79, 70, 229, 0.65)' }} />
            <div style={{ width: 10, height: 10, borderRadius: '2px', background: '#4F46E5' }} />
            <div style={{ width: 10, height: 10, borderRadius: '2px', background: '#818CF8' }} />
            <span>Active Login</span>
          </div>
        </Card>
      </div>

      {/* Bottom Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <Card padding="24px" hover={false}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--sp-text-primary)' }}>Top Verified Skills</h3>
            <button onClick={() => setIsAddSkillOpen(true)} style={{ background: 'none', border: 'none', color: 'var(--sp-accent-light)', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
              + Add Skill
            </button>
          </div>
          {topSkills.length === 0 ? (
            <div style={{ padding: '24px 0', textAlign: 'center', color: 'var(--sp-text-tertiary)', fontSize: '14px' }}>
              No skills added yet. <a onClick={() => setIsSyncModalOpen(true)} style={{ color: 'var(--sp-accent-light)', cursor: 'pointer' }}>Sync GitHub</a> or click + Add Skill above.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {topSkills.map((skill) => (
                <div key={skill.id} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--sp-text-primary)', minWidth: '110px' }}>{skill.name}</span>
                  <div style={{ flex: 1, height: '4px', background: 'var(--sp-border)', borderRadius: '2px', overflow: 'hidden' }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.score}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      style={{ height: '100%', background: 'var(--sp-accent)', borderRadius: '2px' }}
                    />
                  </div>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--sp-accent-light)', minWidth: '36px' }}>{skill.score}%</span>
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card padding="24px" hover={false}>
          <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--sp-text-primary)', marginBottom: '20px' }}>Recent Activity Feed</h3>
          {activities.length === 0 ? (
            <div style={{ padding: '24px 0', textAlign: 'center', color: 'var(--sp-text-tertiary)', fontSize: '14px' }}>
              No recent activity. Activities will appear here as you verify skills and sync repositories.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {activities.map((a) => (
                <div key={a.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', borderRadius: 'var(--sp-radius-md)' }}>
                  <span style={{ fontSize: '16px' }}>{a.icon}</span>
                  <span style={{ flex: 1, fontSize: '14px', color: 'var(--sp-text-on-surface)' }}>{a.text}</span>
                  <span style={{ fontSize: '12px', color: 'var(--sp-text-tertiary)', whiteSpace: 'nowrap' }}>{a.time}</span>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      <SyncPlatformModal isOpen={isSyncModalOpen} onClose={() => setIsSyncModalOpen(false)} />
      <AddSkillModal isOpen={isAddSkillOpen} onClose={() => setIsAddSkillOpen(false)} />
    </motion.div>
  );
}
