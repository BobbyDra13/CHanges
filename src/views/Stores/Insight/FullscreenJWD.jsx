import React, { useState, useEffect, Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Html, useProgress, PerspectiveCamera } from '@react-three/drei';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Typography, IconButton, Tooltip } from '@mui/material';
import ModelLoader from 'component/Loader/ModelLoader';
import { ZoomIn, ZoomOut, CenterFocusStrong, ThreeDRotation, PanTool, ThreeSixty, ArrowBack } from '@mui/icons-material';

// Model URLs
const TIRA_MODEL_URL = 'https://storage.googleapis.com/3dmodelhost/TIRA_JWD.glb';

// Only preload TIRA model initially
useGLTF.preload(TIRA_MODEL_URL);

function Loader() {
  const { active, progress, errors, item } = useProgress();
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    // Only show loader if loading takes more than 100ms
    const timer = setTimeout(() => setShowLoader(true), 100);
    return () => clearTimeout(timer);
  }, []);

  if (!active || !showLoader) return null;

  return (
    <Html center>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
          bgcolor: 'rgba(255, 255, 255, 0.9)',
          p: 3,
          borderRadius: 2,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          minWidth: '200px',
          marginBottom: '350px'
        }}
      >
        <ModelLoader />
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>
            Loading 3D Model
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {Math.round(progress)}% loaded
          </Typography>
          {item && (
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
              Loading: {item}
            </Typography>
          )}
          {errors.length > 0 && (
            <Typography variant="caption" color="error" sx={{ display: 'block', mt: 1 }}>
              Error loading model. Please try refreshing.
            </Typography>
          )}
        </Box>
      </Box>
    </Html>
  );
}

export default function FullscreenJWD() {
  const navigate = useNavigate();
  const { store } = useParams();
  const [cameraPosition, setCameraPosition] = useState([0, 2, 10]);
  const [isDragMode, setIsDragMode] = useState(false);
  const controlsRef = useRef();
  const cameraRef = useRef();

  // Camera controls
  const handleZoomIn = () => {
    if (controlsRef.current) {
      controlsRef.current.dollyOut(1.3);
    }
  };

  const handleZoomOut = () => {
    if (controlsRef.current) {
      controlsRef.current.dollyIn(1.3);
    }
  };

  const resetCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
      setCameraPosition([0, 2, 10]);
    }
  };

  const toggleDragMode = () => {
    setIsDragMode(!isDragMode);
    if (controlsRef.current) {
      controlsRef.current.enableRotate = !isDragMode;
      controlsRef.current.enablePan = isDragMode;
    }
  };

  // Clean up memory when component unmounts
  useEffect(() => {
    return () => {
      useGLTF.disposeAll();
    };
  }, []);

  return (
    <div className="fixed top-[63px] left-0 w-full h-[calc(100vh-63px)] bg-white z-10 flex flex-col">
      {/* Header with navigation buttons */}
      <div className="flex justify-between items-center p-4">
        <button
          onClick={() => {
            console.log('Navigating to Overview page');
            navigate(`/main/stores/storeinsight/overview/${store}`);
            setTimeout(() => {
              window.location.reload();
            }, 100);
          }}
          className="px-4 py-2 bg-gray-200 text-black rounded-lg hover:bg-gray-300 transition flex items-center gap-2"
        >
          <ArrowBack />
          Overview
        </button>
      </div>

      {/* 3D Model Canvas */}
      <div className="relative flex-grow">
        <Canvas shadows camera={{ position: [0, 2, 10], fov: 60 }}>
          <PerspectiveCamera makeDefault position={cameraPosition} fov={60} ref={cameraRef} near={0.1} far={1000} />
          <ambientLight intensity={0.5} />
          <hemisphereLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={0.5} />
          <Suspense fallback={<Loader />}>
            <ErrorBoundary fallback={<Html center>Error loading TIRA model</Html>}>
              <TIRAFullModel />
            </ErrorBoundary>
          </Suspense>
          <OrbitControls
            ref={controlsRef}
            enablePan={isDragMode}
            enableZoom={true}
            enableRotate={!isDragMode}
            minDistance={5}
            maxDistance={50}
            minPolarAngle={0}
            maxPolarAngle={Math.PI}
            dampingFactor={0.1}
            rotateSpeed={0.7}
            zoomSpeed={0.8}
            panSpeed={1.2}
            enableDamping={true}
            target={[0, 1, 0]}
            mouseButtons={{
              LEFT: isDragMode ? 2 : 0,
              MIDDLE: 1,
              RIGHT: 0
            }}
          />
        </Canvas>

        {/* Controls UI */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-3 bg-white/95 px-4 py-2 rounded-full shadow-lg">
          <Tooltip title="Zoom In">
            <IconButton onClick={handleZoomIn} size="small" className="hover:bg-gray-100">
              <ZoomIn />
            </IconButton>
          </Tooltip>
          <div className="h-4 w-px bg-gray-300" />
          <Tooltip title="Zoom Out">
            <IconButton onClick={handleZoomOut} size="small" className="hover:bg-gray-100">
              <ZoomOut />
            </IconButton>
          </Tooltip>
          <div className="h-4 w-px bg-gray-300" />
          <Tooltip title="Reset View">
            <IconButton onClick={resetCamera} size="small" className="hover:bg-gray-100">
              <CenterFocusStrong />
            </IconButton>
          </Tooltip>
          <div className="h-4 w-px bg-gray-300" />
          <Tooltip title={isDragMode ? 'Switch to Rotation Mode' : 'Switch to Pan Mode'}>
            <IconButton onClick={toggleDragMode} size="small" className={`hover:bg-gray-100 ${isDragMode ? 'bg-blue-50' : ''}`}>
              {isDragMode ? <ThreeSixty /> : <PanTool />}
            </IconButton>
          </Tooltip>
          <div className="h-4 w-px bg-gray-300" />
          <Tooltip title="Toggle Auto-Rotation">
            <IconButton
              onClick={() => {
                if (controlsRef.current) {
                  controlsRef.current.autoRotate = !controlsRef.current.autoRotate;
                  controlsRef.current.autoRotateSpeed = 2.0;
                }
              }}
              size="small"
              className="hover:bg-gray-100"
            >
              <ThreeDRotation />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

const TIRAFullModel = () => {
  const { scene } = useGLTF(TIRA_MODEL_URL, {
    draco: true,
    meshoptSimplifier: true,
    onProgress: (progress) => {
      console.log('TIRA Model loading progress:', progress);
    }
  });

  return <primitive object={scene} scale={[0.1, 0.1, 0.1]} />;
};
