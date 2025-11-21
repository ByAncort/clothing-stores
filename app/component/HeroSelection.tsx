import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = ({
  title = "URBAN LEGENDS",
  subtitle = "ELEVATE YOUR STREETWEAR GAME",
  videoSrc = "/videoplayback.webm"
}) => {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/40 z-10 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60 z-10"></div>
        <video
          className="w-full h-full object-cover scale-105 animate-slow-zoom"
          autoPlay
          muted
          loop
          playsInline
          src={videoSrc}
        />
      </div>

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8">
        <h1 className="font-oswald text-6xl md:text-8xl lg:text-9xl font-bold text-white tracking-tighter mb-6 animate-slide-in uppercase">
          {title}
        </h1>
        <p className="font-sans text-lg md:text-2xl text-gray-200 mb-10 tracking-widest uppercase max-w-2xl mx-auto">
          {subtitle}
        </p>

        <div className="flex flex-col sm:flex-row gap-6">
          <Link
            to="/catalog"
            className="group relative px-8 py-4 bg-white text-black font-oswald font-bold text-xl uppercase tracking-wider overflow-hidden hover:text-white transition-colors duration-300"
          >
            <span className="relative z-10">Shop Collection</span>
            <div className="absolute inset-0 bg-black transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-out"></div>
          </Link>
          <Link
            to="/contacto"
            className="group relative px-8 py-4 border-2 border-white text-white font-oswald font-bold text-xl uppercase tracking-wider overflow-hidden hover:text-black transition-colors duration-300"
          >
            <span className="relative z-10">Contact Us</span>
            <div className="absolute inset-0 bg-white transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-out"></div>
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;