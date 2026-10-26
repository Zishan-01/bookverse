import React, { useState } from 'react';
import { 
  BookOpen, 
  Flame, 
  Target, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  Sparkles, 
  Plus, 
  BarChart3, 
  Star, 
  TrendingUp, 
  Bookmark, 
  ArrowRight,
  Award,
  MessageSquare,
  ThumbsUp,
  RotateCcw
} from 'lucide-react';

export default function ReadingOSDashboard({
  currentlyReading,
  onUpdateProgress,
  wantToRead,
  completedBooks,
  onSelectBookToRead,
  onAddReview,
  onNavigateToStore,
  allBooks
}) {
  const [activeTab, setActiveTab] = useState('active'); // 'active' | 'library' | 'stats' | 'recommendations'
  const [pagesInput, setPagesInput] = useState(18);
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  // Default book if none actively selected
  const activeBook = currentlyReading || {
    id: 'f-11',
    title: 'Atomic Habits',
    author: 'James Clear',
    genre: 'Fictional',
    pages: 320,
    cover: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
    pagesRead: 138,
    progressPercent: 43,
    todayTarget: 18,
    streakDays: 7,
    estimatedCompletion: 'September 24',
    weeklyTime: '3h 42m'
  };

  const percent = activeBook.progressPercent || Math.round((activeBook.pagesRead / activeBook.pages) * 100);

  const handleLogPages = (e) => {
    e.preventDefault();
    const addedPages = Number(pagesInput);
    if (!addedPages || addedPages <= 0) return;

    const newPagesRead = Math.min(activeBook.pages, (activeBook.pagesRead || 138) + addedPages);
    const newPercent = Math.round((newPagesRead / activeBook.pages) * 100);
    const newTarget = Math.max(0, (activeBook.todayTarget || 18) - addedPages);

    onUpdateProgress({
      ...activeBook,
      pagesRead: newPagesRead,
      progressPercent: newPercent,
      todayTarget: newTarget
    });

    setIsLogModalOpen(false);
  };

  return (
    <div className="animate-fade-in" style={{ padding: '30px 0 60px' }}>
      <div className="container">
        
        {/* Dashboard Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '30px'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span className="badge badge-gold" style={{ gap: '4px' }}>
                <Flame size={14} color="var(--accent-gold)" /> Reading OS Activated
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <CheckCircle2 size={14} /> Ecosystem Synced
              </span>
            </div>
            <h1 className="heading-serif" style={{ fontSize: '2.2rem', fontWeight: '700', color: '#fff' }}>
              My Reading OS
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              Discover → Buy → Read → Track → Review → Recommend
            </p>
          </div>

          {/* Top Quick Stats Pill Bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <div className="glass-panel" style={{ padding: '8px 16px', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Flame size={20} color="var(--accent-gold)" />
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Current Streak</div>
                <div style={{ fontSize: '1.05rem', fontWeight: '700', color: '#fff' }}>{activeBook.streakDays || 7} Days 🔥</div>
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '8px 16px', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Clock size={20} color="var(--accent-cyan)" />
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>This Week</div>
                <div style={{ fontSize: '1.05rem', fontWeight: '700', color: '#fff' }}>{activeBook.weeklyTime || '3h 42m'}</div>
              </div>
            </div>

            <button 
              onClick={onNavigateToStore}
              className="btn btn-primary"
              style={{ gap: '6px' }}
            >
              <span>Explore Store</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Reading OS Tab Navigation */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          marginBottom: '30px',
          overflowX: 'auto',
          paddingBottom: '2px'
        }}>
          <button
            onClick={() => setActiveTab('active')}
            style={{
              background: 'none',
              border: 'none',
              borderBottom: activeTab === 'active' ? '3px solid var(--accent-indigo)' : '3px solid transparent',
              color: activeTab === 'active' ? '#fff' : 'var(--text-muted)',
              fontWeight: activeTab === 'active' ? '700' : '500',
              padding: '10px 16px',
              cursor: 'pointer',
              fontSize: '0.95rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              whiteSpace: 'nowrap'
            }}
          >
            <BookOpen size={18} color={activeTab === 'active' ? 'var(--accent-indigo)' : 'currentColor'} />
            <span>Currently Reading</span>
          </button>

          <button
            onClick={() => setActiveTab('library')}
            style={{
              background: 'none',
              border: 'none',
              borderBottom: activeTab === 'library' ? '3px solid var(--accent-indigo)' : '3px solid transparent',
              color: activeTab === 'library' ? '#fff' : 'var(--text-muted)',
              fontWeight: activeTab === 'library' ? '700' : '500',
              padding: '10px 16px',
              cursor: 'pointer',
              fontSize: '0.95rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              whiteSpace: 'nowrap'
            }}
          >
            <Bookmark size={18} />
            <span>My Library & Shelves</span>
          </button>

          <button
            onClick={() => setActiveTab('stats')}
            style={{
              background: 'none',
              border: 'none',
              borderBottom: activeTab === 'stats' ? '3px solid var(--accent-indigo)' : '3px solid transparent',
              color: activeTab === 'stats' ? '#fff' : 'var(--text-muted)',
              fontWeight: activeTab === 'stats' ? '700' : '500',
              padding: '10px 16px',
              cursor: 'pointer',
              fontSize: '0.95rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              whiteSpace: 'nowrap'
            }}
          >
            <BarChart3 size={18} />
            <span>Reading Analytics</span>
          </button>

          <button
            onClick={() => setActiveTab('recommendations')}
            style={{
              background: 'none',
              border: 'none',
              borderBottom: activeTab === 'recommendations' ? '3px solid var(--accent-indigo)' : '3px solid transparent',
              color: activeTab === 'recommendations' ? '#fff' : 'var(--text-muted)',
              fontWeight: activeTab === 'recommendations' ? '700' : '500',
              padding: '10px 16px',
              cursor: 'pointer',
              fontSize: '0.95rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              whiteSpace: 'nowrap'
            }}
          >
            <Sparkles size={18} color="var(--accent-gold)" />
            <span>AI Recommendations</span>
          </button>
        </div>

        {/* ================= TAB 1: CURRENTLY READING FOCUS CARD ================= */}
        {activeTab === 'active' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
            
            {/* Main Currently Reading Focus Hero */}
            <div 
              className="glass-panel"
              style={{
                gridColumn: 'span 2 / span 2',
                borderRadius: 'var(--radius-lg)',
                padding: '28px',
                border: '1px solid rgba(99, 102, 241, 0.4)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Background Glow */}
              <div style={{
                position: 'absolute',
                top: '-40%',
                right: '-20%',
                width: '300px',
                height: '300px',
                background: 'radial-gradient(circle, rgba(99, 102, 241, 0.25) 0%, transparent 70%)',
                pointerEvents: 'none'
              }} />

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <span className="badge badge-gold">Active Book Focus</span>
                <span style={{ fontSize: '0.82rem', color: 'var(--accent-cyan)', fontWeight: '600' }}>
                  Target Completion: {activeBook.estimatedCompletion || 'September 24'}
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', alignItems: 'center' }}>
                
                {/* Book Cover */}
                <div style={{ textAlign: 'center' }}>
                  <img 
                    src={activeBook.cover} 
                    alt={activeBook.title}
                    style={{
                      width: '160px',
                      height: '240px',
                      objectFit: 'cover',
                      borderRadius: 'var(--radius-md)',
                      boxShadow: '0 15px 30px rgba(0, 0, 0, 0.6)',
                      margin: '0 auto'
                    }}
                  />
                </div>

                {/* Book Progress Metrics */}
                <div>
                  <span style={{ fontSize: '0.85rem', color: 'var(--accent-indigo)', fontWeight: '600', textTransform: 'uppercase' }}>
                    {activeBook.genre || 'Self Improvement'}
                  </span>
                  
                  <h2 className="heading-serif" style={{ fontSize: '2rem', fontWeight: '700', color: '#fff', margin: '4px 0' }}>
                    {activeBook.title}
                  </h2>
                  
                  <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: '18px' }}>
                    by {activeBook.author}
                  </p>

                  {/* 43% Progress Bar */}
                  <div style={{ marginBottom: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
                      <span style={{ fontSize: '1.4rem', fontWeight: '700', color: '#fff' }}>
                        {percent}% Complete
                      </span>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                        {activeBook.pagesRead || 138} of {activeBook.pages || 320} pages
                      </span>
                    </div>

                    <div style={{
                      width: '100%',
                      height: '12px',
                      background: 'rgba(255,255,255,0.08)',
                      borderRadius: '999px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        width: `${percent}%`,
                        height: '100%',
                        background: 'linear-gradient(90deg, var(--accent-indigo), var(--accent-cyan))',
                        borderRadius: '999px',
                        transition: 'width 0.4s ease'
                      }} />
                    </div>
                  </div>

                  {/* 8 Features Breakdown List */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '12px',
                    marginBottom: '20px',
                    background: 'rgba(255,255,255,0.03)',
                    padding: '14px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid rgba(255,255,255,0.06)'
                  }}>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Target size={14} color="var(--accent-gold)" /> Today's Target
                      </div>
                      <div style={{ fontSize: '1.1rem', fontWeight: '700', color: '#fff' }}>
                        {activeBook.todayTarget !== undefined ? activeBook.todayTarget : 18} pages remaining
                      </div>
                    </div>

                    <div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Flame size={14} color="var(--accent-rose)" /> Current Streak
                      </div>
                      <div style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--accent-gold)' }}>
                        {activeBook.streakDays || 7} Days 🔥
                      </div>
                    </div>

                    <div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Calendar size={14} color="var(--accent-cyan)" /> Estimated Completion
                      </div>
                      <div style={{ fontSize: '1rem', fontWeight: '600', color: '#fff' }}>
                        {activeBook.estimatedCompletion || 'September 24'}
                      </div>
                    </div>

                    <div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Clock size={14} color="var(--accent-indigo)" /> Reading Time (This Week)
                      </div>
                      <div style={{ fontSize: '1rem', fontWeight: '600', color: '#fff' }}>
                        {activeBook.weeklyTime || '3h 42m'}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    <button
                      onClick={() => setIsLogModalOpen(true)}
                      className="btn btn-primary"
                      style={{ flex: 1, gap: '8px' }}
                    >
                      <Plus size={18} /> Log Pages Read
                    </button>

                    <button
                      onClick={() => setIsReviewModalOpen(true)}
                      className="btn btn-secondary"
                      style={{ gap: '8px' }}
                    >
                      <MessageSquare size={18} /> Write Review
                    </button>
                  </div>

                </div>

              </div>
            </div>

            {/* Right Column: Weekly Pace & Streak Widget */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* Daily Target Progress Card */}
              <div className="glass-panel" style={{ padding: '20px', borderRadius: 'var(--radius-lg)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Target size={18} color="var(--accent-gold)" /> Daily Reading Target
                  </h3>
                  <span className="badge badge-gold">Active</span>
                </div>

                <div style={{ textAlign: 'center', padding: '16px 0' }}>
                  <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#fff', lineHeight: '1' }}>
                    {activeBook.todayTarget !== undefined ? activeBook.todayTarget : 18}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    Pages remaining today to keep your streak!
                  </div>
                </div>

                <button
                  onClick={() => {
                    onUpdateProgress({
                      ...activeBook,
                      pagesRead: Math.min(activeBook.pages, (activeBook.pagesRead || 138) + 18),
                      todayTarget: 0,
                      progressPercent: Math.min(100, Math.round((((activeBook.pagesRead || 138) + 18) / activeBook.pages) * 100))
                    });
                  }}
                  className="btn btn-secondary btn-sm"
                  style={{ width: '100%', gap: '6px' }}
                >
                  <CheckCircle2 size={16} color="var(--accent-emerald)" /> Complete Today's Target (+18 pages)
                </button>
              </div>

              {/* Weekly Time Summary */}
              <div className="glass-panel" style={{ padding: '20px', borderRadius: 'var(--radius-lg)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Clock size={18} color="var(--accent-cyan)" /> Weekly Reading Time
                  </h3>
                  <span style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--accent-cyan)' }}>
                    {activeBook.weeklyTime || '3h 42m'}
                  </span>
                </div>

                {/* Simplified Mini Bar Chart */}
                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '90px', paddingTop: '10px' }}>
                  {[
                    { day: 'Mon', mins: 35, h: 50 },
                    { day: 'Tue', mins: 42, h: 65 },
                    { day: 'Wed', mins: 28, h: 40 },
                    { day: 'Thu', mins: 50, h: 80 },
                    { day: 'Fri', mins: 45, h: 70 },
                    { day: 'Sat', mins: 22, h: 30 },
                    { day: 'Sun', mins: 0, h: 10 }
                  ].map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                      <div style={{
                        width: '24px',
                        height: `${item.h}px`,
                        background: idx === 3 || idx === 4 ? 'var(--accent-indigo)' : 'rgba(255,255,255,0.15)',
                        borderRadius: '4px'
                      }} />
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{item.day}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ================= TAB 2: MY LIBRARY & SHELVES ================= */}
        {activeTab === 'library' && (
          <div>
            <h2 className="heading-serif" style={{ fontSize: '1.6rem', color: '#fff', marginBottom: '20px' }}>
              My Personal Library & Shelves
            </h2>

            {/* Want to read / Purchased Shelf */}
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Bookmark size={18} color="var(--accent-indigo)" /> Purchased & Saved to Read ({wantToRead ? wantToRead.length : 0})
              </h3>

              {wantToRead && wantToRead.length > 0 ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' }}>
                  {wantToRead.map(book => (
                    <div key={book.id} className="glass-panel" style={{ padding: '16px', borderRadius: 'var(--radius-md)', display: 'flex', gap: '14px', alignItems: 'center' }}>
                      <img src={book.cover} alt={book.title} style={{ width: '60px', height: '90px', objectFit: 'cover', borderRadius: '6px' }} />
                      <div style={{ flex: 1 }}>
                        <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#fff' }}>{book.title}</h4>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>{book.author}</div>
                        <button 
                          onClick={() => onSelectBookToRead(book)}
                          className="btn btn-primary btn-sm" 
                          style={{ width: '100%', fontSize: '0.75rem' }}
                        >
                          Start Reading
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="glass-panel" style={{ padding: '30px', textAlign: 'center', borderRadius: 'var(--radius-md)' }}>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>No pending books in your reading shelf.</p>
                  <button onClick={onNavigateToStore} className="btn btn-secondary btn-sm" style={{ marginTop: '10px' }}>
                    Browse Bookstore Catalog
                  </button>
                </div>
              )}
            </div>

            {/* Completed Books */}
            <div>
              <h3 style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={18} color="var(--accent-emerald)" /> Finished & Reviewed Books ({completedBooks ? completedBooks.length : 0})
              </h3>

              {completedBooks && completedBooks.length > 0 ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '20px' }}>
                  {completedBooks.map(book => (
                    <div key={book.id} className="glass-panel" style={{ padding: '16px', borderRadius: 'var(--radius-md)' }}>
                      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '10px' }}>
                        <img src={book.cover} alt={book.title} style={{ width: '50px', height: '75px', objectFit: 'cover', borderRadius: '4px' }} />
                        <div>
                          <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: '#fff' }}>{book.title}</h4>
                          <div style={{ fontSize: '0.8rem', color: 'var(--accent-emerald)' }}>Completed ✓</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="glass-panel" style={{ padding: '24px', textAlign: 'center', borderRadius: 'var(--radius-md)' }}>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Completed books will appear here once you hit 100% completion!</p>
                </div>
              )}
            </div>

          </div>
        )}

        {/* ================= TAB 3: ANALYTICS ================= */}
        {activeTab === 'stats' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
            <div className="glass-panel" style={{ padding: '24px', borderRadius: 'var(--radius-lg)' }}>
              <div style={{ color: 'var(--accent-gold)', marginBottom: '8px' }}><Flame size={28} /></div>
              <div style={{ fontSize: '2rem', fontWeight: '700', color: '#fff' }}>7 Days</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Active Streak</div>
            </div>

            <div className="glass-panel" style={{ padding: '24px', borderRadius: 'var(--radius-lg)' }}>
              <div style={{ color: 'var(--accent-cyan)', marginBottom: '8px' }}><Clock size={28} /></div>
              <div style={{ fontSize: '2rem', fontWeight: '700', color: '#fff' }}>3h 42m</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Reading Time (This Week)</div>
            </div>

            <div className="glass-panel" style={{ padding: '24px', borderRadius: 'var(--radius-lg)' }}>
              <div style={{ color: 'var(--accent-indigo)', marginBottom: '8px' }}><Target size={28} /></div>
              <div style={{ fontSize: '2rem', fontWeight: '700', color: '#fff' }}>138 / 320</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Pages Completed in Atomic Habits</div>
            </div>
          </div>
        )}

        {/* ================= TAB 4: AI RECOMMENDATIONS ================= */}
        {activeTab === 'recommendations' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
              <Sparkles size={22} color="var(--accent-gold)" />
              <h2 className="heading-serif" style={{ fontSize: '1.6rem', color: '#fff' }}>
                Recommended Next Reads (Based on your velocity)
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '20px' }}>
              {allBooks && allBooks.slice(0, 4).map(book => (
                <div key={book.id} className="glass-panel" style={{ padding: '16px', borderRadius: 'var(--radius-md)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <img src={book.cover} alt={book.title} style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '8px', marginBottom: '12px' }} />
                    <span className="badge badge-indigo" style={{ marginBottom: '6px' }}>{book.genre}</span>
                    <h4 style={{ fontSize: '1rem', fontWeight: '700', color: '#fff' }}>{book.title}</h4>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '12px' }}>{book.author}</p>
                  </div>
                  <button onClick={() => onSelectBookToRead(book)} className="btn btn-secondary btn-sm" style={{ width: '100%' }}>
                    Add to Reading Shelf
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* LOG PAGES READ MODAL */}
        {isLogModalOpen && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
            <div onClick={() => setIsLogModalOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)' }} />
            <div className="glass-modal animate-fade-in" style={{ position: 'relative', zIndex: 81, width: '100%', maxWidth: '400px', padding: '24px', borderRadius: 'var(--radius-lg)' }}>
              <h3 className="heading-serif" style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '14px' }}>
                Log Pages Read
              </h3>
              <form onSubmit={handleLogPages}>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                    How many pages did you read today?
                  </label>
                  <input
                    type="number"
                    min="1"
                    max={activeBook.pages - activeBook.pagesRead}
                    value={pagesInput}
                    onChange={(e) => setPagesInput(e.target.value)}
                    className="input-field"
                    style={{ fontSize: '1.2rem', fontWeight: '700' }}
                  />
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '12px' }}>
                  Update Progress
                </button>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
