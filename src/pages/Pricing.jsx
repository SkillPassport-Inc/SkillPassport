import { motion } from 'framer-motion';
import Button from '../components/Button.jsx';
import { useNavigate } from 'react-router-dom';

const tiers = [
  {
    name: 'Free', price: '₹0', period: 'forever', desc: 'Get started with a verified profile.',
    features: ['Verified profile', 'Connect GitHub', 'Basic analytics', 'Public portfolio', '3 repo analyses/month'],
    cta: 'Get Started', highlight: false,
  },
  {
    name: 'Pro', price: '₹1,299', period: '/month', desc: 'Unlock the full power of AI.',
    features: ['Everything in Free', 'AI Resume Builder', 'Career Coach', 'Advanced analytics', 'ATS optimization', 'Interview simulator', 'Unlimited repo analyses', 'Priority support'],
    cta: 'Start Free Trial', highlight: true,
  },
  {
    name: 'Recruiter', price: '₹3,999', period: '/month', desc: 'Find and verify top talent.',
    features: ['AI candidate search', 'Skill verification reports', 'Talent pipeline', 'Saved searches', 'Team management', 'Candidate comparison', 'API access'],
    cta: 'Contact Sales', highlight: false,
  },
  {
    name: 'Enterprise', price: 'Custom', period: '', desc: 'Internal skill mapping at scale.',
    features: ['Everything in Recruiter', 'Internal skill mapping', 'Workforce analytics', 'Team dashboards', 'SSO / SAML', 'Custom integrations', 'Dedicated support', 'SLA guarantee'],
    cta: 'Contact Sales', highlight: false,
  },
];

export default function Pricing() {
  const navigate = useNavigate();
  return (
    <div style={{ background: 'var(--sp-bg)', minHeight: '100vh' }}>
      <header style={{ height: '64px', borderBottom: '1px solid var(--sp-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 48px', background: 'rgba(9,9,11,0.8)', backdropFilter: 'blur(12px)', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} onClick={() => navigate('/')}>
          <div style={{ width: 28, height: 28, borderRadius: '6px', background: 'var(--sp-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '11px', color: 'white' }}>SP</div>
          <span style={{ fontSize: '16px', fontWeight: 700, color: 'var(--sp-text-primary)' }}>SkillPassport</span>
        </div>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <a onClick={() => navigate('/login')} style={{ fontSize: '14px', color: 'var(--sp-text-secondary)', cursor: 'pointer' }}>Login</a>
          <Button size="sm" onClick={() => navigate('/register')}>Get Started</Button>
        </div>
      </header>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 48px' }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <h1 style={{ fontSize: '48px', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--sp-text-primary)', marginBottom: '12px' }}>
            Simple, transparent pricing
          </h1>
          <p style={{ fontSize: '18px', color: 'var(--sp-text-secondary)' }}>Start free. Upgrade when you need more.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
          {tiers.map((tier) => (
            <div key={tier.name}
              style={{ background: 'var(--sp-surface-card)', border: `1px solid ${tier.highlight ? 'var(--sp-accent)' : 'var(--sp-border)'}`, borderRadius: 'var(--sp-radius-lg)', padding: '32px', display: 'flex', flexDirection: 'column', position: 'relative' }}>
              {tier.highlight && (
                <span style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: 'var(--sp-accent)', color: 'white', fontSize: '11px', fontWeight: 700, padding: '4px 12px', borderRadius: 'var(--sp-radius-full)', textTransform: 'uppercase' }}>Most Popular</span>
              )}
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--sp-text-primary)', marginBottom: '4px' }}>{tier.name}</h3>
              <p style={{ fontSize: '13px', color: 'var(--sp-text-tertiary)', marginBottom: '16px' }}>{tier.desc}</p>
              <div style={{ marginBottom: '24px' }}>
                <span style={{ fontSize: '40px', fontWeight: 700, color: 'var(--sp-text-primary)' }}>{tier.price}</span>
                <span style={{ fontSize: '14px', color: 'var(--sp-text-tertiary)' }}>{tier.period}</span>
              </div>
              <ul style={{ listStyle: 'none', flex: 1, display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
                {tier.features.map((f) => (
                  <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '14px', color: 'var(--sp-text-secondary)' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--sp-accent)" strokeWidth="2" style={{ marginTop: '2px', flexShrink: 0 }}><path d="M5 13l4 4L19 7" /></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <Button variant={tier.highlight ? 'primary' : 'secondary'} style={{ width: '100%' }}>{tier.cta}</Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
