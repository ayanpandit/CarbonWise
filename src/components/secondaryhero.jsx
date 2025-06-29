import React, { useState, useEffect } from 'react';
import { Leaf, TrendingDown, Users, Target, ArrowRight, Play, Sparkles, ChevronDown, Globe, Zap, Award } from 'lucide-react';

const Secondaryhero = () => {
  const [currentStat, setCurrentStat] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  const stats = [
    { number: "2.3B", label: "Tons CO₂ Reduced", icon: TrendingDown, color: "from-emerald-400 to-emerald-600" },
    { number: "50K+", label: "Users Joined", icon: Users, color: "from-blue-400 to-blue-600" },
    { number: "89%", label: "Average Reduction", icon: Target, color: "from-purple-400 to-purple-600" }
  ];

  const impactItems = [
    { 
      title: "Track Your Impact", 
      desc: "Real-time carbon monitoring with AI-powered analytics",
      icon: Globe,
      color: "from-emerald-400 to-teal-400"
    },
    { 
      title: "Get Recommendations", 
      desc: "Personalized eco-friendly tips tailored to your lifestyle",
      icon: Zap,
      color: "from-blue-400 to-cyan-400"
    },
    { 
      title: "Join Community", 
      desc: "Connect with 50k+ eco-warriors worldwide",
      icon: Award,
      color: "from-purple-400 to-pink-400"
    }
  ];

  const floatingElements = [
    { top: "10%", left: "8%", size: "w-3 h-3", color: "bg-emerald-400", animation: "animate-pulse", delay: "0s" },
    { top: "20%", right: "15%", size: "w-2 h-2", color: "bg-blue-400", animation: "animate-bounce", delay: "1s" },
    { top: "35%", left: "25%", size: "w-1 h-1", color: "bg-white", animation: "animate-ping", delay: "2s" },
    { bottom: "30%", left: "12%", size: "w-4 h-4", color: "bg-green-300", animation: "animate-pulse", delay: "3s" },
    { top: "45%", right: "25%", size: "w-2 h-2", color: "bg-purple-400", animation: "animate-bounce", delay: "4s" },
    { bottom: "50%", right: "10%", size: "w-3 h-3", color: "bg-cyan-400", animation: "animate-ping", delay: "5s" },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 4000);

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Enhanced Background with Parallax Effect */}
      <div className="absolute inset-0 z-0">
        {/* Desktop Background */}
        <div 
          className="hidden md:block absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105 transition-transform duration-1000"
          style={{ 
            backgroundImage: `url('./src/assets/images/newbg.jpg')`,
            transform: `translateY(${scrollY * 0.5}px) scale(1.05)`
          }}
        />
        {/* Mobile Background */}
        <div 
          className="md:hidden absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('./src/assets/images/newbgres.jpg')` }}
        />
        

      </div>

      {/* Enhanced Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingElements.map((element, index) => (
          <div
            key={index}
            className={`absolute ${element.size} ${element.color} rounded-full ${element.animation} opacity-60`}
            style={{
              top: element.top,
              left: element.left,
              right: element.right,
              bottom: element.bottom,
              animationDelay: element.delay,
              animationDuration: `${2 + index * 0.5}s`
            }}
          />
        ))}
        
        {/* Geometric Shapes */}
        <div className="absolute top-1/4 right-1/4 w-20 h-20 border border-white/20 rotate-45 animate-spin" style={{ animationDuration: '20s' }} />
        <div className="absolute bottom-1/3 left-1/5 w-16 h-16 border border-emerald-400/30 rotate-12 animate-pulse" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-full flex flex-col pb-20">
        {/* Hero Content */}
        <div className="flex-1 flex items-center px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20 pt-16 sm:pt-20">
          <div className="max-w-7xl mx-auto w-full">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              
              {/* Left Column - Enhanced Main Content */}
              <div className={`space-y-6 sm:space-y-8 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                
                {/* Enhanced Badge */}
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 backdrop-blur-md rounded-full border border-emerald-400/40 shadow-xl">
                  <Sparkles className="w-4 h-4 text-emerald-300 mr-2 animate-pulse" />
                  <span className="text-emerald-100 text-sm font-semibold tracking-wider">TRACK • REDUCE • IMPACT</span>
                  <div className="ml-2 w-2 h-2 bg-emerald-400 rounded-full animate-ping" />
                </div>

                {/* Enhanced Main Headline */}
                <div className="space-y-4 sm:space-y-6">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight tracking-tight">
                    <span className="text-gray-200 drop-shadow-2xl">Your</span>
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-blue-400 animate-pulse font-black">
                      Carbon Story
                    </span>
                    <span className="text-gray-200 block drop-shadow-2xl">Starts Here</span>
                  </h1>
                  
                  <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-2xl leading-relaxed font-medium">
                    Discover your environmental impact with precision. Get personalized recommendations and join 
                    <span className="text-emerald-300 font-semibold"> 50,000+ </span>
                    eco-warriors making a real difference.
                  </p>
                </div>

                {/* Enhanced CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 pt-4">
                  <button className="group relative px-8 py-4 bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 hover:from-emerald-600 hover:via-emerald-700 hover:to-teal-700 text-gray-100 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-emerald-500/40 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="relative flex items-center justify-center">
                      Calculate My Impact
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                    </span>
                  </button>
                  
                  <button className="group px-8 py-4 bg-white/10 backdrop-blur-md hover:bg-white/20 text-gray-200 rounded-2xl font-bold transition-all duration-300 border border-white/30 hover:border-white/50 shadow-xl hover:shadow-2xl">
                    <span className="flex items-center justify-center">
                      <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                      Watch Demo
                    </span>
                  </button>
                </div>

                {/* Enhanced Impact Items */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 pt-6 sm:pt-8">
                  {impactItems.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <div key={index} className={`transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`} style={{ transitionDelay: `${index * 200}ms` }}>
                        <div className="group p-4 sm:p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/20 hover:bg-white/10 hover:border-white/40 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/10 hover:scale-105">
                          <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${item.color} p-2 mb-3 group-hover:scale-110 transition-transform duration-300`}>
                            <Icon className="w-full h-full text-white" />
                          </div>
                          <h3 className="font-bold text-gray-200 mb-2 group-hover:text-emerald-300 transition-colors text-sm sm:text-base">
                            {item.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Column - Enhanced Dynamic Stats */}
              <div className={`transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
                <div className="relative">
                  
                  {/* Enhanced Main Stats Card */}
                  <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/30 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:bg-white/15">
                    <div className="text-center space-y-6 sm:space-y-8">
                      
                      {/* Enhanced Rotating Stats */}
                      <div className="relative h-32 sm:h-40 flex items-center justify-center">
                        {stats.map((stat, index) => {
                          const Icon = stat.icon;
                          return (
                            <div
                              key={index}
                              className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-700 ${
                                currentStat === index 
                                  ? 'opacity-100 transform scale-100' 
                                  : 'opacity-0 transform scale-90'
                              }`}
                            >
                              <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-r ${stat.color} p-3 mb-4 shadow-2xl`}>
                                <Icon className="w-full h-full text-white" />
                              </div>
                              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-200 mb-2 drop-shadow-lg">
                                {stat.number}
                              </div>
                              <div className="text-gray-400 font-semibold text-sm sm:text-base">
                                {stat.label}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Enhanced Progress Indicators */}
                      <div className="flex justify-center space-x-3">
                        {stats.map((stat, index) => (
                          <div
                            key={index}
                            className={`h-2 rounded-full transition-all duration-500 ${
                              currentStat === index 
                                ? `bg-gradient-to-r ${stat.color} w-12 shadow-lg` 
                                : 'bg-white/30 w-2'
                            }`}
                          />
                        ))}
                      </div>

                      <div className="text-sm text-gray-400 font-medium">
                        Real-time global impact • Updated every 24h
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Floating Accent Cards */}
                  <div className="absolute -top-6 -right-6 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-emerald-400 via-emerald-500 to-emerald-600 rounded-2xl shadow-2xl flex items-center justify-center opacity-90 animate-bounce hover:scale-110 transition-transform duration-300">
                    <Leaf className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  
                  <div className="absolute -bottom-4 -left-4 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-xl shadow-2xl flex items-center justify-center opacity-80 animate-pulse hover:scale-110 transition-transform duration-300">
                    <Target className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                  </div>

                  {/* Additional Floating Elements */}
                  <div className="absolute top-1/2 -left-8 w-8 h-8 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full shadow-xl opacity-60 animate-ping" />
                  <div className="absolute -top-2 left-1/3 w-6 h-6 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-lg shadow-lg opacity-70 animate-bounce" style={{ animationDelay: '1s' }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Scroll Indicator */}
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="flex flex-col items-center space-y-2 group cursor-pointer">
            <div className="text-gray-300 text-xs font-medium group-hover:text-gray-200 transition-colors">
              Scroll to explore
            </div>
            <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center group-hover:border-gray-200 transition-colors">
              <div className="w-1 h-3 bg-gray-300 rounded-full mt-2 animate-pulse" />
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-gray-300 transition-colors animate-bounce" />
          </div>
        </div>
      </div>

      {/* Subtle Noise Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
      }} />
    </div>
  );
};

export default Secondaryhero;