import { React, useState, useEffect } from 'react';

// material-ui
import {
  useTheme
  // styled
} from '@mui/material/styles';
// import Box from '@mui/material';
import {
  Grid,
  Card,
  // CardHeader,
  CardContent,
  Typography,
  // Divider,
  LinearProgress,
  Box,
  Stack,
  TextField,
  MenuItem
} from '@mui/material';

//project import
// import SalesLineCard from './SalesLineCard';
// import SalesLineCardData from './chart/sale-chart-1';
// import StoresBarChartCard from './StoresBarChartCard';
// import StoresBarCardData from './chart/stores-chart';
import statisticsChartsData from 'data/statistics-charts-data';
import DatePickerComp from './DatePicker';
import BrandDonutChart from './BrandDonutChart';
import BrandChartData from './chart/brand-chart';
import KpiCard from './KpiCard';
import { gridSpacing } from 'config.js';

// import AnomaliesChartCard from './AnomaliesChartCard';
import AnomaliesBarChart from './AnomaliesBarChart';
// import AnomaliesBarCardData from './chart/anomalies-chart';

import Chart from 'react-apexcharts';

// assets
// import TrendingUpIcon from '@mui/icons-material/TrendingUp';
// import TrendingDownIcon from '@mui/icons-material/TrendingDown';
// import MonetizationOnTwoTone from '@mui/icons-material/MonetizationOnTwoTone';
// import DescriptionTwoTone from '@mui/icons-material/DescriptionTwoTone';
// import ThumbUpAltTwoTone from '@mui/icons-material/ThumbUpAltTwoTone';
// import CalendarTodayTwoTone from '@mui/icons-material/CalendarTodayTwoTone';
// import BusinessTwoToneIcon from '@mui/icons-material/BusinessTwoTone';
// import CenterFocusStrongTwoToneIcon from '@mui/icons-material/CenterFocusStrongTwoTone';
// import StoreTwoToneIcon from '@mui/icons-material/StoreTwoTone';
// import LocalOfferTwoToneIcon from '@mui/icons-material/LocalOfferTwoTone';
// import ColorLensTwoToneIcon from '@mui/icons-material/ColorLensTwoTone';
// import CategoryTwoToneIcon from '@mui/icons-material/CategoryTwoTone';

// custom style
// const FlatCardBlock = styled((props) => <Grid item sm={6} xs={12} {...props} />)(({ theme }) => ({
//   padding: '25px 25px',
//   borderLeft: '1px solid' + theme.palette.background.default,
//   [theme.breakpoints.down('sm')]: {
//     borderLeft: 'none',
//     borderBottom: '1px solid' + theme.palette.background.default
//   },
//   [theme.breakpoints.down('md')]: {
//     borderBottom: '1px solid' + theme.palette.background.default
//   }
// }));

const histogramData = {
  asuk: [5, 10, 20, 25, 30, 35, 25, 15, 3, 2],
  vmc: [10, 20, 30, 25, 15, 10, 15, 20, 17, 8],
  dpe: [8, 15, 25, 40, 30, 10, 10, 5, 5, 12]
};

const histogramChartRequirements = {
  totalStores: 150,
  selectOptions: [
    {
      label: 'Avg. shelf Up-keep',
      value: 'ASUK'
    },
    {
      label: 'Vis. Merch. Compliance',
      value: 'VMC'
    },
    {
      label: 'Disc. & promos exe.',
      value: 'DPE'
    }
  ]
};

// ==============================|| DASHBOARD DEFAULT ||============================== //

const Insights = () => {
  const theme = useTheme();
  const accentColDark = theme.palette.success.dark;
  const accentColLight = theme.palette.success.light;
  const accentColMain = theme.palette.success.main;

  const { totalStores } = histogramChartRequirements;
  const { selectOptions } = histogramChartRequirements;
  const [selected, setSelected] = useState(selectOptions[0].value);
  const [seriesData, setSeriesData] = useState(histogramData.asuk);
  const [selectedDate, setSelectedDate] = useState('');

  console.log('DATE SELECTED', selectedDate);

  let series = [
    {
      name: 'stores',
      data: seriesData.map((value, i) => ({
        x: 5 + i * 10,
        y: value
      }))
    }
  ];

  const histogramOptions = {
    options: {
      chart: {
        type: 'bar',
        height: 297,
        toolbar: {
          show: false
        }
      },
      colors: ['#fff'],
      plotOptions: {
        bar: {
          columnWidth: '65%',
          borderRadius: 4
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        type: 'numeric',
        min: 0,
        max: 100,
        tickAmount: 10,
        labels: {
          show: false,
          formatter: (x) => x
        },
        show: false,
        // categories: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        }
      },
      yaxis: {
        show: false,
        min: 0,
        max: Math.max(...seriesData)
      },
      tooltip: {
        theme: 'dark',
        x: {
          formatter: (x) => {
            return 'Range: ' + (x - 5) + '-' + (x + 5) + ' %';
          }
        }
      },
      grid: {
        show: false
      }
    }
  };

  const progressChart = {
    options: {
      chart: {
        height: 200,
        type: 'radialBar',
        sparkline: {
          enabled: true
        }
      },
      colors: [accentColLight],
      plotOptions: {
        radialBar: {
          hollow: {
            margin: 0,
            size: '30%'
            // background: '#293450'
          },
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
      stroke: {
        // lineCap: 'round'
      }
      // labels: ['Progress']
    },
    series: [68]
  };

  useEffect(() => {
    switch (selected) {
      case 'ASUK':
        setSeriesData(histogramData.asuk);
        break;
      case 'VMC':
        setSeriesData(histogramData.vmc);
        break;
      case 'DPE':
        setSeriesData(histogramData.dpe);
        break;
      default:
      // Handle default case
    }
  }, [selected]);

  return (
    <Grid container spacing={gridSpacing}>
      <Grid
        item
        xs={12}
        sx={{
          mb: -1,
          mt: 1,
          [theme.breakpoints.up('sm')]: {
            mb: -1,
            mt: 1 // Height for screens equal to or larger than 'md' breakpoint
          },
          [theme.breakpoints.up('md')]: {
            mb: -1,
            mt: -1 // Height for screens equal to or larger than 'md' breakpoint
          }
        }}
      >
        <Stack direction={'row'} justifyContent={'space-between'}>
          <Typography variant="h3">Insights</Typography>
          <Box>
            <DatePickerComp SetSelectedDate={setSelectedDate} />
          </Box>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={3} sm={6} xs={12}>
            <KpiCard
              chart={statisticsChartsData[1].chart}
              title="Average Shelf Up-keep"
              count="86%"
              percentage={0.5}
              chipColor="success"
              color={theme.palette.success.main}
            />
          </Grid>
          <Grid item lg={3} sm={6} xs={12}>
            <KpiCard
              chart={statisticsChartsData[2].chart}
              title="Visual Merchandising Compliance"
              count="78%"
              percentage={2}
              chipColor="warning"
              color={theme.palette.warning.main}
            />
          </Grid>
          <Grid item lg={3} sm={6} xs={12}>
            <KpiCard
              chart={statisticsChartsData[3].chart}
              title="Discounts & promos execution"
              count="68%"
              percentage={0.5}
              isLoss
              chipColor="error"
              color={theme.palette.error.main}
            />
          </Grid>
          <Grid item lg={3} sm={6} xs={12}>
            <KpiCard
              chart={statisticsChartsData[4].chart}
              title="Anomalies Found"
              count="27"
              percentage={0.5}
              isLoss
              chipColor="warning"
              color={theme.palette.warning.main}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={9} xs={12}>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12} md={7}>
                <Grid container spacing={gridSpacing}>
                  <Grid item xs={12}>
                    {/* <SalesLineCard chartData={SalesLineCardData} title="150" percentage="3%" icon={<TrendingDownIcon />} /> */}
                    {/* <StoresBarChartCard chartData={StoresBarCardData} title="150" percentage="3%" icon={<TrendingDownIcon />} /> */}
                    <Card>
                      <CardContent sx={{ padding: 0, paddingBottom: '0 !important' }}>
                        <Box
                          color="#fff"
                          // bgcolor={bgColor ? bgColor : theme.palette.primary.main}
                          bgcolor={theme.palette.primary.main}
                          p={3}
                        >
                          <Grid container justifyContent="space-between" alignItems="center">
                            <Grid item>
                              <Grid container spacing={1}>
                                <Stack direction={'row'} spacing={1}>
                                  <Typography variant="h2" color="inherit">
                                    {totalStores}
                                  </Typography>
                                  <Typography paddingBottom={0.6} className="self-end" variant="h5" color="inherit">
                                    Stores
                                  </Typography>
                                </Stack>
                              </Grid>
                            </Grid>
                            <Grid item>
                              <Grid container alignItems="center">
                                <TextField
                                  id="standard-select-currency"
                                  size="small"
                                  select
                                  value={selected}
                                  onChange={(e) => setSelected(e.target.value)}
                                  sx={{
                                    '& .MuiInputBase-input': {
                                      paddingBottom: 0.5,
                                      paddingTop: 0.7,
                                      fontSize: '1rem',
                                      fontWeight: 600,
                                      color: 'white'
                                    }
                                  }}
                                >
                                  {histogramChartRequirements.selectOptions.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                      {option.label}
                                    </MenuItem>
                                  ))}
                                </TextField>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item>
                            <Chart
                              options={histogramOptions.options}
                              series={series}
                              type={histogramOptions.options.chart.type}
                              height={histogramOptions.options.chart.height}
                            />
                          </Grid>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={5}>
                <Grid container spacing={gridSpacing}>
                  <Grid item xs={12}>
                    <Card>
                      <CardContent>
                        <Grid container justifyContent="space-between" alignItems="center">
                          <Grid item>
                            <Grid container spacing={1}>
                              <Typography paddingTop={1} className="self-end" variant="h5" color="inherit">
                                Brand Fullness
                              </Typography>
                            </Grid>
                          </Grid>
                          <Grid item>
                            <Grid container alignItems="center">
                              <TextField
                                id="standard-select-currency"
                                size="small"
                                select
                                value={selected}
                                onChange={(e) => setSelected(e.target.value)}
                                sx={{
                                  '& .MuiInputBase-input': {
                                    paddingBottom: 0.5,
                                    paddingTop: 0.7,
                                    fontSize: '1rem',
                                    fontWeight: 600
                                    // color: 'white'
                                  }
                                }}
                              >
                                {histogramChartRequirements.selectOptions.map((option) => (
                                  <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                  </MenuItem>
                                ))}
                              </TextField>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item>
                          <BrandDonutChart chartData={BrandChartData} />
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
                {/* <RevenuChartCard chartData={RevenuChartCardData} /> */}
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container paddingTop={3} spacing={gridSpacing}>
                <Grid item xs={12}>
                  <Card>
                    {/* <CardHeader
                      title={
                        <Typography component="div" className="card-header">
                          Anomalies Resolved
                        </Typography>
                      }
                    />
                    <Divider /> */}
                    <CardContent>
                      {/* <AnomaliesChartCard chartData={AnomaliesBarCardData} /> */}
                      <AnomaliesBarChart />
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={3} xs={12}>
            <Card>
              {/* <CardHeader
                title={
                  <Typography component="div" className="card-header">
                    Capture Progress
                  </Typography>
                }
              /> */}
              <Grid container spacing={gridSpacing}>
                <Grid item xs={6} sm={4} md={3} lg={7} xl={6}>
                  <Chart
                    options={progressChart.options}
                    series={progressChart.series}
                    type={progressChart.options.chart.type}
                    height={progressChart.options.chart.height}
                  />
                </Grid>
                <Grid item alignContent={'center'} xs={6} sm={8} md={9} lg={5} xl={6}>
                  {/* <Grid container spacing={gridSpacing}> */}
                  <div className="flex flex-col gap-1">
                    <Typography variant="h1" sx={{ color: accentColMain, paddingTop: 8 }}>
                      68 %
                    </Typography>
                    <Typography variant="h5" color="textSecondary">
                      Capture Progress
                    </Typography>
                  </div>
                  {/* </Grid> */}
                </Grid>
              </Grid>
              {/* <Divider /> */}
              <CardContent
                sx={{
                  height: 370,
                  [theme.breakpoints.up('md')]: {
                    height: 450 // Height for screens equal to or larger than 'md' breakpoint
                  },
                  [theme.breakpoints.up('lg')]: {
                    height: 607 // Height for screens equal to or larger than 'lg' breakpoint
                  }
                }}
                className="overflow-y-auto flex flex-col gap-1 scrollbar"
              >
                <Grid container spacing={gridSpacing}>
                  <Grid item xs={12}>
                    <Grid container justifyContent={'space-between'} alignItems="center" spacing={1}>
                      <Grid item sm zeroMinWidth>
                        <Typography variant="body2">TU30</Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="body2" align="right">
                          80%
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <LinearProgress
                          sx={{
                            borderRadius: 3,
                            height: 5,
                            [theme.breakpoints.up('xl')]: {
                              height: 5 // Height for screens equal to or larger than 'lg' breakpoint
                            }
                          }}
                          variant="determinate"
                          aria-label="direct"
                          value={80}
                          color="primary"
                        />
                      </Grid>
                      <Grid item sm zeroMinWidth>
                        <Typography variant="body2">1:00 PM</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Insights;
