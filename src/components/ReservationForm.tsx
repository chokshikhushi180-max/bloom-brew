import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Clock, Users, CheckCircle, MapPin, Mail, Phone, User, Copy, RotateCcw, Sparkles } from 'lucide-react';
import { Reservation } from '../types';

export default function ReservationForm() {
  const [formData, setFormData] = useState<Reservation>({
    name: '',
    email: '',
    phone: '',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // tomorrow
    time: '11:00',
    guests: 2,
    locationPreference: 'window',
    specialRequests: ''
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [ticket, setTicket] = useState<Reservation | null>(null);
  const [copystate, setCopystate] = useState<string>('Copy Code');

  const locationLabels = {
    window: '📸 Sun-Drenched Arch Window',
    patio: '🌿 Plant-Covered Canopy Patio',
    workplace: '💻 High-Speed Study Corner',
    lounge: '🛋️ Cozy Couch Velvet Lounge',
    any: '✨ Best Available Aesthetic Spot'
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const adjustGuests = (amount: number) => {
    setFormData((prev) => {
      const current = prev.guests + amount;
      if (current >= 1 && current <= 10) {
        return { ...prev, guests: current };
      }
      return prev;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      alert('Please fill in your primary details first!');
      return;
    }

    setLoading(true);
    // Simulating API lag
    setTimeout(() => {
      setLoading(false);
      setTicket(formData);
    }, 1500);
  };

  const handleCopyTicket = () => {
    const text = `Brew & Bloom Reservation:
Name: ${ticket?.name}
Guests: ${ticket?.guests}
Date: ${ticket?.date}
Time: ${ticket?.time}
Spot: ${locationLabels[ticket?.locationPreference || 'any']}
Ref: BB-${Math.floor(100000 + Math.random() * 900000)}`;

    navigator.clipboard.writeText(text);
    setCopystate('Copied! 💅');
    setTimeout(() => setCopystate('Copy Code'), 2000);
  };

  const handleReset = () => {
    setTicket(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      time: '11:00',
      guests: 2,
      locationPreference: 'window',
      specialRequests: ''
    });
  };

  return (
    <div id="booking-section-wrapper" className="w-full max-w-xl mx-auto bg-cream border border-espresso/10 rounded-3xl p-6 md:p-8 shadow-sm">
      <AnimatePresence mode="wait">
        {!ticket ? (
          <motion.div
            key="reservation-form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            <div className="text-center mb-8">
              <span className="text-xs font-mono bg-espresso/5 border border-espresso/10 text-espresso uppercase tracking-widest px-3 py-1 rounded-full">
                Secure Your Seat
              </span>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-dark-brown mt-3">
                Book An Aesthetic Table
              </h3>
              <p className="font-sans text-sm text-mochabrown mt-1">
                Perfect layouts, soft coffees, and memory-making brunches.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label className="block text-xs font-mono font-medium text-espresso/85 uppercase tracking-wider mb-2">
                  What should we call you? *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-mochabrown opacity-60" />
                  <input
                    id="reservation-name-input"
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g., Emily Watson"
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-espresso/20 bg-white/50 focus:bg-white text-sm text-dark-brown focus:outline-none focus:ring-1 focus:ring-espresso focus:border-espresso transition-all"
                  />
                </div>
              </div>

              {/* Contact Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-medium text-espresso/85 uppercase tracking-wider mb-2">
                    Email address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-mochabrown opacity-60" />
                    <input
                      id="reservation-email-input"
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g., emily@gmail.com"
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-espresso/20 bg-white/50 focus:bg-white text-sm text-dark-brown focus:outline-none focus:ring-1 focus:ring-espresso focus:border-espresso transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-mono font-medium text-espresso/85 uppercase tracking-wider mb-2">
                    Phone number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 w-4 h-4 text-mochabrown opacity-60" />
                    <input
                      id="reservation-phone-input"
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="e.g., +1 (555) 012-3456"
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-espresso/20 bg-white/50 focus:bg-white text-sm text-dark-brown focus:outline-none focus:ring-1 focus:ring-espresso focus:border-espresso transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* DateTime & Guests Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-mono font-medium text-espresso/85 uppercase tracking-wider mb-2">
                    Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 w-4 h-4 text-mochabrown opacity-60 pointer-events-none" />
                    <input
                      id="reservation-date-input"
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-espresso/20 bg-white/50 focus:bg-white text-xs text-dark-brown focus:outline-none focus:ring-1 focus:ring-espresso transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-medium text-espresso/85 uppercase tracking-wider mb-2">
                    Time
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-3 w-4 h-4 text-mochabrown opacity-60 pointer-events-none" />
                    <select
                      id="reservation-time-select"
                      name="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-espresso/20 bg-white/50 focus:bg-white text-xs text-dark-brown focus:outline-none focus:ring-1 focus:ring-espresso appearance-none transition-all"
                    >
                      <option value="09:00">09:00 am (Morning Rays)</option>
                      <option value="10:00">10:00 am</option>
                      <option value="11:00">11:00 am (Prime Brunch)</option>
                      <option value="12:00">12:00 pm</option>
                      <option value="13:00">01:00 pm</option>
                      <option value="14:00">02:00 pm (Afternoon Sun)</option>
                      <option value="15:00">03:00 pm</option>
                      <option value="16:00">04:00 pm</option>
                      <option value="17:50">05:50 pm (Sunset Vibe)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-medium text-espresso/85 uppercase tracking-wider mb-2">
                    Guests
                  </label>
                  <div className="flex items-center justify-between border border-espresso/20 bg-white/50 rounded-xl px-2 py-1">
                    <button
                      id="decrement-guests"
                      type="button"
                      onClick={() => adjustGuests(-1)}
                      className="w-8 h-8 flex items-center justify-center rounded-lg bg-espresso/5 text-dark-brown hover:bg-espresso/15 font-bold transition-all"
                    >
                      -
                    </button>
                    <div className="flex items-center gap-1.5 font-mono text-sm font-semibold">
                      <Users className="w-4 h-4 text-espresso" />
                      <span>{formData.guests}</span>
                    </div>
                    <button
                      id="increment-guests"
                      type="button"
                      onClick={() => adjustGuests(1)}
                      className="w-8 h-8 flex items-center justify-center rounded-lg bg-espresso/5 text-dark-brown hover:bg-espresso/15 font-bold transition-all"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Seating Preference */}
              <div>
                <label className="block text-xs font-mono font-medium text-espresso/85 uppercase tracking-wider mb-2">
                  Select Seating Mood Preference
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {Object.entries(locationLabels).map(([key, label]) => (
                    <button
                      id={`seating-pref-${key}`}
                      key={key}
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, locationPreference: key as any }))}
                      className={`text-left text-xs p-3 rounded-xl border transition-all ${
                        formData.locationPreference === key
                          ? 'bg-espresso text-cream border-espresso font-medium shadow-sm'
                          : 'bg-white/40 border-espresso/10 text-dark-brown/95 hover:bg-white/80'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-mono font-medium text-espresso/85 uppercase tracking-wider mb-2">
                  Special Notes / Dietaries (Optional)
                </label>
                <textarea
                  id="reservation-requests-input"
                  name="specialRequests"
                  value={formData.specialRequests}
                  onChange={handleInputChange}
                  placeholder="Need sparklers for birthday, oat milk preference, gluten allergies etc..."
                  rows={2}
                  className="w-full p-3 rounded-xl border border-espresso/20 bg-white/50 focus:bg-white text-xs text-dark-brown focus:outline-none focus:ring-1 focus:ring-espresso focus:border-espresso transition-all"
                />
              </div>

              {/* Book Button */}
              <button
                id="submit-table-booking"
                type="submit"
                disabled={loading}
                className="w-full bg-matcha hover:bg-[#8da885] hover:scale-[1.01] text-white flex items-center justify-center gap-2.5 py-3.5 rounded-full font-sans text-xs uppercase tracking-[0.1em] font-semibold transition-all shadow-md active:scale-95 disabled:opacity-50"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Complete Digital RSVP
                  </>
                )}
              </button>
            </form>
          </motion.div>
        ) : (
          /* DIGITAL BOARDING PASS RECEIPT TICKET */
          <motion.div
            key="reservation-success-ticket"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center"
          >
            <div className="w-full max-w-sm bg-white rounded-3xl border border-dashed border-espresso/30 overflow-hidden shadow-lg relative p-6">
              {/* Sparkle badge */}
              <div className="absolute top-4 right-4 bg-matcha/20 text-dark-brown border border-matcha/40 rounded-full p-1 flex items-center justify-center animate-pulse">
                <Sparkles className="w-4 h-4 text-espresso" />
              </div>

              {/* Ticket header */}
              <div className="text-center pb-5 border-b border-dashed border-espresso/20">
                <span className="font-serif text-lg tracking-wide font-extrabold text-espresso">
                  BREW & BLOOM
                </span>
                <p className="text-[10px] uppercase tracking-widest font-mono text-mochabrown mt-1">
                  digital brunch invitation boarding pass
                </p>
              </div>

              {/* Confetti details */}
              <div className="my-6 space-y-4">
                <div className="flex items-center gap-2 justify-center py-1 bg-peach/10 text-dark-brown rounded-lg border border-peach/20">
                  <CheckCircle className="w-4 h-4 text-mochabrown" />
                  <span className="text-xs font-display font-medium text-mochabrown">
                    TABLE CONFIRMED • SEE YOU THERE!
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div>
                    <span className="block text-[10px] font-mono text-mochabrown uppercase">
                      guised guest
                    </span>
                    <span className="font-display font-semibold text-dark-brown text-sm truncate block">
                      {ticket.name}
                    </span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono text-mochabrown uppercase">
                      party tier
                    </span>
                    <span className="font-mono text-sm text-dark-brown font-semibold block">
                      {ticket.guests} People
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="block text-[10px] font-mono text-mochabrown uppercase">
                      date slug
                    </span>
                    <span className="font-mono text-xs text-dark-brown font-semibold block">
                      {ticket.date}
                    </span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono text-mochabrown uppercase">
                      golden hour
                    </span>
                    <span className="font-mono text-xs text-dark-brown font-semibold block">
                      {ticket.time}
                    </span>
                  </div>
                </div>

                <div>
                  <span className="block text-[10px] font-mono text-mochabrown uppercase">
                    location coordinates
                  </span>
                  <span className="font-sans text-xs text-dark-brown font-medium block">
                    {locationLabels[ticket.locationPreference] || 'Best Spot'}
                  </span>
                </div>

                {ticket.specialRequests && (
                  <div className="bg-cream/50 p-2.5 rounded-lg text-[11px] text-mochabrown font-sans italic border border-espresso/5">
                    "{ticket.specialRequests}"
                  </div>
                )}
              </div>

              {/* Receipt Barcode Graphic */}
              <div className="pt-5 border-t border-dashed border-espresso/20 flex flex-col items-center">
                <div className="flex justify-between items-center w-full px-4 mb-2">
                  <span className="font-mono text-[9px] text-mochabrown">
                    REF: BB-{Math.floor(100000 + Math.random() * 900000)}
                  </span>
                  <span className="font-mono text-[9px] text-mochabrown">
                    EST. 2026
                  </span>
                </div>

                {/* Simulated barcode */}
                <div className="w-5/6 h-12 flex justify-between bg-white overflow-hidden items-stretch px-1">
                  {[2, 1, 3, 1, 4, 2, 1, 3, 2, 1, 4, 2, 1, 3, 1, 2, 4, 1, 3, 2, 1, 3].map((width, i) => (
                    <div
                      key={i}
                      className="bg-espresso"
                      style={{
                        width: `${width * 2}px`,
                        opacity: i % 2 === 0 ? 0.95 : 0
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Print/Reset Actions */}
            <div className="flex gap-3 mt-6 w-full max-w-sm">
              <button
                id="copy-ticket-details"
                onClick={handleCopyTicket}
                className="flex-1 bg-white border border-espresso/20 hover:bg-cream text-espresso flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-semibold transition-all active:scale-95 shadow-xs"
              >
                <Copy className="w-3.5 h-3.5" />
                {copystate}
              </button>
              <button
                id="book-another-table"
                onClick={handleReset}
                className="flex-1 bg-espresso text-cream hover:bg-dark-brown flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-semibold transition-all active:scale-95 shadow-xs"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset RSVP
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
