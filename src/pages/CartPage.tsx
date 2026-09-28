import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  Tag, 
  Truck, 
  ShieldCheck, 
  Leaf, 
  ArrowLeft,
  PackageCheck
} from 'lucide-react';
import { useCraft } from '../context/CraftContext';

export const CartPage: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
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
    openProductDetail,
    setIsCheckoutModalOpen,
  } = useCraft();

  const [promoInput, setPromoInput] = useState('');
  const [promoMsg, setPromoMsg] = useState<{ text: string; isError?: boolean } | null>(null);

  const freeShippingProgress = Math.min(100, (cartSubtotal / shippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, shippingThreshold - cartSubtotal);

  const handlePromoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyPromoCode(promoInput);
    setPromoMsg({ text: res.message, isError: !res.success });
    if (res.success) setPromoInput('');
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
            <span>Continue Shopping</span>
          </button>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#3D312A]">
            Your Craft Basket
          </h1>
          <p className="text-xs text-[#7A6C60] mt-1">
            {cart.reduce((sum, item) => sum + item.quantity, 0)} handcrafted items ready for delivery
          </p>
        </div>

        {cart.length > 0 && (
          <button
            onClick={clearCart}
            className="text-xs text-[#9C8B7D] hover:text-[#C85A32] transition font-medium self-start sm:self-auto cursor-pointer"
          >
            Clear Basket
          </button>
        )}
      </div>

      {cart.length === 0 ? (
        <div className="text-center py-20 px-4 rounded-3xl bg-[#FCFAF6] border border-[#EFE8DD]">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-[#F3ECE2] flex items-center justify-center text-[#9C8B7D]">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-[#3D312A] mb-2">
            Your craft basket is empty
          </h2>
          <p className="text-xs text-[#7A6C60] max-w-sm mx-auto mb-6">
            Explore our collections of hand-thrown pottery, botanic jewelry, crochet blankets, and soy candles.
          </p>
          <button
            onClick={() => setActivePage('shop')}
            className="px-8 py-3 bg-[#C85A32] hover:bg-[#B84E28] text-white text-xs font-semibold rounded-full transition shadow-md cursor-pointer"
          >
            Discover Handmade Crafts
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Items List (Left Column) */}
          <div className="lg:col-span-8 space-y-4">
            
            {/* Free Shipping Banner */}
            <div className="p-4 rounded-2xl bg-[#FAF3EA] border border-[#EFE8DD] text-xs">
              <div className="flex items-center justify-between text-[#5C4738] mb-2 font-medium">
                <span className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#283618]" />
                  {remainingForFreeShipping > 0 ? (
                    <span>
                      Add <strong>${remainingForFreeShipping.toFixed(2)}</strong> more to get <strong>FREE plastic-free shipping</strong>!
                    </span>
                  ) : (
                    <span className="text-[#283618] font-bold">
                      🎉 You qualified for FREE plastic-free artisan shipping!
                    </span>
                  )}
                </span>
                <span>{Math.round(freeShippingProgress)}%</span>
              </div>
              <div className="w-full h-2 bg-[#EFE8DD] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#606C38] transition-all duration-300 rounded-full"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>

            {/* Cart Items */}
            <div className="space-y-3">
              {cart.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="p-4 sm:p-5 rounded-2xl bg-[#FCFAF6] border border-[#EFE8DD] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      onClick={() => openProductDetail(product.id)}
                      className="w-20 h-20 rounded-xl object-cover bg-[#F3ECE2] shrink-0 cursor-pointer border border-[#EFE8DD]"
                    />
                    <div>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-[#8B7355]">
                        {product.category}
                      </span>
                      <h3
                        onClick={() => openProductDetail(product.id)}
                        className="font-serif text-base font-bold text-[#3D312A] hover:text-[#C85A32] transition cursor-pointer"
                      >
                        {product.name}
                      </h3>
                      <p className="text-xs text-[#7A6C60] mt-0.5">
                        Maker: {product.makerName} ({product.makerLocation})
                      </p>
                      <div className="text-xs font-semibold text-[#3D312A] sm:hidden mt-2">
                        ${product.price.toFixed(2)} each
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-0 border-[#EFE8DD]">
                    {/* Stepper */}
                    <div className="flex items-center border border-[#EFE8DD] rounded-xl bg-white shadow-xs">
                      <button
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        className="p-1.5 text-[#5C4738] hover:bg-[#FAF3EA] rounded-l-xl transition cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-xs font-bold text-[#3D312A]">
                        {quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        className="p-1.5 text-[#5C4738] hover:bg-[#FAF3EA] rounded-r-xl transition cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Line total */}
                    <div className="text-right min-w-[70px]">
                      <span className="text-sm font-bold text-[#3D312A] block">
                        ${(product.price * quantity).toFixed(2)}
                      </span>
                      <span className="hidden sm:block text-[10px] text-[#9C8B7D]">
                        ${product.price.toFixed(2)}/ea
                      </span>
                    </div>

                    {/* Remove button */}
                    <button
                      onClick={() => removeFromCart(product.id)}
                      className="p-2 text-[#9C8B7D] hover:text-[#C85A32] rounded-lg hover:bg-[#F3ECE2] transition cursor-pointer"
                      title="Remove from basket"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Order Summary (Right Column) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="p-6 rounded-3xl bg-[#FCFAF6] border border-[#EFE8DD] shadow-xs space-y-5">
              
              <h2 className="font-serif text-lg font-bold text-[#3D312A] pb-3 border-b border-[#EFE8DD]">
                Order Summary
              </h2>

              {/* Promo Code Box */}
              <div className="space-y-2">
                <span className="text-xs font-semibold text-[#3D312A] block">
                  Artisan Promo Code
                </span>
                {appliedPromo ? (
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#283618]/10 border border-[#283618]/20 text-xs">
                    <div className="flex items-center gap-1.5 text-[#283618] font-semibold">
                      <Tag className="w-3.5 h-3.5" />
                      <span>{appliedPromo} ({discountPercentage}% off)</span>
                    </div>
                    <button
                      onClick={removePromoCode}
                      className="text-xs text-[#C85A32] hover:underline font-semibold cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handlePromoSubmit} className="flex gap-2">
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder="Try AURA10 or WELCOME15"
                      className="flex-1 px-3 py-2 bg-white border border-[#EFE8DD] rounded-xl text-xs text-[#3D312A] focus:outline-none focus:ring-1 focus:ring-[#C85A32]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#3D312A] text-white text-xs font-semibold rounded-xl hover:bg-[#2C221E] transition cursor-pointer"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {promoMsg && (
                  <div className={`text-[11px] ${promoMsg.isError ? 'text-[#C85A32]' : 'text-[#283618]'}`}>
                    {promoMsg.text}
                  </div>
                )}
              </div>

              {/* Cost Calculation */}
              <div className="space-y-2.5 text-xs text-[#5C4738] pt-3 border-t border-[#EFE8DD]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#3D312A]">${cartSubtotal.toFixed(2)}</span>
                </div>
                {cartDiscountAmount > 0 && (
                  <div className="flex justify-between text-[#283618]">
                    <span>Artisan Promo Discount ({discountPercentage}%)</span>
                    <span>-${cartDiscountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Eco-Packaging &amp; Courier</span>
                  <span>{shippingFee === 0 ? <strong className="text-[#283618]">FREE</strong> : `$${shippingFee.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Tax (7.5%)</span>
                  <span>${(cartSubtotal * 0.075).toFixed(2)}</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-[#EFE8DD] text-base font-bold text-[#3D312A]">
                  <span>Total Due</span>
                  <span className="text-xl text-[#C85A32]">
                    ${(cartTotal + cartSubtotal * 0.075).toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Checkout CTA */}
              <div className="space-y-3 pt-2">
                <button
                  onClick={() => setIsCheckoutModalOpen(true)}
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#C85A32] hover:bg-[#B84E28] text-white font-semibold text-sm rounded-xl transition shadow-md shadow-[#C85A32]/25 cursor-pointer active:scale-98"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setIsCheckoutModalOpen(true)}
                  className="w-full flex items-center justify-center gap-1.5 py-2 text-xs font-semibold text-[#283618] hover:underline cursor-pointer"
                >
                  <PackageCheck className="w-3.5 h-3.5 text-[#606C38]" />
                  <span>View Backend Architecture &amp; Integration Guide</span>
                </button>
              </div>

              {/* Trust Badges */}
              <div className="pt-3 border-t border-[#EFE8DD] space-y-2 text-[11px] text-[#7A6C60]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#283618]" />
                  <span>Encrypted 256-Bit SSL Checkout</span>
                </div>
                <div className="flex items-center gap-2">
                  <Leaf className="w-4 h-4 text-[#606C38]" />
                  <span>Plastic-Free Recycled Packaging</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      )}

    </div>
  );
};
