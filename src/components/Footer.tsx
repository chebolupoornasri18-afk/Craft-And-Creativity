import React, { useState } from 'react';
import { 
  Heart, 
  Send, 
  Sparkles, 
  ShieldCheck, 
  Leaf, 
  Truck, 
  Instagram, 
  ExternalLink,
  Code
} from 'lucide-react';
import { useCraft } from '../context/CraftContext';
import { CATEGORIES } from '../data/craftData';

export const Footer: React.FC = () => {
  const { 
    setActivePage, 
    setSelectedCategoryFilter,
    addToast,
    setIsCheckoutModalOpen 
  } = useCraft();

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || !newsletterEmail.includes('@')) {
      addToast('Please enter a valid email address.', 'warn');
      return;
    }
    setNewsletterSubmitted(true);
    addToast('Welcome to CraftAura! Use code WELCOME15 for 15% off your first craft.', 'success');
  };

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategoryFilter(categoryName);
    setActivePage('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#2C221E] text-[#FAF3EA] pt-16 pb-12 border-t border-[#3D312A]">
      {/* Top Value Propositions */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b border-white/10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#E07A5F]/20 text-[#E07A5F] flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-base text-white">100% Handcrafted</h4>
              <p className="text-xs text-[#C8B8A6] mt-1 leading-relaxed">
                Every single piece is shaped by human hands, never automated factory molds.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#606C38]/20 text-[#DDA15E] flex items-center justify-center shrink-0">
              <Leaf className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-base text-white">Sustainable &amp; Pure</h4>
              <p className="text-xs text-[#C8B8A6] mt-1 leading-relaxed">
                Earth-friendly raw materials: French linen, clean soy wax, recycled silver, and clay.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#E07A5F]/20 text-[#E07A5F] flex items-center justify-center shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-base text-white">Plastic-Free Packaging</h4>
              <p className="text-xs text-[#C8B8A6] mt-1 leading-relaxed">
                Compostable kraft cushions and paper tape ensure safe, eco-conscious delivery.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#606C38]/20 text-[#DDA15E] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-base text-white">Direct Artist Royalties</h4>
              <p className="text-xs text-[#C8B8A6] mt-1 leading-relaxed">
                Over 85% of each sale flows directly into independent artisan workshops.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#E07A5F] flex items-center justify-center text-white">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2C10.5 2 9.5 3 9.5 4.5V6H7C5.9 6 5 6.9 5 8V9C5 12.5 7.5 15.5 11 16V19H8C7.4 19 7 19.4 7 20C7 20.6 7.4 21 8 21H16C16.6 21 17 20.6 17 20C17 19.4 16.6 19 16 19H13V16C16.5 15.5 19 12.5 19 9V8C19 6.9 18.1 6 17 6H14.5V4.5C14.5 3 13.5 2 12 2Z" />
                </svg>
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                Craft<span className="text-[#E07A5F]">Aura</span>
              </span>
            </div>

            <p className="text-xs text-[#C8B8A6] leading-relaxed max-w-sm">
              CraftAura is a sanctuary for authentic craft makers and mindful collectors. We connect conscious homes with wheel-thrown pottery, botanic jewelry, hand-loomed fibers, and aromatic soy candles crafted with slow devotion.
            </p>

            {/* Newsletter form */}
            <div className="pt-2">
              <h5 className="text-xs font-semibold text-white uppercase tracking-wider mb-2">
                Join the Artisan Guild &bull; Get 15% Off
              </h5>
              {newsletterSubmitted ? (
                <div className="p-3 rounded-xl bg-[#283618] border border-[#606C38] text-xs text-[#F4F6F0]">
                  🎉 Welcome! Use code <strong className="text-[#DDA15E]">WELCOME15</strong> at checkout for 15% off.
                </div>
              ) : (
                <form onSubmit={handleNewsletter} className="flex gap-2 max-w-md">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="flex-1 px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-xs text-white placeholder-[#9C8B7D] focus:outline-none focus:ring-2 focus:ring-[#E07A5F]"
                    required
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-xl bg-[#E07A5F] hover:bg-[#C85A32] text-white text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Subscribe</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Craft Collections */}
          <div>
            <h5 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
              Artisan Collections
            </h5>
            <ul className="space-y-2 text-xs text-[#C8B8A6]">
              {CATEGORIES.slice(0, 5).map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => handleCategoryClick(cat.name)}
                    className="hover:text-[#E07A5F] transition text-left cursor-pointer"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => {
                    setSelectedCategoryFilter(null);
                    setActivePage('shop');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-[#DDA15E] font-medium hover:underline text-left cursor-pointer"
                >
                  View All 8 Categories &rarr;
                </button>
              </li>
            </ul>
          </div>

          {/* About & Community */}
          <div>
            <h5 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
              Our Community
            </h5>
            <ul className="space-y-2 text-xs text-[#C8B8A6]">
              <li>
                <button
                  onClick={() => {
                    setActivePage('about');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#E07A5F] transition text-left cursor-pointer"
                >
                  Brand Story &amp; Values
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActivePage('contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#E07A5F] transition text-left cursor-pointer"
                >
                  Meet the Artisans
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActivePage('contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#E07A5F] transition text-left cursor-pointer"
                >
                  Artisan Application
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsCheckoutModalOpen(true)}
                  className="flex items-center gap-1.5 text-[#DDA15E] hover:underline transition cursor-pointer"
                >
                  <Code className="w-3.5 h-3.5" />
                  <span>Backend Integration Docs</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h5 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
              Customer Support
            </h5>
            <ul className="space-y-2 text-xs text-[#C8B8A6]">
              <li>
                <button
                  onClick={() => {
                    setActivePage('contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#E07A5F] transition text-left cursor-pointer"
                >
                  Shipping &amp; Delivery Times
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActivePage('contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#E07A5F] transition text-left cursor-pointer"
                >
                  Custom Commissions
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActivePage('contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#E07A5F] transition text-left cursor-pointer"
                >
                  14-Day Return Guarantee
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActivePage('contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#E07A5F] transition text-left cursor-pointer"
                >
                  Contact Studio Team
                </button>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#9C8B7D]">
        <div className="flex items-center gap-1">
          <span>&copy; {new Date().getFullYear()} CraftAura Inc. Crafted with</span>
          <Heart className="w-3.5 h-3.5 text-[#E07A5F] fill-current" />
          <span>by independent artists worldwide.</span>
        </div>

        <div className="flex items-center gap-6">
          <button
            onClick={() => setIsCheckoutModalOpen(true)}
            className="hover:text-[#FAF3EA] transition underline"
          >
            Payment Architecture Guide
          </button>
          <span>&bull;</span>
          <span>Privacy &amp; Terms</span>
          <span>&bull;</span>
          <span>Ethical Sourcing Verified</span>
        </div>
      </div>
    </footer>
  );
};
