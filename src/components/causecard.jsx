import React, { useState, useEffect, useRef } from 'react';
import { Play, Zap, Droplets, Wind, Leaf, TrendingUp, Globe, ArrowRight, BarChart3, Target, Users } from 'lucide-react';
import cardBg from '../assets/images/cardbg.jpg';
import bg22 from '../assets/images/bg22.jpg';
import bg22mobile from '../assets/images/bg22mobile.jpg';

const CauseCard = ({ 
  icon: IconComponent = Play,
  title = "Streaming for 1 Hour",
  carbonFact = "≈ 55g CO₂",
  context = "That's like boiling 10 cups of water.",
  color = "emerald",
  delay = 0,
  index = 0
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const cardRef = useRef(null);

  // Professional color schemes
  const colorSchemes = {
    emerald: {
      primary: 'from-emerald-600 to-emerald-700',
      secondary: 'from-emerald-50 to-emerald-100',
      accent: 'text-emerald-600',
      border: 'border-emerald-200',
      icon: 'bg-emerald-100',
      hover: 'hover:bg-emerald-50'
    },
    blue: {
      primary: 'from-blue-600 to-blue-700',
      secondary: 'from-blue-50 to-blue-100',
      accent: 'text-blue-600',
      border: 'border-blue-200',
      icon: 'bg-blue-100',
      hover: 'hover:bg-blue-50'
    },
    amber: {
      primary: 'from-amber-600 to-amber-700',
      secondary: 'from-amber-50 to-amber-100',
      accent: 'text-amber-600',
      border: 'border-amber-200',
      icon: 'bg-amber-100',
      hover: 'hover:bg-amber-50'
    },
    red: {
      primary: 'from-red-600 to-red-700',
      secondary: 'from-red-50 to-red-100',
      accent: 'text-red-600',
      border: 'border-red-200',
      icon: 'bg-red-100',
      hover: 'hover:bg-red-50'
    }
  };

  const scheme = colorSchemes[color] || colorSchemes.emerald;

  // Enhanced intersection observer for animations with progress tracking
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: [0, 0.1, 0.3, 0.5, 0.7, 1], rootMargin: '50px' }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div
      ref={cardRef}
      className={`
        group relative w-full h-full
        transform transition-all duration-1000 ease-out
        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}
        ${isHovered ? 'scale-[1.05] -translate-y-2' : 'scale-100'}
      `}
      style={{ 
        transitionDelay: `${delay}ms`,
        filter: isVisible ? 'blur(0px)' : 'blur(4px)',
        transform: `
          translateY(${isVisible ? (isHovered ? -8 : 0) : 48}px) 
          scale(${isHovered ? 1.05 : (isVisible ? 1 : 0.9)}) 
          rotateX(${isVisible ? 0 : 15}deg)
        `,
        perspective: '1000px'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card Container */}
      <div 
        className={`
          relative h-full min-h-[280px] sm:min-h-[320px] lg:min-h-[360px]
          border-2 ${scheme.border}
          rounded-2xl
          shadow-lg hover:shadow-xl
          transition-all duration-500
          overflow-hidden
          ${scheme.hover}
        `}
        style={{
          backgroundImage: `url(${cardBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Enhanced background overlay with dynamic effects */}
        <div className="absolute inset-0 bg-white/85 backdrop-blur-sm
          transition-all duration-500"
          style={{
            background: isHovered 
              ? `linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.85) 100%)`
              : `linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.8) 100%)`
          }}></div>
        
        {/* Enhanced accent line with animation */}
        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${scheme.primary}
          transition-all duration-500`}
          style={{
            transform: isHovered ? 'scaleY(2)' : 'scaleY(1)',
            boxShadow: isHovered ? `0 0 10px rgba(16,185,129,0.5)` : 'none'
          }} />

        {/* Content Container */}
        <div className="relative z-10 h-full flex flex-col p-6 lg:p-8">
          
          {/* Header Section */}
          <div className="flex items-start justify-between mb-6">
            
            {/* Enhanced Professional Icon with glow effect */}
            <div className={`
              flex-shrink-0
              w-12 h-12 lg:w-16 lg:h-16
              ${scheme.icon}
              rounded-xl
              shadow-sm
              transform transition-all duration-700
              ${isHovered ? 'scale-110 rotate-6' : 'scale-100 rotate-0'}
              flex items-center justify-center
              relative overflow-hidden
            `}
            style={{
              boxShadow: isHovered 
                ? `0 10px 25px rgba(16,185,129,0.3), 0 0 20px rgba(16,185,129,0.2)`
                : `0 4px 6px rgba(0,0,0,0.1)`
            }}>
              {/* Icon background shimmer */}
              <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent
                transform -skew-x-12 translate-x-full transition-transform duration-1000
                ${isHovered ? '-translate-x-full' : 'translate-x-full'}`}></div>
              
              <IconComponent 
                className={`${scheme.accent} w-6 h-6 lg:w-8 lg:h-8
                  transition-all duration-500 relative z-10
                  ${isHovered ? 'scale-110' : 'scale-100'}`} 
              />
            </div>

            {/* Enhanced Impact Badge */}
            <div className={`
              flex items-center space-x-2
              bg-gradient-to-r ${scheme.secondary}
              px-3 py-1.5
              rounded-full ${scheme.border}
              border
              transform transition-all duration-500
              ${isHovered ? 'scale-105 -rotate-1' : 'scale-100 rotate-0'}
              relative overflow-hidden
            `}
            style={{
              boxShadow: isHovered ? `0 4px 15px rgba(16,185,129,0.2)` : 'none'
            }}>
              <TrendingUp className={`${scheme.accent} w-4 h-4 transition-transform duration-300
                ${isHovered ? 'scale-110' : 'scale-100'}`} />
              <span className={`${scheme.accent} text-sm font-semibold`}>
                Impact
              </span>
            </div>
          </div>

          {/* Content Section */}
          <div className="flex-1 space-y-4">
            
            {/* Enhanced Title with stagger animation */}
            <h3 className={`
              text-gray-900 font-bold text-lg lg:text-xl
              leading-tight
              transform transition-all duration-700
              ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}
              ${isHovered ? 'text-emerald-700' : 'text-gray-900'}
            `}
            style={{
              transitionDelay: `${delay + 200}ms`,
              textShadow: isHovered ? '0 2px 4px rgba(0,0,0,0.1)' : 'none'
            }}>
              {title}
            </h3>

            {/* Enhanced Carbon Fact with pulse animation */}
            <div className={`
              inline-flex items-center space-x-3
              bg-gradient-to-r ${scheme.secondary}
              px-4 py-3
              rounded-lg
              border ${scheme.border}
              transform transition-all duration-500
              ${isHovered ? 'scale-105 -rotate-1' : 'scale-100 rotate-0'}
              relative overflow-hidden
            `}
            style={{
              boxShadow: isHovered 
                ? `0 8px 25px rgba(16,185,129,0.25), 0 0 20px rgba(16,185,129,0.1)`
                : `0 2px 4px rgba(0,0,0,0.1)`,
              background: isHovered 
                ? `linear-gradient(135deg, rgba(16,185,129,0.1) 0%, rgba(16,185,129,0.05) 100%)`
                : undefined
            }}>
              {/* Animated background shimmer */}
              <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-emerald-200/50 to-transparent
                transform -skew-x-12 translate-x-full transition-transform duration-1000
                ${isHovered ? '-translate-x-full' : 'translate-x-full'}`}></div>
              
              <Leaf className={`${scheme.accent} w-5 h-5 transition-all duration-300 relative z-10
                ${isHovered ? 'scale-110 rotate-12' : 'scale-100 rotate-0'}`} />
              <span className={`${scheme.accent} font-bold text-base lg:text-lg relative z-10
                transition-all duration-300
                ${isHovered ? 'scale-105' : 'scale-100'}`}>
                {carbonFact}
              </span>
            </div>

            {/* Enhanced Context with delayed animation */}
            <p className={`
              text-gray-600 text-sm lg:text-base
              leading-relaxed
              transform transition-all duration-800
              ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}
              ${isHovered ? 'text-gray-700' : 'text-gray-600'}
            `}
            style={{
              transitionDelay: `${delay + 400}ms`,
              lineHeight: isHovered ? '1.7' : '1.6'
            }}>
              {context}
            </p>
          </div>

          {/* Enhanced Footer with slide-up animation */}
          <div className={`
            flex items-center justify-between 
            mt-6 pt-4
            border-t border-gray-100
            transform transition-all duration-700
            ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
            ${isHovered ? 'border-emerald-200' : 'border-gray-100'}
          `}
          style={{
            transitionDelay: `${delay + 600}ms`
          }}>
            
            {/* Enhanced Action Button */}
            <button className={`
              group flex items-center space-x-2
              bg-gradient-to-r ${scheme.primary}
              text-white font-semibold
              px-4 py-2
              rounded-lg
              transition-all duration-500
              transform hover:scale-110 hover:-translate-y-1
              text-sm lg:text-base
              shadow-sm hover:shadow-lg
              relative overflow-hidden
            `}
            style={{
              boxShadow: isHovered 
                ? `0 10px 25px rgba(16,185,129,0.3)`
                : `0 2px 4px rgba(0,0,0,0.1)`
            }}>
              {/* Button shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent
                transform -skew-x-12 translate-x-full transition-transform duration-1000
                group-hover:-translate-x-full"></div>
              
              <span className="relative z-10">Learn More</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 relative z-10
                group-hover:translate-x-2 group-hover:scale-110" />
            </button>

            {/* Additional Info */}
            <div className="flex space-x-2">
              {[BarChart3, Globe].map((ActionIcon, idx) => (
                <div
                  key={idx}
                  className={`
                    w-8 h-8 lg:w-10 lg:h-10
                    rounded-lg flex items-center justify-center
                    ${scheme.icon}
                    cursor-pointer transition-all duration-300
                    hover:scale-110
                    ${scheme.border} border
                  `}
                >
                  <ActionIcon className={`${scheme.accent} w-4 h-4 lg:w-5 lg:h-5`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Professional Demo Component
const CauseCardDemo = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Enhanced scroll progress tracking
  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const elementHeight = rect.height;
        
        // Calculate visibility progress
        const visibleHeight = Math.max(0, Math.min(windowHeight, windowHeight - rect.top));
        const progress = Math.min(1, visibleHeight / windowHeight);
        
        setScrollProgress(progress);
        setIsVisible(progress > 0.1);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const cardData = [
    {
      icon: Play,
      title: "Video Streaming",
      carbonFact: "≈ 55g CO₂",
      context: "One hour of HD streaming equals the emissions from boiling 10 cups of water.",
      color: "emerald",
      delay: 0
    },
    {
      icon: Zap,
      title: "Air Conditioning",
      carbonFact: "≈ 2.1kg CO₂",
      context: "8 hours of cooling generates emissions equivalent to a 5-mile car journey.",
      color: "blue",
      delay: 150
    },
    {
      icon: Wind,
      title: "Plastic Bottle",
      carbonFact: "≈ 6g CO₂",
      context: "Production and disposal impact, plus 1,000 years to decompose naturally.",
      color: "amber",
      delay: 300
    },
    {
      icon: Droplets,
      title: "Food Delivery",
      carbonFact: "≈ 1.2kg CO₂",
      context: "Includes packaging materials, preparation, and last-mile transportation.",
      color: "red",
      delay: 450
    }
  ];

  return (
    <div 
      ref={sectionRef}
      className="relative min-h-screen z-20 transition-all duration-1000 ease-out"
      style={{
        backgroundImage: `url(${isMobile ? bg22mobile : bg22})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'scroll',
        transform: `translateY(${Math.max(0, (1 - scrollProgress) * 50)}px) scale(${0.95 + scrollProgress * 0.05})`,
        opacity: Math.max(0.3, scrollProgress),
        filter: `blur(${Math.max(0, (1 - scrollProgress) * 8)}px) brightness(${0.7 + scrollProgress * 0.3})`
      }}
    >
      {/* Enhanced overlay with dynamic opacity */}
      <div 
        className="absolute inset-0 transition-all duration-1000"
        style={{
          background: `linear-gradient(135deg, 
            rgba(0,0,0,${0.4 - scrollProgress * 0.2}) 0%, 
            rgba(16,185,129,${0.1 + scrollProgress * 0.1}) 50%, 
            rgba(0,0,0,${0.3 - scrollProgress * 0.1}) 100%)`
        }}
      ></div>

      {/* Animated particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-emerald-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
              transform: `scale(${scrollProgress})`,
              opacity: scrollProgress
            }}
          ></div>
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 relative z-10">
        
        {/* Enhanced Professional Header with staggered animations */}
        <div className={`text-center mb-12 lg:mb-16
          transform transition-all duration-1500 ease-out
          ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}
          style={{
            transform: `translateY(${isVisible ? 0 : 50}px) scale(${0.9 + scrollProgress * 0.1})`,
            transitionDelay: '200ms'
          }}>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl
            font-bold text-white
            leading-tight tracking-tight
            mb-4 lg:mb-6
            drop-shadow-lg transition-all duration-1000"
            style={{ 
              textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
              transform: `translateY(${isVisible ? 0 : 30}px)`,
              filter: `blur(${isVisible ? 0 : 4}px)`
            }}>
            <span className="inline-block transition-all duration-1000 delay-100"
                  style={{ transform: `translateX(${isVisible ? 0 : -20}px)` }}>
              Carbon
            </span>
            <span className="inline-block transition-all duration-1000 delay-200"
                  style={{ transform: `translateX(${isVisible ? 0 : 20}px)` }}>
              {' '}Impact
            </span>
            <span className="inline-block transition-all duration-1000 delay-300"
                  style={{ transform: `translateY(${isVisible ? 0 : 20}px)` }}>
              {' '}Analysis
            </span>
          </h1>
          
          <p className="text-lg lg:text-xl
            text-white max-w-4xl mx-auto leading-relaxed
            font-medium drop-shadow-md transition-all duration-1200 delay-400"
            style={{ 
              textShadow: '1px 1px 3px rgba(0,0,0,0.7)',
              transform: `translateY(${isVisible ? 0 : 20}px)`,
              opacity: isVisible ? 1 : 0
            }}>
            Understanding the environmental impact of everyday activities through 
            <span className="text-emerald-300 font-bold transition-all duration-1000"
                  style={{ 
                    filter: `hue-rotate(${scrollProgress * 30}deg)`,
                    textShadow: `0 0 ${10 + scrollProgress * 10}px rgba(16,185,129,0.5)`
                  }}> data-driven insights</span> and 
            actionable recommendations.
          </p>
        </div>

        {/* Enhanced Professional Grid with staggered card animations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 
          gap-6 lg:gap-8 mb-12 lg:mb-16">
          {cardData.map((card, index) => (
            <div 
              key={index} 
              className="h-full transition-all duration-1000 ease-out"
              style={{
                transform: `translateY(${isVisible ? 0 : 50 + index * 10}px) 
                           scale(${isVisible ? 1 : 0.9}) 
                           rotateX(${isVisible ? 0 : 15}deg)`,
                opacity: isVisible ? 1 : 0,
                transitionDelay: `${500 + index * 150}ms`,
                perspective: '1000px'
              }}
            >
              <CauseCard
                icon={card.icon}
                title={card.title}
                carbonFact={card.carbonFact}
                context={card.context}
                color={card.color}
                delay={card.delay}
                index={index}
              />
            </div>
          ))}
        </div>

        {/* Enhanced Professional CTA Section with morphing animations */}
        <div className={`max-w-4xl mx-auto
          transform transition-all duration-1500 ease-out
          ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`}
          style={{
            transform: `translateY(${isVisible ? 0 : 60}px) scale(${0.95 + scrollProgress * 0.05})`,
            transitionDelay: '1000ms'
          }}>
          
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 lg:p-12
            hover:shadow-2xl transition-all duration-700 hover:scale-105
            backdrop-blur-sm bg-white/95"
            style={{
              boxShadow: `0 25px 50px -12px rgba(0,0,0,${0.15 + scrollProgress * 0.1}),
                          0 0 ${20 + scrollProgress * 20}px rgba(16,185,129,${scrollProgress * 0.2})`
            }}>
            
            <div className="text-center">
              <h2 className="text-2xl lg:text-3xl xl:text-4xl
                font-bold text-gray-900 mb-4 lg:mb-6 transition-all duration-1000"
                style={{
                  transform: `translateY(${isVisible ? 0 : 20}px)`,
                  filter: `blur(${isVisible ? 0 : 2}px)`
                }}>
                Ready to Reduce Your Carbon Footprint?
              </h2>
              
              <p className="text-gray-600 text-lg lg:text-xl
                mb-8 lg:mb-10 leading-relaxed 
                max-w-3xl mx-auto transition-all duration-1200"
                style={{
                  transform: `translateY(${isVisible ? 0 : 15}px)`,
                  opacity: isVisible ? 1 : 0.7
                }}>
                Join thousands of organizations and individuals using our platform to track, 
                analyze, and reduce their environmental impact through actionable insights.
              </p>
              
              {/* Enhanced Professional CTA Button */}
              <button className="group inline-flex items-center justify-center
                space-x-3 bg-gradient-to-r from-emerald-600 to-emerald-700
                hover:from-emerald-700 hover:to-emerald-800
                text-white px-8 py-4 lg:px-10 lg:py-5
                rounded-xl font-semibold text-lg
                shadow-lg hover:shadow-xl
                transform hover:scale-110 transition-all duration-500
                relative overflow-hidden"
                style={{
                  boxShadow: `0 10px 25px rgba(16,185,129,${0.3 + scrollProgress * 0.2})`,
                  filter: `saturate(${100 + scrollProgress * 20}%)`
                }}>
                
                {/* Animated background shimmer */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent
                  transform -skew-x-12 translate-x-full transition-transform duration-1000
                  group-hover:-translate-x-full"></div>
                
                <Target className="w-5 h-5 lg:w-6 lg:h-6 relative z-10" />
                <span className="relative z-10">Get Started Today</span>
                <ArrowRight className="w-5 h-5 lg:w-6 lg:h-6 relative z-10
                  transition-transform duration-300 group-hover:translate-x-2 group-hover:scale-110" />
              </button>

              {/* Enhanced feature highlights with staggered animations */}
              <div className="mt-8 lg:mt-10 flex flex-wrap justify-center gap-4 lg:gap-6">
                {[
                  { icon: BarChart3, text: "Advanced Analytics" },
                  { icon: Target, text: "Goal Setting" },
                  { icon: Users, text: "Team Collaboration" }
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-center space-x-2
                    bg-gray-50 px-4 py-3 rounded-lg
                    border border-gray-200
                    hover:bg-emerald-50 hover:border-emerald-200 transition-all duration-500
                    transform hover:scale-105 hover:-translate-y-1"
                    style={{
                      transform: `translateY(${isVisible ? 0 : 10}px) scale(${isVisible ? 1 : 0.9})`,
                      opacity: isVisible ? 1 : 0.8,
                      transitionDelay: `${1200 + idx * 100}ms`
                    }}>
                    <feature.icon className="w-5 h-5 text-emerald-600 transition-colors duration-300" />
                    <span className="text-gray-700 font-medium text-sm lg:text-base">
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CauseCardDemo;