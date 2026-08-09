import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore.js';
import Button from '../components/Button.jsx';
import Input from '../components/Input.jsx';
import Card from '../components/Card.jsx';
import { convertToWebP } from '../utils/imageCompressor.js';

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
  const [certWebP, setCertWebP] = useState(null);
  const [certFileSize, setCertFileSize] = useState(45);
  const [isCompressing, setIsCompressing] = useState(false);
  const [certList, setCertList] = useState([]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsCompressing(true);
    try {
      const result = await convertToWebP(file, 1200, 0.8);
      setCertWebP(result.webpDataUrl);
      setCertFileSize(result.compressedSizeKB);
    } catch (err) {
      alert(err.message || 'Error processing certificate file');
    } finally {
      setIsCompressing(false);
    }
  };

  const handleAddCert = (e) => {
    e.preventDefault();
    if (!certName.trim()) return;

    setCertList((prev) => [
      ...prev,
      {
        name: certName.trim(),
        issuer: certIssuer.trim() || 'Certification Provider',
        certificateImageUrl: certWebP,
        fileSizeKB: certFileSize,
      },
    ]);

    setCertName('');
    setCertIssuer('');
    setCertWebP(null);
    setCertFileSize(45);
  };

  const handleCompleteSetup = async (e) => {
    e.preventDefault();

    updateProfile({
      name: name || 'Developer',
      title: title || 'Software Engineer',
      bio: bio || 'Full stack software developer focused on clean architecture and scalable systems.',
      githubUsername: githubUser,
    });

    certList.forEach((c) => addCertification(c));

    if (githubUser.trim()) {
      await syncGitHub(githubUser.trim());
    }

    navigate('/dashboard');
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--sp-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} style={{ width: '100%', maxWidth: '620px' }}>
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
                  Add Certifications (.WebP Compressed)
                </h2>
                <p style={{ fontSize: '14px', color: 'var(--sp-text-secondary)' }}>
                  Certificates are automatically compressed into lightweight <strong>.webp</strong> format to minimize storage space.
                </p>
              </div>

              <form onSubmit={handleAddCert} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <Input label="Certificate Name" placeholder="e.g. AWS Solutions Architect" value={certName} onChange={(e) => setCertName(e.target.value)} />
                  <Input label="Issuer" placeholder="e.g. Amazon Web Services" value={certIssuer} onChange={(e) => setCertIssuer(e.target.value)} />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--sp-text-secondary)', marginBottom: '6px' }}>
                    Upload Certificate Image (Auto-Converted to .WebP)
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{
                      width: '100%',
                      background: 'var(--sp-bg)',
                      border: '1px dashed var(--sp-border)',
                      padding: '10px',
                      borderRadius: 'var(--sp-radius-md)',
                      color: 'var(--sp-text-secondary)',
                      fontSize: '13px',
                      cursor: 'pointer',
                    }}
                  />
                  {isCompressing && (
                    <div style={{ fontSize: '12px', color: 'var(--sp-accent-light)', marginTop: '4px' }}>
                      ⚡ Converting and compressing image to .webp format...
                    </div>
                  )}
                  {certWebP && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '8px', background: 'var(--sp-accent-muted)', padding: '8px 12px', borderRadius: 'var(--sp-radius-md)' }}>
                      <img src={certWebP} alt="WebP Certificate Preview" style={{ width: 48, height: 36, objectFit: 'cover', borderRadius: '4px', border: '1px solid var(--sp-border)' }} />
                      <span style={{ fontSize: '12px', color: 'var(--sp-success)', fontWeight: 600 }}>
                        ✓ WebP Compressed: {certFileSize} KB (Saved ~85% storage space)
                      </span>
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button type="submit" variant="secondary">+ Add Certification</Button>
                </div>
              </form>

              {certList.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {certList.map((c, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: 'var(--sp-bg)', border: '1px solid var(--sp-border)', borderRadius: 'var(--sp-radius-md)', fontSize: '13px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        {c.certificateImageUrl ? (
                          <img src={c.certificateImageUrl} alt="Certificate WebP" style={{ width: 32, height: 24, objectFit: 'cover', borderRadius: '3px' }} />
                        ) : (
                          <span>🏆</span>
                        )}
                        <div>
                          <div style={{ fontWeight: 600, color: 'var(--sp-text-primary)' }}>{c.name}</div>
                          <div style={{ fontSize: '11px', color: 'var(--sp-text-tertiary)' }}>{c.issuer}</div>
                        </div>
                      </div>
                      <span style={{ fontSize: '11px', background: 'var(--sp-success-muted)', color: 'var(--sp-success)', padding: '2px 8px', borderRadius: 'var(--sp-radius-full)', fontWeight: 600 }}>
                        {c.fileSizeKB} KB .webp
                      </span>
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
