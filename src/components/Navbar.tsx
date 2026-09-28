import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  Menu, 
  X, 
  Sparkles, 
  ChevronDown, 
  Layers, 
  Compass, 
  Mail, 
  Info,
  PackageCheck
} from 'lucide-react';
import { useCraft, PageView } from '../context/CraftContext';
import { CATEGORIES } from '../data/craftData';

export const Navbar: React.FC = () => {
  const {
    activePage,
    setActivePage,
    totalCartItems,
    wishlist,
    setIsCartOpen,
    setIsWishlistOpen,
    setSelectedCategoryFilter,
    setIsCheckoutModalOpen,
  } = useCraft();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoriesDropdownOpen, setIsCategoriesDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [navSearchQuery, setNavSearchQuery] = useState('');

  const handleNavClick = (page: PageView) => {
    setActivePage(page);
    setIsMobileMenuOpen(false);
    setIsCategoriesDropdownOpen(false);
  };

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategoryFilter(categoryName);
    setActivePage('shop');
    setIsMobileMenuOpen(false);
    setIsCategoriesDropdownOpen(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (navSearchQuery.trim()) {
      setActivePage('shop');
      setSelectedCategoryFilter(null);
      setIsSearchOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FCFAF6]/95 backdrop-blur-md border-b border-[#EFE8DD] transition-all">
      {/* Announcement Ribbon */}
      <div className="bg-[#283618] text-[#F4F6F0] px-4 py-2 text-xs md:text-sm font-medium">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 mx-auto sm:mx-0">
            <Sparkles className="w-3.5 h-3.5 text-[#DDA15E] animate-pulse" />
            <span>
              Handcrafted in small batches • <strong>Free shipping</strong> on orders over $50 with code{' '}
              <button 
                onClick={() => {
                  navigator.clipboard?.writeText('AURA10');
                }}
                className="underline decoration-[#DDA15E] text-[#DDA15E] font-semibold hover:opacity-80 transition cursor-pointer"
                title="Click to copy code"
              >
                AURA10
              </button>
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-xs text-[#E6EADF]">
            <button
              onClick={() => setIsCheckoutModalOpen(true)}
              className="flex items-center gap-1.5 hover:text-white transition cursor-pointer"
            >
              <PackageCheck className="w-3.5 h-3.5 text-[#DDA15E]" />
              <span>Backend Architecture Guide</span>
            </button>
            <span>|</span>
            <span>100% Plastic-Free Packaging</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-[#3D312A] hover:bg-[#F3ECE2] transition"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2.5 text-left group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full bg-[#E07A5F] flex items-center justify-center text-white shadow-sm shadow-[#E07A5F]/30 group-hover:scale-105 transition-transform">
                {/* Artisanal vase / spark glyph */}
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2C10.5 2 9.5 3 9.5 4.5V6H7C5.9 6 5 6.9 5 8V9C5 12.5 7.5 15.5 11 16V19H8C7.4 19 7 19.4 7 20C7 20.6 7.4 21 8 21H16C16.6 21 17 20.6 17 20C17 19.4 16.6 19 16 19H13V16C16.5 15.5 19 12.5 19 9V8C19 6.9 18.1 6 17 6H14.5V4.5C14.5 3 13.5 2 12 2Z" />
                </svg>
              </div>
              <div>
                <span className="font-serif text-2xl md:text-3xl font-bold tracking-tight text-[#3D312A] block leading-none">
                  Craft<span className="text-[#C85A32]">Aura</span>
                </span>
                <span className="text-[10px] tracking-widest uppercase font-semibold text-[#8B7355] block mt-0.5">
                  Artisan Handmade
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            <button
              onClick={() => handleNavClick('home')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition cursor-pointer ${
                activePage === 'home'
                  ? 'text-[#C85A32] bg-[#FAF3EA] font-semibold'
                  : 'text-[#5C4738] hover:text-[#C85A32] hover:bg-[#FAF3EA]/60'
              }`}
            >
              Home
            </button>

            {/* Categories Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsCategoriesDropdownOpen(!isCategoriesDropdownOpen)}
                onMouseEnter={() => setIsCategoriesDropdownOpen(true)}
                className={`px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1 transition cursor-pointer ${
                  isCategoriesDropdownOpen || activePage === 'shop'
                    ? 'text-[#C85A32] bg-[#FAF3EA]'
                    : 'text-[#5C4738] hover:text-[#C85A32] hover:bg-[#FAF3EA]/60'
                }`}
              >
                <span>Craft Collections</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isCategoriesDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isCategoriesDropdownOpen && (
                <div
                  onMouseLeave={() => setIsCategoriesDropdownOpen(false)}
                  className="absolute left-0 top-full mt-1 w-72 rounded-xl bg-[#FCFAF6] border border-[#EFE8DD] shadow-xl p-2 z-50 animate-in fade-in slide-in-from-top-2"
                >
                  <div className="text-[11px] font-semibold tracking-wider text-[#8B7355] uppercase px-3 py-1.5 border-b border-[#EFE8DD]">
                    Browse 8 Curated Categories
                  </div>
                  <div className="grid grid-cols-1 py-1 max-h-96 overflow-y-auto">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => handleCategoryClick(cat.name)}
                        className="flex items-center gap-3 px-3 py-2 text-sm text-[#3D312A] hover:bg-[#F3ECE2] rounded-lg transition text-left cursor-pointer"
                      >
                        <img 
                          src={cat.image} 
                          alt={cat.name} 
                          className="w-8 h-8 rounded-md object-cover border border-[#EFE8DD]" 
                        />
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-xs truncate">{cat.name}</div>
                          <div className="text-[10px] text-[#7A6C60]">{cat.itemCount} artisan pieces</div>
                        </div>
                      </button>
                    ))}
                  </div>
                  <div className="pt-2 border-t border-[#EFE8DD] px-2">
                    <button
                      onClick={() => {
                        setSelectedCategoryFilter(null);
                        handleNavClick('shop');
                      }}
                      className="w-full text-center py-2 text-xs font-semibold text-[#C85A32] hover:underline"
                    >
                      View All Products →
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => {
                setSelectedCategoryFilter(null);
                handleNavClick('shop');
              }}
              className={`px-3 py-2 rounded-md text-sm font-medium transition cursor-pointer ${
                activePage === 'shop'
                  ? 'text-[#C85A32] bg-[#FAF3EA] font-semibold'
                  : 'text-[#5C4738] hover:text-[#C85A32] hover:bg-[#FAF3EA]/60'
              }`}
            >
              Shop All
            </button>

            <button
              onClick={() => handleNavClick('about')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition cursor-pointer ${
                activePage === 'about'
                  ? 'text-[#C85A32] bg-[#FAF3EA] font-semibold'
                  : 'text-[#5C4738] hover:text-[#C85A32] hover:bg-[#FAF3EA]/60'
              }`}
            >
              Our Story
            </button>

            <button
              onClick={() => handleNavClick('contact')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition cursor-pointer ${
                activePage === 'contact'
                  ? 'text-[#C85A32] bg-[#FAF3EA] font-semibold'
                  : 'text-[#5C4738] hover:text-[#C85A32] hover:bg-[#FAF3EA]/60'
              }`}
            >
              Contact &amp; Studio
            </button>
          </nav>

          {/* Right Header Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Search Toggle */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2.5 rounded-full text-[#3D312A] hover:bg-[#F3ECE2] transition cursor-pointer relative"
              title="Search crafts"
              aria-label="Search crafts"
            >
              <Search className="w-5 h-5 text-[#5C4738]" />
            </button>

            {/* Wishlist Button with Counter */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="p-2.5 rounded-full text-[#3D312A] hover:bg-[#F3ECE2] transition cursor-pointer relative"
              title="View Wishlist"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5 text-[#5C4738]" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#E07A5F] text-white text-[11px] font-bold flex items-center justify-center shadow-sm">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Drawer Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-full bg-[#3D312A] text-[#FAF3EA] hover:bg-[#2C221E] transition shadow-sm cursor-pointer group"
              title="View Cart"
              aria-label="Cart"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 text-[#DDA15E] group-hover:scale-110 transition-transform" />
                {totalCartItems > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-[#E07A5F] text-white text-[10px] font-bold flex items-center justify-center">
                    {totalCartItems}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline text-xs font-semibold tracking-wide">
                Cart {totalCartItems > 0 && `(${totalCartItems})`}
              </span>
            </button>
          </div>

        </div>

        {/* Expandable Quick Search Bar */}
        {isSearchOpen && (
          <div className="py-3 px-1 border-t border-[#EFE8DD] animate-in fade-in slide-in-from-top-1">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center max-w-xl mx-auto">
              <Search className="absolute left-3.5 w-4 h-4 text-[#8B7355]" />
              <input
                type="text"
                value={navSearchQuery}
                onChange={(e) => setNavSearchQuery(e.target.value)}
                placeholder="Search terracotta pottery, soy candles, merino blankets, silver rings..."
                className="w-full pl-10 pr-24 py-2.5 bg-white rounded-full border border-[#E4D8C7] text-sm text-[#3D312A] placeholder-[#9C8B7D] focus:outline-none focus:ring-2 focus:ring-[#C85A32] focus:border-transparent shadow-sm"
                autoFocus
              />
              <button
                type="submit"
                className="absolute right-1.5 px-4 py-1.5 bg-[#C85A32] text-white text-xs font-medium rounded-full hover:bg-[#B84E28] transition"
              >
                Find Craft
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-[#EFE8DD] bg-[#FCFAF6] px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <div className="space-y-1">
            <button
              onClick={() => handleNavClick('home')}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
                activePage === 'home' ? 'bg-[#FAF3EA] text-[#C85A32] font-semibold' : 'text-[#3D312A]'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => {
                setSelectedCategoryFilter(null);
                handleNavClick('shop');
              }}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
                activePage === 'shop' ? 'bg-[#FAF3EA] text-[#C85A32] font-semibold' : 'text-[#3D312A]'
              }`}
            >
              Shop All Handmade Crafts
            </button>

            {/* Mobile Categories Accordion */}
            <div className="pt-2 pb-1 border-t border-[#EFE8DD]/60">
              <div className="px-3 text-xs font-semibold text-[#8B7355] uppercase tracking-wider mb-2">
                Popular Categories
              </div>
              <div className="grid grid-cols-2 gap-1.5 px-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryClick(cat.name)}
                    className="text-left text-xs p-2 rounded-md bg-[#F7F3EE] hover:bg-[#EFE8DD] text-[#3D312A] font-medium truncate"
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => handleNavClick('about')}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
                activePage === 'about' ? 'bg-[#FAF3EA] text-[#C85A32] font-semibold' : 'text-[#3D312A]'
              }`}
            >
              About Our Artisans
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
                activePage === 'contact' ? 'bg-[#FAF3EA] text-[#C85A32] font-semibold' : 'text-[#3D312A]'
              }`}
            >
              Contact &amp; Custom Orders
            </button>
          </div>

          <div className="pt-4 border-t border-[#EFE8DD] flex items-center justify-between">
            <button
              onClick={() => {
                setIsWishlistOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 text-sm font-medium text-[#5C4738]"
            >
              <Heart className="w-4 h-4 text-[#C85A32]" />
              <span>Wishlist ({wishlist.length})</span>
            </button>

            <button
              onClick={() => {
                setIsCheckoutModalOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="text-xs text-[#283618] underline font-medium"
            >
              Backend Tech Guide
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
