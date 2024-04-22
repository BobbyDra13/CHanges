import { React, useState, useEffect } from 'react';

// API imports
import { GetRadarChartData, GetCapProg, GetPopHistogramData, GetAnomaliesCount } from 'api';

// Apex chart import
import Chart from 'react-apexcharts';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Grid, Card, CardContent, Typography, LinearProgress, Box, Stack, TextField, MenuItem, Skeleton, Paper } from '@mui/material';

//project import
import statisticsChartsData from 'data/statistics-charts-data';
import DatePickerComp from './DatePicker';
import BrandDonutChart from './BrandDonutChart';
import BrandChartData from './chart/brand-chart';
import KpiPop from './KpiCard/kpiPop';
import { gridSpacing } from 'config.js';
import AnomaliesBarChart from './AnomaliesBarChart';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

// assets
import NoDataPng from '../../assets/images/No_data.png';
import NoDataImg from '../../assets/images/No_data-amico.svg';
import PoPScoreKPICard from './PoPScoreKPICard';
import AnomalyKPICard from './AnomalyKPICard';

const histogramChartRequirements = {
  totalStores: 150,
  selectOptions: [
    {
      label: 'PoP score',
      value: 'ASUK',
      disabled: false
    }
  ]
};

// ==============================|| DASHBOARD DEFAULT ||============================== //

const Insights = () => {
  const theme = useTheme();
  const accentColDark = theme.palette.success.dark;
  const accentColLight = theme.palette.success.light;
  const accentColMain = theme.palette.success.main;

  const { selectOptions } = histogramChartRequirements;
  const [selected, setSelected] = useState(selectOptions[0].value);
  const [seriesData, setSeriesData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [capProgress, setCapProgress] = useState(false);
  const [avgCapProgress, setAvgCapProgress] = useState(false);
  const [fullness, setFullness] = useState(false);

  const [brandNames, setBrandNames] = useState([]);
  const [brandChartOptions, setBrandChartOptions] = useState(BrandChartData.options);
  const [brandFullness, setBrandFullness] = useState(false);
  const [barChartData, setBarChartData] = useState(false);
  const [anomaliesCount, setAnomaliesCount] = useState([]);
  const [anomaliesLoading, setAnomaliesLoading] = useState(true);
  const [openZone, setOpenZone] = useState(false);

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
        width: 5
      }
      // labels: ['Progress']
    },
    series: [68]
  };

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
        const capBody = {
          date: selectedDate.toString(),
          user_id: '660a457638e022104c155c06'
        };
        const popKpiCardBody = {
          date: selectedDate.toString(),
          user_id: '660a457638e022104c155c06'
        };
        const donutBody = {
          date: selectedDate.toString(),
          user_id: '660a457638e022104c155c06'
        };
        const anomlayBody = {
          date: selectedDate.toString(),
          store_id: '65c74d4112465588b7a4984c'
        };

        setAvgCapProgress(false);
        setCapProgress(false);
        setFullness(false);
        setBarChartData(false);

        try {
          const brandDonutData = await GetRadarChartData(donutBody);
          const CapData = await GetCapProg(capBody);
          const histogramData = await GetPopHistogramData(popKpiCardBody);
          const anomalies = await GetAnomaliesCount(anomlayBody);
          if (anomalies) {
            setAnomaliesLoading(false);
            setAnomaliesCount(anomalies.data);
            console.log('abc', anomalies.data);
          }
          if (CapData) {
            if (CapData.data.length > 0) {
              setAvgCapProgress(CapData.data[0].storeCapturePercentage);
            } else {
              setAvgCapProgress('');
            }
            setCapProgress(CapData.data[0].captureProgressZoneData);
          }
          if (brandDonutData) {
            if (brandDonutData.data.length > 0) {
              console.log('Donut chart data', brandDonutData);
              const extractedFullness = brandDonutData.data.map((item) => [
                item.total_zone_missing_pop,
                item.total_zone_alien_pop,
                item.total_zone_incorrect_pop
              ]);
              const extractedBrandNames = ['alien_pop', 'incorrect_pop', 'missing_pop'];
              setBrandChartOptions({ ...brandChartOptions, labels: extractedBrandNames });
              setBrandFullness(extractedFullness);
              console.log('Brand Fullness', extractedFullness);
              setBrandNames(extractedBrandNames);
              console.log('Brand Names', brandNames);
            } else {
              setBrandFullness([]);
            }
          }

          if (histogramData) {
            setBarChartData(histogramData.data);
            setFullness(true);
            console.log('histogramData', barChartData);
          }
        } catch (error) {
          console.log(error);
        }
      }
      fetchDashboardData();
    }
    //eslint-disable-next-line
    console.log('selectedDate', selectedDate);
    //eslint-disable-next-line
    return () => {
      setBrandFullness(false);
      setSeriesData([]);
    };
    //eslint-disable-next-line
  }, [selectedDate]);

  // console.log('Current anomaly', anomaliesPercentage);
  const allZero = brandFullness && brandFullness[0].every((data) => data === 0);

  useEffect(
    () => {
      if (barChartData) {
        setSelected(histogramChartRequirements.selectOptions[0].value);
        let chart = barChartData[0].data;
        console.log('chartsss', chart);
        let allRanges = chart.map((item) => item.range);
        let allCount = chart.map((item) => item.count);
        let newArray = allRanges.map((range, index) => ({ [range]: allCount[index] }));
        setSeriesData(allCount);
        console.log('newArray', newArray);
        console.log('allRanges', allRanges);
        console.log('allCount', allCount);
      }
    },

    //eslint-disable-next-line
    [barChartData]
  );

  let series = [
    {
      name: 'Bays',
      data: seriesData.map((value, i) => ({
        x: 5 + i * 10,
        y: value
      }))
    }
  ];
  console.log('series', series);

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

        categories: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

        labels: {
          show: true,
          formatter: (x) => x + '%',
          style: {
            colors: '#fff',
            fontWeight: 'bold'
          }
        },
        show: false,
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        }
      },
      yaxis: {
        labels: {
          show: true,
          style: {
            colors: '#fff',
            fontWeight: 'bold'
          },
          formatter: (value) => {
            return Math.round(value);
          }
        },

        title: {
          text: 'Number of Bays',
          style: {
            color: '#fff',
            fontSize: '12px'
          }
        },

        min: 0,
        max: Math.max(...seriesData),
        forceNiceScale: true
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
        show: true
      }
    }
  };

  const allZerHistogram = series && series[0].data.every((data) => data.y === 0);
  console.log('checki', allZerHistogram);

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
            <PoPScoreKPICard date={selectedDate} />
          </Grid>
          <Grid item lg={3} sm={6} xs={12}>
            <KpiPop
              isLoaded={fullness}
              chart={statisticsChartsData[3].chart}
              title="VM Score"
              count="NA"
              percentage="NA"
              // chipColor={
              //   vmc && vmc.differencePercentage && vmc.differencePercentage.withoutAnomalyPercentageDifference < 0 ? 'error' : 'success'
              // }
              // isLoss={vmc && vmc.differencePercentage && vmc.differencePercentage.withoutAnomalyPercentageDifference < 0}
              color={'#9CA3AF'}
              // color={theme.palette.success.main}
            />
          </Grid>
          <Grid item lg={3} sm={6} xs={12}>
            <KpiPop
              isLoaded={fullness}
              chart={statisticsChartsData[2].chart}
              title="OSA"
              count="NA"
              percentage="NA"
              // isLoss
              // chipColor="success"
              color={'#9CA3AF'}
              // color={theme.palette.success.main}
            />
          </Grid>
          <Grid item lg={3} sm={6} xs={12}>
            <AnomalyKPICard date={selectedDate} />
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
                    <Card>
                      {
                        // histogramData
                        seriesData.length > 0 ? (
                          <CardContent sx={{ padding: 0, paddingBottom: '0 !important' }}>
                            <Box color="#fff" bgcolor={theme.palette.primary.main} p={3}>
                              <Grid container justifyContent="space-between" alignItems="center">
                                <Grid item>
                                  <Grid container spacing={1}>
                                    <Stack direction={'row'} spacing={1}>
                                      <Typography sx={{ paddingLeft: 2, visibility: 'hidden' }} variant="h2" color="inherit">
                                        {barChartData?.totalGroups}
                                      </Typography>
                                      <Typography paddingBottom={0.6} className="self-end" variant="h5" color="inherit">
                                        Goodness Histogram
                                      </Typography>
                                    </Stack>
                                  </Grid>
                                </Grid>
                                <Grid item>
                                  <Grid container sx={{ visibility: 'hidden' }} alignItems="center">
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
                                        <MenuItem key={option.value} value={option.value} disabled={option.disabled}>
                                          {option.label}
                                        </MenuItem>
                                      ))}
                                    </TextField>
                                  </Grid>
                                </Grid>
                              </Grid>
                              <Grid className="relative" item>
                                <Chart
                                  options={histogramOptions.options}
                                  series={series}
                                  type={histogramOptions.options.chart.type}
                                  height={histogramOptions.options.chart.height}
                                />
                                {allZerHistogram && (
                                  <div className="w-full h-full flex justify-center items-center text-xl absolute z-40 -mt-80 text-white">
                                    No data available
                                  </div>
                                )}
                              </Grid>
                            </Box>
                          </CardContent>
                        ) : (
                          //  : barChartData[0]?.data?.bayAnalysis['0-10%'] === 9 &&
                          //   vmChartData?.length === 0 &&
                          //   vmc.currentDay.totalAnomalies === 0 &&
                          //   vmc.currentDay.totalCaptureCount === 0 ? (
                          //   <div className="w-full h-full flex justify-center place-items-center">
                          //     <img style={{ height: '392px' }} src={NoDataImg} alt="No data" />
                          //   </div>
                          // ) : vmChartData?.length > 0 && selected === histogramChartRequirements.selectOptions[1].value ? (
                          //   <CardContent sx={{ padding: 0, paddingBottom: '0 !important' }}>
                          //     <Box color="#fff" bgcolor={theme.palette.primary.main} p={3}>
                          //       <Grid container justifyContent="space-between" alignItems="center">
                          //         <Grid item>
                          //           <Grid container spacing={1}>
                          //             <Stack direction={'row'} spacing={1}>
                          //               <Typography sx={{ paddingLeft: 2 }} variant="h2" color="inherit">
                          //                 {barChartData[0]?.data?.totalBaysCount}
                          //               </Typography>
                          //               <Typography paddingBottom={0.6} className="self-end" variant="h5" color="inherit">
                          //                 Bays
                          //               </Typography>
                          //             </Stack>
                          //           </Grid>
                          //         </Grid>
                          //         <Grid item>
                          //           <Grid container alignItems="center">
                          //             <TextField
                          //               id="standard-select-currency"
                          //               size="small"
                          //               select
                          //               value={selected}
                          //               onChange={(e) => setSelected(e.target.value)}
                          //               sx={{
                          //                 '& .MuiInputBase-input': {
                          //                   paddingBottom: 0.5,
                          //                   paddingTop: 0.7,
                          //                   fontSize: '1rem',
                          //                   fontWeight: 600,
                          //                   color: 'white'
                          //                 }
                          //               }}
                          //             >
                          //               {histogramChartRequirements.selectOptions.map((option) => (
                          //                 <MenuItem key={option.value} value={option.value} disabled={option.disabled}>
                          //                   {option.label}
                          //                 </MenuItem>
                          //               ))}
                          //             </TextField>
                          //           </Grid>
                          //         </Grid>
                          //       </Grid>
                          //       <Grid item>
                          //         <Chart
                          //           options={histogramOptions.options}
                          //           series={series}
                          //           type={histogramOptions.options.chart.type}
                          //           height={histogramOptions.options.chart.height}
                          //         />
                          //       </Grid>
                          //     </Box>
                          //   </CardContent>
                          // ) : vmChartData?.length === 0 &&
                          //   vmc.currentDay.totalAnomalies === 0 &&
                          //   vmc.currentDay.totalCaptureCount !== 0 &&
                          //   selected === histogramChartRequirements.selectOptions[1].value ? (
                          //   <CardContent sx={{ padding: 0, paddingBottom: '0 !important' }}>
                          //     <Box color="#fff" bgcolor={theme.palette.primary.main} p={3}>
                          //       <Grid container justifyContent="space-between" alignItems="center">
                          //         <Grid item>
                          //           <Grid container spacing={1}>
                          //             <Stack direction={'row'} spacing={1}>
                          //               <Typography sx={{ paddingLeft: 2 }} variant="h2" color="inherit">
                          //                 {barChartData[0]?.data?.totalBaysCount}
                          //               </Typography>
                          //               <Typography paddingBottom={0.6} className="self-end" variant="h5" color="inherit">
                          //                 Bays
                          //               </Typography>
                          //             </Stack>
                          //           </Grid>
                          //         </Grid>
                          //         <Grid item>
                          //           <Grid container alignItems="center">
                          //             <TextField
                          //               id="standard-select-currency"
                          //               size="small"
                          //               select
                          //               value={selected}
                          //               onChange={(e) => setSelected(e.target.value)}
                          //               sx={{
                          //                 '& .MuiInputBase-input': {
                          //                   paddingBottom: 0.5,
                          //                   paddingTop: 0.7,
                          //                   fontSize: '1rem',
                          //                   fontWeight: 600,
                          //                   color: 'white'
                          //                 }
                          //               }}
                          //             >
                          //               {histogramChartRequirements.selectOptions.map((option) => (
                          //                 <MenuItem key={option.value} value={option.value} disabled={option.disabled}>
                          //                   {option.label}
                          //                 </MenuItem>
                          //               ))}
                          //             </TextField>
                          //           </Grid>
                          //         </Grid>
                          //       </Grid>
                          //       <Grid item>
                          //         <Chart
                          //           options={histogramOptions.options}
                          //           series={series}
                          //           type={histogramOptions.options.chart.type}
                          //           height={histogramOptions.options.chart.height}
                          //         />
                          //       </Grid>
                          //     </Box>
                          //   </CardContent>
                          // )
                          <div className="w-full h-full flex justify-center place-items-center">
                            <Skeleton variant="rounded" width={'100%'} height={392} />
                          </div>
                        )
                      }
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
                                Exceptions Distribution
                              </Typography>
                            </Grid>
                          </Grid>
                          <Grid item>
                            <Grid container sx={{ visibility: 'hidden' }} alignItems="center">
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

                        {allZero ? (
                          <div className="w-full h-full flex justify-center place-items-center">
                            <img style={{ height: '310px' }} src={NoDataImg} alt="No data" />
                          </div>
                        ) : brandFullness.length > 0 ? (
                          <Grid item>
                            <BrandDonutChart
                              chartOptions={brandChartOptions}
                              chartSeries={brandFullness[0]}
                              chartHeight={BrandChartData.height}
                              chartType={BrandChartData.type}
                            />
                          </Grid>
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
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container paddingTop={3} spacing={gridSpacing}>
                <Grid item xs={12}>
                  <Card>
                    <CardContent>
                      <AnomaliesBarChart selectedDate={selectedDate} />
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={3} xs={12}>
            <Stack spacing={gridSpacing}>
              <Card
                className="border border-gray-300 bg-[#ff413a]"
                style={{
                  padding: '10px'
                }}
              >
                <div className="flex w-full h-full">
                  <div className="w-2/6 h-full flex flex-col">
                    <span className="text-center text-white text-sm font-semibold">Missing</span>
                    {!anomaliesLoading ? (
                      <span className="text-center text-white  flex-grow flex flex-col justify-center text-3xl font-semibold">
                        {anomaliesCount[0].totalMissingPopCount}
                      </span>
                    ) : (
                      <Skeleton variant="rectangular" height={45} className="rounded-md" />
                    )}
                  </div>
                  <div className="w-2/6 h-full flex flex-col border-2 border-t-0 border-b-0 border-l-white border-r-white">
                    <span className="text-center text-white  text-sm font-semibold">Alien</span>
                    {!anomaliesLoading ? (
                      <span className="text-center text-white  flex-grow flex flex-col justify-center text-3xl font-semibold">
                        {anomaliesCount[0].totalAlienPopCount}
                      </span>
                    ) : (
                      <Skeleton variant="rectangular" height={45} className="rounded-md" />
                    )}
                  </div>
                  <div className="w-2/6 h-full flex flex-col">
                    <span className="text-center text-white  text-sm font-semibold">Incorrect</span>
                    {!anomaliesLoading ? (
                      <span className="text-center text-white  flex-grow flex flex-col justify-center text-3xl font-semibold">
                        {anomaliesCount[0].totalIncorrectPopCount}
                      </span>
                    ) : (
                      <Skeleton variant="rectangular" height={45} className="rounded-md" />
                    )}
                  </div>
                </div>
              </Card>
              <Card>
                <Grid container spacing={gridSpacing}>
                  <Grid item xs={6} sm={4} md={3} lg={7} xl={6}>
                    <Chart
                      options={progressChart.options}
                      series={avgCapProgress ? [parseFloat(avgCapProgress)] : [0]}
                      type={progressChart.options.chart.type}
                      height={progressChart.options.chart.height}
                    />
                  </Grid>
                  <Grid item alignContent={'center'} xs={6} sm={8} md={9} lg={5} xl={6}>
                    <div className="flex flex-col gap-1">
                      <Typography variant="h1" sx={{ color: accentColMain, paddingTop: 8 }}>
                        {avgCapProgress ? (
                          `${parseFloat(avgCapProgress).toFixed(1)}%`
                        ) : avgCapProgress === 0 ? ( //edited as zero from ''
                          '0%'
                        ) : (
                          <Stack spacing={0.5}>
                            <Skeleton animation="wave" variant="rounded" width={60} height={10} />
                            <Skeleton animation="wave" variant="rounded" width={75} height={10} />
                            <Skeleton animation="wave" variant="rounded" width={90} height={10} />
                          </Stack>
                        )}
                      </Typography>
                      <Typography variant="h5" color="textSecondary">
                        Capture Progress
                      </Typography>
                    </div>
                  </Grid>
                </Grid>
                <CardContent
                  sx={{
                    height: 370,
                    [theme.breakpoints.up('md')]: {
                      height: 450 // Height for screens equal to or larger than 'md' breakpoint
                    },
                    [theme.breakpoints.up('lg')]: {
                      height: 503 // Height for screens equal to or larger than 'lg' breakpoint
                    }
                  }}
                  className="overflow-y-auto flex flex-col gap-1 scrollbar"
                >
                  <Grid container spacing={gridSpacing}>
                    {capProgress ? (
                      // capProgress.map((item) => (
                      <Grid item xs={12}>
                        <Grid container justifyContent={'space-between'} alignItems="center" spacing={1}>
                          <Grid item sm zeroMinWidth>
                            {/* <Typography variant="body2">{item.store_id}</Typography> */}
                          </Grid>
                          <Grid item>
                            <Typography variant="body2" align="right">
                              {/* {Math.floor(item.capture_percentage)}% */}
                              {parseFloat(avgCapProgress).toFixed(1)}
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

                                    [theme.breakpoints.up('xl')]: {
                                      height: 5 // Height for screens equal to or larger than 'lg' breakpoint
                                    }
                                  }}
                                  variant="determinate"
                                  aria-label="direct"
                                  // value={Math.floor(item.capture_percentage)}
                                  value={parseFloat(avgCapProgress)}
                                  color="primary"

                                  // onScroll={()=>setOpenZone(false)}
                                />
                              </div>
                              {openZone ? (
                                <FaEyeSlash className="cursor-pointer" onClick={() => setOpenZone(!openZone)} />
                              ) : (
                                <FaEye className="cursor-pointer" onClick={() => setOpenZone(!openZone)} />
                              )}
                            </div>
                            {openZone && (
                              <Paper className="mt-10 p-5" elevation={10}>
                                <Typography variant="h4">Zone wise Capture Progress</Typography>
                                {capProgress.length > 0 &&
                                  capProgress.map((item, index) => (
                                    <div key={index}>
                                      <Typography key={index} className="m-2" variant="body1" color="initial">
                                        {item.zone_id} - {item.capturePercentage}%
                                      </Typography>
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
                                        value={parseFloat(item.capturePercentage)}
                                        color="primary"
                                        // onClick={()=>(setOpenZone(!openZone))}
                                      />
                                    </div>
                                  ))}
                              </Paper>
                            )}
                          </Grid>
                          {/* <Grid item sm zeroMinWidth>
                          <Typography variant="body2">1:00 PM</Typography>
                        </Grid> */}
                        </Grid>
                      </Grid>
                    ) : // ))
                    capProgress.length === 0 ? (
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
                  </Grid>
                </CardContent>
              </Card>
            </Stack>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Insights;
