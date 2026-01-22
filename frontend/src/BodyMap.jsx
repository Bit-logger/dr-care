import React, { useState } from 'react';

const BodyMap = ({ onPartClick }) => {
  const [hoveredPart, setHoveredPart] = useState(null);

  // Helper to handle clicks
  const handleClick = (part) => {
    onPartClick(part);
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      
      {/* Tooltip Label */}
      <div className="absolute top-4 font-bold text-teal-600 text-lg transition-opacity duration-300">
        {hoveredPart ? hoveredPart : "Select an Area"}
      </div>

      <svg 
        viewBox="0 0 200 400" 
        className="h-80 w-auto drop-shadow-xl"
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2"
      >
        {/* --- HEAD --- */}
        <path
          d="M100 20 Q120 20 120 50 Q120 80 100 80 Q80 80 80 50 Q80 20 100 20 Z"
          className="cursor-pointer transition-all duration-300 hover:fill-teal-100 fill-white text-slate-400 hover:text-teal-500"
          onMouseEnter={() => setHoveredPart("Head / Face")}
          onMouseLeave={() => setHoveredPart(null)}
          onClick={() => handleClick("Head")}
        />

        {/* --- CHEST --- */}
        <path
          d="M80 80 L120 80 L130 150 L70 150 Z"
          className="cursor-pointer transition-all duration-300 hover:fill-teal-100 fill-white text-slate-400 hover:text-teal-500"
          onMouseEnter={() => setHoveredPart("Chest / Heart / Lungs")}
          onMouseLeave={() => setHoveredPart(null)}
          onClick={() => handleClick("Chest")}
        />

        {/* --- STOMACH (ABDOMEN) --- */}
        <path
          d="M70 150 L130 150 L120 220 L80 220 Z"
          className="cursor-pointer transition-all duration-300 hover:fill-teal-100 fill-white text-slate-400 hover:text-teal-500"
          onMouseEnter={() => setHoveredPart("Stomach / Abdomen")}
          onMouseLeave={() => setHoveredPart(null)}
          onClick={() => handleClick("Stomach")}
        />

        {/* --- LEFT ARM --- */}
        <path
          d="M70 85 L50 120 L40 110 L65 80 Z"
          className="cursor-pointer transition-all duration-300 hover:fill-teal-100 fill-white text-slate-400 hover:text-teal-500"
          onMouseEnter={() => setHoveredPart("Right Arm")}
          onMouseLeave={() => setHoveredPart(null)}
          onClick={() => handleClick("Right Arm")}
        />
        <path
          d="M50 120 L30 180 L40 185 L60 125 Z"
          className="cursor-pointer transition-all duration-300 hover:fill-teal-100 fill-white text-slate-400 hover:text-teal-500"
          onMouseEnter={() => setHoveredPart("Right Arm")}
          onMouseLeave={() => setHoveredPart(null)}
          onClick={() => handleClick("Right Arm")}
        />

        {/* --- RIGHT ARM --- */}
        <path
          d="M130 85 L150 120 L160 110 L135 80 Z"
          className="cursor-pointer transition-all duration-300 hover:fill-teal-100 fill-white text-slate-400 hover:text-teal-500"
          onMouseEnter={() => setHoveredPart("Left Arm")}
          onMouseLeave={() => setHoveredPart(null)}
          onClick={() => handleClick("Left Arm")}
        />
         <path
          d="M150 120 L170 180 L160 185 L140 125 Z"
          className="cursor-pointer transition-all duration-300 hover:fill-teal-100 fill-white text-slate-400 hover:text-teal-500"
          onMouseEnter={() => setHoveredPart("Left Arm")}
          onMouseLeave={() => setHoveredPart(null)}
          onClick={() => handleClick("Left Arm")}
        />

        {/* --- LEGS --- */}
        <path
          d="M80 220 L100 220 L100 350 L85 350 Z"
          className="cursor-pointer transition-all duration-300 hover:fill-teal-100 fill-white text-slate-400 hover:text-teal-500"
          onMouseEnter={() => setHoveredPart("Legs")}
          onMouseLeave={() => setHoveredPart(null)}
          onClick={() => handleClick("Legs")}
        />
        <path
          d="M100 220 L120 220 L115 350 L100 350 Z"
          className="cursor-pointer transition-all duration-300 hover:fill-teal-100 fill-white text-slate-400 hover:text-teal-500"
          onMouseEnter={() => setHoveredPart("Legs")}
          onMouseLeave={() => setHoveredPart(null)}
          onClick={() => handleClick("Legs")}
        />
      </svg>
      
      {/* 3D Platform Effect */}
      <div className="absolute bottom-10 w-32 h-8 bg-slate-200/50 rounded-[100%] blur-sm -z-10"></div>
    </div>
  );
};

export default BodyMap;