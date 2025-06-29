import React, { useState, useEffect, useCallback, useMemo } from 'react';
import image1 from '../assets/images/1.jpg';
import image2 from '../assets/images/2.jpg';
import image3 from '../assets/images/3.jpg';
import video1 from '../assets/videos/1.mp4';
import video2 from '../assets/videos/2.mp4';

const PrimaryHero = React.memo(({ frameOpacity = 1, frameScale = 1, scrollY = 0 }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Memoize media files to prevent re-creation
  const mediaFiles = useMemo(() => [
    { type: 'image', src: image2, alt: 'Carbon Calculator Dashboard' },
    { type: 'video', src: video1 },
    { type: 'image', src: image3, alt: 'Environmental Impact' },
    { type: 'video', src: video2 },
  ], []);

  // Optimized slideshow with useCallback
  const handleSlideChange = useCallback((index) => {
    setCurrentSlide(index);
  }, []);

  // Throttled auto-slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % mediaFiles.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [mediaFiles.length]);

  // Memoize container styles for performance
  const containerStyles = useMemo(() => ({
    opacity: frameOpacity, 
    transform: `scale3d(${frameScale}, ${frameScale}, 1) translate3d(0, ${scrollY / 8}px, 0)`,
    pointerEvents: frameOpacity > 0.1 ? 'auto' : 'none',
    willChange: 'transform, opacity',
    contain: 'layout style paint',
  }), [frameOpacity, frameScale, scrollY]);

  return (
    <div 
      className="relative w-full h-full flex items-center justify-center z-10 transition-all duration-700 ease-out overflow-hidden"
      style={{
        ...containerStyles,
        background: `
          radial-gradient(circle at 30% 20%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 70% 80%, rgba(255, 119, 198, 0.2) 0%, transparent 50%),
          radial-gradient(circle at 40% 60%, rgba(30, 144, 255, 0.15) 0%, transparent 50%),
          linear-gradient(135deg, #0f0f23 0%, #1a1a2e 25%, #16213e 50%, #0f0f23 100%)
        `,
      }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" 
             style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-pink-500/20 to-orange-500/20 rounded-full blur-3xl animate-pulse" 
             style={{ animationDuration: '6s', animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-cyan-500/15 to-teal-500/15 rounded-full blur-2xl animate-pulse" 
             style={{ animationDuration: '8s', animationDelay: '4s' }} />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Desktop Frame - Premium Design */}
      <div className="hidden lg:block relative z-10">
        <div className="relative w-[1000px] h-[650px] transform hover:scale-105 transition-transform duration-300">
          {/* Glowing Backdrop */}
          <div className="absolute -inset-8 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-2xl opacity-60 animate-pulse" />
          
          {/* Laptop Frame with Premium Materials */}
          <div className="relative w-full h-full bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 rounded-t-3xl shadow-2xl border border-gray-700/50 backdrop-blur-sm">
            {/* Premium Bezel with Subtle Glow */}
            <div className="absolute inset-3 bg-gradient-to-br from-gray-950 to-black rounded-2xl overflow-hidden shadow-inner border border-gray-800/30">
              {/* Inner Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 rounded-2xl" />
              
              {/* Screen Content */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden">
                {mediaFiles.map((media, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                      index === currentSlide 
                        ? 'opacity-100 transform scale-100 blur-none' 
                        : 'opacity-0 transform scale-110 blur-sm'
                    }`}
                  >
                    {media.type === 'image' ? (
                      <img 
                        src={media.src} 
                        alt={media.alt} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <video 
                        src={media.src} 
                        autoPlay 
                        muted 
                        loop 
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                ))}
                
                {/* Advanced Screen Reflection */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
                
                {/* Subtle Vignette */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/10 pointer-events-none" />
              </div>
            </div>
            
            {/* Premium Camera with Glow */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex items-center justify-center">
              <div className="w-3 h-3 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full shadow-lg border border-gray-600/30">
                <div className="w-1.5 h-1.5 bg-gradient-to-br from-blue-400/50 to-transparent rounded-full m-auto mt-0.5" />
              </div>
            </div>
            
            {/* Brand Logo Area */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-gray-400/50 text-xs font-light tracking-wider">
              PREMIUM
            </div>
          </div>
          
          {/* Laptop Base - Enhanced */}
          <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-[1050px] h-12 bg-gradient-to-b from-gray-800 via-gray-900 to-gray-950 rounded-b-3xl shadow-2xl border-t border-gray-700/30">
            {/* Trackpad */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-32 h-2 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 rounded-full shadow-inner border border-gray-600/30" />
            
            {/* Subtle Branding */}
            <div className="absolute top-2 right-8 text-gray-500/30 text-xs font-light tracking-widest">
              PROFESSIONAL
            </div>
          </div>
          
          {/* Floating Shadow */}
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-[900px] h-8 bg-black/20 rounded-full blur-xl" />
        </div>
      </div>

      {/* Mobile Frame - Premium Design */}
      <div className="lg:hidden relative z-10">
        <div className="relative w-[360px] h-[740px] transform hover:scale-105 transition-transform duration-300">
          {/* Glowing Backdrop */}
          <div className="absolute -inset-6 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-2xl opacity-60 animate-pulse" />
          
          {/* Phone Frame with Premium Materials */}
          <div className="relative w-full h-full bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 rounded-[55px] shadow-2xl p-2 border border-gray-700/50 backdrop-blur-sm">
            {/* Screen with Premium Bezel */}
            <div className="relative w-full h-full bg-gradient-to-br from-gray-950 to-black rounded-[50px] overflow-hidden shadow-inner border border-gray-800/30">
              {/* Dynamic Island */}
              <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-28 h-8 bg-black rounded-full z-10 shadow-lg border border-gray-800/50">
                <div className="absolute top-2 left-8 w-2 h-2 bg-gradient-to-br from-blue-400/50 to-transparent rounded-full" />
                <div className="absolute top-2 right-8 w-2 h-2 bg-gradient-to-br from-green-400/50 to-transparent rounded-full" />
              </div>
              
              {/* Screen Content */}
              <div className="relative w-full h-full pt-12 rounded-[50px] overflow-hidden">
                {mediaFiles.map((media, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 pt-12 transition-all duration-1000 ease-in-out ${
                      index === currentSlide 
                        ? 'opacity-100 transform scale-100 blur-none' 
                        : 'opacity-0 transform scale-110 blur-sm'
                    }`}
                  >
                    {media.type === 'image' ? (
                      <img 
                        src={media.src} 
                        alt={media.alt} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <video 
                        src={media.src} 
                        autoPlay 
                        muted 
                        loop 
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                ))}
                
                {/* Advanced Screen Reflection */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none rounded-[50px]" />
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none rounded-[50px]" />
              </div>
            </div>
            
            {/* Premium Power Button */}
            <div className="absolute right-0 top-36 w-1.5 h-16 bg-gradient-to-b from-gray-700 to-gray-900 rounded-l-full shadow-lg border-l border-gray-600/30" />
            
            {/* Premium Volume Buttons */}
            <div className="absolute left-0 top-32 w-1.5 h-12 bg-gradient-to-b from-gray-700 to-gray-900 rounded-r-full shadow-lg border-r border-gray-600/30" />
            <div className="absolute left-0 top-48 w-1.5 h-12 bg-gradient-to-b from-gray-700 to-gray-900 rounded-r-full shadow-lg border-r border-gray-600/30" />
          </div>
          
          {/* Floating Shadow */}
          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-80 h-6 bg-black/20 rounded-full blur-xl" />
        </div>
      </div>

      {/* Premium Slide Indicators */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10 px-6 py-3 bg-white/10 backdrop-blur-lg rounded-full border border-white/20 shadow-lg">
        {mediaFiles.map((_, index) => (
          <button
            key={index}
            onClick={() => handleSlideChange(index)}
            className={`relative transition-all duration-500 cursor-pointer ${
              index === currentSlide 
                ? 'w-10 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full shadow-lg' 
                : 'w-3 h-3 bg-white/40 hover:bg-white/60 rounded-full'
            }`}
            style={{ transform: 'translateZ(0)' }}
          >
            {index === currentSlide && (
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse" />
            )}
          </button>
        ))}
      </div>

      {/* Elegant Corner Decorations */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-white/20 rounded-tl-lg opacity-60" style={{ transform: 'translateZ(0)' }} />
      <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-white/20 rounded-tr-lg opacity-60" style={{ transform: 'translateZ(0)' }} />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-white/20 rounded-bl-lg opacity-60" style={{ transform: 'translateZ(0)' }} />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-white/20 rounded-br-lg opacity-60" style={{ transform: 'translateZ(0)' }} />

      {/* Premium Status Bar */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-4 text-white/60 text-sm font-light" style={{ transform: 'translateZ(0)' }}>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span>LIVE</span>
        </div>
        <div className="w-px h-4 bg-white/20" />
        <span className="tracking-wider">PREMIUM SHOWCASE</span>
      </div>
    </div>
  );
});

PrimaryHero.displayName = 'PrimaryHero';

export default PrimaryHero;