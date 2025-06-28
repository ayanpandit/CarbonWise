import React, { useState, useEffect } from 'react';
import { ChevronDown, Leaf, Calculator, Users, Award } from 'lucide-react';

const hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  // Media files for slideshow
  const mediaFiles = [
    { type: 'image', src: '/src/assets/images/2.jpg', alt: 'Carbon Calculator Dashboard' },
    { type: 'video', src: '/src/assets/videos/1.mp4' },
    { type: 'image', src: '/src/assets/images/3.jpg', alt: 'Environmental Impact' },
    { type: 'video', src: '/src/assets/videos/2.mp4' },
  ];

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrollY(scrollPosition);
      setIsScrolled(scrollPosition > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Slideshow effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % mediaFiles.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const frameOpacity = Math.max(0, 1 - scrollY / 300);
  const frameScale = Math.max(0.7, 1 - scrollY / 1000);
  const contentOpacity = Math.min(1, (scrollY - 200) / 300);
  const contentTranslateX = Math.max(-100, -100 + (scrollY - 200) / 5);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Initial Background */}
      <div 
        className="fixed inset-0 transition-opacity duration-1000 ease-out"
        style={{ opacity: 1 - scrollY / 500 }}
      >
        <img 
          src="/src/assets/images/1.jpg" 
          alt="Background" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Secondary Background */}
      <div 
        className="fixed inset-0 transition-opacity duration-1000 ease-out"
        style={{ opacity: Math.min(1, scrollY / 500) }}
      >
        <img 
          src="/src/assets/images/newbg.jpg" 
          alt="New Background" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Navigation Bar */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out ${
          isScrolled 
            ? 'bg-white/10 backdrop-blur-lg border-b border-white/20' 
            : 'bg-transparent'
        }`}
        style={{ 
          opacity: contentOpacity,
          transform: `translateY(${isScrolled ? '0' : '-100%'})` 
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-green-400" />
              <span className="text-xl font-bold text-white">EcoCalc</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-white/90 hover:text-white transition-colors">Calculator</a>
              <a href="#" className="text-white/90 hover:text-white transition-colors">About</a>
              <a href="#" className="text-white/90 hover:text-white transition-colors">Impact</a>
              <a href="#" className="text-white/90 hover:text-white transition-colors">Contact</a>
              <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Device Frame Section */}
      <div 
        className="fixed inset-0 flex items-center justify-center z-10 transition-all duration-700 ease-out"
        style={{ 
          opacity: frameOpacity, 
          transform: `scale(${frameScale}) translateY(${scrollY / 5}px)`,
          pointerEvents: frameOpacity > 0.1 ? 'auto' : 'none'
        }}
      >
        {/* Desktop Frame */}
        <div className="hidden lg:block relative">
          <div className="relative w-[800px] h-[500px]">
            {/* Laptop Frame */}
            <div className="relative w-full h-full bg-gradient-to-b from-gray-800 to-gray-900 rounded-t-2xl shadow-2xl">
              {/* Screen Bezel */}
              <div className="absolute inset-4 bg-black rounded-lg overflow-hidden">
                {/* Screen Content */}
                <div className="relative w-full h-full">
                  {mediaFiles.map((media, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                        index === currentSlide 
                          ? 'opacity-100 transform scale-100' 
                          : 'opacity-0 transform scale-105'
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
                  
                  {/* Screen Reflection */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
              
              {/* Laptop Camera */}
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-700 rounded-full" />
            </div>
            
            {/* Laptop Base */}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-[850px] h-8 bg-gradient-to-b from-gray-700 to-gray-800 rounded-b-3xl shadow-lg">
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gray-600 rounded-full" />
            </div>
          </div>
        </div>

        {/* Mobile Frame */}
        <div className="lg:hidden relative">
          <div className="relative w-[280px] h-[580px]">
            {/* Phone Frame */}
            <div className="relative w-full h-full bg-gradient-to-b from-gray-800 to-gray-900 rounded-[45px] shadow-2xl p-2">
              {/* Screen */}
              <div className="relative w-full h-full bg-black rounded-[35px] overflow-hidden">
                {/* Notch */}
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-20 h-6 bg-black rounded-full z-10" />
                
                {/* Screen Content */}
                <div className="relative w-full h-full pt-8">
                  {mediaFiles.map((media, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 pt-8 transition-all duration-1000 ease-in-out ${
                        index === currentSlide 
                          ? 'opacity-100 transform scale-100' 
                          : 'opacity-0 transform scale-105'
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
                </div>
                
                {/* Screen Reflection */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none rounded-[35px]" />
              </div>
              
              {/* Power Button */}
              <div className="absolute right-0 top-32 w-1 h-12 bg-gray-700 rounded-l-full" />
              
              {/* Volume Buttons */}
              <div className="absolute left-0 top-28 w-1 h-8 bg-gray-700 rounded-r-full" />
              <div className="absolute left-0 top-40 w-1 h-8 bg-gray-700 rounded-r-full" />
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {mediaFiles.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-500 ${
                index === currentSlide ? 'bg-white w-8' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Hero Content */}
      <div 
        className="fixed left-0 top-0 h-full flex items-center z-20 max-w-2xl pl-8 lg:pl-16"
        style={{ 
          opacity: contentOpacity,
          transform: `translateX(${contentTranslateX}px)`,
        }}
      >
        <div className="text-white space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
              Calculate Your
              <span className="block text-green-400 bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
                Carbon Footprint
              </span>
            </h1>
            <p className="text-lg lg:text-xl text-white/80 max-w-lg leading-relaxed">
              Get personalized recommendations to reduce your environmental impact and join the fight against climate change.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center space-x-2">
              <Calculator className="h-5 w-5" />
              <span>Start Calculator</span>
            </button>
            <button className="border-2 border-white/30 hover:border-white text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:bg-white/10">
              Learn More
            </button>
          </div>

          <div className="grid grid-cols-3 gap-6 pt-8">
            <div className="text-center">
              <Users className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold">50K+</div>
              <div className="text-sm text-white/70">Users</div>
            </div>
            <div className="text-center">
              <Leaf className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold">2M+</div>
              <div className="text-sm text-white/70">CO₂ Saved</div>
            </div>
            <div className="text-center">
              <Award className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold">98%</div>
              <div className="text-sm text-white/70">Accuracy</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div 
        className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-30 transition-opacity duration-500"
        style={{ opacity: 1 - scrollY / 200 }}
      >
        <div className="flex flex-col items-center text-white/80">
          <span className="text-sm mb-2">Scroll to explore</span>
          <ChevronDown className="h-6 w-6 animate-bounce" />
        </div>
      </div>

      {/* Extra content for scrolling */}
      <div className="relative z-40 h-[200vh]" />
    </div>
  );
};

export default hero;