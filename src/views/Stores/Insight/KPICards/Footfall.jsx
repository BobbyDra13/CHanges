import { Box, Stack, Typography } from '@mui/material';
import React from 'react';
import { MdDirectionsWalk } from 'react-icons/md';
import { fetchFootfallCardData } from '../../../../api/sentinelAPI';

const data2 = fetchFootfallCardData();

const data = [
  {
    datacolor: 'blue',
    dataname: 'Phones',
    datavalue: 125
  },
  {
    datacolor: 'blue',
    dataname: 'Accessories',
    datavalue: 10
  },
  {
    datacolor: 'blue',
    dataname: 'Dolby',
    datavalue: 12
  },
  {
    datacolor: 'red',
    dataname: 'Play',
    datavalue: 120
  },
  {
    datacolor: 'red',
    dataname: 'Phones',
    datavalue: 115
  },
  {
    datacolor: 'red',
    dataname: 'Phones',
    datavalue: 25
  },
  {
    datacolor: 'red',
    dataname: 'Phones',
    datavalue: 105
  },
  {
    datacolor: 'red',
    dataname: 'Phones',
    datavalue: 225
  },
  {
    datacolor: 'red',
    dataname: 'Phones',
    datavalue: 205
  }
];

data.sort((a, b) => b.datavalue - a.datavalue);

export default function StoreFootfall() {
  return (
    <Box
    //  sx={{width:"200px", height:"250px", padding:"10px", borderRadius:"10px"}}
    >
      {/* <Paper elevation={0} sx={{width:"100%", height:"100%"}}> */}
      <Stack direction={'row'}>
        <MdDirectionsWalk
          style={{ fontSize: '50px', backgroundColor: 'black', color: 'white', borderRadius: '50%', padding: '4px', margin: '2px 10px' }}
        />
        <Stack direction={'column'} alignItems="flex-start">
          <Typography variant="h2">246</Typography>
          <Typography variant="body2">Total Store Footfall</Typography>
        </Stack>
      </Stack>
      <Box>
        <Box
          className="overflow-y-auto scrollbar"
          backgroundColor="#e3e3e3"
          padding="5px"
          sx={{ overflowY: 'scroll', overflowX: 'hidden', width: '100%', height: '200px', margin: '0' }}
        >
          {data.map((d, index) => {
            const percentage = (d.datavalue / data[0].datavalue) * 100;
            const barcolor = percentage > 80 ? 'green' : percentage > 50 ? 'yellow' : percentage > 30 ? 'orange' : 'red';
            return (
              <>
                <Stack key={index} direction={'row'} margin={'10px'} width="95%">
                  <Box
                    style={{ height: '20px', width: '20px', borderRadius: '50%', backgroundColor: `${d.datacolor}`, margin: '0 8px' }}
                  ></Box>
                  <Box>
                    {d.dataname} : {d.datavalue}
                  </Box>
                </Stack>
                <Box sx={{ width: '100%', height: '4px' }}>
                  <Box sx={{ width: `${percentage}` + '%', height: '4px', backgroundColor: `${barcolor}` }}></Box>
                </Box>
              </>
            );
          })}
        </Box>
      </Box>
      {/* </Paper> */}
    </Box>
  );
}
