import React, { useState, useEffect, useCallback, useMemo } from 'react';
import './App.css';
import PrimaryHero from './components/primaryhero';
import Secondaryhero from './components/secondaryhero';
import Navbar from './components/navbar';

function App() {
  const [currentSection, setCurrentSection] = useState(0); // 0 = primary, 1 = secondary
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Optimized transition handler with debouncing
  const handleTransition = useCallback((newSection) => {
    if (isTransitioning || newSection === currentSection) return;
    
    setIsTransitioning(true);
    setCurrentSection(newSection);
    
    // Use requestAnimationFrame for smoother transitions
    requestAnimationFrame(() => {
      setTimeout(() => {
        setIsTransitioning(false);
      }, 800); // Reduced from 1000ms
    });
  }, [currentSection, isTransitioning]);

  // Optimized scroll handler with throttling
  useEffect(() => {
    let lastScrollTime = 0;
    let ticking = false;
    
    const handleWheel = (e) => {
      // If we're in SecondaryHero, check scroll position to decide whether to transition
      if (currentSection === 1) {
        const secondaryContainer = document.querySelector('[data-section="secondary"]');
        if (secondaryContainer) {
          const { scrollTop } = secondaryContainer;
          
          // Only prevent default and transition if we're at the top and scrolling up
          if (e.deltaY < 0 && scrollTop <= 5) { // Small threshold for better UX
            e.preventDefault();
            const now = Date.now();
            if (now - lastScrollTime < 150) return; // Slightly increased threshold
            lastScrollTime = now;
            
            if (!ticking) {
              requestAnimationFrame(() => {
                if (!isTransitioning) {
                  handleTransition(0);
                }
                ticking = false;
              });
              ticking = true;
            }
          }
          // Allow normal scrolling otherwise
          return;
        }
      }
      
      // For PrimaryHero, prevent default scroll and handle transitions
      if (currentSection === 0) {
        e.preventDefault();
        
        const now = Date.now();
        if (now - lastScrollTime < 150) return; // Increased threshold
        lastScrollTime = now;
        
        if (!ticking) {
          requestAnimationFrame(() => {
            if (isTransitioning) {
              ticking = false;
              return;
            }
            
            if (e.deltaY > 0) {
              handleTransition(1);
            }
            
            ticking = false;
          });
          ticking = true;
        }
      }
    };

    const handleKeyDown = (e) => {
      if (isTransitioning) return;
      
      if (e.key === 'ArrowDown' && currentSection === 0) {
        handleTransition(1);
      } else if (e.key === 'ArrowUp' && currentSection === 1) {
        handleTransition(0);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentSection, isTransitioning, handleTransition]);

  // Memoize transition styles for performance
  const primaryStyles = useMemo(() => ({
    opacity: currentSection === 0 ? 1 : 0,
    transform: currentSection === 0 
      ? 'translate3d(0, 0, 0) scale3d(1, 1, 1)' 
      : 'translate3d(0, -50%, 0) scale3d(0.95, 0.95, 1)',
    pointerEvents: currentSection === 0 ? 'auto' : 'none',
    willChange: 'transform, opacity',
  }), [currentSection]);

  const secondaryStyles = useMemo(() => ({
    opacity: currentSection === 1 ? 1 : 0,
    transform: currentSection === 1 
      ? 'translate3d(0, 0, 0) scale3d(1, 1, 1)' 
      : 'translate3d(0, 50%, 0) scale3d(0.95, 0.95, 1)',
    pointerEvents: currentSection === 1 ? 'auto' : 'none',
    willChange: 'transform, opacity',
  }), [currentSection]);

  return (
    <div className="App overflow-hidden h-screen relative" style={{ contain: 'layout style paint' }}>
      {/* Navbar - Only show when on secondary section */}
      {currentSection === 1 && (
        <Navbar 
          isScrolled={true} 
          contentOpacity={1}
        />
      )}

      {/* Primary Hero - GPU Accelerated */}
      <div 
        className="absolute inset-0 transition-all duration-700 ease-out"
        style={primaryStyles}
      >
        <div style={{ height: '100vh', transform: 'translateZ(0)' }}>
          <PrimaryHero />
        </div>
      </div>

      {/* Secondary Hero - GPU Accelerated with Scrollable Content */}
      <div 
        className="absolute inset-0 transition-all duration-700 ease-out"
        style={secondaryStyles}
        data-section="secondary"
      >
        <div style={{ 
          height: '100vh', 
          transform: 'translateZ(0)',
          overflowY: currentSection === 1 ? 'auto' : 'hidden',
          paddingTop: currentSection === 1 ? '80px' : '0', // Account for navbar height
          paddingBottom: currentSection === 1 ? '40px' : '0', // Add bottom padding for content
          boxSizing: 'border-box'
        }}>
          <Secondaryhero />
        </div>
      </div>

      {/* Optimized Section Indicators */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 space-y-3" style={{ contain: 'layout' }}>
        {[0, 1].map((index) => (
          <button
            key={index}
            onClick={() => handleTransition(index)}
            className="block w-3 h-3 rounded-full border-2 border-gray-300 transition-all duration-300 hover:scale-125"
            style={{
              backgroundColor: currentSection === index ? 'rgb(209, 213, 219)' : 'transparent', // gray-300
              borderColor: currentSection === index ? 'rgb(209, 213, 219)' : 'rgba(209, 213, 219, 0.7)',
              boxShadow: currentSection === index ? '0 0 10px rgba(209, 213, 219, 0.5)' : 'none',
              transform: 'translateZ(0)',
            }}
          />
        ))}
      </div>

      {/* Optimized Scroll Hints */}
      {currentSection === 0 && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 text-gray-300 text-sm animate-bounce" style={{ contain: 'layout' }}>
          Scroll down or use ↓ arrow key
        </div>
      )}
      
      {currentSection === 1 && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 text-gray-300 text-sm animate-bounce" style={{ contain: 'layout' }}>
          Scroll up or use ↑ arrow key
        </div>
      )}
    </div>
  );
}

export default App;