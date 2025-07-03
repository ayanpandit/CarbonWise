import React, { useState, useEffect } from 'react';
import bg22 from '../assets/images/bg22.jpg';
import bg22mobile from '../assets/images/bg22mobile.jpg';

const SubscribeCTA = () => {
  const [email, setEmail] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

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

  const handleSubmit = () => {
    if (email) {
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 3000);
      setEmail('');
    }
  };

  const FloatingShape = ({ delay, size, position }) => (
    <div
      className={`absolute ${size} ${position} rounded-full opacity-20 animate-pulse`}
      style={{
        background: 'linear-gradient(135deg, #10b981, #34d399)',
        animationDelay: `${delay}s`,
        animationDuration: '4s'
      }}
    />
  );

  const ParticleEffect = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-emerald-400 rounded-full opacity-30 animate-bounce"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${2 + Math.random() * 3}s`
          }}
        />
      ))}
    </div>
  );

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden z-20"
      style={{
        backgroundImage: `url(${isMobile ? bg22mobile : bg22})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'scroll'
      }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <FloatingShape delay={0} size="w-64 h-64" position="top-10 left-10" />
        <FloatingShape delay={1} size="w-48 h-48" position="top-1/3 right-20" />
        <FloatingShape delay={2} size="w-32 h-32" position="bottom-20 left-1/4" />
        <FloatingShape delay={0.5} size="w-40 h-40" position="bottom-1/3 right-10" />
      </div>

      {/* Particle Effect */}
      <ParticleEffect />

      {/* Dynamic Gradient Orb */}
      <div 
        className="absolute w-96 h-96 rounded-full opacity-10 blur-3xl transition-all duration-1000 ease-out"
        style={{
          background: 'radial-gradient(circle, #10b981, #34d399, #6ee7b7)',
          transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
        }}
      />

      {/* Main Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Glassmorphic Card */}
        <div 
          className={`relative backdrop-blur-xl bg-white/30 border border-white/40 rounded-3xl p-12 shadow-2xl transition-all duration-700 ease-out ${
            isHovered ? 'transform scale-105 shadow-3xl bg-white/40' : ''
          }`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Animated Border Glow */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-emerald-400 via-teal-400 to-green-400 opacity-20 blur-sm animate-pulse" />
          
          {/* Success Animation Overlay */}
          {isSubmitted && (
            <div className="absolute inset-0 rounded-3xl bg-emerald-500/20 animate-ping" />
          )}

          {/* Content */}
          <div className="relative z-10">
            {/* Decorative Icon */}
            <div className="mx-auto w-20 h-20 mb-8 relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 animate-spin-slow opacity-80" />
              <div className="absolute inset-2 rounded-full bg-white flex items-center justify-center">
                <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>

            {/* Main Headline */}
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-slate-800 via-emerald-600 to-teal-700 leading-tight">
              Ready to Know Your
              <span className="block text-emerald-600 animate-pulse">Exact Footprint?</span>
            </h2>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              Join our early list and be the first to use 
              <span className="font-semibold text-emerald-700"> CarbonWise </span>
              when we launch.
            </p>

            {/* Email Form */}
            <div className="max-w-md mx-auto mb-8">
              <div className="relative group">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="w-full px-6 py-4 text-lg rounded-2xl border-2 border-emerald-200 bg-white/50 backdrop-blur-sm focus:border-emerald-400 focus:bg-white/70 transition-all duration-300 outline-none placeholder-slate-400"
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-400 opacity-0 group-focus-within:opacity-20 transition-opacity duration-300 pointer-events-none" />
              </div>
              
              <button
                onClick={handleSubmit}
                className={`mt-6 w-full py-4 px-8 text-lg font-semibold rounded-2xl text-white transition-all duration-500 transform ${
                  isSubmitted 
                    ? 'bg-green-500 scale-110' 
                    : 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 hover:scale-105 hover:shadow-2xl'
                } active:scale-95 shadow-lg`}
                disabled={isSubmitted}
              >
                {isSubmitted ? (
                  <div className="flex items-center justify-center gap-2">
                    <svg className="w-6 h-6 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Thank You!
                  </div>
                ) : (
                  'Notify Me'
                )}
              </button>
            </div>

            {/* Trust Message */}
            <p className="text-sm text-slate-500 italic">
              We promise no spam — just smarter, greener living. 🌱
            </p>

            {/* Animated Counter */}
            <div className="mt-8 flex items-center justify-center gap-4 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span>1,247+ early subscribers</span>
              </div>
              <div className="w-1 h-4 bg-slate-300" />
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                <span>Launching Q2 2025</span>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Call-to-Action Elements */}
        <div className="absolute -top-10 -left-10 w-20 h-20 bg-emerald-200 rounded-full opacity-60 animate-bounce" style={{ animationDelay: '1s' }} />
        <div className="absolute -bottom-5 -right-5 w-16 h-16 bg-teal-200 rounded-full opacity-60 animate-bounce" style={{ animationDelay: '2s' }} />
      </div>

      {/* Bottom Wave Decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-20 fill-emerald-100 opacity-50">
          <path d="M0,0 C300,60 600,60 900,30 C1050,10 1150,40 1200,20 L1200,120 L0,120 Z">
            <animate attributeName="d" dur="10s" repeatCount="indefinite" 
              values="M0,0 C300,60 600,60 900,30 C1050,10 1150,40 1200,20 L1200,120 L0,120 Z;
                      M0,0 C300,30 600,90 900,60 C1050,40 1150,10 1200,50 L1200,120 L0,120 Z;
                      M0,0 C300,60 600,60 900,30 C1050,10 1150,40 1200,20 L1200,120 L0,120 Z"/>
          </path>
        </svg>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default SubscribeCTA;