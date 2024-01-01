import { React, useState, useEffect } from 'react';

<<<<<<< HEAD
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
=======
// API imports
import { GetCaptureProgress, GetBrandDonutData, GetFullnessKpi, GetAnomaliesKpi, GetAnomaliesBarChartData } from 'api';

// Apex chart import
import Chart from 'react-apexcharts';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Grid, Card, CardContent, Typography, LinearProgress, Box, Stack, TextField, MenuItem, Skeleton } from '@mui/material';

//project import
>>>>>>> 2a90240c57e011d4a69c4ed616d203686d2904b6
import statisticsChartsData from 'data/statistics-charts-data';
import DatePickerComp from './DatePicker';
import BrandDonutChart from './BrandDonutChart';
import BrandChartData from './chart/brand-chart';
import KpiCard from './KpiCard';
import { gridSpacing } from 'config.js';
<<<<<<< HEAD

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
=======
import AnomaliesBarChart from './AnomaliesBarChart';

// assets
import NoDataPng from '../../assets/images/No_data.png';
import NoDataImg from '../../assets/images/No_data-amico.svg';
>>>>>>> 2a90240c57e011d4a69c4ed616d203686d2904b6

const histogramData = {
  asuk: [5, 10, 20, 25, 30, 35, 25, 15, 3, 2],
  vmc: [10, 20, 30, 25, 15, 10, 15, 20, 17, 8],
  dpe: [8, 15, 25, 40, 30, 10, 10, 5, 5, 12]
};

const histogramChartRequirements = {
  totalStores: 150,
  selectOptions: [
    {
<<<<<<< HEAD
      label: 'Avg. shelf Up-keep',
=======
      label: 'Avg. shelf-fullness',
>>>>>>> 2a90240c57e011d4a69c4ed616d203686d2904b6
      value: 'ASUK'
    },
    {
      label: 'Vis. Merch. Compliance',
      value: 'VMC'
    },
    {
<<<<<<< HEAD
      label: 'Disc. & promos exe.',
=======
      label: 'Disc. & Promos Exe.',
>>>>>>> 2a90240c57e011d4a69c4ed616d203686d2904b6
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
<<<<<<< HEAD

  console.log('DATE SELECTED', selectedDate);
=======
  const [capProgress, setCapProgress] = useState(false);
  const [avgCapProgress, setAvgCapProgress] = useState(false);
  const [fullness, setFullness] = useState(false);
  const [anomalies, setAnomalies] = useState(false);
  const [brandDonut, setBrandDonut] = useState(false);
  const [brandChartOptions, setBrandChartOptions] = useState(BrandChartData.options);
  const [brandFullness, setBrandFullness] = useState([]);
  // const [brandNames, setBrandNames] = useState([]);

  // console.log('DATE SELECTED', selectedDate);
>>>>>>> 2a90240c57e011d4a69c4ed616d203686d2904b6

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

<<<<<<< HEAD
=======
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    // Set the component to be mounted when the effect is run
    setIsMounted(true);

    // Return a cleanup function to set the component to unmounted
    return () => {
      setIsMounted(false);
    };
  }, []);
  // ------------------------

  useEffect(() => {
    /* eslint-disable no-inner-declarations */
    if (isMounted) {
      async function fetchDashboardData() {
        const commonBody = {
          start_date: selectedDate.toString(),
          Store_IDs: ['6582be9ac5ed94d792a563b8']
        };
        const brandDonutBody = {
          start_date: selectedDate.toString(),
          Store_IDs: ['6582be9ac5ed94d792a563b8']
        };
        setAvgCapProgress(false);
        setCapProgress(false);
        setFullness(false);
        setAnomalies(false);
        setBrandDonut(false);

        try {
          const [capProgressData, brandDonutData, fullnessKpiData, anomaliesKpiData, anomaliesBarChartData] = await Promise.all([
            GetCaptureProgress(commonBody),
            GetBrandDonutData(brandDonutBody),
            GetFullnessKpi(commonBody),
            GetAnomaliesKpi(commonBody),
            GetAnomaliesBarChartData(commonBody)
          ]);

          if (capProgressData) {
            if (capProgressData.data.length > 0) {
              const totalCapturePercentage = capProgressData.data.reduce((acc, item) => acc + item.capture_percentage, 0);
              const average = totalCapturePercentage / capProgressData.data.length;
              setAvgCapProgress(Math.floor(average));
            } else {
              setAvgCapProgress('');
              // setCapProgress('');
            }
            setCapProgress(capProgressData.data);
          }

          if (brandDonutData) {
            // console.log('Brand Data', brandDonutData);
            if (brandDonutData.data.length > 0) {
              const extractedFullness = brandDonutData.data.map((item) => item.fullness);
              const extractedBrandNames = brandDonutData.data.map((item) => item.brand_name);

              setBrandChartOptions({ ...brandChartOptions, labels: extractedBrandNames });

              setBrandFullness(extractedFullness);
              // setBrandNames(extractedBrandNames);
            }
            setBrandDonut(brandDonutData.data);
          }

          if (fullnessKpiData) {
            setFullness(fullnessKpiData.data);
          }

          if (anomaliesKpiData) {
            setAnomalies(anomaliesKpiData.data.toString());
          }

          if (anomaliesBarChartData) {
            setAnomalies(anomaliesKpiData.data.toString());
          }
        } catch (error) {
          console.log(error);
        }
      }
      fetchDashboardData();
    }
    /* eslint-enable no-inner-declarations */
  }, [selectedDate]);

>>>>>>> 2a90240c57e011d4a69c4ed616d203686d2904b6
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
<<<<<<< HEAD
              chart={statisticsChartsData[1].chart}
              title="Average Shelf Up-keep"
              count="86%"
=======
              isLoaded={fullness}
              chart={statisticsChartsData[1].chart}
              title="Average Shelf-fullness"
              count={fullness.length > 0 ? `${Math.floor(fullness[0].fullness)}%` : `0%`}
>>>>>>> 2a90240c57e011d4a69c4ed616d203686d2904b6
              percentage={0.5}
              chipColor="success"
              color={theme.palette.success.main}
            />
          </Grid>
          <Grid item lg={3} sm={6} xs={12}>
            <KpiCard
<<<<<<< HEAD
              chart={statisticsChartsData[2].chart}
              title="Visual Merchandising Compliance"
              count="78%"
              percentage={2}
              chipColor="warning"
              color={theme.palette.warning.main}
=======
              isLoaded={fullness}
              chart={statisticsChartsData[2].chart}
              title="Visual Merchandising Compliance"
              count="0%"
              percentage={2}
              chipColor="success"
              color={theme.palette.success.main}
>>>>>>> 2a90240c57e011d4a69c4ed616d203686d2904b6
            />
          </Grid>
          <Grid item lg={3} sm={6} xs={12}>
            <KpiCard
<<<<<<< HEAD
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
=======
              isLoaded={fullness}
              chart={statisticsChartsData[3].chart}
              title="Discounts & Promos Execution"
              count="0%"
              percentage={0.5}
              // isLoss
              chipColor="success"
              color={theme.palette.success.main}
            />
          </Grid>
          <Grid item lg={3} sm={6} xs={12}>
            <KpiCard
              isLoaded={anomalies}
              chart={statisticsChartsData[4].chart}
              title="Anomalies Found"
              count={anomalies && anomalies}
              percentage={0.5}
              isLoss
              chipColor="error"
              // chipColor="success"
              // chipColor="warning"
              color={theme.palette.error.main}
            />
          </Grid>
>>>>>>> 2a90240c57e011d4a69c4ed616d203686d2904b6
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={9} xs={12}>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12} md={7}>
                <Grid container spacing={gridSpacing}>
                  <Grid item xs={12}>
<<<<<<< HEAD
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
=======
                    <Card>
                      {brandDonut.length > 0 ? (
                        <CardContent sx={{ padding: 0, paddingBottom: '0 !important' }}>
                          <Box color="#fff" bgcolor={theme.palette.primary.main} p={3}>
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
                      ) : brandDonut.length === 0 ? (
                        <div className="w-full h-full flex justify-center place-items-center">
                          <img style={{ height: '392px' }} src={NoDataImg} alt="No data" />
                        </div>
                      ) : (
                        <div className="w-full h-full flex justify-center place-items-center">
                          <Skeleton variant="rounded" width={'100%'} height={392} />
                        </div>
                      )}
>>>>>>> 2a90240c57e011d4a69c4ed616d203686d2904b6
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
<<<<<<< HEAD
                            <Grid container alignItems="center">
=======
                            <Grid container sx={{ visibility: 'hidden' }} alignItems="center">
>>>>>>> 2a90240c57e011d4a69c4ed616d203686d2904b6
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
<<<<<<< HEAD
                        <Grid item>
                          <BrandDonutChart chartData={BrandChartData} />
                        </Grid>
=======

                        {brandDonut.length > 0 ? (
                          <Grid item>
                            <BrandDonutChart
                              chartOptions={brandChartOptions}
                              chartSeries={brandFullness}
                              chartHeight={BrandChartData.height}
                              chartType={BrandChartData.type}
                            />
                          </Grid>
                        ) : brandDonut.length === 0 ? (
                          // <BrandDonutChart
                          //   chartOptions={brandChartOptions}
                          //   chartSeries={[0]}
                          //   chartHeight={BrandChartData.height}
                          //   chartType={BrandChartData.type}
                          // />
                          <div className="w-full h-full flex justify-center place-items-center">
                            <img style={{ height: '310px' }} src={NoDataImg} alt="No data" />
                          </div>
                        ) : (
                          <div className="w-full h-full flex justify-center place-items-center">
                            <Skeleton variant="circular" width={300} height={310} />
                          </div>
                        )}

                        {/* <Grid item>
                          <BrandDonutChart
                            chartOptions={brandChartOptions}
                            chartSeries={brandFullness}
                            chartHeight={BrandChartData.height}
                            chartType={BrandChartData.type}
                          />
                        </Grid> */}
                        {/* <BrandDonutChart chartData={BrandChartData} /> */}
>>>>>>> 2a90240c57e011d4a69c4ed616d203686d2904b6
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
<<<<<<< HEAD
                {/* <RevenuChartCard chartData={RevenuChartCardData} /> */}
=======
>>>>>>> 2a90240c57e011d4a69c4ed616d203686d2904b6
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container paddingTop={3} spacing={gridSpacing}>
                <Grid item xs={12}>
                  <Card>
<<<<<<< HEAD
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
=======
                    <CardContent>
                      <AnomaliesBarChart date={selectedDate} />
>>>>>>> 2a90240c57e011d4a69c4ed616d203686d2904b6
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={3} xs={12}>
            <Card>
<<<<<<< HEAD
              {/* <CardHeader
                title={
                  <Typography component="div" className="card-header">
                    Capture Progress
                  </Typography>
                }
              /> */}
=======
>>>>>>> 2a90240c57e011d4a69c4ed616d203686d2904b6
              <Grid container spacing={gridSpacing}>
                <Grid item xs={6} sm={4} md={3} lg={7} xl={6}>
                  <Chart
                    options={progressChart.options}
<<<<<<< HEAD
                    series={progressChart.series}
=======
                    series={avgCapProgress ? [avgCapProgress] : [0]}
>>>>>>> 2a90240c57e011d4a69c4ed616d203686d2904b6
                    type={progressChart.options.chart.type}
                    height={progressChart.options.chart.height}
                  />
                </Grid>
                <Grid item alignContent={'center'} xs={6} sm={8} md={9} lg={5} xl={6}>
<<<<<<< HEAD
                  {/* <Grid container spacing={gridSpacing}> */}
                  <div className="flex flex-col gap-1">
                    <Typography variant="h1" sx={{ color: accentColMain, paddingTop: 8 }}>
                      68 %
=======
                  <div className="flex flex-col gap-1">
                    <Typography variant="h1" sx={{ color: accentColMain, paddingTop: 8 }}>
                      {avgCapProgress ? (
                        `${avgCapProgress}%`
                      ) : avgCapProgress === '' ? (
                        '0%'
                      ) : (
                        <Stack spacing={0.5}>
                          <Skeleton animation="wave" variant="rounded" width={60} height={10} />
                          <Skeleton animation="wave" variant="rounded" width={75} height={10} />
                          <Skeleton animation="wave" variant="rounded" width={90} height={10} />
                        </Stack>
                      )}
>>>>>>> 2a90240c57e011d4a69c4ed616d203686d2904b6
                    </Typography>
                    <Typography variant="h5" color="textSecondary">
                      Capture Progress
                    </Typography>
                  </div>
<<<<<<< HEAD
                  {/* </Grid> */}
                </Grid>
              </Grid>
              {/* <Divider /> */}
=======
                </Grid>
              </Grid>
>>>>>>> 2a90240c57e011d4a69c4ed616d203686d2904b6
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
<<<<<<< HEAD
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
=======
                  {capProgress.length > 0 ? (
                    capProgress.map((item) => (
                      <Grid key={item._id} item xs={12}>
                        <Grid container justifyContent={'space-between'} alignItems="center" spacing={1}>
                          <Grid item sm zeroMinWidth>
                            <Typography variant="body2">{item.store_id}</Typography>
                          </Grid>
                          <Grid item>
                            <Typography variant="body2" align="right">
                              {Math.floor(item.capture_percentage)}%
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
                              value={Math.floor(item.capture_percentage)}
                              color="primary"
                            />
                          </Grid>
                          {/* <Grid item sm zeroMinWidth>
                          <Typography variant="body2">1:00 PM</Typography>
                        </Grid> */}
                        </Grid>
                      </Grid>
                    ))
                  ) : capProgress.length === 0 ? (
                    <div className="w-full h-full flex justify-center place-items-center">
                      <img style={{ width: '100%' }} src={NoDataPng} alt="No data" />
                    </div>
                  ) : (
                    // <>No data</>
                    <Stack paddingLeft={gridSpacing} width={'100%'} spacing={gridSpacing}>
                      <Skeleton animation="wave" variant="rounded" width={'100%'} height={60} />
                      <Skeleton animation="wave" variant="rounded" width={'100%'} height={60} />
                      <Skeleton animation="wave" variant="rounded" width={'100%'} height={60} />
                      <Skeleton animation="wave" variant="rounded" width={'100%'} height={60} />
                      <Skeleton animation="wave" variant="rounded" width={'100%'} height={60} />
                    </Stack>
                  )}
>>>>>>> 2a90240c57e011d4a69c4ed616d203686d2904b6
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
