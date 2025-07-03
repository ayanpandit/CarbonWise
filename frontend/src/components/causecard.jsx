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

  // Intersection observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
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
        transform transition-all duration-700 ease-out
        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
        ${isHovered ? 'scale-[1.02]' : 'scale-100'}
      `}
      style={{ transitionDelay: `${delay}ms` }}
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
        {/* Background overlay for better text readability */}
        <div className="absolute inset-0 bg-white/85 backdrop-blur-sm"></div>
        
        {/* Subtle accent line */}
        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${scheme.primary}`} />

        {/* Content Container */}
        <div className="relative z-10 h-full flex flex-col p-6 lg:p-8">
          
          {/* Header Section */}
          <div className="flex items-start justify-between mb-6">
            
            {/* Professional Icon */}
            <div className={`
              flex-shrink-0
              w-12 h-12 lg:w-16 lg:h-16
              ${scheme.icon}
              rounded-xl
              shadow-sm
              transform transition-all duration-500
              ${isHovered ? 'scale-110' : 'scale-100'}
              flex items-center justify-center
            `}>
              <IconComponent 
                className={`${scheme.accent} w-6 h-6 lg:w-8 lg:h-8
                  transition-all duration-300`} 
              />
            </div>

            {/* Impact Badge */}
            <div className={`
              flex items-center space-x-2
              bg-gradient-to-r ${scheme.secondary}
              px-3 py-1.5
              rounded-full ${scheme.border}
              border
              transform transition-all duration-300
              ${isHovered ? 'scale-105' : 'scale-100'}
            `}>
              <TrendingUp className={`${scheme.accent} w-4 h-4`} />
              <span className={`${scheme.accent} text-sm font-semibold`}>
                Impact
              </span>
            </div>
          </div>

          {/* Content Section */}
          <div className="flex-1 space-y-4">
            
            {/* Title */}
            <h3 className={`
              text-gray-900 font-bold text-lg lg:text-xl
              leading-tight
              transform transition-all duration-500
              ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
            `}>
              {title}
            </h3>

            {/* Carbon Fact */}
            <div className={`
              inline-flex items-center space-x-3
              bg-gradient-to-r ${scheme.secondary}
              px-4 py-3
              rounded-lg
              border ${scheme.border}
              transform transition-all duration-300
              ${isHovered ? 'scale-105' : 'scale-100'}
            `}>
              <Leaf className={`${scheme.accent} w-5 h-5`} />
              <span className={`${scheme.accent} font-bold text-base lg:text-lg`}>
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
      className="relative min-h-screen z-20"
      style={{
        backgroundImage: `url(${isMobile ? bg22mobile : bg22})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'scroll'
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 relative z-10">
        
        {/* Professional Header */}
        <div className={`text-center mb-12 lg:mb-16
          transform transition-all duration-1000
          ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl
            font-bold text-white
            leading-tight tracking-tight
            mb-4 lg:mb-6
            drop-shadow-lg"
            style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
            Carbon Impact Analysis
          </h1>
          
          <p className="text-lg lg:text-xl
            text-white max-w-4xl mx-auto leading-relaxed
            font-medium drop-shadow-md"
            style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.7)' }}>
            Understanding the environmental impact of everyday activities through 
            <span className="text-emerald-300 font-bold"> data-driven insights</span> and 
            actionable recommendations.
          </p>
        </div>

        {/* Professional Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 
          gap-6 lg:gap-8 mb-12 lg:mb-16">
          {cardData.map((card, index) => (
            <div key={index} className="h-full">
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

        {/* Professional CTA Section */}
        <div className={`max-w-4xl mx-auto
          transform transition-all duration-1000 delay-500
          ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 lg:p-12
            hover:shadow-2xl transition-all duration-500">
            
            <div className="text-center">
              <h2 className="text-2xl lg:text-3xl xl:text-4xl
                font-bold text-gray-900 mb-4 lg:mb-6">
                Ready to Reduce Your Carbon Footprint?
              </h2>
              
              <p className="text-gray-600 text-lg lg:text-xl
                mb-8 lg:mb-10 leading-relaxed 
                max-w-3xl mx-auto">
                Join thousands of organizations and individuals using our platform to track, 
                analyze, and reduce their environmental impact through actionable insights.
              </p>
              
              {/* Professional CTA Button */}
              <button className="group inline-flex items-center justify-center
                space-x-3 bg-gradient-to-r from-emerald-600 to-emerald-700
                hover:from-emerald-700 hover:to-emerald-800
                text-white px-8 py-4 lg:px-10 lg:py-5
                rounded-xl font-semibold text-lg
                shadow-lg hover:shadow-xl
                transform hover:scale-105 transition-all duration-300">
                
                <Target className="w-5 h-5 lg:w-6 lg:h-6" />
                <span>Get Started Today</span>
                <ArrowRight className="w-5 h-5 lg:w-6 lg:h-6 
                  transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              {/* Feature highlights */}
              <div className="mt-8 lg:mt-10 flex flex-wrap justify-center gap-4 lg:gap-6">
                {[
                  { icon: BarChart3, text: "Advanced Analytics" },
                  { icon: Target, text: "Goal Setting" },
                  { icon: Users, text: "Team Collaboration" }
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-center space-x-2
                    bg-gray-50 px-4 py-3 rounded-lg
                    border border-gray-200
                    hover:bg-gray-100 transition-colors duration-300">
                    <feature.icon className="w-5 h-5 text-emerald-600" />
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