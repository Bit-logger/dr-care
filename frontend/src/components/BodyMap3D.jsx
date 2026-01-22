import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Html } from '@react-three/drei';

function Model({ onPartClick }) {
  const { scene } = useGLTF('/human_model.glb'); 

  return (
    <primitive 
      object={scene} 
      scale={1.0}   
      position={[0, 0, 0]} 
      onClick={(e) => {
        e.stopPropagation(); 
        onPartClick(e.point); // We pass the full 3D point (x, y, z)
      }} 
    />
  );
}

export default function BodyMap3D({ onReport }) {
  const [selectedPart, setSelectedPart] = useState(null);

  // --- SMART DETECTION LOGIC ---
  const detectBodyPart = (point) => {
    const y = point.y; // Height
    const x = point.x; // Width (Left vs Right)

    // 1. Determine Side (Left or Right)
    // In standard 3D, +X is usually User's Right (Model's Left), but let's label it by screen side
    const side = x < 0 ? "Right" : "Left"; 
    const absX = Math.abs(x); // How far from center?

    // 2. Determine Part based on Height (Y) AND Width (X)
    
    // --- ZONE: HEAD (Height > 6.2) ---
    if (y > 11.5) {
      return "Head / Brain";
    }

    // --- ZONE: NECK & SHOULDERS (Height 5.5 - 6.2) ---
    if (y > 10.9) {
      if (absX > 1.0) return `${side} Shoulder`;
      return "Neck / Throat";
    }

    // --- ZONE: CHEST (Height 4.2 - 5.5) ---
    if (y > 8.8) {
      if (absX > 1.4) return `${side} Arm / Bicep`; // Wide click = Arm
      return "Chest / Heart / Lungs";
    }

    // --- ZONE: STOMACH (Height 3.0 - 4.2) ---
    if (y > 7.0) {
      if (absX > 1.5) return `${side} Elbow / Forearm`; // Wide click = Arm
      return "Abdomen / Stomach";
    }

    // --- ZONE: HIPS & HANDS (Height 1.2 - 3.0) ---
    if (y > 6.2) {
      if (absX > 1.6) return `${side} Hand / Wrist`; // Very wide = Hand
      return "Hips / Pelvis";
    }

    // --- ZONE: LEGS (Height < 1.2) ---
    if (y > 0.3) {
      return `${side} Leg / Knee`;
    }
    
    return `${side} Foot / Ankle`;
  };

  const handlePartClick = (point3D) => {
    const partName = detectBodyPart(point3D);
    setSelectedPart(partName);
  };

  return (
    <div style={{ width: '100%', height: '100%', minHeight:'550px', background: '#0f172a', position: 'relative', overflow: 'hidden' }}>
      
      <Canvas camera={{ position: [0, 4, 10], fov: 80 }}> 
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 8, 5]} intensity={1} />
        <directionalLight position={[-5, 8, -5]} intensity={0.5} />
        
        <Suspense fallback={<Html center><h3 style={{color:'white'}}>Loading Atlas...</h3></Html>}>
          <Model onPartClick={handlePartClick} />
        </Suspense>
        
        <OrbitControls 
          target={[0, 3.5, 0]} 
          minDistance={4}
          maxDistance={15}
        />
      </Canvas>

      {selectedPart && (
        <div style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          background: 'rgba(255, 255, 255, 0.95)',
          padding: '20px',
          borderRadius: '16px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
          zIndex: 100,
          minWidth: '220px',
        }}>
          <h3 style={{margin: '0 0 10px 0', color: '#0d9488'}}>{selectedPart}</h3>
          
          <button 
            style={btnStyle} 
            onClick={() => {
              if (onReport) onReport(selectedPart, "severe pain");
              setSelectedPart(null);
            }}
          >
            🔴 Report Pain
          </button>

          <button 
            style={btnStyle} 
            onClick={() => {
              if (onReport) onReport(selectedPart, "numbness and tingling");
              setSelectedPart(null);
            }}
          >
            🔵 Report Numbness
          </button>
          
          <button 
            style={{...btnStyle, background: '#f1f5f9', color: '#64748b', marginTop: '10px'}} 
            onClick={() => setSelectedPart(null)}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}

const btnStyle = {
  display: 'block', width: '100%', padding: '12px', marginBottom: '8px',
  border: '1px solid #e2e8f0', borderRadius: '8px', background: 'white',
  color: '#334155', cursor: 'pointer', textAlign: 'left', fontWeight: '600'
};