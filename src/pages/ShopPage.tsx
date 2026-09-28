import React, { useState, useMemo } from 'react';
import { 
  Search, 
  SlidersHorizontal, 
  X, 
  ChevronDown, 
  Sparkles, 
  Check, 
  ArrowUpDown,
  RotateCcw
} from 'lucide-react';
import { useCraft } from '../context/CraftContext';
import { PRODUCTS, CATEGORIES } from '../data/craftData';
import { ProductCard } from '../components/ProductCard';

export const ShopPage: React.FC = () => {
  const { selectedCategoryFilter, setSelectedCategoryFilter } = useCraft();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>(selectedCategoryFilter || 'all');
  const [maxPrice, setMaxPrice] = useState<number>(100);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest'>('featured');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Sync when selectedCategoryFilter changes from Navbar or Home page
  React.useEffect(() => {
    if (selectedCategoryFilter) {
      setActiveCategory(selectedCategoryFilter);
    }
  }, [selectedCategoryFilter]);

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (activeCategory !== 'all' && product.category !== activeCategory) {
        return false;
      }

      // Search query filter (matches name, description, tags, maker)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesMaker = product.makerName.toLowerCase().includes(query);
        const matchesTag = product.tags.some((t) => t.toLowerCase().includes(query));
        const matchesCategory = product.category.toLowerCase().includes(query);

        if (!matchesName && !matchesDesc && !matchesMaker && !matchesTag && !matchesCategory) {
          return false;
        }
      }

      // Price filter
      if (product.price > maxPrice) {
        return false;
      }

      // Stock status
      if (inStockOnly && !product.inStock) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      // 'featured'
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [activeCategory, searchQuery, maxPrice, sortBy, inStockOnly]);

  const handleResetFilters = () => {
    setActiveCategory('all');
    setSelectedCategoryFilter(null);
    setSearchQuery('');
    setMaxPrice(100);
    setSortBy('featured');
    setInStockOnly(false);
  };

  const hasActiveFilters = 
    activeCategory !== 'all' || 
    searchQuery.trim() !== '' || 
    maxPrice < 100 || 
    inStockOnly;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Page Header */}
      <div className="mb-8">
        <span className="text-xs font-semibold text-[#8B7355] uppercase tracking-wider block">
          Artisanal Catalog
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#3D312A] mt-1">
          Explore Handmade Crafts
        </h1>
        <p className="text-xs sm:text-sm text-[#7A6C60] mt-1 max-w-xl">
          Browse authentic pottery, botanical jewelry, crochet blankets, and zero-waste crafts lovingly made in local artist studios.
        </p>
      </div>

      {/* Top Search & Filter Bar */}
      <div className="p-4 rounded-2xl bg-[#FCFAF6] border border-[#EFE8DD] shadow-xs mb-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Search Input */}
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B7355]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search ceramics, crochet, earrings, candles..."
              className="w-full pl-10 pr-9 py-2.5 bg-white rounded-xl border border-[#E4D8C7] text-xs text-[#3D312A] placeholder-[#9C8B7D] focus:outline-none focus:ring-2 focus:ring-[#C85A32]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8B7355] hover:text-[#3D312A]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Right Controls: Sort & Mobile Filter Toggle */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            
            <button
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
              className="lg:hidden flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-[#D8C7B5] bg-white text-xs font-semibold text-[#3D312A] hover:bg-[#FAF3EA]"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#C85A32]" />
              <span>Filters {hasActiveFilters && '(Active)'}</span>
            </button>

            {/* Sort Selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#7A6C60] hidden sm:inline">Sort:</span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="appearance-none pl-3 pr-8 py-2 bg-white rounded-xl border border-[#E4D8C7] text-xs font-medium text-[#3D312A] focus:outline-none focus:ring-1 focus:ring-[#C85A32] cursor-pointer"
                >
                  <option value="featured">Featured First</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest Batches</option>
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#8B7355] pointer-events-none" />
              </div>
            </div>

          </div>

        </div>

        {/* Category Filter Pills (Horizontal quick scroll) */}
        <div className="flex items-center gap-2 overflow-x-auto pt-4 mt-3 border-t border-[#EFE8DD] pb-1 no-scrollbar">
          <button
            onClick={() => {
              setActiveCategory('all');
              setSelectedCategoryFilter(null);
            }}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-[#3D312A] text-white shadow-xs'
                : 'bg-white text-[#5C4738] border border-[#EFE8DD] hover:bg-[#FAF3EA]'
            }`}
          >
            All Crafts ({PRODUCTS.length})
          </button>

          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.name);
                setSelectedCategoryFilter(cat.name);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                activeCategory === cat.name
                  ? 'bg-[#C85A32] text-white shadow-xs'
                  : 'bg-white text-[#5C4738] border border-[#EFE8DD] hover:bg-[#FAF3EA]'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Layout: Sidebar Filters + Product Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Desktop Sidebar Filters */}
        <aside className={`lg:block ${isMobileFilterOpen ? 'block' : 'hidden lg:block'} space-y-6`}>
          <div className="p-5 rounded-2xl bg-[#FCFAF6] border border-[#EFE8DD] shadow-xs space-y-6">
            
            <div className="flex items-center justify-between pb-3 border-b border-[#EFE8DD]">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#C85A32]" />
                <h3 className="font-serif font-bold text-sm text-[#3D312A]">Refine Selection</h3>
              </div>

              {hasActiveFilters && (
                <button
                  onClick={handleResetFilters}
                  className="text-[11px] text-[#C85A32] hover:underline flex items-center gap-1 font-semibold cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              )}
            </div>

            {/* Price Filter Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#3D312A]">Maximum Price</span>
                <span className="font-bold text-[#C85A32]">${maxPrice}</span>
              </div>
              <input
                type="range"
                min="20"
                max="100"
                step="5"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#C85A32] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#9C8B7D]">
                <span>$20</span>
                <span>$60</span>
                <span>$100</span>
              </div>
            </div>

            {/* In Stock Only Checkbox */}
            <div className="pt-2 border-t border-[#EFE8DD]">
              <label className="flex items-center gap-2.5 text-xs text-[#3D312A] cursor-pointer">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="w-4 h-4 rounded text-[#C85A32] accent-[#C85A32] focus:ring-0 cursor-pointer"
                />
                <span className="font-medium">In Stock Only (Ready to Ship)</span>
              </label>
            </div>

            {/* Category Radio Group */}
            <div className="pt-3 border-t border-[#EFE8DD] space-y-2">
              <span className="text-xs font-semibold text-[#3D312A] block">Categories</span>
              <div className="space-y-1.5 text-xs">
                <button
                  onClick={() => {
                    setActiveCategory('all');
                    setSelectedCategoryFilter(null);
                  }}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg transition flex items-center justify-between cursor-pointer ${
                    activeCategory === 'all'
                      ? 'bg-[#FAF3EA] text-[#C85A32] font-semibold'
                      : 'text-[#5C4738] hover:bg-[#F3ECE2]'
                  }`}
                >
                  <span>All Categories</span>
                  <span className="text-[10px] text-[#9C8B7D]">{PRODUCTS.length}</span>
                </button>

                {CATEGORIES.map((cat) => {
                  const count = PRODUCTS.filter((p) => p.category === cat.name).length;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setActiveCategory(cat.name);
                        setSelectedCategoryFilter(cat.name);
                      }}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg transition flex items-center justify-between cursor-pointer ${
                        activeCategory === cat.name
                          ? 'bg-[#FAF3EA] text-[#C85A32] font-semibold'
                          : 'text-[#5C4738] hover:bg-[#F3ECE2]'
                      }`}
                    >
                      <span className="truncate">{cat.name}</span>
                      <span className="text-[10px] text-[#9C8B7D] shrink-0 ml-1">{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quality Commitment Box */}
            <div className="p-3.5 rounded-xl bg-[#FAF3EA] border border-[#EFE8DD] text-[11px] text-[#5C4738] space-y-1">
              <span className="font-bold text-[#283618] block">🌿 Artisan Guarantee</span>
              <p className="leading-relaxed">
                Every order is packaged with zero single-use plastics and arrives with an artist provenance card.
              </p>
            </div>

          </div>
        </aside>

        {/* Product Grid Area */}
        <main className="lg:col-span-3 space-y-6">
          
          {/* Active Filter Tags & Count */}
          <div className="flex items-center justify-between text-xs text-[#7A6C60]">
            <div>
              Showing <strong className="text-[#3D312A]">{filteredProducts.length}</strong> {filteredProducts.length === 1 ? 'handmade craft' : 'handmade crafts'}
              {activeCategory !== 'all' && (
                <span> in <strong>"{activeCategory}"</strong></span>
              )}
            </div>

            {hasActiveFilters && (
              <button
                onClick={handleResetFilters}
                className="text-[#C85A32] hover:underline font-semibold cursor-pointer"
              >
                Clear all filters
              </button>
            )}
          </div>

          {/* Grid or Empty State */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 px-4 rounded-3xl bg-[#FCFAF6] border border-[#EFE8DD]">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#F3ECE2] flex items-center justify-center text-[#9C8B7D]">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#3D312A] mb-1">
                No crafts match your filters
              </h3>
              <p className="text-xs text-[#7A6C60] max-w-sm mx-auto mb-6">
                Try widening your price range, clearing your search keywords, or selecting another category.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-6 py-2.5 bg-[#C85A32] text-white text-xs font-semibold rounded-full hover:bg-[#B84E28] transition shadow-md cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

        </main>

      </div>

    </div>
  );
};
