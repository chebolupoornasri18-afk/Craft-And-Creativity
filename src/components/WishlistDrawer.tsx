import React from 'react';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useCraft } from '../context/CraftContext';

export const WishlistDrawer: React.FC = () => {
  const {
    isWishlistOpen,
    setIsWishlistOpen,
    wishlist,
    toggleWishlist,
    addToCart,
    openProductDetail,
    setActivePage,
  } = useCraft();

  if (!isWishlistOpen) return null;

  const handleMoveAllToCart = () => {
    wishlist.forEach((prod) => addToCart(prod, 1));
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={() => setIsWishlistOpen(false)}
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FCFAF6] shadow-2xl flex flex-col border-l border-[#EFE8DD]">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-[#EFE8DD] flex items-center justify-between bg-[#F7F3EE]">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-[#E07A5F] fill-current" />
              <h2 className="font-serif text-lg font-bold text-[#3D312A]">Your Wishlist</h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#EADBC8] text-[#5C4738] font-semibold">
                {wishlist.length} saved
              </span>
            </div>
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="p-1.5 rounded-lg text-[#5C4738] hover:bg-[#EFE8DD] transition cursor-pointer"
              aria-label="Close wishlist"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
            {wishlist.length === 0 ? (
              <div className="text-center py-16 px-4">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#F3ECE2] flex items-center justify-center text-[#9C8B7D]">
                  <Heart className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-[#3D312A] mb-1">
                  Your wishlist is empty
                </h3>
                <p className="text-xs text-[#7A6C60] max-w-xs mx-auto mb-6">
                  Save pieces you love while browsing to purchase later or share with loved ones.
                </p>
                <button
                  onClick={() => {
                    setIsWishlistOpen(false);
                    setActivePage('shop');
                  }}
                  className="px-6 py-2.5 bg-[#C85A32] text-white text-xs font-semibold rounded-full hover:bg-[#B84E28] transition shadow-md"
                >
                  Discover Crafts
                </button>
              </div>
            ) : (
              wishlist.map((product) => (
                <div
                  key={product.id}
                  className="flex gap-3.5 p-3 rounded-xl bg-white border border-[#EFE8DD] shadow-xs"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-20 rounded-lg object-cover bg-[#F3ECE2] shrink-0 cursor-pointer"
                    onClick={() => {
                      setIsWishlistOpen(false);
                      openProductDetail(product.id);
                    }}
                  />

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4
                          onClick={() => {
                            setIsWishlistOpen(false);
                            openProductDetail(product.id);
                          }}
                          className="font-medium text-xs sm:text-sm text-[#3D312A] hover:text-[#C85A32] line-clamp-1 cursor-pointer"
                        >
                          {product.name}
                        </h4>
                        <button
                          onClick={() => toggleWishlist(product)}
                          className="text-[#9C8B7D] hover:text-[#C85A32] p-1 transition cursor-pointer"
                          title="Remove from wishlist"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[11px] text-[#8B7355] mt-0.5">
                        {product.category} • by {product.makerName}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-1 border-t border-[#F7F3EE]">
                      <span className="text-sm font-bold text-[#3D312A]">
                        ${product.price.toFixed(2)}
                      </span>

                      <button
                        onClick={() => {
                          addToCart(product, 1);
                        }}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-[#3D312A] hover:bg-[#C85A32] text-white text-xs font-medium rounded-lg shadow-xs transition cursor-pointer"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>Move to Basket</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Bottom Actions */}
          {wishlist.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-[#EFE8DD] bg-[#FAF3EA]/70 space-y-2">
              <button
                onClick={handleMoveAllToCart}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#283618] hover:bg-[#1E2912] text-white text-xs font-semibold rounded-xl transition shadow-sm cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Move All ({wishlist.length}) to Basket</span>
              </button>

              <button
                onClick={() => {
                  setIsWishlistOpen(false);
                  setActivePage('wishlist');
                }}
                className="w-full py-2 text-xs font-medium text-[#5C4738] hover:text-[#3D312A] text-center block hover:underline"
              >
                View Full Wishlist Page
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
