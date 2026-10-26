import React from 'react';
import { Menu, Search, ShoppingBag, Heart, User, BookOpen, LogOut, Flame, Sparkles, Repeat } from 'lucide-react';

export default function Navbar({
  cartCount,
  wishlistCount,
  onOpenDrawer,
  onOpenCart,
  onOpenAuth,
  searchQuery,
  setSearchQuery,
  user,
  onLogout,
  currentView,
  onSwitchView,
  streakDays
}) {
  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-white/10 px-4 py-3">
      <div className="container flex items-center justify-between gap-4" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        
        {/* Left side: Hamburger Toggle & Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <button 
            onClick={onOpenDrawer}
            className="btn btn-secondary btn-icon"
            aria-label="Open Navigation Menu"
            title="Menu"
            style={{ width: '42px', height: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <Menu size={22} className="text-white" />
          </button>

          <a href="#home" onClick={() => onSwitchView('store')} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(99, 102, 241, 0.4)'
            }}>
              <BookOpen size={22} color="#ffffff" />
            </div>
            <div>
              <span className="heading-serif" style={{ fontSize: '1.4rem', fontWeight: '700', color: '#fff', letterSpacing: '-0.5px' }}>
                Book<span style={{ color: 'var(--accent-indigo)' }}>Verse</span>
              </span>
              <span style={{ display: 'block', fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                AI Reading OS & Store
              </span>
            </div>
          </a>
        </div>

        {/* Center: 5-Way View Switcher (Store | Mood Finder 🎭 | BookVerse AI ✨ | Reading OS | Used Exchange) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(255,255,255,0.05)', padding: '4px', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-color)', flexWrap: 'wrap' }}>
          <button
            onClick={() => onSwitchView('store')}
            style={{
              padding: '5px 12px',
              borderRadius: 'var(--radius-full)',
              background: currentView === 'store' ? 'var(--accent-indigo)' : 'transparent',
              color: '#fff',
              border: 'none',
              fontWeight: '600',
              fontSize: '0.82rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            Store Catalog
          </button>

          <button
            onClick={() => onSwitchView('mood')}
            style={{
              padding: '5px 12px',
              borderRadius: 'var(--radius-full)',
              background: currentView === 'mood' ? 'linear-gradient(135deg, #ec4899, #8b5cf6)' : 'transparent',
              color: '#fff',
              border: 'none',
              fontWeight: '700',
              fontSize: '0.82rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              transition: 'all 0.2s ease'
            }}
          >
            <span>Mood Finder 🎭</span>
          </button>

          <button
            onClick={() => onSwitchView('ai')}
            style={{
              padding: '5px 12px',
              borderRadius: 'var(--radius-full)',
              background: currentView === 'ai' ? 'linear-gradient(135deg, #f59e0b, #6366f1)' : 'transparent',
              color: '#fff',
              border: 'none',
              fontWeight: '700',
              fontSize: '0.82rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              transition: 'all 0.2s ease'
            }}
          >
            <Sparkles size={13} color="var(--accent-gold)" />
            <span>BookVerse AI ✨</span>
          </button>

          <button
            onClick={() => onSwitchView('readingOS')}
            style={{
              padding: '5px 12px',
              borderRadius: 'var(--radius-full)',
              background: currentView === 'readingOS' ? 'linear-gradient(135deg, #f59e0b, #06b6d4)' : 'transparent',
              color: '#fff',
              border: 'none',
              fontWeight: '600',
              fontSize: '0.82rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              transition: 'all 0.2s ease'
            }}
          >
            <span>Reading OS</span>
            <span style={{
              background: 'rgba(0,0,0,0.3)',
              padding: '1px 5px',
              borderRadius: '999px',
              fontSize: '0.7rem',
              fontWeight: '700',
              color: 'var(--accent-gold)'
            }}>
              🔥 {streakDays || 7}d
            </span>
          </button>

          <button
            onClick={() => onSwitchView('exchange')}
            style={{
              padding: '5px 12px',
              borderRadius: 'var(--radius-full)',
              background: currentView === 'exchange' ? 'linear-gradient(135deg, #06b6d4, #10b981)' : 'transparent',
              color: '#fff',
              border: 'none',
              fontWeight: '600',
              fontSize: '0.82rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              transition: 'all 0.2s ease'
            }}
          >
            <Repeat size={13} />
            <span>Used Exchange</span>
          </button>
        </div>

        {/* Right side: Wishlist, Cart, User Profile */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          
          {/* Wishlist Button */}
          <button 
            onClick={() => onOpenAuth('wishlist')}
            className="btn btn-secondary btn-icon"
            style={{ position: 'relative' }}
            title="Wishlist"
          >
            <Heart size={20} color={wishlistCount > 0 ? 'var(--accent-rose)' : '#94a3b8'} fill={wishlistCount > 0 ? 'var(--accent-rose)' : 'none'} />
            {wishlistCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                background: 'var(--accent-rose)',
                color: '#fff',
                borderRadius: '999px',
                width: '18px',
                height: '18px',
                fontSize: '0.7rem',
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart Button */}
          <button 
            onClick={onOpenCart}
            className="btn btn-primary"
            style={{ padding: '8px 16px', borderRadius: 'var(--radius-md)', gap: '8px' }}
            title="Cart"
          >
            <ShoppingBag size={18} />
            <span style={{
              background: 'rgba(255,255,255,0.25)',
              padding: '2px 8px',
              borderRadius: '999px',
              fontSize: '0.8rem',
              fontWeight: '700'
            }}>
              {cartCount}
            </span>
          </button>

          {/* User Account / Auth Toggle */}
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <button
                onClick={() => onOpenAuth('profile')}
                className="btn btn-secondary"
                style={{ padding: '6px 12px', gap: '8px', fontSize: '0.85rem' }}
                title="Account Settings"
              >
                <div style={{
                  width: '26px',
                  height: '26px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #10b981, #06b6d4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '700',
                  color: '#fff',
                  fontSize: '0.75rem'
                }}>
                  {user.name ? user.name[0] : 'U'}
                </div>
                <span style={{ maxWidth: '90px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {user.name.split(' ')[0]}
                </span>
              </button>

              <button
                onClick={onLogout}
                className="btn btn-secondary btn-icon"
                title="Logout"
                style={{ color: 'var(--accent-rose)', borderColor: 'rgba(244, 63, 94, 0.2)' }}
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => onOpenAuth('login')}
              className="btn btn-outline btn-sm"
              style={{ gap: '6px' }}
            >
              <User size={16} />
              <span>Login</span>
            </button>
          )}

        </div>

      </div>
    </header>
  );
}
