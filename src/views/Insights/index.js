import { React, useState, useEffect } from 'react';

// API imports
import {
  GetCaptureProgress,
  GetBrandDonutData,
  GetFullnessKpi,
  GetAnomaliesKpi,
  GetAnomaliesBarChartData,
  GetVMCompliance,
  GetVMComplianceForOneWeek,
  GetFullnessForOneWeek,
  GetAnomaliesForOneWeek
} from 'api';

// Apex chart import
import Chart from 'react-apexcharts';
import chartsConfig from 'configs/charts-configs';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Grid, Card, CardContent, Typography, LinearProgress, Box, Stack, TextField, MenuItem, Skeleton } from '@mui/material';

//project import
import statisticsChartsData from 'data/statistics-charts-data';
// import KpiLineChartData from './KpiLineChart';
import DatePickerComp from './DatePicker';
import BrandDonutChart from './BrandDonutChart';
import BrandChartData from './chart/brand-chart';
import KpiCard from './KpiCard';
import { gridSpacing } from 'config.js';
import AnomaliesBarChart from './AnomaliesBarChart';

// assets
import NoDataPng from '../../assets/images/No_data.png';
import NoDataImg from '../../assets/images/No_data-amico.svg';

const histogramData = {
  asuk: [5, 10, 20, 25, 30, 35, 25, 15, 3, 2],
  vmc: [10, 20, 30, 25, 15, 10, 15, 20, 17, 8],
  dpe: [8, 15, 25, 40, 30, 10, 10, 5, 5, 12]
};

const histogramChartRequirements = {
  totalStores: 150,
  selectOptions: [
    {
      label: 'Avg. shelf-fullness',
      value: 'ASUK'
    },
    {
      label: 'Vis. Merch. Compliance',
      value: 'VMC'
    },
    {
      label: 'Disc. & Promos Exe.',
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
  const [capProgress, setCapProgress] = useState(false);
  const [avgCapProgress, setAvgCapProgress] = useState(false);
  const [fullness, setFullness] = useState(false);
  const [vmc, setVmc] = useState(false);
  const [anomalies, setAnomalies] = useState(false);
  const [anomaliesBarChart, setAnomaliesBarChart] =useState(false);
  const [brandDonut, setBrandDonut] = useState(false);
  const [brandChartOptions, setBrandChartOptions] = useState(BrandChartData.options);
  const [brandFullness, setBrandFullness] = useState([]);
  const [chartConfig, setChartConfig] = useState({
    type: 'line',
    height: 100,
    series: [
      {
        name: 'Compliance %',
        data: [67, 14, 52, 93, 30, 81, 45]
      }
    ],
    options: {
      ...chartsConfig,
      colors: ['#10b981'],
      stroke: {
        lineCap: 'round',
        curve: 'smooth'
      },
      markers: {
        size: 4
      },
      grid: {
        show: false
      },
      xaxis: {
        ...chartsConfig.xaxis,
        labels: {
          show: false
        },
        categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yaxis: {
        labels: {
          show: false
        }
      }
    }
  });
  const [fullnessChartConfig, setFullChartConfig] = useState({
    type: 'line',
    height: 100,
    series: [
      {
        name: 'Fullness %',
        data: [67, 14, 52, 93, 30, 81, 45]
      }
    ],
    options: {
      ...chartsConfig,
      colors: ['#10b981'],
      stroke: {
        lineCap: 'round',
        curve: 'smooth'
      },
      markers: {
        size: 4
      },
      grid: {
        show: false
      },
      xaxis: {
        ...chartsConfig.xaxis,
        labels: {
          show: false
        },
        categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yaxis: {
        labels: {
          show: false
        }
      }
    }
  });
  const [anomaliesChartConfig, setAnomaliesChartConfig] = useState({
    type: 'line',
    height: 100,
    series: [
      {
        name: 'Anomalies',
        data: [72, 41, 89, 63, 27, 54, 94]
      }
    ],
    options: {
      ...chartsConfig,
      colors: ['#10b981'],
      stroke: {
        lineCap: 'round',
        curve: 'smooth'
      },
      markers: {
        size: 4
      },
      grid: {
        show: false
      },
      xaxis: {
        ...chartsConfig.xaxis,
        labels: {
          show: false
        },
        categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yaxis: {
        labels: {
          show: false
        }
      }
    }
  });

  useEffect(() => {
    async function fetchLineChart() {
      const body = {
        start_date: selectedDate.toString(),
        Store_IDs: ['6582be9ac5ed94d792a563b8'],
        period: 7
      };

      try {
        const response = await GetVMComplianceForOneWeek(body);
        console.log('response', response);
        if (response && response.data) {
          const apiData = response.data;
          console.log('apiData', apiData);

          const anomalyPercentages = apiData.map((item) => item.withoutAnomalyPercentage);
          const dates = apiData.map((item) => item.date);

          const complianceData = anomalyPercentages.map((percentage) => `${percentage}%`);

          const updatedChartConfig = {
            ...chartConfig,
            series: [
              {
                name: 'Compliance %',
                data: complianceData
              }
            ],
            options: {
              ...chartConfig.options,
              xaxis: {
                ...chartConfig.options.xaxis,
                categories: dates
              }
            }
          };

          setChartConfig(updatedChartConfig);
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchLineChart();
  }, [selectedDate]);

  useEffect(() => {
    async function fetchFullnessLineChart() {
      const body = {
        start_date: selectedDate.toString(),
        Store_IDs: ['6582be9ac5ed94d792a563b8'],
        period: 7
      };

      try {
        const response = await GetFullnessForOneWeek(body);
        if (response && response.data) {
          const fullnessData = response.data;
          console.log('fullnessData', fullnessData);

          const fullnessPercentage = fullnessData.map((item) => item.fullness);
          const dates = fullnessData.map((item) => item.date);

          const fullness = fullnessPercentage.map((percentage) => `${percentage.toFixed(2)}%`);

          const updatedFullnessChartConfig = {
            ...fullnessChartConfig,
            series: [
              {
                name: 'Fullness %',
                data: fullness
              }
            ],
            options: {
              ...chartConfig.options,
              xaxis: {
                ...chartConfig.options.xaxis,
                categories: dates
              }
            }
          };

          setFullChartConfig(updatedFullnessChartConfig);
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchFullnessLineChart();
  }, [selectedDate]);

  useEffect(() => {
    async function fetchAnomaliesChart() {
      const body = {
        start_date: selectedDate.toString(),
        Store_IDs: ['6582be9ac5ed94d792a563b8'],
        period: 7
      };

      try {
        const response = await GetAnomaliesForOneWeek(body);
        if (response && response.data) { 
          const apiData = response.data;

          const anomalies = apiData.map((item) => item.totalAnomalies);
          const dates = apiData.map((item) => item.date);

          const updatedChartConfig = {
            ...chartConfig,
            series: [
              {
                name: 'Anomalies',
                data: anomalies
              }
            ],
            options: {
              ...chartConfig.options,
              xaxis: {
                ...chartConfig.options.xaxis,
                categories: dates
              }
            }
          };

          setAnomaliesChartConfig(updatedChartConfig);
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchAnomaliesChart();
  }, [selectedDate]);
  // const [brandNames, setBrandNames] = useState([]);

  // console.log('DATE SELECTED', selectedDate);

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

        categories: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],

        labels: {
          show: true,
          formatter: (x) => x + '%',
          style: {
            colors: '#fff',
            fontWeight: 'bold'
          }
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
        labels: {
          show: false
        },

        title: {
          text: 'Number of Stores',
          style: {
            color: '#fff',
            fontSize: '12px'
          }
        },

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
        setVmc(false);
        setAnomalies(false);
        setAnomaliesBarChart(false);
        setBrandDonut(false);

        try {
          const [capProgressData, brandDonutData, fullnessKpiData, vmComplianceKpiData, anomaliesKpiData, anomaliesBarChartData] =
            await Promise.all([
              GetCaptureProgress(commonBody),
              GetBrandDonutData(brandDonutBody),
              GetFullnessKpi(commonBody),
              GetVMCompliance(commonBody),
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

          if (vmComplianceKpiData) {
            setVmc(vmComplianceKpiData.data);
          }

          if (anomaliesKpiData) {
            setAnomalies(anomaliesKpiData.data);
          }

          if (anomaliesBarChartData) {
            setAnomaliesBarChart(anomaliesBarChartData.data);
          }
        } catch (error) {
          console.log(error);
        }
      }
      fetchDashboardData();
    }
    /* eslint-enable no-inner-declarations */
  }, [selectedDate]);
 console.log("anomalies", anomalies);
 console.log("anomalies bar", anomaliesBarChart);

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
              isLoaded={fullness}
              chart={fullnessChartConfig}
              title="Average Shelf-fullness"
              count={`${fullness && fullness.currentDay ? Math.floor(fullness.currentDay.fullness) : 0}%`}
              percentage={`${fullness && fullness.difference ? Math.abs(Math.floor(fullness.difference)) : 0}`}
              chipColor={fullness && fullness.difference < 0 ? 'error' : 'success'}
              isLoss={fullness && fullness.difference < 0}
              color={theme.palette.success.main}
            />
          </Grid>
          <Grid item lg={3} sm={6} xs={12}>
            <KpiCard
              isLoaded={vmc}
              chart={chartConfig}
              title="Visual Merchandising Compliance"
              count={`${vmc && vmc.currentDay ? Math.floor(vmc.currentDay.withoutAnomalyPercentage) : 0}%`}
              percentage={`${
                vmc && vmc.differencePercentage ? Math.abs(Math.floor(vmc.differencePercentage.withoutAnomalyPercentageDifference)) : 0
              }`}
              chipColor={
                vmc && vmc.differencePercentage && vmc.differencePercentage.withoutAnomalyPercentageDifference < 0 ? 'error' : 'success'
              }
              isLoss={vmc && vmc.differencePercentage && vmc.differencePercentage.withoutAnomalyPercentageDifference < 0}
              color={theme.palette.success.main}
            />
          </Grid>
          <Grid item lg={3} sm={6} xs={12}>
            <KpiCard
              isLoaded={fullness}
              chart={statisticsChartsData[3].chart}
              title="Discounts & Promos Execution"
              count="NA"
              percentage="NA"
              // isLoss
              // chipColor="success"
              color={theme.palette.success.main}
            />
          </Grid>
          <Grid item lg={3} sm={6} xs={12}>
            <KpiCard
              isLoaded={anomalies}
              chart={anomaliesChartConfig}
              title="Anomalies Found"
              count={`${anomalies && anomalies.currentDay ? Math.floor(anomalies.currentDay.totalAnomalies) : 0}`}
              // count="0%"
              percentage={`${
                anomalies && anomalies.percentageChange ? Math.abs(Math.floor(anomalies.percentageChange)) : 0
              }`}
              chipColor={
                anomalies && anomalies.percentageChange && anomalies.percentageChange < 0 ? 'error' : 'success'
              }
              isLoss={anomalies && anomalies.percentageChange && anomalies.percentageChange < 0}
              color={theme.palette.error.main}
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
                      <AnomaliesBarChart date={selectedDate} />
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={3} xs={12}>
            <Card>
              <Grid container spacing={gridSpacing}>
                <Grid item xs={6} sm={4} md={3} lg={7} xl={6}>
                  <Chart
                    options={progressChart.options}
                    series={avgCapProgress ? [avgCapProgress] : [0]}
                    type={progressChart.options.chart.type}
                    height={progressChart.options.chart.height}
                  />
                </Grid>
                <Grid item alignContent={'center'} xs={6} sm={8} md={9} lg={5} xl={6}>
                  <div className="flex flex-col gap-1">
                    <Typography variant="h1" sx={{ color: accentColMain, paddingTop: 8 }}>
                      {avgCapProgress ? (
                        `${avgCapProgress}%`
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
                    height: 607 // Height for screens equal to or larger than 'lg' breakpoint
                  }
                }}
                className="overflow-y-auto flex flex-col gap-1 scrollbar"
              >
                <Grid container spacing={gridSpacing}>
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
