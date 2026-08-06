import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '../store/useAppStore.js';
import Card from '../components/Card.jsx';
import Button from '../components/Button.jsx';

export default function CareerCoach() {
  const user = useAppStore((state) => state.user);
  const skills = useAppStore((state) => state.skills);

  const topSkillsList = skills.slice(0, 4).map((s) => `${s.name} (${s.score}%)`).join(', ');

  const [messages, setMessages] = useState([
    {
      role: 'ai',
      content: `Hello ${user.name || 'Engineer'}! 👋

I'm your **AI Career Coach**. I've analyzed your verified technical passport:

**Your active stack:** ${topSkillsList || 'Java, Spring Boot, React'}
**Overall score:** ${user.overallScore}%

You are currently **87% ready** for a **Senior Systems Engineer** role!

How can I help you today? Ask me about:
1. Closing your skill gaps
2. Generating a step-by-step learning roadmap
3. Preparing for technical architecture interviews
4. Recommended open-source projects to boost your score`,
    },
  ]);

  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    const userText = input.trim();
    setMessages((prev) => [...prev, { role: 'user', content: userText }]);
    setInput('');

    setTimeout(() => {
      let aiResponse = '';
      const lower = userText.toLowerCase();

      if (lower.includes('gap') || lower.includes('missing') || lower.includes('skill')) {
        aiResponse = `Based on current market demands for senior roles with your stack (${topSkillsList}):

**Key Skill Gaps Identified:**
1. **Event Driven Messaging (Kafka / RabbitMQ)** — High demand in backend microservices.
2. **Container Orchestration (Kubernetes)** — Essential for modern DevOps pipelines.
3. **Distributed Caching (Redis)** — Crucial for scaling high-throughput APIs.

**Recommendation:** Add a Kafka + Redis messaging layer to your top repository to boost your score by +6%.`;
      } else if (lower.includes('roadmap') || lower.includes('plan') || lower.includes('learn')) {
        aiResponse = `**Personalized 6-Month Roadmap for ${user.name}:**

**Month 1–2: System Architecture & Design Patterns**
• Study distributed consensus & partitioning
• Build: Add multi-region failover to your project

**Month 3–4: Event Streaming with Kafka**
• Implement producer/consumer groups & idempotency
• Practice: Real-time event aggregation

**Month 5–6: AWS/GCP Deployment & Observability**
• Deploy to Kubernetes (EKS/GKE) with Prometheus monitoring
• Target: Achieve 95%+ overall passport score!`;
      } else {
        aiResponse = `Great point! For an engineer with your active verified stack (${topSkillsList}), focusing on clean architecture, comprehensive automated test coverage (>85%), and documented REST/GraphQL APIs will maximize your score for top-tier recruiters.

Would you like me to analyze your latest repository commits or generate practice interview questions?`;
      }

      setMessages((prev) => [...prev, { role: 'ai', content: aiResponse }]);
    }, 800);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 160px)' }}>
      <div style={{ marginBottom: '16px' }}>
        <h1 style={{ fontSize: '36px', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--sp-text-primary)', marginBottom: '4px' }}>AI Career Coach</h1>
        <p style={{ fontSize: '16px', color: 'var(--sp-text-secondary)' }}>Personalized career guidance dynamically tailored to your verified technical identity.</p>
      </div>

      <Card padding="0" hover={false} style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ flex: 1, overflow: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {messages.map((msg, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                gap: '12px',
                alignItems: 'flex-start',
                maxWidth: msg.role === 'user' ? '80%' : '100%',
                alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
              }}
            >
              {msg.role === 'ai' && (
                <div style={{ width: 32, height: 32, borderRadius: 'var(--sp-radius-md)', background: 'var(--sp-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', color: 'white', fontWeight: 700, flexShrink: 0 }}>
                  AI
                </div>
              )}
              <div
                style={{
                  background: msg.role === 'user' ? 'var(--sp-accent)' : 'var(--sp-surface-container)',
                  borderRadius: 'var(--sp-radius-lg)',
                  padding: '14px 18px',
                  fontSize: '14px',
                  lineHeight: 1.7,
                  color: msg.role === 'user' ? 'white' : 'var(--sp-text-on-surface)',
                  whiteSpace: 'pre-wrap',
                }}
              >
                {msg.content.split('**').map((part, j) =>
                  j % 2 === 1 ? <strong key={j}>{part}</strong> : part
                )}
              </div>
            </div>
          ))}
        </div>

        <div style={{ padding: '16px 24px', borderTop: '1px solid var(--sp-border)', display: 'flex', gap: '12px' }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask your AI Career Coach anything..."
            style={{
              flex: 1,
              background: 'var(--sp-bg)',
              border: '1px solid var(--sp-border)',
              borderRadius: 'var(--sp-radius-md)',
              padding: '12px 16px',
              color: 'var(--sp-text-on-surface)',
              fontSize: '14px',
              fontFamily: 'var(--sp-font)',
              outline: 'none',
            }}
          />
          <Button onClick={handleSend}>Send</Button>
        </div>
      </Card>
    </motion.div>
  );
}
