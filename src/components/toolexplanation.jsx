import React, { useState, useEffect, useRef } from 'react';
import { Search, BarChart3, CheckCircle, ArrowRight, Sparkles, Zap, Target, Brain, Lightbulb, TrendingUp } from 'lucide-react';

const ToolExplanation = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);
  const intervalRef = useRef(null);

  const steps = [
    {
      id: 'detect',
      title: 'Detect Your Impact',
      subtitle: 'Smart Recognition',
      description: 'CarbonWise intelligently identifies and tracks your daily activities - from streaming habits to transportation choices - creating a comprehensive picture of your carbon footprint.',
      icon: Search,
      color: 'emerald',
      features: ['AI-powered activity detection', 'Real-time tracking', 'Comprehensive coverage'],
      imagePlaceholder: 'A modern dashboard showing various daily activities being detected and categorized with glowing data points and smooth animations'
    },
    {
      id: 'analyze',
      title: 'Analyze Patterns',
      subtitle: 'Deep Insights',
      description: 'Advanced analytics break down your environmental impact with beautiful visualizations, trend analysis, and personalized insights that reveal hidden patterns in your carbon usage.',
      icon: BarChart3,
      color: 'blue',
      features: ['Advanced data visualization', 'Pattern recognition', 'Predictive analytics'],
      imagePlaceholder: 'Interactive graphs and charts with flowing data animations, showing carbon footprint analysis with colorful trend lines and infographic elements'
    },
    {
      id: 'recommend',
      title: 'Get Recommendations',
      subtitle: 'Actionable Solutions',
      description: 'Receive personalized, science-backed recommendations tailored to your lifestyle. Turn insights into action with specific steps that make a real environmental difference.',
      icon: CheckCircle,
      color: 'amber',
      features: ['Personalized action plans', 'Science-backed solutions', 'Progress tracking'],
      imagePlaceholder: 'A beautiful interface showing personalized eco-friendly recommendations with checkmarks, progress bars, and nature-inspired design elements'
    }
  ];

  const colorSchemes = {
    emerald: {
      primary: 'from-emerald-500 to-teal-600',
      secondary: 'from-emerald-50 to-teal-50',
      accent: 'text-emerald-600',
      bg: 'bg-emerald-500',
      border: 'border-emerald-200',
      glow: 'shadow-emerald-500/20'
    },
    blue: {
      primary: 'from-blue-500 to-cyan-600',
      secondary: 'from-blue-50 to-cyan-50',
      accent: 'text-blue-600',
      bg: 'bg-blue-500',
      border: 'border-blue-200',
      glow: 'shadow-blue-500/20'
    },
    amber: {
      primary: 'from-amber-500 to-orange-600',
      secondary: 'from-amber-50 to-orange-50',
      accent: 'text-amber-600',
      bg: 'bg-amber-500',
      border: 'border-amber-200',
      glow: 'shadow-amber-500/20'
    }
  };

  // Auto-advance steps
  useEffect(() => {
    if (isVisible) {
      intervalRef.current = setInterval(() => {
        setActiveStep((prev) => (prev + 1) % steps.length);
      }, 4000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isVisible, steps.length]);

  // Intersection Observer
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

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100
        });
      }
    };

    const section = sectionRef.current;
    if (section) {
      section.addEventListener('mousemove', handleMouseMove);
      return () => section.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  const currentStep = steps[activeStep];
  const currentScheme = colorSchemes[currentStep.color];

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 overflow-hidden"
    >
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0">
        {/* Animated Gradient Orbs */}
        <div 
          className={`absolute w-96 h-96 bg-gradient-to-r ${currentScheme.primary} rounded-full blur-3xl opacity-10 transition-all duration-1000`}
          style={{
            left: `${mousePosition.x * 0.1}%`,
            top: `${mousePosition.y * 0.1}%`,
            transform: `translate(-50%, -50%) scale(${isVisible ? 1 : 0.5})`
          }}
        />
        <div 
          className={`absolute w-64 h-64 bg-gradient-to-r ${currentScheme.primary} rounded-full blur-2xl opacity-15 transition-all duration-1500`}
          style={{
            right: `${(100 - mousePosition.x) * 0.05}%`,
            bottom: `${(100 - mousePosition.y) * 0.05}%`,
            transform: `translate(50%, 50%) scale(${isVisible ? 1 : 0.3})`
          }}
        />

        {/* Floating Particles */}
        {isVisible && Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 ${currentScheme.bg} rounded-full opacity-20 animate-float`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
        
        {/* Header Section */}
        <div className={`text-center mb-12 sm:mb-16 lg:mb-20 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="flex items-center justify-center mb-4 sm:mb-6">
            <Sparkles className={`w-6 h-6 sm:w-8 sm:h-8 ${currentScheme.accent} mr-3`} />
            <span className={`${currentScheme.accent} font-semibold text-sm sm:text-base uppercase tracking-wider`}>
              How CarbonWise Works
            </span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
            Your Journey to
            <span className={`block bg-gradient-to-r ${currentScheme.primary} bg-clip-text text-transparent`}>
              Carbon Awareness
            </span>
          </h2>
          
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover how our intelligent platform transforms your daily habits into actionable environmental insights through three powerful steps.
          </p>
        </div>

        {/* Main Content Area */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          
          {/* Left Side - Content */}
          <div className={`transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'}`}>
            
            {/* Step Navigation */}
            <div className="flex flex-wrap gap-2 sm:gap-4 mb-8 sm:mb-12">
              {steps.map((step, index) => (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(index)}
                  className={`
                    flex items-center space-x-2 sm:space-x-3 px-4 py-2 sm:px-6 sm:py-3 rounded-2xl
                    transition-all duration-300 border-2 font-medium text-sm sm:text-base
                    ${activeStep === index 
                      ? `${colorSchemes[step.color].bg} text-white border-transparent shadow-lg ${colorSchemes[step.color].glow}` 
                      : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:shadow-md'
                    }
                  `}
                >
                  <step.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="hidden sm:inline">{step.title}</span>
                  <span className="sm:hidden">{index + 1}</span>
                </button>
              ))}
            </div>

            {/* Active Step Content */}
            <div className="space-y-6 sm:space-y-8">
              
              {/* Step Header */}
              <div>
                <div className="flex items-center space-x-3 sm:space-x-4 mb-3 sm:mb-4">
                  <div className={`p-3 sm:p-4 rounded-2xl ${currentScheme.bg} shadow-lg ${currentScheme.glow}`}>
                    <currentStep.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <div>
                    <p className={`${currentScheme.accent} font-semibold text-sm sm:text-base uppercase tracking-wide`}>
                      {currentStep.subtitle}
                    </p>
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                      {currentStep.title}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                {currentStep.description}
              </p>

              {/* Features List */}
              <div className="space-y-3 sm:space-y-4">
                {currentStep.features.map((feature, index) => (
                  <div 
                    key={index}
                    className={`
                      flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 rounded-xl
                      bg-gradient-to-r ${currentScheme.secondary}
                      border ${currentScheme.border}
                      transform transition-all duration-300 delay-${index * 100}
                      ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}
                    `}
                  >
                    <CheckCircle className={`w-5 h-5 sm:w-6 sm:h-6 ${currentScheme.accent} flex-shrink-0`} />
                    <span className="text-gray-700 font-medium text-sm sm:text-base">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <button className={`
                flex items-center space-x-2 sm:space-x-3 px-6 py-3 sm:px-8 sm:py-4
                bg-gradient-to-r ${currentScheme.primary}
                text-white font-semibold rounded-2xl
                shadow-lg hover:shadow-xl ${currentScheme.glow}
                transform hover:scale-105 transition-all duration-300
                text-sm sm:text-base
              `}>
                <span>Experience This Step</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>

          {/* Right Side - Visual */}
          <div className={`transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}`}>
            
            {/* Image Container */}
            <div className="relative">
              
              {/* Background Card */}
              <div className={`
                bg-gradient-to-br ${currentScheme.secondary}
                rounded-3xl sm:rounded-4xl p-6 sm:p-8 lg:p-12
                border-2 ${currentScheme.border}
                shadow-2xl ${currentScheme.glow}
                transform transition-all duration-500
                ${isVisible ? 'scale-100 rotate-0' : 'scale-95 rotate-1'}
                min-h-[300px] sm:min-h-[400px] lg:min-h-[500px]
                flex items-center justify-center
              `}>
                
                {/* Animated Placeholder */}
                <div className="text-center space-y-4 sm:space-y-6">
                  
                  {/* Icon Animation */}
                  <div className={`
                    w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 mx-auto
                    bg-gradient-to-r ${currentScheme.primary}
                    rounded-3xl flex items-center justify-center
                    shadow-lg ${currentScheme.glow}
                    animate-pulse
                  `}>
                    <currentStep.icon className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 text-white" />
                  </div>

                  {/* Placeholder Text */}
                  <div className="space-y-2 sm:space-y-3">
                    <div className={`h-3 sm:h-4 bg-gradient-to-r ${currentScheme.primary} rounded-full mx-auto opacity-60`} style={{width: '80%'}} />
                    <div className={`h-2 sm:h-3 bg-gradient-to-r ${currentScheme.primary} rounded-full mx-auto opacity-40`} style={{width: '60%'}} />
                    <div className={`h-2 sm:h-3 bg-gradient-to-r ${currentScheme.primary} rounded-full mx-auto opacity-30`} style={{width: '70%'}} />
                  </div>

                  {/* Image Instruction */}
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-gray-200">
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                      <strong>Image needed:</strong> {currentStep.imagePlaceholder}
                    </p>
                    <p className="text-gray-500 text-xs mt-2">
                      Place as: <code className="bg-gray-100 px-2 py-1 rounded text-xs">src/assets/{currentStep.id}.png</code>
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full animate-bounce opacity-60" />
              <div className="absolute -bottom-4 -left-4 w-6 h-6 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full animate-pulse opacity-40" />
            </div>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center mt-12 sm:mt-16 lg:mt-20">
          <div className="flex space-x-2 sm:space-x-3">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`
                  h-2 sm:h-3 rounded-full transition-all duration-500
                  ${activeStep === index ? 'w-8 sm:w-12 bg-gradient-to-r ' + currentScheme.primary : 'w-2 sm:w-3 bg-gray-300'}
                `}
              />
            ))}
          </div>
        </div>

        {/* Bottom CTA Section */}
        <div className={`
          text-center mt-12 sm:mt-16 lg:mt-20 p-6 sm:p-8 lg:p-12
          bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl
          transform transition-all duration-1000 delay-700
          ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
        `}>
          <div className="flex items-center justify-center mb-4 sm:mb-6">
            <Target className="w-6 h-6 sm:w-8 sm:h-8 text-white mr-3" />
            <span className="text-white font-semibold text-sm sm:text-base uppercase tracking-wider">
              Ready to Start?
            </span>
          </div>
          
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6">
            Transform Your Impact Today
          </h3>
          
          <p className="text-gray-300 text-base sm:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto">
            Join thousands who've already reduced their carbon footprint with CarbonWise's intelligent tracking and personalized recommendations.
          </p>
          
          <button className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-8 py-4 sm:px-10 sm:py-5 rounded-2xl font-bold text-base sm:text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
            Start Your Carbon Journey
          </button>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default ToolExplanation;