// src/components/SecondaryHero.jsx
import React from 'react';

const features = [
  {
    title: 'Fast Performance',
    desc: 'Optimized code for fast load times and smooth interaction.',
  },
  {
    title: 'Modern UI',
    desc: 'Clean, minimal design powered by Tailwind CSS.',
  },
  {
    title: 'Developer Friendly',
    desc: 'Easily extensible codebase for teams and solo devs.',
  },
];

const SecondaryHero = () => {
  return (
    <section className="bg-white py-16 px-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Features</h2>
        <p className="text-gray-600">Everything you need to build great apps</p>
      </div>
      <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {features.map((feature, idx) => (
          <div key={idx} className="p-6 border rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-2xl font-semibold text-blue-600">{feature.title}</h3>
            <p className="mt-2 text-gray-600">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SecondaryHero;
