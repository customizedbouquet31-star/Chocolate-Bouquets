import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, ArrowRight } from 'lucide-react';
import { InstagramIcon } from '../icons/InstagramIcon';
import { supabase } from '../../lib/supabase';
import type { Reel } from '../../types';

function VideoPlayer({ reel, playingId, setPlayingId }: { reel: Reel, playingId: string | null, setPlayingId: (id: string | null) => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Auto-pause if another video starts playing
  useEffect(() => {
    if (playingId !== reel.id && isPlaying && videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [playingId, isPlaying, reel.id]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
        if (playingId === reel.id) setPlayingId(null);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
        setPlayingId(reel.id);
      }
    }
  };

  const handleEnded = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
      if (playingId === reel.id) setPlayingId(null);
    }
  };

  return (
    <div className="relative w-full h-full cursor-pointer group" onClick={togglePlay}>
      <video 
        ref={videoRef}
        src={reel.instagram_url}
        preload="metadata"
        className="w-full h-full object-cover"
        onEnded={handleEnded}
        playsInline
      ></video>
      
      {/* Custom Play Button Overlay */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors duration-300">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 transform scale-90 group-hover:scale-100 transition-transform duration-300">
            <Play className="w-6 h-6 text-white fill-white ml-1" />
          </div>
        </div>
      )}
    </div>
  );
}

export default function InstagramReels() {
  const [reels, setReels] = useState<Reel[]>([]);
  const [playingId, setPlayingId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchReels() {
      const { data } = await supabase.from('reels').select('*').limit(10).order('created_at', { ascending: false });
      if (data) setReels(data);
    }
    fetchReels();
  }, []);

  return (
    <section className="py-6 md:py-10 bg-plum-950 text-white overflow-hidden relative">
      {/* Background element */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
      
      <div className="w-full px-4 md:px-12 relative z-10">
        <div className="flex flex-col items-center text-center mb-6">
          <InstagramIcon className="w-10 h-10 text-primary mb-6" />
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="font-serif font-bold text-2xl md:text-3xl uppercase tracking-wider mb-2 text-white"
          >
            Chocolate Bouquet Insta
          </motion.h2>
          <p className="text-white/70 max-w-lg mb-2">
            Follow our journey of creating beautiful moments and smiles, one bouquet at a time.
          </p>
          <a 
            href="https://www.instagram.com/customized_bouquets31?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw==" 
            target="_blank" 
            rel="noreferrer"
            className="px-8 py-3 bg-white text-plum-950 font-bold tracking-wider rounded-full hover:bg-lavender-50 transition-colors shadow-lg shadow-white/10"
          >
            @customized_bouquets_31
          </a>
        </div>

        <div className="flex justify-end mb-4 pr-2">
          <motion.div 
            animate={{ x: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="flex items-center gap-2 text-white/50 text-sm font-medium tracking-wider uppercase"
          >
            <span>Scroll to explore</span>
            <ArrowRight className="w-4 h-4" />
          </motion.div>
        </div>

        <div className="flex gap-4 md:gap-8 overflow-x-auto hide-scrollbar pb-8 snap-x">
          {reels.map((reel, index) => {
            const isVideo = reel.instagram_url.includes('supabase.co') || reel.instagram_url.endsWith('.mp4');
            const displayClass = index >= 6 ? 'hidden md:block' : 'block';

            return (
              <div 
                key={reel.id}
                className={`flex-none w-[280px] md:w-[320px] aspect-[9/16] bg-plum-950 rounded-2xl overflow-hidden relative snap-center shadow-xl border border-white/10 group ${displayClass}`}
              >
                {isVideo ? (
                  <VideoPlayer reel={reel} playingId={playingId} setPlayingId={setPlayingId} />
                ) : (
                  <a 
                    href={reel.instagram_url}
                    target="_blank"
                    rel="noreferrer"
                    className="block w-full h-full relative"
                  >
                    <img 
                      src={reel.thumbnail_url} 
                      alt="Instagram Reel" 
                      className="w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-plum-950/90 via-plum-950/20 to-transparent"></div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 transform scale-75 group-hover:scale-100 transition-transform duration-500">
                        <Play className="w-6 h-6 text-white fill-white ml-1" />
                      </div>
                    </div>
                  </a>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
