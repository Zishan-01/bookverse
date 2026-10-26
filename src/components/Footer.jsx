import React from 'react';
import { BookOpen, ShieldCheck, Truck, RefreshCw, Heart } from 'lucide-react';
import { GENRES } from '../data/booksData';

export default function Footer({ onSelectGenre }) {
  return (
    <footer style={{ background: '#05070a', borderTop: '1px solid rgba(255,255,255,0.08)', padding: '60px 0 30px' }}>
      <div className="container">
        
        {/* Top Assurance Banner */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '20px',
          paddingBottom: '40px',
          marginBottom: '40px',
          borderBottom: '1px solid rgba(255,255,255,0.06)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Truck size={28} color="var(--accent-indigo)" />
            <div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: '600', color: '#fff' }}>Fast Delivery Across India</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Free shipping on orders over ₹499</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <ShieldCheck size={28} color="var(--accent-emerald)" />
            <div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: '600', color: '#fff' }}>100% Authentic Editions</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Directly from verified publishers</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <RefreshCw size={28} color="var(--accent-gold)" />
            <div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: '600', color: '#fff' }}>30-Day Easy Returns</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Hassle-free replacement policy</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '32px',
          marginBottom: '40px'
        }}>
          {/* Brand Col */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <BookOpen size={18} color="#fff" />
              </div>
              <span className="heading-serif" style={{ fontSize: '1.3rem', fontWeight: '700', color: '#fff' }}>
                BookVerse
              </span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              Your ultimate Reading OS, peer-to-peer Used Book Exchange (₹180), and online bookstore destination.
            </p>
          </div>

          {/* Genres Col */}
          <div>
            <h4 style={{ fontSize: '0.9rem', color: '#fff', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '14px' }}>
              Genres
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem' }}>
              {GENRES.filter(g => g !== 'All').map(g => (
                <button
                  key={g}
                  onClick={() => {
                    onSelectGenre(g);
                    const el = document.getElementById('explore');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', textAlign: 'left', padding: 0 }}
                >
                  {g} Books
                </button>
              ))}
            </div>
          </div>

          {/* Purchasing Links Col */}
          <div>
            <h4 style={{ fontSize: '0.9rem', color: '#fff', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '14px' }}>
              Purchasing Partners
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              <li>Direct Instant Checkout (₹ INR)</li>
              <li>Amazon India Integration</li>
              <li>Barnes & Noble Partner</li>
              <li>Bookshop.org Affiliate</li>
              <li>Apple Books Digital</li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          paddingTop: '24px',
          textAlign: 'center',
          fontSize: '0.8rem',
          color: 'var(--text-muted)'
        }}>
          © {new Date().getFullYear()} BookVerse. All rights reserved. Prices displayed in INR (₹).
        </div>

      </div>
    </footer>
  );
}
