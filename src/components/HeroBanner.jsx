import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Star, BookmarkCheck, ExternalLink, Zap } from 'lucide-react';

export default function HeroBanner({ onSelectGenre, onQuickView, onOpenAI, onOpenMood }) {
  return (
    <section className="animate-fade-in" style={{ padding: '40px 0 20px', position: 'relative' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', alignItems: 'center' }}>
        
        {/* Left text column */}
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '16px' }} className="badge badge-gold">
            <Sparkles size={14} color="var(--accent-gold)" /> BookVerse Signature Mood & AI Discovery Active
          </div>

          <h1 className="heading-serif" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', fontWeight: '700', lineHeight: '1.15', marginBottom: '18px', color: '#fff' }}>
            Immerse Yourself in <br />
            <span style={{
              background: 'linear-gradient(135deg, #818cf8, #06b6d4, #f59e0b)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Unforgettable Stories.
            </span>
          </h1>

          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '24px', maxWidth: '540px' }}>
            Explore 70+ hand-curated books across 10 rich genres. Discover by mood, daily reading time, difficulty, or natural AI prompts in INR (₹).
          </p>

          {/* Mood Finder Banner CTA */}
          <div 
            onClick={onOpenMood}
            className="glass-panel"
            style={{
              padding: '12px 18px',
              borderRadius: 'var(--radius-md)',
              marginBottom: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              border: '1px solid var(--accent-rose)',
              background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.15), rgba(139, 92, 246, 0.15))'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '1.4rem' }}>🎭</span>
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#fff' }}>What Are You In The Mood For?</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Find books by mood: Happy, Sad, Curious, Motivated, Romantic & more</div>
              </div>
            </div>
            <span className="badge badge-indigo">Try Mood 🎭</span>
          </div>

          {/* BookVerse AI Hero Prompt Banner */}
          <div 
            onClick={onOpenAI}
            className="glass-panel"
            style={{
              padding: '12px 18px',
              borderRadius: 'var(--radius-md)',
              marginBottom: '28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              border: '1px solid var(--accent-gold)',
              background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.12), rgba(99, 102, 241, 0.12))'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Sparkles size={20} color="var(--accent-gold)" />
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#fff' }}>Ask BookVerse AI...</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>"I want something like Interstellar but in novel form."</div>
              </div>
            </div>
            <span className="badge badge-gold">Try AI ✨</span>
          </div>

          {/* Quick CTA Buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', marginBottom: '32px' }}>
            <a href="#explore" className="btn btn-primary" style={{ padding: '12px 24px', fontSize: '1rem' }}>
              <span>Explore All 70+ Books</span>
              <ArrowRight size={18} />
            </a>
            
            <button 
              onClick={() => {
                const element = document.getElementById('explore');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
                onSelectGenre('Movies');
              }}
              className="btn btn-secondary" 
              style={{ padding: '12px 20px', fontSize: '0.95rem' }}
            >
              <Zap size={18} color="var(--accent-gold)" />
              <span>Movie Adaptations</span>
            </button>
          </div>

          {/* Quick Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '16px',
            paddingTop: '20px',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <div>
              <div className="heading-serif" style={{ fontSize: '1.6rem', fontWeight: '700', color: '#fff' }}>70+</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Curated Books</div>
            </div>
            <div>
              <div className="heading-serif" style={{ fontSize: '1.6rem', fontWeight: '700', color: 'var(--accent-cyan)' }}>10</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Rich Genres</div>
            </div>
            <div>
              <div className="heading-serif" style={{ fontSize: '1.6rem', fontWeight: '700', color: 'var(--accent-gold)' }}>4.8★</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Avg Reader Rating</div>
            </div>
          </div>
        </div>

        {/* Right Feature Card */}
        <div style={{ position: 'relative' }}>
          <div 
            className="glass-panel" 
            style={{ 
              borderRadius: 'var(--radius-lg)', 
              padding: '24px', 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '16px',
              border: '1px solid rgba(99, 102, 241, 0.3)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Glowing effect */}
            <div style={{
              position: 'absolute',
              top: '-30%',
              right: '-20%',
              width: '240px',
              height: '240px',
              background: 'radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, transparent 70%)',
              pointerEvents: 'none'
            }} />

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="badge badge-gold">Spotlight of the Week</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <ShieldCheck size={14} /> Verified Bestseller
              </span>
            </div>

            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
              <img 
                src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=600&q=80" 
                alt="The Midnight Library"
                style={{
                  width: '110px',
                  height: '165px',
                  objectFit: 'cover',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: '0 10px 20px rgba(0, 0, 0, 0.5)'
                }}
              />

              <div style={{ flex: 1 }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--accent-indigo)', fontWeight: '600', textTransform: 'uppercase' }}>
                  Fictional
                </span>
                <h3 className="heading-serif" style={{ fontSize: '1.35rem', fontWeight: '700', color: '#fff', margin: '4px 0' }}>
                  The Midnight Library
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                  By Matt Haig
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--accent-gold)', marginBottom: '12px' }}>
                  <Star size={16} fill="var(--accent-gold)" />
                  <span style={{ fontWeight: '700' }}>4.8</span>
                  <span style={{ color: 'var(--text-muted)' }}>(3,420 reviews)</span>
                </div>
                <div style={{ fontSize: '1.2rem', fontWeight: '700', color: '#fff' }}>
                  ₹499 <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>₹699</span>
                </div>
              </div>
            </div>

            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', fontStyle: 'italic', background: 'rgba(255,255,255,0.03)', padding: '10px 14px', borderRadius: 'var(--radius-sm)' }}>
              "Between life and death there is a library, and within that library, the shelves go on forever..."
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <button 
                onClick={() => onQuickView('f-1')}
                className="btn btn-secondary btn-sm"
              >
                Quick Preview
              </button>
              <button 
                onClick={() => onQuickView('f-1')}
                className="btn btn-primary btn-sm"
              >
                Buy Now (₹499)
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
