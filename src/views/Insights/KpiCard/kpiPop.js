// import PropTypes from 'prop-types';
import React from 'react';

// material-ui
// import { useTheme } from '@mui/material/styles';
// import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { Box, Card, Chip, Grid, Stack, Typography, Skeleton } from '@mui/material';

import Chart from 'react-apexcharts';

import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

// ==============================|| REPORT CARD ||============================== //

const KpiPop = ({ isLoaded, color, chipColor, title, count, percentage, isLoss, chart }) => {
  return (
    <Card sx={{ paddingTop: isLoaded ? 2.25 : 0, paddingBottom: 2.25 }}>
      <Stack spacing={0.5}>
        <Box>
          {isLoaded ? (
            <div className="pb-[18px]">{chart && <Chart width={'100%'} {...chart} />}</div> //className='pb-10'
          ) : (
            <Skeleton animation="wave" variant="rectangular" width={'100%'} height={133} />
          )}
        </Box>
        <Grid container alignItems="center">
          <Grid item>
            {isLoaded ? (
              <Typography variant="h1" sx={{ color: color, paddingLeft: 2.25, paddingRight: 2.25 }}>
                {count}
              </Typography>
            ) : (
              <Skeleton
                sx={{ marginLeft: 2.25, marginTop: 0.75, marginRight: 2.25 }}
                animation="wave"
                variant="rounded"
                width={82}
                height={35}
              />
            )}
          </Grid>
          {isLoaded ? (
            percentage && (
              <Grid item>
                <Chip
                  variant="combined"
                  color={chipColor}
                  icon={
                    <>
                      {!isLoss && <TrendingUpIcon style={{ fontSize: '1rem', color: 'inherit' }} />}
                      {isLoss && <TrendingDownIcon style={{ fontSize: '1rem', color: 'inherit' }} />}
                    </>
                  }
                  label={`${percentage}%`}
                  sx={{ ml: 1.25, pl: 1 }}
                  size="small"
                />
              </Grid>
            )
          ) : (
            <Skeleton sx={{ marginTop: 1.75 }} animation="wave" variant="rounded" width={55} height={26} />
          )}
        </Grid>
        <Typography sx={{ paddingLeft: 2.25, paddingRight: 2.25 }} variant="h5" color="textSecondary">
          {title}
        </Typography>
      </Stack>
    </Card>
  );
};

// ReportCard.propTypes = {
//   primary: PropTypes.string,
//   secondary: PropTypes.string,
//   iconPrimary: PropTypes.object,
//   footerData: PropTypes.string,
//   iconFooter: PropTypes.object,
//   color: PropTypes.string
// };

export default KpiPop;
