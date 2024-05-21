import React from 'react';
// import Sankey from './Sankey';
import Areachart from './AreaChart';
// import MultipleSelectCheckmarks from './Dropdown';
import { Box, Paper } from '@mui/material';
// import Timeline from './TimelineChart';
// import FilterMenu from './FilterMenu';

export default function TrendsChart({ storeId, date, isSmallScreen }) {
  // const [chartvalue, setChartValue] = useState('Footfall');
  // function graphToSelect(ChartData) {
  // setChartValue(ChartData);
  // }
  return (
    <Box
      sx={{
        width: isSmallScreen ? '500px' : 'full',
        overflow: isSmallScreen ? 'scroll' : 'hidden'
      }}
      // sx={{width: "100vw", height:"100vh", display:"flex", justifyContent:"center", alignItems:"center"}}
    >
      <div className="flex w-full justify-between">
        {/* <MultipleSelectCheckmarks graphToSelect={graphToSelect} /> */}
        {/* <FilterMenu /> */}
      </div>
      <Paper elevation={0} sx={{ width: '100%', position: 'relative', height: '400px' }}>
        {/* {chartvalue == 'Journey' ? <Sankey /> : chartvalue == 'Engagement' ? <Timeline date={date} /> : <Areachart date={date} />} */}
        <Areachart storeId={storeId} date={date} />
      </Paper>
    </Box>
  );
}
