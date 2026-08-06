import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore.js';
import Button from '../components/Button.jsx';
import Input from '../components/Input.jsx';

export default function Login() {
  const navigate = useNavigate();
  const login = useAppStore((state) => state.login);

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const finalEmail = email || 'user@example.com';
    const finalName = name || finalEmail.split('@')[0];
    login(finalEmail, finalName, 'developer');

    if (!useAppStore.getState().user.isProfileSetup) {
      navigate('/onboarding');
    } else {
      navigate('/dashboard');
    }
  };

  const handleQuickOAuth = (provider) => {
    login(`${provider.toLowerCase()}@developer.com`, `${provider} User`, 'developer');
    navigate('/onboarding');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--sp-bg)',
        padding: '24px',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          width: '100%',
          maxWidth: '420px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div
          onClick={() => navigate('/')}
          style={{
            width: 48,
            height: 48,
            borderRadius: 'var(--sp-radius-lg)',
            background: 'var(--sp-accent)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800,
            fontSize: '18px',
            color: 'white',
            marginBottom: '24px',
            cursor: 'pointer',
          }}
        >
          SP
        </div>

        <h1 style={{ fontSize: '28px', fontWeight: 700, color: 'var(--sp-text-primary)', marginBottom: '8px', letterSpacing: '-0.02em' }}>
          Welcome back
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--sp-text-secondary)', marginBottom: '32px' }}>
          Sign in to your SkillPassport account
        </p>

        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
          {[
            { name: 'GitHub', icon: '⟠' },
            { name: 'Google', icon: 'G' },
            { name: 'GitLab', icon: '◆' },
          ].map((provider) => (
            <button
              key={provider.name}
              onClick={() => handleQuickOAuth(provider.name)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                padding: '12px',
                background: 'var(--sp-surface-card)',
                border: '1px solid var(--sp-border)',
                borderRadius: 'var(--sp-radius-md)',
                color: 'var(--sp-text-on-surface)',
                fontSize: '14px',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'border-color var(--sp-transition)',
                fontFamily: 'var(--sp-font)',
              }}
            >
              <span style={{ fontSize: '18px' }}>{provider.icon}</span>
              Continue with {provider.name}
            </button>
          ))}
        </div>

        <div style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
          <div style={{ flex: 1, height: '1px', background: 'var(--sp-border)' }} />
          <span style={{ fontSize: '12px', color: 'var(--sp-text-tertiary)' }}>OR LOGIN</span>
          <div style={{ flex: 1, height: '1px', background: 'var(--sp-border)' }} />
        </div>

        <form onSubmit={handleLogin} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>
          <Input
            label="Your Name"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            label="Email Address"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Button type="submit" style={{ width: '100%', marginTop: '8px' }} size="lg">
            Sign In & Setup Profile →
          </Button>
        </form>

        <p style={{ fontSize: '13px', color: 'var(--sp-text-tertiary)' }}>
          Don't have an account?{' '}
          <a onClick={() => navigate('/register')} style={{ color: 'var(--sp-accent-light)', cursor: 'pointer', fontWeight: 500 }}>
            Sign up
          </a>
        </p>
      </motion.div>
    </div>
  );
}
