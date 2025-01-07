import React from 'react';
import { Card, CardContent, Typography, Grid, Skeleton } from '@mui/material';
import BrandDonutChart from '../BrandDonutChart';
import NoDataImg from '../../../assets/images/No_data-amico.svg';

const ExceptionsDonut = ({ brandChartOptions, brandFullness, chartHeight, chartType }) => {
  const allZero = !brandFullness || brandFullness.length === 0;

  return (
    <Card>
      <CardContent>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography paddingTop={1} className="self-end" variant="h5" color="inherit">
              Exceptions Distribution
            </Typography>
          </Grid>
        </Grid>

        {allZero ? (
          <div className="w-full h-full flex justify-center place-items-center">
            <img style={{ height: '310px' }} src={NoDataImg} alt="No data" />
          </div>
        ) : brandFullness.length > 0 ? (
          <Grid item>
            <BrandDonutChart
              chartOptions={brandChartOptions}
              chartSeries={brandFullness[0]}
              chartHeight={chartHeight}
              chartType={chartType}
            />
          </Grid>
        ) : (
          <div className="w-full h-full flex justify-center place-items-center">
            <Skeleton variant="circular" width={300} height={310} />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ExceptionsDonut;
