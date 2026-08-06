import { motion } from 'framer-motion';
import { useAppStore } from '../store/useAppStore.js';
import ProgressRing from '../components/ProgressRing.jsx';
import Badge from '../components/Badge.jsx';
import Card from '../components/Card.jsx';
import Button from '../components/Button.jsx';
import { useNavigate } from 'react-router-dom';

export default function PublicProfile() {
  const navigate = useNavigate();
  const user = useAppStore((state) => state.user);
  const skills = useAppStore((state) => state.skills);
  const repositories = useAppStore((state) => state.repositories);

  const initial = user.name ? user.name[0].toUpperCase() : 'P';

  return (
    <div style={{ background: 'var(--sp-bg)', minHeight: '100vh' }}>
      <header style={{ height: '64px', borderBottom: '1px solid var(--sp-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 48px', background: 'rgba(9,9,11,0.8)', backdropFilter: 'blur(12px)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} onClick={() => navigate('/')}>
          <div style={{ width: 28, height: 28, borderRadius: '6px', background: 'var(--sp-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '11px', color: 'white' }}>SP</div>
          <span style={{ fontSize: '16px', fontWeight: 700, color: 'var(--sp-text-primary)' }}>SkillPassport</span>
        </div>
        <Button size="sm" onClick={() => navigate('/dashboard')}>
          Back to Dashboard
        </Button>
      </header>

      <div style={{ maxWidth: '1024px', margin: '0 auto', padding: '48px 24px', display: 'grid', gridTemplateColumns: '320px 1fr', gap: '32px' }}>
        <aside style={{ position: 'sticky', top: '80px', alignSelf: 'start' }}>
          <Card padding="32px" hover={false}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <div style={{ position: 'relative', marginBottom: '16px' }}>
                <div style={{ width: 100, height: 100, borderRadius: '50%', background: 'var(--sp-surface-container-high)', border: '3px solid var(--sp-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '36px', fontWeight: 700, color: 'var(--sp-accent-light)' }}>
                  {initial}
                </div>
                <div style={{ position: 'absolute', bottom: 2, right: 2, width: 26, height: 26, borderRadius: '50%', background: 'var(--sp-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '3px solid var(--sp-surface-card)' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="white"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                </div>
              </div>
              <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--sp-text-primary)', marginBottom: '2px' }}>{user.name}</h2>
              <p style={{ fontSize: '14px', color: 'var(--sp-text-secondary)', marginBottom: '8px' }}>{user.title}</p>
              <Badge variant="accent">Identity Verified</Badge>
              <p style={{ fontSize: '13px', color: 'var(--sp-text-secondary)', marginTop: '16px', lineHeight: 1.6, textAlign: 'left' }}>{user.bio}</p>
              <div style={{ display: 'flex', gap: '8px', width: '100%', marginTop: '16px' }}>
                {user.githubUsername && (
                  <a
                    href={`https://github.com/${user.githubUsername}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ flex: 1, textDecoration: 'none' }}
                  >
                    <Button variant="secondary" size="sm" style={{ width: '100%' }}>GitHub ↗</Button>
                  </a>
                )}
                <Button variant="secondary" size="sm" style={{ flex: 1 }}>Portfolio</Button>
              </div>
              <Button style={{ width: '100%', marginTop: '12px' }}>Connect</Button>
            </div>
          </Card>
        </aside>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
            {[
              { label: 'Projects', value: user.stats.projects },
              { label: 'Commits', value: user.stats.commits.toLocaleString() },
              { label: 'REST APIs', value: user.stats.apis },
              { label: 'Merged PRs', value: user.stats.prs },
            ].map((s) => (
              <Card key={s.label} padding="16px" hover={false}>
                <div style={{ fontSize: '22px', fontWeight: 700, color: 'var(--sp-text-primary)' }}>{s.value}</div>
                <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--sp-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{s.label}</div>
              </Card>
            ))}
          </div>

          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--sp-text-primary)', marginBottom: '12px' }}>
              Verified Skill Scores ({skills.length})
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
              {skills.map((skill) => (
                <Card key={skill.id} glow padding="16px">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontSize: '16px', fontWeight: 600, color: 'var(--sp-text-primary)' }}>{skill.name}</div>
                      <div style={{ fontSize: '11px', color: 'var(--sp-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>{skill.category}</div>
                    </div>
                    <ProgressRing value={skill.score} size={56} strokeWidth={3} />
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--sp-text-primary)', marginBottom: '12px' }}>
              Analyzed Repositories ({repositories.length})
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {repositories.map((repo) => (
                <Card key={repo.id} padding="16px" glow>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--sp-text-primary)' }}>{repo.name}</div>
                      <div style={{ display: 'flex', gap: '12px', marginTop: '4px', fontSize: '12px', color: 'var(--sp-text-tertiary)' }}>
                        <span>{repo.lang.name}</span>
                        <span>⭐ {repo.stars}</span>
                        <span>🔀 {repo.forks}</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <span style={{ fontSize: '20px', fontWeight: 700, color: 'var(--sp-text-primary)' }}>{repo.overall}</span>
                      <span style={{ fontSize: '9px', color: 'var(--sp-text-tertiary)', fontWeight: 600 }}>/100</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
