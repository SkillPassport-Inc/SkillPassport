import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '../store/useAppStore.js';
import Card from '../components/Card.jsx';
import Button from '../components/Button.jsx';
import Input from '../components/Input.jsx';
import SyncPlatformModal from '../components/SyncPlatformModal.jsx';

export default function Settings() {
  const user = useAppStore((state) => state.user);
  const updateProfile = useAppStore((state) => state.updateProfile);
  const connectedApps = useAppStore((state) => state.connectedApps);
  const toggleConnectedApp = useAppStore((state) => state.toggleConnectedApp);

  const [name, setName] = useState(user.name);
  const [title, setTitle] = useState(user.title);
  const [email, setEmail] = useState(user.email);
  const [bio, setBio] = useState(user.bio);
  const [githubUser, setGithubUser] = useState(user.githubUsername);
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);
  const [savedMsg, setSavedMsg] = useState('');

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateProfile({
      name,
      title,
      email,
      bio,
      githubUsername: githubUser,
    });
    setSavedMsg('Profile updated successfully!');
    setTimeout(() => setSavedMsg(''), 3000);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '720px' }}>
      <div>
        <h1 style={{ fontSize: '36px', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--sp-text-primary)', marginBottom: '4px' }}>Settings</h1>
        <p style={{ fontSize: '16px', color: 'var(--sp-text-secondary)' }}>Manage your profile identity, connected platforms, and account preferences.</p>
      </div>

      <Card padding="24px" hover={false}>
        <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--sp-text-primary)', marginBottom: '20px' }}>Profile Information</h3>
        <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <Input label="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
            <Input label="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <Input label="Email Address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input label="GitHub Handle" value={githubUser} onChange={(e) => setGithubUser(e.target.value)} />

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--sp-text-tertiary)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              style={{
                width: '100%',
                minHeight: '80px',
                background: 'var(--sp-bg)',
                border: '1px solid var(--sp-border)',
                borderRadius: 'var(--sp-radius-md)',
                padding: '10px 14px',
                color: 'var(--sp-text-on-surface)',
                fontSize: '14px',
                fontFamily: 'var(--sp-font)',
                outline: 'none',
                resize: 'vertical',
              }}
            />
          </div>

          {savedMsg && (
            <div style={{ color: 'var(--sp-success)', fontSize: '13px', fontWeight: 500 }}>
              {savedMsg}
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </Card>

      <Card padding="24px" hover={false}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--sp-text-primary)' }}>Connected Skill Applications</h3>
          <button
            onClick={() => setIsSyncModalOpen(true)}
            style={{ background: 'none', border: 'none', color: 'var(--sp-accent-light)', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}
          >
            Sync Multiple Platforms ✨
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[
            { key: 'github', name: 'GitHub', desc: 'Real repositories, commits, languages, and PR analytics' },
            { key: 'leetcode', name: 'LeetCode', desc: 'Algorithmic problem solving scores & ranking' },
            { key: 'gitlab', name: 'GitLab', desc: 'Enterprise repositories & CI/CD pipeline code' },
            { key: 'stackoverflow', name: 'StackOverflow', desc: 'Verified technical answers and reputation' },
          ].map((app) => {
            const isConnected = connectedApps[app.key];
            return (
              <div key={app.key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', background: 'var(--sp-bg)', border: '1px solid var(--sp-border)', borderRadius: 'var(--sp-radius-md)' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--sp-text-primary)' }}>{app.name}</span>
                    {isConnected && (
                      <span style={{ fontSize: '11px', background: 'var(--sp-success-muted)', color: 'var(--sp-success)', padding: '2px 8px', borderRadius: 'var(--sp-radius-full)', fontWeight: 600 }}>
                        Connected
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--sp-text-tertiary)', marginTop: '2px' }}>{app.desc}</div>
                </div>
                <Button
                  variant={isConnected ? 'ghost' : 'secondary'}
                  size="sm"
                  onClick={() => setIsSyncModalOpen(true)}
                >
                  {isConnected ? 'Sync Handle' : 'Connect Account'}
                </Button>
              </div>
            );
          })}
        </div>
      </Card>

      <Card padding="24px" hover={false}>
        <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--sp-text-primary)', marginBottom: '20px' }}>Subscription & Billing</h3>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', background: 'var(--sp-accent-muted)', border: '1px solid rgba(79,70,229,0.3)', borderRadius: 'var(--sp-radius-md)' }}>
          <div>
            <span style={{ fontSize: '16px', fontWeight: 600, color: 'var(--sp-text-primary)' }}>
              {user.subscription?.plan || 'Free'} Plan
            </span>
            <span style={{ fontSize: '13px', color: 'var(--sp-text-secondary)', marginLeft: '12px' }}>
              {user.subscription?.plan === 'Developer Pro' ? '₹1,299/month' : user.subscription?.plan === 'Recruiter' ? '₹3,999/month' : '₹0 / forever'} • Active (Razorpay Verified)
            </span>
            {user.subscription?.paymentId && (
              <div style={{ fontSize: '11px', color: 'var(--sp-text-tertiary)', marginTop: '4px' }}>
                Payment ID: {user.subscription.paymentId}
              </div>
            )}
          </div>
          <Button variant="secondary" size="sm" onClick={() => window.location.href = '/pricing'}>
            Upgrade via Razorpay 💳
          </Button>
        </div>
      </Card>

      <SyncPlatformModal isOpen={isSyncModalOpen} onClose={() => setIsSyncModalOpen(false)} />
    </motion.div>
  );
}
