import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '../store/useAppStore.js';
import StatCard from '../components/StatCard.jsx';
import Card from '../components/Card.jsx';
import Button from '../components/Button.jsx';
import PostJobModal from '../components/PostJobModal.jsx';

const pipelineStages = [
  { stage: 'Sourced', count: 14, color: 'var(--sp-text-tertiary)' },
  { stage: 'Screening', count: 8, color: 'var(--sp-accent)' },
  { stage: 'Interview', count: 4, color: 'var(--sp-warning)' },
  { stage: 'Offer', count: 2, color: 'var(--sp-success)' },
  { stage: 'Hired', count: 1, color: '#22C55E' },
];

export default function RecruiterDashboard() {
  const jobs = useAppStore((state) => state.jobs);
  const removeJob = useAppStore((state) => state.removeJob);

  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '36px', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--sp-text-primary)', marginBottom: '4px' }}>Recruiter Suite</h1>
          <p style={{ fontSize: '16px', color: 'var(--sp-text-secondary)' }}>Find, verify, and manage technical job openings and hiring pipelines.</p>
        </div>
        <Button onClick={() => setIsPostModalOpen(true)}>
          + Post New Job Opening
        </Button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        <StatCard label="Active Job Openings" value={jobs.length} icon={<span>💼</span>} sublabel="Live listings" />
        <StatCard label="Pipeline Candidates" value="29 Active" icon={<span>📊</span>} sublabel="Across all roles" />
        <StatCard label="Response Rate" value="84%" icon={<span>💬</span>} change={{ value: '6%', positive: true }} />
        <StatCard label="Avg. Time to Hire" value="14 days" icon={<span>⏱</span>} change={{ value: '4 days', positive: true }} sublabel="faster" />
      </div>

      {/* Active Jobs Posted */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--sp-text-primary)' }}>
            Active Open Roles ({jobs.length})
          </h2>
          <Button variant="secondary" size="sm" onClick={() => setIsPostModalOpen(true)}>
            + Add Role
          </Button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
          {jobs.map((job) => (
            <Card key={job.id} padding="20px" glow>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--sp-text-primary)', marginBottom: '4px' }}>{job.title}</h3>
                  <div style={{ fontSize: '13px', color: 'var(--sp-text-secondary)', marginBottom: '8px' }}>
                    {job.company} • {job.location} • <strong style={{ color: 'var(--sp-accent-light)' }}>{job.salary}</strong>
                  </div>
                  <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                    {job.skills.map((s) => (
                      <span key={s} style={{ background: 'var(--sp-bg)', border: '1px solid var(--sp-border)', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', color: 'var(--sp-text-secondary)' }}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => removeJob(job.id)}
                  title="Remove Job"
                  style={{ background: 'none', border: 'none', color: 'var(--sp-text-tertiary)', cursor: 'pointer', fontSize: '12px' }}
                >
                  Remove
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Hiring Pipeline */}
      <Card padding="24px" hover={false}>
        <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--sp-text-primary)', marginBottom: '24px' }}>Hiring Pipeline Funnel</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {pipelineStages.map((s) => (
            <div key={s.stage} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--sp-text-secondary)', minWidth: '80px' }}>{s.stage}</span>
              <div style={{ flex: 1, height: '24px', background: 'var(--sp-border)', borderRadius: 'var(--sp-radius-sm)', overflow: 'hidden' }}>
                <div
                  style={{ width: `${(s.count / 14) * 100}%`, height: '100%', background: s.color, borderRadius: 'var(--sp-radius-sm)', display: 'flex', alignItems: 'center', paddingLeft: '8px' }}
                >
                  <span style={{ fontSize: '11px', fontWeight: 700, color: 'white' }}>{s.count} candidates</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <PostJobModal isOpen={isPostModalOpen} onClose={() => setIsPostModalOpen(false)} />
    </motion.div>
  );
}
