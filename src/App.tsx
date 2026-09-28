import React from 'react';
import { CraftProvider, useCraft } from './context/CraftContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { QuickViewModal } from './components/QuickViewModal';
import { BackendArchitectureModal } from './components/BackendArchitectureModal';
import { ToastContainer } from './components/ToastContainer';

import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { WishlistPage } from './pages/WishlistPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';

const AppContent: React.FC = () => {
  const { activePage } = useCraft();

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-[#3D312A] selection:bg-[#E07A5F]/20 selection:text-[#9A3412]">
      {/* Navigation Header */}
      <Navbar />

      {/* Main Content View Switcher */}
      <main className="flex-1">
        {activePage === 'home' && <HomePage />}
        {activePage === 'shop' && <ShopPage />}
        {activePage === 'product-detail' && <ProductDetailPage />}
        {activePage === 'cart' && <CartPage />}
        {activePage === 'wishlist' && <WishlistPage />}
        {activePage === 'about' && <AboutPage />}
        {activePage === 'contact' && <ContactPage />}
      </main>

      {/* Site Footer */}
      <Footer />

      {/* Modals, Drawers & Notifications */}
      <CartDrawer />
      <WishlistDrawer />
      <QuickViewModal />
      <BackendArchitectureModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <CraftProvider>
      <AppContent />
    </CraftProvider>
  );
}
