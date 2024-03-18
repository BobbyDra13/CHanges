import React from 'react';

const Progress_bar = ({ progress, height, handleProgressBarClick }) => {
  const Parentdiv = {
    height: height,
    width: '80%',
    maxWidth: '100%',
    backgroundColor: '#f87171',
    borderRadius: '50px',
    margin: '2%',
    cursor: 'pointer',
    overflow: 'hidden'
  };

  const Childdiv = {
    height: '100%',
    width: `${progress}%`,
    backgroundColor: '#10b981',
    borderRadius: '50px',
    textAlign: 'right',
    transition: 'width 0.3s ease'
  };

  return (
    <div
      style={Parentdiv}
      role="button"
      tabIndex={0}
      onClick={handleProgressBarClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleProgressBarClick(handleProgressBarClick);
        }
      }}
    >
      <div style={Childdiv}>{/* <span style={progresstext}>{`${progress}%`}</span> */}</div>
    </div>
  );
};

export default Progress_bar;
