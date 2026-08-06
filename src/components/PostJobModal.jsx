import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../store/useAppStore.js';
import Button from './Button.jsx';
import Input from './Input.jsx';

export default function PostJobModal({ isOpen, onClose }) {
  const addJob = useAppStore((state) => state.addJob);
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('Remote');
  const [salary, setSalary] = useState('₹18L – ₹24L');
  const [skills, setSkills] = useState('');
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    addJob({
      title: title.trim(),
      company: company.trim() || 'Hiring Organization',
      location: location.trim() || 'Remote',
      salary: salary.trim() || 'Competitive',
      skills: skills || 'Java, React, SQL',
      description: description.trim() || 'Exciting engineering role working on scalable systems.',
    });

    setTitle('');
    setCompany('');
    setSkills('');
    setDescription('');
    onClose();
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
            maxWidth: '520px',
            background: 'var(--sp-surface-elevated)',
            border: '1px solid var(--sp-border)',
            borderRadius: 'var(--sp-radius-xl)',
            padding: '28px',
            boxShadow: 'var(--sp-shadow-lg)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--sp-text-primary)' }}>
              Post New Job Opening
            </h2>
            <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--sp-text-tertiary)', fontSize: '18px', cursor: 'pointer' }}>
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <Input label="Job Title" placeholder="e.g. Senior Backend Engineer" value={title} onChange={(e) => setTitle(e.target.value)} required />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <Input label="Company Name" placeholder="e.g. Stripe, Vercel" value={company} onChange={(e) => setCompany(e.target.value)} />
              <Input label="Location" placeholder="e.g. Remote, Bengaluru" value={location} onChange={(e) => setLocation(e.target.value)} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <Input label="Salary Package (INR ₹)" placeholder="e.g. ₹18L – ₹24L" value={salary} onChange={(e) => setSalary(e.target.value)} />
              <Input label="Required Skills (Comma separated)" placeholder="Java, Spring Boot, React" value={skills} onChange={(e) => setSkills(e.target.value)} required />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--sp-text-secondary)', marginBottom: '6px' }}>
                Job Description
              </label>
              <textarea
                placeholder="Describe role responsibilities, tech stack, and benefits..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
              <Button type="button" variant="secondary" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">
                Post Job Opening ✨
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
