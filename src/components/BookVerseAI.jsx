import React, { useState, useMemo } from 'react';
import { Sparkles, Search, ArrowRight, Star, Clock, Target, CheckCircle2, ShoppingBag, Eye, BookOpen, MessageSquare, Zap } from 'lucide-react';

export default function BookVerseAI({
  books,
  onAddToCart,
  onQuickView,
  onDirectCheckout
}) {
  const [prompt, setPrompt] = useState('I want something like Interstellar but in novel form.');
  const [activeQuery, setActiveQuery] = useState('I want something like Interstellar but in novel form.');

  const samplePrompts = [
    "I want something like Interstellar but in novel form.",
    "I'm feeling demotivated. Give me a short book to get back on track.",
    "I have 2 hours this weekend. Recommend something interesting.",
    "I want a mystery book, less than 300 pages, suitable for a beginner.",
    "Give me an epic series starter with dragons or magic."
  ];

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    if (!prompt.trim()) return;
    setActiveQuery(prompt.trim());
  };

  const handleSampleClick = (p) => {
    setPrompt(p);
    setActiveQuery(p);
  };

  // Natural Language Intent Engine
  const aiResults = useMemo(() => {
    const q = activeQuery.toLowerCase();

    return books.map(book => {
      let score = 50; // base
      let reasons = [];

      // 1. Interstellar / Space / Planet prompt
      if (q.includes('interstellar') || q.includes('space') || q.includes('planet') || q.includes('sci-fi')) {
        if (book.genre === 'Sci-Fi') score += 25;
        if (book.vibeTags.includes('interstellar') || book.vibeTags.includes('space-mission')) {
          score += 20;
          reasons.push("Features deep-space survival, human extinction stakes, and hard science physics similar to Interstellar.");
        } else if (book.vibeTags.includes('space-epic') || book.vibeTags.includes('galaxy')) {
          score += 15;
          reasons.push("Spanning grand interstellar space fleets, galactic politics, and cinematic cosmic wonder.");
        }
      }

      // 2. Demotivated / Short / Get back on track / 2 hours prompt
      if (q.includes('demotivated') || q.includes('back on track') || q.includes('short') || q.includes('2 hours') || q.includes('quick')) {
        if (book.pages <= 250) {
          score += 25;
          reasons.push(`Ultra concise (${book.pages} pages, ${book.readingTime}) designed to finish in one or two short reading sessions.`);
        }
        if (book.vibeTags.includes('motivational') || book.vibeTags.includes('inspirational') || book.vibeTags.includes('hopeful')) {
          score += 20;
          reasons.push("Inspiring self-discovery narrative crafted specifically to spark motivation and mental clarity.");
        }
      }

      // 3. Mystery / <300 pages / beginner prompt
      if (q.includes('mystery') || q.includes('beginner') || q.includes('not too dark') || q.includes('300')) {
        if (book.genre === 'Mystery & Thriller') score += 25;
        if (book.pages <= 300) score += 15;
        if (book.difficulty === 'Beginner-Friendly') {
          score += 15;
          reasons.push("Paced smoothly for beginner readers with crisp, addictive chapters and no dense jargon.");
        }
      }

      // 4. Series / Fantasy / Magic prompt
      if (q.includes('series') || q.includes('magic') || q.includes('dragons') || q.includes('epic')) {
        if (book.genre === 'Series') score += 25;
        if (book.vibeTags.includes('series-starter')) {
          score += 20;
          reasons.push("Book #1 entry point into an acclaimed world-building series.");
        }
      }

      // Generic fallback reason if no specific match hit
      if (reasons.length === 0) {
        if (book.bestseller) {
          score += 15;
          reasons.push(`Critically acclaimed bestseller with ${book.rating}★ rating based on reader engagement patterns.`);
        } else {
          reasons.push(`Thematically matches your request with ${book.difficulty} pacing and ${book.readingTime} read time.`);
        }
      }

      const matchScore = Math.min(98, Math.max(78, score));

      return {
        book,
        matchScore,
        reason: reasons[0]
      };
    })
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 5); // Top 5 matches

  }, [activeQuery, books]);

  return (
    <section className="animate-fade-in" style={{ padding: '30px 0 60px' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 30px' }}>
          <div className="badge badge-gold" style={{ gap: '6px', marginBottom: '12px' }}>
            <Sparkles size={14} color="var(--accent-gold)" /> Powered by BookVerse AI Concierge
          </div>
          <h1 className="heading-serif" style={{ fontSize: '2.4rem', fontWeight: '700', color: '#fff', marginBottom: '12px' }}>
            Describe What You Want to Read
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
            Type how you feel, what movie vibe you like, or how much time you have. BookVerse AI matches the exact book for your current mood!
          </p>
        </div>

        {/* AI Input Form */}
        <div className="glass-panel" style={{
          maxWidth: '800px',
          margin: '0 auto 24px',
          padding: '16px',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-highlight)'
        }}>
          <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', flex: 1, minWidth: '280px' }}>
              <Sparkles size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--accent-gold)' }} />
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Ask BookVerse AI... (e.g., 'Interstellar style novel' or 'Demotivated short book')"
                className="input-field"
                style={{ paddingLeft: '44px', height: '48px', fontSize: '1rem', borderRadius: 'var(--radius-md)' }}
              />
            </div>
            
            <button
              type="submit"
              className="btn btn-primary"
              style={{ padding: '0 24px', height: '48px', gap: '8px', background: 'linear-gradient(135deg, #f59e0b, #6366f1)' }}
            >
              <span>Ask AI</span>
              <ArrowRight size={18} />
            </button>
          </form>

          {/* Sample Prompts Chips */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '14px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Try prompting:</span>
            {samplePrompts.map((p, i) => (
              <button
                key={i}
                onClick={() => handleSampleClick(p)}
                style={{
                  background: prompt === p ? 'rgba(245, 158, 11, 0.2)' : 'rgba(255,255,255,0.04)',
                  border: prompt === p ? '1px solid var(--accent-gold)' : '1px solid rgba(255,255,255,0.1)',
                  color: prompt === p ? 'var(--accent-gold)' : 'var(--text-secondary)',
                  padding: '4px 10px',
                  borderRadius: '999px',
                  fontSize: '0.78rem',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                "{p}"
              </button>
            ))}
          </div>
        </div>

        {/* AI Results Output Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>AI Query Analysis:</span>
            <div style={{ fontSize: '1.1rem', fontWeight: '700', color: '#fff' }}>
              "{activeQuery}"
            </div>
          </div>

          <span className="badge badge-indigo">
            <CheckCircle2 size={14} /> Found {aiResults.length} Curated Matches
          </span>
        </div>

        {/* Ranked AI Match Cards List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {aiResults.map(({ book, matchScore, reason }, index) => (
            <div
              key={book.id}
              className="glass-panel"
              style={{
                borderRadius: 'var(--radius-lg)',
                padding: '24px',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '24px',
                alignItems: 'center',
                border: index === 0 ? '1px solid var(--accent-gold)' : '1px solid rgba(255,255,255,0.1)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Match Score Badge */}
              <div style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: index === 0 ? 'linear-gradient(135deg, #f59e0b, #d97706)' : 'rgba(99, 102, 241, 0.2)',
                color: index === 0 ? '#000' : 'var(--accent-indigo)',
                fontWeight: '800',
                padding: '4px 12px',
                borderRadius: '999px',
                fontSize: '0.85rem',
                border: index === 0 ? 'none' : '1px solid rgba(99, 102, 241, 0.4)'
              }}>
                {matchScore}% Match
              </div>

              {/* Cover & Title */}
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <img src={book.cover} alt={book.title} style={{ width: '90px', height: '135px', objectFit: 'cover', borderRadius: '8px', boxShadow: '0 8px 16px rgba(0,0,0,0.5)' }} />

                <div>
                  <span className="badge badge-indigo" style={{ marginBottom: '6px' }}>{book.genre}</span>
                  <h3 className="heading-serif" style={{ fontSize: '1.3rem', fontWeight: '700', color: '#fff', lineHeight: '1.2' }}>
                    {book.title}
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--accent-cyan)', marginBottom: '6px' }}>
                    by {book.author}
                  </p>
                  <div style={{ fontSize: '0.8rem', color: 'var(--accent-gold)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Star size={14} fill="var(--accent-gold)" />
                    <span style={{ fontWeight: '700' }}>{book.rating}</span>
                    <span style={{ color: 'var(--text-muted)' }}>({book.reviewsCount} reviews)</span>
                  </div>
                </div>
              </div>

              {/* AI Why it Matches Explanation */}
              <div style={{ background: 'rgba(255,255,255,0.03)', borderLeft: '3px solid var(--accent-gold)', padding: '14px', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontSize: '0.78rem', color: 'var(--accent-gold)', fontWeight: '700', textTransform: 'uppercase', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Sparkles size={12} /> Why BookVerse AI Chose This:
                </div>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                  {reason}
                </p>

                {/* Specs chips */}
                <div style={{ display: 'flex', gap: '12px', marginTop: '10px', fontSize: '0.78rem', color: 'var(--text-muted)', flexWrap: 'wrap' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={12} /> Read Time: <strong style={{ color: '#fff' }}>{book.readingTime || '~4h'}</strong>
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Target size={12} /> Difficulty: <strong style={{ color: 'var(--accent-cyan)' }}>{book.difficulty || 'Moderate'}</strong>
                  </span>
                  <span>• {book.pages} pages</span>
                </div>
              </div>

              {/* Pricing & Buying Action */}
              <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'center' }}>
                <div>
                  <span style={{ fontSize: '1.5rem', fontWeight: '700', color: '#fff' }}>
                    ₹{book.price}
                  </span>
                  {book.originalPrice && (
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textDecoration: 'line-through', marginLeft: '6px' }}>
                      ₹{book.originalPrice}
                    </span>
                  )}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <button
                    onClick={() => onDirectCheckout(book)}
                    className="btn btn-primary btn-sm"
                    style={{ padding: '10px', background: 'linear-gradient(135deg, #f59e0b, #6366f1)' }}
                  >
                    Buy Now (₹{book.price})
                  </button>

                  <button
                    onClick={() => onAddToCart(book)}
                    className="btn btn-secondary btn-sm"
                  >
                    <ShoppingBag size={14} /> Add to Cart
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
