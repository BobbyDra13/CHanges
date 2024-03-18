import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import { Paper } from '@mui/material';
import { FaCamera } from 'react-icons/fa';
import src1 from '../../../assets/images/heatmap.jpg';
import src2 from '../../../assets/images/heatmap2.jpg';

const imgURLs = {
  camera1: src1,
  camera2: src2
};

export default function ShelfView() {
  const [url, setUrl] = useState(imgURLs.camera1);
  const [active, setActive] = useState('camera1');
  return (
    <div style={{ height: '400px', margin: '20px' }}>
      <Grid container spacing={4}>
        <Grid item md={3}>
          <Paper
            elevation={4}
            className="flex items-center mb-4 cursor-pointer p-5  "
            onClick={() => {
              setUrl(imgURLs.camera1);
              setActive('camera1');
            }}
            style={{
              backgroundColor: active === 'camera1' ? 'black' : 'white',
              color: active === 'camera1' ? 'white' : 'black',
              fontWeight: 'bolder'
            }}
          >
            {/* <div  className='bg-gray-200 m-2  rounded' style={{height:"100px", width:"100px"}}></div> */}
            <div
              style={{
                height: '30px',
                width: '30px',
                borderRadius: '50%',
                background: 'black',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '8px'
              }}
            >
              {' '}
              <FaCamera />{' '}
            </div>
            <h6>Camera 1</h6>
          </Paper>
          <Paper
            elevation={4}
            className="flex items-center mb-4 cursor-pointer p-5 "
            onClick={() => {
              setUrl(imgURLs.camera2);
              setActive('camera2');
            }}
            style={{
              backgroundColor: active === 'camera2' ? 'black' : 'white',
              color: active === 'camera2' ? 'white' : 'black',
              fontWeight: 'bolder'
            }}
          >
            {/* <div  className='bg-gray-200 m-2  rounded' style={{height:"100px", width:"100px"}}></div> */}
            <div
              style={{
                height: '30px',
                width: '30px',
                borderRadius: '50%',
                background: 'black',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '8px'
              }}
            >
              {' '}
              <FaCamera />{' '}
            </div>
            <h6>Camera 2</h6>
          </Paper>
        </Grid>

        <Grid item md={9}>
          {!url ? <div>please select one camera</div> : <img src={url} alt="img" style={{ height: '400px', width: '100%' }} />}
        </Grid>
      </Grid>
    </div>
  );
}
