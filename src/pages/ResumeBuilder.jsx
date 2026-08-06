import { useState } from 'react';
import { motion } from 'framer-motion';
import Card from '../components/Card.jsx';
import Button from '../components/Button.jsx';

const templates = ['Software Engineer', 'Backend Developer', 'Full Stack', 'ML Engineer', 'Cloud Engineer'];

const resumeSections = [
  { title: 'Professional Summary', content: 'Senior Software Engineer with 5+ years of experience building scalable distributed systems. Expertise in Java, Spring Boot, and microservices architecture. Proven track record of delivering high-quality production systems serving millions of users.' },
  { title: 'Technical Skills', content: 'Java (92%) • Spring Boot (96%) • React (88%) • Docker (81%) • Kubernetes (74%) • PostgreSQL (90%) • JavaScript (85%) • Kafka • Redis • REST APIs • GraphQL • CI/CD • AWS' },
  { title: 'Experience', content: 'Senior Software Engineer — TechCorp\nJan 2022 – Present\n• Architected microservices platform handling 10M+ daily requests\n• Reduced API latency by 40% through Redis caching strategies\n• Led team of 5 engineers in migrating monolith to microservices' },
  { title: 'Projects', content: 'microservices-core — Distributed system with Spring Cloud and Kafka (Score: 94/100)\nreact-fintech-dashboard — Real-time trading interface (Score: 88/100)\nai-resume-parser — NLP-powered resume parsing engine (Score: 91/100)' },
];

export default function ResumeBuilder() {
  const [activeTemplate, setActiveTemplate] = useState('Software Engineer');
  const [atsScore, setAtsScore] = useState(87);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '36px', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--sp-text-primary)', marginBottom: '4px' }}>Resume Builder</h1>
          <p style={{ fontSize: '16px', color: 'var(--sp-text-secondary)' }}>AI-optimized, ATS-compatible resumes from your verified skills.</p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button variant="secondary" size="sm">Export PDF</Button>
          <Button variant="secondary" size="sm">Export DOCX</Button>
          <Button size="sm">Save</Button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {templates.map((t) => (
          <button
            key={t}
            onClick={() => setActiveTemplate(t)}
            style={{
              padding: '8px 16px',
              borderRadius: 'var(--sp-radius-full)',
              border: `1px solid ${activeTemplate === t ? 'var(--sp-accent)' : 'var(--sp-border)'}`,
              background: activeTemplate === t ? 'var(--sp-accent-muted)' : 'transparent',
              color: activeTemplate === t ? 'var(--sp-accent-light)' : 'var(--sp-text-secondary)',
              fontSize: '13px',
              fontWeight: 500,
              cursor: 'pointer',
              fontFamily: 'var(--sp-font)',
              transition: 'all var(--sp-transition)',
            }}
          >
            {t}
          </button>
        ))}
      </div>

      <Card padding="16px 24px" hover={false}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--sp-text-secondary)' }}>ATS Compatibility Score</span>
            <span style={{ fontSize: '24px', fontWeight: 700, color: atsScore >= 85 ? 'var(--sp-success)' : 'var(--sp-warning)' }}>
              {atsScore}%
            </span>
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', color: 'var(--sp-text-tertiary)' }}>Keywords: ✓</span>
            <span style={{ fontSize: '12px', color: 'var(--sp-text-tertiary)' }}>Format: ✓</span>
            <span style={{ fontSize: '12px', color: 'var(--sp-warning)' }}>Readability: Needs work</span>
          </div>
        </div>
      </Card>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', minHeight: '600px' }}>
        <Card padding="0" hover={false}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--sp-border)', fontSize: '14px', fontWeight: 600, color: 'var(--sp-text-primary)' }}>
            Editor
          </div>
          <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--sp-text-tertiary)', marginBottom: '8px' }}>Target Job Description</label>
              <textarea
                placeholder="Paste the job description to optimize your resume..."
                style={{
                  width: '100%',
                  minHeight: '80px',
                  background: 'var(--sp-bg)',
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
              <Button size="sm" style={{ marginTop: '8px' }}>Optimize with AI</Button>
            </div>

            {resumeSections.map((section) => (
              <div key={section.title}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--sp-text-tertiary)', marginBottom: '8px' }}>{section.title}</label>
                <textarea
                  defaultValue={section.content}
                  style={{
                    width: '100%',
                    minHeight: '80px',
                    background: 'var(--sp-bg)',
                    border: '1px solid var(--sp-border)',
                    borderRadius: 'var(--sp-radius-md)',
                    padding: '12px',
                    color: 'var(--sp-text-on-surface)',
                    fontSize: '13px',
                    fontFamily: 'var(--sp-font)',
                    outline: 'none',
                    resize: 'vertical',
                    lineHeight: 1.5,
                  }}
                />
              </div>
            ))}
          </div>
        </Card>

        <Card padding="0" hover={false}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--sp-border)', fontSize: '14px', fontWeight: 600, color: 'var(--sp-text-primary)', display: 'flex', justifyContent: 'space-between' }}>
            <span>Preview</span>
            <span style={{ fontSize: '11px', color: 'var(--sp-text-tertiary)', fontWeight: 400 }}>Live updates</span>
          </div>
          <div style={{ padding: '40px', background: 'white', minHeight: '500px', color: '#111' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#111', marginBottom: '2px', letterSpacing: '-0.01em' }}>Pranav</h2>
            <p style={{ fontSize: '12px', color: '#666', marginBottom: '16px' }}>Software Engineer • pranav@email.com • github.com/pranav</p>
            {resumeSections.map((section) => (
              <div key={section.title} style={{ marginBottom: '16px' }}>
                <h3 style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#333', borderBottom: '1px solid #eee', paddingBottom: '4px', marginBottom: '8px' }}>
                  {section.title}
                </h3>
                <p style={{ fontSize: '12px', lineHeight: 1.6, color: '#444', whiteSpace: 'pre-line' }}>{section.content}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </motion.div>
  );
}
