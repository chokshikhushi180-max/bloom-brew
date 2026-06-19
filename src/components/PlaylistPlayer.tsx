import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, SkipForward, SkipBack, Music, Volume2, Radio } from 'lucide-react';
import { PLAYLIST } from '../data';

export default function PlaylistPlayer() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const [progress, setProgress] = useState<number>(35); // simulated initial progress percentage

  const currentTrack = PLAYLIST[currentTrackIndex];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            handleNext();
            return 0;
          }
          return prev + 1.2;
        });
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentTrackIndex]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    setProgress(0);
    setCurrentTrackIndex((prev) => (prev + 1) % PLAYLIST.length);
  };

  const handlePrev = () => {
    setProgress(0);
    setCurrentTrackIndex((prev) => (prev - 1 + PLAYLIST.length) % PLAYLIST.length);
  };

  return (
    <div id="playlist-player-wrapper" className="bg-warm-beige/40 backdrop-blur-md rounded-2xl p-6 border border-espresso/10 shadow-sm max-w-sm w-full mx-auto">
      <div className="flex items-center justify-between mb-4">
        <span className="flex items-center gap-1.5 text-xs font-mono text-mochabrown uppercase tracking-wider">
          <AudioPulse active={isPlaying} />
          Now Vibeing
        </span>
        <div className="flex items-center gap-1 text-[10px] bg-matcha/20 text-dark-brown/80 px-2 py-0.5 rounded-full font-mono">
          <Radio className="w-3 h-3 animate-pulse" />
          Live FM
        </div>
      </div>

      <div className="flex items-center gap-4 mb-5">
        <div className="w-16 h-16 bg-espresso rounded-xl flex items-center justify-center relative overflow-hidden shrink-0 group">
          <Music className="w-8 h-8 text-cream relative z-10" />
          <motion.div 
            animate={isPlaying ? { rotate: 360 } : {}}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            className="absolute inset-0 bg-radial from-matcha/40 via-transparent to-transparent opacity-60 pointer-events-none"
          />
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="font-display text-sm font-semibold text-dark-brown truncate">
            {currentTrack.title}
          </h4>
          <p className="font-sans text-xs text-mochabrown truncate">
            {currentTrack.artist}
          </p>
          <p className="font-mono text-[10px] text-matcha font-medium mt-1">
            Curated Lofi Beats
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="h-1 bg-espresso/10 rounded-full overflow-hidden cursor-pointer relative" onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const percent = ((e.clientX - rect.left) / rect.width) * 100;
          setProgress(percent);
        }}>
          <motion.div 
            className="h-full bg-espresso rounded-full"
            style={{ width: `${progress}%` }}
            transition={{ ease: "easeOut" }}
          />
        </div>
        <div className="flex justify-between items-center text-[10px] font-mono text-mochabrown mt-1.5">
          <span>{formatTime((progress / 100) * parseDuration(currentTrack.duration))}</span>
          <span>{currentTrack.duration}</span>
        </div>
      </div>

      {/* Play Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Volume2 className="w-3.5 h-3.5 text-mochabrown" />
          <div className="w-12 h-1 bg-espresso/20 rounded-full overflow-hidden">
            <div className="h-full w-4/5 bg-mochabrown rounded-full" />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            id="prev-track"
            onClick={handlePrev} 
            className="p-2 text-mochabrown hover:text-espresso rounded-full hover:bg-espresso/5 transition-colors"
            title="Previous track"
          >
            <SkipBack className="w-4 h-4" />
          </button>
          
          <button 
            id="play-pause-toggle"
            onClick={handlePlayPause} 
            className="p-3 bg-espresso hover:bg-dark-brown text-cream rounded-full transition-transform active:scale-95 shadow-md flex items-center justify-center group"
            title={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 fill-cream" />
            ) : (
              <Play className="w-4 h-4 fill-cream translate-x-0.5" />
            )}
          </button>

          <button 
            id="next-track"
            onClick={handleNext} 
            className="p-2 text-mochabrown hover:text-espresso rounded-full hover:bg-espresso/5 transition-colors"
            title="Next track"
          >
            <SkipForward className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function formatTime(secs: number): string {
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m}:${s < 10 ? '0' : ''}${s}`;
}

function parseDuration(durationStr: string): number {
  const parts = durationStr.split(':').map(Number);
  if (parts.length === 2) return parts[0] * 60 + parts[1];
  return 180; // fallback
}

function AudioPulse({ active }: { active: boolean }) {
  return (
    <div className="flex items-end gap-0.5 h-3 w-4">
      {[1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          className="bg-espresso w-[2px] rounded-full"
          animate={active ? {
            height: [3, 12, 6, 12, 3][i % 5]
          } : {
            height: 3
          }}
          transition={active ? {
            repeat: Infinity,
            duration: 1 + i * 0.15,
            ease: "easeInOut"
          } : {}}
          style={{ height: '3px' }}
        />
      ))}
    </div>
  );
}
