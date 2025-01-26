import React, { useState, useEffect, Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import * as THREE from 'three';

export default function FullscreenView() {
  const navigate = useNavigate();
  const { store } = useParams();
  const location = useLocation();
  const [selectedShelf, setSelectedShelf] = useState(null);
  const [highlightedGroup, setHighlightedGroup] = useState(null);
  const [showTIRA, setShowTIRA] = useState(true);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const shelf = queryParams.get('shelf');
    if (shelf) {
      setSelectedShelf(shelf);
      setShowTIRA(false);
    }
  }, [location.search]);

  const shelfButtons = ['SHELF_1', 'SHELF_2', 'SHELF_3', 'SHELF_4', 'SHELF_5', 'SHELF_6', 'SHELF_7', 'SHELF_8', 'SHELF_9', 'SHELF_10'];

  const handleStoreButton = () => {
    navigate(`/main/stores/storeinsight/fullscreen/${store}`);
    window.location.reload();
  };

  const handleShelfClick = (shelf) => {
    navigate(`/main/stores/storeinsight/fullscreen/${store}?shelf=${shelf}`);
    window.location.reload();
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: '70px',
        left: '0',
        width: '100vw',
        height: 'calc(100vh - 70px)',
        background: 'white',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <button onClick={() => navigate(`/main/stores/storeinsight/overview/${store}`)}>Back</button>
      <button onClick={handleStoreButton}>Store</button>

      <div
        style={{
          position: 'absolute',
          top: '50px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1100,
          display: 'flex',
          gap: '10px',
          justifyContent: 'center',
          flexWrap: 'nowrap',
          overflowX: 'auto',
          padding: '10px'
        }}
      >
        {shelfButtons.map((shelf) => (
          <button
            key={shelf}
            onClick={() => handleShelfClick(shelf)}
            onMouseEnter={() => setHighlightedGroup(shelf)}
            onMouseLeave={() => setHighlightedGroup(null)}
            style={{
              padding: '8px 12px',
              background: selectedShelf === shelf ? '#000' : '#fff',
              color: selectedShelf === shelf ? '#fff' : '#000',
              border: '1px solid #000',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {shelf}
          </button>
        ))}
      </div>

      <Canvas shadows camera={{ position: [6, 6, 6], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <hemisphereLight intensity={0.6} />
        <Suspense fallback={null}>
          {showTIRA && <TIRAFullModel highlightedGroup={highlightedGroup} />}
          {selectedShelf && <Shelf selectedShelf={selectedShelf} />}
        </Suspense>
        <OrbitControls />
      </Canvas>
    </div>
  );
}

const TIRAFullModel = ({ highlightedGroup }) => {
  const groupRef = useRef(null);
  const { scene } = useGLTF('https://storage.googleapis.com/3dmodelhost/TIRA_final.glb');

  useEffect(() => {
    if (groupRef.current && highlightedGroup) {
      const group = groupRef.current.getObjectByName(highlightedGroup);
      if (group) {
        group.traverse((child) => {
          if (child.isMesh) {
            child.material.emissive = { r: 1, g: 0, b: 0 };
            console.log(`Highlighting group: ${highlightedGroup}`);
          }
        });
      }
    } else if (groupRef.current) {
      groupRef.current.traverse((child) => {
        if (child.isMesh) {
          child.material.emissive = { r: 0, g: 0, b: 0 };
        }
      });
    }
  }, [highlightedGroup]);

  return <primitive object={scene} ref={groupRef} scale={[0.5, 0.5, 0.5]} />;
};

const Shelf = ({ selectedShelf }) => {
  const { scene } = useGLTF(`https://storage.googleapis.com/3dmodelhost/Shelves/${selectedShelf}.glb`);
  return <primitive object={scene} position={[0, 0, 0]} scale={[1, 1, 1]} />;
};
