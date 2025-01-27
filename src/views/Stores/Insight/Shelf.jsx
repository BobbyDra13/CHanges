import React from 'react';
import { useGLTF } from '@react-three/drei';

const shelfNames = ['SHELF_1', 'SHELF_2', 'SHELF_3', 'SHELF_4', 'SHELF_5', 'SHELF_6', 'SHELF_7', 'SHELF_8', 'SHELF_9', 'SHELF_10'];

// Preload all shelf models for better performance
shelfNames.forEach((shelf) => {
  useGLTF.preload(`https://storage.googleapis.com/3dmodelhost/Shelves/${shelf}.glb`);
});

export default function Shelf({ selectedShelf, ...props }) {
  try {
    const { scene } = useGLTF(`https://storage.googleapis.com/3dmodelhost/Shelves/${selectedShelf}.glb`);

    return (
      <group {...props}>
        <primitive
          object={scene}
          position={[0, 0, 0]} // Center the shelf
          rotation={[0, Math.PI / 2, 0]} // Rotate 90 degrees clockwise
          scale={2.0} // Adjust scale
        />
      </group>
    );
  } catch (error) {
    console.error(`Error loading shelf model: ${selectedShelf}`, error);
    return null;
  }
}
