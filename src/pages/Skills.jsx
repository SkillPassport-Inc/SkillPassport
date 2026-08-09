import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '../store/useAppStore.js';
import ProgressRing from '../components/ProgressRing.jsx';
import Card from '../components/Card.jsx';
import Badge from '../components/Badge.jsx';
import Button from '../components/Button.jsx';
import AddSkillModal from '../components/AddSkillModal.jsx';
import SyncPlatformModal from '../components/SyncPlatformModal.jsx';

export default function Skills() {
  const user = useAppStore((state) => state.user);
  const skills = useAppStore((state) => state.skills);
  const certifications = useAppStore((state) => state.certifications);
  const removeSkill = useAppStore((state) => state.removeSkill);
  const verifySkill = useAppStore((state) => state.verifySkill);
  const removeCertification = useAppStore((state) => state.removeCertification);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '36px', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--sp-text-primary)', marginBottom: '4px' }}>Verified Skills & Certifications</h1>
          <p style={{ fontSize: '16px', color: 'var(--sp-text-secondary)' }}>Every skill is dynamically backed by code commits, PRs, and repository analysis.</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Button variant="secondary" onClick={() => setIsSyncModalOpen(true)}>
            ⟠ Sync GitHub
          </Button>
          <Button onClick={() => setIsAddModalOpen(true)}>
            + Verify New Skill
          </Button>
        </div>
      </div>

      <Card padding="32px" hover={false}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '40px', flexWrap: 'wrap' }}>
          <ProgressRing value={user.overallScore || 0} size={120} strokeWidth={4} />
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--sp-text-primary)', marginBottom: '4px' }}>Overall Skill Score</h2>
            <p style={{ fontSize: '14px', color: 'var(--sp-text-secondary)', marginBottom: '12px' }}>
              Based on {skills.length} verified technologies across {user.stats.projects} analyzed projects.
            </p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <Badge variant="accent">Verified Identity</Badge>
              <Badge variant="success">{skills.length} Active Skills</Badge>
            </div>
          </div>
        </div>
      </Card>

      {/* Skills Section */}
      <div>
        <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--sp-text-primary)', marginBottom: '16px' }}>
          Verified Technologies ({skills.length})
        </h2>

        {skills.length === 0 ? (
          <Card padding="36px" hover={false}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>⟠</div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--sp-text-primary)', marginBottom: '8px' }}>
                No Verified Skills Found
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--sp-text-secondary)', maxWidth: '480px', margin: '0 auto 20px' }}>
                Sync your GitHub username to automatically scan your repositories or manually add a skill to issue verification.
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
                <Button onClick={() => setIsSyncModalOpen(true)}>Sync GitHub Account</Button>
                <Button variant="secondary" onClick={() => setIsAddModalOpen(true)}>+ Add Custom Skill</Button>
              </div>
            </div>
          </Card>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
            {skills.map((skill) => (
              <div key={skill.id}>
                <Card glow padding="20px">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <span style={{ fontSize: '18px', fontWeight: 600, color: 'var(--sp-text-primary)' }}>{skill.name}</span>
                        {skill.verified && (
                          <span title="Verified by AI Code Analysis" style={{ color: 'var(--sp-accent)', fontSize: '14px', display: 'inline-flex' }}>
                            ✓
                          </span>
                        )}
                      </div>
                      <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--sp-text-tertiary)' }}>
                        {skill.category}
                      </span>
                      {skill.projectsCount && (
                        <div style={{ fontSize: '12px', color: 'var(--sp-text-secondary)', marginTop: '4px' }}>
                          {skill.projectsCount} projects • {skill.commitsCount || 100}+ commits
                        </div>
                      )}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <ProgressRing value={skill.score} size={64} strokeWidth={3} />
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <button
                          onClick={() => verifySkill(skill.name)}
                          title="Re-verify skill"
                          style={{ background: 'none', border: 'none', color: 'var(--sp-accent-light)', cursor: 'pointer', fontSize: '12px', fontWeight: 600 }}
                        >
                          Re-verify
                        </button>
                        <button
                          onClick={() => removeSkill(skill.id)}
                          title="Remove skill"
                          style={{ background: 'none', border: 'none', color: 'var(--sp-text-tertiary)', cursor: 'pointer', fontSize: '12px' }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Certifications Section */}
      <div>
        <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--sp-text-primary)', marginBottom: '16px' }}>
          Certifications ({certifications.length})
        </h2>

        {certifications.length === 0 ? (
          <Card padding="24px" hover={false}>
            <div style={{ fontSize: '14px', color: 'var(--sp-text-tertiary)', textAlign: 'center' }}>
              No certifications added yet. You can add your professional certifications in settings or onboarding.
            </div>
          </Card>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
            {certifications.map((c) => (
              <Card key={c.id} padding="20px">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    {c.certificateImageUrl ? (
                      <img
                        src={c.certificateImageUrl}
                        alt={`${c.name} WebP Certificate`}
                        style={{ width: 56, height: 42, objectFit: 'cover', borderRadius: 'var(--sp-radius-md)', border: '1px solid var(--sp-border)' }}
                      />
                    ) : (
                      <div style={{ width: 44, height: 44, borderRadius: 'var(--sp-radius-md)', background: 'var(--sp-surface-container-high)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
                        🏆
                      </div>
                    )}
                    <div>
                      <div style={{ fontSize: '16px', fontWeight: 600, color: 'var(--sp-text-primary)' }}>{c.name}</div>
                      <div style={{ fontSize: '13px', color: 'var(--sp-text-secondary)', marginTop: '2px' }}>{c.issuer}</div>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '6px' }}>
                        <span style={{ fontSize: '11px', color: 'var(--sp-text-tertiary)' }}>ID: {c.credentialId}</span>
                        <span style={{ fontSize: '10px', background: 'var(--sp-success-muted)', color: 'var(--sp-success)', padding: '1px 6px', borderRadius: 'var(--sp-radius-full)', fontWeight: 600 }}>
                          {c.fileSizeKB || 45} KB .webp
                        </span>
                      </div>
                    </div>
                  </div>
                  <button onClick={() => removeCertification(c.id)} style={{ background: 'none', border: 'none', color: 'var(--sp-text-tertiary)', cursor: 'pointer', fontSize: '12px' }}>
                    Remove
                  </button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      <AddSkillModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
      <SyncPlatformModal isOpen={isSyncModalOpen} onClose={() => setIsSyncModalOpen(false)} />
    </motion.div>
  );
}
