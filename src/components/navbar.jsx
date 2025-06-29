import React from 'react';
import { Leaf, Calculator } from 'lucide-react';

const Navbar = ({ isScrolled, contentOpacity }) => {
  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out will-change-transform ${
        isScrolled 
          ? 'bg-transparent backdrop-blur-xl border-b border-white/10 shadow-2xl' 
          : 'bg-transparent'
      }`}
      style={{ 
        opacity: contentOpacity,
        transform: `translate3d(0, ${isScrolled ? '0' : '-100%'}, 0)` 
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Section */}
          <div className="flex items-center space-x-3 group">
            <div className="relative">
              {/* Animated logo background */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full blur-sm opacity-50 group-hover:opacity-75 transition-opacity duration-300 animate-pulse-glow"></div>
              <div className="relative bg-gradient-to-br from-green-400 to-emerald-600 p-2 rounded-full shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                <Leaf className="h-8 w-8 text-white animate-wave" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold bg-gradient-to-r from-gray-100 to-green-100 bg-clip-text text-transparent tracking-tight">
                CarbonWise
              </span>
              <span className="text-xs text-green-300/80 font-medium -mt-1 hidden sm:block">
                Carbon Calculator
              </span>
            </div>
          </div>

          {/* Center Navigation Links - Desktop */}
          <div className="hidden lg:flex items-center justify-center flex-1">
            <div className="flex items-center space-x-1 bg-white/5 backdrop-blur-md rounded-full p-2 border border-white/10">
              {[
                { name: 'Calculator', href: '#calculator' },
                { name: 'About', href: '#about' },
                { name: 'Impact', href: '#impact' },
                { name: 'Contact', href: '#contact' }
              ].map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="relative px-6 py-3 text-gray-200 hover:text-gray-100 font-medium text-sm transition-all duration-300 rounded-full group overflow-hidden"
                >
                  {/* Hover background effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-300 origin-center"></div>
                  <div className="absolute inset-0 bg-white/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative z-10">{item.name}</span>
                  
                  {/* Active indicator dot */}
                  <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-green-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </a>
              ))}
            </div>
          </div>

          {/* Right Section - CTA Button & Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* CTA Button */}
            <button className="hidden sm:flex items-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-gray-100 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl group relative overflow-hidden">
              {/* Button shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <Calculator className="h-4 w-4 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
              <span className="relative z-10">Get Started</span>
            </button>

            {/* Mobile Menu Button */}
            <button className="lg:hidden relative w-10 h-10 bg-white/10 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center group hover:bg-white/20 transition-all duration-300">
              <div className="space-y-1.5">
                <div className="w-5 h-0.5 bg-gray-200 rounded-full group-hover:bg-green-300 transition-colors duration-300"></div>
                <div className="w-5 h-0.5 bg-gray-200 rounded-full group-hover:bg-green-300 transition-colors duration-300"></div>
                <div className="w-5 h-0.5 bg-gray-200 rounded-full group-hover:bg-green-300 transition-colors duration-300"></div>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div className="lg:hidden absolute top-full left-0 right-0 bg-transparent backdrop-blur-xl border-b border-white/10 transform -translate-y-full opacity-0 pointer-events-none transition-all duration-300">
          <div className="px-4 py-6 space-y-4">
            {[
              { name: 'Calculator', href: '#calculator' },
              { name: 'About', href: '#about' },
              { name: 'Impact', href: '#impact' },
              { name: 'Contact', href: '#contact' }
            ].map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="block px-4 py-3 text-gray-200 hover:text-gray-100 font-medium rounded-lg hover:bg-white/10 transition-all duration-300 border border-transparent hover:border-green-400/30"
              >
                {item.name}
              </a>
            ))}
            
            {/* Mobile CTA */}
            <div className="pt-4 border-t border-white/10">
              <button className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-600 text-gray-100 px-6 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105">
                <Calculator className="h-5 w-5" />
                <span>Get Started</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
