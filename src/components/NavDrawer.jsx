import React from 'react';
import { X, BookOpen, Layers, ShoppingBag, Heart, LogOut, UserCheck, ShieldCheck, Flame, Sparkles, Target, Repeat, MapPin } from 'lucide-react';
import { GENRES } from '../data/booksData';

export default function NavDrawer({
  isOpen,
  onClose,
  selectedGenre,
  onSelectGenre,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenAuth,
  user,
  onLogout,
  onSwitchView,
  currentView,
  currentlyReading
}) {
  if (!isOpen) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        display: 'flex'
      }}
    >
      {/* Backdrop */}
      <div 
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(4px)',
          animation: 'fadeIn 0.2s ease-out'
        }}
      />

      {/* Slide-out Drawer Panel */}
      <div 
        className="glass-modal animate-slide-right"
        style={{
          position: 'relative',
          width: '320px',
          maxWidth: '85vw',
          height: '100%',
          zIndex: 51,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '24px',
          borderRight: '1px solid rgba(255,255,255,0.15)',
          overflowY: 'auto'
        }}
      >
        <div>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '34px',
                height: '34px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <BookOpen size={20} color="#fff" />
              </div>
              <span className="heading-serif" style={{ fontSize: '1.25rem', fontWeight: '700', color: '#fff' }}>
                BookVerse Nav
              </span>
            </div>

            <button 
              onClick={onClose}
              className="btn btn-secondary btn-icon"
              style={{ width: '36px', height: '36px' }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Mood Finder CTA */}
          <div 
            onClick={() => {
              onSwitchView('mood');
              onClose();
            }}
            style={{
              background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.2), rgba(139, 92, 246, 0.2))',
              border: '1px solid var(--accent-rose)',
              borderRadius: 'var(--radius-md)',
              padding: '12px 14px',
              marginBottom: '12px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '1.2rem' }}>🎭</span>
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#fff' }}>Mood-Based Discovery</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--accent-rose)' }}>Mood + Time + Difficulty</div>
              </div>
            </div>
            <span className="badge badge-indigo" style={{ fontSize: '0.65rem' }}>Vibe 🎭</span>
          </div>

          {/* BookVerse AI Concierge CTA */}
          <div 
            onClick={() => {
              onSwitchView('ai');
              onClose();
            }}
            style={{
              background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(99, 102, 241, 0.2))',
              border: '1px solid var(--accent-gold)',
              borderRadius: 'var(--radius-md)',
              padding: '12px 14px',
              marginBottom: '12px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Sparkles size={20} color="var(--accent-gold)" />
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#fff' }}>BookVerse AI Concierge</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--accent-gold)' }}>AI Prompt Recommendations</div>
              </div>
            </div>
            <span className="badge badge-gold" style={{ fontSize: '0.65rem' }}>AI ✨</span>
          </div>

          {/* Used Marketplace Quick CTA */}
          <div 
            onClick={() => {
              onSwitchView('exchange');
              onClose();
            }}
            style={{
              background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.2), rgba(16, 185, 129, 0.2))',
              border: '1px solid var(--accent-cyan)',
              borderRadius: 'var(--radius-md)',
              padding: '12px 14px',
              marginBottom: '12px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Repeat size={20} color="var(--accent-cyan)" />
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#fff' }}>BookVerse Exchange</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)' }}>Buy Used (₹180) & Swap</div>
              </div>
            </div>
            <span className="badge badge-cyan" style={{ fontSize: '0.65rem' }}>Marketplace</span>
          </div>

          {/* Reading OS Quick Widget */}
          <div 
            onClick={() => {
              onSwitchView('readingOS');
              onClose();
            }}
            style={{
              background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(99, 102, 241, 0.15))',
              border: '1px solid var(--accent-gold)',
              borderRadius: 'var(--radius-md)',
              padding: '12px 14px',
              marginBottom: '20px',
              cursor: 'pointer'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--accent-gold)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Flame size={14} /> My Reading OS
              </span>
              <span className="badge badge-gold" style={{ fontSize: '0.65rem' }}>Active Focus</span>
            </div>

            <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#fff' }}>
              {currentlyReading ? currentlyReading.title : 'Atomic Habits'}
            </div>
          </div>

          {/* User Status Bar */}
          {user ? (
            <div style={{
              background: 'rgba(99, 102, 241, 0.12)',
              border: '1px solid rgba(99, 102, 241, 0.25)',
              borderRadius: 'var(--radius-md)',
              padding: '10px 12px',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #10b981, #06b6d4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '700',
                  color: '#fff',
                  fontSize: '0.8rem'
                }}>
                  {user.name ? user.name[0] : 'U'}
                </div>
                <div>
                  <div style={{ fontWeight: '600', fontSize: '0.85rem', color: '#fff' }}>{user.name}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--accent-emerald)' }}>Member Active</div>
                </div>
              </div>
            </div>
          ) : (
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px dashed var(--border-color)',
              borderRadius: 'var(--radius-md)',
              padding: '12px',
              marginBottom: '20px',
              textAlign: 'center'
            }}>
              <button 
                onClick={() => { onClose(); onOpenAuth('login'); }}
                className="btn btn-primary btn-sm" 
                style={{ width: '100%' }}
              >
                Sign In / Register
              </button>
            </div>
          )}

          {/* Genre Directory */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{
              fontSize: '0.75rem',
              fontWeight: '700',
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              marginBottom: '10px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <Layers size={14} /> Store Categories
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {GENRES.map((genre) => {
                const isActive = selectedGenre === genre;
                return (
                  <button
                    key={genre}
                    onClick={() => {
                      onSelectGenre(genre);
                      onSwitchView('store');
                      onClose();
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '8px 12px',
                      borderRadius: 'var(--radius-sm)',
                      background: isActive ? 'linear-gradient(90deg, rgba(99, 102, 241, 0.25), transparent)' : 'transparent',
                      borderLeft: isActive ? '3px solid var(--accent-indigo)' : '3px solid transparent',
                      color: isActive ? '#fff' : 'var(--text-secondary)',
                      fontWeight: isActive ? '600' : '400',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    <span>{genre}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Action Links */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '14px' }}>
            <button
              onClick={() => { onClose(); onOpenCart(); }}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '8px 12px',
                borderRadius: 'var(--radius-sm)',
                background: 'transparent',
                border: 'none',
                color: 'var(--text-primary)',
                cursor: 'pointer'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <ShoppingBag size={18} color="var(--accent-indigo)" />
                <span>My Cart</span>
              </div>
              <span className="badge badge-indigo">{cartCount}</span>
            </button>
          </div>
        </div>

        {/* Footer & Logout Option */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '14px' }}>
          {user ? (
            <button
              onClick={() => {
                onLogout();
                onClose();
              }}
              className="btn btn-outline"
              style={{
                width: '100%',
                justifyContent: 'center',
                borderColor: 'rgba(244, 63, 94, 0.4)',
                color: 'var(--accent-rose)',
                background: 'rgba(244, 63, 94, 0.08)'
              }}
            >
              <LogOut size={16} />
              <span>Logout ({user.name.split(' ')[0]})</span>
            </button>
          ) : (
            <div style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              BookVerse Marketplace v4.0
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
