import React, { useState, useMemo } from 'react';
import { Filter, SlidersHorizontal, ArrowUpDown, BookOpen, SearchX } from 'lucide-react';
import { GENRES } from '../data/booksData';
import BookCard from './BookCard';

export default function GenreSection({
  books,
  selectedGenre,
  onSelectGenre,
  searchQuery,
  onAddToCart,
  onQuickView,
  onToggleWishlist,
  wishlist
}) {
  const [sortBy, setSortBy] = useState('popular'); // 'popular', 'price-low', 'price-high', 'rating'
  const [maxPrice, setMaxPrice] = useState(1000);

  // Filter & Sort books
  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      // Genre filter
      const matchesGenre = selectedGenre === 'All' || book.genre === selectedGenre;
      
      // Search query filter (title, author, genre, description)
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = !query || (
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query) ||
        book.genre.toLowerCase().includes(query) ||
        book.description.toLowerCase().includes(query)
      );

      // Price filter
      const matchesPrice = book.price <= maxPrice;

      return matchesGenre && matchesSearch && matchesPrice;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      // Default: popular
      return b.reviewsCount - a.reviewsCount;
    });
  }, [books, selectedGenre, searchQuery, maxPrice, sortBy]);

  return (
    <section id="explore" style={{ padding: '40px 0 60px' }}>
      <div className="container">
        
        {/* Section Heading */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--accent-indigo)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1.5px' }}>
            Catalog Directory
          </span>
          <h2 className="heading-serif" style={{ fontSize: '2.2rem', fontWeight: '700', color: '#fff', margin: '6px 0 12px' }}>
            Explore Genre Collections
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', fontSize: '0.95rem' }}>
            Choose from Fictional, Sci-Fi, Movie adaptations, Series classics, and Thrillers. Over 10 books in every genre!
          </p>
        </div>

        {/* Genre Selector Tabs */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '10px',
          marginBottom: '28px'
        }}>
          {GENRES.map((genre) => {
            const isActive = selectedGenre === genre;
            const count = genre === 'All' ? books.length : books.filter(b => b.genre === genre).length;

            return (
              <button
                key={genre}
                onClick={() => onSelectGenre(genre)}
                className={isActive ? "btn btn-primary" : "btn btn-secondary"}
                style={{
                  borderRadius: 'var(--radius-full)',
                  padding: '8px 18px',
                  fontSize: '0.9rem',
                  gap: '8px'
                }}
              >
                <span>{genre}</span>
                <span style={{
                  background: isActive ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.08)',
                  padding: '2px 8px',
                  borderRadius: '999px',
                  fontSize: '0.75rem',
                  fontWeight: '700'
                }}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Filter Controls Bar */}
        <div className="glass-panel" style={{
          borderRadius: 'var(--radius-md)',
          padding: '14px 20px',
          marginBottom: '28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            <BookOpen size={18} color="var(--accent-indigo)" />
            <span>Showing <strong style={{ color: '#fff' }}>{filteredBooks.length}</strong> books</span>
            {selectedGenre !== 'All' && <span>in <strong style={{ color: 'var(--accent-indigo)' }}>{selectedGenre}</strong></span>}
            {searchQuery && <span>matching "<strong style={{ color: 'var(--accent-gold)' }}>{searchQuery}</strong>"</span>}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            {/* Price Filter Slider (INR) */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Max Price:</span>
              <input
                type="range"
                min="150"
                max="1000"
                step="50"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                style={{ accentColor: 'var(--accent-indigo)', width: '110px', cursor: 'pointer' }}
              />
              <span style={{ fontSize: '0.85rem', fontWeight: '700', color: '#fff' }}>₹{maxPrice}</span>
            </div>

            {/* Sort Select */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ArrowUpDown size={16} color="var(--text-muted)" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
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
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

        </div>

        {/* Books Grid */}
        {filteredBooks.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))',
            gap: '24px'
          }}>
            {filteredBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onAddToCart={onAddToCart}
                onQuickView={onQuickView}
                onToggleWishlist={onToggleWishlist}
                isWishlisted={wishlist.includes(book.id)}
              />
            ))}
          </div>
        ) : (
          /* Empty state */
          <div className="glass-panel" style={{
            padding: '60px 20px',
            textAlign: 'center',
            borderRadius: 'var(--radius-lg)'
          }}>
            <SearchX size={48} color="var(--text-muted)" style={{ margin: '0 auto 16px' }} />
            <h3 className="heading-serif" style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '8px' }}>
              No books found
            </h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>
              Try adjusting your search criteria, price range, or genre filter.
            </p>
            <button
              onClick={() => {
                onSelectGenre('All');
                setMaxPrice(1000);
              }}
              className="btn btn-primary"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
