import React, { useState } from 'react';
import { X, Star, ShoppingBag, Heart, Check, ArrowRight, ShieldCheck } from 'lucide-react';
import { useCraft } from '../context/CraftContext';

export const QuickViewModal: React.FC = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    toggleWishlist,
    isInWishlist,
    openProductDetail,
  } = useCraft();

  const [quantity, setQuantity] = useState(1);
  const [selectedImgIndex, setSelectedImgIndex] = useState(0);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const isFavorited = isInWishlist(product.id);
  const images = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setQuickViewProduct(null);
  };

  const handleFullDetail = () => {
    setQuickViewProduct(null);
    openProductDetail(product.id);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={() => setQuickViewProduct(null)}
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
      />

      <div className="min-h-full flex items-center justify-center p-4">
        <div className="relative bg-[#FCFAF6] rounded-3xl max-w-3xl w-full border border-[#EFE8DD] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          
          {/* Close button */}
          <button
            onClick={() => setQuickViewProduct(null)}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white text-[#5C4738] shadow-sm transition cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            
            {/* Image Gallery */}
            <div className="p-6 bg-[#F3ECE2] flex flex-col justify-between">
              <div className="aspect-square rounded-2xl overflow-hidden bg-white shadow-xs">
                <img
                  src={images[selectedImgIndex] || product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {images.length > 1 && (
                <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImgIndex(idx)}
                      className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition shrink-0 cursor-pointer ${
                        selectedImgIndex === idx
                          ? 'border-[#C85A32] scale-105'
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details Panel */}
            <div className="p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-[#8B7355] uppercase tracking-wider mb-1">
                  <span>{product.category}</span>
                  <span>•</span>
                  <span>By {product.makerName}</span>
                </div>

                <h3 className="font-serif text-2xl font-bold text-[#3D312A] mb-2 leading-snug">
                  {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
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
                  <span className="text-xs font-semibold text-[#3D312A]">{product.rating}</span>
                  <span className="text-xs text-[#9C8B7D]">({product.reviewCount} reviews)</span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-2xl font-bold text-[#3D312A]">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-[#9C8B7D] line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                  <span className="ml-2 text-xs font-medium text-[#283618] bg-[#283618]/10 px-2 py-0.5 rounded-full">
                    {product.stockCount} in stock
                  </span>
                </div>

                {/* Short Description */}
                <p className="text-xs text-[#5C4738] leading-relaxed mb-4">
                  {product.description}
                </p>

                {/* Materials Bullet Points */}
                <div className="text-xs text-[#7A6C60] space-y-1 mb-6">
                  <span className="font-semibold text-[#3D312A] block mb-1">Crafted with:</span>
                  {product.materials.slice(0, 2).map((m, idx) => (
                    <div key={idx} className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#606C38]" />
                      <span>{m}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quantity and Actions */}
              <div className="space-y-3 pt-4 border-t border-[#EFE8DD]">
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-[#EFE8DD] rounded-xl bg-white">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 text-sm text-[#5C4738] hover:bg-[#F3ECE2] rounded-l-xl transition"
                    >
                      -
                    </button>
                    <span className="px-3 text-sm font-semibold text-[#3D312A]">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-2 text-sm text-[#5C4738] hover:bg-[#F3ECE2] rounded-r-xl transition"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-[#C85A32] text-white text-xs sm:text-sm font-semibold rounded-xl hover:bg-[#B84E28] transition shadow-md shadow-[#C85A32]/20 cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Basket • ${(product.price * quantity).toFixed(2)}</span>
                  </button>

                  <button
                    onClick={() => toggleWishlist(product)}
                    className={`p-2.5 rounded-xl border border-[#EFE8DD] transition cursor-pointer ${
                      isFavorited
                        ? 'bg-[#E07A5F] text-white'
                        : 'bg-white text-[#5C4738] hover:text-[#E07A5F]'
                    }`}
                    title="Toggle wishlist"
                  >
                    <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
                  </button>
                </div>

                <button
                  onClick={handleFullDetail}
                  className="w-full text-center text-xs font-semibold text-[#8B7355] hover:text-[#C85A32] flex items-center justify-center gap-1 hover:underline pt-1"
                >
                  <span>View full artisan story, dimensions &amp; care guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
