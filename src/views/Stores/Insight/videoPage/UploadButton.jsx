import React, { useState, useRef, useEffect } from 'react';
import Modal from 'react-modal';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import CancelIcon from '@mui/icons-material/Cancel';
import DatePicker from 'react-datepicker'; // Import the DatePicker component
import 'react-datepicker/dist/react-datepicker.css'; // Import the styles for DatePicker
import setHours from 'date-fns/setHours';
import setMinutes from 'date-fns/setMinutes';

import './UploadButton.css';

Modal.setAppElement('#root');

const UploadButton = () => {
  // const [file, setFile] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [startDate, setStartDate] = useState(setHours(setMinutes(new Date(), 30), 16)); // Set initial date for DatePicker

  const fileInputRef = useRef();

  useEffect(() => {
    // If you had set up global drag-and-drop handlers, define them here
    const handleGlobalDragOver = (event) => {
      event.preventDefault();
    };

    const handleGlobalDrop = (event) => {
      event.preventDefault();
    };

    // If you have added global event listeners, add them here
    window.addEventListener('dragover', handleGlobalDragOver);
    window.addEventListener('drop', handleGlobalDrop);

    // Cleanup function for global event listeners
    return () => {
      window.removeEventListener('dragover', handleGlobalDragOver);
      window.removeEventListener('drop', handleGlobalDrop);
    };
  }, []);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    processFile(selectedFile);
  };

  const processFile = (file) => {
    if (file && file.type.startsWith('video/')) {
      // setFile(file);
      simulateUpload();
    } else {
      alert('Only video files are supported. Please upload a video file.');
    }
  };

  const simulateUpload = () => {
    setShowProgressModal(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((oldProgress) => {
        const updatedProgress = Math.min(oldProgress + 10, 100);
        if (updatedProgress >= 100) {
          clearInterval(interval);
          setShowProgressModal(false);
          // setFile(null);
          setShowUploadModal(false);
        }
        return updatedProgress;
      });
    }, 3000);
  };

  const resetUpload = () => {
    setUploadProgress(0);
    // setFile(null);
    setShowProgressModal(false);
    setShowUploadModal(true);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files.length > 0 && showUploadModal) {
      processFile(files[0]);
    }
  };

  function LinearProgressWithLabel(props) {
    return (
      <div className="flex justify-between w-full items-center">
        <div className="mr-1 w-11/12">
          <LinearProgress variant="determinate" {...props} />
        </div>
        <div className="mr-1 w-1/12">
          <Typography variant="body2" color="text.secondary">{`${Math.round(props.value)}%`}</Typography>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        onClick={() => {
          setShowUploadModal(true);
        }}
      >
        Sync Video
      </div>

      <Modal
        isOpen={showUploadModal}
        onRequestClose={() => setShowUploadModal(false)}
        shouldCloseOnOverlayClick={true}
        className="modal"
        overlayClassName="overlay"
        style={{
          content: {
            height: '60vh',
            width: '50vw'
          },
          overlay: {
            zIndex: 3 // Set a high z-index value for the overlay
          }
        }}
      >
        <div className="modal-content">
          <p>Select the date and time of video captured</p>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            showTimeSelect
            excludeTimes={[
              setHours(setMinutes(new Date(), 0), 17),
              setHours(setMinutes(new Date(), 30), 18),
              setHours(setMinutes(new Date(), 30), 19),
              setHours(setMinutes(new Date(), 30), 17)
            ]}
            dateFormat="MMMM d, yyyy h:mm aa"
            className="custom-datepicker"
          />
          <div className="drop-area" onDragOver={handleDragOver} onDrop={handleDrop}>
            <CloudUploadOutlinedIcon className="upload-icon" fontSize="large" />
            <p className="drag-text">Drag and drop, or click to browse</p>
            <input ref={fileInputRef} type="file" onChange={handleFileChange} style={{ display: 'none' }} accept="video/*" />
            <button className="browse-button" onClick={() => fileInputRef.current.click()}>
              Browse
            </button>
          </div>
          {showProgressModal && (
            <div className="flex justify-between w-full">
              <LinearProgressWithLabel value={uploadProgress} />
              <span onClick={resetUpload}>
                <CancelIcon />
              </span>
            </div>
          )}
          <p className="video-text">Only video files supported</p>
        </div>
      </Modal>
    </>
  );
};

export default UploadButton;
