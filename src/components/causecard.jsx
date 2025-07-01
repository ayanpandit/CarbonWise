import React, { useState, useEffect, useRef } from 'react';
import { Play, Zap, Droplets, Wind, Leaf, TrendingUp } from 'lucide-react';

const CauseCard = ({ 
  icon: IconComponent = Play,
  title = "Streaming for 1 Hour",
  carbonFact = "≈ 55g CO₂",
  context = "That's like boiling 10 cups of water.",
  color = "emerald",
  delay = 0
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  // Professional color schemes
  const colorSchemes = {
    emerald: {
      gradient: 'from-emerald-50 to-emerald-100',
      iconBg: 'bg-emerald-500',
      accent: 'text-emerald-600',
      border: 'border-emerald-200',
      shadow: 'shadow-emerald-100'
    },
    amber: {
      gradient: 'from-amber-50 to-amber-100',
      iconBg: 'bg-amber-500',
      accent: 'text-amber-600',
      border: 'border-amber-200',
      shadow: 'shadow-amber-100'
    },
    red: {
      gradient: 'from-red-50 to-red-100',
      iconBg: 'bg-red-500',
      accent: 'text-red-600',
      border: 'border-red-200',
      shadow: 'shadow-red-100'
    },
    blue: {
      gradient: 'from-blue-50 to-blue-100',
      iconBg: 'bg-blue-500',
      accent: 'text-blue-600',
      border: 'border-blue-200',
      shadow: 'shadow-blue-100'
    }
  };

  const scheme = colorSchemes[color] || colorSchemes.emerald;

  // Intersection Observer for scroll animations
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

  return (
    <div
      ref={cardRef}
      className={`
        w-full h-full
        transform transition-all duration-500 ease-out
        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
        ${isHovered ? 'scale-[1.02]' : 'scale-100'}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Card */}
      <div className={`
        relative h-full
        bg-gradient-to-br ${scheme.gradient}
        border-2 ${scheme.border}
        rounded-2xl sm:rounded-3xl
        shadow-lg hover:shadow-xl ${scheme.shadow}
        transition-all duration-300
        overflow-hidden
        p-4 sm:p-6 lg:p-8
        cursor-pointer
      `}>
        
        {/* Header Section */}
        <div className="flex items-start justify-between mb-4 sm:mb-6">
          
          {/* Icon */}
          <div className={`
            ${scheme.iconBg} 
            rounded-xl sm:rounded-2xl
            p-2 sm:p-3 lg:p-4
            shadow-lg
            transform transition-transform duration-300
            ${isHovered ? 'rotate-3' : 'rotate-0'}
            flex-shrink-0
          `}>
            <IconComponent 
              className="text-white w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" 
            />
          </div>

          {/* Impact Badge */}
          <div className={`
            flex items-center space-x-1
            bg-white/80 backdrop-blur-sm
            px-2 py-1 sm:px-3 sm:py-1.5
            rounded-full border ${scheme.border}
            transform transition-all duration-300
            ${isHovered ? 'scale-105' : 'scale-100'}
          `}>
            <TrendingUp className={`${scheme.accent} w-3 h-3 sm:w-4 sm:h-4`} />
            <span className={`${scheme.accent} text-xs sm:text-sm font-medium`}>
              Impact
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="space-y-3 sm:space-y-4">
          
          {/* Title */}
          <h3 className="text-gray-800 font-bold text-lg sm:text-xl lg:text-2xl leading-tight">
            {title}
          </h3>

          {/* Carbon Fact */}
          <div className={`
            inline-flex items-center space-x-2
            bg-white/60 backdrop-blur-sm
            px-3 py-2 sm:px-4 sm:py-2.5
            rounded-xl border ${scheme.border}
            transform transition-all duration-300
            ${isHovered ? 'scale-105' : 'scale-100'}
          `}>
            <Leaf className={`${scheme.accent} w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0`} />
            <span className={`${scheme.accent} font-bold text-sm sm:text-base lg:text-lg`}>
              {carbonFact}
            </span>
          </div>

          {/* Context */}
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            {context}
          </p>
        </div>

        {/* Footer Section */}
        <div className={`
          flex items-center justify-between 
          mt-4 sm:mt-6 pt-4 sm:pt-6
          border-t border-gray-200
          transform transition-all duration-300
          ${isHovered ? 'translate-y-0' : 'translate-y-1'}
        `}>
          
          {/* Learn More Button */}
          <button className={`
            flex items-center space-x-2
            bg-white/80 hover:bg-white
            px-3 py-2 sm:px-4 sm:py-2.5
            rounded-xl border ${scheme.border}
            text-gray-700 hover:text-gray-900
            transition-all duration-200
            transform hover:scale-105
            text-sm sm:text-base font-medium
          `}>
            <span>Learn More</span>
          </button>

          {/* Action Icons */}
          <div className="flex space-x-1 sm:space-x-2">
            {[Wind, Droplets, Zap].map((ActionIcon, index) => (
              <div
                key={index}
                className={`
                  w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10
                  rounded-full flex items-center justify-center
                  bg-white/60 hover:bg-white/80
                  border ${scheme.border}
                  cursor-pointer transition-all duration-200
                  hover:scale-110
                `}
              >
                <ActionIcon className="text-gray-600 w-3 h-3 sm:w-4 sm:h-4" />
              </div>
            ))}
          </div>
        </div>

        {/* Subtle Hover Effect */}
        <div className={`
          absolute inset-0 rounded-2xl sm:rounded-3xl
          bg-gradient-to-r from-transparent via-white/10 to-transparent
          transform transition-all duration-700
          ${isHovered ? 'translate-x-full opacity-100' : '-translate-x-full opacity-0'}
        `} />
      </div>
    </div>
  );
};

// Demo Component
const CauseCardDemo = () => {
  const cardData = [
    {
      icon: Play,
      title: "Streaming for 1 Hour",
      carbonFact: "≈ 55g CO₂",
      context: "That's like boiling 10 cups of water.",
      color: "emerald",
      delay: 0
    },
    {
      icon: Zap,
      title: "AC Running All Day",
      carbonFact: "≈ 2.1kg CO₂",
      context: "Equivalent to driving 5 miles in a car.",
      color: "amber",
      delay: 100
    },
    {
      icon: Wind,
      title: "Plastic Bag Usage",
      carbonFact: "≈ 6g CO₂",
      context: "Takes 1000 years to decompose naturally.",
      color: "red",
      delay: 200
    },
    {
      icon: Droplets,
      title: "Food Delivery Order",
      carbonFact: "≈ 1.2kg CO₂",
      context: "From packaging, transport, and preparation.",
      color: "blue",
      delay: 300
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-3 sm:mb-4">
            What Just Happened?
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Understanding the carbon footprint of your daily activities through clear, actionable insights.
          </p>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {cardData.map((card, index) => (
            <div key={index} className="h-full min-h-[300px] sm:min-h-[320px] lg:min-h-[350px]">
              <CauseCard
                icon={card.icon}
                title={card.title}
                carbonFact={card.carbonFact}
                context={card.context}
                color={card.color}
                delay={card.delay}
              />
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-8 sm:mt-12 lg:mt-16 text-center">
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-200 max-w-4xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">
              Ready to Make a Difference?
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6 leading-relaxed">
              CarbonWise helps you track, understand, and reduce your environmental impact through personalized insights and actionable recommendations.
            </p>
            <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-medium transition-colors duration-200 text-sm sm:text-base">
              Start Your Carbon Journey
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CauseCardDemo;