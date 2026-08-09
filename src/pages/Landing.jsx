import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button.jsx';

const trustedCompanies = ['Microsoft', 'Google', 'Amazon', 'Netflix', 'Spotify', 'Adobe'];

const features = [
  {
    title: 'Verified Skill Scores',
    desc: 'Every skill is backed by measurable evidence from your actual work — commits, PRs, architecture, and code quality.',
    icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
  },
  {
    title: 'AI Repository Analysis',
    desc: 'Our AI engine downloads and parses your repositories, detecting frameworks, calculating complexity, and scoring quality.',
    icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
  },
  {
    title: 'Smart Resume Builder',
    desc: 'Generate ATS-optimized resumes tailored to specific job descriptions. Export as PDF, DOCX, or HTML.',
    icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
  },
  {
    title: 'AI Career Coach',
    desc: 'Get personalized career advice. Identify skill gaps, recommended courses, and a clear roadmap to your target role.',
    icon: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z',
  },
  {
    title: 'Interactive Skill Graph',
    desc: 'Visualize how your skills connect. Explore technology relationships and discover learning paths.',
    icon: 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1',
  },
  {
    title: 'Recruiter AI Search',
    desc: 'Recruiters find verified candidates instantly. Search by skills, experience, location, and open-source contributions.',
    icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
  },
];

const stats = [
  { value: '100K+', label: 'Developers' },
  { value: '2M+', label: 'Skills Verified' },
  { value: '500K+', label: 'Repos Analyzed' },
  { value: '94%', label: 'Match Accuracy' },
];

const pricingTiers = [
  {
    name: 'Free',
    price: '₹0',
    period: 'forever',
    desc: 'Get started with a verified profile.',
    features: ['Verified profile', 'GitHub connection', 'Basic analytics', 'Public portfolio'],
    cta: 'Get Started',
    highlight: false,
  },
  {
    name: 'Developer Pro',
    price: '₹1,299',
    period: '/month',
    desc: 'Unlock the full power of AI.',
    features: ['AI Resume Builder', 'AI Career Coach', 'ATS optimization', 'Unlimited repo analysis'],
    cta: 'Start Free Trial',
    highlight: true,
  },
  {
    name: 'Recruiter',
    price: '₹3,999',
    period: '/month',
    desc: 'Find and verify top talent.',
    features: ['AI candidate search', 'Talent pipeline', 'Verified skill reports', 'Candidate comparison'],
    cta: 'Contact Sales',
    highlight: false,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    desc: 'Internal skill mapping at scale.',
    features: ['Internal workforce skill mapping', 'Team dashboards', 'SSO / SAML'],
    cta: 'Contact Sales',
    highlight: false,
  },
];

function FeatureIcon({ d }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--sp-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div style={{ background: 'radial-gradient(circle at 15% 15%, rgba(79,70,229,0.22) 0%, transparent 45%), radial-gradient(circle at 85% 45%, rgba(124,58,237,0.18) 0%, transparent 45%), radial-gradient(circle at 35% 85%, rgba(192,132,252,0.15) 0%, transparent 45%), #09090B', minHeight: '100vh', position: 'relative' }}>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          height: '64px',
          background: 'rgba(9, 9, 11, 0.8)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid var(--sp-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 48px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 'var(--sp-radius-md)',
              background: 'var(--sp-accent)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '12px',
              color: 'white',
            }}
          >
            SP
          </div>
          <span style={{ fontSize: '18px', fontWeight: 700, color: 'var(--sp-text-primary)', letterSpacing: '-0.01em' }}>
            SkillPassport
          </span>
        </div>
        <nav style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <a href="#features" style={{ color: 'var(--sp-text-secondary)', fontSize: '14px', fontWeight: 500 }}>
            Features
          </a>
          <a href="#pricing" style={{ color: 'var(--sp-text-secondary)', fontSize: '14px', fontWeight: 500 }}>
            Pricing
          </a>
          <button
            onClick={() => navigate('/login')}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--sp-text-secondary)',
              fontSize: '14px',
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            Login
          </button>
          <Button size="sm" onClick={() => navigate('/register')}>
            Get Started
          </Button>
        </nav>
      </header>

      <section
        style={{
          position: 'relative',
          zIndex: 1,
          paddingTop: '160px',
          paddingBottom: '80px',
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '160px 48px 80px',
          display: 'flex',
          alignItems: 'center',
          gap: '64px',
        }}
      >
        <div style={{ flex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'var(--sp-surface-card)',
              border: '1px solid var(--sp-border)',
              borderRadius: 'var(--sp-radius-full)',
              padding: '4px 12px',
              marginBottom: '24px',
              fontSize: '12px',
              fontWeight: 600,
              color: 'var(--sp-text-secondary)',
            }}
          >
            <span style={{ color: 'var(--sp-accent-light)' }}>★</span>
            100K+ Developers Verified
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            style={{
              fontSize: '64px',
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: '-0.03em',
              color: 'var(--sp-text-primary)',
              marginBottom: '20px',
            }}
          >
            Verified Skills.
            <br />
            <span style={{ color: 'var(--sp-text-secondary)' }}>Trusted by Recruiters.</span>
            <br />
            Built from Real Work.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            style={{
              fontSize: '18px',
              lineHeight: 1.6,
              color: 'var(--sp-text-secondary)',
              marginBottom: '32px',
              maxWidth: '520px',
            }}
          >
            The Verified Identity Platform for Software Engineers. Prove technical expertise with real evidence, not just a resume.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            style={{ display: 'flex', gap: '12px' }}
          >
            <Button size="lg" onClick={() => navigate('/register')}>
              Start Free
            </Button>
            <Button variant="secondary" size="lg" onClick={() => navigate('/dashboard')}>
              Explore Demo
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          style={{ flex: 1, maxWidth: '540px' }}
        >
          <div
            style={{
              background: 'var(--sp-surface-card)',
              border: '1px solid var(--sp-border)',
              borderRadius: 'var(--sp-radius-xl)',
              padding: '24px',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '12px', borderBottom: '1px solid var(--sp-border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--sp-accent)" strokeWidth="2">
                  <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                <span style={{ fontSize: '16px', fontWeight: 600 }}>Code Analysis</span>
              </div>
              <span
                style={{
                  background: 'var(--sp-accent-muted)',
                  color: 'var(--sp-accent-light)',
                  padding: '4px 10px',
                  borderRadius: 'var(--sp-radius-full)',
                  fontSize: '11px',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                ✓ Verified
              </span>
            </div>

            {[
              { name: 'Java / Spring Boot', value: 96 },
              { name: 'Python AI Engine', value: 92 },
              { name: 'React / JavaScript', value: 88 },
            ].map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + i * 0.1 }}
                style={{ marginBottom: '14px' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 600, color: 'var(--sp-text-secondary)', marginBottom: '6px', letterSpacing: '0.03em', textTransform: 'uppercase' }}>
                  <span>{skill.name}</span>
                  <span style={{ color: 'var(--sp-accent-light)' }}>{skill.value}%</span>
                </div>
                <div style={{ height: '3px', background: 'var(--sp-border)', borderRadius: '2px', overflow: 'hidden' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.value}%` }}
                    transition={{ delay: 0.8 + i * 0.1, duration: 0.8, ease: 'easeOut' }}
                    style={{ height: '100%', background: 'var(--sp-accent)', borderRadius: '2px' }}
                  />
                </div>
              </motion.div>
            ))}

            <div
              style={{
                background: 'var(--sp-bg)',
                border: '1px solid var(--sp-border)',
                borderRadius: 'var(--sp-radius-md)',
                padding: '14px',
                fontFamily: 'var(--sp-font-mono)',
                fontSize: '12px',
                color: 'var(--sp-text-secondary)',
                lineHeight: 1.6,
                marginTop: '4px',
              }}
            >
              <span style={{ color: 'var(--sp-accent-light)' }}>export const</span>{' '}
              <span style={{ color: '#F59E0B' }}>verifySkill</span> ={' '}
              <span style={{ color: 'var(--sp-accent-light)' }}>async</span> (repoId) =&gt; {'{\n'}
              {'  '}const evidence = await analyzer.extract(repoId);{'\n'}
              {'  '}return passport.issue(evidence);{'\n'}
              {'}'};
            </div>
          </div>
        </motion.div>
      </section>

      <section style={{ borderTop: '1px solid var(--sp-border)', borderBottom: '1px solid var(--sp-border)', padding: '48px 0', overflow: 'hidden', position: 'relative', zIndex: 1 }}>
        <p
          style={{
            textAlign: 'center',
            fontSize: '12px',
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--sp-text-tertiary)',
            marginBottom: '32px',
          }}
        >
          Trusted by engineering teams at
        </p>

        {/* 60FPS Pure CSS Infinite Marquee Moving Left */}
        <div className="marquee-container">
          <div className="marquee-track">
            {[...trustedCompanies, ...trustedCompanies, ...trustedCompanies, ...trustedCompanies, ...trustedCompanies, ...trustedCompanies].map((company, i) => (
              <span
                key={i}
                style={{
                  fontSize: '22px',
                  fontWeight: 700,
                  color: 'var(--sp-text-secondary)',
                  opacity: 0.6,
                  whiteSpace: 'nowrap',
                  letterSpacing: '-0.02em',
                }}
              >
                {company}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section id="features" style={{ padding: '80px 48px', maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <h2 style={{ fontSize: '40px', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--sp-text-primary)', marginBottom: '12px' }}>
            Everything you need to prove your expertise
          </h2>
          <p style={{ fontSize: '18px', color: 'var(--sp-text-secondary)', maxWidth: '560px', margin: '0 auto' }}>
            Not a resume. Not LinkedIn. A platform that proves technical expertise with real evidence.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {features.map((f) => (
            <div
              key={f.title}
              style={{
                background: 'var(--sp-surface-card)',
                border: '1px solid var(--sp-border)',
                borderRadius: 'var(--sp-radius-lg)',
                padding: '28px',
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 'var(--sp-radius-md)',
                  background: 'var(--sp-accent-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px',
                }}
              >
                <FeatureIcon d={f.icon} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--sp-text-primary)', marginBottom: '8px' }}>
                {f.title}
              </h3>
              <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--sp-text-secondary)' }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="pricing" style={{ padding: '80px 48px', maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <h2 style={{ fontSize: '40px', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--sp-text-primary)', marginBottom: '12px' }}>
            Simple, transparent pricing
          </h2>
          <p style={{ fontSize: '18px', color: 'var(--sp-text-secondary)' }}>
            Start free. Upgrade when you need more.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', maxWidth: '1200px', margin: '0 auto' }}>
          {pricingTiers.map((tier) => (
            <div
              key={tier.name}
              style={{
                background: 'var(--sp-surface-card)',
                border: `1px solid ${tier.highlight ? 'var(--sp-accent)' : 'var(--sp-border)'}`,
                borderRadius: 'var(--sp-radius-lg)',
                padding: '32px',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
              }}
            >
              {tier.highlight && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-12px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'var(--sp-accent)',
                    color: 'white',
                    fontSize: '11px',
                    fontWeight: 700,
                    padding: '4px 12px',
                    borderRadius: 'var(--sp-radius-full)',
                    textTransform: 'uppercase',
                  }}
                >
                  Most Popular
                </span>
              )}
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--sp-text-primary)', marginBottom: '4px' }}>
                {tier.name}
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--sp-text-tertiary)', marginBottom: '16px' }}>{tier.desc}</p>
              <div style={{ marginBottom: '24px' }}>
                <span style={{ fontSize: '40px', fontWeight: 700, color: 'var(--sp-text-primary)' }}>
                  {tier.price}
                </span>
                <span style={{ fontSize: '14px', color: 'var(--sp-text-tertiary)' }}>{tier.period}</span>
              </div>
              <ul style={{ listStyle: 'none', flex: 1, display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
                {tier.features.map((f) => (
                  <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '14px', color: 'var(--sp-text-secondary)' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--sp-accent)" strokeWidth="2" style={{ marginTop: '2px', flexShrink: 0 }}>
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <Button variant={tier.highlight ? 'primary' : 'secondary'} style={{ width: '100%' }} onClick={() => navigate('/register')}>
                {tier.cta}
              </Button>
            </div>
          ))}
        </div>
      </section>

      <footer
        style={{
          borderTop: '1px solid var(--sp-border)',
          padding: '32px 48px',
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--sp-text-primary)' }}>SkillPassport</span>
          <span style={{ fontSize: '13px', color: 'var(--sp-text-tertiary)' }}>© 2026 SkillPassport Inc. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
