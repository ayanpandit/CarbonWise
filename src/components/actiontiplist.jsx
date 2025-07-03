import React, { useState, useEffect, useRef } from 'react';
import bg22 from '../assets/images/bg22.jpg';
import bg22mobile from '../assets/images/bg22mobile.jpg';

const ActionTipList = () => {
  const [visibleCards, setVisibleCards] = useState([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef(null);

  const actionTips = [
    {
      id: 1,
      icon: '💡',
      title: 'Turn Off Lights',
      impact: 'Saves ~1kg CO₂ per week',
      tip: 'Natural light is great for your mood!',
      color: 'from-yellow-200 to-orange-300',
      shadowColor: 'shadow-yellow-200/50'
    },
    {
      id: 2,
      icon: '🔌',
      title: 'Unplug Chargers',
      impact: 'Saves ~50g CO₂ per day',
      tip: 'Phantom energy adds up quickly',
      color: 'from-blue-200 to-cyan-300',
      shadowColor: 'shadow-blue-200/50'
    },
    {
      id: 3,
      icon: '🪜',
      title: 'Take the Stairs',
      impact: 'Saves ~300g CO₂ per trip',
      tip: 'Great exercise for your heart too!',
      color: 'from-green-200 to-emerald-300',
      shadowColor: 'shadow-green-200/50'
    },
    {
      id: 4,
      icon: '🍳',
      title: 'Cook at Home',
      impact: 'Saves ~2kg CO₂ per meal',
      tip: 'Healthier and more delicious!',
      color: 'from-pink-200 to-rose-300',
      shadowColor: 'shadow-pink-200/50'
    },
    {
      id: 5,
      icon: '🛍️',
      title: 'Use Reusable Bags',
      impact: 'Saves ~6g CO₂ per bag',
      tip: 'Stronger and more stylish too',
      color: 'from-purple-200 to-violet-300',
      shadowColor: 'shadow-purple-200/50'
    },
    {
      id: 6,
      icon: '🌪️',
      title: 'Use Fans First',
      impact: 'Saves ~500g CO₂ per day',
      tip: 'Natural cooling feels amazing',
      color: 'from-teal-200 to-cyan-300',
      shadowColor: 'shadow-teal-200/50'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            actionTips.forEach((_, index) => {
              setTimeout(() => {
                setVisibleCards(prev => [...prev, index]);
              }, index * 150);
            });
          }
        });
      },
      { threshold: 0.1 }
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

  const FloatingBlob = ({ delay = 0, size = 'w-32 h-32', position = 'top-10 left-10' }) => (
    <div 
      className={`absolute ${position} ${size} rounded-full opacity-20 blur-xl animate-pulse`}
      style={{
        background: 'linear-gradient(45deg, #a78bfa, #06b6d4, #10b981)',
        animationDelay: `${delay}s`,
        animationDuration: '6s'
      }}
    />
  );

  const ParticleTrail = () => (
    <div 
      className="fixed pointer-events-none z-0 w-4 h-4 rounded-full opacity-30 transition-all duration-200 ease-out"
      style={{
        left: mousePosition.x - 8,
        top: mousePosition.y - 8,
        background: 'radial-gradient(circle, #06b6d4, transparent)',
        transform: `scale(${hoveredCard ? 1.5 : 0.8})`,
      }}
    />
  );

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen py-20 px-4 overflow-hidden z-20"
      style={{
        backgroundImage: `url(${isMobile ? bg22mobile : bg22})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'scroll'
      }}
    >
      <ParticleTrail />
      
      {/* Floating Background Elements */}
      <FloatingBlob delay={0} size="w-40 h-40" position="top-20 right-20" />
      <FloatingBlob delay={2} size="w-24 h-24" position="bottom-40 left-10" />
      <FloatingBlob delay={4} size="w-36 h-36" position="top-60 left-1/3" />
      <FloatingBlob delay={1} size="w-28 h-28" position="bottom-20 right-1/4" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 
            className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 animate-pulse"
            style={{
              textShadow: '0 0 30px rgba(16, 185, 129, 0.3)',
              animationDuration: '3s'
            }}
          >
            What You Can Do Today
          </h2>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-light">
            Start reducing your carbon footprint with these simple and effective changes.
          </p>
          
          {/* Animated Underline */}
          <div className="mt-8 flex justify-center">
            <div 
              className="h-1 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full animate-pulse"
              style={{
                width: '200px',
                animationDuration: '2s'
              }}
            />
          </div>
        </div>

        {/* Action Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {actionTips.map((tip, index) => (
            <div
              key={tip.id}
              className={`group relative transform transition-all duration-700 ease-out ${
                visibleCards.includes(index) 
                  ? 'translate-y-0 opacity-100 scale-100' 
                  : 'translate-y-20 opacity-0 scale-95'
              }`}
              style={{
                transitionDelay: `${index * 100}ms`
              }}
              onMouseEnter={() => setHoveredCard(tip.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Card Container */}
              <div 
                className={`relative p-8 rounded-3xl backdrop-blur-lg border border-white/30 cursor-pointer overflow-hidden transition-all duration-500 hover:scale-105 hover:-translate-y-2 ${tip.shadowColor} hover:shadow-2xl`}
                style={{
                  background: hoveredCard === tip.id 
                    ? 'rgba(255, 255, 255, 0.9)' 
                    : 'rgba(255, 255, 255, 0.7)',
                  boxShadow: hoveredCard === tip.id 
                    ? '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.3)' 
                    : '0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.2)'
                }}
              >
                {/* Gradient Overlay */}
                <div 
                  className={`absolute inset-0 bg-gradient-to-br ${tip.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-3xl`}
                />
                
                {/* Rotating Border Effect */}
                <div 
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `conic-gradient(from 0deg, transparent, ${tip.color.split(' ')[1]}, transparent)`,
                    padding: '2px',
                    mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    maskComposite: 'xor'
                  }}
                />

                {/* Icon */}
                <div className="text-6xl mb-6 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                  {tip.icon}
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-gray-900 transition-colors duration-300">
                    {tip.title}
                  </h3>
                  
                  <div className="mb-4">
                    <span className="inline-block px-4 py-2 bg-gradient-to-r from-emerald-500 to-blue-500 text-white text-sm font-semibold rounded-full transform group-hover:scale-105 transition-transform duration-300">
                      {tip.impact}
                    </span>
                  </div>

                  <p className="text-gray-600 italic text-sm leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                    {tip.tip}
                  </p>
                </div>

                {/* Floating Particles */}
                {hoveredCard === tip.id && (
                  <>
                    <div className="absolute top-4 right-4 w-2 h-2 bg-yellow-400 rounded-full animate-ping" />
                    <div className="absolute bottom-4 left-4 w-1 h-1 bg-blue-400 rounded-full animate-pulse" />
                    <div className="absolute top-1/2 right-8 w-1.5 h-1.5 bg-green-400 rounded-full animate-bounce" />
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Motivation */}
        <div className="text-center">
          <div className="inline-block p-6 rounded-2xl backdrop-blur-lg border border-white/30 bg-white/80 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105">
            <p className="text-lg md:text-xl text-gray-700 font-medium italic">
              "Take small steps — they add up faster than you think."
            </p>
            <div className="mt-4 flex justify-center space-x-2">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </section>
  );
};

export default ActionTipList;