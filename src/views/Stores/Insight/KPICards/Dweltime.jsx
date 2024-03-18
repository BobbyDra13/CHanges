import { Box, Stack, Typography } from '@mui/material';
import React from 'react';
import { AiOutlineFieldTime } from 'react-icons/ai';
const data = [
  {
    datacolor: 'blue',
    dataname: 'Phones',
    datavalue: 20
  },
  {
    datacolor: 'blue',
    dataname: 'Accessories',
    datavalue: 12
  },
  {
    datacolor: 'blue',
    dataname: 'Dolby',
    datavalue: 8
  },
  {
    datacolor: 'red',
    dataname: 'Play',
    datavalue: 6
  },
  {
    datacolor: 'red',
    dataname: 'Phones',
    datavalue: 5
  },
  {
    datacolor: 'red',
    dataname: 'Phones',
    datavalue: 4
  },
  {
    datacolor: 'red',
    dataname: 'Phones',
    datavalue: 3
  },
  {
    datacolor: 'red',
    dataname: 'Phones',
    datavalue: 2
  },
  {
    datacolor: 'red',
    dataname: 'Phones',
    datavalue: 1
  }
];

data.sort((a, b) => b.datavalue - a.datavalue);

export default function Dweltime() {
  return (
    <Box
    //  sx={{width:"200px", height:"250px", padding:"10px", borderRadius:"10px"}}
    >
      {/* <Paper elevation={0} sx={{width:"100%", height:"100%"}}> */}
      <Stack direction={'row'}>
        <AiOutlineFieldTime
          style={{ fontSize: '50px', backgroundColor: 'black', color: 'white', borderRadius: '50%', padding: '4px', margin: '2px 10px' }}
        />
        <Stack direction={'column'} alignItems="flex-start">
          <Typography variant="h2">24 min</Typography>
          <Typography variant="body2">Avg dwell time</Typography>
        </Stack>
      </Stack>
      <Box>
        <Box
          backgroundColor="#e3e3e3"
          padding="5px"
          sx={{ overflowY: 'scroll', overflowX: 'hidden', width: '90%', height: '200px', margin: '10px 0 0 15px' }}
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
                    {d.dataname} : {d.datavalue} min
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
