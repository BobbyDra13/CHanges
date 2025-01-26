import React from 'react';
import { Canvas } from '@react-three/fiber';
import { useNavigate, useParams } from 'react-router-dom'; // Use `useParams` to get the store parameter
import { OrbitControls, useGLTF } from '@react-three/drei';

export default function TIRAmodel() {
  const navigate = useNavigate();
  const { store } = useParams(); // Get the `store` parameter from the route

  const handleFullscreen = () => {
    navigate(`/main/stores/storeinsight/fullscreen/${store}`); // Navigate to fullscreen with the `store` parameter
  };

  return (
    <div style={{ width: '100%', height: '500px', position: 'relative' }}>
      {/* Fullscreen Button */}
      <button
        onClick={handleFullscreen}
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          zIndex: 1100,
          padding: '8px 12px',
          background: '#000',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Fullscreen
      </button>

      {/* Preview Canvas */}
      <Canvas camera={{ position: [5, 5, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <hemisphereLight intensity={0.6} />
        <OrbitControls />
        <TIRAPreview />
      </Canvas>
    </div>
  );
}

const TIRAPreview = () => {
  const { scene } = useGLTF('https://storage.googleapis.com/3dmodelhost/TIRA_final.glb');
  return <primitive object={scene} scale={[1.5, 1.5, 1.5]} />;
};

// Preload the model
useGLTF.preload('https://storage.googleapis.com/3dmodelhost/TIRA_final.glb');
