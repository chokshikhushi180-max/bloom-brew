import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, Heart, Sparkles, ShoppingBag, Trash2, Eye, Info } from 'lucide-react';
import { MenuItem } from '../types';
import { MENU_ITEMS } from '../data';

interface MenuSectionProps {
  onWishlistChange?: (count: number) => void;
}

export default function MenuSection({ onWishlistChange }: MenuSectionProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | 'coffee' | 'specialty' | 'pastries' | 'brunch'>('all');
  const [wishlist, setWishlist] = useState<MenuItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<MenuItem | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const categories = [
    { id: 'all', label: 'All Goodies 🧁' },
    { id: 'specialty', label: 'Matcha & Specialties 🍵' },
    { id: 'coffee', label: 'Craft Coffee ☕' },
    { id: 'brunch', label: 'Editorial Brunch 🥞' },
    { id: 'pastries', label: 'Artisanal Pastries 🥐' }
  ];

  const filteredItems = activeCategory === 'all' 
    ? MENU_ITEMS 
    : MENU_ITEMS.filter(item => item.category === activeCategory);

  const toggleWishlist = (item: MenuItem) => {
    setWishlist((prev) => {
      const exists = prev.some((i) => i.id === item.id);
      let updated: MenuItem[];
      if (exists) {
        updated = prev.filter((i) => i.id !== item.id);
      } else {
        updated = [...prev, item];
      }
      if (onWishlistChange) {
        onWishlistChange(updated.length);
      }
      return updated;
    });
  };

  const clearWishlist = () => {
    setWishlist([]);
    if (onWishlistChange) {
      onWishlistChange(0);
    }
  };

  const calculateTotal = () => {
    const sum = wishlist.reduce((acc, item) => {
      const priceVal = parseFloat(item.price.replace('$', ''));
      return acc + priceVal;
    }, 0);
    return `$${sum.toFixed(2)}`;
  };

  const scrollLeftBtn = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRightBtn = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  return (
    <div id="signature-menu-section" className="w-full relative py-6">
      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-10 overflow-x-auto px-4 pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            id={`menu-cat-tab-${cat.id}`}
            key={cat.id}
            onClick={() => setActiveCategory(cat.id as any)}
            className={`px-5 py-2.5 rounded-full font-sans text-xs uppercase tracking-wider font-semibold transition-all duration-300 shrink-0 select-none ${
              activeCategory === cat.id
                ? 'bg-matcha text-white shadow-sm scale-102 font-bold'
                : 'bg-warm-beige/35 text-dark-brown hover:bg-warm-beige/65 hover:scale-[1.01]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Main horizontal scrolling layout with navigation arrows */}
      <div className="relative group/scroll px-4 md:px-12">
        {/* Navigation Arrows (Visible on desktop hover) */}
        <button
          id="scroll-menu-left"
          onClick={scrollLeftBtn}
          className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-white hover:bg-cream border border-espresso/10 rounded-full flex items-center justify-center shadow-md text-mochabrown hover:text-espresso transition-all scale-0 group-hover/scroll:scale-100 duration-300 cursor-pointer"
          title="Scroll left"
        >
          <ChevronRight className="w-5 h-5 rotate-180" />
        </button>
        <button
          id="scroll-menu-right"
          onClick={scrollRightBtn}
          className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-white hover:bg-cream border border-espresso/10 rounded-full flex items-center justify-center shadow-md text-mochabrown hover:text-espresso transition-all scale-0 group-hover/scroll:scale-100 duration-300 cursor-pointer"
          title="Scroll right"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Scrolling Cards Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto overflow-y-hidden snap-x snap-mandatory py-4 scroll-smooth scrollbar-thin px-4"
          style={{ scrollbarWidth: 'none' }}
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => {
              const isAdded = wishlist.some((i) => i.id === item.id);
              return (
                <motion.div
                  key={item.id}
                  layoutId={`menu-card-${item.id}`}
                  className="w-[280px] sm:w-[320px] shrink-0 bg-white border border-espresso/10 rounded-2xl overflow-hidden snap-start shadow-xs hover:shadow-md transition-shadow group/card relative flex flex-col justify-between"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Badges Overlay */}
                  <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 pointer-events-none">
                    {item.isPopular && (
                      <span className="bg-espresso text-cream text-[9px] font-mono tracking-wider font-semibold py-0.5 px-2 rounded-full uppercase flex items-center gap-1">
                        <Sparkles className="w-2.5 h-2.5" /> Best Seller
                      </span>
                    )}
                    {item.isGlutenFree && (
                      <span className="bg-peach/85 text-dark-brown text-[9px] font-mono tracking-wider font-semibold py-0.5 px-2 rounded-full uppercase">
                        GF Friendly
                      </span>
                    )}
                    {item.isVegan && (
                      <span className="bg-matcha text-cream text-[9px] font-mono tracking-wider font-semibold py-0.5 px-2 rounded-full uppercase">
                        Plant-Based
                      </span>
                    )}
                  </div>

                  {/* Product Image Component with zoom hover */}
                  <div className="relative h-[220px] overflow-hidden bg-cream shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Floating Actions on image */}
                    <div className="absolute top-3 right-3 flex flex-col gap-2">
                      <button
                        id={`wishlist-toggle-${item.id}`}
                        onClick={() => toggleWishlist(item)}
                        className={`p-2.5 rounded-full backdrop-blur-md border shadow-xs transition-transform active:scale-90 ${
                          isAdded
                            ? 'bg-peach border-peach text-dark-brown'
                            : 'bg-white/70 border-white/40 text-espresso hover:bg-white hover:scale-105'
                        }`}
                        title={isAdded ? "Remove from wishlist" : "Add to wishlist"}
                      >
                        <Heart className={`w-4 h-4 ${isAdded ? 'fill-current' : ''}`} />
                      </button>
                      
                      <button
                        id={`preview-item-${item.id}`}
                        onClick={() => setSelectedProduct(item)}
                        className="p-2.5 rounded-full bg-white/70 backdrop-blur-md border border-white/40 text-espresso hover:bg-white transition-transform hover:scale-105 active:scale-90 shadow-xs"
                        title="Quick View"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Body Text */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h4 className="font-display text-base font-bold text-dark-brown group-hover/card:text-espresso transition-colors">
                          {item.name}
                        </h4>
                        <span className="font-mono text-sm font-semibold text-espresso shrink-0">
                          {item.price}
                        </span>
                      </div>
                      <p className="font-sans text-[13px] text-mochabrown line-clamp-3 mb-4 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <button
                      id={`add-to-tray-btn-${item.id}`}
                      onClick={() => toggleWishlist(item)}
                      className={`w-full py-2 rounded-xl text-xs font-semibold font-display border transition-all flex items-center justify-center gap-1.5 ${
                        isAdded
                          ? 'bg-peach/15 border-peach text-espresso font-semibold'
                          : 'bg-white border-espresso/20 text-espresso hover:bg-espresso hover:text-cream shadow-xs'
                      }`}
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      {isAdded ? 'Wishlist Selected ✓' : 'Add to Wishlist'}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Floating interactive wishlist drawer/tray if not empty */}
      <AnimatePresence>
        {wishlist.length > 0 && (
          <motion.div
            key="wishlist-drawer"
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            className="fixed bottom-4 left-4 right-4 md:left-auto md:right-10 z-40 max-w-sm w-full bg-dark-brown border border-espresso/20 text-cream rounded-2xl shadow-xl p-5"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-matcha rounded-full flex items-center justify-center text-xs font-mono font-bold text-cream">
                  {wishlist.length}
                </div>
                <div>
                  <h5 className="font-display text-sm font-bold tracking-tight">Your Custom Spread</h5>
                  <p className="text-[10px] text-mochabrown font-mono">Table Spread Preview</p>
                </div>
              </div>
              <button
                id="clear-wishlist-tray"
                onClick={clearWishlist}
                className="text-[11px] font-mono text-peach hover:underline flex items-center gap-1"
              >
                <Trash2 className="w-3 h-3" /> Clear
              </button>
            </div>

            {/* List of spread elements */}
            <div className="max-h-[140px] overflow-y-auto mb-4 space-y-2.5 pr-1 scrollbar-thin">
              {wishlist.map((item) => (
                <div key={item.id} className="flex items-center justify-between text-xs font-sans">
                  <div className="flex items-center gap-2 min-w-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 object-cover rounded-lg shrink-0"
                    />
                    <span className="truncate text-cream font-medium">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 ml-3">
                    <span className="font-mono text-[11px] text-warm-beige">{item.price}</span>
                    <button
                      id={`remove-spread-item-${item.id}`}
                      onClick={() => toggleWishlist(item)}
                      className="text-white/40 hover:text-peach shrink-0"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-white/10 pt-3 flex items-center justify-between mb-4">
              <span className="text-[11px] text-warm-beige/80 uppercase font-mono tracking-wider">Est. Spread Cost</span>
              <span className="text-sm font-display font-bold text-peach">{calculateTotal()}</span>
            </div>

            {/* Micro Call to Action inside tray */}
            <a
              id="wishlist-to-rsvp-link"
              href="#location-rsvp-anchor"
              className="block w-full bg-cream hover:bg-white text-dark-brown text-center py-2 rounded-xl text-xs font-semibold font-display shadow-md transition-all active:scale-[0.98]"
            >
              Reserve Seating For This Spread
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* QUICK VIEW POPUP MODAL */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 bg-black/45 z-55 flex items-center justify-center p-4 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-cream rounded-3xl max-w-lg w-full overflow-hidden border border-espresso/10 p-5 md:p-6 shadow-xl relative"
            >
              <button
                id="close-quick-view-modal"
                onClick={() => setSelectedProduct(null)}
                className="absolute top-3 right-3 z-10 w-9 h-9 bg-white/70 hover:bg-white backdrop-blur-md rounded-full flex items-center justify-center font-bold text-dark-brown hover:text-espresso shadow-xs cursor-pointer"
              >
                ✕
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch">
                <div className="w-full h-[180px] md:h-full min-h-[200px] overflow-hidden rounded-2xl bg-white shadow-xs">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex flex-col justify-between pt-1">
                  <div>
                    <span className="text-[10px] font-mono uppercase bg-espresso/5 border border-espresso/10 text-espresso px-2 py-0.5 rounded-full inline-block">
                      {selectedProduct.category} specialty
                    </span>
                    <h3 className="font-display text-xl font-bold text-dark-brown mt-2.5">
                      {selectedProduct.name}
                    </h3>
                    <p className="font-mono text-base font-bold text-espresso mt-1">
                      {selectedProduct.price}
                    </p>
                    <p className="font-sans text-xs text-mochabrown leading-relaxed mt-3 pb-3">
                      {selectedProduct.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      <span className="text-[9px] font-mono border border-espresso/10 py-0.5 px-2 rounded-md bg-white">
                        🥛 Pasture Milks
                      </span>
                      <span className="text-[9px] font-mono border border-espresso/10 py-0.5 px-2 rounded-md bg-white">
                        🍯 Cane Sugar Free
                      </span>
                      <span className="text-[9px] font-mono border border-espresso/10 py-0.5 px-2 rounded-md bg-white">
                        🌿 Organic Origin
                      </span>
                    </div>
                  </div>

                  <button
                    id="modal-wishlist-add-on"
                    onClick={() => {
                      toggleWishlist(selectedProduct);
                      setSelectedProduct(null);
                    }}
                    className="w-full mt-6 bg-espresso hover:bg-dark-brown text-cream text-center py-2.5 rounded-xl text-xs font-semibold font-display shadow-md transition-all flex items-center justify-center gap-1.5"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    {wishlist.some(i => i.id === selectedProduct.id) ? 'Remove Custom Spread' : 'Collect to Custom Spread'}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
