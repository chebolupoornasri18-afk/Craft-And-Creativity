export interface Product {
  id: string;
  name: string;
  category: string;
  categorySlug: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  gallery: string[];
  description: string;
  story: string;
  materials: string[];
  dimensions: string;
  careInstructions: string;
  makerName: string;
  makerLocation: string;
  makerAvatar: string;
  inStock: boolean;
  stockCount: number;
  featured: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
  tags: string[];
  badges: string[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  itemCount: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  avatar?: string;
  rating: number;
  date: string;
  comment: string;
  verifiedBuyer: boolean;
  helpfulCount?: number;
}

export interface FilterState {
  search: string;
  category: string;
  minPrice: number;
  maxPrice: number;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';
  inStockOnly: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  avatar: string;
  comment: string;
  rating: number;
  productName: string;
  image?: string;
}

export interface Artisan {
  id: string;
  name: string;
  craft: string;
  location: string;
  avatar: string;
  bio: string;
  experienceYears: number;
  quote: string;
}
