import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Tag, 
  ShieldCheck, 
  Truck,
  Leaf
} from 'lucide-react';
import { useCraft } from '../context/CraftContext';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    shippingFee,
    shippingThreshold,
    cartDiscountAmount,
    cartTotal,
    appliedPromo,
    discountPercentage,
    applyPromoCode,
    removePromoCode,
    setActivePage,
    setIsCheckoutModalOpen,
  } = useCraft();

  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ text: string; isError?: boolean } | null>(null);

  if (!isCartOpen) return null;

  const freeShippingProgress = Math.min(100, (cartSubtotal / shippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, shippingThreshold - cartSubtotal);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyPromoCode(promoInput);
    setPromoMessage({ text: res.message, isError: !res.success });
    if (res.success) {
      setPromoInput('');
    }
  };

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    setIsCheckoutModalOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={() => setIsCartOpen(false)}
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FCFAF6] shadow-2xl flex flex-col border-l border-[#EFE8DD]">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-[#EFE8DD] flex items-center justify-between bg-[#F7F3EE]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#C85A32]" />
              <h2 className="font-serif text-lg font-bold text-[#3D312A]">Your Craft Basket</h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#EADBC8] text-[#5C4738] font-semibold">
                {cart.reduce((sum, item) => sum + item.quantity, 0)} items
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-lg text-[#5C4738] hover:bg-[#EFE8DD] transition cursor-pointer"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="px-5 py-3 bg-[#FAF3EA] border-b border-[#EFE8DD] text-xs">
            <div className="flex items-center justify-between text-[#5C4738] mb-1.5 font-medium">
              <span className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-[#283618]" />
                {remainingForFreeShipping > 0 ? (
                  <span>
                    Add <strong>${remainingForFreeShipping.toFixed(2)}</strong> more for <strong>FREE artisan shipping</strong>!
                  </span>
                ) : (
                  <span className="text-[#283618] font-bold flex items-center gap-1">
                    🎉 You've unlocked FREE plastic-free shipping!
                  </span>
                )}
              </span>
              <span>{Math.round(freeShippingProgress)}%</span>
            </div>
            <div className="w-full h-1.5 bg-[#EFE8DD] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#606C38] transition-all duration-300 rounded-full"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 px-4">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#F3ECE2] flex items-center justify-center text-[#9C8B7D]">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-[#3D312A] mb-1">
                  Your basket is empty
                </h3>
                <p className="text-xs text-[#7A6C60] max-w-xs mx-auto mb-6">
                  Every item you purchase directly supports independent potters, weavers, and artists.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setActivePage('shop');
                  }}
                  className="px-6 py-2.5 bg-[#C85A32] text-white text-xs font-semibold rounded-full hover:bg-[#B84E28] transition shadow-md"
                >
                  Explore Handmade Crafts
                </button>
              </div>
            ) : (
              cart.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="flex gap-3.5 p-3 rounded-xl bg-white border border-[#EFE8DD] shadow-xs"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-20 rounded-lg object-cover bg-[#F3ECE2] shrink-0"
                  />

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 
                          onClick={() => {
                            setIsCartOpen(false);
                            setActivePage('product-detail');
                          }}
                          className="font-medium text-xs sm:text-sm text-[#3D312A] hover:text-[#C85A32] line-clamp-1 cursor-pointer"
                        >
                          {product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(product.id)}
                          className="text-[#9C8B7D] hover:text-[#C85A32] p-1 transition cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[11px] text-[#8B7355] mt-0.5">
                        By {product.makerName}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-1 border-t border-[#F7F3EE]">
                      <div className="flex items-center border border-[#EFE8DD] rounded-lg bg-[#FAF3EA]">
                        <button
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          className="p-1 hover:bg-[#EFE8DD] text-[#5C4738] rounded-l-lg transition"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-semibold text-[#3D312A]">
                          {quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          className="p-1 hover:bg-[#EFE8DD] text-[#5C4738] rounded-r-lg transition"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-xs sm:text-sm font-bold text-[#3D312A]">
                          ${(product.price * quantity).toFixed(2)}
                        </span>
                        {quantity > 1 && (
                          <span className="block text-[10px] text-[#9C8B7D]">
                            ${product.price.toFixed(2)} each
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Order Summary */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-[#EFE8DD] bg-[#FAF3EA]/70 space-y-3">
              {/* Promo Code Input */}
              <div className="space-y-1">
                {appliedPromo ? (
                  <div className="flex items-center justify-between px-3 py-1.5 bg-[#283618]/10 border border-[#283618]/20 rounded-lg text-xs">
                    <div className="flex items-center gap-1.5 text-[#283618] font-medium">
                      <Tag className="w-3.5 h-3.5" />
                      <span>Code <strong>{appliedPromo}</strong> applied ({discountPercentage}% off)</span>
                    </div>
                    <button
                      onClick={removePromoCode}
                      className="text-xs text-[#C85A32] hover:underline font-semibold cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder="Promo code (try AURA10)"
                      className="flex-1 px-3 py-1.5 bg-white border border-[#EFE8DD] rounded-lg text-xs text-[#3D312A] placeholder-[#9C8B7D] focus:outline-none focus:ring-1 focus:ring-[#C85A32]"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 bg-[#3D312A] text-white text-xs font-medium rounded-lg hover:bg-[#2C221E] transition"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {promoMessage && (
                  <div className={`text-[11px] ${promoMessage.isError ? 'text-[#C85A32]' : 'text-[#283618]'}`}>
                    {promoMessage.text}
                  </div>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1 text-xs text-[#5C4738] pt-1 border-t border-[#EFE8DD]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#3D312A]">${cartSubtotal.toFixed(2)}</span>
                </div>
                {cartDiscountAmount > 0 && (
                  <div className="flex justify-between text-[#283618]">
                    <span>Artisan Discount ({discountPercentage}%)</span>
                    <span>-${cartDiscountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Plastic-Free Eco Shipping</span>
                  <span>{shippingFee === 0 ? <strong className="text-[#283618]">FREE</strong> : `$${shippingFee.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[#EFE8DD] text-sm font-bold text-[#3D312A]">
                  <span>Estimated Total</span>
                  <span className="text-base text-[#C85A32]">${cartTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 space-y-2">
                <button
                  onClick={handleCheckoutClick}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-[#C85A32] text-white text-sm font-semibold rounded-xl hover:bg-[#B84E28] transition shadow-md shadow-[#C85A32]/20 cursor-pointer active:scale-98"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setActivePage('cart');
                  }}
                  className="w-full py-2 text-xs font-medium text-[#5C4738] hover:text-[#3D312A] text-center block hover:underline"
                >
                  View Full Cart &amp; Details
                </button>
              </div>

              {/* Trust Badges */}
              <div className="flex items-center justify-center gap-4 text-[10px] text-[#7A6C60] pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#283618]" />
                  Secure SSL Checkout
                </span>
                <span className="flex items-center gap-1">
                  <Leaf className="w-3.5 h-3.5 text-[#606C38]" />
                  Direct Artist Royalties
                </span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
