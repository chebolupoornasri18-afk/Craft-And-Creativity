import React from 'react';
import { 
  Heart, 
  Sparkles, 
  Leaf, 
  ShieldCheck, 
  MapPin, 
  Award, 
  Clock, 
  ArrowRight,
  Smile,
  Hammer
} from 'lucide-react';
import { useCraft } from '../context/CraftContext';
import { ARTISANS } from '../data/craftData';

export const AboutPage: React.FC = () => {
  const { setActivePage, setSelectedCategoryFilter } = useCraft();

  return (
    <div className="space-y-16 pb-16">
      
      {/* Hero Banner */}
      <section className="bg-[#FAF3EA] py-16 sm:py-20 border-b border-[#EFE8DD] text-center px-4">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EADBC8] text-[#5C4738] text-xs font-semibold uppercase tracking-wider">
            <Heart className="w-3.5 h-3.5 text-[#C85A32] fill-current" />
            <span>The CraftAura Story</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#3D312A] leading-tight">
            Preserving the Beauty of <br />
            <span className="italic font-normal text-[#C85A32]">Human Hands &amp; Slow Art</span>
          </h1>
          <p className="text-sm sm:text-base text-[#6E5D50] leading-relaxed max-w-2xl mx-auto">
            CraftAura was born in 2021 inside a sunlit pottery shed in the Blue Ridge mountains. We saw a world overflowing with mass-produced, disposable goods, and set out to build a thriving sanctuary for independent makers who create with reverence, soul, and patience.
          </p>
        </div>
      </section>

      {/* Origin Story Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-6 space-y-5 text-xs sm:text-sm text-[#5C4738] leading-relaxed">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#C85A32] block">
              Our Founding Belief
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#3D312A] leading-snug">
              Every object in your home should hold a heartbeat, not just a barcode.
            </h2>
            <p>
              When an artisan throws clay on a wheel, knits organic merino wool, or saws silver petals by jeweler's loupe, their personal focus and rhythm become embedded in the physical medium.
            </p>
            <p>
              Industrial factories optimize for speed and cheap plastic shortcuts. At CraftAura, we optimize for permanence, ecological tenderness, and fair compensation. Our artists receive over 85% of each sale directly, giving them the freedom to run independent studios and teach the next generation of apprentices.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#EFE8DD]">
              <div className="p-3.5 rounded-xl bg-[#FCFAF6] border border-[#EFE8DD]">
                <div className="font-serif text-xl font-bold text-[#3D312A]">14,000+</div>
                <div className="text-[11px] text-[#7A6C60]">Handcrafted hours logged</div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#FCFAF6] border border-[#EFE8DD]">
                <div className="font-serif text-xl font-bold text-[#3D312A]">$340,000+</div>
                <div className="text-[11px] text-[#7A6C60]">Direct artist payouts</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="rounded-2xl overflow-hidden aspect-[3/4] bg-[#F3ECE2] border border-[#EFE8DD] shadow-md">
              <img
                src="https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=600&q=80"
                alt="Ceramics wheel throwing"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-4">
              <div className="rounded-2xl overflow-hidden aspect-square bg-[#F3ECE2] border border-[#EFE8DD] shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=400&q=80"
                  alt="Botanical jewelry crafting"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 rounded-2xl bg-[#FAF3EA] border border-[#EFE8DD] text-xs space-y-1">
                <span className="font-bold text-[#3D312A] block">Zero Waste Studio Code</span>
                <p className="text-[#6E5D50]">
                  Unfired clay is recycled, silver dust is refined, and botanical scraps are composted back into dye gardens.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4 Pillars of CraftAura */}
      <section className="bg-[#FCFAF6] py-16 border-y border-[#EFE8DD]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="font-serif text-3xl font-bold text-[#3D312A]">
              Our Core Craft Standards
            </h2>
            <p className="text-xs text-[#7A6C60] mt-1">
              Every maker admitted to the CraftAura Guild agrees to four non-negotiable craftsmanship tenets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="p-6 rounded-2xl bg-white border border-[#EFE8DD] shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#FCF4F0] text-[#C85A32] flex items-center justify-center">
                <Hammer className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-base text-[#3D312A]">
                1. Pure Human Craft
              </h3>
              <p className="text-xs text-[#7A6C60] leading-relaxed">
                Zero automated factory mass production. Every product is individually thrown, crocheted, carved, poured, or assembled by hand.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#EFE8DD] shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#F4F6F0] text-[#606C38] flex items-center justify-center">
                <Leaf className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-base text-[#3D312A]">
                2. Ecological Materials
              </h3>
              <p className="text-xs text-[#7A6C60] leading-relaxed">
                We forbid toxic petroleum paraffin waxes, synthetic chemical glazes, and virgin plastics in favor of soy, French flax, and organic beeswax.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#EFE8DD] shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#FAF3EA] text-[#DDA15E] flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-base text-[#3D312A]">
                3. Living Wage Splits
              </h3>
              <p className="text-xs text-[#7A6C60] leading-relaxed">
                Traditional retail markups squeeze creators to pennies. We reverse the paradigm by transferring 85% of retail revenue directly to makers.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#EFE8DD] shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#FCFAF6] text-[#3D312A] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-base text-[#3D312A]">
                4. Heirloom Durability
              </h3>
              <p className="text-xs text-[#7A6C60] leading-relaxed">
                Designed to withstand decades of daily use, table laughter, and bedtime snuggles—not to be replaced with next season's trend.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Meet the Artisans Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs font-semibold text-[#C85A32] uppercase tracking-wider">
            Faces Behind the Craft
          </span>
          <h2 className="font-serif text-3xl font-bold text-[#3D312A] mt-1">
            Meet Our Master Makers
          </h2>
          <p className="text-xs text-[#7A6C60] mt-1">
            Independent artists whose studios span from the Pacific Northwest to the Appalachian ridges.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ARTISANS.map((artisan) => (
            <div
              key={artisan.id}
              className="p-5 rounded-2xl bg-[#FCFAF6] border border-[#EFE8DD] shadow-xs flex flex-col justify-between"
            >
              <div>
                <img
                  src={artisan.avatar}
                  alt={artisan.name}
                  className="w-full aspect-square rounded-xl object-cover mb-4 border border-[#EFE8DD]"
                />
                <div className="text-xs text-[#606C38] font-semibold flex items-center gap-1 mb-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{artisan.location}</span>
                </div>
                <h3 className="font-serif text-lg font-bold text-[#3D312A]">
                  {artisan.name}
                </h3>
                <span className="text-xs text-[#C85A32] font-medium block mb-2">
                  {artisan.craft} • {artisan.experienceYears} yrs experience
                </span>
                <p className="text-xs text-[#7A6C60] leading-relaxed mb-3">
                  {artisan.bio}
                </p>
              </div>

              <blockquote className="italic text-[11px] text-[#5C4738] bg-[#FAF3EA] p-3 rounded-lg border-l-2 border-[#DDA15E]">
                "{artisan.quote}"
              </blockquote>
            </div>
          ))}
        </div>
      </section>

      {/* Join As An Artist Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#283618] text-[#F4F6F0] rounded-3xl p-8 sm:p-12 text-center max-w-4xl mx-auto space-y-4">
          <Sparkles className="w-8 h-8 text-[#DDA15E] mx-auto animate-pulse" />
          <h2 className="font-serif text-2xl sm:text-3xl font-bold">
            Do You Create With Traditional Passion?
          </h2>
          <p className="text-xs sm:text-sm text-[#E6EADF] max-w-lg mx-auto leading-relaxed">
            We are always opening our doors to thoughtful weavers, wood turners, glass artists, jewelers, and potters. Join our ethical artist guild.
          </p>
          <div className="pt-2">
            <button
              onClick={() => setActivePage('contact')}
              className="px-8 py-3 bg-[#E07A5F] hover:bg-[#C85A32] text-white text-xs font-semibold rounded-full transition shadow-md cursor-pointer"
            >
              Submit Studio Application
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
