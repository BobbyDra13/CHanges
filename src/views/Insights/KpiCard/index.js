// import PropTypes from 'prop-types';
import React from 'react';

// material-ui
// import { useTheme } from '@mui/material/styles';
// import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { Box, Card, Chip, Grid, Stack, Typography } from '@mui/material';

import Chart from 'react-apexcharts';

import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

// ==============================|| REPORT CARD ||============================== //

// const ReportCard = ({ primary, secondary, iconPrimary, color, footerData, iconFooter }) => {
// const ReportCard = ({ primary, secondary, iconPrimary, color, footerData, iconFooter }) => {
const KpiCard = ({ color, chipColor, title, count, percentage, isLoss, chart }) => {
  // const theme = useTheme();
  // const IconPrimary = iconPrimary;
  // const primaryIcon = iconPrimary ? <IconPrimary fontSize="large" /> : null;
  // const IconFooter = iconFooter;
  // const footerIcon = iconFooter ? <IconFooter /> : null;

  return (
    <Card sx={{ paddingTop: 2.25, paddingBottom: 2.25 }}>
      <Stack spacing={0.5}>
        <Box
        // sx={{ background: color }}
        >
          <card
            // container
            // container
            // justifyContent="space-between"
            // sx={{
            //   textAlign: 'center',
            //   padding: theme.spacing(1.2),
            //   pl: 2.5,
            //   pr: 2.5,
            //   color: theme.palette.common.white
            // }}
          >
            {chart && <Chart width={'100%'} {...chart} />}
          </card>
        </Box>
        <Grid container alignItems="center">
          <Grid item>
            <Typography variant="h1" sx={{ color: color, paddingLeft: 2.25, paddingRight: 2.25 }}>
              {count}
            </Typography>
          </Grid>
          {percentage && (
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
          )}
        </Grid>
        <Typography sx={{ paddingLeft: 2.25, paddingRight: 2.25 }} variant="h5" color="textSecondary">
          {title}
        </Typography>
      </Stack>
      {/* <CardContent>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h3" sx={{ color: color }}>
              {primary}
            </Typography>
            <Typography variant="subtitle1" sx={{ marginTop: '.5rem' }}>
              {secondary}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h2" sx={{ color: color }}>
              {primaryIcon}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <Box sx={{ background: color }}>
        <Grid
          container
          justifyContent="space-between"
          sx={{
            textAlign: 'center',
            padding: theme.spacing(1.2),
            pl: 2.5,
            pr: 2.5,
            color: theme.palette.common.white
          }}
        >
          <Grid item>
            <Typography variant="body2">{footerData}</Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2">{footerIcon}</Typography>
          </Grid>
        </Grid>
      </Box> */}
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
