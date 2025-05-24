
import React, { useState, useEffect, useRef } from 'react';
import './Hero.css';
import heroBg1 from '../assets/images/hero-bg1.jpg';
import heroVideo1 from '../assets/videos/hero-bg1.mp4';

const HeroSection = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoverState, setHoverState] = useState(null);
  const videoRefs = useRef([]);
  const carouselRef = useRef(null);
  const progressBarRef = useRef(null);
  const progressInterval = useRef(null);
  const [progress, setProgress] = useState(0);

  // Rich media content with detailed metadata
  const mediaContent = [
    { 
      type: 'image', 
      src: heroBg1,
      alt: 'Luxury Interior Design',
      title: 'Exquisite Design Solutions',
      subtitle: 'Transform your space with our award-winning interior design services',
      category: 'Interior Design',
      tags: ['modern', 'luxury', 'minimal'],
      cta: 'Explore Our Portfolio'
    },
    { 
      type: 'video', 
      src: heroVideo1,
      poster: heroBg1, // Use a real poster if available
      alt: 'Architectural Masterpiece Showcase',
      title: 'Architectural Excellence',
      subtitle: 'Blending innovation with timeless design principles for extraordinary spaces',
      category: 'Architecture',
      tags: ['contemporary', 'sustainable', 'cutting-edge'],
      cta: 'View Case Studies'
    },
    { 
      type: 'image', 
      src: heroBg1,
      alt: 'Luxury Interior Design',
      title: 'Exquisite Design Solutions',
      subtitle: 'Transform your space with our award-winning interior design services',
      category: 'Interior Design',
      tags: ['modern', 'luxury', 'minimal'],
      cta: 'Explore Our Portfolio'
    },
    { 
      type: 'video', 
      src: heroVideo1,
      poster: heroBg1, // Use a real poster if available
      alt: 'Architectural Masterpiece Showcase',
      title: 'Architectural Excellence',
      subtitle: 'Blending innovation with timeless design principles for extraordinary spaces',
      category: 'Architecture',
      tags: ['contemporary', 'sustainable', 'cutting-edge'],
      cta: 'View Case Studies'
    },
    // Add more images/videos as needed, importing them at the top and referencing here
  ];

  // Initialize component with animations
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  // Progress bar animation
  useEffect(() => {
    if (isPaused) {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
      return;
    }
    
    setProgress(0);
    
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
    }
    
    const duration = 7000; // 7 seconds per slide
    const intervalTime = 50; // Update every 50ms for smooth animation
    const steps = duration / intervalTime;
    let currentStep = 0;
    
    progressInterval.current = setInterval(() => {
      currentStep += 1;
      const newProgress = (currentStep / steps) * 100;
      setProgress(newProgress);
      
      if (currentStep >= steps) {
        clearInterval(progressInterval.current);
        handleNext();
      }
    }, intervalTime);
    
    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, [activeSlide, isPaused]);

  // Handle video playback
  useEffect(() => {
    videoRefs.current.forEach(video => {
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
    });

    const currentMedia = mediaContent[activeSlide];
    if (currentMedia.type === 'video') {
      const videoElement = videoRefs.current[activeSlide];
      if (videoElement) {
        videoElement.muted = isMuted;
        videoElement.play().catch(e => console.log("Auto-play prevented:", e));
      }
    }
  }, [activeSlide, isMuted]);

  // Handle carousel interactions
  const handlePrev = () => {
    setActiveSlide((prevSlide) => 
      prevSlide === 0 ? mediaContent.length - 1 : prevSlide - 1
    );
  };

  const handleNext = () => {
    setActiveSlide((prevSlide) => 
      (prevSlide + 1) % mediaContent.length
    );
  };

  const goToSlide = (index) => {
    setActiveSlide(index);
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  // Handle hover states for interactive elements
  const handleHover = (elementId) => {
    setHoverState(elementId);
  };

  const handleHoverExit = () => {
    setHoverState(null);
  };

  return (
    <div 
      className={`premium-hero-carousel ${isLoaded ? 'loaded' : ''}`}
      ref={carouselRef}
    >
      {/* Ambient background effect */}
      <div className="ambient-overlay"></div>
      
      {/* Dynamic particles overlay */}
      <div className="particles-overlay"></div>
      
      {/* Media slides container */}
      <div className="media-slides-container">
        {mediaContent.map((media, index) => (
          <div 
            key={index} 
            className={`media-slide ${index === activeSlide ? 'active' : ''}`}
          >
            {media.type === 'image' ? (
              <img 
                src={media.src} 
                alt={media.alt}
                className="media-element"
                loading="eager"
              />
            ) : (
              <video 
                ref={el => videoRefs.current[index] = el}
                src={media.src} 
                poster={media.poster}
                loop 
                muted={isMuted}
                playsInline
                className="media-element"
              />
            )}
            
            {/* Content overlay with gradient */}
            <div className="content-gradient-overlay"></div>
          </div>
        ))}
      </div>
      
      {/* Content container with animations */}
      <div className="content-container">
        <div className="top-bar">
          {/* Category badge */}
          <div className={`category-badge ${isLoaded ? 'animate-in' : ''}`}>
            {mediaContent[activeSlide].category}
          </div>
          
          {/* Tag cloud */}
          <div className="tag-cloud">
            {mediaContent[activeSlide].tags.map((tag, idx) => (
              <span 
                key={idx}
                className={`tag-item delay-${idx} ${isLoaded ? 'animate-in' : ''}`}
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
        
        {/* Main content area */}
        <div className="main-content">
          <div className="content-wrapper">
            {/* Title with staggered animation */}
            <h1 className={`slide-title ${isLoaded ? 'animate-in' : ''}`}>
              {mediaContent[activeSlide].title}
            </h1>
            
            {/* Subtitle with delayed animation */}
            <p className={`slide-subtitle ${isLoaded ? 'animate-in' : ''}`}>
              {mediaContent[activeSlide].subtitle}
            </p>
            
            {/* CTA button with hover effects */}
            <button 
              className={`cta-button ${isLoaded ? 'animate-in' : ''} ${hoverState === 'cta' ? 'hover' : ''}`}
              onMouseEnter={() => handleHover('cta')}
              onMouseLeave={handleHoverExit}
            >
              {mediaContent[activeSlide].cta}
            </button>
          </div>
        </div>
        
        {/* Controls and navigation */}
        <div className="bottom-controls">
          {/* Navigation controls */}
          <div className="navigation-controls">
            {/* Previous button */}
            <button 
              className={`control-button prev-button ${hoverState === 'prev' ? 'hover' : ''}`}
              onClick={handlePrev}
              onMouseEnter={() => handleHover('prev')}
              onMouseLeave={handleHoverExit}
              aria-label="Previous slide"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </button>
            
            {/* Play/Pause button */}
            <button 
              className={`control-button play-pause-button ${hoverState === 'play' ? 'hover' : ''}`}
              onClick={togglePause}
              onMouseEnter={() => handleHover('play')}
              onMouseLeave={handleHoverExit}
              aria-label={isPaused ? "Play slideshow" : "Pause slideshow"}
            >
              {isPaused ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="5 3 19 12 5 21 5 3"/>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="6" y="4" width="4" height="16"/>
                  <rect x="14" y="4" width="4" height="16"/>
                </svg>
              )}
            </button>
            
            {/* Next button */}
            <button 
              className={`control-button next-button ${hoverState === 'next' ? 'hover' : ''}`}
              onClick={handleNext}
              onMouseEnter={() => handleHover('next')}
              onMouseLeave={handleHoverExit}
              aria-label="Next slide"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>
          </div>
          
          {/* Indicators and progress */}
          <div className="progress-indicators">
            {/* Progress bar */}
            <div className="progress-bar-container">
              <div 
                ref={progressBarRef}
                className="progress-bar"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            
            {/* Slide counter */}
            <div className="slide-counter">
              <span className="current-slide">{activeSlide + 1}</span>
              <span className="counter-divider">/</span>
              <span className="total-slides">{mediaContent.length}</span>
            </div>
            
            {/* Mute toggle */}
            <button
              className={`control-button mute-button ${
                mediaContent[activeSlide].type !== 'video' ? 'disabled' : ''
              } ${hoverState === 'mute' ? 'hover' : ''}`}
              onClick={toggleMute}
              disabled={mediaContent[activeSlide].type !== 'video'}
              onMouseEnter={() => handleHover('mute')}
              onMouseLeave={handleHoverExit}
              aria-label={isMuted ? "Unmute video" : "Mute video"}
            >
              {isMuted ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="1" y1="1" x2="23" y2="23"></line>
                  <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"></path>
                  <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"></path>
                  <line x1="12" y1="19" x2="12" y2="23"></line>
                  <line x1="8" y1="23" x2="16" y2="23"></line>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                  <line x1="12" y1="19" x2="12" y2="23"></line>
                  <line x1="8" y1="23" x2="16" y2="23"></line>
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Slide indicators/dots */}
      <div className="slide-indicators">
        {mediaContent.map((_, index) => (
          <button
            key={index}
            className={`indicator-dot ${index === activeSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            onMouseEnter={() => handleHover(`dot-${index}`)}
            onMouseLeave={handleHoverExit}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;