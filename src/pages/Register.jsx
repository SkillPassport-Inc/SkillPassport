import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore.js';
import Button from '../components/Button.jsx';
import Input from '../components/Input.jsx';

export default function Register() {
  const navigate = useNavigate();
  const signUpWithSupabase = useAppStore((state) => state.signUpWithSupabase);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('developer');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!password || password.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);
    const fullName = `${firstName} ${lastName}`.trim() || 'Developer';

    try {
      await signUpWithSupabase({
        email,
        password,
        name: fullName,
        role,
      });

      if (role === 'recruiter') {
        navigate('/recruiter');
      } else {
        navigate('/onboarding');
      }
    } catch (err) {
      setErrorMsg(err.message || 'Registration failed. Credentials could not be created.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--sp-bg)', padding: '24px' }}>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} style={{ width: '100%', maxWidth: '440px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div onClick={() => navigate('/')} style={{ width: 48, height: 48, borderRadius: 'var(--sp-radius-lg)', background: 'var(--sp-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '18px', color: 'white', marginBottom: '24px', cursor: 'pointer' }}>SP</div>
        <h1 style={{ fontSize: '28px', fontWeight: 700, color: 'var(--sp-text-primary)', marginBottom: '8px', letterSpacing: '-0.02em' }}>Create your account</h1>
        <p style={{ fontSize: '14px', color: 'var(--sp-text-secondary)', marginBottom: '32px' }}>Sign up with email and password to persist your verified identity</p>

        {errorMsg && (
          <div style={{ width: '100%', background: 'var(--sp-error-muted)', color: 'var(--sp-error)', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '12px 16px', borderRadius: 'var(--sp-radius-md)', fontSize: '13px', marginBottom: '16px' }}>
            ⚠️ {errorMsg}
          </div>
        )}

        <form onSubmit={handleRegister} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <Input label="First Name" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
            <Input label="Last Name" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </div>

          <Input label="Email Address" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Input label="Password" type="password" placeholder="•••••••• (Min 6 characters)" value={password} onChange={(e) => setPassword(e.target.value)} required />

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--sp-text-secondary)', marginBottom: '6px' }}>I am joining as a</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              {['developer', 'recruiter'].map((r) => (
                <button
                  type="button"
                  key={r}
                  onClick={() => setRole(r)}
                  style={{
                    flex: 1,
                    padding: '10px',
                    background: role === r ? 'var(--sp-accent-muted)' : 'var(--sp-surface-card)',
                    border: `1px solid ${role === r ? 'var(--sp-accent)' : 'var(--sp-border)'}`,
                    borderRadius: 'var(--sp-radius-md)',
                    color: role === r ? 'var(--sp-accent-light)' : 'var(--sp-text-secondary)',
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontFamily: 'var(--sp-font)',
                    textTransform: 'capitalize',
                  }}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <Button type="submit" loading={loading} style={{ width: '100%', marginTop: '8px' }} size="lg">
            Create Account & Save Credentials →
          </Button>
        </form>

        <p style={{ fontSize: '13px', color: 'var(--sp-text-tertiary)' }}>
          Already have an account? <a onClick={() => navigate('/login')} style={{ color: 'var(--sp-accent-light)', cursor: 'pointer', fontWeight: 500 }}>Sign in</a>
        </p>
      </motion.div>
    </div>
  );
}
