import React, { useState } from 'react';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, Tag, ShieldCheck, CheckCircle } from 'lucide-react';

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onProceedToCheckout
}) {
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const shipping = subtotal >= 499 || subtotal === 0 ? 0 : 50;
  const total = Math.max(0, subtotal - discountAmount + shipping);

  const applyPromo = (e) => {
    e.preventDefault();
    setPromoError('');
    setPromoSuccess('');

    if (promoCode.trim().toUpperCase() === 'WELCOME10' || promoCode.trim().toUpperCase() === 'BOOKVERSE') {
      setDiscountPercent(15);
      setPromoSuccess('15% Promo discount applied!');
    } else {
      setPromoError('Invalid promo code. Try "WELCOME10"');
    }
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 60, display: 'flex', justifyContent: 'flex-end' }}>
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

      {/* Drawer */}
      <div 
        className="glass-modal animate-slide-left"
        style={{
          position: 'relative',
          width: '420px',
          maxWidth: '90vw',
          height: '100%',
          zIndex: 61,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '24px',
          borderLeft: '1px solid rgba(255, 255, 255, 0.15)'
        }}
      >
        <div>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <ShoppingBag size={22} color="var(--accent-indigo)" />
              <h2 className="heading-serif" style={{ fontSize: '1.4rem', fontWeight: '700', color: '#fff' }}>
                Your Shopping Cart
              </h2>
              <span className="badge badge-indigo">{cartItems.reduce((acc, i) => acc + i.quantity, 0)}</span>
            </div>

            <button 
              onClick={onClose}
              className="btn btn-secondary btn-icon"
              style={{ width: '36px', height: '36px' }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Free Shipping Progress Indicator (₹499) */}
          <div style={{
            background: 'rgba(99, 102, 241, 0.1)',
            border: '1px solid rgba(99, 102, 241, 0.2)',
            borderRadius: 'var(--radius-sm)',
            padding: '10px 14px',
            marginBottom: '20px',
            fontSize: '0.82rem'
          }}>
            {subtotal >= 499 ? (
              <div style={{ color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '600' }}>
                <CheckCircle size={16} /> You unlocked Free Shipping!
              </div>
            ) : (
              <div>
                Add <strong style={{ color: 'var(--accent-gold)' }}>₹{499 - subtotal}</strong> more for <strong style={{ color: '#fff' }}>Free Shipping</strong>!
              </div>
            )}
          </div>

          {/* Items List */}
          <div style={{ maxHeight: '42vh', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '14px', paddingRight: '4px' }}>
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div 
                  key={item.id}
                  style={{
                    display: 'flex',
                    gap: '12px',
                    padding: '10px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.06)'
                  }}
                >
                  <img src={item.cover} alt={item.title} style={{ width: '50px', height: '75px', objectFit: 'cover', borderRadius: '4px' }} />

                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <h4 style={{ fontSize: '0.9rem', fontWeight: '600', color: '#fff', lineHeight: '1.2' }}>{item.title}</h4>
                        <button onClick={() => onRemoveItem(item.id)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.author}</div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '6px' }}>
                      <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#fff' }}>
                        ₹{item.price * item.quantity}
                      </div>

                      {/* Quantity Controls */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '4px', padding: '2px 6px' }}>
                        <button 
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                        >
                          <Minus size={12} />
                        </button>
                        <span style={{ fontSize: '0.85rem', fontWeight: '600', minWidth: '16px', textAlign: 'center' }}>{item.quantity}</span>
                        <button 
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
                <ShoppingBag size={38} style={{ margin: '0 auto 12px', opacity: 0.5 }} />
                <p>Your cart is empty.</p>
              </div>
            )}
          </div>
        </div>

        {/* Checkout Summary Footer */}
        {cartItems.length > 0 && (
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '16px' }}>
            
            {/* Promo Code Form */}
            <form onSubmit={applyPromo} style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
              <input
                type="text"
                placeholder="Promo code (e.g. WELCOME10)"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="input-field"
                style={{ height: '36px', fontSize: '0.8rem' }}
              />
              <button type="submit" className="btn btn-secondary btn-sm" style={{ whiteSpace: 'nowrap' }}>
                Apply
              </button>
            </form>
            {promoSuccess && <div style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)', marginBottom: '10px' }}>{promoSuccess}</div>}
            {promoError && <div style={{ fontSize: '0.75rem', color: 'var(--accent-rose)', marginBottom: '10px' }}>{promoError}</div>}

            {/* Calculations */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.88rem', marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(0)}</span>
              </div>
              {discountAmount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--accent-emerald)' }}>
                  <span>Discount ({discountPercent}%)</span>
                  <span>-₹{discountAmount.toFixed(0)}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                <span>Shipping</span>
                <span>{shipping === 0 ? <span style={{ color: 'var(--accent-emerald)' }}>FREE</span> : `₹${shipping}`}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#fff', fontWeight: '700', fontSize: '1.1rem', paddingTop: '8px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                <span>Total</span>
                <span>₹{total.toFixed(0)}</span>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                onProceedToCheckout(total);
              }}
              className="btn btn-primary"
              style={{ width: '100%', padding: '12px', fontSize: '1rem', gap: '8px' }}
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={18} />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
