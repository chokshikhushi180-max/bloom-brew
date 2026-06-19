import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, MessageCircle, Instagram, ExternalLink } from 'lucide-react';
import { InstagramPost } from '../types';
import { INSTAGRAM_POSTS } from '../data';

export default function InstagramFeed() {
  const [posts, setPosts] = useState<InstagramPost[]>(INSTAGRAM_POSTS);
  const [doubleClickedId, setDoubleClickedId] = useState<string | null>(null);
  const [doubleClickCoords, setDoubleClickCoords] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleDoubleTap = (e: React.MouseEvent<HTMLDivElement>, postId: string) => {
    // Determine coordinates relative to the element
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setDoubleClickCoords({ x, y });
    setDoubleClickedId(postId);

    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          const isLiked = !post.isLiked;
          return {
            ...post,
            likes: isLiked ? post.likes + 1 : post.likes - 1,
            isLiked
          };
        }
        return post;
      })
    );

    // Fade out the floating popping heart after 800ms
    setTimeout(() => {
      setDoubleClickedId(null);
    }, 850000 % 1000 || 800);
  };

  const toggleLikeOnly = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          const isLiked = !post.isLiked;
          return {
            ...post,
            likes: isLiked ? post.likes + 1 : post.likes - 1,
            isLiked
          };
        }
        return post;
      })
    );
  };

  return (
    <div id="instagram-feed-wrapper" className="w-full">
      <div className="flex justify-between items-center mb-8">
        <div>
          <span className="text-xs font-mono text-mochabrown uppercase tracking-widest flex items-center gap-1.5">
            <Instagram className="w-3.5 h-3.5" />
            Social Feed
          </span>
          <h3 className="font-display font-bold text-2xl text-dark-brown mt-1">
            Moments at Brew & Bloom
          </h3>
        </div>
        <a
          id="instagram-profile-external-link"
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-mono text-espresso border-b border-espresso/40 pb-0.5 hover:border-espresso hover:text-dark-brown transition-colors flex items-center gap-1"
        >
          Follow @brewandbloom
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {posts.map((post) => (
          <div
            id={`insta-post-${post.id}`}
            key={post.id}
            onDoubleClick={(e) => handleDoubleTap(e, post.id)}
            className="relative aspect-square overflow-hidden bg-cream border border-espresso/5 rounded-2xl cursor-pointer group select-none shadow-xs"
            title="Double-tap to heart!"
          >
            {/* Post image */}
            <img
              src={post.image}
              alt={post.caption}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />

            {/* Glowing heart particle when double clicked */}
            <AnimatePresence>
              {doubleClickedId === post.id && (
                <motion.div
                  className="absolute z-20 text-peach/90 drop-shadow-lg pointer-events-none"
                  style={{
                    left: `${doubleClickCoords.x - 20}px`,
                    top: `${doubleClickCoords.y - 20}px`
                  }}
                  initial={{ opacity: 0, scale: 0.3 }}
                  animate={{ opacity: [0, 1, 1, 0], scale: [0.3, 1.4, 1.1, 0.4], y: -30 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <Heart className="w-10 h-10 fill-peach text-peach" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Interactive hover layer overlays */}
            <div className="absolute inset-0 bg-dark-brown/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 text-cream">
              {/* Top Row: double tap indicator */}
              <div className="flex justify-end">
                <span className="text-[9px] font-mono tracking-wider bg-white/20 border border-white/25 px-2 py-0.5 rounded-full uppercase">
                  Double Tap 💖
                </span>
              </div>

              {/* Middle: caption review */}
              <p className="text-xs font-sans font-light leading-relaxed line-clamp-3 text-balance">
                {post.caption}
              </p>

              {/* Bottom Row: Likes and Comments statistics */}
              <div className="flex items-center gap-4 border-t border-white/10 pt-2.5">
                <button
                  id={`like-post-${post.id}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLikeOnly(post.id);
                  }}
                  className="flex items-center gap-1 hover:text-peach transition-colors select-none"
                >
                  <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-peach text-peach' : ''}`} />
                  <span className="text-[11px] font-mono leading-none">{post.likes}</span>
                </button>
                <div className="flex items-center gap-1 text-white/80">
                  <MessageCircle className="w-4 h-4" />
                  <span className="text-[11px] font-mono leading-none">{post.comments}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
