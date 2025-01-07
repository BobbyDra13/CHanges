import React, { useMemo } from 'react';
import { Card, CardContent, Typography, Grid, Stack, LinearProgress, Skeleton } from '@mui/material';
import Chart from 'react-apexcharts';
import NoDataPng from '../../../assets/images/No_data.png';
import { useTheme } from '@mui/material/styles';

const CaptureProgressSection = ({ avgCapProgress, capProgress }) => {
  const theme = useTheme();
  const accentColDark = theme.palette.success.dark;
  const accentColLight = theme.palette.success.light;
  const accentColMain = theme.palette.success.main;

  const progressChartOptions = useMemo(
    () => ({
      chart: {
        height: 200,
        type: 'radialBar',
        sparkline: { enabled: true }
      },
      colors: [accentColLight],
      plotOptions: {
        radialBar: {
          hollow: { margin: 0, size: '30%' },
          track: {
            dropShadow: {
              enabled: true,
              top: 2,
              left: 0,
              blur: 4,
              opacity: 0.15
            }
          },
          dataLabels: {
            show: false,
            name: {
              offsetY: -10,
              color: '#fff',
              fontSize: '13px'
            },
            value: {
              color: '#fff',
              fontSize: '30px',
              show: false
            }
          }
        }
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          type: 'vertical',
          gradientToColors: [accentColDark],
          stops: [0, 100]
        }
      },
      stroke: { width: 5 }
    }),
    [accentColLight, accentColDark]
  );

  return (
    <Card>
      {avgCapProgress ? (
        <Grid container spacing={2}>
          <Grid item xs={6} sm={4} md={3} lg={7} xl={6}>
            <Chart options={progressChartOptions} series={[parseFloat(avgCapProgress)]} type="radialBar" height={200} />
          </Grid>
          <Grid item alignContent="center" xs={6} sm={8} md={9} lg={5} xl={6}>
            <div className="flex flex-col gap-1">
              <Typography variant="h1" sx={{ color: accentColMain, paddingTop: 8 }}>
                {`${parseFloat(avgCapProgress).toFixed(1)}%`}
              </Typography>
              <Typography variant="h5" color="textSecondary">
                Capture Progress
              </Typography>
            </div>
          </Grid>
        </Grid>
      ) : (
        <>
          <div className="flex justify-center items-center gap-1" style={{ margin: '16px 16px' }}>
            <Typography variant="h5" color="textSecondary">
              Capture Progress
            </Typography>
          </div>
        </>
      )}
      <CardContent
        sx={{
          height: 370,
          [theme.breakpoints.up('md')]: { height: 450 },
          [theme.breakpoints.up('lg')]: { height: 503 }
        }}
        className="overflow-y-auto flex flex-col gap-1 scrollbar"
      >
        <Grid container spacing={2}>
          {capProgress ? (
            capProgress.length > 0 ? (
              capProgress.map((item, key) => (
                <Grid key={key} item xs={12}>
                  <Grid container justifyContent="space-between" alignItems="center" spacing={1}>
                    <Grid item sm zeroMinWidth>
                      <Typography variant="body2">{item.store_name}</Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="body2" align="right">
                        {parseFloat(item.captureProgress).toFixed(1)}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <div className="flex items-center justify-between">
                        <div style={{ width: '88%' }}>
                          <LinearProgress
                            className="cursor-pointer"
                            sx={{
                              borderRadius: 3,
                              height: 5,
                              [theme.breakpoints.up('xl')]: { height: 5 }
                            }}
                            variant="determinate"
                            value={parseFloat(item.captureProgress)}
                            color="primary"
                          />
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
              ))
            ) : (
              <div className="w-full h-full flex justify-center place-items-center">
                <img style={{ width: '100%' }} src={NoDataPng} alt="No data" />
              </div>
            )
          ) : (
            <Stack width="100%" spacing={2}>
              {[...Array(5)].map((_, index) => (
                <Skeleton key={index} animation="wave" variant="rounded" width="100%" height={60} />
              ))}
            </Stack>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CaptureProgressSection;
