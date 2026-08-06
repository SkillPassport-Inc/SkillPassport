import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore.js';
import AddSkillModal from './AddSkillModal.jsx';

const devLinks = [
  { path: '/dashboard', label: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { path: '/skills', label: 'Skills', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
  { path: '/skills/graph', label: 'Skill Graph', icon: 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1' },
  { path: '/repositories', label: 'Repositories', icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4' },
  { path: '/resume', label: 'Resume', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
  { path: '/analytics', label: 'Analytics', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
  { path: '/career', label: 'Career Coach', icon: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z' },
  { path: '/jobs', label: 'Jobs', icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
];

const recruiterLinks = [
  { path: '/recruiter', label: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { path: '/recruiter/search', label: 'Candidate Search', icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' },
];

const bottomLinks = [
  { path: '/settings', label: 'Settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
];

function SidebarIcon({ d }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}

export default function Sidebar({ variant = 'developer' }) {
  const navigate = useNavigate();
  const user = useAppStore((state) => state.user);
  const logout = useAppStore((state) => state.logout);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const links = variant === 'developer' ? devLinks : recruiterLinks;
  const initial = user.name ? user.name[0].toUpperCase() : 'P';

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: 'var(--sp-sidebar-width)',
          height: '100vh',
          background: 'var(--sp-surface-container-low)',
          borderRight: '1px solid var(--sp-border)',
          display: 'flex',
          flexDirection: 'column',
          padding: '16px 0',
          zIndex: 40,
          overflowY: 'auto',
        }}
      >
        <div
          onClick={() => navigate('/')}
          style={{ padding: '0 20px 20px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 'var(--sp-radius-md)',
              background: 'var(--sp-accent)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '14px',
              color: 'white',
              letterSpacing: '-0.02em',
            }}
          >
            SP
          </div>
          <div>
            <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--sp-text-primary)', letterSpacing: '-0.01em' }}>
              SkillPassport
            </div>
            <div style={{ fontSize: '11px', color: 'var(--sp-text-tertiary)', fontWeight: 500 }}>
              {variant === 'developer' ? 'Developer Pro' : 'Recruitment Suite'}
            </div>
          </div>
        </div>

        {variant === 'developer' && (
          <div style={{ padding: '0 16px 16px' }}>
            <button
              onClick={() => setIsAddModalOpen(true)}
              style={{
                width: '100%',
                background: 'var(--sp-accent)',
                color: 'white',
                border: 'none',
                borderRadius: 'var(--sp-radius-md)',
                padding: '10px 16px',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'background var(--sp-transition)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--sp-accent-hover)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--sp-accent)';
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14m-7-7h14" />
              </svg>
              Verify New Skill
            </button>
          </div>
        )}

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '10px 20px',
                fontSize: '13px',
                fontWeight: isActive ? 600 : 400,
                color: isActive ? 'var(--sp-text-primary)' : 'var(--sp-text-secondary)',
                borderLeft: isActive ? '2px solid var(--sp-accent)' : '2px solid transparent',
                background: isActive ? 'var(--sp-surface-container-high)' : 'transparent',
                transition: 'all var(--sp-transition)',
                textDecoration: 'none',
              })}
              onMouseEnter={(e) => {
                if (!e.currentTarget.classList.contains('active')) {
                  e.currentTarget.style.background = 'var(--sp-surface-container)';
                  e.currentTarget.style.color = 'var(--sp-text-primary)';
                }
              }}
              onMouseLeave={(e) => {
                if (!e.currentTarget.classList.contains('active')) {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = 'var(--sp-text-secondary)';
                }
              }}
            >
              <SidebarIcon d={link.icon} />
              {link.label}
            </NavLink>
          ))}
        </div>

        <div style={{ borderTop: '1px solid var(--sp-border)', paddingTop: '8px', marginTop: '8px' }}>
          {bottomLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '10px 20px',
                fontSize: '13px',
                fontWeight: 400,
                color: 'var(--sp-text-secondary)',
                textDecoration: 'none',
                transition: 'color var(--sp-transition)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--sp-text-primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--sp-text-secondary)';
              }}
            >
              <SidebarIcon d={link.icon} />
              {link.label}
            </NavLink>
          ))}

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 16px',
              borderTop: '1px solid var(--sp-border)',
              marginTop: '8px',
            }}
          >
            <div
              onClick={() => navigate(`/u/${user.githubUsername || 'user'}`)}
              style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', flex: 1, minWidth: 0 }}
            >
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
                  flexShrink: 0,
                }}
              >
                {initial}
              </div>
              <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--sp-text-primary)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                  {user.name}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--sp-text-tertiary)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                  {user.title || 'Developer'}
                </div>
              </div>
            </div>
            <button
              onClick={() => {
                logout();
                navigate('/login');
              }}
              title="Logout"
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--sp-text-tertiary)',
                cursor: 'pointer',
                padding: '4px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4m7 14l5-5-5-5m5 5H9" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      <AddSkillModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
    </>
  );
}
