import React, { useState } from 'react';
import { 
  Star, 
  ShoppingBag, 
  Heart, 
  Check, 
  Truck, 
  ShieldCheck, 
  Leaf, 
  ChevronRight, 
  Sparkles, 
  MapPin, 
  Layers, 
  MessageSquare, 
  Plus, 
  Minus,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { useCraft } from '../context/CraftContext';
import { PRODUCTS } from '../data/craftData';
import { ProductCard } from '../components/ProductCard';

export const ProductDetailPage: React.FC = () => {
  const {
    selectedProductId,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setActivePage,
    setSelectedCategoryFilter,
    getProductReviews,
    addReview,
    addToast,
  } = useCraft();

  // Find selected product or fallback to first
  const product = PRODUCTS.find((p) => p.id === selectedProductId) || PRODUCTS[0];
  const reviews = getProductReviews(product.id);
  const isFavorited = isInWishlist(product.id);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'materials' | 'maker' | 'reviews'>('details');

  // New review form state
  const [authorName, setAuthorName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [isReviewSubmitting, setIsReviewSubmitting] = useState(false);

  const images = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !reviewComment.trim()) {
      addToast('Please provide your name and a brief review.', 'warn');
      return;
    }
    setIsReviewSubmitting(true);
    setTimeout(() => {
      addReview(product.id, authorName.trim(), reviewRating, reviewComment.trim());
      setAuthorName('');
      setReviewComment('');
      setIsReviewSubmitting(false);
      setActiveTab('reviews');
    }, 400);
  };

  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-[#8B7355]">
        <button
          onClick={() => setActivePage('home')}
          className="hover:text-[#3D312A] transition cursor-pointer"
        >
          Home
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <button
          onClick={() => {
            setSelectedCategoryFilter(null);
            setActivePage('shop');
          }}
          className="hover:text-[#3D312A] transition cursor-pointer"
        >
          Shop
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <button
          onClick={() => {
            setSelectedCategoryFilter(product.category);
            setActivePage('shop');
          }}
          className="hover:text-[#3D312A] transition cursor-pointer"
        >
          {product.category}
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[#3D312A] font-semibold truncate max-w-xs">
          {product.name}
        </span>
      </nav>

      {/* Main Product Showcase Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-square sm:aspect-[4/3] rounded-3xl overflow-hidden bg-[#F3ECE2] border border-[#EFE8DD] shadow-sm">
            <img
              src={images[selectedImageIndex] || product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.isBestSeller && (
              <span className="absolute top-4 left-4 inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-[#E07A5F] text-white shadow-md">
                <Sparkles className="w-3.5 h-3.5" />
                Artisan Best Seller
              </span>
            )}
          </div>

          {/* Gallery Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition shrink-0 cursor-pointer ${
                    selectedImageIndex === idx
                      ? 'border-[#C85A32] scale-102 shadow-sm'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Craft thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Artisan Guarantee Strip */}
          <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-[#FAF3EA] border border-[#EFE8DD] text-center text-xs text-[#5C4738]">
            <div className="flex flex-col items-center gap-1">
              <Leaf className="w-4 h-4 text-[#606C38]" />
              <span className="font-semibold text-[11px]">100% Sustainable</span>
            </div>
            <div className="flex flex-col items-center gap-1 border-x border-[#EFE8DD]">
              <Truck className="w-4 h-4 text-[#C85A32]" />
              <span className="font-semibold text-[11px]">Plastic-Free Mail</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-[#283618]" />
              <span className="font-semibold text-[11px]">14-Day Guarantee</span>
            </div>
          </div>
        </div>

        {/* Right Column: Purchasing & Specifications */}
        <div className="lg:col-span-5 space-y-6">
          
          <div>
            {/* Maker Badge */}
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#C85A32]">
                {product.category}
              </span>
              <span className="flex items-center gap-1 text-xs text-[#606C38] font-medium">
                <MapPin className="w-3.5 h-3.5" />
                {product.makerLocation}
              </span>
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#3D312A] leading-tight">
              {product.name}
            </h1>

            {/* Maker Byline */}
            <div className="flex items-center gap-2.5 mt-2">
              <img
                src={product.makerAvatar}
                alt={product.makerName}
                className="w-6 h-6 rounded-full object-cover border border-[#D8C7B5]"
              />
              <span className="text-xs text-[#5C4738]">
                Handcrafted by <strong>{product.makerName}</strong>
              </span>
            </div>

            {/* Rating Stars */}
            <div className="flex items-center gap-2 mt-3">
              <div className="flex text-[#DDA15E]">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? 'fill-current'
                        : 'text-[#D8C7B5]'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs font-bold text-[#3D312A]">{product.rating}</span>
              <span className="text-xs text-[#9C8B7D]">({reviews.length} customer reviews)</span>
            </div>
          </div>

          {/* Pricing */}
          <div className="p-4 rounded-2xl bg-[#FCFAF6] border border-[#EFE8DD] flex items-baseline justify-between">
            <div className="flex items-baseline gap-2.5">
              <span className="text-3xl font-bold text-[#3D312A]">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-[#9C8B7D] line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#283618]/10 text-[#283618]">
              {product.stockCount > 0 ? `In Stock: ${product.stockCount} left in this batch` : 'Made to Order'}
            </span>
          </div>

          {/* Short Narrative */}
          <p className="text-xs sm:text-sm text-[#5C4738] leading-relaxed">
            {product.description}
          </p>

          {/* Materials Preview */}
          <div className="space-y-1.5 text-xs text-[#5C4738]">
            <span className="font-semibold text-[#3D312A]">Authentic Materials:</span>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {product.materials.map((mat, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md bg-[#FAF3EA] border border-[#EFE8DD] text-[11px] font-medium text-[#5C4738]"
                >
                  {mat}
                </span>
              ))}
            </div>
          </div>

          {/* Purchasing Form: Quantity Stepper & Buttons */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3">
              {/* Stepper */}
              <div className="flex items-center border border-[#EFE8DD] rounded-xl bg-white shadow-xs">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2.5 text-[#5C4738] hover:bg-[#FAF3EA] rounded-l-xl transition cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-4 text-sm font-bold text-[#3D312A]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2.5 text-[#5C4738] hover:bg-[#FAF3EA] rounded-r-xl transition cursor-pointer"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Add to Cart button */}
              <button
                onClick={() => addToCart(product, quantity)}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#C85A32] hover:bg-[#B84E28] text-white text-sm font-semibold rounded-xl transition shadow-md shadow-[#C85A32]/25 cursor-pointer active:scale-98"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Basket • ${(product.price * quantity).toFixed(2)}</span>
              </button>

              {/* Wishlist button */}
              <button
                onClick={() => toggleWishlist(product)}
                className={`p-3 rounded-xl border border-[#EFE8DD] transition cursor-pointer ${
                  isFavorited
                    ? 'bg-[#E07A5F] text-white'
                    : 'bg-white text-[#5C4738] hover:text-[#E07A5F]'
                }`}
                title={isFavorited ? 'Remove from wishlist' : 'Save to wishlist'}
                aria-label="Wishlist toggle"
              >
                <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
              </button>
            </div>

            <div className="flex items-center justify-between text-[11px] text-[#7A6C60] pt-1">
              <span>✓ Ships in 1-3 business days</span>
              <span>✓ 85% goes directly to {product.makerName}</span>
            </div>
          </div>

        </div>

      </div>

      {/* Tabs: Craft Story, Specs, Care, and Reviews */}
      <div className="pt-8 border-t border-[#EFE8DD]">
        
        {/* Tab Headers */}
        <div className="flex border-b border-[#EFE8DD] gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('details')}
            className={`py-3 px-4 font-semibold text-xs sm:text-sm border-b-2 transition cursor-pointer whitespace-nowrap ${
              activeTab === 'details'
                ? 'border-[#C85A32] text-[#C85A32]'
                : 'border-transparent text-[#7A6C60] hover:text-[#3D312A]'
            }`}
          >
            Craft Details &amp; Story
          </button>
          <button
            onClick={() => setActiveTab('materials')}
            className={`py-3 px-4 font-semibold text-xs sm:text-sm border-b-2 transition cursor-pointer whitespace-nowrap ${
              activeTab === 'materials'
                ? 'border-[#C85A32] text-[#C85A32]'
                : 'border-transparent text-[#7A6C60] hover:text-[#3D312A]'
            }`}
          >
            Dimensions &amp; Care
          </button>
          <button
            onClick={() => setActiveTab('maker')}
            className={`py-3 px-4 font-semibold text-xs sm:text-sm border-b-2 transition cursor-pointer whitespace-nowrap ${
              activeTab === 'maker'
                ? 'border-[#C85A32] text-[#C85A32]'
                : 'border-transparent text-[#7A6C60] hover:text-[#3D312A]'
            }`}
          >
            Meet the Maker ({product.makerName})
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`py-3 px-4 font-semibold text-xs sm:text-sm border-b-2 transition cursor-pointer whitespace-nowrap ${
              activeTab === 'reviews'
                ? 'border-[#C85A32] text-[#C85A32]'
                : 'border-transparent text-[#7A6C60] hover:text-[#3D312A]'
            }`}
          >
            Customer Reviews ({reviews.length})
          </button>
        </div>

        {/* Tab Body */}
        <div className="py-8">
          
          {activeTab === 'details' && (
            <div className="space-y-4 max-w-3xl text-xs sm:text-sm text-[#5C4738] leading-relaxed">
              <h3 className="font-serif text-lg font-bold text-[#3D312A]">
                The Story Behind {product.name}
              </h3>
              <p>{product.story}</p>
              <p>{product.description}</p>
              <div className="p-4 rounded-xl bg-[#FAF3EA] border border-[#EFE8DD] text-xs space-y-1">
                <span className="font-semibold text-[#283618] block">Small-Batch Artisan Note</span>
                <p>
                  Because each item is crafted with natural raw materials without automated factory molds, slight organic variances in hue, texture, and dimension celebrate its unique authenticity.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'materials' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl text-xs sm:text-sm">
              <div className="p-5 rounded-2xl bg-[#FCFAF6] border border-[#EFE8DD] space-y-3">
                <h4 className="font-serif font-bold text-base text-[#3D312A]">
                  Specifications &amp; Dimensions
                </h4>
                <div className="space-y-2 text-[#5C4738]">
                  <div>
                    <span className="font-semibold text-[#3D312A] block">Dimensions:</span>
                    <span>{product.dimensions}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-[#3D312A] block">Materials Used:</span>
                    <ul className="list-disc list-inside space-y-0.5 pt-1">
                      {product.materials.map((m, idx) => (
                        <li key={idx}>{m}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#FCFAF6] border border-[#EFE8DD] space-y-3">
                <h4 className="font-serif font-bold text-base text-[#3D312A]">
                  Care Instructions
                </h4>
                <p className="text-[#5C4738] leading-relaxed">
                  {product.careInstructions}
                </p>
                <div className="pt-2 text-[11px] text-[#8B7355] italic">
                  Treat with loving care to preserve heirloom quality for decades to come.
                </div>
              </div>
            </div>
          )}

          {activeTab === 'maker' && (
            <div className="max-w-2xl p-6 rounded-3xl bg-[#FAF3EA] border border-[#EFE8DD] flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <img
                src={product.makerAvatar}
                alt={product.makerName}
                className="w-20 h-20 rounded-full object-cover border-2 border-white shadow-md shrink-0"
              />
              <div className="space-y-2 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 justify-center sm:justify-start">
                  <h3 className="font-serif text-lg font-bold text-[#3D312A]">
                    {product.makerName}
                  </h3>
                  <span className="text-xs text-[#606C38] font-medium flex items-center justify-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {product.makerLocation}
                  </span>
                </div>
                <p className="text-xs text-[#5C4738] leading-relaxed">
                  Passionate artisan creating original handmade treasures with sustainable materials and time-honored traditional techniques.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategoryFilter(product.category);
                    setActivePage('shop');
                  }}
                  className="text-xs font-semibold text-[#C85A32] hover:underline block pt-1"
                >
                  View all creations by this artisan &rarr;
                </button>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-8 max-w-4xl">
              
              {/* Write a review form */}
              <div className="p-6 rounded-3xl bg-[#FAF3EA] border border-[#EFE8DD]">
                <h4 className="font-serif font-bold text-base text-[#3D312A] mb-1">
                  Share Your Experience with {product.name}
                </h4>
                <p className="text-xs text-[#7A6C60] mb-4">
                  Help fellow craft lovers and support our independent artist with your feedback.
                </p>

                <form onSubmit={handleReviewSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#3D312A] mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        value={authorName}
                        onChange={(e) => setAuthorName(e.target.value)}
                        placeholder="e.g. Maya S."
                        className="w-full px-3 py-2 rounded-xl bg-white border border-[#E4D8C7] text-xs text-[#3D312A] focus:outline-none focus:ring-1 focus:ring-[#C85A32]"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#3D312A] mb-1">
                        Star Rating
                      </label>
                      <div className="flex items-center gap-1.5 pt-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setReviewRating(star)}
                            className="p-1 text-[#DDA15E] hover:scale-110 transition cursor-pointer"
                          >
                            <Star
                              className={`w-5 h-5 ${
                                star <= reviewRating ? 'fill-current' : 'text-[#D8C7B5]'
                              }`}
                            />
                          </button>
                        ))}
                        <span className="text-xs font-semibold text-[#3D312A] ml-2">
                          {reviewRating} out of 5 stars
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#3D312A] mb-1">
                      Your Review
                    </label>
                    <textarea
                      rows={3}
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      placeholder="What did you love about the craft, texture, packaging, or glaze?"
                      className="w-full px-3 py-2 rounded-xl bg-white border border-[#E4D8C7] text-xs text-[#3D312A] focus:outline-none focus:ring-1 focus:ring-[#C85A32]"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isReviewSubmitting}
                    className="px-6 py-2.5 bg-[#3D312A] hover:bg-[#2C221E] text-white text-xs font-semibold rounded-xl transition shadow-xs cursor-pointer"
                  >
                    {isReviewSubmitting ? 'Posting...' : 'Submit Review'}
                  </button>
                </form>
              </div>

              {/* Existing Reviews List */}
              <div className="space-y-4">
                <h4 className="font-serif font-bold text-lg text-[#3D312A]">
                  Verified Customer Reviews ({reviews.length})
                </h4>

                {reviews.length === 0 ? (
                  <p className="text-xs text-[#7A6C60] italic">
                    Be the first to review this artisanal creation!
                  </p>
                ) : (
                  reviews.map((rev) => (
                    <div
                      key={rev.id}
                      className="p-4 rounded-2xl bg-white border border-[#EFE8DD] shadow-xs space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-[#3D312A]">
                            {rev.author}
                          </span>
                          {rev.verifiedBuyer && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#283618] bg-[#283618]/10 px-2 py-0.5 rounded-full">
                              <CheckCircle2 className="w-3 h-3" />
                              Verified Buyer
                            </span>
                          )}
                        </div>

                        <span className="text-[11px] text-[#9C8B7D]">{rev.date}</span>
                      </div>

                      <div className="flex text-[#DDA15E]">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < rev.rating ? 'fill-current' : 'text-[#D8C7B5]'
                            }`}
                          />
                        ))}
                      </div>

                      <p className="text-xs text-[#5C4738] leading-relaxed">
                        {rev.comment}
                      </p>
                    </div>
                  ))
                )}
              </div>

            </div>
          )}

        </div>

      </div>

      {/* Related Products from same category */}
      {relatedProducts.length > 0 && (
        <div className="pt-12 border-t border-[#EFE8DD]">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs font-semibold text-[#8B7355] uppercase tracking-wider">
                Complementary Pieces
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#3D312A]">
                More in {product.category}
              </h3>
            </div>
            <button
              onClick={() => {
                setSelectedCategoryFilter(product.category);
                setActivePage('shop');
              }}
              className="text-xs font-semibold text-[#C85A32] hover:underline"
            >
              View All {product.category} &rarr;
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {relatedProducts.map((relProduct) => (
              <ProductCard key={relProduct.id} product={relProduct} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
