import { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../components/Button.jsx';
import { useNavigate } from 'react-router-dom';
import { useAppStore, getSubscriptionDetails } from '../store/useAppStore.js';
import { openRazorpayCheckout } from '../utils/razorpay.js';

const tiers = [
  {
    name: 'Free',
    amount: 0,
    price: '₹0',
    period: 'forever',
    desc: 'Get started with a verified profile.',
    features: ['Verified profile', 'GitHub connection', 'Basic analytics', 'Public portfolio'],
    cta: 'Get Started',
    highlight: false,
  },
  {
    name: 'Developer Pro',
    amount: 1299,
    price: '₹1,299',
    period: '/month',
    desc: 'Unlock full AI suite (7-Day Free Trial on signup).',
    features: ['AI Resume Builder', 'AI Career Coach', 'ATS optimization', 'Unlimited repo analysis'],
    cta: 'Pay with Razorpay 💳',
    highlight: true,
  },
  {
    name: 'Recruiter',
    amount: 3999,
    price: '₹3,999',
    period: '/month',
    desc: 'Find and verify top talent.',
    features: ['AI candidate search', 'Talent pipeline', 'Verified skill reports', 'Candidate comparison'],
    cta: 'Pay with Razorpay 💳',
    highlight: false,
  },
  {
    name: 'Enterprise',
    amount: 0,
    price: 'Custom',
    period: '',
    desc: 'Internal skill mapping at scale.',
    features: ['Internal workforce skill mapping', 'Team dashboards', 'SSO / SAML'],
    cta: 'Contact Sales',
    highlight: false,
  },
];

export default function Pricing() {
  const navigate = useNavigate();
  const user = useAppStore((state) => state.user);
  const subscribePlan = useAppStore((state) => state.subscribePlan);
  const [loadingTier, setLoadingTier] = useState(null);

  const subDetails = getSubscriptionDetails(user);

  const handleSubscribe = async (tier) => {
    if (tier.amount === 0) {
      if (tier.name === 'Free') {
        navigate('/register');
      } else {
        alert('Thank you for your interest! Our Enterprise team will contact you shortly.');
      }
      return;
    }

    setLoadingTier(tier.name);

    try {
      await openRazorpayCheckout({
        amount: tier.amount,
        planName: tier.name,
        userEmail: user.email,
        userName: user.name,
        onSuccess: (paymentDetails) => {
          subscribePlan({
            planName: tier.name,
            paymentId: paymentDetails.paymentId,
            amount: tier.amount,
          });
          setLoadingTier(null);
          alert(`🎉 Payment Successful! You are now subscribed to ${tier.name} Plan via Razorpay (ID: ${paymentDetails.paymentId}).`);
          navigate('/dashboard');
        },
        onCancel: () => {
          setLoadingTier(null);
        },
      });
    } catch (err) {
      setLoadingTier(null);
      console.error('Razorpay Error:', err);
    }
  };

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

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 48px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'var(--sp-accent-muted)', border: '1px solid rgba(79,70,229,0.3)', padding: '6px 16px', borderRadius: 'var(--sp-radius-full)', fontSize: '13px', color: 'var(--sp-accent-light)', fontWeight: 600, marginBottom: '16px' }}>
            💳 Powered by Razorpay Payment Gateway
          </div>
          <h1 style={{ fontSize: '48px', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--sp-text-primary)', marginBottom: '12px' }}>
            Simple, transparent pricing
          </h1>
          <p style={{ fontSize: '18px', color: 'var(--sp-text-secondary)', marginBottom: '20px' }}>
            Every new developer account includes a <strong>7-Day Free Developer Pro Trial</strong>.
          </p>

          {/* Active Subscription / Trial Status Banner */}
          {user?.email && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'inline-block', background: subDetails.isExpired ? 'var(--sp-warning-muted)' : 'rgba(79,70,229,0.15)', border: `1px solid ${subDetails.isExpired ? 'var(--sp-warning)' : 'var(--sp-accent)'}`, padding: '10px 24px', borderRadius: 'var(--sp-radius-md)', color: 'var(--sp-text-primary)', fontSize: '14px', fontWeight: 600 }}>
              {subDetails.badgeText}
            </motion.div>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
          {tiers.map((tier) => {
            const isCurrent = subDetails.plan === tier.name || (tier.name === 'Developer Pro' && subDetails.isTrial);
            return (
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
                  <span style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: 'var(--sp-accent)', color: 'white', fontSize: '11px', fontWeight: 700, padding: '4px 12px', borderRadius: 'var(--sp-radius-full)', textTransform: 'uppercase' }}>
                    {subDetails.isTrial ? '7-Day Free Trial' : 'Most Popular'}
                  </span>
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

                <Button
                  variant={tier.highlight ? 'primary' : 'secondary'}
                  style={{ width: '100%' }}
                  loading={loadingTier === tier.name}
                  onClick={() => handleSubscribe(tier)}
                >
                  {isCurrent && subDetails.isPaid ? 'Current Active Plan' : (isCurrent && subDetails.isTrial ? `Upgrade Plan (${subDetails.daysRemaining} Days Trial Left)` : tier.cta)}
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
