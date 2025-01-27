import React, { useState, useEffect, Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

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
    <div className="fixed top-[70px] left-0 w-full h-[calc(100vh-70px)] bg-white z-10 flex flex-col">
      {/* Back and Store Buttons */}
      <div className="flex justify-between items-center p-4">
        <button
          onClick={() => navigate(`/main/stores/storeinsight/overview/${store}`)}
          className="px-4 py-2 bg-gray-200 text-black rounded-lg hover:bg-gray-300 transition"
        >
          Back
        </button>
        <button onClick={handleStoreButton} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
          Store
        </button>
      </div>

      {/* Shelf Buttons */}
      <div className="absolute top-12 left-1/2 transform -translate-x-1/2 z-20 flex gap-2 overflow-x-auto px-4 py-2">
        {shelfButtons.map((shelf) => (
          <button
            key={shelf}
            onClick={() => handleShelfClick(shelf)}
            onMouseEnter={() => setHighlightedGroup(shelf)}
            onMouseLeave={() => setHighlightedGroup(null)}
            className={`px-4 py-2 border rounded-md cursor-pointer transition ${
              selectedShelf === shelf ? 'bg-black text-white' : 'bg-white text-black border-black hover:bg-gray-200'
            }`}
          >
            {shelf}
          </button>
        ))}
      </div>

      {/* 3D Model Canvas */}
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

  return <primitive object={scene} ref={groupRef} scale={[2, 2, 2]} />;
};

const Shelf = ({ selectedShelf }) => {
  const { scene } = useGLTF(`https://storage.googleapis.com/3dmodelhost/Shelves/${selectedShelf}.glb`);
  return <primitive object={scene} position={[0, 0, 0]} scale={[3, 3, 3]} />;
};
