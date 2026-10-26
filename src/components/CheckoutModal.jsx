import React, { useState } from 'react';
import { X, CreditCard, ShieldCheck, CheckCircle2, Truck, Lock, ArrowLeft, PackageCheck, Flame, BookOpen, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CheckoutModal({
  isOpen,
  onClose,
  items,
  totalPrice,
  onOrderSuccess,
  onStartReadingPurchasedBook,
  user
}) {
  const [step, setStep] = useState('payment');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [formData, setFormData] = useState({
    fullName: user ? user.name : 'Alex Rivers',
    email: user ? user.email : 'alex.rivers@example.com',
    address: '742 Evergreen Terrace',
    city: 'Springfield',
    zip: '97477',
    cardNumber: '•••• •••• •••• 4242',
    exp: '12/28',
    cvv: '888'
  });
  const [orderReceipt, setOrderReceipt] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {
      console.log('Confetti error', err);
    }

    const receipt = {
      orderId: 'BV-' + Math.floor(100000 + Math.random() * 900000),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      items: items,
      total: totalPrice,
      address: `${formData.address}, ${formData.city} ${formData.zip}`,
      paymentMethod: paymentMethod.toUpperCase()
    };

    setOrderReceipt(receipt);
    setStep('confirmation');
    onOrderSuccess(items);
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 70, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
      {/* Backdrop */}
      <div 
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.85)',
          backdropFilter: 'blur(8px)',
          animation: 'fadeIn 0.2s ease-out'
        }}
      />

      {/* Modal Content */}
      <div 
        className="glass-modal animate-fade-in"
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '650px',
          maxHeight: '90vh',
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

        {step === 'payment' ? (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <Lock size={16} color="var(--accent-emerald)" />
              <span style={{ fontSize: '0.8rem', color: 'var(--accent-emerald)', fontWeight: '600' }}>256-Bit SSL Encrypted Instant Checkout</span>
            </div>

            <h2 className="heading-serif" style={{ fontSize: '1.6rem', fontWeight: '700', color: '#fff', marginBottom: '18px' }}>
              Complete Your Purchase
            </h2>

            <form onSubmit={handleSubmit}>
              
              {/* Shipping Information */}
              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>
                  1. Delivery Details
                </h4>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
                  <input
                    type="text"
                    placeholder="Full Name"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="input-field"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="input-field"
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '10px' }}>
                  <input
                    type="text"
                    placeholder="Street Address"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="input-field"
                  />
                  <input
                    type="text"
                    placeholder="City"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="input-field"
                  />
                  <input
                    type="text"
                    placeholder="ZIP Code"
                    required
                    value={formData.zip}
                    onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                    className="input-field"
                  />
                </div>
              </div>

              {/* Payment Method Selector */}
              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>
                  2. Payment Method
                </h4>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '14px' }}>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    style={{
                      padding: '10px',
                      borderRadius: 'var(--radius-md)',
                      background: paymentMethod === 'card' ? 'rgba(99, 102, 241, 0.2)' : 'rgba(255,255,255,0.04)',
                      border: paymentMethod === 'card' ? '2px solid var(--accent-indigo)' : '1px solid var(--border-color)',
                      color: '#fff',
                      fontWeight: '600',
                      cursor: 'pointer',
                      fontSize: '0.85rem'
                    }}
                  >
                    Credit / Debit Card
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    style={{
                      padding: '10px',
                      borderRadius: 'var(--radius-md)',
                      background: paymentMethod === 'upi' ? 'rgba(6, 182, 212, 0.2)' : 'rgba(255,255,255,0.04)',
                      border: paymentMethod === 'upi' ? '2px solid var(--accent-cyan)' : '1px solid var(--border-color)',
                      color: '#fff',
                      fontWeight: '600',
                      cursor: 'pointer',
                      fontSize: '0.85rem'
                    }}
                  >
                    UPI / Google Pay
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('netbanking')}
                    style={{
                      padding: '10px',
                      borderRadius: 'var(--radius-md)',
                      background: paymentMethod === 'netbanking' ? 'rgba(251, 191, 36, 0.2)' : 'rgba(255,255,255,0.04)',
                      border: paymentMethod === 'netbanking' ? '2px solid var(--accent-gold)' : '1px solid var(--border-color)',
                      color: '#fff',
                      fontWeight: '600',
                      cursor: 'pointer',
                      fontSize: '0.85rem'
                    }}
                  >
                    Net Banking
                  </button>
                </div>
              </div>

              {/* Order Total Summary */}
              <div style={{
                background: 'rgba(255,255,255,0.03)',
                padding: '14px',
                borderRadius: 'var(--radius-md)',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Total Amount to Pay:</span>
                  <div style={{ fontSize: '1.4rem', fontWeight: '700', color: '#fff' }}>₹{totalPrice.toFixed(0)}</div>
                </div>
                <span className="badge badge-gold">Guaranteed Purchase</span>
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%', padding: '14px', fontSize: '1.05rem' }}
              >
                Pay ₹{totalPrice.toFixed(0)} & Place Order
              </button>
            </form>
          </div>
        ) : (
          /* Confirmation Receipt & Ecosystem CTA */
          <div style={{ textAlign: 'center', padding: '10px 0' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'rgba(16, 185, 129, 0.15)',
              color: 'var(--accent-emerald)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              border: '2px solid var(--accent-emerald)'
            }}>
              <CheckCircle2 size={36} />
            </div>

            <h2 className="heading-serif" style={{ fontSize: '1.8rem', color: '#fff', marginBottom: '4px' }}>
              Order Confirmed!
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '20px' }}>
              Receipt sent to <strong style={{ color: '#fff' }}>{formData.email}</strong>.
            </p>

            {/* Reading OS Ecosystem Callout Box */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(99, 102, 241, 0.2))',
              border: '1px solid var(--accent-gold)',
              borderRadius: 'var(--radius-md)',
              padding: '16px',
              textAlign: 'left',
              marginBottom: '24px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <Flame size={18} color="var(--accent-gold)" />
                <span style={{ fontSize: '0.95rem', fontWeight: '700', color: '#fff' }}>
                  Reading OS Integration Active
                </span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                Your purchased books have been automatically added to your <strong>Reading OS</strong> library. Set your daily target and start tracking!
              </p>
              
              <button
                onClick={() => {
                  onClose();
                  if (items && items.length > 0) {
                    onStartReadingPurchasedBook(items[0]);
                  }
                }}
                className="btn btn-primary"
                style={{ width: '100%', gap: '8px', background: 'linear-gradient(135deg, #f59e0b, #6366f1)' }}
              >
                <BookOpen size={18} />
                <span>Start Reading in My Reading OS Now</span>
              </button>
            </div>

            <button
              onClick={onClose}
              className="btn btn-secondary"
              style={{ width: '100%', padding: '10px' }}
            >
              Continue Browsing Bookstore
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
