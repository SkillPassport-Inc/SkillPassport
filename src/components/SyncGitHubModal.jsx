import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../store/useAppStore.js';
import Button from './Button.jsx';
import Input from './Input.jsx';

export default function SyncGitHubModal({ isOpen, onClose }) {
  const user = useAppStore((state) => state.user);
  const syncGitHub = useAppStore((state) => state.syncGitHub);
  const isSyncing = useAppStore((state) => state.isSyncingGitHub);
  const syncError = useAppStore((state) => state.syncError);

  const [githubUser, setGithubUser] = useState(user.githubUsername || '');

  if (!isOpen) return null;

  const handleSync = async (e) => {
    e.preventDefault();
    if (!githubUser.trim()) return;

    await syncGitHub(githubUser.trim());
    if (!useAppStore.getState().syncError) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(0, 0, 0, 0.7)',
          backdropFilter: 'blur(8px)',
          padding: '24px',
        }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          onClick={(e) => e.stopPropagation()}
          style={{
            width: '100%',
            maxWidth: '460px',
            background: 'var(--sp-surface-elevated)',
            border: '1px solid var(--sp-border)',
            borderRadius: 'var(--sp-radius-xl)',
            padding: '28px',
            boxShadow: 'var(--sp-shadow-lg)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '20px' }}>⟠</span>
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--sp-text-primary)' }}>
                Connect Live GitHub Account
              </h2>
            </div>
            <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--sp-text-tertiary)', fontSize: '18px', cursor: 'pointer' }}>
              ✕
            </button>
          </div>

          <p style={{ fontSize: '14px', color: 'var(--sp-text-secondary)', marginBottom: '20px', lineHeight: 1.5 }}>
            SkillPassport will fetch your real public GitHub repositories, calculate language breakdowns, parse repository metadata, and issue dynamic skill verifications.
          </p>

          <form onSubmit={handleSync} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Input
              label="GitHub Username"
              placeholder="e.g. torvalds, gaearon, or your username"
              value={githubUser}
              onChange={(e) => setGithubUser(e.target.value)}
              required
            />

            {syncError && (
              <div style={{ background: 'var(--sp-error-muted)', border: '1px solid rgba(239, 68, 68, 0.3)', color: 'var(--sp-error)', padding: '10px 14px', borderRadius: 'var(--sp-radius-md)', fontSize: '13px' }}>
                {syncError}
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
              <Button type="button" variant="secondary" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" loading={isSyncing}>
                {isSyncing ? 'Fetching Repos & Analyzing...' : 'Sync & Verify Repos'}
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
