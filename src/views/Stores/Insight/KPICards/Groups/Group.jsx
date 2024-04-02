import { Box, Paper, Typography } from '@mui/material';
import React from 'react';
// import Donut from './Donut'
import { MdGroup } from 'react-icons/md';
import Donut2 from './Donut2';
import Donut1 from './Donut1';

export default function Group() {
  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', paddingBottom: '18px' }}>
      <Paper sx={{ display: 'flex', height: '93px', alignItems: 'center' }}>
        <MdGroup
          style={{
            height: '50px',
            width: '50px',
            backgroundColor: 'black',
            color: 'white',
            padding: '6px',
            borderRadius: '50%',
            margin: ' 0 20px'
          }}
        />
        <Box>
          <Typography variant="h2" color="initial">
            32
          </Typography>
          <Typography variant="body2" color="initial">
            Groups
          </Typography>
        </Box>
      </Paper>
      <Paper sx={{ display: 'flex', height: '93px', alignItems: 'center' }}>
        <Donut1 />

        <Box>
          <Typography variant="h2" color="initial">
            20-25
          </Typography>
          <Typography variant="body2" color="initial">
            Avg Age
          </Typography>
        </Box>
      </Paper>
      <Paper sx={{ display: 'flex', height: '93px', alignItems: 'center' }}>
        <Donut2 />
        <Box>
          <Typography variant="h2" color="initial">
            63%
          </Typography>
          <Typography variant="body2" color="initial">
            male
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}
