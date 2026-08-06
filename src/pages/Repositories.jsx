import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '../store/useAppStore.js';
import Card from '../components/Card.jsx';
import Badge from '../components/Badge.jsx';
import Button from '../components/Button.jsx';
import SyncGitHubModal from '../components/SyncGitHubModal.jsx';

export default function Repositories() {
  const repositories = useAppStore((state) => state.repositories);
  const [isSyncOpen, setIsSyncOpen] = useState(false);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '36px', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--sp-text-primary)', marginBottom: '4px' }}>Repositories</h1>
          <p style={{ fontSize: '16px', color: 'var(--sp-text-secondary)' }}>AI-analyzed repository code complexity, architecture, and security scores.</p>
        </div>
        <Button onClick={() => setIsSyncOpen(true)}>
          + Connect GitHub Account
        </Button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {repositories.map((repo, i) => (
          <div key={repo.id}>
            <Card padding="24px" glow>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--sp-text-primary)' }}>
                      {repo.url ? (
                        <a href={repo.url} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                          {repo.name} ↗
                        </a>
                      ) : (
                        repo.name
                      )}
                    </h3>
                    {repo.public && (
                      <span style={{ fontSize: '11px', color: 'var(--sp-text-tertiary)', border: '1px solid var(--sp-border)', padding: '2px 6px', borderRadius: '4px' }}>
                        Public
                      </span>
                    )}
                  </div>
                  <p style={{ fontSize: '14px', color: 'var(--sp-text-secondary)', maxWidth: '680px' }}>{repo.desc}</p>
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  {repo.aiReviewed && <Badge variant="accent">AI Reviewed</Badge>}
                  <div style={{ width: 54, height: 54, borderRadius: 'var(--sp-radius-md)', background: 'var(--sp-surface-container-high)', border: '1px solid var(--sp-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                    <span style={{ fontSize: '20px', fontWeight: 700, color: 'var(--sp-text-primary)', lineHeight: 1 }}>{repo.overall}</span>
                    <span style={{ fontSize: '9px', color: 'var(--sp-text-tertiary)', fontWeight: 600 }}>/100</span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', alignItems: 'center' }}>
                {Object.entries(repo.scores).map(([key, val]) => (
                  <div key={key} style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--sp-text-tertiary)', marginBottom: '2px' }}>{key}</span>
                    <span style={{ fontSize: '15px', fontWeight: 700, color: 'var(--sp-text-primary)' }}>{val}</span>
                  </div>
                ))}
                <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', color: 'var(--sp-text-secondary)' }}>⭐ {repo.stars}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', color: 'var(--sp-text-secondary)' }}>🔀 {repo.forks}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: repo.lang.color }} />
                    <span style={{ fontSize: '13px', color: 'var(--sp-text-secondary)', fontWeight: 500 }}>{repo.lang.name}</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>

      <SyncGitHubModal isOpen={isSyncOpen} onClose={() => setIsSyncOpen(false)} />
    </motion.div>
  );
}
