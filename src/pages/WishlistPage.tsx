import React from 'react';
import { Heart, ShoppingBag, Trash2, ArrowLeft, ArrowRight } from 'lucide-react';
import { useCraft } from '../context/CraftContext';

export const WishlistPage: React.FC = () => {
  const {
    wishlist,
    toggleWishlist,
    addToCart,
    openProductDetail,
    setActivePage,
  } = useCraft();

  const handleMoveAllToCart = () => {
    wishlist.forEach((prod) => addToCart(prod, 1));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#EFE8DD]">
        <div>
          <button
            onClick={() => setActivePage('shop')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8B7355] hover:text-[#C85A32] mb-2 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Shop</span>
          </button>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#3D312A]">
            My Saved Pieces ({wishlist.length})
          </h1>
          <p className="text-xs text-[#7A6C60] mt-1">
            Artisanal crafts you've saved for future gifting or personal home decorating.
          </p>
        </div>

        {wishlist.length > 0 && (
          <button
            onClick={handleMoveAllToCart}
            className="px-5 py-2.5 bg-[#283618] hover:bg-[#1E2912] text-white text-xs font-semibold rounded-full shadow-xs transition flex items-center gap-2 cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Move All to Basket</span>
          </button>
        )}
      </div>

      {wishlist.length === 0 ? (
        <div className="text-center py-20 px-4 rounded-3xl bg-[#FCFAF6] border border-[#EFE8DD]">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-[#F3ECE2] flex items-center justify-center text-[#9C8B7D]">
            <Heart className="w-10 h-10" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-[#3D312A] mb-2">
            Your wishlist is empty
          </h2>
          <p className="text-xs text-[#7A6C60] max-w-sm mx-auto mb-6">
            Click the heart icon on any handmade product card to save it for later.
          </p>
          <button
            onClick={() => setActivePage('shop')}
            className="px-8 py-3 bg-[#C85A32] hover:bg-[#B84E28] text-white text-xs font-semibold rounded-full transition shadow-md cursor-pointer"
          >
            Discover Handmade Crafts
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map((product) => (
            <div
              key={product.id}
              className="bg-[#FCFAF6] rounded-2xl border border-[#EFE8DD] overflow-hidden shadow-xs hover:shadow-md transition flex flex-col justify-between"
            >
              <div className="relative aspect-square bg-[#F3ECE2]">
                <img
                  src={product.image}
                  alt={product.name}
                  onClick={() => openProductDetail(product.id)}
                  className="w-full h-full object-cover cursor-pointer"
                />
                <button
                  onClick={() => toggleWishlist(product)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-white/90 text-[#E07A5F] hover:bg-white shadow-sm transition cursor-pointer"
                  title="Remove from wishlist"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <span className="text-[10px] font-semibold text-[#8B7355] uppercase tracking-wider">
                    {product.category}
                  </span>
                  <h3
                    onClick={() => openProductDetail(product.id)}
                    className="font-serif text-base font-bold text-[#3D312A] hover:text-[#C85A32] line-clamp-1 cursor-pointer"
                  >
                    {product.name}
                  </h3>
                  <p className="text-xs text-[#7A6C60] mt-0.5">
                    By {product.makerName}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#EFE8DD] flex items-center justify-between">
                  <span className="text-base font-bold text-[#3D312A]">
                    ${product.price.toFixed(2)}
                  </span>
                  <button
                    onClick={() => addToCart(product, 1)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-[#3D312A] hover:bg-[#C85A32] text-white text-xs font-semibold rounded-xl transition cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Move to Basket</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
