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
import video4 from '../assets/videos/4.mp4';

const PrimaryHero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [deviceType, setDeviceType] = useState('desktop');
  const videoRef = useRef(null);
  const intervalRef = useRef(null);
  const progressRef = useRef(null);

  // Media items - mix of images and videos
  const mediaItems = [
    {
      type: 'video',
      src: video4,
      alt: 'Industrial emissions contributing to carbon footprint',
      title: 'Industrial Emissions',
      description: 'Manufacturing and industrial processes account for 21% of global greenhouse gas emissions',
      duration: null
    },
    {
      type: 'video',
      src: video1,
      alt: 'Transportation carbon footprint video',
      title: '',
      description: '',
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
      title: '',
      description: '',
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
      title: '',
      description: '',
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

  // Enhanced device detection
  useEffect(() => {
    const detectDevice = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setDeviceType('mobile');
      } else if (width < 1024) {
        setDeviceType('tablet');
      } else {
        setDeviceType('desktop');
      }
    };
    
    detectDevice();
    window.addEventListener('resize', detectDevice);
    return () => window.removeEventListener('resize', detectDevice);
  }, []);

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

  // Navigation functions
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

  // Responsive classes
  const getResponsiveClasses = () => {
    const baseClasses = {
      container: deviceType === 'mobile' 
        ? 'flex-col space-y-1 px-4 py-6' 
        : deviceType === 'tablet'
        ? 'flex-col space-y-4 px-6 py-8'
        : 'lg:flex-row lg:space-y-0 px-6 lg:px-12 py-12',
      
      leftContent: deviceType === 'mobile'
        ? 'w-full order-1'
        : deviceType === 'tablet' 
        ? 'w-full order-2'
        : 'flex-1 lg:order-1',
        
      rightContent: deviceType === 'mobile'
        ? 'w-full order-2 mt-8'
        : deviceType === 'tablet'
        ? 'w-full order-1' 
        : 'flex-1 lg:order-2',
        
      heading: deviceType === 'mobile'
        ? 'text-3xl sm:text-4xl'
        : deviceType === 'tablet'
        ? 'text-4xl md:text-5xl'
        : 'text-4xl md:text-5xl lg:text-6xl',
        
      description: deviceType === 'mobile'
        ? 'text-base'
        : deviceType === 'tablet'
        ? 'text-lg'
        : 'text-lg md:text-xl',
        
      mediaContainer: deviceType === 'mobile'
        ? 'aspect-[16/10] min-h-[250px] max-h-[300px]'
        : deviceType === 'tablet'
        ? 'aspect-[16/9] min-h-[300px] max-h-[400px]'
        : 'aspect-video min-h-[400px] max-h-[500px]',
        
      buttons: deviceType === 'mobile'
        ? 'flex-col space-y-3'
        : 'flex-col sm:flex-row gap-4',
        
      stats: deviceType === 'mobile'
        ? 'grid-cols-3 gap-3 mt-8 pt-6'
        : 'grid-cols-3 gap-6 mt-12 pt-8'
    };
    
    return baseClasses;
  };

  const classes = getResponsiveClasses();

  return (
    <section className="h-screen w-full overflow-hidden sticky top-0 z-10">
      {/* Background with enhanced mobile optimization */}
      <div 
        className="absolute inset-0 transition-all duration-500"
        style={{
          backgroundImage: deviceType === 'mobile' ? `url("${bg1Mobile}")` : `url("${bg1}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundColor: '#1a1a2e' // Fallback color
        }}
        key={deviceType === 'mobile' ? 'mobile' : 'desktop'}
      >
        {/* Animated background elements for desktop */}
        {deviceType === 'desktop' && (
          <>
            <div className="absolute top-20 left-20 w-32 h-32 bg-green-500/10 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-48 h-48 bg-blue-500/10 rounded-full blur-xl animate-pulse delay-1000"></div>
          </>
        )}
      </div>

      {/* Main Content */}
      <div className={`relative z-10 flex items-center justify-between min-h-screen ${classes.container} ${deviceType === 'mobile' ? 'pt-20' : ''}`}>
        
        {/* Left Content */}
        <div className={`${classes.leftContent} ${deviceType === 'mobile' ? 'px-2' : 'px-0'}`}>
          <div className={`max-w-2xl mx-auto ${deviceType !== 'mobile' ? 'lg:mx-0' : ''} text-center ${deviceType !== 'mobile' ? 'lg:text-left' : ''}`}>
            
            {/* Badge */}
            <div className={`inline-flex items-center gap-2 bg-green-500/20 backdrop-blur-sm border border-green-400/30 rounded-full px-4 py-2 mb-4 ${deviceType === 'mobile' ? 'text-xs' : 'text-sm'}`}>
              <Leaf className={`text-green-400 ${deviceType === 'mobile' ? 'w-3 h-3' : 'w-4 h-4'}`} />
              <span className="text-green-300 font-medium">Carbon Footprint Calculator</span>
            </div>

            {/* Main Heading */}
            <h1 className={`${classes.heading} font-bold text-white mb-4 leading-tight drop-shadow-2xl`}
                style={{ textShadow: '3px 3px 6px rgba(0,0,0,0.9), 1px 1px 3px rgba(0,0,0,0.8)' }}>
              Understand Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400 drop-shadow-lg">
                Carbon Impact
              </span>
            </h1>

            {/* Description */}
            <p className={`${classes.description} text-white mb-3 leading-relaxed drop-shadow-lg ${deviceType === 'mobile' ? 'px-2' : ''}`}
               style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8), 1px 1px 2px rgba(0,0,0,0.7)' }}>
              {deviceType === 'mobile' 
                ? 'Measure and reduce your carbon footprint for a sustainable future.'
                : 'Discover the hidden environmental cost of your daily choices. Our comprehensive calculator helps you measure, understand, and reduce your personal carbon footprint for a sustainable future.'
              }
            </p>

            {/* CTA Buttons */}
            <div className={`flex ${classes.buttons} justify-center ${deviceType !== 'mobile' ? 'lg:justify-start' : ''} ${deviceType === 'mobile' ? 'mb-3' : ''}`}>
              <button className={`group relative bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl ${deviceType === 'mobile' ? 'px-6 py-3 text-sm' : 'px-8 py-4'}`}>
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <Globe className={`${deviceType === 'mobile' ? 'w-4 h-4' : 'w-5 h-5'}`} />
                  Calculate Now
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              
              <button className={`group border-2 border-white/30 hover:border-white/60 text-white font-semibold rounded-xl backdrop-blur-sm transition-all duration-300 hover:bg-white/10 ${deviceType === 'mobile' ? 'px-6 py-3 text-sm' : 'px-8 py-4'}`}>
                <span className="flex items-center justify-center gap-2">
                  <Factory className={`${deviceType === 'mobile' ? 'w-4 h-4' : 'w-5 h-5'}`} />
                  Learn More
                </span>
              </button>
            </div>

            {/* Stats */}
            <div className={`grid ${classes.stats} border-t border-gray-400/30`}>
              <div className={`text-center ${deviceType !== 'mobile' ? 'lg:text-left' : ''}`}>
                <div className={`font-bold text-gray-800 ${deviceType === 'mobile' ? 'text-xl' : 'text-2xl md:text-3xl'}`}
                     style={{ textShadow: '1px 1px 2px rgba(255,255,255,0.8)' }}>73%</div>
                <div className={`text-gray-600 ${deviceType === 'mobile' ? 'text-xs' : 'text-sm'}`}
                     style={{ textShadow: '1px 1px 2px rgba(255,255,255,0.6)' }}>Energy Emissions</div>
              </div>
              <div className={`text-center ${deviceType !== 'mobile' ? 'lg:text-left' : ''}`}>
                <div className={`font-bold text-gray-800 ${deviceType === 'mobile' ? 'text-xl' : 'text-2xl md:text-3xl'}`}
                     style={{ textShadow: '1px 1px 2px rgba(255,255,255,0.8)' }}>4.8T</div>
                <div className={`text-gray-600 ${deviceType === 'mobile' ? 'text-xs' : 'text-sm'}`}
                     style={{ textShadow: '1px 1px 2px rgba(255,255,255,0.6)' }}>Avg Annual CO2</div>
              </div>
              <div className={`text-center ${deviceType !== 'mobile' ? 'lg:text-left' : ''}`}>
                <div className={`font-bold text-gray-800 ${deviceType === 'mobile' ? 'text-xl' : 'text-2xl md:text-3xl'}`}
                     style={{ textShadow: '1px 1px 2px rgba(255,255,255,0.8)' }}>2030</div>
                <div className={`text-gray-600 ${deviceType === 'mobile' ? 'text-xs' : 'text-sm'}`}
                     style={{ textShadow: '1px 1px 2px rgba(255,255,255,0.6)' }}>Climate Target</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Media Slideshow */}
        <div className={`${classes.rightContent} ${deviceType === 'mobile' ? 'px-2' : deviceType === 'tablet' ? 'px-4' : 'px-0'}`}>
          <div className="relative max-w-2xl mx-auto w-full">
            {/* Media Container */}
            <div className={`relative ${classes.mediaContainer} rounded-2xl overflow-hidden shadow-2xl bg-black/20 backdrop-blur-sm border border-white/10 w-full`}>
              {/* Media Content */}
              <div className="absolute inset-0 w-full h-full">
                <div className={`absolute inset-0 w-full h-full transition-opacity duration-300 ease-in-out ${
                  isTransitioning ? 'opacity-0' : 'opacity-100'
                }`}>
                  {currentItem.type === 'image' ? (
                    <img
                      src={currentItem.src}
                      alt={currentItem.alt}
                      className="absolute inset-0 w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <video
                      ref={videoRef}
                      src={currentItem.src}
                      className="absolute inset-0 w-full h-full object-cover"
                      onLoadedMetadata={handleVideoLoad}
                      onEnded={handleVideoEnd}
                      muted
                      playsInline
                    />
                  )}
                </div>
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                
                {/* Media Info */}
                <div className={`absolute left-0 right-0 text-white pointer-events-none transition-all duration-300 ${
                  deviceType === 'mobile' ? 'bottom-12 p-4 z-50' : 'bottom-0 p-6 z-10'
                } ${isTransitioning ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}>
                  <h3 className={`font-bold mb-2 transition-all duration-300 ${
                    deviceType === 'mobile' ? 'text-base' : deviceType === 'tablet' ? 'text-lg' : 'text-xl'
                  }`}>
                    {currentItem.title}
                  </h3>
                  <p className={`text-gray-300 leading-relaxed transition-all duration-300 ${
                    deviceType === 'mobile' ? 'text-xs' : deviceType === 'tablet' ? 'text-sm' : 'text-sm'
                  }`}>
                    {deviceType === 'mobile' 
                      ? currentItem.description.substring(0, 80) + '...'
                      : currentItem.description
                    }
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
                className={`absolute top-4 right-4 bg-black/50 backdrop-blur-sm hover:bg-black/70 text-white rounded-full transition-all duration-300 hover:scale-110 ${
                  deviceType === 'mobile' ? 'p-2 z-30' : 'p-3 z-20'
                }`}
              >
                {isPlaying ? 
                  <Pause className={`${deviceType === 'mobile' ? 'w-4 h-4' : 'w-5 h-5'}`} /> : 
                  <Play className={`${deviceType === 'mobile' ? 'w-4 h-4' : 'w-5 h-5'}`} />
                }
              </button>
              
              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className={`absolute bg-black/70 backdrop-blur-sm hover:bg-black/90 text-white rounded-full transition-all duration-200 hover:scale-110 z-40 ${
                  deviceType === 'mobile' 
                    ? 'left-2 bottom-2 p-2' 
                    : deviceType === 'tablet'
                    ? 'left-3 top-1/2 -translate-y-1/2 p-2.5'
                    : 'left-4 top-1/2 -translate-y-1/2 p-3'
                }`}
              >
                <ChevronLeft className={`transition-all duration-200 ${
                  deviceType === 'mobile' ? 'w-4 h-4' : 'w-5 h-5'
                }`} />
              </button>
              
              <button
                onClick={nextSlide}
                className={`absolute bg-black/70 backdrop-blur-sm hover:bg-black/90 text-white rounded-full transition-all duration-200 hover:scale-110 z-40 ${
                  deviceType === 'mobile' 
                    ? 'right-2 bottom-2 p-2' 
                    : deviceType === 'tablet'
                    ? 'right-3 top-1/2 -translate-y-1/2 p-2.5'
                    : 'right-4 top-1/2 -translate-y-1/2 p-3'
                }`}
              >
                <ChevronRight className={`transition-all duration-200 ${
                  deviceType === 'mobile' ? 'w-4 h-4' : 'w-5 h-5'
                }`} />
              </button>
            </div>
            
            {/* Slide Indicators */}
            <div className={`flex justify-center gap-2 ${deviceType === 'mobile' ? 'mt-4' : 'mt-6'}`}>
              {mediaItems.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`${deviceType === 'mobile' ? 'w-2 h-2' : 'w-3 h-3'} rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-gradient-to-r from-green-400 to-blue-400 scale-125'
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
            
            {/* Media Type Indicator */}
            <div className={`absolute -top-3 -right-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-full font-medium ${
              deviceType === 'mobile' ? 'px-2 py-1 text-xs' : 'px-3 py-1 text-xs'
            }`}>
              {currentIndex + 1} / {mediaItems.length}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button - Hidden on mobile to avoid clutter */}
      {deviceType !== 'mobile' && (
        <div className="fixed bottom-8 right-8 z-50">
          <button className="group bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 hover:rotate-12">
            <Leaf className="w-6 h-6 group-hover:animate-pulse" />
          </button>
        </div>
      )}

      {/* Mobile-specific enhancements */}
      {deviceType === 'mobile' && (
        <>
          {/* Swipe indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white/50 text-xs">
            Swipe to explore
          </div>
          
          {/* Touch-friendly quick actions */}
          <div className="fixed bottom-4 right-4 z-50">
            <button className="bg-green-500/90 text-white p-3 rounded-full shadow-lg">
              <Globe className="w-5 h-5" />
            </button>
          </div>
        </>
      )}
    </section>
  );
};

export default PrimaryHero;