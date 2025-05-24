import { useState, useRef, useEffect } from "react";
import CustomScrollbarThumb from "./CustomScrollbarThumb";

const CustomScrollbar = ({ children }) => {
  const containerRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
        const scrollPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100;
        setScrollPosition(scrollPercentage);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <div className="custom-scrollbar scroll-container" ref={containerRef}>
      <CustomScrollbarThumb scrollPosition={scrollPosition} />
      {children}
    </div>
  );
};

export default CustomScrollbar;
