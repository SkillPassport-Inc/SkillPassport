import { useState } from 'react';
import { motion } from 'framer-motion';
import Card from '../components/Card.jsx';
import Button from '../components/Button.jsx';
import Badge from '../components/Badge.jsx';

const candidates = [
  {
    name: 'Alex Chen', title: 'Senior Frontend', match: 98, verified: true,
    skills: [{ name: 'React', level: 95 }, { name: 'JavaScript', level: 90 }, { name: 'Node.js', level: 60 }],
    bio: 'Experienced frontend architect specializing in high-performance React applications. Verified history of scaling complex SPAs.',
  },
  {
    name: 'Sarah Jenkins', title: 'Full Stack Eng', match: 92, verified: true,
    skills: [{ name: 'React', level: 85 }, { name: 'JavaScript', level: 85 }, { name: 'GraphQL', level: 75 }],
    bio: 'Strong background in modern web stacks. Recently verified open-source contributions in popular JavaScript repositories.',
  },
  {
    name: 'Marcus Wright', title: 'Backend Engineer', match: 87, verified: true,
    skills: [{ name: 'Java', level: 92 }, { name: 'Spring Boot', level: 88 }, { name: 'Kafka', level: 78 }],
    bio: 'Distributed systems specialist with deep expertise in Java microservices. 5+ years of enterprise experience.',
  },
  {
    name: 'Aisha Patel', title: 'Platform Engineer', match: 84, verified: false,
    skills: [{ name: 'Kubernetes', level: 90 }, { name: 'Docker', level: 92 }, { name: 'Terraform', level: 85 }],
    bio: 'Infrastructure expert focused on Kubernetes and cloud-native architectures. AWS certified solutions architect.',
  },
];

export default function RecruiterSearch() {
  const [searchQuery, setSearchQuery] = useState('React + JavaScript + 5+ Years');

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h1 style={{ fontSize: '36px', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--sp-text-primary)', marginBottom: '4px' }}>Candidate Search</h1>
        <p style={{ fontSize: '16px', color: 'var(--sp-text-secondary)' }}>Discover and verify top engineering talent instantly.</p>
      </div>

      <div style={{ position: 'relative', maxWidth: '800px' }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--sp-text-tertiary)" strokeWidth="2" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }}>
          <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
        </svg>
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: '100%', background: 'var(--sp-surface-card)', border: '1px solid var(--sp-border)', borderRadius: 'var(--sp-radius-md)', padding: '14px 120px 14px 44px', color: 'var(--sp-text-on-surface)', fontSize: '15px', fontFamily: 'var(--sp-font)', outline: 'none' }}
        />
        <button style={{ position: 'absolute', right: '4px', top: '4px', bottom: '4px', background: 'var(--sp-accent)', color: 'white', border: 'none', borderRadius: 'var(--sp-radius-md)', padding: '0 20px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--sp-font)' }}>
          ✨ AI Search
        </button>
      </div>

      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {['React', 'JavaScript', 'Experience: 5+ Years'].map((f) => (
          <span key={f} style={{ background: 'var(--sp-surface-container-high)', border: '1px solid var(--sp-border)', borderRadius: 'var(--sp-radius-full)', padding: '4px 12px', fontSize: '12px', fontWeight: 500, color: 'var(--sp-text-secondary)', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
            {f} <span style={{ opacity: 0.5 }}>×</span>
          </span>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--sp-border)', paddingBottom: '8px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--sp-text-primary)' }}>AI Matches ({candidates.length})</h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
        {candidates.map((c) => (
          <div key={c.name}>
            <Card padding="24px" glow>
              <div style={{ display: 'flex', gap: '20px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', minWidth: '100px', borderRight: '1px solid var(--sp-border)', paddingRight: '20px' }}>
                  <div style={{ position: 'relative' }}>
                    <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--sp-surface-container-high)', border: '1px solid var(--sp-border-hover)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', fontWeight: 700, color: 'var(--sp-accent-light)' }}>
                      {c.name[0]}
                    </div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--sp-text-primary)' }}>{c.name}</div>
                    <div style={{ fontSize: '11px', color: 'var(--sp-text-tertiary)' }}>{c.title}</div>
                  </div>
                  <Badge variant="accent">✨ {c.match}% Match</Badge>
                </div>

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
                      {c.skills.map((s) => (
                        <div key={s.name} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'var(--sp-bg)', border: '1px solid var(--sp-border)', borderRadius: 'var(--sp-radius-sm)', padding: '4px 10px' }}>
                          <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--sp-text-primary)' }}>{s.name}</span>
                          <div style={{ width: '40px', height: '3px', background: 'var(--sp-border)', borderRadius: '2px', overflow: 'hidden' }}>
                            <div style={{ width: `${s.level}%`, height: '100%', background: 'var(--sp-accent)', borderRadius: '2px' }} />
                          </div>
                        </div>
                      ))}
                    </div>
                    <p style={{ fontSize: '13px', color: 'var(--sp-text-secondary)', lineHeight: 1.5 }}>{c.bio}</p>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '16px' }}>
                    <Button variant="secondary" size="sm">View Profile</Button>
                    <Button size="sm">Add to Pipeline</Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
