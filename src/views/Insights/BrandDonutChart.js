import PropTypes from 'prop-types';
import React from 'react';

// material-ui
// import { useTheme } from '@mui/material/styles';
<<<<<<< HEAD
import {
  // Box,
  // Card,
  // CardContent,
  // CardHeader,
  // Divider,
  // Grid,
  // Typography,
  // useMediaQuery
} from '@mui/material';
=======
import // Box,
// Card,
// CardContent,
// CardHeader,
// Divider,
// Grid,
// Typography,
// useMediaQuery
'@mui/material';
>>>>>>> 2a90240c57e011d4a69c4ed616d203686d2904b6

// third-party
import Chart from 'react-apexcharts';

// ==============================|| BRAND DONUT CHART CARD ||============================== //

<<<<<<< HEAD
const BrandDonutChart = ({ chartData }) => {
=======
const BrandDonutChart = ({ chartOptions, chartSeries, chartHeight, chartType }) => {
>>>>>>> 2a90240c57e011d4a69c4ed616d203686d2904b6
  // const theme = useTheme();

  // const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
  // const matchDownXs = useMediaQuery(theme.breakpoints.down('sm'));

<<<<<<< HEAD
  return <Chart {...chartData} />;
=======
  return <Chart options={chartOptions} series={chartSeries} height={chartHeight} type={chartType} />;
>>>>>>> 2a90240c57e011d4a69c4ed616d203686d2904b6
};

BrandDonutChart.propTypes = {
  chartData: PropTypes.object
};

export default BrandDonutChart;
