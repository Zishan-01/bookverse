import React, { useState } from 'react';
import { X, Star, ShoppingBag, Heart, ExternalLink, BookOpen, Check, ShieldCheck, Tag, Repeat, MapPin, Dna } from 'lucide-react';
import BookDNAVisual from './BookDNAVisual';

export default function BookDetailModal({
  book,
  onClose,
  onAddToCart,
  onDirectCheckout,
  onToggleWishlist,
  isWishlisted,
  onRequestSwap
}) {
  const [purchaseMode, setPurchaseMode] = useState('new'); // 'new' | 'used' | 'exchange'
  const [activeTab, setActiveTab] = useState('dna'); // 'dna' | 'overview' | 'excerpt'

  if (!book) return null;

  const usedCopies = book.usedOptions || [
    { id: 'u-def1', sellerName: 'Rohan Sharma', price: 180, currency: '₹', condition: 'Good', location: 'Mumbai' },
    { id: 'u-def2', sellerName: 'Ananya Roy', price: 210, currency: '₹', condition: 'Like New', location: 'Delhi' }
  ];

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
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

      {/* Modal Card */}
      <div 
        className="glass-modal animate-fade-in"
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '850px',
          maxHeight: '90vh',
          overflowY: 'auto',
          borderRadius: 'var(--radius-lg)',
          zIndex: 61,
          padding: '28px'
        }}
      >
        {/* Close button */}
        <button 
          onClick={onClose}
          className="btn btn-secondary btn-icon"
          style={{ position: 'absolute', top: '18px', right: '18px', width: '38px', height: '38px' }}
        >
          <X size={20} />
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '28px' }}>
          
          {/* Left Column: Cover & Quick Actions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
            <div style={{
              position: 'relative',
              width: '210px',
              height: '310px',
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              boxShadow: '0 15px 30px rgba(0,0,0,0.6)'
            }}>
              <img src={book.cover} alt={book.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              {book.bestseller && (
                <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
                  <span className="badge badge-gold">Bestseller</span>
                </div>
              )}
            </div>

            {/* Wishlist & Formats */}
            <div style={{ width: '100%', textAlign: 'center' }}>
              <button
                onClick={() => onToggleWishlist(book.id)}
                className="btn btn-secondary"
                style={{ width: '100%', gap: '8px', marginBottom: '12px' }}
              >
                <Heart size={18} color={isWishlisted ? 'var(--accent-rose)' : '#fff'} fill={isWishlisted ? 'var(--accent-rose)' : 'none'} />
                <span>{isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}</span>
              </button>

              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Available Formats:</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'center' }}>
                {book.format.map(f => (
                  <span key={f} style={{ background: 'rgba(255,255,255,0.06)', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Tri-Option Marketplace Selector & Info */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <span className="badge badge-indigo">{book.genre}</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Published {book.year}</span>
              </div>

              <h2 className="heading-serif" style={{ fontSize: '1.8rem', fontWeight: '700', color: '#fff', lineHeight: '1.2' }}>
                {book.title}
              </h2>
              <p style={{ fontSize: '1rem', color: 'var(--accent-cyan)', marginBottom: '12px' }}>
                by {book.author}
              </p>

              {/* Rating & Specs */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--accent-gold)' }}>
                  <Star size={18} fill="var(--accent-gold)" />
                  <span style={{ fontWeight: '700', fontSize: '1.05rem' }}>{book.rating}</span>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>({book.reviewsCount} reviews)</span>
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  • {book.pages} pages • {book.language}
                </div>
              </div>

              {/* TRI-OPTION SELECTOR (Buy New | Buy Used | Exchange) */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '8px',
                background: 'rgba(255,255,255,0.05)',
                padding: '4px',
                borderRadius: 'var(--radius-md)',
                marginBottom: '20px',
                border: '1px solid var(--border-color)'
              }}>
                <button
                  onClick={() => setPurchaseMode('new')}
                  style={{
                    padding: '8px',
                    borderRadius: 'var(--radius-sm)',
                    background: purchaseMode === 'new' ? 'var(--accent-indigo)' : 'transparent',
                    color: '#fff',
                    border: 'none',
                    fontWeight: '600',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    textAlign: 'center'
                  }}
                >
                  Buy New (₹{book.price})
                </button>

                <button
                  onClick={() => setPurchaseMode('used')}
                  style={{
                    padding: '8px',
                    borderRadius: 'var(--radius-sm)',
                    background: purchaseMode === 'used' ? 'var(--accent-emerald)' : 'transparent',
                    color: '#fff',
                    border: 'none',
                    fontWeight: '600',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    textAlign: 'center'
                  }}
                >
                  Buy Used (₹180)
                </button>

                <button
                  onClick={() => setPurchaseMode('exchange')}
                  style={{
                    padding: '8px',
                    borderRadius: 'var(--radius-sm)',
                    background: purchaseMode === 'exchange' ? 'var(--accent-gold)' : 'transparent',
                    color: '#fff',
                    border: 'none',
                    fontWeight: '600',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    textAlign: 'center'
                  }}
                >
                  Exchange / Swap
                </button>
              </div>

              {/* MODE SPECIFIC DETAILS */}
              {purchaseMode === 'new' && (
                <div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '14px' }}>
                    <span style={{ fontSize: '1.8rem', fontWeight: '700', color: '#fff' }}>
                      ₹{book.price}
                    </span>
                    {book.originalPrice && (
                      <span style={{ fontSize: '1.1rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                        ₹{book.originalPrice}
                      </span>
                    )}
                    <span style={{ fontSize: '0.8rem', color: 'var(--accent-emerald)', background: 'rgba(16, 185, 129, 0.15)', padding: '2px 8px', borderRadius: '999px' }}>
                      Brand New • Mint Condition
                    </span>
                  </div>
                </div>
              )}

              {purchaseMode === 'used' && (
                <div style={{ background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: 'var(--radius-md)', padding: '14px', marginBottom: '16px' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--accent-emerald)', marginBottom: '8px' }}>
                    Available Pre-Owned Copies ({usedCopies.length})
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {usedCopies.map(uc => (
                      <div key={uc.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(0,0,0,0.3)', padding: '8px 12px', borderRadius: 'var(--radius-sm)' }}>
                        <div>
                          <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#fff' }}>
                            {uc.currency}{uc.price} <span className="badge badge-indigo" style={{ fontSize: '0.65rem', marginLeft: '6px' }}>Condition: {uc.condition}</span>
                          </div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            Seller: {uc.sellerName} • <MapPin size={10} /> {uc.location}
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            onClose();
                            onDirectCheckout({
                              ...book,
                              price: uc.price,
                              title: `${book.title} (Used - ${uc.condition})`
                            });
                          }}
                          className="btn btn-primary btn-sm"
                          style={{ background: 'var(--accent-emerald)', padding: '4px 10px', fontSize: '0.75rem' }}
                        >
                          Buy Copy ({uc.currency}{uc.price})
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {purchaseMode === 'exchange' && (
                <div style={{ background: 'rgba(251, 191, 36, 0.08)', border: '1px solid rgba(251, 191, 36, 0.3)', borderRadius: 'var(--radius-md)', padding: '14px', marginBottom: '16px' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--accent-gold)', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Repeat size={16} /> BookVerse Reader Trade Network
                  </div>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '10px' }}>
                    Trade a book from your library for a copy of <strong>{book.title}</strong> with readers in Mumbai, Delhi, or Bangalore!
                  </p>
                  
                  <button
                    onClick={() => {
                      onClose();
                      onRequestSwap({ title: book.title, sellerName: 'Verified Reader', location: 'Mumbai' });
                    }}
                    className="btn btn-primary btn-sm"
                    style={{ background: 'linear-gradient(135deg, #f59e0b, #6366f1)', width: '100%' }}
                  >
                    Initiate Peer-to-Peer Swap Request
                  </button>
                </div>
              )}

              {/* Tab Bar: Book DNA 🧬 | Synopsis | Excerpt */}
              <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.1)', marginBottom: '14px', gap: '16px' }}>
                <button
                  onClick={() => setActiveTab('dna')}
                  style={{
                    background: 'none',
                    border: 'none',
                    borderBottom: activeTab === 'dna' ? '2px solid var(--accent-gold)' : '2px solid transparent',
                    color: activeTab === 'dna' ? '#fff' : 'var(--text-muted)',
                    fontWeight: activeTab === 'dna' ? '700' : '400',
                    padding: '6px 4px',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <Dna size={16} color={activeTab === 'dna' ? 'var(--accent-gold)' : 'var(--text-muted)'} />
                  <span>Book DNA 🧬</span>
                </button>

                <button
                  onClick={() => setActiveTab('overview')}
                  style={{
                    background: 'none',
                    border: 'none',
                    borderBottom: activeTab === 'overview' ? '2px solid var(--accent-indigo)' : '2px solid transparent',
                    color: activeTab === 'overview' ? '#fff' : 'var(--text-muted)',
                    fontWeight: activeTab === 'overview' ? '600' : '400',
                    padding: '6px 4px',
                    cursor: 'pointer',
                    fontSize: '0.9rem'
                  }}
                >
                  Synopsis
                </button>

                <button
                  onClick={() => setActiveTab('excerpt')}
                  style={{
                    background: 'none',
                    border: 'none',
                    borderBottom: activeTab === 'excerpt' ? '2px solid var(--accent-indigo)' : '2px solid transparent',
                    color: activeTab === 'excerpt' ? '#fff' : 'var(--text-muted)',
                    fontWeight: activeTab === 'excerpt' ? '600' : '400',
                    padding: '6px 4px',
                    cursor: 'pointer',
                    fontSize: '0.9rem'
                  }}
                >
                  Excerpt
                </button>
              </div>

              {activeTab === 'dna' && (
                <BookDNAVisual book={book} compact={true} />
              )}

              {activeTab === 'overview' && (
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: '0.9rem' }}>
                  {book.description}
                </p>
              )}

              {activeTab === 'excerpt' && (
                <div style={{ background: 'rgba(255,255,255,0.03)', borderLeft: '3px solid var(--accent-gold)', padding: '12px', borderRadius: 'var(--radius-sm)', color: 'var(--text-secondary)', fontStyle: 'italic', fontSize: '0.88rem' }}>
                  "{book.excerpt}"
                </div>
              )}

            </div>

            {/* Bottom Purchase Options */}
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '16px', marginTop: '16px', display: 'flex', gap: '12px' }}>
              <button
                onClick={() => onAddToCart(book)}
                className="btn btn-secondary"
                style={{ flex: 1, gap: '8px' }}
              >
                <ShoppingBag size={18} /> Add to Cart
              </button>

              <button
                onClick={() => {
                  onClose();
                  onDirectCheckout(book);
                }}
                className="btn btn-primary"
                style={{ flex: 1, gap: '8px' }}
              >
                Buy Now (₹{book.price})
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
