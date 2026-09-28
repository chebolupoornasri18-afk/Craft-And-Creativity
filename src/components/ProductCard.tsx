import React from 'react';
import { Heart, ShoppingBag, Eye, Star, Sparkles, MapPin } from 'lucide-react';
import { Product } from '../types';
import { useCraft } from '../context/CraftContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    openProductDetail,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setQuickViewProduct,
  } = useCraft();

  const isFavorited = isInWishlist(product.id);

  return (
    <div className="group relative bg-[#FCFAF6] rounded-2xl border border-[#EFE8DD] overflow-hidden hover:shadow-xl hover:shadow-[#3D312A]/5 hover:border-[#D8C7B5] transition-all duration-300 flex flex-col">
      {/* Product Image Box */}
      <div className="relative aspect-square w-full overflow-hidden bg-[#F3ECE2]">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isBestSeller && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#E07A5F] text-white shadow-sm">
              <Sparkles className="w-3 h-3" />
              Best Seller
            </span>
          )}
          {product.isNew && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#283618] text-[#F4F6F0] shadow-sm">
              New Batch
            </span>
          )}
          {product.badges && product.badges.length > 0 && !product.isBestSeller && !product.isNew && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium bg-white/90 backdrop-blur-sm text-[#5C4738] border border-[#EFE8DD] shadow-sm">
              {product.badges[0]}
            </span>
          )}
        </div>

        {/* Quick Action Floating Buttons (Wishlist & Quick View) */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product);
            }}
            className={`p-2 rounded-full transition shadow-md backdrop-blur-sm cursor-pointer ${
              isFavorited
                ? 'bg-[#E07A5F] text-white'
                : 'bg-white/85 text-[#5C4738] hover:bg-white hover:text-[#E07A5F]'
            }`}
            title={isFavorited ? 'Remove from wishlist' : 'Save to wishlist'}
            aria-label="Wishlist toggle"
          >
            <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            className="p-2 rounded-full bg-white/85 text-[#5C4738] hover:bg-white hover:text-[#283618] transition shadow-md backdrop-blur-sm opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
            title="Quick view product details"
            aria-label="Quick view"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Click to open details overlay */}
        <div
          onClick={() => openProductDetail(product.id)}
          className="absolute inset-0 cursor-pointer"
          aria-hidden="true"
        />
      </div>

      {/* Product Content Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Maker line */}
          <div className="flex items-center justify-between text-xs text-[#8B7355] mb-1.5">
            <span className="uppercase tracking-wider font-semibold text-[10px]">
              {product.category}
            </span>
            <span className="flex items-center gap-1 text-[11px] text-[#606C38] font-medium">
              <MapPin className="w-3 h-3" />
              {product.makerName.split(' ')[0]}
            </span>
          </div>

          {/* Product Title */}
          <h3
            onClick={() => openProductDetail(product.id)}
            className="font-serif text-base sm:text-lg font-semibold text-[#3D312A] line-clamp-1 group-hover:text-[#C85A32] transition cursor-pointer"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-1.5">
            <div className="flex items-center text-[#DDA15E]">
              <Star className="w-3.5 h-3.5 fill-current" />
            </div>
            <span className="text-xs font-semibold text-[#3D312A]">{product.rating}</span>
            <span className="text-xs text-[#9C8B7D]">({product.reviewCount})</span>
          </div>

          {/* Short description teaser */}
          <p className="text-xs text-[#7A6C60] line-clamp-2 mt-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Price & Add to Cart row */}
        <div className="mt-4 pt-3 border-t border-[#EFE8DD] flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-bold text-[#3D312A]">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-[#9C8B7D] line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            <span className="text-[10px] text-[#283618] block font-medium">
              {product.stockCount > 0 ? `In Stock (${product.stockCount} left)` : 'Made to Order'}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => openProductDetail(product.id)}
              className="px-2.5 py-2 text-xs font-medium text-[#5C4738] hover:text-[#3D312A] hover:bg-[#F3ECE2] rounded-lg transition"
            >
              Details
            </button>
            <button
              onClick={() => addToCart(product, 1)}
              className="flex items-center gap-1.5 px-3 py-2 bg-[#3D312A] hover:bg-[#C85A32] text-white text-xs font-semibold rounded-xl shadow-sm transition-all duration-200 cursor-pointer active:scale-95"
              title="Add to cart"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
