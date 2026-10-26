import React from 'react';
import { Star, ShoppingBag, Eye, Heart, ExternalLink } from 'lucide-react';

export default function BookCard({
  book,
  onAddToCart,
  onQuickView,
  onToggleWishlist,
  isWishlisted
}) {
  return (
    <div 
      className="glass-panel"
      style={{
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-6px)';
        e.currentTarget.style.borderColor = 'var(--border-highlight)';
        e.currentTarget.style.boxShadow = '0 12px 25px rgba(99, 102, 241, 0.2)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.borderColor = 'var(--border-color)';
        e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
      }}
    >
      <div>
        {/* Cover image container */}
        <div style={{ position: 'relative', height: '260px', overflow: 'hidden', background: '#111726' }}>
          <img 
            src={book.cover} 
            alt={book.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.5s ease'
            }}
          />

          {/* Badges */}
          <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {book.bestseller && (
              <span className="badge badge-gold">Bestseller</span>
            )}
            <span className="badge badge-indigo">{book.genre}</span>
          </div>

          {/* Wishlist Button Overlay */}
          <button
            onClick={() => onToggleWishlist(book.id)}
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'rgba(15, 23, 42, 0.75)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            title={isWishlisted ? "Remove from Wishlist" : "Save to Wishlist"}
          >
            <Heart 
              size={18} 
              color={isWishlisted ? 'var(--accent-rose)' : '#fff'} 
              fill={isWishlisted ? 'var(--accent-rose)' : 'none'} 
            />
          </button>

          {/* Quick View Button overlay */}
          <div style={{
            position: 'absolute',
            bottom: '12px',
            left: '12px',
            right: '12px'
          }}>
            <button
              onClick={() => onQuickView(book.id)}
              className="btn btn-secondary btn-sm"
              style={{
                width: '100%',
                background: 'rgba(15, 23, 42, 0.85)',
                backdropFilter: 'blur(8px)',
                borderColor: 'rgba(255,255,255,0.2)',
                color: '#fff'
              }}
            >
              <Eye size={14} /> Quick View
            </button>
          </div>
        </div>

        {/* Info Content */}
        <div style={{ padding: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              {book.year} • {book.pages} pages
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.82rem', color: 'var(--accent-gold)' }}>
              <Star size={14} fill="var(--accent-gold)" />
              <span style={{ fontWeight: '700' }}>{book.rating}</span>
            </div>
          </div>

          <h3 
            className="heading-serif" 
            style={{
              fontSize: '1.1rem',
              fontWeight: '700',
              color: '#fff',
              marginBottom: '4px',
              display: '-webkit-box',
              WebkitLineClamp: 1,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
            title={book.title}
          >
            {book.title}
          </h3>

          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
            {book.author}
          </p>
        </div>
      </div>

      {/* Footer Pricing & Action */}
      <div style={{ padding: '0 16px 16px 16px', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <div>
            <span style={{ fontSize: '1.15rem', fontWeight: '700', color: '#fff' }}>
              ₹{book.price}
            </span>
            {book.originalPrice && (
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textDecoration: 'line-through', marginLeft: '6px' }}>
                ₹{book.originalPrice}
              </span>
            )}
          </div>

          <a
            href={book.externalLinks.amazon}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: '0.75rem',
              color: 'var(--accent-cyan)',
              display: 'flex',
              alignItems: 'center',
              gap: '3px',
              textDecoration: 'none'
            }}
            title="External Buy Link (Amazon)"
          >
            <ExternalLink size={12} /> Retailer
          </a>
        </div>

        <button
          onClick={() => onAddToCart(book)}
          className="btn btn-primary btn-sm"
          style={{ width: '100%', gap: '6px' }}
        >
          <ShoppingBag size={16} /> Add to Cart
        </button>
      </div>
    </div>
  );
}
