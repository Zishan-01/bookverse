import React from 'react';
import { Dna, Zap, Shield, Heart, Compass, Brain, Flame, Activity, Clock, Smile } from 'lucide-react';

// Helper function to derive or compute Book DNA deterministically if missing on any book
export function getBookDNA(book) {
  if (book && book.dna) return book.dna;

  const genre = book?.genre || 'Fictional';
  const pages = book?.pages || 300;
  const rating = book?.rating || 4.5;
  const vibes = (book?.vibeTags || []).map(v => v.toLowerCase());

  // Default baseline DNA based on genre and vibes
  let adventure = 5;
  let philosophy = 5;
  let romance = 4;
  let action = 4;
  let emotional = 6;
  let complexity = 5;
  let motivation = 6;

  if (genre.includes('Sci-Fi')) {
    adventure = 9; philosophy = 8; action = 7; complexity = 7; motivation = 7;
  } else if (genre.includes('Fantasy')) {
    adventure = 10; philosophy = 7; action = 8; complexity = 8; romance = 5;
  } else if (genre.includes('Self-Improvement')) {
    motivation = 10; philosophy = 9; complexity = 4; emotional = 5; adventure = 3;
  } else if (genre.includes('Romance')) {
    romance = 10; emotional = 9; adventure = 4; action = 2; motivation = 6;
  } else if (genre.includes('Mystery') || genre.includes('Thriller')) {
    action = 8; complexity = 8; emotional = 7; adventure = 7; philosophy = 6;
  } else if (genre.includes('History') || genre.includes('Biography')) {
    philosophy = 9; motivation = 8; complexity = 7; emotional = 6; adventure = 6;
  } else if (genre.includes('Horror')) {
    action = 8; emotional = 8; complexity = 6; adventure = 7; philosophy = 5;
  } else if (genre.includes('Movies') || genre.includes('Series')) {
    adventure = 8; action = 8; emotional = 7; complexity = 6; motivation = 7;
  }

  // Adjust by vibe tags
  if (vibes.includes('life-changing') || vibes.includes('motivational')) motivation = Math.min(10, motivation + 2);
  if (vibes.includes('philosophical') || vibes.includes('deep')) philosophy = Math.min(10, philosophy + 2);
  if (vibes.includes('emotional') || vibes.includes('heartbreak')) emotional = Math.min(10, emotional + 2);
  if (vibes.includes('classic') || vibes.includes('complex')) complexity = Math.min(10, complexity + 2);

  // Derive Reading Experience
  let pacing = 'Medium';
  if (action >= 8 || vibes.includes('fast-paced') || vibes.includes('thriller')) pacing = 'Fast-paced';
  else if (philosophy >= 8 || pages > 500) pacing = 'Slow-paced';

  let tone = 'Emotional';
  if (emotional >= 8 || vibes.includes('heartbreak') || genre.includes('Horror')) tone = 'Heavy';
  else if (romance >= 7 || vibes.includes('cozy') || vibes.includes('cute')) tone = 'Light';

  let difficulty = book?.difficulty || 'Beginner';
  if (complexity >= 8 || pages > 600) difficulty = 'Advanced';
  else if (complexity >= 6 || pages > 350) difficulty = 'Intermediate';
  else difficulty = 'Beginner';

  return {
    attributes: [
      { name: 'Adventure', score: adventure, color: '#8b5cf6', icon: '🧭' },
      { name: 'Philosophy', score: philosophy, color: '#06b6d4', icon: '💡' },
      { name: 'Romance', score: romance, color: '#ec4899', icon: '💖' },
      { name: 'Action', score: action, color: '#f43f5e', icon: '⚡' },
      { name: 'Emotional', score: emotional, color: '#f59e0b', icon: '🔥' },
      { name: 'Complexity', score: complexity, color: '#6366f1', icon: '🧠' },
      { name: 'Motivation', score: motivation, color: '#10b981', icon: '🚀' }
    ],
    experience: {
      pacing,
      tone,
      difficulty
    }
  };
}

export default function BookDNAVisual({ book, compact = false }) {
  const dna = getBookDNA(book);

  const getBlocks = (score) => {
    const filledCount = Math.round(score);
    const emptyCount = 10 - filledCount;
    return '█'.repeat(filledCount) + '░'.repeat(emptyCount);
  };

  return (
    <div className="glass-panel" style={{ padding: compact ? '16px' : '24px', borderRadius: 'var(--radius-md)', border: '1px solid rgba(99, 102, 241, 0.3)' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Dna size={20} color="var(--accent-indigo)" />
          <h4 className="heading-serif" style={{ fontSize: compact ? '1rem' : '1.2rem', fontWeight: '700', color: '#fff', margin: 0 }}>
            Book DNA Profile
          </h4>
        </div>
        <span className="badge badge-gold" style={{ fontSize: '0.68rem' }}>Verified DNA 🧬</span>
      </div>

      {/* Attribute Breakdown Bars */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
        {dna.attributes.map(attr => (
          <div key={attr.name}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '4px' }}>
              <span style={{ color: '#fff', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>{attr.icon}</span> {attr.name}
              </span>
              <span style={{ color: attr.color, fontFamily: 'monospace', fontWeight: '700', fontSize: '0.85rem' }}>
                {getBlocks(attr.score)} <span style={{ color: '#fff', marginLeft: '4px' }}>{attr.score}/10</span>
              </span>
            </div>

            {/* Visual Progress Bar */}
            <div style={{ width: '100%', height: '7px', background: 'rgba(255,255,255,0.08)', borderRadius: '999px', overflow: 'hidden' }}>
              <div 
                style={{
                  width: `${attr.score * 10}%`,
                  height: '100%',
                  background: `linear-gradient(90deg, ${attr.color}, #ffffff88)`,
                  borderRadius: '999px',
                  transition: 'width 0.6s ease'
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Reading Experience Matrix */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '16px' }}>
        <div style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px' }}>
          Reading Experience Matrix
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px' }}>
          
          {/* Pacing */}
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Pacing</div>
            <div style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--accent-cyan)' }}>
              {dna.experience.pacing}
            </div>
            <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              Slow → Medium → Fast
            </div>
          </div>

          {/* Tone / Weight */}
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Emotional Tone</div>
            <div style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--accent-rose)' }}>
              {dna.experience.tone}
            </div>
            <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              Light → Emotional → Heavy
            </div>
          </div>

          {/* Difficulty */}
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Reading Level</div>
            <div style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--accent-gold)' }}>
              {dna.experience.difficulty}
            </div>
            <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              Beginner → Advanced
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
