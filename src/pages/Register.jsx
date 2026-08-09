import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore.js';
import Button from '../components/Button.jsx';
import Input from '../components/Input.jsx';
import ProgressRing from '../components/ProgressRing.jsx';

export default function Register() {
  const navigate = useNavigate();
  const signUpWithSupabase = useAppStore((state) => state.signUpWithSupabase);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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

    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match. Please check both password fields.');
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
      setErrorMsg(err.message || 'Registration failed. Check your connection or credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: '1.25fr 1fr', background: '#09090B', overflow: 'hidden' }}>
      {/* LEFT SIDE: Premium Showcase & Interactive Terminal */}
      <div
        style={{
          position: 'relative',
          background: 'radial-gradient(ellipse at top left, rgba(79, 70, 229, 0.18) 0%, rgba(9, 9, 11, 0.98) 70%)',
          borderRight: '1px solid rgba(255, 255, 255, 0.08)',
          padding: '56px 64px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          overflow: 'hidden',
        }}
      >
        {/* Background Glowing Mesh Gradients */}
        <motion.div
          animate={{ scale: [1, 1.25, 1], opacity: [0.4, 0.65, 0.4] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          style={{ position: 'absolute', top: '-15%', left: '-15%', width: '550px', height: '550px', borderRadius: '50%', background: 'radial-gradient(circle, #4F46E5 0%, transparent 65%)', filter: 'blur(75px)', pointerEvents: 'none' }}
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.45, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          style={{ position: 'absolute', bottom: '-15%', right: '-15%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, #FFA116 0%, transparent 65%)', filter: 'blur(85px)', pointerEvents: 'none' }}
        />

        {/* Top Header Logo */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }} onClick={() => navigate('/')}>
            <div style={{ width: 38, height: 38, borderRadius: '10px', background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '16px', color: 'white', boxShadow: '0 4px 14px rgba(79, 70, 229, 0.4)' }}>SP</div>
            <span style={{ fontSize: '20px', fontWeight: 700, color: 'white', letterSpacing: '-0.02em' }}>SkillPassport</span>
          </div>
          <span style={{ fontSize: '12px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#A1A1AA', padding: '4px 12px', borderRadius: '100px', fontWeight: 500 }}>
            v2.4 Enterprise Edition
          </span>
        </div>

        {/* Center Showcase */}
        <div style={{ zIndex: 10, margin: '36px 0' }}>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(79, 70, 229, 0.15)', border: '1px solid rgba(129, 140, 248, 0.3)', padding: '6px 14px', borderRadius: '100px', fontSize: '13px', color: '#A5B4FC', fontWeight: 600, marginBottom: '20px' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22C55E', boxShadow: '0 0 8px #22C55E' }} />
              🚀 Join 10,000+ Verified Engineers
            </div>

            <h1 style={{ fontSize: '44px', fontWeight: 800, lineHeight: 1.15, color: '#FAFAFA', marginBottom: '16px', letterSpacing: '-0.03em' }}>
              Build your tamper-proof <br />
              <span style={{ background: 'linear-gradient(135deg, #818CF8 0%, #C084FC 50%, #E879F9 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                developer passport.
              </span>
            </h1>

            <p style={{ fontSize: '16px', color: '#A1A1AA', lineHeight: 1.65, maxWidth: '520px', marginBottom: '32px' }}>
              Connect code platforms, compress certificates with .WebP format, and get AI-matched with top global engineering teams.
            </p>
          </motion.div>

          {/* Pure Floating Animated Stepped Stairs Graph (Sequential Step-by-Step Drawing) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            style={{ width: '100%', maxWidth: '520px', padding: '24px 0 12px 0' }}
          >
            <div style={{ position: 'relative', width: '100%', height: '160px' }}>
              <svg width="100%" height="100%" viewBox="0 0 500 160" fill="none" style={{ overflow: 'visible' }}>
                <defs>
                  <linearGradient id="stairsGradReg1" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#6366F1" />
                    <stop offset="100%" stopColor="#818CF8" />
                  </linearGradient>
                  <linearGradient id="stairsGradReg2" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#818CF8" />
                    <stop offset="100%" stopColor="#C084FC" />
                  </linearGradient>
                  <linearGradient id="stairsGradReg3" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#C084FC" />
                    <stop offset="100%" stopColor="#E879F9" />
                  </linearGradient>
                  <linearGradient id="stairsGradReg4" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#E879F9" />
                    <stop offset="100%" stopColor="#22C55E" />
                  </linearGradient>
                  <linearGradient id="stairsAreaGradReg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#22C55E" stopOpacity="0.22" />
                    <stop offset="100%" stopColor="#22C55E" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Translucent Area Fades In After Stairs Complete */}
                <motion.path
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.4, delay: 4.4 }}
                  d="M 20 145 L 130 145 L 130 105 L 240 105 L 240 65 L 350 65 L 350 20 L 480 20 L 480 155 L 20 155 Z"
                  fill="url(#stairsAreaGradReg)"
                />

                {/* STEP 1: Base to Level 1 */}
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.0, delay: 0.4, ease: 'easeInOut' }}
                  d="M 20 145 H 130 V 105"
                  stroke="url(#stairsGradReg1)"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ filter: 'drop-shadow(0 0 8px rgba(99, 102, 241, 0.5))' }}
                />

                {/* STEP 2: Level 1 to Level 2 */}
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.0, delay: 1.4, ease: 'easeInOut' }}
                  d="M 130 105 H 240 V 65"
                  stroke="url(#stairsGradReg2)"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ filter: 'drop-shadow(0 0 8px rgba(129, 140, 248, 0.5))' }}
                />

                {/* STEP 3: Level 2 to Level 3 */}
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.0, delay: 2.4, ease: 'easeInOut' }}
                  d="M 240 65 H 350 V 20"
                  stroke="url(#stairsGradReg3)"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ filter: 'drop-shadow(0 0 8px rgba(192, 132, 252, 0.5))' }}
                />

                {/* STEP 4: Level 3 to Top Step */}
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.0, delay: 3.4, ease: 'easeInOut' }}
                  d="M 350 20 H 480"
                  stroke="url(#stairsGradReg4)"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ filter: 'drop-shadow(0 0 10px rgba(34, 197, 94, 0.6))' }}
                />

                {/* Sequential Glowing Corner Dots */}
                {[
                  { cx: 20, cy: 145, r: 5, delay: 0.4 },
                  { cx: 130, cy: 105, r: 5, delay: 1.4 },
                  { cx: 240, cy: 65, r: 5.5, delay: 2.4 },
                  { cx: 350, cy: 20, r: 6, delay: 3.4 },
                  { cx: 480, cy: 20, r: 8, delay: 4.4 },
                ].map((pt, i) => (
                  <motion.circle
                    key={i}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 220, damping: 16, delay: pt.delay }}
                    cx={pt.cx}
                    cy={pt.cy}
                    r={pt.r}
                    fill={i === 4 ? '#22C55E' : '#C084FC'}
                    stroke="#09090B"
                    strokeWidth="2.5"
                    style={{ filter: i === 4 ? 'drop-shadow(0 0 14px #22C55E)' : 'drop-shadow(0 0 6px rgba(192, 132, 252, 0.6))' }}
                  />
                ))}
              </svg>
            </div>
          </motion.div>
        </div>

        {/* Footer Rating & Trust Banner */}
        <div style={{ display: 'flex', alignItems: 'center', justifyBetween: 'space-between', gap: '20px', zIndex: 10, paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: '#F59E0B', fontSize: '14px' }}>★★★★★</span>
            <span style={{ fontSize: '13px', color: '#FAFAFA', fontWeight: 600 }}>4.9/5 Rating</span>
          </div>
          <span style={{ fontSize: '13px', color: '#71717A' }}>Trusted by engineers at Stripe, Vercel & Linear</span>
        </div>
      </div>

      {/* RIGHT SIDE: Premium Form Container */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 36px', background: '#09090B' }}>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            width: '100%',
            maxWidth: '440px',
            background: 'rgba(18, 18, 22, 0.6)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '20px',
            padding: '36px 32px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
          }}
        >
          <h2 style={{ fontSize: '26px', fontWeight: 700, color: '#FAFAFA', marginBottom: '6px', letterSpacing: '-0.02em' }}>
            Create your account
          </h2>
          <p style={{ fontSize: '14px', color: '#A1A1AA', marginBottom: '24px' }}>
            Sign up with email and password to persist your verified identity
          </p>

          {errorMsg && (
            <div style={{ width: '100%', background: 'rgba(239, 68, 68, 0.1)', color: '#FCA5A5', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '12px 16px', borderRadius: '10px', fontSize: '13px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>⚠️</span> {errorMsg}
            </div>
          )}

          <form onSubmit={handleRegister} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <Input label="First Name" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
              <Input label="Last Name" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </div>

            <Input label="Email Address" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <Input label="Password" type="password" placeholder="•••••••• (Min 6 chars)" value={password} onChange={(e) => setPassword(e.target.value)} required />
              <Input label="Confirm Password" type="password" placeholder="••••••••" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#A1A1AA', marginBottom: '6px' }}>I am joining as a</label>
              <div style={{ display: 'flex', gap: '8px' }}>
                {['developer', 'recruiter'].map((r) => (
                  <button
                    type="button"
                    key={r}
                    onClick={() => setRole(r)}
                    style={{
                      flex: 1,
                      padding: '10px',
                      background: role === r ? 'rgba(79, 70, 229, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                      border: `1px solid ${role === r ? '#6366F1' : 'rgba(255, 255, 255, 0.08)'}`,
                      borderRadius: '10px',
                      color: role === r ? '#A5B4FC' : '#A1A1AA',
                      fontSize: '14px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      fontFamily: 'var(--sp-font)',
                      textTransform: 'capitalize',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <Button type="submit" loading={loading} style={{ width: '100%', marginTop: '6px', background: 'linear-gradient(135deg, #4F46E5 0%, #6366F1 100%)', boxShadow: '0 4px 14px rgba(79, 70, 229, 0.35)' }} size="lg">
              Create Account & Save to Database →
            </Button>
          </form>

          <p style={{ fontSize: '13px', color: '#A1A1AA', textAlign: 'center' }}>
            Already have an account? <a onClick={() => navigate('/login')} style={{ color: '#818CF8', cursor: 'pointer', fontWeight: 600, textDecoration: 'none' }}>Sign in</a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
