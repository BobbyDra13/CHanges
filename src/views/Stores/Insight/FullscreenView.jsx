import React, { useState, useEffect, Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Html, useProgress, PerspectiveCamera } from '@react-three/drei';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Box, Typography, IconButton, Tooltip } from '@mui/material';
import ModelLoader from 'component/Loader/ModelLoader';
import { ZoomIn, ZoomOut, CenterFocusStrong, ThreeDRotation, PanTool, ThreeSixty, ArrowBack } from '@mui/icons-material';

// Model URLs
const TIRA_MODEL_URL = 'https://storage.googleapis.com/3dmodelhost/TIRA_final.glb';
const getShelfModelURL = (shelf) => `https://storage.googleapis.com/3dmodelhost/Shelves/${shelf}.glb`;

// Only preload TIRA model initially
useGLTF.preload(TIRA_MODEL_URL);

// Preload models
const shelfButtons = ['SHELF_1', 'SHELF_2', 'SHELF_3', 'SHELF_4', 'SHELF_5', 'SHELF_6', 'SHELF_7', 'SHELF_8', 'SHELF_9', 'SHELF_10'];
const SHELF_NAMES = ['SHELF_1', 'SHELF_2', 'SHELF_3', 'SHELF_4', 'SHELF_5', 'SHELF_6', 'SHELF_7', 'SHELF_8', 'SHELF_9', 'SHELF_10'];

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
          minWidth: '200px'
        }}
      >
        {/* <CircularProgress variant="determinate" value={progress} size={60} thickness={4} /> */}
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

export default function FullscreenView() {
  const navigate = useNavigate();
  const { store } = useParams();
  const location = useLocation();
  const [selectedShelf, setSelectedShelf] = useState(null);
  const [highlightedGroup, setHighlightedGroup] = useState(null);
  const [showTIRA, setShowTIRA] = useState(true);
  const [cameraPosition, setCameraPosition] = useState([6, 6, 6]);
  const [isDragMode, setIsDragMode] = useState(false);
  const controlsRef = useRef();
  const cameraRef = useRef();

  // Effect to handle URL params and set initial state
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const shelf = queryParams.get('shelf');
    console.log('URL Params - shelf:', shelf);

    if (shelf && shelfButtons.includes(shelf)) {
      console.log('Setting selected shelf:', shelf);
      setSelectedShelf(shelf);
      setShowTIRA(false);
    } else {
      console.log('No valid shelf in URL, showing TIRA model');
      setSelectedShelf(null);
      setShowTIRA(true);
    }
  }, [location.search]);

  const handleStoreButton = () => {
    console.log('Store button clicked');
    setShowTIRA(true);
    setSelectedShelf(null);
    navigate(`/main/stores/storeinsight/fullscreen/${store}`);
    window.location.reload();
  };

  const handleShelfClick = async (shelf) => {
    console.log('Shelf clicked:', shelf);
    try {
      setShowTIRA(false);
      setSelectedShelf(shelf);
      // Navigate first
      const newUrl = `/main/stores/storeinsight/fullscreen/${store}?shelf=${shelf}`;
      console.log('Navigating to:', newUrl);
      navigate(newUrl);
      // Then reload the page to clear memory of previously loaded models
      window.location.reload();
    } catch (error) {
      console.error('Error handling shelf click:', error);
    }
  };

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
      setCameraPosition([6, 6, 6]);
    }
  };

  const toggleDragMode = () => {
    setIsDragMode(!isDragMode);
    if (controlsRef.current) {
      // When isDragMode is true, we disable rotation and enable panning
      controlsRef.current.enableRotate = !isDragMode;
      controlsRef.current.enablePan = isDragMode;
    }
  };

  // Clean up memory when component unmounts
  useEffect(() => {
    return () => {
      // Dispose of loaded models when component unmounts
      useGLTF.disposeAll();
    };
  }, []);

  return (
    <div className="fixed top-[70px] left-0 w-full h-[calc(100vh-70px)] bg-white z-10 flex flex-col">
      {/* Header with navigation buttons */}
      <div className="flex justify-between items-center p-4">
        <button
          onClick={() => navigate(`/main/stores/storeinsight/overview/${store}`)}
          className="px-4 py-2 bg-gray-200 text-black rounded-lg hover:bg-gray-300 transition flex items-center gap-2"
        >
          <ArrowBack />
          Overview
        </button>
      </div>

      {/* Shelf selection buttons */}
      <div className="flex flex-wrap gap-2 p-4">
        <button
          onClick={handleStoreButton}
          className={`px-4 py-2 rounded-lg transition ${showTIRA ? 'bg-black text-white' : 'bg-gray-200 text-black hover:bg-gray-300'}`}
        >
          STORE
        </button>
        {SHELF_NAMES.map((shelf) => (
          <button
            key={shelf}
            onClick={() => handleShelfClick(shelf)}
            onMouseEnter={() => setHighlightedGroup(shelf)}
            onMouseLeave={() => setHighlightedGroup(null)}
            className={`px-4 py-2 rounded-lg transition ${
              selectedShelf === shelf ? 'bg-black text-white' : 'bg-gray-200 text-black hover:bg-gray-300'
            }`}
          >
            {shelf}
          </button>
        ))}
      </div>

      {/* 3D Model Canvas */}
      <div className="relative flex-grow">
        <Canvas shadows>
          <PerspectiveCamera makeDefault position={cameraPosition} fov={50} ref={cameraRef} near={0.1} far={1000} />
          <ambientLight intensity={0.5} />
          <hemisphereLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={0.5} />
          <Suspense fallback={<Loader />}>
            {showTIRA ? (
              <ErrorBoundary fallback={<Html center>Error loading TIRA model</Html>}>
                <TIRAFullModel highlightedGroup={highlightedGroup} />
              </ErrorBoundary>
            ) : selectedShelf ? (
              <ErrorBoundary fallback={<Html center>Error loading shelf model</Html>}>
                <Shelf selectedShelf={selectedShelf} />
              </ErrorBoundary>
            ) : null}
          </Suspense>
          <OrbitControls
            ref={controlsRef}
            enablePan={isDragMode}
            enableZoom={true}
            enableRotate={!isDragMode}
            minDistance={2}
            maxDistance={20}
            minPolarAngle={0}
            maxPolarAngle={Math.PI}
            dampingFactor={0.1}
            rotateSpeed={0.7}
            zoomSpeed={0.8}
            panSpeed={1.2}
            enableDamping={true}
            mouseButtons={{
              LEFT: isDragMode ? 2 : 0, // 0 = ROTATE, 2 = PAN
              MIDDLE: 1, // DOLLY (zoom)
              RIGHT: 0 // No right mouse button action
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

const TIRAFullModel = ({ highlightedGroup }) => {
  const groupRef = useRef(null);

  const { scene } = useGLTF(TIRA_MODEL_URL, {
    draco: true,
    meshoptSimplifier: true,
    onProgress: (progress) => {
      console.log('TIRA Model loading progress:', progress);
    }
  });

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
  const modelUrl = getShelfModelURL(selectedShelf);

  // Log when component mounts or updates
  useEffect(() => {
    console.log('Shelf component - selectedShelf:', selectedShelf);
    console.log('Shelf component - modelUrl:', modelUrl);
  }, [selectedShelf, modelUrl]);

  const { scene } = useGLTF(modelUrl, {
    draco: true,
    meshoptSimplifier: true,
    onProgress: (progress) => {
      console.log(`Loading ${selectedShelf} progress:`, progress);
    },
    onError: (error) => {
      console.error(`Error loading ${selectedShelf}:`, error);
    }
  });

  if (!selectedShelf) {
    console.error('No shelf selected');
    return null;
  }

  return <primitive object={scene} position={[0, 0, 0]} scale={[3, 3, 3]} />;
};
