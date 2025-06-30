import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, Leaf, Globe, Factory } from 'lucide-react';

// Import images
import image1 from '../assets/images/1.jpg';
import image2 from '../assets/images/2.jpg';
import image3 from '../assets/images/3.jpg';
import bg1 from '../assets/images/bg1.jpg';
import bg1Mobile from '../assets/images/bg1(2).jpg';

// Import videos
import video1 from '../assets/videos/1.mp4';
import video2 from '../assets/videos/2.mp4';
import video3 from '../assets/videos/3.mp4';

const PrimaryHero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const videoRef = useRef(null);
  const intervalRef = useRef(null);
  const progressRef = useRef(null);

  // Media items - mix of images and videos
  const mediaItems = [
    {
      type: 'image',
      src: image1,
      alt: 'Industrial emissions contributing to carbon footprint',
      title: 'Industrial Emissions',
      description: 'Manufacturing and industrial processes account for 21% of global greenhouse gas emissions',
      duration: 4000
    },
    {
      type: 'video',
      src: video1,
      alt: 'Transportation carbon footprint video',
      title: 'Transportation Impact',
      description: 'Transportation is responsible for 16% of global emissions - every journey counts',
      duration: null // Will be set based on video duration
    },
    {
      type: 'image',
      src: image2,
      alt: 'Deforestation impact on carbon cycle',
      title: 'Deforestation Crisis',
      description: 'Forests absorb 2.6 billion tons of CO2 annually - their loss accelerates climate change',
      duration: 4000
    },
    {
      type: 'video',
      src: video2,
      alt: 'Energy consumption video',
      title: 'Energy Consumption',
      description: 'Global energy use produces 73% of greenhouse gas emissions worldwide',
      duration: null
    },
    {
      type: 'image',
      src: image3,
      alt: 'Agriculture and livestock emissions',
      title: 'Agriculture & Livestock',
      description: 'Food production contributes 18% of emissions - from farm to plate',
      duration: 4000
    },
    {
      type: 'video',
      src: video3,
      alt: 'Waste management impact',
      title: 'Waste & Consumption',
      description: 'Our consumption patterns and waste generate significant carbon emissions',
      duration: null
    }
  ];

  const currentItem = mediaItems[currentIndex];

  // Handle video events
  const handleVideoLoad = () => {
    if (videoRef.current && currentItem.type === 'video') {
      const duration = videoRef.current.duration * 1000;
      mediaItems[currentIndex].duration = duration;
    }
  };

  const handleVideoEnd = () => {
    nextSlide();
  };

  // Progress bar animation
  const startProgress = (duration) => {
    setProgress(0);
    if (progressRef.current) {
      clearInterval(progressRef.current);
    }
    
    const startTime = Date.now();
    progressRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);
      
      if (newProgress >= 100) {
        clearInterval(progressRef.current);
      }
    }, 50);
  };

  // Auto-play functionality
  const nextSlide = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % mediaItems.length);
      setIsTransitioning(false);
    }, 150);
  };

  const prevSlide = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + mediaItems.length) % mediaItems.length);
      setIsTransitioning(false);
    }, 150);
  };

  const goToSlide = (index) => {
    if (index !== currentIndex) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex(index);
        setIsTransitioning(false);
      }, 150);
    }
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (currentItem.type === 'video' && videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  };

  // Auto-advance slides
  useEffect(() => {
    if (!isPlaying) return;

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    if (currentItem.type === 'image') {
      startProgress(currentItem.duration);
      intervalRef.current = setTimeout(() => {
        nextSlide();
      }, currentItem.duration);
    } else if (currentItem.type === 'video' && videoRef.current) {
      videoRef.current.play();
      if (currentItem.duration) {
        startProgress(currentItem.duration);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (progressRef.current) {
        clearInterval(progressRef.current);
      }
    };
  }, [currentIndex, isPlaying]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (progressRef.current) {
        clearInterval(progressRef.current);
      }
    };
  }, []);

  // Responsive background image with improved detection
  const [isMobile, setIsMobile] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  
  useEffect(() => {
    const checkMobile = () => {
      const width = window.innerWidth;
      const mobile = width <= 768; // Mobile breakpoint
      console.log('Mobile check:', mobile, 'Width:', width);
      setWindowWidth(width);
      setIsMobile(mobile);
    };
    
    // Initial check
    if (typeof window !== 'undefined') {
      checkMobile();
    }
    
    // Add resize listener
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 transition-all duration-500"
        style={{
          backgroundImage: isMobile ? `url("${bg1Mobile}")` : `url("${bg1}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundColor: '#1a1a2e' // Fallback color
        }}
        key={isMobile ? 'mobile' : 'desktop'}
      >
        <div className={`absolute inset-0 transition-all duration-500 ${
          isMobile 
            ? 'bg-gradient-to-r from-black/70 via-black/50 to-black/70' 
            : 'bg-gradient-to-r from-black/70 via-black/50 to-black/70'
        }`}></div>
      </div>

      {/* Main Content */}
      <div className={`relative z-10 flex flex-col items-center justify-between min-h-screen ${isMobile ? 'space-y-8' : 'lg:flex-row'}`}>
        
        {/* Left Content */}
        <div className="flex-1 px-6 lg:px-12 py-12 lg:py-0">
          <div className="max-w-2xl mx-auto lg:mx-0 text-center lg:text-left">
            
            {/* Badge */}
            <div className="mt-6 inline-flex items-center gap-2 bg-green-500/20 backdrop-blur-sm border border-green-400/30 rounded-full px-4 py-2 mb-6">
              <Leaf className="w-4 h-4 text-green-400" />
              <span className="text-green-300 text-sm font-medium">Carbon Footprint Calculator</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Understand Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
                Carbon Impact
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
              Discover the hidden environmental cost of your daily choices. Our comprehensive calculator helps you measure, understand, and reduce your personal carbon footprint for a sustainable future.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="group relative bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
                <span className="relative z-10 flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  Calculate Now
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              
              <button className="group border-2 border-white/30 hover:border-white/60 text-white font-semibold px-8 py-4 rounded-xl backdrop-blur-sm transition-all duration-300 hover:bg-white/10">
                <span className="flex items-center gap-2">
                  <Factory className="w-5 h-5" />
                  Learn More
                </span>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/20">
              <div className="text-center lg:text-left">
                <div className="text-2xl md:text-3xl font-bold text-white">73%</div>
                <div className="text-sm text-gray-400">Energy Emissions</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl md:text-3xl font-bold text-white">4.8T</div>
                <div className="text-sm text-gray-400">Avg Annual CO2</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl md:text-3xl font-bold text-white">2030</div>
                <div className="text-sm text-gray-400">Climate Target</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Media Slideshow */}
        <div className="flex-1 px-6 lg:px-12 py-12 lg:py-0">
          <div className="relative max-w-2xl mx-auto w-full">
            {/* Media Container */}
            <div className={`relative rounded-2xl overflow-hidden shadow-2xl bg-black/20 backdrop-blur-sm border border-white/10 w-full ${
              isMobile ? 'aspect-[4/3] min-h-[300px]' : 'aspect-video min-h-[400px]'
            }`} style={{ 
              contain: 'layout size style',
              willChange: 'auto'
            }}>
              {/* Media Content */}
              <div className="absolute inset-0 w-full h-full" style={{ contain: 'layout' }}>
                <div className={`absolute inset-0 w-full h-full transition-opacity duration-300 ease-in-out ${
                  isTransitioning ? 'opacity-0' : 'opacity-100'
                }`}>
                  {currentItem.type === 'image' ? (
                    <img
                      src={currentItem.src}
                      alt={currentItem.alt}
                      className="absolute inset-0 w-full h-full object-cover"
                      style={{ 
                        width: '100%', 
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block'
                      }}
                    />
                  ) : (
                    <video
                      ref={videoRef}
                      src={currentItem.src}
                      className="absolute inset-0 w-full h-full object-cover"
                      style={{ 
                        width: '100%', 
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block'
                      }}
                      onLoadedMetadata={handleVideoLoad}
                      onEnded={handleVideoEnd}
                      muted
                      playsInline
                    />
                  )}
                </div>
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                {/* Media Info - ensure it's above arrows on mobile */}
                <div className={`absolute left-0 right-0 p-6 text-white pointer-events-none transition-all duration-300 ${
                  isMobile ? 'bottom-16 z-50' : 'bottom-0 z-10'
                } ${isTransitioning ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}>
                  <h3 className={`font-bold mb-2 transition-all duration-300 ${isMobile ? 'text-lg' : 'text-xl'}`}>
                    {currentItem.title}
                  </h3>
                  <p className={`text-gray-300 leading-relaxed transition-all duration-300 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                    {currentItem.description}
                  </p>
                </div>
              </div>
              {/* Progress Bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-white/20">
                <div 
                  className="h-full bg-gradient-to-r from-green-400 to-blue-400 transition-all duration-75 ease-linear"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              {/* Play/Pause Button */}
              <button
                onClick={togglePlayPause}
                className={`absolute top-4 right-4 bg-black/50 backdrop-blur-sm hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 ${isMobile ? 'z-30' : 'z-20'}`}
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </button>
              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className={`absolute left-4 bg-black/70 backdrop-blur-sm hover:bg-black/90 text-white rounded-full transition-all duration-200 hover:scale-110 z-40 ${isMobile ? 'p-2 bottom-4' : 'p-3 top-1/2 -translate-y-1/2'}`}
              >
                <ChevronLeft className={`transition-all duration-200 ${isMobile ? 'w-4 h-4' : 'w-5 h-5'}`} />
              </button>
              <button
                onClick={nextSlide}
                className={`absolute right-4 bg-black/70 backdrop-blur-sm hover:bg-black/90 text-white rounded-full transition-all duration-200 hover:scale-110 z-40 ${isMobile ? 'p-2 bottom-4' : 'p-3 top-1/2 -translate-y-1/2'}`}
              >
                <ChevronRight className={`transition-all duration-200 ${isMobile ? 'w-4 h-4' : 'w-5 h-5'}`} />
              </button>
            </div>
            {/* Slide Indicators */}
            <div className="flex justify-center gap-3 mt-6">
              {mediaItems.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-gradient-to-r from-green-400 to-blue-400 scale-125'
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
            {/* Media Type Indicator */}
            <div className="absolute -top-3 -right-3 bg-gradient-to-r from-green-500 to-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium">
              {currentIndex + 1} / {mediaItems.length}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <button className="group bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 hover:rotate-12">
          <Leaf className="w-6 h-6 group-hover:animate-pulse" />
        </button>
      </div>
    </section>
  );
};

export default PrimaryHero;