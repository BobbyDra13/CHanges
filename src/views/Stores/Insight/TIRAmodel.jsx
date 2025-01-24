import React, { Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

const Placeholder = () => (
  <mesh>
    <boxGeometry args={[1, 1, 1]} />
    <meshStandardMaterial color="gray" />
  </mesh>
);

const Model = () => {
  const { scene } = useGLTF('https://storage.googleapis.com/3dmodelhost/TIRA_final.glb');
  return <primitive object={scene} />;
};

useGLTF.preload('https://storage.googleapis.com/3dmodelhost/TIRA_final.glb');

export default function TIRAmodel() {
  useEffect(() => {
    useGLTF.preload('https://storage.googleapis.com/3dmodelhost/TIRA_final.glb');
  }, []);

  return (
    <div style={{ height: '80vh', width: '100%' }}>
      <Suspense fallback={<Placeholder />}>
        <Canvas
          shadows
          camera={{
            position: [6, 6, 6],
            fov: 50
          }}
        >
          <ambientLight intensity={0.5} />
          <hemisphereLight intensity={0.6} />
          <Suspense fallback={<Placeholder />}>
            <Model />
          </Suspense>
          <OrbitControls />
        </Canvas>
      </Suspense>
    </div>
  );
}
