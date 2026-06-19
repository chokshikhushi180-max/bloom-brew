import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ChevronLeft, ChevronRight, CheckCircle, Smile, PlusCircle, Sparkles } from 'lucide-react';
import { Review } from '../types';
import { INITIAL_REVIEWS } from '../data';

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  
  // Form states
  const [name, setName] = useState<string>('');
  const [handle, setHandle] = useState<string>('');
  const [rating, setRating] = useState<number>(5);
  const [text, setText] = useState<string>('');
  const [showFormSuccess, setShowFormSuccess] = useState<boolean>(false);

  // Auto carousel rotation
  useEffect(() => {
    if (showAddForm) return; // pause auto slide while submitting form
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % reviews.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [reviews, showAddForm]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % reviews.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !text) return;

    const formattedHandle = handle.startsWith('@') ? handle : `@${handle || 'creative_soul'}`;
    const newReview: Review = {
      id: `r-user-${Date.now()}`,
      name,
      handle: formattedHandle,
      rating,
      text,
      date: 'Just now',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150' // classic premium Gen-Z default portrait
    };

    setReviews((prev) => [newReview, ...prev]);
    setActiveIndex(0); // focus on newly added review
    setShowFormSuccess(true);
    
    // Reset form
    setName('');
    setHandle('');
    setRating(5);
    setText('');

    setTimeout(() => {
      setShowFormSuccess(false);
      setShowAddForm(false);
    }, 2000);
  };

  return (
    <div id="reviews-component-wrapper" className="w-full max-w-xl mx-auto flex flex-col items-center">
      
      {/* Testimonials Window Card */}
      <div className="w-full relative min-h-[220px] bg-warm-beige/30 hover:bg-warm-beige/45 border border-espresso/15 rounded-3xl p-6 md:p-8 flex flex-col justify-between overflow-hidden shadow-xs transition-colors">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -25 }}
            transition={{ duration: 0.35 }}
            className="flex flex-col justify-between h-full"
          >
            {/* Stars */}
            <div>
              <div className="flex gap-1.5 text-espresso mb-4">
                {Array.from({ length: reviews[activeIndex].rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-espresso" />
                ))}
              </div>

              {/* Review Text */}
              <p className="font-serif italic text-base md:text-lg text-dark-brown/95 leading-relaxed">
                "{reviews[activeIndex].text}"
              </p>
            </div>

            {/* Reviewer Meta */}
            <div className="flex items-center gap-3.5 mt-6 border-t border-espresso/10 pt-4">
              <img
                src={reviews[activeIndex].avatar}
                alt={reviews[activeIndex].name}
                referrerPolicy="no-referrer"
                className="w-10 h-10 object-cover rounded-full border border-espresso/15 shadow-xs"
              />
              <div className="min-w-0 flex-1">
                <span className="block font-display text-sm font-bold text-dark-brown leading-tight">
                  {reviews[activeIndex].name}
                </span>
                <span className="block font-mono text-[11px] text-mochabrown">
                  {reviews[activeIndex].handle} • {reviews[activeIndex].date}
                </span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Floating background graphic for coffee aesthetic */}
        <div className="absolute -bottom-8 -right-8 w-16 h-16 bg-espresso/5 rounded-full filter blur-md pointer-events-none" />
      </div>

      {/* Control row */}
      <div className="flex items-center justify-between w-full mt-5 px-1.5">
        <div className="flex gap-2">
          <button
            id="prev-testimonial"
            onClick={handlePrev}
            className="p-2 border border-espresso/10 rounded-full hover:bg-espresso/10 text-mochabrown hover:text-espresso transition-colors"
            title="Previous testimonial"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          <button
            id="next-testimonial"
            onClick={handleNext}
            className="p-2 border border-espresso/10 rounded-full hover:bg-espresso/10 text-mochabrown hover:text-espresso transition-colors"
            title="Next testimonial"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Floating Indicator Dots */}
        <div className="flex gap-1.5">
          {reviews.map((_, i) => (
            <button
              id={`testimonial-dot-${i}`}
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`h-1.5 rounded-full transition-all ${
                activeIndex === i ? 'w-5 bg-espresso' : 'w-1.5 bg-espresso/20'
              }`}
              title={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        <button
          id="toggle-review-composer"
          onClick={() => setShowAddForm(!showAddForm)}
          className="text-xs font-mono font-bold text-espresso hover:underline flex items-center gap-1 hover:text-dark-brown active:scale-95 transition-transform"
        >
          <PlusCircle className="w-4 h-4" /> Leave Review
        </button>
      </div>

      {/* COMPOSER SLIDEOUT DRAWER PANEL */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="w-full bg-cream border border-espresso/10 p-5 rounded-2xl shadow-inner mt-6 overflow-hidden"
          >
            {showFormSuccess ? (
              <div className="py-6 flex flex-col items-center text-center justify-center">
                <CheckCircle className="w-8 h-8 text-espresso mb-2 animate-bounce" />
                <h4 className="font-display font-bold text-dark-brown text-base">Vibe Added Successfully!</h4>
                <p className="font-mono text-xs text-mochabrown mt-1">Check it out on the carousel main screen.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-espresso/10 mb-2">
                  <span className="text-xs font-mono font-bold text-mochabrown flex items-center gap-1">
                    <Smile className="w-3.5 h-3.5" /> Speak Your Truth
                  </span>
                  <button
                    id="close-review-composer"
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="text-xs font-mono text-espresso/60 hover:text-espresso"
                  >
                    Cancel
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-mono text-mochabrown uppercase tracking-wider mb-1">
                      Your Name
                    </label>
                    <input
                      id="review-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g., Emily W."
                      className="w-full text-xs p-2 rounded-lg border border-espresso/20 bg-white/50 focus:bg-white text-dark-brown focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-mochabrown uppercase tracking-wider mb-1">
                      Instagram Handle
                    </label>
                    <input
                      id="review-handle"
                      type="text"
                      value={handle}
                      onChange={(e) => setHandle(e.target.value)}
                      placeholder="e.g., @emily_clicks"
                      className="w-full text-xs p-2 rounded-lg border border-espresso/20 bg-white/50 focus:bg-white text-dark-brown focus:outline-none"
                    />
                  </div>
                </div>

                {/* Star rating selector */}
                <div>
                  <label className="block text-[10px] font-mono text-mochabrown uppercase tracking-wider mb-1">
                    Authentic Star Rating
                  </label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        id={`review-rating-star-${star}`}
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="text-espresso p-1 cursor-pointer"
                        title={`Rate ${star} stars`}
                      >
                        <Star className={`w-5 h-5 ${rating >= star ? 'fill-espresso' : 'text-espresso/30'}`} />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message body */}
                <div>
                  <label className="block text-[10px] font-mono text-mochabrown uppercase tracking-wider mb-1">
                    Your Review
                  </label>
                  <textarea
                    id="review-text"
                    required
                    rows={2}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Describe your favorite coffee flavor, seating texture, or soundtrack recommendation..."
                    className="w-full text-xs p-2.5 rounded-lg border border-espresso/20 bg-white/50 focus:bg-white text-dark-brown focus:outline-none"
                  />
                </div>

                <button
                  id="submit-aesthetic-review"
                  type="submit"
                  className="w-full py-2 bg-espresso hover:bg-dark-brown text-cream font-display font-medium text-xs rounded-xl shadow-xs transition-all active:scale-98 flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 animate-pulse" /> Publish Review
                </button>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
