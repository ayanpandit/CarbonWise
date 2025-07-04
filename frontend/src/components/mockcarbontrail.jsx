import React, { useState, useEffect } from 'react';
import bg22 from '../assets/images/bg22.svg';
import bg22mobile from '../assets/images/bg22mobile.svg';

const MockCarbonTrail = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [animatedValues, setAnimatedValues] = useState({});
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        setIsVisible(true);
        // Animate numbers counting up
        const timer = setTimeout(() => {
            setAnimatedValues({
                streaming: 3.2,
                delivery: 4.1,
                ac: 5.8,
                plastic: 1.7,
                transport: 1.6
            });
        }, 500);
        
        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', checkMobile);
        };
    }, []);

    const activities = [
        {
            id: 'streaming',
            name: 'Video Streaming',
            value: 3.2,
            icon: '/assets/streaming.png',
            tip: 'Try SD instead of HD to save 1.4kg',
            color: 'from-purple-400/20 to-pink-400/20',
            borderColor: 'border-purple-200/30'
        },
        {
            id: 'delivery',
            name: 'Food Delivery',
            value: 4.1,
            icon: '/assets/food-delivery.png',
            tip: 'Walking to nearby restaurants saves 2.8kg',
            color: 'from-orange-400/20 to-red-400/20',
            borderColor: 'border-orange-200/30'
        },
        {
            id: 'ac',
            name: 'Air Conditioning',
            value: 5.8,
            icon: '/assets/ac.png',
            tip: 'Raise temp by 2°C to save 3.1kg daily',
            color: 'from-blue-400/20 to-cyan-400/20',
            borderColor: 'border-blue-200/30'
        },
        {
            id: 'plastic',
            name: 'Plastic Usage',
            value: 1.7,
            icon: '/assets/plastic.png',
            tip: 'Reusable bottles reduce 1.2kg weekly',
            color: 'from-green-400/20 to-emerald-400/20',
            borderColor: 'border-green-200/30'
        },
        {
            id: 'transport',
            name: 'Short Distance Travel',
            value: 1.6,
            icon: '/assets/transport.png',
            tip: 'Cycling saves 1.4kg per trip',
            color: 'from-yellow-400/20 to-amber-400/20',
            borderColor: 'border-yellow-200/30'
        }
    ];

    const totalEmissions = activities.reduce((sum, activity) => sum + activity.value, 0);

    const CountingNumber = ({ value, delay = 0 }) => {
        const [count, setCount] = useState(0);

        useEffect(() => {
            const timer = setTimeout(() => {
                let start = 0;
                const end = value;
                const duration = 1500;
                const increment = end / (duration / 16);

                const counter = setInterval(() => {
                    start += increment;
                    if (start >= end) {
                        setCount(end);
                        clearInterval(counter);
                    } else {
                        setCount(start);
                    }
                }, 16);

                return () => clearInterval(counter);
            }, delay);

            return () => clearTimeout(timer);
        }, [value, delay]);

        return count.toFixed(1);
    };

    return (
        <section 
            className="relative min-h-screen py-20 px-4 overflow-hidden z-20"
            style={{
                backgroundImage: `url(${isMobile ? bg22mobile : bg22})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundAttachment: 'scroll'
            }}
        >
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
                <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-green-200/20 to-blue-200/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-purple-200/20 to-pink-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-yellow-200/20 to-orange-200/20 rounded-full blur-3xl animate-pulse delay-500"></div>
            </div>

            <div className="relative max-w-7xl mx-auto">
                {/* Header Section */}
                <div className={`text-center mb-16 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    <div className="inline-flex items-center gap-3 mb-6 px-6 py-3 bg-white/60 backdrop-blur-xl rounded-full border border-white/20 shadow-lg">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium text-slate-700">Live Carbon Tracking</span>
                    </div>

                    <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-lg"
                        style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                        Your Personal
                        <br />
                        <span className="text-4xl md:text-5xl text-emerald-300">Carbon Trail</span>
                    </h2>

                    <p className="text-xl text-white max-w-3xl mx-auto leading-relaxed drop-shadow-md"
                        style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.7)' }}>
                        Here's how your daily habits could be contributing to carbon emissions.
                        <br />
                        <span className="font-semibold text-emerald-300">Imagine this as your footprint — personalized by CarbonWise.</span>
                    </p>
                </div>

                {/* Activity Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-12">
                    {activities.map((activity, index) => (
                        <div
                            key={activity.id}
                            className={`group relative transform transition-all duration-700 hover:scale-105 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                                }`}
                            style={{ transitionDelay: `${index * 150}ms` }}
                        >
                            {/* Card */}
                            <div className={`relative p-6 bg-gradient-to-br ${activity.color} backdrop-blur-xl rounded-3xl border ${activity.borderColor} shadow-xl hover:shadow-2xl transition-all duration-500 h-full`}>
                                {/* Glow Effect */}
                                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                {/* Icon */}
                                <div className="relative mb-4 flex justify-center">
                                    <div className="w-16 h-16 bg-white/50 backdrop-blur-xl rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                        <img
                                            src={activity.icon}
                                            alt={activity.name}
                                            className="w-10 h-10 object-contain"
                                            onError={(e) => {
                                                e.target.style.display = 'none';
                                                e.target.nextSibling.style.display = 'block';
                                            }}
                                        />
                                        <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg hidden"></div>
                                    </div>
                                </div>

                                {/* Activity Name */}
                                <h3 className="text-lg font-semibold text-slate-800 mb-3 text-center">
                                    {activity.name}
                                </h3>

                                {/* Carbon Value */}
                                <div className="text-center mb-4">
                                    <div className="text-3xl font-bold text-slate-800 mb-1">
                                        <CountingNumber value={activity.value} delay={index * 200} />
                                        <span className="text-sm font-normal text-slate-600 ml-1">kg CO₂</span>
                                    </div>
                                    <div className="w-full bg-white/30 rounded-full h-2 overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all duration-1000 ease-out"
                                            style={{
                                                width: isVisible ? `${(activity.value / 6) * 100}%` : '0%',
                                                transitionDelay: `${500 + index * 100}ms`
                                            }}
                                        ></div>
                                    </div>
                                </div>

                                {/* Tip */}
                                <div className="bg-white/50 backdrop-blur-sm rounded-xl p-3 text-sm text-slate-700 text-center border border-white/20">
                                    <span className="font-medium text-green-600">💡 Tip:</span>
                                    <br />
                                    {activity.tip}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Summary Block */}
                <div className={`relative max-w-2xl mx-auto transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`} style={{ transitionDelay: '800ms' }}>
                    <div className="relative p-8 bg-gradient-to-br from-white/60 to-white/40 backdrop-blur-xl rounded-3xl border border-white/30 shadow-2xl">
                        {/* Decorative Elements */}
                        <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full animate-bounce delay-1000"></div>
                        <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full animate-bounce delay-1500"></div>

                        <div className="text-center">
                            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-gradient-to-r from-green-100 to-blue-100 rounded-full">
                                <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-blue-500 rounded-full animate-pulse"></div>
                                <span className="text-sm font-medium text-slate-700">Daily Summary</span>
                            </div>

                            <h3 className="text-2xl font-semibold text-slate-800 mb-4">
                                Total:
                                <span className="text-4xl font-bold text-green-600 ml-2">
                                    <CountingNumber value={totalEmissions} delay={1000} />
                                </span>

                                <span className="text-lg text-slate-600 ml-1">kg CO₂ today</span>
                            </h3>

                            <div className="w-full bg-gradient-to-r from-green-100 to-blue-100 rounded-full h-3 mb-4 overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-green-400 via-green-500 to-blue-500 rounded-full transition-all duration-2000 ease-out relative"
                                    style={{
                                        width: isVisible ? '75%' : '0%',
                                        transitionDelay: '1200ms'
                                    }}
                                >
                                    <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                                </div>
                            </div>

                            <p className="text-lg text-slate-700 leading-relaxed">
                                <span className="font-semibold text-green-600">That's okay</span> — we'll help you reduce it
                                <span className="font-semibold text-blue-600"> step by step</span>.
                                <br />
                                <span className="text-base text-slate-600">Small changes can make a big difference! 🌱</span>
                            </p>

                            <div className="mt-6 flex justify-center">
                                <button className="group px-8 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 transform">
                                    <span className="mr-2">Start Reducing Now</span>
                                    <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Floating Particles */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(6)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-2 h-2 bg-green-400/30 rounded-full animate-pulse"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${3 + Math.random() * 2}s`
                        }}
                    ></div>
                ))}
            </div>
        </section>
    );
};

export default MockCarbonTrail;