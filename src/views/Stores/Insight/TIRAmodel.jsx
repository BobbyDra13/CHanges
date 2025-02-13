import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

export default function TIRAmodel() {
  const navigate = useNavigate();
  const { store } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  // Mapping specific store IDs to image URLs
  const storeImages = {
    '6623a893c40c738627f3373f': 'https://storage.googleapis.com/3dmodelhost/TIRA2.jpg',
    '67591b90b378a605865c09e1': 'https://storage.googleapis.com/3dmodelhost/TIRA1.jpg'
  };

  // Determine the correct image URL based on store ID, fallback to a default image
  const imageUrl = storeImages[store] || 'https://storage.googleapis.com/3dmodelhost/default.jpg';

  const handleExploreMore = () => {
    if (store === '6623a893c40c738627f3373f') {
      navigate(`/main/stores/storeinsight/fullscreenjwd/${store}`);
    } else {
      navigate(`/main/stores/storeinsight/fullscreen/${store}`);
    }
  };

  return (
    <div style={{ width: '100%', height: '500px', position: 'relative' }}>
      {/* Explore More Button */}
      <button
        onClick={handleExploreMore}
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
        Explore More
      </button>

      {/* Loading Spinner and Message */}
      {isLoading && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px'
          }}
        >
          <CircularProgress />
          <div>Loading the preview please wait...</div>
        </div>
      )}

      {/* Dynamically Loaded Image */}
      <img
        src={imageUrl}
        alt="TIRA Model"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          borderRadius: '8px'
        }}
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
}
