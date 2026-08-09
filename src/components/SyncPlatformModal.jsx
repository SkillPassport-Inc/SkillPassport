import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../store/useAppStore.js';
import Button from './Button.jsx';
import Input from './Input.jsx';

export default function SyncPlatformModal({ isOpen, onClose }) {
  const user = useAppStore((state) => state.user);
  const connectedApps = useAppStore((state) => state.connectedApps);
  const syncGitHub = useAppStore((state) => state.syncGitHub);
  const syncLeetCode = useAppStore((state) => state.syncLeetCode);
  const syncGitLab = useAppStore((state) => state.syncGitLab);
  const syncStackOverflow = useAppStore((state) => state.syncStackOverflow);

  const [githubUser, setGithubUser] = useState(user.platformHandles?.github || user.githubUsername || '');
  const [leetcodeUser, setLeetcodeUser] = useState(user.platformHandles?.leetcode || '');
  const [gitlabUser, setGitlabUser] = useState(user.platformHandles?.gitlab || '');
  const [soUserId, setSoUserId] = useState(user.platformHandles?.stackoverflow || '');

  const [loadingPlatform, setLoadingPlatform] = useState(null);

  if (!isOpen) return null;

  const handleSyncPlatform = async (platform) => {
    setLoadingPlatform(platform);

    try {
      if (platform === 'github' && githubUser.trim()) {
        await syncGitHub(githubUser.trim());
      } else if (platform === 'leetcode' && leetcodeUser.trim()) {
        await syncLeetCode(leetcodeUser.trim());
      } else if (platform === 'gitlab' && gitlabUser.trim()) {
        await syncGitLab(gitlabUser.trim());
      } else if (platform === 'stackoverflow' && soUserId.trim()) {
        await syncStackOverflow(soUserId.trim());
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingPlatform(null);
    }
  };

  const handleSyncAll = async () => {
    setLoadingPlatform('all');
    if (githubUser.trim()) await syncGitHub(githubUser.trim());
    if (leetcodeUser.trim()) await syncLeetCode(leetcodeUser.trim());
    if (gitlabUser.trim()) await syncGitLab(gitlabUser.trim());
    if (soUserId.trim()) await syncStackOverflow(soUserId.trim());
    setLoadingPlatform(null);
    onClose();
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
          background: 'rgba(0, 0, 0, 0.75)',
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
            maxWidth: '560px',
            background: 'var(--sp-surface-elevated)',
            border: '1px solid var(--sp-border)',
            borderRadius: 'var(--sp-radius-xl)',
            padding: '28px',
            boxShadow: 'var(--sp-shadow-lg)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--sp-text-primary)' }}>
                Sync Multiple Developer Platforms
              </h2>
              <p style={{ fontSize: '13px', color: 'var(--sp-text-secondary)' }}>
                Fetch real repositories, problem solving stats, and verified skills.
              </p>
            </div>
            <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--sp-text-tertiary)', fontSize: '18px', cursor: 'pointer' }}>
              ✕
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
            {/* GitHub */}
            <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
              <div style={{ flex: 1 }}>
                <Input
                  label="GitHub Username"
                  placeholder="e.g. torvalds"
                  value={githubUser}
                  onChange={(e) => setGithubUser(e.target.value)}
                />
              </div>
              <Button
                variant={connectedApps.github ? 'ghost' : 'secondary'}
                loading={loadingPlatform === 'github'}
                onClick={() => handleSyncPlatform('github')}
              >
                {connectedApps.github ? 'Re-sync ⟠' : 'Sync ⟠'}
              </Button>
            </div>

            {/* LeetCode */}
            <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
              <div style={{ flex: 1 }}>
                <Input
                  label="LeetCode Username"
                  placeholder="e.g. leetcode_user"
                  value={leetcodeUser}
                  onChange={(e) => setLeetcodeUser(e.target.value)}
                />
              </div>
              <Button
                variant={connectedApps.leetcode ? 'ghost' : 'secondary'}
                loading={loadingPlatform === 'leetcode'}
                onClick={() => handleSyncPlatform('leetcode')}
              >
                {connectedApps.leetcode ? 'Re-sync 🧩' : 'Sync 🧩'}
              </Button>
            </div>

            {/* GitLab */}
            <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
              <div style={{ flex: 1 }}>
                <Input
                  label="GitLab Username"
                  placeholder="e.g. gitlab_user"
                  value={gitlabUser}
                  onChange={(e) => setGitlabUser(e.target.value)}
                />
              </div>
              <Button
                variant={connectedApps.gitlab ? 'ghost' : 'secondary'}
                loading={loadingPlatform === 'gitlab'}
                onClick={() => handleSyncPlatform('gitlab')}
              >
                {connectedApps.gitlab ? 'Re-sync 🦊' : 'Sync 🦊'}
              </Button>
            </div>

            {/* StackOverflow */}
            <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
              <div style={{ flex: 1 }}>
                <Input
                  label="StackOverflow User ID"
                  placeholder="e.g. 123456"
                  value={soUserId}
                  onChange={(e) => setSoUserId(e.target.value)}
                />
              </div>
              <Button
                variant={connectedApps.stackoverflow ? 'ghost' : 'secondary'}
                loading={loadingPlatform === 'stackoverflow'}
                onClick={() => handleSyncPlatform('stackoverflow')}
              >
                {connectedApps.stackoverflow ? 'Re-sync 🥞' : 'Sync 🥞'}
              </Button>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Button variant="secondary" onClick={onClose}>
              Done
            </Button>
            <Button loading={loadingPlatform === 'all'} onClick={handleSyncAll}>
              Sync All Connected Accounts ✨
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
