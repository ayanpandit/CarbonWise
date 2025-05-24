// src/components/Hero.jsx

import React from "react";

const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 px-6 md:px-12 lg:px-24 text-center">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
          Welcome to Carbonwise
        </h1>
        <p className="text-lg md:text-xl mb-8">
          Reduce your carbon footprint with smart solutions.
        </p>
        <button className="bg-white text-indigo-700 font-semibold px-6 py-3 rounded-md shadow-md hover:bg-gray-100 transition">
          Get Started
        </button>
      </div>
    </section>
  );
};

export default Hero;
