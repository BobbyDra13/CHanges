import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function TIRAmodel() {
  const navigate = useNavigate();
  const { store } = useParams(); // Get the `store` parameter from the route

  const handleExploreMore = () => {
    navigate(`/main/stores/storeinsight/fullscreen/${store}`); // Navigate to fullscreen with the `store` parameter
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

      {/* Static JPEG Image of the TIRA Model */}
      <img
        src="https://storage.googleapis.com/3dmodelhost/TIRA.png" // Replace with the correct URL
        alt="TIRA Model"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          borderRadius: '8px'
        }}
      />
    </div>
  );
}
