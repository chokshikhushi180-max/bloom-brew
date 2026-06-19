import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { Sparkles, MapPin, Compass, ArrowRight, Play, Heart, Clock, Mail, Instagram, ArrowUp, Music, Users } from 'lucide-react';
import PlaylistPlayer from './components/PlaylistPlayer';
import ReservationForm from './components/ReservationForm';
import MenuSection from './components/MenuSection';
import GallerySection from './components/GallerySection';
import ReviewsSection from './components/ReviewsSection';
import InstagramFeed from './components/InstagramFeed';

export default function App() {
  const [wishlistCount, setWishlistCount] = useState<number>(0);
  const [selectedPOI, setSelectedPOI] = useState<string | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState<string>('');
  const [newsletterSubbed, setNewsletterSubbed] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);

  // Monitor scrolling for nav sticky state
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // POI descriptions for custom SVG map
  const pointsOfInterest: Record<string, { title: string; desc: string; dist: string }> = {
    bb: { title: 'Brew & Bloom Café 🌿', desc: 'Craft coffee, custom matcha lattes, double-baked brioche toast, and gorgeous sunshine beams.', dist: 'Active Hub' },
    park: { title: 'Organic Meadow Park 🌸', desc: 'Just a 2-minute walk! Grab an iced drink and sit on the grass under cherry blossoms.', dist: '200m away' },
    gallery: { title: 'Sunset Arts Gallery 🎨', desc: 'The local creative studio showcasing Gen-Z oil painters and sculptural pottery.', dist: '400m away' },
    metro: { title: 'Lighthouse Metro Station 🚇', desc: 'Convenient light-rail transit link connecting directly to the city central.', dist: '500m away' }
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSubbed(true);
      setTimeout(() => {
        setNewsletterEmail('');
        setNewsletterSubbed(false);
      }, 3500);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-cream selection:bg-peach/30 text-dark-brown">
      
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-espresso/5 z-55">
        <ScrollIndicator />
      </div>

      {/* STICKY FLOATING HEADER NAV */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-cream/80 backdrop-blur-md border-b border-espresso/10 py-3 shadow-xs'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-1.5 group select-none">
            <span className="font-serif text-2xl font-semibold italic tracking-tighter text-espresso transition-colors group-hover:text-dark-brown">
              B&B
            </span>
            <span className="font-sans text-[11px] uppercase tracking-widest text-mochabrown opacity-60 ml-1.5 hidden sm:inline-block">
              Brew & Bloom
            </span>
            <span className="w-1.5 h-1.5 bg-matcha rounded-full animate-pulse self-center mb-0.5 ml-1" />
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-mono font-semibold uppercase tracking-wider text-mochabrown">
            <a href="#about-section-anchor" className="hover:text-espresso transition-colors">About</a>
            <a href="#menu-scroll-anchor" className="hover:text-espresso transition-colors">Menu</a>
            <a href="#experience-section-anchor" className="hover:text-espresso transition-colors">Vibe Study</a>
            <a href="#gallery-section-anchor" className="hover:text-espresso transition-colors">Gallery</a>
            <a href="#testimonials-section-anchor" className="hover:text-espresso transition-colors">Reviews</a>
            <a href="#location-rsvp-anchor" className="hover:text-espresso transition-colors">Location & RSVP</a>
          </nav>

          {/* Nav Actions */}
          <div className="flex items-center gap-3">
            {wishlistCount > 0 && (
              <a
                href="#menu-scroll-anchor"
                className="relative bg-peach/20 hover:bg-peach/35 text-dark-brown px-3 py-1.5 rounded-full text-xs font-mono font-bold flex items-center gap-1 transition-all"
              >
                <span>Wishlist</span>
                <span className="bg-espresso text-cream w-5 h-5 rounded-full flex items-center justify-center text-[10px]">
                  {wishlistCount}
                </span>
              </a>
            )}
            
            <a
              id="sticky-reserve-btn"
              href="#location-rsvp-anchor"
              className="bg-matcha hover:bg-[#8da885] text-white px-5 py-2.5 rounded-full text-xs font-sans font-medium uppercase tracking-[0.1em] transition-all hover:scale-102 active:scale-98 hover:shadow-xs"
            >
              Reserve Table
            </a>
          </div>
        </div>
      </header>

      {/* 1. HERO SECTION */}
      <section className="relative min-h-[95vh] flex items-center justify-center pt-24 pb-12 overflow-hidden bg-gradient-to-b from-warm-beige/30 via-cream to-cream">
        
        {/* Parallax background giant letters matching theme */}
        <div className="absolute top-[180px] left-[-20px] z-0 select-none pointer-events-none font-serif font-semibold text-[130px] md:text-[220px] leading-none tracking-tighter text-espresso opacity-5">
          B R E W
        </div>
        <div className="absolute bottom-[80px] right-[-20px] z-0 select-none pointer-events-none font-serif font-semibold text-[130px] md:text-[220px] leading-none tracking-tighter text-espresso opacity-5">
          BLOOM
        </div>

        {/* Floating circles decor */}
        <div className="absolute top-1/4 left-10 w-24 h-24 bg-matcha/10 rounded-full filter blur-xl animate-pulse" />
        <div className="absolute bottom-1/4 right-10 w-36 h-36 bg-peach/10 rounded-full filter blur-xl animate-pulse delay-700" />
        <div className="absolute top-1/4 right-20 w-32 h-32 bg-softpink/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/3 w-48 h-48 bg-matcha/20 rounded-full blur-[80px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10 w-full">
          
          {/* Hero Left: Large display typography */}
          <div className="text-center md:text-left space-y-6">
            <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
              <span className="text-[10px] px-3.5 py-1.5 border border-mochabrown/50 rounded-full uppercase tracking-wider font-mono text-mochabrown flex items-center gap-1 bg-cream/50">
                ✦ Instagrammable
              </span>
              <span className="text-[10px] px-3.5 py-1.5 border border-mochabrown/50 rounded-full uppercase tracking-wider font-mono text-mochabrown flex items-center gap-1 bg-cream/50">
                ✦ Specialty Coffee
              </span>
            </div>
            
            <h2 className="font-serif text-5xl sm:text-6xl lg:text-8xl font-semibold text-dark-brown tracking-tighter leading-[1.05] text-balance">
              Sip Slowly.<br />
              <span className="italic font-light text-mochabrown">Live Beautifully.</span>
            </h2>

            <p className="font-sans text-sm md:text-base text-mochabrown max-w-md mx-auto md:mx-0 leading-relaxed font-light">
              A curated space for Gen-Z coffee lovers. We blend organic Uji matcha and signature roasts inside a sun-soaked, artistic atmosphere designed for deep connection and lingering moments.
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-4">
              <a
                id="hero-explore-menu-btn"
                href="#menu-scroll-anchor"
                className="bg-matcha hover:bg-opacity-95 hover:scale-102 text-white px-8 py-4 rounded-full text-xs tracking-widest font-bold uppercase transition-all shadow-md active:scale-98"
              >
                View the Menu
              </a>

              <a
                id="hero-reserve-table-btn"
                href="#location-rsvp-anchor"
                className="px-8 py-4 border border-espresso/60 rounded-full text-xs uppercase tracking-widest text-[#4A3428] hover:bg-[#4A3428] hover:text-white hover:scale-102 active:scale-98 transition-colors duration-300 font-medium"
              >
                Reserve Table
              </a>
            </div>

            {/* Micro details indicator / Social stats */}
            <div className="flex items-center justify-center md:justify-start gap-5 pt-6">
              <div className="flex -space-x-3">
                <div className="w-10 h-10 rounded-full border-2 border-cream bg-peach shadow-xs" />
                <div className="w-10 h-10 rounded-full border-2 border-cream bg-matcha shadow-xs" />
                <div className="w-10 h-10 rounded-full border-2 border-cream bg-softpink shadow-xs" />
              </div>
              <div className="text-left">
                <div className="italic font-serif text-xs md:text-sm font-medium">1.2k creatives visiting weekly</div>
                <div className="font-mono text-[9px] tracking-wider uppercase opacity-60">East Village NY • Est. 2026</div>
              </div>
            </div>
          </div>

          {/* Hero Right: Aesthetic Circular / Arch Mask composition matching theme */}
          <div className="flex justify-center relative select-none z-10">
            <div 
              style={{ writingMode: 'vertical-rl' }}
              className="absolute right-[-45px] top-1/2 -translate-y-1/2 font-mono text-[9px] tracking-[0.25em] font-medium text-mochabrown opacity-60 hidden xl:block select-none pointer-events-none uppercase"
            >
              CURATED EXPERIENCE — EST 2026
            </div>
            
            <div className="w-[300px] sm:w-[355px] h-[420px] sm:h-[495px] rounded-[177px] overflow-hidden relative border border-espresso/15 bg-warm-beige shadow-xl flex items-center justify-center group/hero-img">
              {/* Background Gradient Blend inside arch */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-warm-beige/10 to-espresso/25 z-10" />
              
              {/* Inner design container matching theme style */}
              <div className="absolute inset-2.5 rounded-[155px] border border-dashed border-espresso/25 z-20 pointer-events-none" />
              
              <img
                src="/src/assets/images/hero_iced_latte_1781845793820.jpg"
                alt="Aesthetic Iced Latte"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover/hero-img:scale-105 transition-transform duration-[4000ms]"
              />
              
              {/* Floating Matcha Cloud Label at the bottom overlay */}
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 bg-cream/95 backdrop-blur-md px-5 py-3.5 rounded-2xl border border-espresso/10 shadow-lg text-center min-w-[200px]">
                <div className="font-serif italic text-base font-semibold text-dark-brown">Matcha Cloud</div>
                <div className="text-[9px] uppercase tracking-widest text-mochabrown mt-0.5">Signature Drink</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-10 text-mochabrown/60">
          <span className="text-[9px] font-mono uppercase tracking-widest animate-pulse">Sip Below</span>
          <div className="w-1 h-8 bg-espresso/20 rounded-full overflow-hidden">
            <motion.div 
              animate={{ y: [-10, 30] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-full h-3 bg-espresso rounded-full"
            />
          </div>
        </div>
      </section>

      {/* 2. ABOUT CAFÉ SECTION */}
      <section id="about-section-anchor" className="py-24 bg-cream relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left: Beautiful Interior photo */}
            <div className="relative">
              <div className="absolute top-4 -left-4 w-full h-full border border-espresso/15 rounded-3xl translate-x-1.5 translate-y-1.5" />
              <div className="relative h-[420px] rounded-3xl overflow-hidden bg-warm-beige">
                <img
                  src="/src/assets/images/cafe_interior_1781845810344.jpg"
                  alt="Brew and Bloom cozy boutique interior"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover hover:scale-102 transition-transform duration-700"
                />
              </div>
              
              {/* Floating review badge */}
              <div className="absolute -bottom-5 -right-4 bg-white border border-espresso/15 p-4 rounded-2xl shadow-md max-w-xs pointer-events-none">
                <div className="flex gap-1 text-peach mb-1.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span key={s} className="text-xs">★</span>
                  ))}
                </div>
                <p className="font-serif italic text-xs text-dark-brown/95 leading-relaxed">
                  "The morning rays hit the travertine counter perfectly, catching double arches..."
                </p>
                <span className="block text-[9px] font-mono text-mochabrown uppercase tracking-wider mt-1.5">— @chloe.creates</span>
              </div>
            </div>

            {/* Right: Editorial content */}
            <div className="space-y-6 md:pl-4">
              <span className="text-xs font-mono uppercase bg-espresso/5 border border-espresso/10 text-espresso px-3 py-1 rounded-full">
                01. our philosophy
              </span>
              
              <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-dark-brown text-balance leading-tight">
                Fresh. Cozy. <span className="italic font-normal text-mochabrown">Vibrant.</span>
              </h3>

              <p className="font-sans text-sm md:text-base text-mochabrown leading-relaxed font-light">
                At Brew & Bloom, we believe that brunch isn’t just a morning meal — it is an artistic lifestyle check. Crafted with wholesome local ingredients, hand-restored drywall textures, and custom terrazzo bars, our spaces act as safe nests for creators and dreamers.
              </p>

              <div className="grid grid-cols-2 gap-6 pt-4 border-t border-espresso/10">
                <div className="space-y-1.5">
                  <h4 className="font-display font-bold text-sm text-dark-brown uppercase tracking-wide">
                    🌿 Sustainably Sourced
                  </h4>
                  <p className="font-sans text-xs text-mochabrown leading-normal">
                    Laps from fair-trade organic coffee coops and Grade-A ceremonial Uji matcha.
                  </p>
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-display font-bold text-sm text-dark-brown uppercase tracking-wide">
                    🛋️ Mindfully Crafted
                  </h4>
                  <p className="font-sans text-xs text-mochabrown leading-normal">
                    Power sockets at every seat, custom high-speed fiber internet, and quiet nooks.
                  </p>
                </div>
              </div>

              <div className="pt-4">
                <a
                  id="about-learn-more-btn"
                  href="#experience-section-anchor"
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-espresso border-b border-espresso/55 pb-1 hover:border-dark-brown transition-colors group"
                >
                  Explore the space
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. SIGNATURE MENU SECTION */}
      <section id="menu-scroll-anchor" className="py-24 bg-white border-y border-espresso/5 relative z-10">
        <div className="max-w-7xl mx-auto">
          
          {/* Menu Section Header */}
          <div className="text-center max-w-xl mx-auto px-6 mb-12">
            <span className="text-xs font-mono uppercase bg-espresso/5 border border-espresso/10 text-espresso px-3 py-1 rounded-full">
              02. curated signatures
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-dark-brown mt-4 tracking-tight leading-tight">
              Crafted To Feed Your Soul
            </h2>
            <p className="font-sans text-sm text-mochabrown mt-2 leading-relaxed">
              We focus on exquisite flavor notes, custom plate presentations, and delightful layers that look as beautiful as they taste.
            </p>
          </div>

          <MenuSection onWishlistChange={(count) => setWishlistCount(count)} />

        </div>
      </section>

      {/* 4. INTERACTIVE EXPERIENCE SECTION (Why Gen-Z Loves Us & Playlist Widget) */}
      <section id="experience-section-anchor" className="py-24 bg-cream relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Col (7/12 area): Feature descriptions */}
            <div className="lg:col-span-7 space-y-8">
              <div>
                <span className="text-xs font-mono uppercase bg-espresso/5 border border-espresso/10 text-espresso px-3 py-1 rounded-full">
                  03. experience design
                </span>
                <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-dark-brown mt-4 tracking-tight leading-tight">
                  Designed For Your Modern Rituals
                </h2>
                <p className="font-sans text-sm text-mochabrown mt-2 leading-relaxed font-light max-w-xl">
                  Brew & Bloom was architected specifically to cater to younger lifestyles. Here are the core pillars that keep our community vibrant.
                </p>
              </div>

              {/* Bento cards layout */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white border border-espresso/10 p-5 rounded-2xl shadow-xs hover:border-matcha/50 transition-colors">
                  <div className="w-9 h-9 bg-matcha/15 rounded-xl flex items-center justify-center text-espresso text-sm mb-3">
                    📸
                  </div>
                  <h4 className="font-display font-bold text-sm text-dark-brown uppercase tracking-wide">
                    Instagrammable Spots
                  </h4>
                  <p className="font-sans text-xs text-mochabrown leading-relaxed mt-1">
                    Recessed wall arches, travertine marble tables, and warm shadows perfect for content creation.
                  </p>
                </div>

                <div className="bg-white border border-espresso/10 p-5 rounded-2xl shadow-xs hover:border-peach/50 transition-colors">
                  <div className="w-9 h-9 bg-peach/15 rounded-xl flex items-center justify-center text-espresso text-sm mb-3">
                    ☕
                  </div>
                  <h4 className="font-display font-bold text-sm text-dark-brown uppercase tracking-wide">
                    Specialty Milk Crafts
                  </h4>
                  <p className="font-sans text-xs text-mochabrown leading-relaxed mt-1">
                    Indulge in pistachio cream layers, strawberry coulis, or authentic Kyoto ceremonial matcha.
                  </p>
                </div>

                <div className="bg-white border border-espresso/10 p-5 rounded-2xl shadow-xs hover:border-espresso/50 transition-colors">
                  <div className="w-9 h-9 bg-espresso/10 rounded-xl flex items-center justify-center text-espresso text-sm mb-3">
                    🌿
                  </div>
                  <h4 className="font-display font-bold text-sm text-dark-brown uppercase tracking-wide">
                    Cozy Desk Ecosystems
                  </h4>
                  <p className="font-sans text-xs text-mochabrown leading-relaxed mt-1">
                    Charging hubs at every table and quiet zones suited for deep studying, reading, or coding.
                  </p>
                </div>

                <div className="bg-white border border-espresso/10 p-5 rounded-2xl shadow-xs hover:border-mochabrown/50 transition-colors">
                  <div className="w-9 h-9 bg-warm-beige rounded-xl flex items-center justify-center text-espresso text-sm mb-3">
                    🧁
                  </div>
                  <h4 className="font-display font-bold text-sm text-dark-brown uppercase tracking-wide">
                    Micro-seasonal Drops
                  </h4>
                  <p className="font-sans text-xs text-mochabrown leading-relaxed mt-1">
                    Pastries and beverage crafts change monthly to align with fresh botanical harvests.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Col (5/12 area): Live Playlist Widget with copy */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="w-full text-center lg:text-left mb-6 max-w-sm">
                <span className="text-[10px] uppercase font-mono tracking-widest text-espresso font-semibold flex items-center justify-center lg:justify-start gap-1">
                  <Music className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} /> Curated Audio Atmosphere
                </span>
                <p className="font-serif italic text-[13px] text-mochabrown/90 mt-1">
                  We select warm, low-fidelity, jazzy beats to support your study sessions. Preview our custom live-stream.
                </p>
              </div>

              <PlaylistPlayer />
            </div>

          </div>

        </div>
      </section>

      {/* 5. GALLERY SECTION (Masonry/Bento layout) */}
      <section id="gallery-section-anchor" className="py-24 bg-white border-y border-espresso/5 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Gallery Header */}
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-mono uppercase bg-espresso/5 border border-espresso/10 text-espresso px-3 py-1 rounded-full">
              04. visual diaries
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-dark-brown mt-4 tracking-tight leading-tight">
              Vibes Shared on Film
            </h2>
            <p className="font-sans text-sm text-mochabrown mt-2 leading-relaxed">
              Explore corners of our space, carefully extracted slow coffees, and shared weekend tables shot by our guest community.
            </p>
          </div>

          <GallerySection />

        </div>
      </section>

      {/* 6. OUR STORY SECTION */}
      <section id="story-section-anchor" className="py-24 bg-cream relative z-10 overflow-hidden">
        
        {/* Soft background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-peach/5 rounded-full filter blur-3xl pointer-events-none" />

        <div className="max-w-3xl mx-auto px-6 text-center space-y-6 relative z-10">
          <span className="text-xs font-mono uppercase bg-espresso/5 border border-espresso/10 text-espresso px-3 py-1 rounded-full">
            05. brand narrative
          </span>
          
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-dark-brown tracking-tight leading-tight">
            More Than Just Coffee
          </h2>

          <div className="h-0.5 w-12 bg-espresso/20 mx-auto my-3" />

          <p className="font-serif text-lg md:text-xl text-dark-brown/90 leading-relaxed italic">
            "What began as a shared sketchbook sketch between food lovers and architecture students became a full physical studio space. We designed Brew & Bloom to represent slow breathing, creative expression, and beautiful mornings where people gather, focus, and feel safe."
          </p>

          <p className="font-sans text-xs text-mochabrown mt-3 leading-relaxed max-w-lg mx-auto font-light uppercase tracking-wider">
            — founded by the community in East Village, NY.
          </p>
          
          <div className="flex justify-center gap-6 pt-6 select-none grayscale opacity-75">
            <div className="text-center shrink-0">
              <span className="block font-mono text-xl font-bold text-espresso">100%</span>
              <span className="block text-[10px] uppercase tracking-widest font-mono text-mochabrown mt-0.5">Organic Certified</span>
            </div>
            <div className="w-px h-8 bg-espresso/20 align-middle self-center" />
            <div className="text-center shrink-0">
              <span className="block font-mono text-xl font-bold text-espresso">Zero</span>
              <span className="block text-[10px] uppercase tracking-widest font-mono text-mochabrown mt-0.5">Refined Sugars</span>
            </div>
            <div className="w-px h-8 bg-espresso/20 align-middle self-center" />
            <div className="text-center shrink-0">
              <span className="block font-mono text-xl font-bold text-espresso">Fair</span>
              <span className="block text-[10px] uppercase tracking-widest font-mono text-mochabrown mt-0.5">Trade Direct</span>
            </div>
          </div>
        </div>
      </section>

      {/* 7. TESTIMONIALS SECTION */}
      <section id="testimonials-section-anchor" className="py-24 bg-white border-y border-espresso/5 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Testimonials Header */}
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-mono uppercase bg-espresso/5 border border-espresso/10 text-espresso px-3 py-1 rounded-full">
              06. community voice
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-dark-brown mt-4 tracking-tight leading-tight">
              Loved By Aesthetic Souls
            </h2>
            <p className="font-sans text-sm text-mochabrown mt-2 leading-relaxed">
              Read authentic feedback left by digital nomads, local student groups, and creative photographers.
            </p>
          </div>

          <ReviewsSection />

        </div>
      </section>

      {/* 8. LOCATION & RSVP SECTION (Split Screen with SVG Map) */}
      <section id="location-rsvp-anchor" className="py-24 bg-cream relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            
            {/* Left Col (5/12 area): Interactive Custom SVG Map */}
            <div className="lg:col-span-5 bg-white border border-espresso/12 rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-xs">
              <div>
                <span className="text-xs font-mono text-mochabrown uppercase tracking-widest flex items-center gap-1.5 mb-1">
                  <Compass className="w-4 h-4 text-espresso animate-spin" style={{ animationDuration: '10s' }} />
                  Studio coordinates
                </span>
                <h3 className="font-display font-extrabold text-xl md:text-2xl text-dark-brown">
                  Interactive Studio Map
                </h3>
                <p className="font-sans text-xs text-mochabrown mt-1">
                  East Village Block • Click neighborhood pins to see details!
                </p>
              </div>

              {/* Vector Custom Drawn Map Container */}
              <div className="relative border border-espresso/10 bg-cream/35 rounded-2xl p-2 my-6 overflow-hidden h-[260px] select-none shadow-inner">
                {/* Custom Map Illustration */}
                <svg viewBox="0 80 400 240" className="w-full h-full text-espresso/40">
                  {/* Streets Grid */}
                  <path d="M 50 80 Q 80 180 50 320" fill="none" stroke="#EDE7DD" strokeWidth="24" strokeLinecap="round" />
                  <path d="M 330 80 L 330 320" fill="none" stroke="#EDE7DD" strokeWidth="20" strokeLinecap="round" />
                  <path d="M 0 160 L 400 160" fill="none" stroke="#EDE7DD" strokeWidth="24" strokeLinecap="round" />
                  <path d="M 0 260 L 400 260" fill="none" stroke="#EDE7DD" strokeWidth="20" strokeLinecap="round" />

                  {/* Street Labels */}
                  <text x="75" y="145" fill="#7C6354" fontSize="8" fontFamily="monospace" letterSpacing="1" opacity="0.8">BLOOM BLVD</text>
                  <text x="210" y="245" fill="#7C6354" fontSize="8" fontFamily="monospace" letterSpacing="1" opacity="0.8">ESPRESSO WAY</text>
                  <text x="345" y="110" fill="#7C6354" fontSize="8" fontFamily="monospace" letterSpacing="1" opacity="0.8" transform="rotate(90, 345, 110)">PLASTER AVE</text>

                  {/* Parks Or Green Areas */}
                  <rect x="100" y="85" width="80" height="50" rx="12" fill="#A8C3A0" opacity="0.25" />
                  <rect x="20" y="185" width="100" height="55" rx="8" fill="#F6D5E1" opacity="0.2" />

                  {/* Aesthetic Dotted lines paths */}
                  <path d="M120 120 L220 200" fill="none" stroke="#2D1F18" strokeWidth="1" strokeDasharray="3 3" opacity="0.3" />
                </svg>

                {/* Map Pins overlay buttons */}
                {/* 1. Brew & Bloom Main Café */}
                <button
                  id="poi-pin-bb"
                  onClick={() => setSelectedPOI('bb')}
                  className="absolute left-[54%] top-[60%] -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer group/pin"
                  title="Brew & Bloom Café"
                >
                  <span className="absolute inset-0 bg-espresso/20 rounded-full animate-ping scale-150" />
                  <div className="w-8 h-8 rounded-full bg-espresso border border-cream shadow-md flex items-center justify-center text-cream hover:bg-dark-brown hover:scale-110 transition-transform">
                    ☕
                  </div>
                </button>

                {/* 2. Meadow Park */}
                <button
                  id="poi-pin-park"
                  onClick={() => setSelectedPOI('park')}
                  className="absolute left-[34%] top-[38%] -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer"
                  title="Meadow Park"
                >
                  <div className="w-6 h-6 rounded-full bg-matcha border border-cream shadow-sm flex items-center justify-center text-cream hover:scale-110 transition-transform">
                    🌳
                  </div>
                </button>

                {/* 3. Art Gallery */}
                <button
                  id="poi-pin-gallery"
                  onClick={() => setSelectedPOI('gallery')}
                  className="absolute left-[15%] top-[74%] -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer"
                  title="Sunset Art Gallery"
                >
                  <div className="w-6 h-6 rounded-full bg-peach border border-cream shadow-sm flex items-center justify-center text-cream hover:scale-110 transition-transform">
                    🎨
                  </div>
                </button>

                {/* 4. Metro Station */}
                <button
                  id="poi-pin-metro"
                  onClick={() => setSelectedPOI('metro')}
                  className="absolute left-[82%] top-[32%] -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer"
                  title="Metro Station"
                >
                  <div className="w-6 h-6 rounded-full bg-mochabrown border border-cream shadow-sm flex items-center justify-center text-cream hover:scale-110 transition-transform">
                    🚇
                  </div>
                </button>

                {/* Map Guide Labels inside panel */}
                <div className="absolute bottom-2 left-2 right-2 bg-white/85 backdrop-blur-md rounded-lg p-1.5 flex items-center justify-between text-[8px] font-mono border border-espresso/10">
                  <span className="flex items-center gap-0.5">● Brew & Bloom (Main)</span>
                  <span className="flex items-center gap-0.5 text-matcha">● Park</span>
                  <span className="flex items-center gap-0.5 text-peach">● Gallery</span>
                </div>
              </div>

              {/* POI descriptive details overlay card */}
              <div className="min-h-[100px] border border-espresso/10 bg-warm-beige/25 rounded-2xl p-4 flex flex-col justify-between">
                <AnimatePresence mode="wait">
                  {selectedPOI ? (
                    <motion.div
                      key={selectedPOI}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="space-y-1"
                    >
                      <div className="flex justify-between items-center">
                        <h4 className="font-display font-extrabold text-sm text-dark-brown">
                          {pointsOfInterest[selectedPOI].title}
                        </h4>
                        <span className="text-[10px] bg-espresso/5 border border-espresso/10 rounded-md px-1.5 font-mono text-mochabrown uppercase font-semibold">
                          {pointsOfInterest[selectedPOI].dist}
                        </span>
                      </div>
                      <p className="font-sans text-xs text-mochabrown leading-relaxed">
                        {pointsOfInterest[selectedPOI].desc}
                      </p>
                    </motion.div>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center h-full text-mochabrown py-2">
                      <Compass className="w-5 h-5 text-mochabrown/55 mb-1.5 animate-pulse" />
                      <p className="text-xs font-mono font-medium">Click any icon above to read neighbors!</p>
                      <p className="text-[10px] text-mochabrown/70 leading-normal">Our block is stacked with creative spots.</p>
                    </div>
                  )}
                </AnimatePresence>
                
                {selectedPOI && (
                  <button
                    id="deselect-poi"
                    onClick={() => setSelectedPOI(null)}
                    className="text-[10px] font-mono text-espresso hover:underline border-t border-espresso/10 pt-2 text-right mt-1.5 block w-full self-end"
                  >
                    Reset Map Guide
                  </button>
                )}
              </div>

              {/* Contact metadata */}
              <div className="mt-6 pt-4 border-t border-espresso/10 grid grid-cols-2 gap-4 text-xs font-mono">
                <div>
                  <span className="block text-[10px] text-mochabrown uppercase font-medium">Coordinate</span>
                  <p className="font-bold text-dark-brown">254 East Village Blvd, NY</p>
                </div>
                <div>
                  <span className="block text-[10px] text-mochabrown uppercase font-medium">Phone Support</span>
                  <p className="font-semibold text-dark-brown">hello@brewbloom.co</p>
                </div>
              </div>
            </div>

            {/* Right Col (7/12 area): Reservation Form Form */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <ReservationForm />
            </div>

          </div>

        </div>
      </section>

      {/* 9. INSTAGRAM FEED */}
      <section className="py-24 bg-white border-y border-espresso/5 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <InstagramFeed />
        </div>
      </section>

      {/* 10. FOOTER SECTION */}
      <footer className="bg-dark-brown text-cream pt-20 pb-10 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/10">
            
            {/* Logo and tag line */}
            <div className="md:col-span-5 space-y-4">
              <span className="font-serif text-2xl font-bold tracking-wide uppercase text-cream">
                Brew & Bloom
              </span>
              <p className="font-sans text-xs md:text-sm text-warm-beige/85 font-light leading-relaxed max-w-sm">
                A warm, sun-drenched architectural sanctuary for creative minds, offering ceremonial uji matchas, single-origin double-espressos, and lovely handmade brioche brunch plates.
              </p>
              
              <div className="flex gap-4 pt-1 select-none">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 border border-white/10 hover:border-peach rounded-full hover:bg-white/5 text-warm-beige hover:text-cream transition-colors text-xs" title="Instagram">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="#" className="p-2 border border-white/10 hover:border-peach rounded-full hover:bg-white/5 text-warm-beige hover:text-cream transition-colors text-xs" title="Curated Playlist">
                  <Music className="w-4 h-4" />
                </a>
                <a href="#" className="p-2 border border-white/10 hover:border-peach" title="Our community counts">
                  <div className="flex items-center gap-1 px-1.5 py-px text-[10px] font-mono leading-none">
                    <Heart className="w-3.5 h-3.5 fill-peach text-peach" /> 16.5k
                  </div>
                </a>
              </div>
            </div>

            {/* Quick Links Column */}
            <div className="md:col-span-3 space-y-4">
              <h5 className="font-display text-xs font-semibold uppercase tracking-wider text-warm-beige font-semibold">
                Sipping Spots
              </h5>
              <div className="flex flex-col gap-2.5 text-xs font-mono text-warm-beige/70">
                <a href="#about-section-anchor" className="hover:text-cream hover:underline transition-colors">Philosophy</a>
                <a href="#menu-scroll-anchor" className="hover:text-cream hover:underline transition-colors">Signature Menus</a>
                <a href="#experience-section-anchor" className="hover:text-cream hover:underline transition-colors">Workspace & Audio</a>
                <a href="#gallery-section-anchor" className="hover:text-cream hover:underline transition-colors">Pinterest Gallery</a>
                <a href="#testimonials-section-anchor" className="hover:text-cream hover:underline transition-colors">Reviews Map</a>
                <a href="#location-rsvp-anchor" className="hover:text-cream hover:underline transition-colors font-bold text-peach">Reservation Desk</a>
              </div>
            </div>

            {/* Newsletter Column */}
            <div className="md:col-span-4 space-y-4">
              <h5 className="font-display text-xs font-semibold uppercase tracking-wider text-warm-beige font-semibold">
                Monthly Menu Drops
              </h5>
              <p className="font-sans text-xs text-warm-beige/70 leading-relaxed font-light">
                Sign up to obtain fresh beverage release notes, secret workspace bookings, and invite-only tasting tables. Zero spam.
              </p>

              {newsletterSubbed ? (
                <div className="p-3 bg-matcha/20 text-cream rounded-xl border border-matcha/40 text-xs font-mono flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-peach animate-pulse" />
                  <span>Welcome to the community! 🌸</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex gap-2 w-full">
                  <input
                    id="newsletter-email"
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="you@creativesoul.com"
                    className="flex-1 text-xs px-3.5 py-2.5 bg-white/10 text-cream border border-white/15 focus:border-peach focus:bg-white/20 rounded-xl focus:outline-none transition-colors"
                  />
                  <button
                    id="newsletter-submit-btn"
                    type="submit"
                    className="p-3 bg-peach text-dark-brown hover:bg-cream rounded-xl transition-all font-mono font-bold text-xs select-none active:scale-95 flex items-center justify-center shrink-0"
                    title="Subscribe"
                  >
                    <Mail className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>

          </div>

          {/* Footer bottom metadata credits */}
          <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-mono text-warm-beige/40">
            <div className="flex items-center gap-1.5">
              <span>© 2026 Brew & Bloom Café. All Rights Resided.</span>
              <span>•</span>
              <a href="#" className="hover:underline">Privacy policy</a>
            </div>
            <span>designed for gorgeous conversations and lingering moments.</span>
          </div>

        </div>
      </footer>

      {/* STICKY FLUID SCROLL TO TOP BTN ON DESKTOP */}
      <button
        id="scroll-to-top"
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-40 bg-espresso hover:bg-dark-brown hover:scale-105 text-cream border border-espresso/10 p-3 rounded-full shadow-md cursor-pointer transition-all active:scale-90"
        title="Scroll to top"
      >
        <ArrowUp className="w-4 h-4" />
      </button>

    </div>
  );
}

// Micro local utility for Scroll indicator on top
function ScrollIndicator() {
  const { scrollYProgress } = useScroll();
  const widthTransform = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <motion.div 
      className="h-full bg-espresso"
      style={{ width: widthTransform }}
    />
  );
}
