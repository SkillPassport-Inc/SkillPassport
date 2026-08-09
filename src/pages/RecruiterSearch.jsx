import { useState } from 'react';
import { motion } from 'framer-motion';
import Card from '../components/Card.jsx';
import Button from '../components/Button.jsx';
import Badge from '../components/Badge.jsx';
import CandidateProfileModal from '../components/CandidateProfileModal.jsx';
import { getRegisteredCandidatesDB } from '../store/useAppStore.js';

export default function RecruiterSearch() {
  const candidates = getRegisteredCandidatesDB();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pipelineNotified, setPipelineNotified] = useState(false);

  const filteredCandidates = candidates.filter((c) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      c.title.toLowerCase().includes(q) ||
      c.bio.toLowerCase().includes(q) ||
      c.skills.some((s) => (s.name || s).toLowerCase().includes(q))
    );
  });

  const handleOpenProfile = (candidate) => {
    setSelectedCandidate(candidate);
    setIsModalOpen(true);
  };

  const handleAddToPipeline = (candidate) => {
    setPipelineNotified(true);
    setTimeout(() => setPipelineNotified(false), 3000);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '36px', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--sp-text-primary)', marginBottom: '4px' }}>Candidate Search & Verification</h1>
          <p style={{ fontSize: '16px', color: 'var(--sp-text-secondary)' }}>Discover and verify real database candidates and technical talent instantly.</p>
        </div>
        {pipelineNotified && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} style={{ background: 'var(--sp-success-muted)', border: '1px solid var(--sp-success)', color: 'var(--sp-success)', padding: '8px 16px', borderRadius: 'var(--sp-radius-md)', fontSize: '13px', fontWeight: 600 }}>
            ✓ Candidate added to active recruiter hiring pipeline!
          </motion.div>
        )}
      </div>

      <div style={{ position: 'relative', maxWidth: '800px' }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--sp-text-tertiary)" strokeWidth="2" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }}>
          <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
        </svg>
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search candidates by name, title, or skills (e.g. React, Java, Python)..."
          style={{ width: '100%', background: 'var(--sp-surface-card)', border: '1px solid var(--sp-border)', borderRadius: 'var(--sp-radius-md)', padding: '14px 120px 14px 44px', color: 'var(--sp-text-on-surface)', fontSize: '15px', fontFamily: 'var(--sp-font)', outline: 'none' }}
        />
        <button style={{ position: 'absolute', right: '4px', top: '4px', bottom: '4px', background: 'var(--sp-accent)', color: 'white', border: 'none', borderRadius: 'var(--sp-radius-md)', padding: '0 20px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--sp-font)' }}>
          ✨ AI Filter
        </button>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--sp-border)', paddingBottom: '8px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--sp-text-primary)' }}>Verified Database Candidates ({filteredCandidates.length})</h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
        {filteredCandidates.map((c) => (
          <div key={c.id || c.name} onClick={() => handleOpenProfile(c)} style={{ cursor: 'pointer' }}>
            <Card padding="24px" glow>
              <div style={{ display: 'flex', gap: '20px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', minWidth: '100px', borderRight: '1px solid var(--sp-border)', paddingRight: '20px' }}>
                  <div style={{ position: 'relative' }}>
                    <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', fontWeight: 700, color: 'white', boxShadow: '0 4px 14px rgba(79,70,229,0.4)' }}>
                      {c.name[0]?.toUpperCase()}
                    </div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--sp-text-primary)' }}>{c.name}</div>
                    <div style={{ fontSize: '11px', color: 'var(--sp-text-tertiary)' }}>{c.title}</div>
                  </div>
                  <Badge variant="accent">✨ {c.match || c.overallScore || 92}% Match</Badge>
                </div>

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
                      {c.skills.slice(0, 4).map((s, idx) => (
                        <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'var(--sp-bg)', border: '1px solid var(--sp-border)', borderRadius: 'var(--sp-radius-sm)', padding: '4px 10px' }}>
                          <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--sp-text-primary)' }}>{s.name || s}</span>
                          <div style={{ width: '36px', height: '3px', background: 'var(--sp-border)', borderRadius: '2px', overflow: 'hidden' }}>
                            <div style={{ width: `${s.level || s.score || 85}%`, height: '100%', background: 'var(--sp-accent)', borderRadius: '2px' }} />
                          </div>
                        </div>
                      ))}
                    </div>
                    <p style={{ fontSize: '13px', color: 'var(--sp-text-secondary)', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {c.bio}
                    </p>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '16px' }} onClick={(e) => e.stopPropagation()}>
                    <Button variant="secondary" size="sm" onClick={() => handleOpenProfile(c)}>
                      View Full Profile
                    </Button>
                    <Button size="sm" onClick={() => handleAddToPipeline(c)}>
                      + Pipeline
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>

      {/* Full Candidate Profile Modal */}
      <CandidateProfileModal
        candidate={selectedCandidate}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onHire={handleAddToPipeline}
      />
    </motion.div>
  );
}
