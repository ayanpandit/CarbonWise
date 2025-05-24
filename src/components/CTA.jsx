import React from 'react';

const CTA = () => {
  return (
    <section className="bg-cyan-600 text-white py-20 px-6 text-center">
      <h2 className="text-4xl font-bold mb-6">Ready to Go Green?</h2>
      <p className="text-lg mb-8">Join CarbonWise today and make sustainability your superpower.</p>
      <a href="/signup" className="bg-white text-cyan-700 font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 transition">
        Join Now
      </a>
    </section>
  );
};

export default CTA;
