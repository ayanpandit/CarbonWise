import React from 'react';

const features = [
  { title: 'AI Carbon Tracking', description: 'Real-time analytics and intelligent tracking of carbon emissions.', icon: '🌿' },
  { title: 'Sustainable Insights', description: 'Smart recommendations for greener decisions.', icon: '💡' },
  { title: 'Enterprise Dashboard', description: 'Monitor, analyze, and report emissions across teams.', icon: '📊' },
];

const Features = () => {
  return (
    <section id="features" className="bg-black py-20 px-6 text-white">

      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">Core Features</h2>
        <div className="grid md:grid-cols-3 gap-10">
          {features.map((feat, index) => (
            <div key={index} className="bg-gray-100 rounded-2xl p-8 shadow-lg hover:shadow-xl transition">
              <div className="text-4xl mb-4">{feat.icon}</div>
              <h3 className="text-2xl font-semibold mb-2">{feat.title}</h3>
              <p className="text-gray-700">{feat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
