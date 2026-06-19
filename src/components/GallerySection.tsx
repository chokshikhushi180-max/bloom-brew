import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Eye, Camera, MapPin } from 'lucide-react';
import { GalleryItem } from '../types';
import { GALLERY_ITEMS } from '../data';

export default function GallerySection() {
  const [activeTab, setActiveTab] = useState<'all' | 'interior' | 'brews' | 'brunch' | 'vibe'>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null);

  const tabs = [
    { id: 'all', label: 'All Snaps' },
    { id: 'interior', label: 'Space & Interiør' },
    { id: 'brews', label: 'Slow Brews' },
    { id: 'brunch', label: 'The Plates' },
    { id: 'vibe', label: 'Vibe Checks' }
  ];

  const filteredPhotos = activeTab === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(photo => photo.category === activeTab);

  const photoDescriptions: Record<string, string> = {
    g1: 'The heart of Brew & Bloom. Designed with modular organic oak seating, smooth micro-cement walls, and an 8-foot olive tree catching warmth through the grand custom arch window. Optimal for quiet laptop sessions or shared morning plates.',
    g2: 'Our slow-bar setup features precision Japanese glass drippers and custom slow-roasted Ethiopian heirloom beans. Every single cup is extracted to order with water at constant temperature, releasing intense floral peach jasmine notes.',
    g3: 'Sundays are meant for slow sharing. Crisp morning linen, golden-hour tea lights, and cold glasses of iced strawberry matcha shared with your favorite creative minds.',
    g4: 'Cozy textural corners. Hand-woven Belgian linen cushions on bespoke oiled solid oak benches offer comfort for hours of creative focus or friendly giggles.',
    g5: 'High-contrast studio layouts. A flat-lay showcase of our espresso roast, fresh seasonal pastries, and editorial notebooks on textured travertine tiles.',
    g6: 'The ritual of weekend brunch. Soft-boiled woodland eggs, double-crust brioche toast, and rich artisan spreads arranged for beautiful conversations.'
  };

  return (
    <div id="gallery-component-wrapper" className="w-full">
      {/* Category Toggles */}
      <div className="flex justify-center flex-wrap gap-2.5 mb-8">
        {tabs.map((tab) => (
          <button
            id={`gallery-filter-tab-${tab.id}`}
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-full font-mono text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
              activeTab === tab.id
                ? 'bg-espresso text-cream shadow-sm scale-102 font-bold'
                : 'bg-warm-beige/25 text-mochabrown hover:bg-warm-beige/55'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Masonry / Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px] md:auto-rows-[280px]">
        <AnimatePresence mode="popLayout">
          {filteredPhotos.map((photo, index) => (
            <motion.div
              layout
              id={`gallery-item-${photo.id}`}
              key={photo.id}
              className={`relative overflow-hidden bg-cream border border-espresso/10 rounded-2xl cursor-pointer group/photo ${photo.cols || 'md:col-span-1'} ${photo.rows || 'md:row-span-1'}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              onClick={() => setSelectedPhoto(photo)}
            >
              <img
                src={photo.image}
                alt={photo.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover/photo:scale-[1.03] transition-transform duration-700"
              />

              {/* Hover backdrop gradient */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-dark-brown via-dark-brown/30 to-transparent p-5 opacity-0 group-hover/photo:opacity-100 transition-opacity duration-300 flex flex-col justify-end pointer-events-none">
                <span className="text-[10px] uppercase font-mono text-peach tracking-widest flex items-center gap-1">
                  <Camera className="w-3 h-3" /> Instagram Spot
                </span>
                <h4 className="font-display font-medium text-cream text-base mt-1 tracking-wide">
                  {photo.title}
                </h4>
                <p className="font-sans text-[11px] text-warm-beige/8 relative z-10 line-clamp-1 mt-1 font-light">
                  {photoDescriptions[photo.id]}
                </p>
              </div>

              {/* Interactive micro badge at top-right */}
              <div className="absolute top-3 right-3 bg-white/75 backdrop-blur-md border border-espresso/5 rounded-full p-2 text-dark-brown hover:bg-white scale-0 group-hover/photo:scale-100 transition-transform duration-300 shadow-xs flex items-center justify-center">
                <Eye className="w-3.5 h-3.5" />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* FULL EXPAND LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedPhoto && (
          <div className="fixed inset-0 bg-dark-brown/90 z-55 flex items-center justify-center p-4 md:p-8 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="max-w-4xl w-full bg-cream rounded-3xl overflow-hidden border border-espresso/10 p-4 md:p-6 shadow-2xl relative flex flex-col md:flex-row gap-6 items-stretch"
            >
              {/* Close Button */}
              <button
                id="close-gallery-lightbox"
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-3 right-3 z-20 w-9 h-9 bg-white/70 hover:bg-white rounded-full flex items-center justify-center font-bold text-dark-brown hover:text-espresso shadow-xs cursor-pointer"
              >
                ✕
              </button>

              {/* Photo Area */}
              <div className="md:w-[55%] h-[240px] md:h-full min-h-[300px] overflow-hidden rounded-2xl bg-white shadow-xs select-none relative shrink-0">
                <img
                  src={selectedPhoto.image}
                  alt={selectedPhoto.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Copy Area */}
              <div className="flex flex-col justify-between py-1 flex-1 min-w-0">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-mochabrown font-mono">
                    <Camera className="w-3.5 h-3.5" />
                    <span>aesthetic snaps • category: {selectedPhoto.category}</span>
                  </div>
                  
                  <h3 className="font-display text-xl md:text-2xl font-bold text-dark-brown mt-3">
                    {selectedPhoto.title}
                  </h3>

                  <div className="h-px bg-espresso/10 my-4" />

                  <p className="font-sans text-xs md:text-sm text-mochabrown leading-relaxed text-balance">
                    {photoDescriptions[selectedPhoto.id]}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-espresso/10 flex flex-col gap-3">
                  <div className="flex items-center gap-2 text-xs text-mochabrown font-mono font-medium">
                    <MapPin className="w-3.5 h-3.5 text-matcha" />
                    <span>Brew & Bloom, Main Hall Studio</span>
                  </div>
                  
                  <div className="flex gap-2">
                    <span className="text-[10px] font-mono border border-espresso/10 py-1 px-2.5 rounded-full bg-white select-none">
                      ⚙️ f/1.8 Aperture
                    </span>
                    <span className="text-[10px] font-mono border border-espresso/10 py-1 px-2.5 rounded-full bg-white select-none">
                      ☀️ Sun-Drenched Natural Light
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
