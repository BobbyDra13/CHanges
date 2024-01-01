import PropTypes from 'prop-types';
import React from 'react';

// material-ui
// import { useTheme } from '@mui/material/styles';
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

// third-party
import Chart from 'react-apexcharts';

// ==============================|| BRAND DONUT CHART CARD ||============================== //

const BrandDonutChart = ({ chartData }) => {
  // const theme = useTheme();

  // const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
  // const matchDownXs = useMediaQuery(theme.breakpoints.down('sm'));

  return <Chart {...chartData} />;
};

BrandDonutChart.propTypes = {
  chartData: PropTypes.object
};

export default BrandDonutChart;
