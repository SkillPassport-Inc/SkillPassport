import { motion } from 'framer-motion';
import { useAppStore } from '../store/useAppStore.js';
import Card from '../components/Card.jsx';
import Badge from '../components/Badge.jsx';
import Button from '../components/Button.jsx';

export default function Jobs() {
  const jobs = useAppStore((state) => state.jobs);
  const userSkills = useAppStore((state) => state.skills);

  // Helper function to calculate real-time AI skill match %
  const getJobMatchPercentage = (requiredSkills) => {
    if (!requiredSkills || requiredSkills.length === 0) return 75;
    if (userSkills.length === 0) return 60;

    let matched = 0;
    requiredSkills.forEach((reqSkill) => {
      const found = userSkills.find((s) => s.name.toLowerCase().includes(reqSkill.toLowerCase()) || reqSkill.toLowerCase().includes(s.name.toLowerCase()));
      if (found) matched += 1;
    });

    const pct = Math.round((matched / requiredSkills.length) * 100);
    return Math.min(99, Math.max(55, pct));
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h1 style={{ fontSize: '36px', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--sp-text-primary)', marginBottom: '4px' }}>
          Job Openings ({jobs.length})
        </h1>
        <p style={{ fontSize: '16px', color: 'var(--sp-text-secondary)' }}>
          Real-time positions matched against your verified technical skills.
        </p>
      </div>

      {jobs.length === 0 ? (
        <Card padding="36px" hover={false}>
          <div style={{ textAlign: 'center', color: 'var(--sp-text-tertiary)' }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>💼</div>
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--sp-text-primary)', marginBottom: '8px' }}>
              No Job Openings Currently Posted
            </h3>
            <p style={{ fontSize: '14px', maxWidth: '440px', margin: '0 auto' }}>
              Switch to Recruiter mode to post open engineering roles.
            </p>
          </div>
        </Card>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {jobs.map((job) => {
            const matchScore = getJobMatchPercentage(job.skills);
            return (
              <div key={job.id}>
                <Card padding="24px" glow>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px' }}>
                        <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--sp-text-primary)' }}>{job.title}</h3>
                        <Badge variant={matchScore >= 85 ? 'success' : matchScore >= 75 ? 'accent' : 'default'}>
                          {matchScore}% AI Match
                        </Badge>
                      </div>
                      <div style={{ display: 'flex', gap: '16px', fontSize: '14px', color: 'var(--sp-text-secondary)', marginBottom: '12px', flexWrap: 'wrap' }}>
                        <span style={{ fontWeight: 600, color: 'var(--sp-accent-light)' }}>{job.company}</span>
                        <span>📍 {job.location}</span>
                        <span style={{ color: 'var(--sp-text-primary)', fontWeight: 600 }}>💰 {job.salary}</span>
                        <span style={{ color: 'var(--sp-text-tertiary)' }}>🕒 {job.createdAt}</span>
                      </div>
                      <p style={{ fontSize: '14px', color: 'var(--sp-text-secondary)', marginBottom: '12px', lineHeight: 1.5 }}>
                        {job.description}
                      </p>
                      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                        {job.skills.map((s) => (
                          <span key={s} style={{ background: 'var(--sp-surface-container-high)', border: '1px solid var(--sp-border)', borderRadius: 'var(--sp-radius-full)', padding: '3px 10px', fontSize: '12px', color: 'var(--sp-text-secondary)', fontWeight: 500 }}>
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', marginLeft: '16px' }}>
                      <Button variant="secondary" size="sm">View Details</Button>
                      <Button size="sm">Apply Now</Button>
                    </div>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}
