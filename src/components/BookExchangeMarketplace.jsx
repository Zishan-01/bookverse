import React, { useState } from 'react';
import { 
  Repeat, 
  MapPin, 
  Tag, 
  Plus, 
  Search, 
  ShieldCheck, 
  ShoppingBag, 
  ArrowRight, 
  CheckCircle2, 
  Star, 
  X,
  RefreshCw,
  User,
  Heart
} from 'lucide-react';

export default function BookExchangeMarketplace({
  usedListings,
  onAddListing,
  onBuyUsedItem,
  onRequestSwap,
  allBooks,
  onNavigateToStore
}) {
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedCondition, setSelectedCondition] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSellModalOpen, setIsSellModalOpen] = useState(false);
  const [selectedSwapListing, setSelectedSwapListing] = useState(null);

  // New Listing Form State
  const [formTitle, setFormTitle] = useState('');
  const [formAuthor, setFormAuthor] = useState('');
  const [formPrice, setFormPrice] = useState('180');
  const [formCondition, setFormCondition] = useState('Good');
  const [formLocation, setFormLocation] = useState('Mumbai');
  const [formDescription, setFormDescription] = useState('');
  const [formCover, setFormCover] = useState('https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80');

  // Filter listings
  const filteredListings = usedListings.filter(item => {
    const matchesLoc = selectedLocation === 'All' || item.location === selectedLocation;
    const matchesCond = selectedCondition === 'All' || item.condition === selectedCondition;
    const query = searchQuery.toLowerCase().trim();
    const matchesQuery = !query || (
      item.title.toLowerCase().includes(query) ||
      item.author.toLowerCase().includes(query) ||
      item.location.toLowerCase().includes(query) ||
      item.sellerName.toLowerCase().includes(query)
    );
    return matchesLoc && matchesCond && matchesQuery;
  });

  const handleSellSubmit = (e) => {
    e.preventDefault();
    if (!formTitle || !formAuthor) return;

    const newListing = {
      id: 'u-' + Math.floor(1000 + Math.random() * 9000),
      title: formTitle,
      author: formAuthor,
      cover: formCover || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
      sellerName: 'You (Alex Rivers)',
      sellerRating: 5.0,
      price: Number(formPrice) || 180,
      currency: '₹',
      condition: formCondition,
      location: formLocation,
      description: formDescription || 'Pre-owned copy in solid reading condition.',
      allowExchange: true,
      dateAdded: 'Just now'
    };

    onAddListing(newListing);
    setIsSellModalOpen(false);
    setFormTitle('');
    setFormAuthor('');
  };

  return (
    <div className="animate-fade-in" style={{ padding: '30px 0 60px' }}>
      <div className="container">
        
        {/* Header */}
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
              <span className="badge badge-cyan" style={{ gap: '4px' }}>
                <Repeat size={14} color="var(--accent-cyan)" /> Peer-to-Peer Marketplace
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <ShieldCheck size={14} /> Verified Readers
              </span>
            </div>
            <h1 className="heading-serif" style={{ fontSize: '2.2rem', fontWeight: '700', color: '#fff' }}>
              BookVerse Exchange
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              Buy used books, sell your read copies, or swap with readers nearby!
            </p>
          </div>

          <button
            onClick={() => setIsSellModalOpen(true)}
            className="btn btn-primary"
            style={{ gap: '8px', background: 'linear-gradient(135deg, #06b6d4, #6366f1)' }}
          >
            <Plus size={18} />
            <span>Sell / List a Used Book</span>
          </button>
        </div>

        {/* Filters Bar */}
        <div className="glass-panel" style={{
          borderRadius: 'var(--radius-md)',
          padding: '16px 20px',
          marginBottom: '30px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          {/* Search bar */}
          <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search by title, author, or city (e.g. Mumbai)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field"
              style={{ paddingLeft: '38px', height: '38px', fontSize: '0.88rem' }}
            />
          </div>

          {/* Location filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <MapPin size={16} color="var(--accent-gold)" />
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Location:</span>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              style={{
                background: 'var(--bg-input)',
                border: '1px solid var(--border-color)',
                color: '#fff',
                padding: '6px 12px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.85rem',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="All">All Cities</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Delhi">Delhi</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Pune">Pune</option>
              <option value="Chennai">Chennai</option>
            </select>
          </div>

          {/* Condition filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Tag size={16} color="var(--accent-indigo)" />
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Condition:</span>
            <select
              value={selectedCondition}
              onChange={(e) => setSelectedCondition(e.target.value)}
              style={{
                background: 'var(--bg-input)',
                border: '1px solid var(--border-color)',
                color: '#fff',
                padding: '6px 12px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.85rem',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="All">Any Condition</option>
              <option value="Like New">Like New</option>
              <option value="Good">Good</option>
              <option value="Acceptable">Acceptable</option>
            </select>
          </div>
        </div>

        {/* Listings Grid */}
        {filteredListings.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '24px'
          }}>
            {filteredListings.map(item => (
              <div 
                key={item.id}
                className="glass-panel"
                style={{
                  borderRadius: 'var(--radius-md)',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  transition: 'all 0.25s ease'
                }}
              >
                <div>
                  {/* Top Badges */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <span className={`badge ${item.condition === 'Like New' ? 'badge-gold' : 'badge-indigo'}`}>
                      {item.condition}
                    </span>
                    <span style={{ fontSize: '0.78rem', color: 'var(--accent-gold)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <MapPin size={12} /> {item.location}
                    </span>
                  </div>

                  {/* Cover & Info */}
                  <div style={{ display: 'flex', gap: '14px', marginBottom: '14px' }}>
                    <img src={item.cover} alt={item.title} style={{ width: '70px', height: '105px', objectFit: 'cover', borderRadius: '6px' }} />
                    
                    <div style={{ flex: 1 }}>
                      <h3 className="heading-serif" style={{ fontSize: '1.05rem', fontWeight: '700', color: '#fff', lineHeight: '1.2' }}>
                        {item.title}
                      </h3>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                        {item.author}
                      </p>

                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <User size={12} /> Seller: <strong style={{ color: '#fff' }}>{item.sellerName}</strong>
                      </div>
                    </div>
                  </div>

                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', background: 'rgba(255,255,255,0.03)', padding: '8px 10px', borderRadius: 'var(--radius-sm)', marginBottom: '14px', fontStyle: 'italic' }}>
                    "{item.description}"
                  </p>
                </div>

                {/* Footer Actions & Pricing */}
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <div>
                      <span style={{ fontSize: '1.3rem', fontWeight: '700', color: 'var(--accent-emerald)' }}>
                        {item.currency}{item.price}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: '4px' }}>used</span>
                    </div>

                    {item.allowExchange && (
                      <span className="badge badge-cyan" style={{ fontSize: '0.68rem' }}>
                        Swap Available
                      </span>
                    )}
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: item.allowExchange ? '1fr 1fr' : '1fr', gap: '8px' }}>
                    <button
                      onClick={() => onBuyUsedItem(item)}
                      className="btn btn-primary btn-sm"
                    >
                      Buy Used ({item.currency}{item.price})
                    </button>

                    {item.allowExchange && (
                      <button
                        onClick={() => setSelectedSwapListing(item)}
                        className="btn btn-secondary btn-sm"
                        style={{ gap: '4px' }}
                      >
                        <Repeat size={14} color="var(--accent-cyan)" /> Request Swap
                      </button>
                    )}
                  </div>
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="glass-panel" style={{ padding: '60px 20px', textAlign: 'center', borderRadius: 'var(--radius-lg)' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginBottom: '16px' }}>
              No pre-owned listings found matching your location or search criteria.
            </p>
            <button onClick={() => setIsSellModalOpen(true)} className="btn btn-primary">
              Be the first to list a used book in {selectedLocation}!
            </button>
          </div>
        )}

        {/* SELL / LIST A USED BOOK FORM MODAL */}
        {isSellModalOpen && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
            <div onClick={() => setIsSellModalOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)' }} />
            <div className="glass-modal animate-fade-in" style={{ position: 'relative', zIndex: 81, width: '100%', maxWidth: '520px', maxHeight: '90vh', overflowY: 'auto', padding: '28px', borderRadius: 'var(--radius-lg)' }}>
              
              <button onClick={() => setIsSellModalOpen(false)} className="btn btn-secondary btn-icon" style={{ position: 'absolute', top: '16px', right: '16px', width: '32px', height: '32px' }}>
                <X size={16} />
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <Tag size={18} color="var(--accent-cyan)" />
                <h3 className="heading-serif" style={{ fontSize: '1.5rem', color: '#fff' }}>
                  List Your Used Book for Sale
                </h3>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '18px' }}>
                Sell your pre-owned book to fellow readers or offer it for an exchange swap!
              </p>

              <form onSubmit={handleSellSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Book Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Atomic Habits, Dune, The Alchemist"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    className="input-field"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Author Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. James Clear"
                    value={formAuthor}
                    onChange={(e) => setFormAuthor(e.target.value)}
                    className="input-field"
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Price (₹)</label>
                    <input
                      type="number"
                      required
                      placeholder="180"
                      value={formPrice}
                      onChange={(e) => setFormPrice(e.target.value)}
                      className="input-field"
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Condition</label>
                    <select
                      value={formCondition}
                      onChange={(e) => setFormCondition(e.target.value)}
                      className="input-field"
                      style={{ height: '42px' }}
                    >
                      <option value="Like New">Like New</option>
                      <option value="Good">Good</option>
                      <option value="Acceptable">Acceptable</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Location</label>
                    <select
                      value={formLocation}
                      onChange={(e) => setFormLocation(e.target.value)}
                      className="input-field"
                      style={{ height: '42px' }}
                    >
                      <option value="Mumbai">Mumbai</option>
                      <option value="Delhi">Delhi</option>
                      <option value="Bangalore">Bangalore</option>
                      <option value="Pune">Pune</option>
                      <option value="Chennai">Chennai</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Seller Notes / Condition Details</label>
                  <textarea
                    rows="2"
                    placeholder="e.g. Read once, no highlighted pages, great condition."
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    className="input-field"
                    style={{ resize: 'none' }}
                  />
                </div>

                <button type="submit" className="btn btn-primary" style={{ padding: '12px', marginTop: '6px' }}>
                  Publish Used Book Listing (₹{formPrice})
                </button>
              </form>

            </div>
          </div>
        )}

        {/* REQUEST SWAP MODAL */}
        {selectedSwapListing && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
            <div onClick={() => setSelectedSwapListing(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)' }} />
            <div className="glass-modal animate-fade-in" style={{ position: 'relative', zIndex: 81, width: '100%', maxWidth: '440px', padding: '24px', borderRadius: 'var(--radius-lg)' }}>
              
              <button onClick={() => setSelectedSwapListing(null)} className="btn btn-secondary btn-icon" style={{ position: 'absolute', top: '14px', right: '14px', width: '32px', height: '32px' }}>
                <X size={16} />
              </button>

              <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                <Repeat size={32} color="var(--accent-cyan)" style={{ margin: '0 auto 8px' }} />
                <h3 className="heading-serif" style={{ fontSize: '1.4rem', color: '#fff' }}>
                  Request Book Swap
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Swap your book for <strong style={{ color: '#fff' }}>{selectedSwapListing.title}</strong> owned by {selectedSwapListing.sellerName} in {selectedSwapListing.location}.
                </p>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: 'var(--radius-md)', marginBottom: '18px' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Seller accepts:</div>
                <div style={{ fontSize: '0.9rem', color: 'var(--accent-gold)', fontWeight: '600' }}>
                  {selectedSwapListing.exchangeWants || 'Any Sci-Fi, Fictional, or Thriller title'}
                </div>
              </div>

              <button
                onClick={() => {
                  onRequestSwap(selectedSwapListing);
                  setSelectedSwapListing(null);
                }}
                className="btn btn-primary"
                style={{ width: '100%', padding: '12px' }}
              >
                Send Trade Offer to Seller
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
