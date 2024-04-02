import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faExpand, faCompress } from '@fortawesome/free-solid-svg-icons';
import './video.css';
//import vdo from './hola.mkv';

import { getVideoData } from '../../../../api/sentinelAPI';
import { Box, CircularProgress } from '@mui/material';

const timestamps = [];
// { start: 60, end: 70 },
// { start: 100, end: 110 },
// { start: 120, end: 130 },
// { start: 60, end: 70 },

const VideoComponent = ({ vdoSource: vdosrc }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [source, setSource] = useState(false);
  const [timevar, setTimevar] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  // const [totalDuration, setTotalDuration] = useState(null);
  const videoRef = useRef();
  const videoContainerRef = useRef();

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const handleProgress = () => {
    const video = videoRef.current;

    // Check if duration is available before calculating progress
    // console.log(video);
    if (video.duration) {
      const progressValue = (video.currentTime / video.duration) * 100;
      setProgress(progressValue);
    }
  };

  const toggleFullScreen = () => {
    if (!isFullScreen) {
      if (videoContainerRef.current.requestFullscreen) {
        videoContainerRef.current.requestFullscreen();
      } else if (videoContainerRef.current.mozRequestFullScreen) {
        videoContainerRef.current.mozRequestFullScreen();
      } else if (videoContainerRef.current.webkitRequestFullscreen) {
        videoContainerRef.current.webkitRequestFullscreen();
      } else if (videoContainerRef.current.msRequestFullscreen) {
        videoContainerRef.current.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
    setIsFullScreen(!isFullScreen);
  };

  useEffect(() => {
    const video = videoRef.current;

    // Check if video is defined before adding event listener
    if (video) {
      video.addEventListener('timeupdate', handleProgress);
    }

    return () => {
      // Check if video is defined before removing event listener
      if (video) {
        video.removeEventListener('timeupdate', handleProgress);
      }
    };
  }, [source]);

  useEffect(() => {
    async function getdata() {
      try {
        const data = await getVideoData();

        // console.log(data.data);
        setSource(data);
      } catch (error) {
        console.log(error);
      }
    }
    getdata();
    // eslint-disable-next-line
  }, []);
  // console.log(source);
  console.log(vdosrc);

  useEffect(() => {
    const checkTimestamps = () => {
      if (isPlaying && timestamps.length > 0) {
        const currentTime = videoRef.current.currentTime;

        const matchingRange = timestamps.find((range) => currentTime >= range.start && currentTime <= range.end);

        if (!matchingRange && timestamps.length - 1 >= timevar) {
          // videoRef.current.seek(timestamps[timevar].start);
          videoRef.current.currentTime = timestamps[timevar].start;
          setTimevar(1 + timevar);
          //   console.log(timevar);
          //   console.log(timestamps.length);
        } else if (!matchingRange && timevar === timestamps.length) {
          setIsPlaying(false);
          videoRef.current.pause();
          setTimevar(0);
        }
      }
    };

    const intervalId = setInterval(checkTimestamps, 100); // Check every 100ms

    return () => clearInterval(intervalId); // Clear interval on unmount
    // eslint-disable-next-line
  }, [timestamps, isPlaying, timevar]);

  function convertSecondsToHHMMSS(seconds) {
    // Calculate hours, minutes, and seconds
    const hours = Math.floor(seconds / 3600);
    const remainingMinutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    // Format the time
    const formattedTime = `${hours.toString().padStart(2, '0')}:${remainingMinutes.toString().padStart(2, '0')}:${remainingSeconds
      .toString()
      .padStart(2, '0')}`;

    return formattedTime;
  }

  return (
    <div ref={videoContainerRef} className="video-component">
      {source ? (
        <video style={isFullScreen ? { height: '85vh' } : { height: '60vh' }} ref={videoRef} onClick={togglePlayPause}>
          <source src={source} type="video/mp4" />
        </video>
      ) : (
        <div style={{ height: '61vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {' '}
          <CircularProgress />{' '}
        </div>
      )}
      <div className="controls">
        <div className="top-controls">
          <div
            className="childDiv"
            // style={{
            //   marginLeft: "30px",
            //   width: "calc(100% - 30px)",

            //   //   width: "100%",
            //   height: "5px",
            //   position: "absolute",
            // }}
          >
            {videoRef.current &&
              timestamps &&
              timestamps.map((times, index) => {
                const totaltime = videoRef.current.duration;
                const wid = ((times.end - times.start) / totaltime) * 100;
                const lfm = (times.start / totaltime) * 100;

                return (
                  <div
                    key={index}
                    style={{
                      position: 'absolute',
                      width: wid + '%',
                      height: '5px',
                      backgroundColor: 'green',
                      left: lfm + '%'
                      // zIndex:"-1"
                    }}
                  ></div>
                );
              })}
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={(e) => {
              const newTime = (videoRef.current.duration / 100) * e.target.value;
              videoRef.current.currentTime = newTime;
              setProgress(e.target.value);
            }}
            className="progress-bar"
            style={{ backgroundColor: 'rgba(0, 0, 255, 0.1)', zIndex: '1' }}
            step={0.1}
          />
        </div>

        <Box sx={{ display: 'flex', gap: '3px', alignItems: 'center', justifyContent: 'center' }}>
          <button onClick={togglePlayPause} className="play-pause-btn">
            <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
          </button>
          <Box sx={{ display: 'flex', width: '130px', padding: 'auto' }}>
            <div className="text-sm">{videoRef.current ? convertSecondsToHHMMSS(videoRef.current.currentTime) : ''}</div>
            <div className="text-sm"> {videoRef.current && '/'}</div>
            <div className="text-sm">{videoRef.current ? convertSecondsToHHMMSS(videoRef.current.duration) : ''}</div>
          </Box>

          <div className="bottom-controls">
            <input type="text" placeholder="Search" className="search-bar" />
            <button onClick={toggleFullScreen} className="fullscreen-btn">
              {!isFullScreen ? <FontAwesomeIcon icon={faExpand} /> : <FontAwesomeIcon icon={faCompress} />}
            </button>
          </div>
        </Box>
      </div>
    </div>
  );
};

export default VideoComponent;
