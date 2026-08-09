import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button.jsx';
import Badge from './Badge.jsx';
import Card from './Card.jsx';

export default function CandidateProfileModal({ candidate, isOpen, onClose, onHire }) {
  if (!isOpen || !candidate) return null;

  const skills = candidate.skills || [];
  const repos = candidate.repositories || [];
  const certs = candidate.certifications || [];

  return (
    <AnimatePresence>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1000,
          background: 'rgba(9, 9, 11, 0.85)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          overflowY: 'auto',
        }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          onClick={(e) => e.stopPropagation()}
          style={{
            width: '100%',
            maxWidth: '780px',
            maxHeight: '90vh',
            overflowY: 'auto',
            background: 'var(--sp-surface-card)',
            border: '1px solid var(--sp-border-hover)',
            borderRadius: 'var(--sp-radius-xl)',
            boxShadow: '0 24px 48px rgba(0, 0, 0, 0.6)',
            padding: '32px',
            position: 'relative',
          }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '24px',
              right: '24px',
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid var(--sp-border)',
              color: 'var(--sp-text-secondary)',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: '16px',
            }}
          >
            ✕
          </button>

          {/* Candidate Header */}
          <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', marginBottom: '28px', borderBottom: '1px solid var(--sp-border)', paddingBottom: '24px' }}>
            <div style={{ position: 'relative' }}>
              <div
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '28px',
                  fontWeight: 800,
                  color: 'white',
                  boxShadow: '0 8px 24px rgba(79, 70, 229, 0.4)',
                }}
              >
                {candidate.name?.[0]?.toUpperCase() || 'C'}
              </div>
              <span style={{ position: 'absolute', bottom: 0, right: 0, width: '16px', height: '16px', background: '#22C55E', borderRadius: '50%', border: '3px solid var(--sp-surface-card)' }} />
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '6px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--sp-text-primary)' }}>{candidate.name}</h2>
                <Badge variant="accent">✓ Verified Skill Passport</Badge>
                <Badge variant="success">✨ {candidate.match || candidate.overallScore || 92}% Match Score</Badge>
              </div>
              <div style={{ fontSize: '15px', fontWeight: 500, color: 'var(--sp-text-secondary)', marginBottom: '8px' }}>
                {candidate.title || 'Software Engineer'} • {candidate.email || 'developer@skillpassport.dev'}
              </div>
              <p style={{ fontSize: '14px', color: 'var(--sp-text-secondary)', lineHeight: 1.6, maxWidth: '580px' }}>
                {candidate.bio || 'Verified full stack software developer with proven codebase engineering history.'}
              </p>
            </div>
          </div>

          {/* Candidate Verified Skills */}
          <div style={{ marginBottom: '28px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--sp-text-primary)', marginBottom: '14px' }}>
              Verified Skill Breakdown
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
              {skills.map((skill, idx) => (
                <div key={idx} style={{ background: 'var(--sp-bg)', border: '1px solid var(--sp-border)', borderRadius: 'var(--sp-radius-md)', padding: '12px 16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                    <span style={{ color: 'var(--sp-text-primary)' }}>{skill.name || skill}</span>
                    <span style={{ color: 'var(--sp-accent-light)' }}>{skill.level || skill.score || 88}%</span>
                  </div>
                  <div style={{ height: '4px', background: 'var(--sp-border)', borderRadius: '2px', overflow: 'hidden' }}>
                    <div style={{ width: `${skill.level || skill.score || 88}%`, height: '100%', background: 'var(--sp-accent)', borderRadius: '2px' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Analyzed Code Repositories */}
          {repos.length > 0 && (
            <div style={{ marginBottom: '28px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--sp-text-primary)', marginBottom: '14px' }}>
                Analyzed Code Repositories ({repos.length})
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {repos.map((repo, idx) => (
                  <Card key={idx} padding="14px" hover={false}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--sp-text-primary)', marginBottom: '2px' }}>{repo.name}</div>
                        <div style={{ fontSize: '12px', color: 'var(--sp-text-secondary)' }}>{repo.desc || 'Analyzed open source codebase'}</div>
                      </div>
                      <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--sp-success)', background: 'var(--sp-success-muted)', padding: '2px 8px', borderRadius: '4px' }}>
                        Overall {repo.overall || repo.scores?.architecture || 88}%
                      </span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Certifications (.WebP) */}
          {certs.length > 0 && (
            <div style={{ marginBottom: '28px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--sp-text-primary)', marginBottom: '14px' }}>
                Verified Certifications ({certs.length})
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                {certs.map((cert, idx) => (
                  <div key={idx} style={{ background: 'var(--sp-bg)', border: '1px solid var(--sp-border)', padding: '12px', borderRadius: 'var(--sp-radius-md)', display: 'flex', gap: '12px', alignItems: 'center' }}>
                    {cert.certificateImageUrl ? (
                      <img src={cert.certificateImageUrl} alt={cert.name} style={{ width: '48px', height: '36px', objectFit: 'cover', borderRadius: '4px', border: '1px solid var(--sp-border)' }} />
                    ) : (
                      <div style={{ width: '48px', height: '36px', background: 'var(--sp-surface-container-high)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>🏆</div>
                    )}
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--sp-text-primary)' }}>{cert.name}</div>
                      <div style={{ fontSize: '11px', color: 'var(--sp-text-tertiary)' }}>{cert.issuer} • Verified .WebP</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Footer CTAs */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', borderTop: '1px solid var(--sp-border)', paddingTop: '20px' }}>
            <Button variant="secondary" onClick={onClose}>Close Profile</Button>
            <Button
              onClick={() => {
                if (onHire) onHire(candidate);
                onClose();
              }}
            >
              ✨ Add Candidate to Pipeline
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
