import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Heart, 
  Leaf, 
  ShieldCheck, 
  Star, 
  CheckCircle2, 
  Compass, 
  Layers,
  MapPin,
  Clock,
  Award
} from 'lucide-react';
import { useCraft } from '../context/CraftContext';
import { CATEGORIES, PRODUCTS, ARTISANS, TESTIMONIALS } from '../data/craftData';
import { ProductCard } from '../components/ProductCard';

export const HomePage: React.FC = () => {
  const { setActivePage, setSelectedCategoryFilter, openProductDetail } = useCraft();

  const featuredProducts = PRODUCTS.filter((p) => p.featured).slice(0, 8);

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategoryFilter(categoryName);
    setActivePage('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-20 pb-16">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#FAF3EA] via-[#FDFBF7] to-[#FCFAF6] pt-12 pb-20 md:pt-16 md:pb-28 border-b border-[#EFE8DD]">
        {/* Soft background ambient shapes */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#E07A5F]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 right-10 w-80 h-80 bg-[#606C38]/10 rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EADBC8] border border-[#D8C7B5] text-[#5C4738] text-xs font-semibold uppercase tracking-wider shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#C85A32]" />
                <span>Celebrating Independent Artisans</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#3D312A] leading-[1.12]">
                Handmade with Love, <br />
                <span className="italic font-normal text-[#C85A32]">Crafted with Care.</span>
              </h1>

              <p className="text-base sm:text-lg text-[#6E5D50] max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Discover soulful pottery, botanical silver jewelry, cozy merino crochet, and hand-poured soy candles. Every single piece is shaped by human hands to bring authentic warmth and character into your home.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => {
                    setSelectedCategoryFilter(null);
                    setActivePage('shop');
                  }}
                  className="w-full sm:w-auto px-8 py-3.5 bg-[#C85A32] hover:bg-[#B84E28] text-white font-semibold text-sm rounded-full shadow-lg shadow-[#C85A32]/25 transition duration-200 flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  <span>Shop Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href="#categories"
                  className="w-full sm:w-auto px-7 py-3.5 bg-white border border-[#D8C7B5] hover:bg-[#FAF3EA] text-[#3D312A] font-medium text-sm rounded-full shadow-xs transition duration-200 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Compass className="w-4 h-4 text-[#606C38]" />
                  <span>Explore Crafts</span>
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 border-t border-[#EFE8DD] grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0 text-left">
                <div>
                  <div className="font-serif text-xl sm:text-2xl font-bold text-[#3D312A]">150+</div>
                  <div className="text-[11px] text-[#7A6C60]">Independent Makers</div>
                </div>
                <div>
                  <div className="font-serif text-xl sm:text-2xl font-bold text-[#3D312A]">100%</div>
                  <div className="text-[11px] text-[#7A6C60]">Artisan Handcrafted</div>
                </div>
                <div>
                  <div className="font-serif text-xl sm:text-2xl font-bold text-[#3D312A]">0%</div>
                  <div className="text-[11px] text-[#7A6C60]">Plastic Packaging</div>
                </div>
              </div>

            </div>

            {/* Right Visual Composition Column */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                
                {/* Main Hero Card */}
                <div className="rounded-3xl overflow-hidden bg-white p-3 shadow-2xl shadow-[#3D312A]/10 border border-[#EFE8DD] transform -rotate-1 hover:rotate-0 transition-transform duration-500">
                  <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-[#F3ECE2]">
                    <img
                      src="https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1000&q=80"
                      alt="Artisan ceramicist shaping clay on wheel"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <span className="text-[10px] font-semibold tracking-widest uppercase bg-[#E07A5F] px-2.5 py-1 rounded-full">
                        Artisan Studio Spotlight
                      </span>
                      <h3 className="font-serif text-lg font-bold mt-1 text-white">
                        Elena Rostova throwing stoneware in Asheville
                      </h3>
                      <p className="text-xs text-[#FAF3EA]/90 mt-0.5">
                        High-fire terracotta pottery &amp; reactive oatmeal glazes
                      </p>
                    </div>
                  </div>
                </div>

                {/* Floating Product Highlight Card 1 */}
                <div 
                  onClick={() => openProductDetail('pottery-1')}
                  className="absolute -top-6 -left-6 sm:-left-8 bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-[#EFE8DD] flex items-center gap-3 cursor-pointer hover:scale-105 transition-transform"
                >
                  <img
                    src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=150&q=80"
                    alt="Sun-Drenched Terracotta Morning Mug"
                    className="w-12 h-12 rounded-xl object-cover"
                  />
                  <div>
                    <span className="text-[10px] text-[#8B7355] font-semibold block">Best Seller</span>
                    <span className="text-xs font-bold text-[#3D312A] block">Morning Mug</span>
                    <span className="text-xs font-bold text-[#C85A32]">$38.00</span>
                  </div>
                </div>

                {/* Floating Product Highlight Card 2 */}
                <div 
                  onClick={() => openProductDetail('candles-1')}
                  className="absolute -bottom-6 -right-6 bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-[#EFE8DD] flex items-center gap-3 cursor-pointer hover:scale-105 transition-transform"
                >
                  <img
                    src="https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=150&q=80"
                    alt="Wild Fig Soy Candle"
                    className="w-12 h-12 rounded-xl object-cover"
                  />
                  <div>
                    <span className="text-[10px] text-[#283618] font-semibold block">Wood-Wick Soy</span>
                    <span className="text-xs font-bold text-[#3D312A] block">Wild Fig Candle</span>
                    <span className="text-xs font-bold text-[#C85A32]">$28.00</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. POPULAR CATEGORIES */}
      <section id="categories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8B7355] uppercase tracking-wider mb-2">
              <Layers className="w-3.5 h-3.5 text-[#C85A32]" />
              <span>Curated Collections</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#3D312A]">
              Shop by Craft Category
            </h2>
            <p className="text-sm text-[#7A6C60] mt-1 max-w-lg">
              Explore 8 authentic disciplines perfected by traditional makers and modern craft artists.
            </p>
          </div>

          <button
            onClick={() => {
              setSelectedCategoryFilter(null);
              setActivePage('shop');
            }}
            className="mt-4 md:mt-0 inline-flex items-center gap-1 text-sm font-semibold text-[#C85A32] hover:underline"
          >
            <span>Browse All Collections</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 8 Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {CATEGORIES.map((category) => (
            <div
              key={category.id}
              onClick={() => handleCategoryClick(category.name)}
              className="group relative rounded-2xl overflow-hidden bg-[#FCFAF6] border border-[#EFE8DD] hover:shadow-xl hover:border-[#D8C7B5] transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F3ECE2]">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <span className="absolute bottom-3 left-3 px-2 py-0.5 rounded-md bg-white/90 backdrop-blur-xs text-[10px] font-bold text-[#3D312A]">
                  {category.itemCount} pieces
                </span>
              </div>

              <div className="p-4 bg-white flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-base sm:text-lg font-semibold text-[#3D312A] group-hover:text-[#C85A32] transition">
                    {category.name}
                  </h3>
                  <p className="text-xs text-[#7A6C60] line-clamp-2 mt-1 leading-relaxed">
                    {category.description}
                  </p>
                </div>
                <div className="mt-3 flex items-center text-xs font-semibold text-[#8B7355] group-hover:text-[#C85A32] transition gap-1">
                  <span>Explore Crafts</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8B7355] uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#C85A32]" />
              <span>Handpicked by Curators</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#3D312A]">
              Featured Artisan Creations
            </h2>
            <p className="text-sm text-[#7A6C60] mt-1 max-w-lg">
              Unique, small-batch goods created with dedication. Limited quantities available in each kiln and stitch run.
            </p>
          </div>

          <button
            onClick={() => {
              setSelectedCategoryFilter(null);
              setActivePage('shop');
            }}
            className="mt-4 md:mt-0 px-5 py-2.5 rounded-full border border-[#D8C7B5] bg-white text-xs font-semibold text-[#3D312A] hover:bg-[#FAF3EA] transition flex items-center gap-2"
          >
            <span>View All ({PRODUCTS.length}) Products</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Featured Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. WHY HANDMADE SECTION */}
      <section className="bg-[#FAF3EA] py-16 sm:py-20 border-y border-[#EFE8DD]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-semibold tracking-wider text-[#C85A32] uppercase">
              The CraftAura Philosophy
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#3D312A] mt-2">
              Why Handmade Matters in a Mass-Produced World
            </h2>
            <p className="text-sm text-[#6E5D50] mt-3 leading-relaxed">
              When an item is shaped by human hands, it carries memory, presence, and care that no assembly line could ever replicate.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            <div className="p-6 rounded-2xl bg-white border border-[#EFE8DD] shadow-xs flex flex-col justify-between hover:shadow-md transition">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#FCF4F0] text-[#C85A32] flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6" />
                </div>
                <h3 className="font-serif font-bold text-lg text-[#3D312A] mb-2">
                  Every Piece Has a Story
                </h3>
                <p className="text-xs text-[#7A6C60] leading-relaxed">
                  Subtle fingerprint marks in stoneware, unique grain curls in walnut, and custom plant dye variances mean your possession is genuinely one-of-a-kind.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#F7F3EE] text-[11px] font-semibold text-[#8B7355]">
                No two pieces identical
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#EFE8DD] shadow-xs flex flex-col justify-between hover:shadow-md transition">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#F4F6F0] text-[#606C38] flex items-center justify-center mb-4">
                  <Leaf className="w-6 h-6" />
                </div>
                <h3 className="font-serif font-bold text-lg text-[#3D312A] mb-2">
                  Eco-Conscious Materials
                </h3>
                <p className="text-xs text-[#7A6C60] leading-relaxed">
                  Artisans work with biodegradable French linen, beeswax, organic merino wool, non-toxic clays, and recycled sterling silver.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#F7F3EE] text-[11px] font-semibold text-[#8B7355]">
                Zero harsh synthetics
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#EFE8DD] shadow-xs flex flex-col justify-between hover:shadow-md transition">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#FAF3EA] text-[#DDA15E] flex items-center justify-center mb-4">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="font-serif font-bold text-lg text-[#3D312A] mb-2">
                  Empowering Local Artists
                </h3>
                <p className="text-xs text-[#7A6C60] leading-relaxed">
                  Your purchase directly sustains independent family studios and preserves centuries of traditional ceramic, textile, and metalworking heritage.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#F7F3EE] text-[11px] font-semibold text-[#8B7355]">
                85% proceeds to makers
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#EFE8DD] shadow-xs flex flex-col justify-between hover:shadow-md transition">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#FCFAF6] text-[#3D312A] flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="font-serif font-bold text-lg text-[#3D312A] mb-2">
                  Built for Heirloom Living
                </h3>
                <p className="text-xs text-[#7A6C60] leading-relaxed">
                  Made with slow intention and durable joinery to last for generations, resisting the disposable cycle of modern fast-homeware.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#F7F3EE] text-[11px] font-semibold text-[#8B7355]">
                Timeless durability
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 5. ARTISAN SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#283618] rounded-3xl p-8 sm:p-12 lg:p-16 text-white relative overflow-hidden shadow-2xl">
          {/* Decorative motif */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#606C38]/20 rounded-full blur-3xl" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#606C38]/40 text-[#DDA15E] text-xs font-semibold uppercase tracking-wider">
                <MapPin className="w-3.5 h-3.5" />
                <span>Studio Spotlight: Asheville, NC</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl font-bold leading-tight">
                Meet Elena Rostova, Ceramicist &amp; Potter
              </h2>

              <blockquote className="italic text-[#E6EADF] text-sm sm:text-base border-l-2 border-[#DDA15E] pl-4 py-1 leading-relaxed">
                "When you hold a handmade mug, you are participating in a quiet conversation with the earth, the fire, and the hands that shaped it."
              </blockquote>

              <p className="text-xs text-[#C8B8A6] leading-relaxed">
                For over 14 years, Elena has gathered iron-rich red clay and mixed mineral glazes by hand. She limits her batches to 12 pieces per firing to ensure each curve has soul.
              </p>

              <div className="pt-2 flex items-center gap-4">
                <button
                  onClick={() => {
                    setSelectedCategoryFilter('Pottery & Ceramics');
                    setActivePage('shop');
                  }}
                  className="px-6 py-2.5 bg-[#E07A5F] hover:bg-[#C85A32] text-white text-xs font-semibold rounded-full transition shadow-md cursor-pointer"
                >
                  Shop Elena's Collection
                </button>
                <button
                  onClick={() => setActivePage('about')}
                  className="text-xs text-[#DDA15E] hover:underline font-medium"
                >
                  Read Maker Stories &rarr;
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-2 gap-4">
              <div className="rounded-2xl overflow-hidden aspect-[4/5] bg-black/20 border border-white/10 shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=600&q=80"
                  alt="Potter at work"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden aspect-square bg-black/20 border border-white/10 shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=400&q=80"
                    alt="Glazed pottery piece"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-xs space-y-1">
                  <span className="font-bold text-white block">Craft Technique</span>
                  <span className="text-[#E6EADF] block">High-Fire Cone 10 Reduction, Wheel-Formed</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. CUSTOMER TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs font-semibold tracking-wider text-[#C85A32] uppercase">
            Community Love
          </span>
          <h2 className="font-serif text-3xl font-bold text-[#3D312A] mt-1">
            Cherished in 10,000+ Homes
          </h2>
          <p className="text-xs text-[#7A6C60] mt-2">
            Read what our conscious collectors and gift givers have to say about their handmade treasures.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="p-6 rounded-2xl bg-[#FCFAF6] border border-[#EFE8DD] shadow-xs hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <div className="flex text-[#DDA15E] mb-3">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-[#5C4738] leading-relaxed italic mb-4">
                  "{t.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#EFE8DD] flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover border border-[#D8C7B5]"
                />
                <div>
                  <div className="font-semibold text-xs text-[#3D312A] flex items-center gap-1.5">
                    <span>{t.name}</span>
                    <span title="Verified Collector"><CheckCircle2 className="w-3.5 h-3.5 text-[#283618]" /></span>
                  </div>
                  <div className="text-[11px] text-[#8B7355]">{t.location}</div>
                  <div className="text-[10px] text-[#C85A32] font-medium mt-0.5">
                    Purchased {t.productName}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. NEWSLETTER & ARTISAN BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF3EA] rounded-3xl p-8 sm:p-12 border border-[#E4D8C7] flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-lg space-y-2">
            <span className="text-xs font-semibold tracking-wider text-[#C85A32] uppercase">
              Join Our Artisan Collective
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#3D312A]">
              Are you an independent maker or traditional artist?
            </h3>
            <p className="text-xs sm:text-sm text-[#7A6C60] leading-relaxed">
              We provide independent creators with a zero-commission marketplace, zero setup fees, and plastic-free eco packaging supplies.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button
              onClick={() => setActivePage('contact')}
              className="px-6 py-3 bg-[#3D312A] hover:bg-[#2C221E] text-white text-xs font-semibold rounded-full transition shadow-sm text-center cursor-pointer"
            >
              Apply as Maker
            </button>
            <button
              onClick={() => setActivePage('about')}
              className="px-6 py-3 bg-white border border-[#D8C7B5] hover:bg-[#F3ECE2] text-[#3D312A] text-xs font-semibold rounded-full transition text-center cursor-pointer"
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
