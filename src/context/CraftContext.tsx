import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Review } from '../types';
import { PRODUCTS, INITIAL_REVIEWS } from '../data/craftData';

export type PageView = 'home' | 'shop' | 'product-detail' | 'about' | 'contact' | 'wishlist' | 'cart';

interface Toast {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'warn';
  actionLabel?: string;
  onAction?: () => void;
}

interface CraftContextType {
  // Navigation & Page State
  activePage: PageView;
  setActivePage: (page: PageView) => void;
  selectedProductId: string | null;
  openProductDetail: (productId: string) => void;
  selectedCategoryFilter: string | null;
  setSelectedCategoryFilter: (categoryName: string | null) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalCartItems: number;
  cartSubtotal: number;
  shippingThreshold: number;
  shippingFee: number;
  cartDiscountAmount: number;
  cartTotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  // Promo Code
  promoCode: string;
  appliedPromo: string | null;
  discountPercentage: number;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;

  // Wishlist
  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;

  // Quick View Modal
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;

  // Checkout & Backend Explanation Modal
  isCheckoutModalOpen: boolean;
  setIsCheckoutModalOpen: (open: boolean) => void;

  // Reviews
  reviews: Review[];
  addReview: (productId: string, author: string, rating: number, comment: string) => void;
  getProductReviews: (productId: string) => Review[];

  // Toasts
  toasts: Toast[];
  addToast: (message: string, type?: 'success' | 'info' | 'warn', actionLabel?: string, onAction?: () => void) => void;
  removeToast: (id: string) => void;
}

const CraftContext = createContext<CraftContextType | undefined>(undefined);

export const CraftProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation State
  const [activePage, setActivePage] = useState<PageView>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>('pottery-1');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string | null>(null);

  // Modals / Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  // Toasts
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Cart Persistence
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('craftaura_cart');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    // Seed with 1 initial sample item so new visitors see a populated shopping experience
    const initialItem = PRODUCTS[0];
    return initialItem ? [{ product: initialItem, quantity: 1 }] : [];
  });

  // Wishlist Persistence
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('craftaura_wishlist');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [PRODUCTS[2]]; // Julian's silver pendant initially saved
  });

  // Reviews State
  const [reviews, setReviews] = useState<Review[]>(() => {
    try {
      const saved = localStorage.getItem('craftaura_reviews');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_REVIEWS;
  });

  // Promo Code
  const [appliedPromo, setAppliedPromo] = useState<string | null>('AURA10');
  const [discountPercentage, setDiscountPercentage] = useState<number>(10);
  const [promoCode, setPromoCode] = useState<string>('AURA10');

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('craftaura_cart', JSON.stringify(cart));
    } catch (e) {
      console.warn('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  // Sync wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('craftaura_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.warn('Failed to save wishlist to localStorage', e);
    }
  }, [wishlist]);

  // Sync reviews to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('craftaura_reviews', JSON.stringify(reviews));
    } catch (e) {
      console.warn('Failed to save reviews to localStorage', e);
    }
  }, [reviews]);

  // Toast System
  const addToast = (
    message: string,
    type: 'success' | 'info' | 'warn' = 'success',
    actionLabel?: string,
    onAction?: () => void
  ) => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    const newToast: Toast = { id, message, type, actionLabel, onAction };
    setToasts((prev) => [...prev.slice(-3), newToast]); // keep max 4 toasts
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Cart operations
  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });

    addToast(
      `Added "${product.name}" to cart!`,
      'success',
      'View Cart',
      () => setIsCartOpen(true)
    );
  };

  const removeFromCart = (productId: string) => {
    const item = cart.find((i) => i.product.id === productId);
    setCart((prev) => prev.filter((i) => i.product.id !== productId));
    if (item) {
      addToast(`Removed "${item.product.name}" from your cart.`, 'info');
    }
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    addToast('Your cart has been cleared.', 'info');
  };

  // Wishlist operations
  const toggleWishlist = (product: Product) => {
    const exists = wishlist.some((item) => item.id === product.id);
    if (exists) {
      setWishlist((prev) => prev.filter((item) => item.id !== product.id));
      addToast(`Removed "${product.name}" from your wishlist.`, 'info');
    } else {
      setWishlist((prev) => [...prev, product]);
      addToast(
        `Saved "${product.name}" to your wishlist!`,
        'success',
        'View Wishlist',
        () => setIsWishlistOpen(true)
      );
    }
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((item) => item.id === productId);
  };

  // Promo Code Operations
  const applyPromoCode = (code: string) => {
    const cleaned = code.trim().toUpperCase();
    if (cleaned === 'AURA10') {
      setAppliedPromo('AURA10');
      setDiscountPercentage(10);
      setPromoCode('AURA10');
      addToast('Promo code AURA10 applied: 10% discount!', 'success');
      return { success: true, message: '10% discount applied!' };
    }
    if (cleaned === 'WELCOME15' || cleaned === 'CRAFT15') {
      setAppliedPromo(cleaned);
      setDiscountPercentage(15);
      setPromoCode(cleaned);
      addToast(`${cleaned} applied: 15% artisan discount!`, 'success');
      return { success: true, message: '15% discount applied!' };
    }
    if (cleaned === 'EARTH20') {
      setAppliedPromo('EARTH20');
      setDiscountPercentage(20);
      setPromoCode('EARTH20');
      addToast('Eco-Craft promo EARTH20 applied: 20% discount!', 'success');
      return { success: true, message: '20% discount applied!' };
    }
    return { success: false, message: 'Invalid code. Try "AURA10" or "WELCOME15"' };
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    setDiscountPercentage(0);
    setPromoCode('');
    addToast('Promo discount removed.', 'info');
  };

  // Product Navigation
  const openProductDetail = (productId: string) => {
    setSelectedProductId(productId);
    setActivePage('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reviews
  const addReview = (productId: string, author: string, rating: number, comment: string) => {
    const newRev: Review = {
      id: 'rev-' + Date.now(),
      productId,
      author,
      rating,
      date: 'Just now',
      comment,
      verifiedBuyer: true,
      helpfulCount: 0,
    };
    setReviews((prev) => [newRev, ...prev]);
    addToast('Thank you for sharing your review with our artisan community!', 'success');
  };

  const getProductReviews = (productId: string) => {
    return reviews.filter((r) => r.productId === productId);
  };

  // Totals calculations
  const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
  const shippingThreshold = 50;
  const shippingFee = cartSubtotal >= shippingThreshold || cartSubtotal === 0 ? 0 : 5.99;
  const cartDiscountAmount = (cartSubtotal * discountPercentage) / 100;
  const cartTotal = Math.max(0, cartSubtotal - cartDiscountAmount + shippingFee);

  return (
    <CraftContext.Provider
      value={{
        activePage,
        setActivePage: (p) => {
          setActivePage(p);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        },
        selectedProductId,
        openProductDetail,
        selectedCategoryFilter,
        setSelectedCategoryFilter,

        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalCartItems,
        cartSubtotal,
        shippingThreshold,
        shippingFee,
        cartDiscountAmount,
        cartTotal,
        isCartOpen,
        setIsCartOpen,

        promoCode,
        appliedPromo,
        discountPercentage,
        applyPromoCode,
        removePromoCode,

        wishlist,
        toggleWishlist,
        isInWishlist,
        isWishlistOpen,
        setIsWishlistOpen,

        quickViewProduct,
        setQuickViewProduct,

        isCheckoutModalOpen,
        setIsCheckoutModalOpen,

        reviews,
        addReview,
        getProductReviews,

        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </CraftContext.Provider>
  );
};

export const useCraft = () => {
  const context = useContext(CraftContext);
  if (!context) {
    throw new Error('useCraft must be used within a CraftProvider');
  }
  return context;
};
