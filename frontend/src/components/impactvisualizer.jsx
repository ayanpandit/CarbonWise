import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, Globe, TreePine, Waves, Sun, Heart, Zap } from 'lucide-react';
import bg22 from '../assets/images/bg22.jpg';
import bg22mobile from '../assets/images/bg22mobile.jpg';

const ImpactVisualizer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activePanel, setActivePanel] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const AnimatedBackground = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating orbs */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className={`absolute rounded-full blur-xl opacity-20 animate-pulse`}
          style={{
            width: `${Math.random() * 200 + 100}px`,
            height: `${Math.random() * 200 + 100}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            backgroundColor: i % 2 === 0 ? '#10B981' : '#3B82F6',
            animationDelay: `${i * 0.5}s`,
            animationDuration: `${3 + Math.random() * 2}s`,
          }}
        />
      ))}
      
      {/* Animated gradient mesh */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-green-50 to-purple-50 opacity-60" />
      
      {/* Dynamic cursor trail */}
      <div
        className="absolute w-4 h-4 bg-gradient-to-r from-blue-400 to-green-400 rounded-full blur-sm opacity-60 pointer-events-none transition-all duration-100"
        style={{
          left: mousePosition.x - 8,
          top: mousePosition.y - 8,
          transform: 'translate(-50%, -50%)',
        }}
      />
    </div>
  );

  const FuturePanel = ({ type, title, outcomes, icon: Icon, gradient, delay }) => (
    <div
      className={`relative group transition-all duration-700 transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
      onMouseEnter={() => setActivePanel(type)}
      onMouseLeave={() => setActivePanel(null)}
    >
      <div className={`relative overflow-hidden rounded-3xl backdrop-blur-xl border border-white/20 shadow-2xl transition-all duration-500 hover:scale-105 hover:shadow-3xl ${
        type === 'inaction' 
          ? 'bg-gradient-to-br from-red-900/10 to-gray-900/20 hover:from-red-900/20 hover:to-gray-900/30' 
          : 'bg-gradient-to-br from-green-400/10 to-blue-500/20 hover:from-green-400/20 hover:to-blue-500/30'
      }`}>
        
        {/* Animated border effect */}
        <div className={`absolute inset-0 rounded-3xl transition-opacity duration-500 ${
          activePanel === type ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${gradient} opacity-20 blur-sm`} />
        </div>

        {/* Content */}
        <div className="relative p-8 md:p-12">
          {/* Icon with pulsing effect */}
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 transition-all duration-500 ${
            type === 'inaction' 
              ? 'bg-red-500/20 text-red-400' 
              : 'bg-green-500/20 text-green-400'
          } ${activePanel === type ? 'scale-110 rotate-6' : ''}`}>
            <Icon size={32} className="drop-shadow-lg" />
          </div>

          {/* Title */}
          <h3 className={`text-2xl md:text-3xl font-bold mb-8 transition-colors duration-300 ${
            type === 'inaction' 
              ? 'text-gray-800 group-hover:text-red-600' 
              : 'text-gray-800 group-hover:text-green-600'
          }`}>
            {title}
          </h3>

          {/* Outcomes list */}
          <div className="space-y-6">
            {outcomes.map((outcome, index) => (
              <div
                key={index}
                className={`flex items-start space-x-4 transition-all duration-500 ${
                  isVisible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
                }`}
                style={{ transitionDelay: `${delay + (index * 200)}ms` }}
              >
                <div className={`flex-shrink-0 w-3 h-3 rounded-full mt-2 ${
                  type === 'inaction' 
                    ? 'bg-red-400 shadow-lg shadow-red-400/50' 
                    : 'bg-green-400 shadow-lg shadow-green-400/50'
                } ${activePanel === type ? 'animate-pulse' : ''}`} />
                <p className="text-gray-700 text-lg leading-relaxed font-medium">
                  {outcome}
                </p>
              </div>
            ))}
          </div>

          {/* Hover indicator */}
          <div className={`absolute bottom-6 right-6 transition-all duration-300 ${
            activePanel === type ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
          }`}>
            <ChevronRight className={`w-6 h-6 ${
              type === 'inaction' ? 'text-red-400' : 'text-green-400'
            }`} />
          </div>
        </div>

        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <defs>
              <pattern id={`pattern-${type}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="2" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill={`url(#pattern-${type})`} />
          </svg>
        </div>
      </div>
    </div>
  );

  return (
    <section 
      ref={sectionRef} 
      className="relative min-h-screen py-20 md:py-32 overflow-hidden z-20"
      style={{
        backgroundImage: `url(${isMobile ? bg22mobile : bg22})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'scroll'
      }}
    >
      <AnimatedBackground />
      
      <div className="relative container mx-auto px-6 md:px-12 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-20">
          <div className={`transition-all duration-1000 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <h2 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-gray-800 via-blue-600 to-green-600 bg-clip-text text-transparent mb-6 leading-tight">
              The Future You Save
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto font-medium leading-relaxed">
              Your daily choices shape the future — here's how.
            </p>
          </div>
        </div>

        {/* Comparison Panels */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 mb-20">
          <FuturePanel
            type="inaction"
            title="If We Do Nothing"
            icon={Globe}
            gradient="from-red-500 to-orange-500"
            delay={200}
            outcomes={[
              "Rising sea levels flood coastal cities worldwide",
              "Extreme weather becomes the devastating norm",
              "Wildlife species face mass extinction"
            ]}
          />
          
          <FuturePanel
            type="action"
            title="If We Act Today"
            icon={TreePine}
            gradient="from-green-500 to-blue-500"
            delay={400}
            outcomes={[
              "Clean energy powers thriving communities",
              "Restored ecosystems support abundant wildlife",
              "Future generations inherit a livable planet"
            ]}
          />
        </div>

        {/* Call to Action Quote */}
        <div className={`text-center transition-all duration-1000 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`} style={{ transitionDelay: '800ms' }}>
          <div className="relative inline-block">
            {/* Glowing background */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl blur-xl opacity-20 scale-110" />
            
            {/* Quote content */}
            <div className="relative backdrop-blur-xl bg-white/30 border border-white/20 rounded-2xl px-12 py-8 shadow-2xl">
              <Heart className="w-8 h-8 text-red-400 mx-auto mb-4 animate-pulse" />
              <blockquote className="text-2xl md:text-3xl font-bold text-gray-800 italic">
                "The planet is still in your hands."
              </blockquote>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-10 left-10 opacity-20">
          <Waves className="w-24 h-24 text-blue-400 animate-bounce" style={{ animationDuration: '3s' }} />
        </div>
        <div className="absolute top-20 right-10 opacity-20">
          <Sun className="w-20 h-20 text-yellow-400 animate-spin" style={{ animationDuration: '8s' }} />
        </div>
        <div className="absolute bottom-20 left-20 opacity-20">
          <Zap className="w-16 h-16 text-purple-400 animate-pulse" style={{ animationDuration: '2s' }} />
        </div>
      </div>
    </section>
  );
};

export default ImpactVisualizer;