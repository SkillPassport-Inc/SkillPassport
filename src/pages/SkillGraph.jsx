import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '../store/useAppStore.js';

function getColor(level) {
  if (level >= 90) return 'var(--sp-accent)';
  if (level >= 80) return 'rgba(79, 70, 229, 0.7)';
  if (level >= 70) return 'rgba(79, 70, 229, 0.45)';
  return 'rgba(79, 70, 229, 0.25)';
}

export default function SkillGraph() {
  const skills = useAppStore((state) => state.skills);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const nodes = useMemo(() => {
    const total = skills.length;
    const centerX = 400;
    const centerY = 270;
    const radius = Math.min(220, 140 + total * 8);

    return skills.map((skill, idx) => {
      const angle = (idx / total) * 2 * Math.PI - Math.PI / 2;
      const x = Math.round(centerX + radius * Math.cos(angle));
      const y = Math.round(centerY + radius * Math.sin(angle));
      return {
        id: skill.id,
        label: skill.name,
        level: skill.score,
        category: skill.category,
        x,
        y,
      };
    });
  }, [skills]);

  const edges = useMemo(() => {
    const list = [];
    for (let i = 0; i < nodes.length; i++) {
      const nextIdx = (i + 1) % nodes.length;
      list.push({ from: nodes[i].id, to: nodes[nextIdx].id });
      if (nodes.length > 4) {
        const oppIdx = (i + Math.floor(nodes.length / 2)) % nodes.length;
        list.push({ from: nodes[i].id, to: nodes[oppIdx].id });
      }
    }
    return list;
  }, [nodes]);

  const filteredNodes = useMemo(
    () => searchQuery ? nodes.filter((n) => n.label.toLowerCase().includes(searchQuery.toLowerCase())) : nodes,
    [searchQuery, nodes]
  );

  const connectedToHovered = useMemo(() => {
    if (!hoveredNode) return new Set();
    const connected = new Set();
    edges.forEach((e) => {
      if (e.from === hoveredNode) connected.add(e.to);
      if (e.to === hoveredNode) connected.add(e.from);
    });
    connected.add(hoveredNode);
    return connected;
  }, [hoveredNode, edges]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '36px', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--sp-text-primary)', marginBottom: '4px' }}>Skill Graph</h1>
          <p style={{ fontSize: '16px', color: 'var(--sp-text-secondary)' }}>Dynamic interactive visualization of your active technical stack.</p>
        </div>
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search skills..."
          style={{
            background: 'var(--sp-surface-card)',
            border: '1px solid var(--sp-border)',
            borderRadius: 'var(--sp-radius-md)',
            padding: '8px 14px',
            color: 'var(--sp-text-on-surface)',
            fontSize: '14px',
            fontFamily: 'var(--sp-font)',
            outline: 'none',
            width: '240px',
          }}
        />
      </div>

      <div
        style={{
          background: 'var(--sp-surface-card)',
          border: '1px solid var(--sp-border)',
          borderRadius: 'var(--sp-radius-lg)',
          overflow: 'hidden',
          position: 'relative',
          height: '560px',
        }}
      >
        <svg width="100%" height="100%" viewBox="0 0 800 540">
          <circle cx={400} cy={270} r={32} fill="var(--sp-surface-elevated)" stroke="var(--sp-accent)" strokeWidth={2} />
          <text x={400} y={266} textAnchor="middle" fill="var(--sp-accent-light)" fontSize="11" fontWeight="700">IDENTITY</text>
          <text x={400} y={278} textAnchor="middle" fill="var(--sp-text-tertiary)" fontSize="9" fontWeight="600">PASSPORT</text>

          {edges.map((edge, i) => {
            const from = nodes.find((n) => n.id === edge.from);
            const to = nodes.find((n) => n.id === edge.to);
            if (!from || !to) return null;

            const isActive = hoveredNode ? connectedToHovered.has(edge.from) && connectedToHovered.has(edge.to) : true;
            return (
              <line
                key={i}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke={isActive ? 'var(--sp-border-hover)' : 'var(--sp-border)'}
                strokeWidth={isActive && hoveredNode ? 1.5 : 0.5}
                opacity={isActive ? 0.8 : 0.15}
                style={{ transition: 'all 0.2s ease' }}
              />
            );
          })}

          {nodes.map((node) => (
            <line
              key={`spoke-${node.id}`}
              x1={400}
              y1={270}
              x2={node.x}
              y2={node.y}
              stroke="var(--sp-accent)"
              strokeWidth="0.5"
              strokeDasharray="4 4"
              opacity="0.3"
            />
          ))}

          {filteredNodes.map((node) => {
            const isActive = hoveredNode ? connectedToHovered.has(node.id) : true;
            const isHovered = hoveredNode === node.id;
            const radius = isHovered ? 30 : 24;
            return (
              <g
                key={node.id}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                style={{ cursor: 'pointer', transition: 'opacity 0.2s ease' }}
                opacity={isActive ? 1 : 0.2}
              >
                {isHovered && (
                  <circle cx={node.x} cy={node.y} r={40} fill={getColor(node.level)} opacity={0.15} />
                )}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={radius}
                  fill="var(--sp-surface-card)"
                  stroke={getColor(node.level)}
                  strokeWidth={isHovered ? 2.5 : 1.5}
                  style={{ transition: 'all 0.2s ease' }}
                />
                <text
                  x={node.x}
                  y={node.y - 2}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="var(--sp-text-primary)"
                  fontSize={isHovered ? '11' : '10'}
                  fontWeight="600"
                  fontFamily="var(--sp-font)"
                >
                  {node.label}
                </text>
                <text
                  x={node.x}
                  y={node.y + 10}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={getColor(node.level)}
                  fontSize="9"
                  fontWeight="700"
                  fontFamily="var(--sp-font)"
                >
                  {node.level}%
                </text>
              </g>
            );
          })}
        </svg>

        <div style={{ position: 'absolute', bottom: '16px', right: '16px', display: 'flex', gap: '12px', background: 'rgba(17,17,19,0.9)', padding: '8px 12px', borderRadius: 'var(--sp-radius-md)', border: '1px solid var(--sp-border)' }}>
          {[{ label: '90%+', color: 'var(--sp-accent)' }, { label: '80%+', color: 'rgba(79,70,229,0.7)' }, { label: '70%+', color: 'rgba(79,70,229,0.45)' }].map((l) => (
            <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: l.color }} />
              <span style={{ fontSize: '11px', color: 'var(--sp-text-tertiary)' }}>{l.label}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
