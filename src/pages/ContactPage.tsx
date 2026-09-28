import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  ChevronDown, 
  CheckCircle2, 
  MessageSquare,
  Sparkles,
  Instagram,
  Compass,
  ArrowRight
} from 'lucide-react';
import { useCraft } from '../context/CraftContext';
import { FAQ_ITEMS } from '../data/craftData';

export const ContactPage: React.FC = () => {
  const { addToast } = useCraft();

  // Contact form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('General Question');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // FAQ accordion open/close state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      addToast('Please fill in all required contact form fields.', 'warn');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      addToast('Thank you! Your note has been received by our studio team.', 'success');
      setName('');
      setEmail('');
      setMessage('');
    }, 700);
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#C85A32]">
          We’d Love to Hear From You
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#3D312A]">
          Contact CraftAura &amp; Our Artisans
        </h1>
        <p className="text-xs sm:text-sm text-[#7A6C60] leading-relaxed">
          Have a question about a handcrafted piece, custom commission, artisan application, or order delivery? We respond to every note within 24 hours.
        </p>
      </div>

      {/* Main Grid: Form + Studio Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Interactive Contact Form */}
        <div className="lg:col-span-7 bg-[#FCFAF6] p-6 sm:p-8 rounded-3xl border border-[#EFE8DD] shadow-xs">
          
          <h2 className="font-serif text-xl font-bold text-[#3D312A] mb-1">
            Send Us a Message
          </h2>
          <p className="text-xs text-[#7A6C60] mb-6">
            Directly connect with our customer care concierges or request artisan custom work.
          </p>

          {isSubmitted ? (
            <div className="p-6 rounded-2xl bg-[#F4F6F0] border border-[#283618]/20 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#283618] text-[#DDA15E] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-[#283618]">
                Message Received!
              </h3>
              <p className="text-xs text-[#5C4738] max-w-sm mx-auto leading-relaxed">
                Thank you for reaching out. A studio representative or specific artisan will review your note and reply to your email shortly.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="mt-2 text-xs font-semibold text-[#C85A32] underline cursor-pointer"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-[#3D312A] mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Elena or Liam"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E4D8C7] text-xs text-[#3D312A] focus:outline-none focus:ring-1 focus:ring-[#C85A32]"
                    required
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#3D312A] mb-1">
                    Your Email *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E4D8C7] text-xs text-[#3D312A] focus:outline-none focus:ring-1 focus:ring-[#C85A32]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#3D312A] mb-1">
                  Topic of Inquiry
                </label>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E4D8C7] text-xs text-[#3D312A] focus:outline-none focus:ring-1 focus:ring-[#C85A32] cursor-pointer"
                >
                  <option value="General Question">General Craft Question</option>
                  <option value="Order Tracking">Order &amp; Delivery Tracking</option>
                  <option value="Custom Commission">Custom Pottery / Jewelry Commission</option>
                  <option value="Artisan Application">Join the Artisan Guild (Maker Application)</option>
                  <option value="Wholesale">Wholesale &amp; Gifting Inquiries</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-[#3D312A] mb-1">
                  Your Message *
                </label>
                <textarea
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share details about your question, special request, or artisan craft background..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E4D8C7] text-xs text-[#3D312A] focus:outline-none focus:ring-1 focus:ring-[#C85A32]"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-3 bg-[#C85A32] hover:bg-[#B84E28] text-white font-semibold text-xs rounded-xl transition shadow-md shadow-[#C85A32]/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{isSubmitting ? 'Sending Message...' : 'Send Message'}</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          )}

        </div>

        {/* Right Column: Studio Information & Visiting Hours */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="p-6 rounded-3xl bg-[#FAF3EA] border border-[#EFE8DD] space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#3D312A]">
              Studio Showroom &amp; Headquarters
            </h3>
            
            <div className="space-y-3 text-xs text-[#5C4738]">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#C85A32] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#3D312A]">CraftAura Artisan Studio &amp; Kiln House</strong>
                  <span>248 River Arts Parkway, Suite 4B</span>
                  <span className="block">Asheville, NC 28801</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#C85A32] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#3D312A]">Artisan Support Email</strong>
                  <span>hello@craftaura-artisan.com</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#C85A32] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#3D312A]">Studio Phone</strong>
                  <span>+1 (828) 492-7104</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#C85A32] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#3D312A]">Visiting &amp; Workshop Hours</strong>
                  <span>Tuesday &ndash; Saturday: 10:00 AM &ndash; 6:00 PM EST</span>
                  <span className="block text-[#9C8B7D]">Sunday &amp; Monday: Closed for Kiln Firings</span>
                </div>
              </div>
            </div>

            {/* Social media connections */}
            <div className="pt-4 border-t border-[#EFE8DD]">
              <span className="text-[11px] font-semibold text-[#8B7355] block mb-2 uppercase tracking-wider">
                Follow Artisan Studios
              </span>
              <div className="flex gap-2">
                <a
                  href="#instagram"
                  onClick={(e) => {
                    e.preventDefault();
                    addToast('Opening @craftaura.studios on Instagram!', 'info');
                  }}
                  className="px-3 py-1.5 rounded-lg bg-white border border-[#EFE8DD] text-xs text-[#3D312A] hover:bg-[#F3ECE2] transition font-medium flex items-center gap-1.5"
                >
                  <Instagram className="w-3.5 h-3.5 text-[#E07A5F]" />
                  <span>Instagram</span>
                </a>
                <a
                  href="#pinterest"
                  onClick={(e) => {
                    e.preventDefault();
                    addToast('Opening CraftAura Moodboards on Pinterest!', 'info');
                  }}
                  className="px-3 py-1.5 rounded-lg bg-white border border-[#EFE8DD] text-xs text-[#3D312A] hover:bg-[#F3ECE2] transition font-medium flex items-center gap-1.5"
                >
                  <Compass className="w-3.5 h-3.5 text-[#C85A32]" />
                  <span>Pinterest</span>
                </a>
              </div>
            </div>

          </div>

          {/* Maker Callout Box */}
          <div className="p-6 rounded-3xl bg-[#283618] text-[#F4F6F0] space-y-2">
            <span className="text-xs font-semibold text-[#DDA15E] uppercase tracking-wider">
              Artisan Guild Intake
            </span>
            <h4 className="font-serif text-lg font-bold text-white">
              Want to sell your crafts with us?
            </h4>
            <p className="text-xs text-[#E6EADF] leading-relaxed">
              We review new artisan portfolios on the 1st of every month. Include your portfolio link and studio location in the form to get started.
            </p>
          </div>

        </div>

      </div>

      {/* Frequently Asked Questions Accordion */}
      <div className="pt-8 border-t border-[#EFE8DD]">
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#C85A32]">
            Helpful Information
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#3D312A] mt-1">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-[#EFE8DD] bg-[#FCFAF6] overflow-hidden transition"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-serif font-bold text-sm text-[#3D312A] hover:text-[#C85A32] cursor-pointer"
                >
                  <span>{item.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#8B7355] transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-4 text-xs text-[#5C4738] leading-relaxed border-t border-[#F3ECE2] pt-3 animate-in fade-in duration-150">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
