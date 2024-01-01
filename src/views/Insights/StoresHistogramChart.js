import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Card, CardContent, Grid, Stack, Typography } from '@mui/material';

// third-party
import Chart from 'react-apexcharts';

// ==============================|| STORES HISTOGRAM CARD ||============================== //

const StoresHistogramChart = ({ bgColor, chartData, title }) => {
  const theme = useTheme();

  return (
    <Card>
      <CardContent sx={{ padding: 0, paddingBottom: '0 !important' }}>
        <Box color="#fff" bgcolor={bgColor ? bgColor : theme.palette.primary.main} p={3}>
          <Grid container direction="column" spacing={1}>
            <Grid item container justifyContent="space-between" alignItems="center">
              {title && (
                <Grid item>
                  <Grid container spacing={1}>
                    <Stack direction={'row'} spacing={1}>
                      <Typography variant="h3" color="inherit">
                        {title}
                      </Typography>
                      <Typography className="self-end" variant="subtitle1" color="inherit">
                        Stores
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
              )}
              <Grid item>
                <Grid container alignItems="center"></Grid>
              </Grid>
            </Grid>
            {chartData && (
              <Grid item>
                <Chart {...chartData} />
              </Grid>
            )}
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
};

StoresHistogramChart.propTypes = {
  bgColor: PropTypes.string,
  chartData: PropTypes.object,
  // icon: PropTypes.object,
  title: PropTypes.string
  // percentage: PropTypes.string
};

export default StoresHistogramChart;
