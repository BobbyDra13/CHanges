import PropTypes from 'prop-types';
import React from 'react';

// material-ui
// import { useTheme } from '@mui/material/styles';
import // Box,
// Card,
// CardContent,
// CardHeader,
// Divider,
// Grid,
// Typography,
// useMediaQuery
'@mui/material';

// third-party
import Chart from 'react-apexcharts';

// ==============================|| BRAND DONUT CHART CARD ||============================== //

const BrandDonutChart = ({ chartOptions, chartSeries, chartHeight, chartType }) => {
  // const theme = useTheme();

  // const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
  // const matchDownXs = useMediaQuery(theme.breakpoints.down('sm'));

  return <Chart options={chartOptions} series={chartSeries} height={chartHeight} type={chartType} />;
};

BrandDonutChart.propTypes = {
  chartData: PropTypes.object
};

export default BrandDonutChart;
