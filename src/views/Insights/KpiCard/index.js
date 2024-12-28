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

const KpiCard = ({ isLoaded, color, chipColor, title, count, percentage, isLoss, chart }) => {
  return (
    <Card sx={{ paddingTop: isLoaded ? 2.25 : 0, paddingBottom: 2.25 }}>
      <Stack spacing={0.5}>
      <Typography sx={{color: color, paddingLeft: 2.25, paddingRight: 2.25 }} variant="h3" color="textSecondary">
          {title}
        </Typography>
      <Grid container alignItems="center">
          <Grid item>
            {isLoaded ? (
              <Typography variant="h3" sx={{ color: color, paddingLeft: 2.25, paddingRight: 2.25 }}>
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
            <Grid item>
              <Chip
                variant="combined"
                sx={{ backgroundColor: chipColor, color: 'white', ml: 1.25, pl: 1 }}
                icon={
                  <>
                    {!isLoss && <TrendingUpIcon style={{ fontSize: '1rem', color: 'inherit' }} />}
                    {isLoss && <TrendingDownIcon style={{ fontSize: '1rem', color: 'inherit' }} />}
                  </>
                }
                label={`${percentage}`}
                size="small"
              />
            </Grid>
          ) : (
            <Skeleton sx={{ marginTop: 1.75 }} animation="wave" variant="rounded" width={55} height={26} />
          )}
        </Grid>
        
        <Box>
          {isLoaded ? (
            <div>{chart && <Chart width={'100%'} {...chart} />}</div> //className='pb-10'
          ) : (
            <Skeleton animation="wave" variant="rectangular" width={'100%'} height={133} />
          )}
        </Box>
        
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

export default KpiCard;
