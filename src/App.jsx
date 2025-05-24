
import "./App.css";
import HeroSection from "./components/Hero";
import Features from "./components/Features";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

import CustomScrollbar from "./components/CustomScrollbar";

function App() {
  return (
    <CustomScrollbar>
      <HeroSection />
      <Features />
      <CTA />
      <Footer />
    </CustomScrollbar>
  );
}
export default App;