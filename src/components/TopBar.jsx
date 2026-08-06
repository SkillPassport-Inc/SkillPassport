import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore.js';
import SyncGitHubModal from './SyncGitHubModal.jsx';

export default function TopBar() {
  const navigate = useNavigate();
  const user = useAppStore((state) => state.user);
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);

  const initial = user.name ? user.name[0].toUpperCase() : 'P';

  return (
    <>
      <header
        style={{
          height: 'var(--sp-header-height)',
          borderBottom: '1px solid var(--sp-border)',
          background: 'rgba(9, 9, 11, 0.8)',
          backdropFilter: 'blur(12px)',
          position: 'sticky',
          top: 0,
          zIndex: 30,
          padding: '0 var(--sp-space-2xl)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ flex: 1, maxWidth: '480px' }}>
          <div
            style={{ position: 'relative', cursor: 'pointer' }}
            onClick={() => {
              document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true }));
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--sp-text-tertiary)"
              strokeWidth="2"
              style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <div
              style={{
                width: '100%',
                background: 'var(--sp-surface-card)',
                border: '1px solid var(--sp-border)',
                borderRadius: 'var(--sp-radius-md)',
                padding: '8px 16px 8px 40px',
                color: 'var(--sp-text-tertiary)',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <span>Search skills, repos, projects...</span>
              <kbd
                style={{
                  background: 'var(--sp-surface-container-high)',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  fontSize: '11px',
                  border: '1px solid var(--sp-border)',
                  color: 'var(--sp-text-tertiary)',
                }}
              >
                ⌘K
              </kbd>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button
            onClick={() => setIsSyncModalOpen(true)}
            style={{
              background: 'var(--sp-surface-container-high)',
              border: '1px solid var(--sp-border)',
              borderRadius: 'var(--sp-radius-md)',
              padding: '6px 12px',
              color: 'var(--sp-accent-light)',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'border-color var(--sp-transition)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--sp-accent)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--sp-border)';
            }}
          >
            <span>⟠</span>
            <span>Sync GitHub</span>
          </button>

          <button
            style={{
              position: 'relative',
              background: 'none',
              border: 'none',
              color: 'var(--sp-text-secondary)',
              padding: '8px',
              borderRadius: 'var(--sp-radius-md)',
              transition: 'color var(--sp-transition)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--sp-text-primary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--sp-text-secondary)';
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span
              style={{
                position: 'absolute',
                top: '6px',
                right: '6px',
                width: '8px',
                height: '8px',
                background: 'var(--sp-accent)',
                borderRadius: '50%',
                border: '2px solid var(--sp-bg)',
              }}
            />
          </button>

          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 'var(--sp-radius-full)',
              background: 'var(--sp-surface-container-high)',
              border: '1px solid var(--sp-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '13px',
              fontWeight: 600,
              color: 'var(--sp-accent-light)',
              cursor: 'pointer',
              transition: 'border-color var(--sp-transition)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--sp-accent)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--sp-border)';
            }}
            onClick={() => navigate(`/u/${user.githubUsername || 'user'}`)}
            title="View Public Verified Passport"
          >
            {initial}
          </div>
        </div>
      </header>

      <SyncGitHubModal isOpen={isSyncModalOpen} onClose={() => setIsSyncModalOpen(false)} />
    </>
  );
}
