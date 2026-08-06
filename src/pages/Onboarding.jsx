import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore.js';
import Button from '../components/Button.jsx';
import Input from '../components/Input.jsx';
import Card from '../components/Card.jsx';

export default function Onboarding() {
  const navigate = useNavigate();
  const user = useAppStore((state) => state.user);
  const updateProfile = useAppStore((state) => state.updateProfile);
  const syncGitHub = useAppStore((state) => state.syncGitHub);
  const addCertification = useAppStore((state) => state.addCertification);
  const isSyncing = useAppStore((state) => state.isSyncingGitHub);
  const syncError = useAppStore((state) => state.syncError);

  const [step, setStep] = useState(1);
  const [name, setName] = useState(user.name || '');
  const [title, setTitle] = useState(user.title || 'Software Engineer');
  const [bio, setBio] = useState(user.bio || '');
  const [githubUser, setGithubUser] = useState(user.githubUsername || '');

  const [certName, setCertName] = useState('');
  const [certIssuer, setCertIssuer] = useState('');
  const [certList, setCertList] = useState([]);

  const handleAddCert = (e) => {
    e.preventDefault();
    if (!certName.trim()) return;
    setCertList((prev) => [...prev, { name: certName.trim(), issuer: certIssuer.trim() || 'Certification Provider' }]);
    setCertName('');
    setCertIssuer('');
  };

  const handleCompleteSetup = async (e) => {
    e.preventDefault();

    // 1. Update basic profile info
    updateProfile({
      name: name || 'Developer',
      title: title || 'Software Engineer',
      bio: bio || 'Full stack software developer focused on clean architecture and scalable systems.',
      githubUsername: githubUser,
    });

    // 2. Add certifications
    certList.forEach((c) => addCertification(c));

    // 3. Fetch live data from GitHub API if username provided
    if (githubUser.trim()) {
      await syncGitHub(githubUser.trim());
    }

    // 4. Navigate to dashboard
    navigate('/dashboard');
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--sp-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} style={{ width: '100%', maxWidth: '580px' }}>
        {/* Step Indicator */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '32px' }}>
          {[1, 2, 3].map((s) => (
            <div key={s} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  background: step >= s ? 'var(--sp-accent)' : 'var(--sp-surface-card)',
                  border: `1px solid ${step >= s ? 'var(--sp-accent)' : 'var(--sp-border)'}`,
                  color: step >= s ? 'white' : 'var(--sp-text-tertiary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '13px',
                  fontWeight: 700,
                }}
              >
                {s}
              </div>
              {s < 3 && <div style={{ width: '40px', height: '2px', background: step > s ? 'var(--sp-accent)' : 'var(--sp-border)' }} />}
            </div>
          ))}
        </div>

        <Card padding="36px" hover={false}>
          {step === 1 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--sp-text-primary)', marginBottom: '4px' }}>
                  Setup Your Developer Profile
                </h2>
                <p style={{ fontSize: '14px', color: 'var(--sp-text-secondary)' }}>
                  Enter your basic professional details to start building your verified identity.
                </p>
              </div>

              <Input label="Full Name" placeholder="e.g. Pranav Kumar" value={name} onChange={(e) => setName(e.target.value)} required />
              <Input label="Professional Title" placeholder="e.g. Senior Backend Engineer" value={title} onChange={(e) => setTitle(e.target.value)} required />

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--sp-text-secondary)', marginBottom: '6px' }}>
                  Professional Bio
                </label>
                <textarea
                  placeholder="Tell recruiters and teams about your core expertise..."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  style={{
                    width: '100%',
                    minHeight: '80px',
                    background: 'var(--sp-surface-card)',
                    border: '1px solid var(--sp-border)',
                    borderRadius: 'var(--sp-radius-md)',
                    padding: '12px',
                    color: 'var(--sp-text-on-surface)',
                    fontSize: '14px',
                    fontFamily: 'var(--sp-font)',
                    outline: 'none',
                    resize: 'vertical',
                  }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
                <Button onClick={() => setStep(2)}>Next: Connect Platforms →</Button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--sp-text-primary)', marginBottom: '4px' }}>
                  Connect Code Platforms
                </h2>
                <p style={{ fontSize: '14px', color: 'var(--sp-text-secondary)' }}>
                  Connect GitHub to automatically fetch your public repositories and verify skills.
                </p>
              </div>

              <Input
                label="GitHub Handle (Required for Live Repo & Skill Sync)"
                placeholder="e.g. torvalds, gaearon, or your username"
                value={githubUser}
                onChange={(e) => setGithubUser(e.target.value)}
              />

              <div style={{ background: 'var(--sp-bg)', padding: '14px', borderRadius: 'var(--sp-radius-md)', border: '1px solid var(--sp-border)', fontSize: '13px', color: 'var(--sp-text-secondary)', lineHeight: 1.5 }}>
                ✨ <strong>Automatic Sync:</strong> SkillPassport will call the GitHub REST API to fetch your public repositories, analyze language breakdowns, and issue verified skill badges.
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px' }}>
                <Button variant="secondary" onClick={() => setStep(1)}>← Back</Button>
                <Button onClick={() => setStep(3)}>Next: Add Certifications →</Button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--sp-text-primary)', marginBottom: '4px' }}>
                  Add Certifications & Complete Setup
                </h2>
                <p style={{ fontSize: '14px', color: 'var(--sp-text-secondary)' }}>
                  Add any verified certificates (AWS, GCP, CKA, Spring, React) to include on your profile.
                </p>
              </div>

              <form onSubmit={handleAddCert} style={{ display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
                <div style={{ flex: 1 }}>
                  <Input label="Certificate Name" placeholder="e.g. AWS Solutions Architect" value={certName} onChange={(e) => setCertName(e.target.value)} />
                </div>
                <div style={{ flex: 1 }}>
                  <Input label="Issuer" placeholder="e.g. Amazon Web Services" value={certIssuer} onChange={(e) => setCertIssuer(e.target.value)} />
                </div>
                <Button type="submit" variant="secondary">+ Add</Button>
              </form>

              {certList.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {certList.map((c, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: 'var(--sp-bg)', border: '1px solid var(--sp-border)', borderRadius: 'var(--sp-radius-md)', fontSize: '13px' }}>
                      <span style={{ fontWeight: 600, color: 'var(--sp-text-primary)' }}>🏆 {c.name}</span>
                      <span style={{ color: 'var(--sp-text-tertiary)' }}>{c.issuer}</span>
                    </div>
                  ))}
                </div>
              )}

              {syncError && (
                <div style={{ background: 'var(--sp-error-muted)', color: 'var(--sp-error)', border: '1px solid rgba(239,68,68,0.3)', padding: '10px', borderRadius: 'var(--sp-radius-md)', fontSize: '13px' }}>
                  {syncError}
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px' }}>
                <Button variant="secondary" onClick={() => setStep(2)}>← Back</Button>
                <Button onClick={handleCompleteSetup} loading={isSyncing}>
                  {isSyncing ? 'Fetching Data & Generating Passport...' : 'Fetch Platforms & Build Passport ✨'}
                </Button>
              </div>
            </motion.div>
          )}
        </Card>
      </motion.div>
    </div>
  );
}
