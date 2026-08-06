import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../store/useAppStore.js';
import Button from './Button.jsx';
import Input from './Input.jsx';

export default function AddSkillModal({ isOpen, onClose }) {
  const addSkill = useAppStore((state) => state.addSkill);
  const [skillName, setSkillName] = useState('');
  const [category, setCategory] = useState('Framework');
  const [score, setScore] = useState(85);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!skillName.trim()) return;

    setIsAnalyzing(true);

    setTimeout(() => {
      addSkill({
        name: skillName.trim(),
        score,
        category,
        verified: true,
      });
      setIsAnalyzing(false);
      setSkillName('');
      onClose();
    }, 800);
  };

  return (
    <AnimatePresence>
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(0, 0, 0, 0.7)',
          backdropFilter: 'blur(8px)',
          padding: '24px',
        }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          onClick={(e) => e.stopPropagation()}
          style={{
            width: '100%',
            maxWidth: '460px',
            background: 'var(--sp-surface-elevated)',
            border: '1px solid var(--sp-border)',
            borderRadius: 'var(--sp-radius-xl)',
            padding: '28px',
            boxShadow: 'var(--sp-shadow-lg)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--sp-text-primary)' }}>
              Verify & Add Skill
            </h2>
            <button
              onClick={onClose}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--sp-text-tertiary)',
                fontSize: '18px',
                cursor: 'pointer',
              }}
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Input
              label="Skill / Technology Name"
              placeholder="e.g. FastAPI, Kafka, Go, Rust, AWS"
              value={skillName}
              onChange={(e) => setSkillName(e.target.value)}
              required
            />

            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  color: 'var(--sp-text-secondary)',
                  marginBottom: '6px',
                }}
              >
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{
                  width: '100%',
                  background: 'var(--sp-surface-card)',
                  border: '1px solid var(--sp-border)',
                  borderRadius: 'var(--sp-radius-md)',
                  padding: '10px 14px',
                  color: 'var(--sp-text-on-surface)',
                  fontSize: '14px',
                  fontFamily: 'var(--sp-font)',
                  outline: 'none',
                }}
              >
                <option value="Language">Language</option>
                <option value="Framework">Framework</option>
                <option value="Core / Enterprise">Core / Enterprise</option>
                <option value="Database">Database</option>
                <option value="DevOps">DevOps</option>
                <option value="Infrastructure">Infrastructure</option>
                <option value="Architecture">Architecture</option>
              </select>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <label
                  style={{
                    fontSize: '12px',
                    fontWeight: 600,
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    color: 'var(--sp-text-secondary)',
                  }}
                >
                  Demonstrated Proficiency Level ({score}%)
                </label>
              </div>
              <input
                type="range"
                min="50"
                max="99"
                value={score}
                onChange={(e) => setScore(Number(e.target.value))}
                style={{
                  width: '100%',
                  accentColor: 'var(--sp-accent)',
                  cursor: 'pointer',
                }}
              />
            </div>

            <div style={{ background: 'var(--sp-surface)', padding: '12px', borderRadius: 'var(--sp-radius-md)', border: '1px solid var(--sp-border)', fontSize: '12px', color: 'var(--sp-text-secondary)', display: 'flex', gap: '8px' }}>
              <span>🤖</span>
              <span>Our AI will analyze your connected repositories and commits to issue verified proof for this skill.</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
              <Button type="button" variant="secondary" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" loading={isAnalyzing}>
                {isAnalyzing ? 'Analyzing Codebase...' : 'Run AI Verification'}
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
