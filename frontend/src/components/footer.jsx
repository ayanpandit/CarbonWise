import React, { useState, useEffect } from 'react';

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [carbonSaved, setCarbonSaved] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );

    const footerElement = document.querySelector('#carbon-footer');
    if (footerElement) observer.observe(footerElement);

    // Animate carbon counter
    const interval = setInterval(() => {
      setCarbonSaved(prev => prev < 12.5 ? prev + 0.1 : 12.5);
    }, 50);

    return () => {
      clearInterval(interval);
      if (footerElement) observer.unobserve(footerElement);
    };
  }, []);

  const footerLinks = {
    'Learn': ['Carbon Calculator', 'Daily Habits', 'Impact Stories', 'Climate Science'],
    'Take Action': ['Reduce Tips', 'Offset Programs', 'Community Challenges', 'Green Alternatives'],
    'Connect': ['Newsletter', 'Social Impact', 'Partner With Us', 'Contact Support'],
    'Resources': ['Research Papers', 'Data Sources', 'API Access', 'Developer Tools']
  };

  const socialLinks = [
    { name: 'Twitter', icon: '🐦', url: '#', color: 'hover:text-blue-400' },
    { name: 'Instagram', icon: '📸', url: '#', color: 'hover:text-pink-400' },
    { name: 'LinkedIn', icon: '💼', url: '#', color: 'hover:text-blue-600' },
    { name: 'YouTube', icon: '📺', url: '#', color: 'hover:text-red-500' }
  ];

  return (
    <footer 
      id="carbon-footer"
      className="relative text-white overflow-hidden z-20 bg-gradient-to-br from-emerald-900 via-green-800 to-teal-900"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-emerald-400 rounded-full animate-pulse blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-teal-400 rounded-full animate-pulse blur-2xl animation-delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-green-400 rounded-full animate-pulse blur-lg animation-delay-2000"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-emerald-300 rounded-full animate-pulse opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Content */}
        <div className="pt-16 pb-8">
          
          {/* Brand Section with Impact Counter */}
          <div className={`mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="text-center mb-8">
              <div className="inline-flex items-center space-x-3 mb-6">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-2xl">🌱</span>
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-ping"></div>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent">
                  CarbonWise
                </h2>
              </div>
              
              <p className="text-xl md:text-2xl text-emerald-100 mb-8 max-w-3xl mx-auto leading-relaxed">
                Transforming daily habits into climate action, one mindful choice at a time
              </p>

              {/* Impact Counter */}
              <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-emerald-500/30 max-w-md mx-auto">
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-emerald-300 mb-2">
                    {carbonSaved.toFixed(1)}kg CO₂
                  </div>
                  <div className="text-emerald-100 text-sm md:text-base">
                    Saved by our community today
                  </div>
                  <div className="mt-4 h-2 bg-emerald-900 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full transition-all duration-1000"
                      style={{ width: `${(carbonSaved / 12.5) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-16">
            {Object.entries(footerLinks).map(([category, links], index) => (
              <div 
                key={category}
                className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <h3 className="text-xl font-semibold text-emerald-300 mb-6 relative">
                  {category}
                  <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-emerald-400 to-transparent"></div>
                </h3>
                <ul className="space-y-3">
                  {links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a 
                        href="#" 
                        className="text-emerald-100 hover:text-emerald-300 transition-all duration-300 text-sm md:text-base group flex items-center"
                      >
                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                          {link}
                        </span>
                        <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          →
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter Signup */}
          <div className={`mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="bg-gradient-to-r from-emerald-800/50 to-teal-800/50 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-emerald-500/30">
              <div className="max-w-4xl mx-auto text-center">
                <h3 className="text-2xl md:text-3xl font-bold text-emerald-200 mb-4">
                  Join the Carbon-Conscious Community
                </h3>
                <p className="text-emerald-100 mb-8 text-lg">
                  Get weekly insights, tips, and your personalized carbon impact report
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                  <div className="flex-1 relative">
                    <input
                      type="email"
                      placeholder="Your email address"
                      className="w-full px-6 py-4 bg-white/10 border border-emerald-400/30 rounded-xl text-white placeholder-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent backdrop-blur-sm"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-emerald-300">
                      ✉️
                    </div>
                  </div>
                  <button className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Social Links & Bottom Section */}
          <div className="border-t border-emerald-700/50 pt-8">
            <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
              
              {/* Social Links */}
              <div className="flex space-x-6">
                {socialLinks.map((social, index) => (
                  <a
                    key={social.name}
                    href={social.url}
                    className={`w-12 h-12 bg-emerald-800/50 rounded-xl flex items-center justify-center transition-all duration-300 hover:bg-emerald-700/50 ${social.color} hover:scale-110 hover:rotate-12 backdrop-blur-sm border border-emerald-600/30`}
                    title={social.name}
                  >
                    <span className="text-xl">{social.icon}</span>
                  </a>
                ))}
              </div>

              {/* Legal Links */}
              <div className="flex flex-wrap justify-center lg:justify-end items-center space-x-6 text-sm text-emerald-200">
                <a href="#" className="hover:text-emerald-300 transition-colors duration-300">Privacy Policy</a>
                <span className="text-emerald-600">•</span>
                <a href="#" className="hover:text-emerald-300 transition-colors duration-300">Terms of Service</a>
                <span className="text-emerald-600">•</span>
                <a href="#" className="hover:text-emerald-300 transition-colors duration-300">Cookie Policy</a>
              </div>
            </div>

            {/* Copyright */}
            <div className="text-center mt-8 pt-8 border-t border-emerald-800/50">
              <p className="text-emerald-300 text-sm md:text-base">
                © 2025 CarbonWise. Empowering sustainable futures through conscious choices.
              </p>
              <p className="text-emerald-400 text-xs mt-2">
                🌍 Made with love for our planet
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Glowing Bottom Border */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500 opacity-60"></div>
      
      <style jsx>{`
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        @media (max-width: 768px) {
          .text-4xl { font-size: 2.5rem; }
          .text-5xl { font-size: 3rem; }
        }
        
        @media (max-width: 640px) {
          .text-4xl { font-size: 2rem; }
          .text-5xl { font-size: 2.5rem; }
        }
      `}</style>
    </footer>
  );
};

export default Footer;