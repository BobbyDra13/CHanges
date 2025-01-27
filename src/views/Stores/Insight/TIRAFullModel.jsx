import React, { useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const TIRA_MODEL_URL = 'https://storage.googleapis.com/3dmodelhost/TIRA_final.glb';

export default function TIRAFullModel({ highlightedGroup }) {
  const { scene } = useGLTF(TIRA_MODEL_URL);

  useEffect(() => {
    // Reset all materials to their original color
    scene.traverse((child) => {
      if (child.isMesh && child.material) {
        if (child.material._originalColor) {
          child.material.color.copy(child.material._originalColor);
        } else {
          // Store original color on first run
          child.material._originalColor = child.material.color.clone();
        }
      }
    });

    // If there's a highlighted group, change its color to red
    if (highlightedGroup) {
      scene.traverse((child) => {
        if (child.name && child.name.includes(highlightedGroup) && child.isMesh) {
          child.material.color.set('#ff0000');
        }
      });
    }
  }, [highlightedGroup, scene]);

  return <primitive object={scene} />;
}

useGLTF.preload(TIRA_MODEL_URL);
