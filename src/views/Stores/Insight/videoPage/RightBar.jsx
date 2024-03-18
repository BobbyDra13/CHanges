import CloudSyncIcon from '@mui/icons-material/CloudSync';
import Button from '@mui/material/Button';
// import { useMediaQuery, useTheme } from '@mui/material';

import './RightBar.css';

// eslint-disable-next-line
const RightBar = ({ videoSource }) => {
  // const onTouchVideo = (source) => {
  //   videoSource(source);
  // };
  const StatusDot = ({ color }) => {
    const style = {
      height: '15px', // Increased height for a larger dot
      width: '15px', // Increased width for a larger dot
      borderRadius: '50%',
      display: 'inline-block',
      backgroundColor: color,
      margin: '0 2px' // Adjust spacing as needed
    };

    return <span style={style} />;
  };

  const CameraCard = ({ camera, isdisabled }) => {
    return (
      <div
        className="camera-card"
        style={{
          opacity: isdisabled ? '0.3' : '1',
          cursor: isdisabled ? 'not-allowed' : 'pointer'
        }}
        // onClick={() => {
        //   onTouchVideo(camera.id);
        //   // console.log('clicked', camera.id);
        // }}
      >
        <div className="camera-thumbnail"></div>
        <div className="camera-details">
          <h2 className="text-2xl font-semibold">Camera {camera.id}</h2>
          <p className="font-semibold">Last Sync: {camera.lastSync}</p>
          <div className="status-indicators">
            {camera.statusColors.map((color, index) => (
              <StatusDot key={index} color={color} />
            ))}
          </div>
          <div className="sync-button-container">
            <Button
              variant="contained"
              endIcon={<CloudSyncIcon className="sync-button" />}
              sx={{
                backgroundColor: '#818181!important',
                color: 'white',
                borderRadius: '50px',
                fontSize: '0.5rem',
                padding: '5px 10px',
                margin: '0 8px', // Assuming you want some margin on both sides
                alignSelf: 'center' // Aligns the button vertically in the center
              }}
            >
              Sync Video
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const cameras = [
    { id: 1, lastSync: '18:45:22-4 Feb 2024', statusColors: ['#bbeeff', '#99ccff', '#5588ff'] },
    { id: 2, lastSync: '18:45:22-4 Feb 2024', statusColors: ['#3366ff', '#77ab59', '#bbeeff'] },
    { id: 3, lastSync: '18:45:22-4 Feb 2024', statusColors: ['#ffb38a', '#77ab59', ''] },
    { id: 4, lastSync: '18:45:22-4 Feb 2024', statusColors: ['	#d896ff', '', ''] },
    { id: 5, lastSync: '18:45:22-4 Feb 2024', statusColors: ['	#d896ff', '', ''] }
  ];
  // const theme = useTheme();
  // const isSmallScreen = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <div className=" h-full right-bar flex flex-col  gap-5 ">
      <div className="h-9/10 overflow-y-scroll  scrollbar ">
        {cameras.map((camera) => (
          <CameraCard key={camera.id} camera={camera} isdisabled={camera.id > 1 ? true : false} />
        ))}
      </div>
      <div
        className="flex items-center justify-center w-full mb-20 "
        // style={{
        //   marginBottom: isSmallScreen ? "2rem" : "5rem"
        // }}
      >
        <button className="mt-5 bg-blue-600 text-white p-2 w-4/5 m-auto rounded-xl "> add camera</button>
      </div>
    </div>
  );
};

export default RightBar;
