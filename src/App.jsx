import React, { useState } from 'react';
import Navbar from './components/Navbar';
import NavDrawer from './components/NavDrawer';
import HeroBanner from './components/HeroBanner';
import GenreSection from './components/GenreSection';
import BookDetailModal from './components/BookDetailModal';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import AuthModal from './components/AuthModal';
import ReadingOSDashboard from './components/ReadingOSDashboard';
import BookExchangeMarketplace from './components/BookExchangeMarketplace';
import BookVerseAI from './components/BookVerseAI';
import MoodFinder from './components/MoodFinder';
import Footer from './components/Footer';

import { BOOKS, INITIAL_USED_LISTINGS } from './data/booksData';

export default function App() {
  // Navigation View State ('store' | 'readingOS' | 'exchange')
  const [currentView, setCurrentView] = useState('store');

  // Filter & Search state
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Shopping Cart state
  const [cart, setCart] = useState([
    { ...BOOKS[0], quantity: 1 }
  ]);

  // Wishlist state (IDs)
  const [wishlist, setWishlist] = useState(['f-1', 'sf-1', 'm-1']);

  // User Auth State
  const [user, setUser] = useState({
    name: 'Alex Rivers',
    email: 'alex.rivers@example.com',
    tier: 'Gold Member'
  });

  // Reading OS State
  const [currentlyReading, setCurrentlyReading] = useState({
    id: 'f-11',
    title: 'Atomic Habits',
    author: 'James Clear',
    genre: 'Fictional',
    pages: 320,
    cover: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
    pagesRead: 138,
    progressPercent: 43,
    todayTarget: 18,
    streakDays: 7,
    estimatedCompletion: 'September 24',
    weeklyTime: '3h 42m'
  });

  const [wantToRead, setWantToRead] = useState([
    BOOKS[1],
    BOOKS[2]
  ]);

  const [completedBooks, setCompletedBooks] = useState([
    BOOKS[3]
  ]);

  // MARKETPLACE EXCHANGE STATE
  const [usedListings, setUsedListings] = useState(INITIAL_USED_LISTINGS);

  // UI Modals & Drawers State
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedBookDetail, setSelectedBookDetail] = useState(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutItems, setCheckoutItems] = useState([]);
  const [checkoutTotal, setCheckoutTotal] = useState(0);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalView, setAuthModalView] = useState('profile');

  // Toast feedback state
  const [toast, setToast] = useState(null);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  // Cart operations
  const handleAddToCart = (book) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === book.id);
      if (existing) {
        return prev.map(item => item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item);
      } else {
        return [...prev, { ...book, quantity: 1 }];
      }
    });
    showToast(`Added "${book.title}" to cart!`);
  };

  const handleUpdateQuantity = (id, newQty) => {
    if (newQty <= 0) {
      handleRemoveFromCart(id);
    } else {
      setCart(prev => prev.map(item => item.id === id ? { ...item, quantity: newQty } : item));
    }
  };

  const handleRemoveFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
    showToast('Item removed from cart');
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Wishlist operations
  const handleToggleWishlist = (id) => {
    setWishlist(prev => {
      if (prev.includes(id)) {
        showToast('Removed from wishlist');
        return prev.filter(item => item !== id);
      } else {
        showToast('Saved to your wishlist!');
        return [...prev, id];
      }
    });
  };

  // Checkout operations
  const handleProceedToCheckout = (total) => {
    setCheckoutItems(cart);
    setCheckoutTotal(total);
    setIsCheckoutOpen(true);
  };

  const handleDirectSingleCheckout = (book) => {
    setCheckoutItems([{ ...book, quantity: 1 }]);
    setCheckoutTotal(book.price);
    setIsCheckoutOpen(true);
  };

  const handleOrderSuccess = (purchasedItems) => {
    setCart([]);
    showToast('🎉 Order placed successfully!');

    if (purchasedItems && purchasedItems.length > 0) {
      setWantToRead(prev => {
        const existingIds = prev.map(p => p.id);
        const newItems = purchasedItems.filter(p => !existingIds.includes(p.id));
        return [...prev, ...newItems];
      });
    }
  };

  // Reading OS Handlers
  const handleStartReadingPurchasedBook = (book) => {
    setCurrentlyReading({
      ...book,
      pagesRead: 0,
      progressPercent: 0,
      todayTarget: 18,
      streakDays: currentlyReading.streakDays || 7,
      estimatedCompletion: 'October 12',
      weeklyTime: currentlyReading.weeklyTime || '3h 42m'
    });
    setCurrentView('readingOS');
    showToast(`Switched active focus to "${book.title}"`);
  };

  const handleUpdateProgress = (updatedBook) => {
    setCurrentlyReading(updatedBook);
    showToast(`Updated progress: ${updatedBook.progressPercent}% completed!`);

    if (updatedBook.progressPercent >= 100) {
      setCompletedBooks(prev => [...prev, updatedBook]);
      showToast(`🏆 Congratulations! You finished "${updatedBook.title}"!`);
    }
  };

  // Marketplace Exchange Handlers
  const handleAddListing = (newListing) => {
    setUsedListings(prev => [newListing, ...prev]);
    showToast(`Published listing for "${newListing.title}" (₹${newListing.price}) in ${newListing.location}!`);
  };

  const handleBuyUsedItem = (usedItem) => {
    handleDirectSingleCheckout({
      id: usedItem.id,
      title: `${usedItem.title} (Used - ${usedItem.condition})`,
      author: usedItem.author,
      cover: usedItem.cover,
      price: usedItem.price,
      originalPrice: usedItem.price + 200,
      genre: 'Used Book'
    });
  };

  const handleRequestSwap = (listing) => {
    showToast(`Swap offer sent to ${listing.sellerName || 'seller'} in ${listing.location || 'Mumbai'}!`);
  };

  // Auth operations
  const handleLogin = (userData) => {
    setUser(userData);
    showToast(`Welcome back, ${userData.name}!`);
  };

  const handleLogout = () => {
    setUser(null);
    showToast('Logged out successfully');
  };

  const handleOpenAuth = (viewType = 'profile') => {
    setAuthModalView(viewType);
    setIsAuthModalOpen(true);
  };

  const wishlistBooks = BOOKS.filter(b => wishlist.includes(b.id));

  return (
    <div id="home" className="min-h-screen flex flex-col" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Toast Notification Banner */}
      {toast && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 100,
          background: 'rgba(15, 23, 42, 0.95)',
          backdropFilter: 'blur(12px)',
          border: '1px solid var(--accent-indigo)',
          color: '#fff',
          padding: '12px 20px',
          borderRadius: 'var(--radius-md)',
          boxShadow: 'var(--shadow-lg)',
          fontSize: '0.9rem',
          fontWeight: '600',
          animation: 'fadeIn 0.3s ease-out'
        }}>
          {toast}
        </div>
      )}

      {/* Navbar Header */}
      <Navbar
        cartCount={cart.reduce((acc, i) => acc + i.quantity, 0)}
        wishlistCount={wishlist.length}
        onOpenDrawer={() => setIsDrawerOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAuth={handleOpenAuth}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        user={user}
        onLogout={handleLogout}
        currentView={currentView}
        onSwitchView={setCurrentView}
        streakDays={currentlyReading.streakDays || 7}
      />

      {/* Burger Icon Slide-out Nav Drawer */}
      <NavDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        selectedGenre={selectedGenre}
        onSelectGenre={setSelectedGenre}
        cartCount={cart.reduce((acc, i) => acc + i.quantity, 0)}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAuth={handleOpenAuth}
        user={user}
        onLogout={handleLogout}
        onSwitchView={setCurrentView}
        currentView={currentView}
        currentlyReading={currentlyReading}
      />

      {/* Main Single Page Content */}
      <main style={{ flex: 1 }}>
        
        {/* ================= VIEW 1: BOOKSTORE CATALOG ================= */}
        {currentView === 'store' && (
          <>
            {/* Hero Section */}
            <HeroBanner
              onSelectGenre={(g) => {
                setSelectedGenre(g);
                setCurrentView('store');
              }}
              onQuickView={(id) => setSelectedBookDetail(BOOKS.find(b => b.id === id))}
              onOpenAI={() => setCurrentView('ai')}
              onOpenMood={() => setCurrentView('mood')}
            />

            {/* Genre Catalog Section with Search & Filters */}
            <GenreSection
              books={BOOKS}
              selectedGenre={selectedGenre}
              onSelectGenre={setSelectedGenre}
              searchQuery={searchQuery}
              onAddToCart={handleAddToCart}
              onQuickView={(id) => setSelectedBookDetail(BOOKS.find(b => b.id === id))}
              onToggleWishlist={handleToggleWishlist}
              wishlist={wishlist}
            />
          </>
        )}

        {/* ================= VIEW 2: MOOD DISCOVERY ENGINE ================= */}
        {currentView === 'mood' && (
          <MoodFinder
            books={BOOKS}
            onAddToCart={handleAddToCart}
            onDirectCheckout={handleDirectSingleCheckout}
            onQuickView={(id) => setSelectedBookDetail(BOOKS.find(b => b.id === id))}
            onNavigateToStore={() => setCurrentView('store')}
          />
        )}

        {/* ================= VIEW 3: BOOKVERSE AI RECOMMENDATION CONCIERGE ================= */}
        {currentView === 'ai' && (
          <BookVerseAI
            books={BOOKS}
            onAddToCart={handleAddToCart}
            onDirectCheckout={handleDirectSingleCheckout}
            onQuickView={(id) => setSelectedBookDetail(BOOKS.find(b => b.id === id))}
            onNavigateToStore={() => setCurrentView('store')}
          />
        )}

        {/* ================= VIEW 4: MY READING OS ================= */}
        {currentView === 'readingOS' && (
          <ReadingOSDashboard
            currentlyReading={currentlyReading}
            onUpdateProgress={handleUpdateProgress}
            wantToRead={wantToRead}
            completedBooks={completedBooks}
            onSelectBookToRead={handleStartReadingPurchasedBook}
            onNavigateToStore={() => setCurrentView('store')}
            allBooks={BOOKS}
          />
        )}

        {/* ================= VIEW 5: BOOKVERSE EXCHANGE MARKETPLACE ================= */}
        {currentView === 'exchange' && (
          <BookExchangeMarketplace
            usedListings={usedListings}
            onAddListing={handleAddListing}
            onBuyUsedItem={handleBuyUsedItem}
            onRequestSwap={handleRequestSwap}
            allBooks={BOOKS}
            onNavigateToStore={() => setCurrentView('store')}
          />
        )}

      </main>

      {/* Modals & Overlays */}
      {selectedBookDetail && (
        <BookDetailModal
          book={selectedBookDetail}
          onClose={() => setSelectedBookDetail(null)}
          onAddToCart={handleAddToCart}
          onDirectCheckout={handleDirectSingleCheckout}
          onToggleWishlist={handleToggleWishlist}
          isWishlisted={wishlist.includes(selectedBookDetail.id)}
          onRequestSwap={handleRequestSwap}
        />
      )}

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onProceedToCheckout={handleProceedToCheckout}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={checkoutItems}
        totalPrice={checkoutTotal}
        onOrderSuccess={handleOrderSuccess}
        onStartReadingPurchasedBook={handleStartReadingPurchasedBook}
        user={user}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialView={authModalView}
        user={user}
        onLogin={handleLogin}
        onLogout={handleLogout}
        wishlistBooks={wishlistBooks}
        onAddToCart={handleAddToCart}
        onQuickView={(id) => setSelectedBookDetail(BOOKS.find(b => b.id === id))}
        onToggleWishlist={handleToggleWishlist}
      />

      {/* Footer */}
      <Footer onSelectGenre={(g) => {
        setSelectedGenre(g);
        setCurrentView('store');
      }} />

    </div>
  );
}
