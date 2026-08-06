import { useEffect, useState } from 'react';
import { Command } from 'cmdk';
import { useNavigate } from 'react-router-dom';

const pages = [
  { name: 'Dashboard', path: '/dashboard', icon: '📊' },
  { name: 'Skills', path: '/skills', icon: '✅' },
  { name: 'Skill Graph', path: '/skills/graph', icon: '🕸️' },
  { name: 'Repositories', path: '/repositories', icon: '📁' },
  { name: 'Resume Builder', path: '/resume', icon: '📄' },
  { name: 'Analytics', path: '/analytics', icon: '📈' },
  { name: 'Career Coach', path: '/career', icon: '🤖' },
  { name: 'Jobs', path: '/jobs', icon: '💼' },
  { name: 'Settings', path: '/settings', icon: '⚙️' },
  { name: 'Pricing', path: '/pricing', icon: '💳' },
  { name: 'Recruiter Dashboard', path: '/recruiter', icon: '👥' },
  { name: 'Recruiter Search', path: '/recruiter/search', icon: '🔍' },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  if (!open) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: '20vh',
        background: 'rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(8px)',
      }}
      onClick={() => setOpen(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '560px',
          background: 'var(--sp-surface-elevated)',
          border: '1px solid var(--sp-border)',
          borderRadius: 'var(--sp-radius-xl)',
          overflow: 'hidden',
          boxShadow: 'var(--sp-shadow-lg)',
        }}
      >
        <Command label="Command palette" loop>
          <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--sp-border)' }}>
            <Command.Input
              placeholder="Type a command or search..."
              autoFocus
              style={{
                width: '100%',
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: 'var(--sp-text-primary)',
                fontSize: '16px',
                fontFamily: 'var(--sp-font)',
              }}
            />
          </div>
          <Command.List
            style={{
              maxHeight: '320px',
              overflow: 'auto',
              padding: '8px',
            }}
          >
            <Command.Empty
              style={{
                padding: '32px',
                textAlign: 'center',
                color: 'var(--sp-text-tertiary)',
                fontSize: '14px',
              }}
            >
              No results found.
            </Command.Empty>

            <Command.Group
              heading="Pages"
              style={{
                padding: '4px 0',
              }}
            >
              {pages.map((page) => (
                <Command.Item
                  key={page.path}
                  value={page.name}
                  onSelect={() => {
                    navigate(page.path);
                    setOpen(false);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '10px 12px',
                    borderRadius: 'var(--sp-radius-md)',
                    cursor: 'pointer',
                    fontSize: '14px',
                    color: 'var(--sp-text-on-surface)',
                    transition: 'background var(--sp-transition-fast)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--sp-surface-container-high)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  <span style={{ fontSize: '16px' }}>{page.icon}</span>
                  <span>{page.name}</span>
                </Command.Item>
              ))}
            </Command.Group>
          </Command.List>

          <div
            style={{
              padding: '8px 16px',
              borderTop: '1px solid var(--sp-border)',
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '8px',
            }}
          >
            <span style={{ fontSize: '11px', color: 'var(--sp-text-tertiary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <kbd style={{ background: 'var(--sp-surface-container-high)', padding: '2px 6px', borderRadius: '4px', fontSize: '10px', border: '1px solid var(--sp-border)' }}>↵</kbd>
              to select
            </span>
            <span style={{ fontSize: '11px', color: 'var(--sp-text-tertiary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <kbd style={{ background: 'var(--sp-surface-container-high)', padding: '2px 6px', borderRadius: '4px', fontSize: '10px', border: '1px solid var(--sp-border)' }}>esc</kbd>
              to close
            </span>
          </div>
        </Command>
      </div>
    </div>
  );
}
