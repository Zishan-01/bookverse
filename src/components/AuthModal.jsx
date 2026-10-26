import React, { useState } from 'react';
import { X, User, LogOut, Heart, ShoppingBag, ShieldCheck, Mail, Lock, KeyRound, Sparkles, CheckCircle2 } from 'lucide-react';
import BookCard from './BookCard';

export default function AuthModal({
  isOpen,
  onClose,
  initialView, // 'login' | 'profile' | 'wishlist'
  user,
  onLogin,
  onLogout,
  wishlistBooks,
  onAddToCart,
  onQuickView,
  onToggleWishlist
}) {
  const [view, setView] = useState(initialView || 'login');
  const [emailInput, setEmailInput] = useState('alex.rivers@example.com');
  const [passwordInput, setPasswordInput] = useState('••••••••');
  const [nameInput, setNameInput] = useState('Alex Rivers');

  if (!isOpen) return null;

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    onLogin({
      name: nameInput || 'Alex Rivers',
      email: emailInput,
      tier: 'Gold Member'
    });
    setView('profile');
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 70, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
      {/* Backdrop */}
      <div 
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(8px)',
          animation: 'fadeIn 0.2s ease-out'
        }}
      />

      {/* Modal */}
      <div 
        className="glass-modal animate-fade-in"
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: view === 'wishlist' ? '900px' : '480px',
          maxHeight: '85vh',
          overflowY: 'auto',
          borderRadius: 'var(--radius-lg)',
          zIndex: 71,
          padding: '28px'
        }}
      >
        <button 
          onClick={onClose}
          className="btn btn-secondary btn-icon"
          style={{ position: 'absolute', top: '18px', right: '18px', width: '36px', height: '36px' }}
        >
          <X size={20} />
        </button>

        {/* View Switcher Bar for Logged In User */}
        {user && (
          <div style={{ display: 'flex', gap: '10px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '14px', marginBottom: '20px' }}>
            <button
              onClick={() => setView('profile')}
              className={view === 'profile' ? "btn btn-primary btn-sm" : "btn btn-secondary btn-sm"}
            >
              <User size={14} /> My Profile
            </button>
            <button
              onClick={() => setView('wishlist')}
              className={view === 'wishlist' ? "btn btn-primary btn-sm" : "btn btn-secondary btn-sm"}
            >
              <Heart size={14} /> Saved Wishlist ({wishlistBooks.length})
            </button>
          </div>
        )}

        {/* ================ LOGIN / REGISTER VIEW ================ */}
        {!user && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 12px'
              }}>
                <User size={24} color="#fff" />
              </div>
              <h2 className="heading-serif" style={{ fontSize: '1.6rem', color: '#fff' }}>
                Welcome to BookVerse
              </h2>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                Sign in to manage your library, wishlist, and track orders
              </p>
            </div>

            <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Full Name</label>
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="input-field"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Email Address</label>
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="input-field"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Password</label>
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="input-field"
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ padding: '12px', marginTop: '6px' }}>
                Sign In / Create Account
              </button>
            </form>
          </div>
        )}

        {/* ================ USER PROFILE VIEW ================ */}
        {user && view === 'profile' && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <div style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #10b981, #06b6d4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 12px',
                fontSize: '1.8rem',
                fontWeight: '700',
                color: '#fff',
                boxShadow: '0 8px 20px rgba(16, 185, 129, 0.3)'
              }}>
                {user.name[0]}
              </div>

              <h2 className="heading-serif" style={{ fontSize: '1.5rem', color: '#fff' }}>
                {user.name}
              </h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{user.email}</p>
              <span className="badge badge-gold" style={{ marginTop: '8px' }}>
                <Sparkles size={12} /> {user.tier || 'Gold Member'}
              </span>
            </div>

            {/* Stats Overview */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '12px',
              marginBottom: '24px'
            }}>
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 'var(--radius-md)', padding: '14px', textAlign: 'center' }}>
                <div style={{ fontSize: '1.4rem', fontWeight: '700', color: 'var(--accent-indigo)' }}>{wishlistBooks.length}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Saved Wishlist Books</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 'var(--radius-md)', padding: '14px', textAlign: 'center' }}>
                <div style={{ fontSize: '1.4rem', fontWeight: '700', color: 'var(--accent-emerald)' }}>Active</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Membership Status</div>
              </div>
            </div>

            {/* Explicit Logout Option */}
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }}>
              <button
                onClick={() => {
                  onLogout();
                  setView('login');
                }}
                className="btn btn-outline"
                style={{
                  width: '100%',
                  padding: '12px',
                  borderColor: 'rgba(244, 63, 94, 0.4)',
                  color: 'var(--accent-rose)',
                  background: 'rgba(244, 63, 94, 0.08)',
                  gap: '8px'
                }}
              >
                <LogOut size={18} />
                <span>Log Out of Account</span>
              </button>
            </div>
          </div>
        )}

        {/* ================ WISHLIST VIEW ================ */}
        {user && view === 'wishlist' && (
          <div>
            <h3 className="heading-serif" style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '16px' }}>
              Your Saved Wishlist ({wishlistBooks.length})
            </h3>

            {wishlistBooks.length > 0 ? (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                gap: '16px'
              }}>
                {wishlistBooks.map((book) => (
                  <BookCard
                    key={book.id}
                    book={book}
                    onAddToCart={onAddToCart}
                    onQuickView={onQuickView}
                    onToggleWishlist={onToggleWishlist}
                    isWishlisted={true}
                  />
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
                <Heart size={40} style={{ margin: '0 auto 12px', opacity: 0.4 }} />
                <p>No books saved in your wishlist yet.</p>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
