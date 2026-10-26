import React, { useState } from 'react';
import { Sparkles, Heart, Zap, Compass, CloudRain, BookOpen, Clock, BarChart2, Star, ShoppingBag, ArrowRight, RefreshCw, Smile, Feather } from 'lucide-react';

export const MOOD_OPTIONS = [
  { id: 'Happy', label: 'Happy', icon: '😊', color: '#f59e0b', description: 'Uplifting, joyful, feel-good reads' },
  { id: 'Sad', label: 'Sad', icon: '🌧️', color: '#60a5fa', description: 'Poignant, reflective, cathartic stories' },
  { id: 'Curious', label: 'Curious', icon: '🔍', color: '#06b6d4', description: 'Mind-bending mysteries & thought-provoking ideas' },
  { id: 'Motivated', label: 'Motivated', icon: '⚡', color: '#10b981', description: 'Actionable productivity & inspiring journeys' },
  { id: 'Romantic', label: 'Romantic', icon: '💖', color: '#ec4899', description: 'Heart-fluttering love, passion & connection' },
  { id: 'Adventurous', label: 'Adventurous', icon: '🧭', color: '#8b5cf6', description: 'Thrilling quests, sci-fi & epic world-building' },
  { id: 'Stressed', label: 'Stressed', icon: '🌿', color: '#34d399', description: 'Relaxing, cozy, easy-breezy escape books' },
  { id: 'Want to learn', label: 'Want to learn', icon: '💡', color: '#6366f1', description: 'Fascinating histories, science & human psychology' }
];

export const TIME_OPTIONS = [
  { id: 'All', label: 'Any Duration' },
  { id: '15-30 min/day', label: '15–30 min/day (~2-3 hrs total)' },
  { id: '30-60 min/day', label: '30–60 min/day (~4-5 hrs total)' },
  { id: '1+ hr/day', label: '1+ hr/day (Epic & Deep Reads)' }
];

export const DIFFICULTY_OPTIONS = [
  { id: 'All', label: 'All Levels' },
  { id: 'Beginner-Friendly', label: 'Beginner' },
  { id: 'Intermediate', label: 'Intermediate' },
  { id: 'Advanced / Deep Read', label: 'Advanced' }
];

export default function MoodFinder({ books, onAddToCart, onDirectCheckout, onQuickView, onNavigateToStore }) {
  const [selectedMood, setSelectedMood] = useState('Curious');
  const [selectedTime, setSelectedTime] = useState('30-60 min/day');
  const [selectedDifficulty, setSelectedDifficulty] = useState('Beginner-Friendly');

  // Filter books matching selected criteria
  const matchingBooks = books.filter(book => {
    // Mood match
    const matchesMood = !selectedMood || (book.moods && book.moods.includes(selectedMood)) || (book.vibeTags && book.vibeTags.some(v => v.toLowerCase().includes(selectedMood.toLowerCase())));

    // Time match
    let matchesTime = true;
    if (selectedTime === '15-30 min/day') {
      matchesTime = book.pages <= 320;
    } else if (selectedTime === '30-60 min/day') {
      matchesTime = book.pages > 250 && book.pages <= 450;
    } else if (selectedTime === '1+ hr/day') {
      matchesTime = book.pages > 400;
    }

    // Difficulty match
    let matchesDiff = true;
    if (selectedDifficulty !== 'All') {
      matchesDiff = book.difficulty === selectedDifficulty || (!book.difficulty && selectedDifficulty === 'Beginner-Friendly');
    }

    return matchesMood && matchesTime && matchesDiff;
  });

  // Calculate match reason dynamically
  const getMatchReason = (book) => {
    return `Matches your "${selectedMood}" mood with a ${book.readingTime || '4h'} total read time (${book.difficulty || 'Beginner'}).`;
  };

  return (
    <div className="container animate-fade-in" style={{ padding: '32px 16px 60px' }}>
      
      {/* Header Banner */}
      <div style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto 36px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }} className="badge badge-gold">
          <Sparkles size={14} color="var(--accent-gold)" /> BookVerse Signature Discovery
        </div>
        <h1 className="heading-serif" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: '700', color: '#fff', marginBottom: '14px' }}>
          What Are You In The Mood For?
        </h1>
        <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)' }}>
          Skip the generic categories. Choose your current emotional vibe, daily reading pace, and preferred difficulty to get perfectly matched books.
        </p>
      </div>

      {/* Interactive Selection Panel */}
      <div className="glass-panel" style={{ padding: '28px', borderRadius: 'var(--radius-lg)', marginBottom: '40px', border: '1px solid rgba(99, 102, 241, 0.3)' }}>
        
        {/* Step 1: Mood Selector */}
        <div style={{ marginBottom: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <label style={{ fontSize: '0.95rem', fontWeight: '700', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              1. How are you feeling today?
            </label>
            <span style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)' }}>Select a Mood</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '12px' }}>
            {MOOD_OPTIONS.map(mood => {
              const isSelected = selectedMood === mood.id;
              return (
                <button
                  key={mood.id}
                  onClick={() => setSelectedMood(mood.id)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '14px 10px',
                    borderRadius: 'var(--radius-md)',
                    background: isSelected ? `linear-gradient(135deg, ${mood.color}25, rgba(15, 23, 42, 0.8))` : 'rgba(255,255,255,0.03)',
                    border: isSelected ? `2px solid ${mood.color}` : '1px solid var(--border-color)',
                    boxShadow: isSelected ? `0 0 16px ${mood.color}40` : 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    textAlign: 'center'
                  }}
                >
                  <span style={{ fontSize: '1.8rem' }}>{mood.icon}</span>
                  <span style={{ fontSize: '0.9rem', fontWeight: isSelected ? '700' : '600', color: isSelected ? '#fff' : 'var(--text-secondary)' }}>
                    {mood.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2 & 3: Time & Difficulty Filters */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          
          {/* Time Commitment */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase' }}>
              2. Daily Reading Time
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {TIME_OPTIONS.map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setSelectedTime(opt.id)}
                  className={`btn ${selectedTime === opt.id ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ justifyContent: 'flex-start', fontSize: '0.85rem', padding: '8px 12px' }}
                >
                  <Clock size={14} />
                  <span>{opt.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty Level */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase' }}>
              3. Difficulty Level
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {DIFFICULTY_OPTIONS.map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setSelectedDifficulty(opt.id)}
                  className={`btn ${selectedDifficulty === opt.id ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ justifyContent: 'flex-start', fontSize: '0.85rem', padding: '8px 12px' }}
                >
                  <BarChart2 size={14} />
                  <span>{opt.label}</span>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Selected Combo Output Banner */}
        <div style={{
          marginTop: '24px',
          padding: '14px 20px',
          borderRadius: 'var(--radius-md)',
          background: 'linear-gradient(90deg, rgba(99, 102, 241, 0.2), rgba(6, 182, 212, 0.2))',
          border: '1px solid var(--accent-indigo)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)', fontWeight: '700', textTransform: 'uppercase' }}>Active Selection:</span>
            <div style={{ fontSize: '1rem', fontWeight: '700', color: '#fff', marginTop: '2px' }}>
              You selected: <span style={{ color: 'var(--accent-gold)' }}>{selectedMood}</span> + <span style={{ color: 'var(--accent-indigo)' }}>{selectedTime}</span> + <span style={{ color: 'var(--accent-emerald)' }}>{selectedDifficulty}</span>
            </div>
          </div>

          <button 
            onClick={() => {
              setSelectedMood('Curious');
              setSelectedTime('30-60 min/day');
              setSelectedDifficulty('Beginner-Friendly');
            }}
            className="btn btn-secondary btn-sm"
          >
            <RefreshCw size={14} /> Reset Filters
          </button>
        </div>

      </div>

      {/* Results Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <h2 className="heading-serif" style={{ fontSize: '1.5rem', fontWeight: '700', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>Recommended for "{selectedMood}"</span>
          <span className="badge badge-indigo">{matchingBooks.length} Books Found</span>
        </h2>
      </div>

      {/* Matching Books Grid */}
      {matchingBooks.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
          {matchingBooks.map(book => (
            <div 
              key={book.id}
              className="glass-panel"
              style={{
                borderRadius: 'var(--radius-md)',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: '1px solid rgba(255,255,255,0.1)'
              }}
            >
              <div>
                {/* Book Header */}
                <div style={{ display: 'flex', gap: '16px', marginBottom: '14px' }}>
                  <img 
                    src={book.cover} 
                    alt={book.title}
                    style={{ width: '84px', height: '124px', objectFit: 'cover', borderRadius: 'var(--radius-sm)', boxShadow: '0 8px 16px rgba(0,0,0,0.4)' }}
                  />
                  <div>
                    <span className="badge badge-gold" style={{ fontSize: '0.65rem', marginBottom: '4px' }}>
                      {book.genre}
                    </span>
                    <h3 className="heading-serif" style={{ fontSize: '1.05rem', fontWeight: '700', color: '#fff', margin: '2px 0 4px', lineHeight: '1.25' }}>
                      {book.title}
                    </h3>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px' }}>{book.author}</p>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', color: 'var(--accent-gold)' }}>
                      <Star size={14} fill="var(--accent-gold)" />
                      <span style={{ fontWeight: '700' }}>{book.rating}</span>
                      <span style={{ color: 'var(--text-muted)' }}>({book.reviewsCount})</span>
                    </div>
                  </div>
                </div>

                {/* Mood Match Reason */}
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', background: 'rgba(255,255,255,0.03)', padding: '10px', borderRadius: 'var(--radius-sm)', marginBottom: '12px', fontStyle: 'italic' }}>
                  "{getMatchReason(book)}"
                </p>

                {/* Tags & Metadata */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                  <span className="badge badge-cyan" style={{ fontSize: '0.65rem' }}>
                    <Clock size={10} style={{ marginRight: '3px' }} /> {book.readingTime || '~4h'}
                  </span>
                  <span className="badge badge-indigo" style={{ fontSize: '0.65rem' }}>
                    {book.difficulty || 'Beginner-Friendly'}
                  </span>
                  {book.pages && (
                    <span className="badge badge-emerald" style={{ fontSize: '0.65rem' }}>
                      {book.pages} pages
                    </span>
                  )}
                </div>
              </div>

              {/* Price & Action CTAs */}
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ fontSize: '1.15rem', fontWeight: '700', color: '#fff' }}>₹{book.price}</span>
                  {book.originalPrice && (
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textDecoration: 'line-through', marginLeft: '6px' }}>
                      ₹{book.originalPrice}
                    </span>
                  )}
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button 
                    onClick={() => onQuickView(book.id)}
                    className="btn btn-secondary btn-sm"
                  >
                    Preview
                  </button>
                  <button 
                    onClick={() => onAddToCart(book)}
                    className="btn btn-primary btn-sm"
                  >
                    <ShoppingBag size={14} /> Buy
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      ) : (
        <div className="glass-panel" style={{ textAlign: 'center', padding: '48px 24px', borderRadius: 'var(--radius-lg)' }}>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
            No exact books matched "{selectedMood}" with those strict time and difficulty criteria.
          </p>
          <button 
            onClick={() => {
              setSelectedTime('All');
              setSelectedDifficulty('All');
            }}
            className="btn btn-primary"
          >
            Show All "{selectedMood}" Books
          </button>
        </div>
      )}

    </div>
  );
}
