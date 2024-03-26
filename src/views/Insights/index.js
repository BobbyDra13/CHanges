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
  GetAnomaliesForOneWeek,
  GetBarChartData,
  GetVMscoreBar,
  GetCapProg,
  GetPopPercentage,
  GetPopWeekLineData
} from 'api';

// Apex chart import
import Chart from 'react-apexcharts';
import chartsConfig from 'configs/charts-configs';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Grid, Card, CardContent, Typography, LinearProgress, Box, Stack, TextField, MenuItem, Skeleton, Paper } from '@mui/material';

//project import
import statisticsChartsData from 'data/statistics-charts-data';
// import KpiLineChartData from './KpiLineChart';
import DatePickerComp from './DatePicker';
import BrandDonutChart from './BrandDonutChart';
import BrandChartData from './chart/brand-chart';
import KpiCard from './KpiCard';
import KpiPop from './KpiCard/kpiPop';
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
      label: 'Up keep score',
      value: 'ASUK',
      disabled: false
    },
    {
      label: 'VM score',
      value: 'VMC',
      disabled: false
    },
    {
      label: 'PoP score',
      value: 'DPE',
      disabled: true
    }
  ]
};

// ==============================|| DASHBOARD DEFAULT ||============================== //

const Insights = () => {
  const theme = useTheme();
  const accentColDark = theme.palette.success.dark;
  const accentColLight = theme.palette.success.light;
  const accentColMain = theme.palette.success.main;

  // const { totalStores } = histogramChartRequirements;
  const { selectOptions } = histogramChartRequirements;
  const [selected, setSelected] = useState(selectOptions[0].value);
  const [seriesData, setSeriesData] = useState(histogramData.asuk);
  const [selectedDate, setSelectedDate] = useState('');
  const [capProgress, setCapProgress] = useState(false);
  const [avgCapProgress, setAvgCapProgress] = useState(false);
  const [fullness, setFullness] = useState(false);
  const [vmc, setVmc] = useState(false);
  const [anomalies, setAnomalies] = useState(false);
  const [anomaliesBarChart, setAnomaliesBarChart] = useState(false);
  const [brandDonut, setBrandDonut] = useState(false);
  const [brandChartOptions, setBrandChartOptions] = useState(BrandChartData.options);
  const [brandFullness, setBrandFullness] = useState([]);
  const [barChartData, setBarChartData] = useState(false);
  const [vmChartData, setVmChartData] = useState(false);
  const [popPercentage, setPopPercentage] = useState('0');
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
        },
        max: 100
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
        },
        max: 100
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
      colors: ['#ff413a'],
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
        const commonBody = {
          start_date: selectedDate.toString(),
          Store_IDs: ['6582be9ac5ed94d792a563b8']
        };
        const brandDonutBody = {
          start_date: selectedDate.toString(),
          Store_IDs: ['6582be9ac5ed94d792a563b8']
        };
        const body = {
          start_date: selectedDate.toString(),
          Store_IDs: ['6582be9ac5ed94d792a563b8'],
          period: 7
        };
        const capBody = {
          date: selectedDate.toString(),
          store_id: '65c74d4112465588b7a4984c'
        };
        const popKpiCardBody = {
          date: selectedDate.toString(),
          store_id: '65c74d4112465588b7a4984c'
        };

        setAvgCapProgress(false);
        setCapProgress(false);
        setFullness(false);
        setVmc(false);
        setAnomalies(false);
        setAnomaliesBarChart(false);
        setBrandDonut(false);
        setBarChartData(false);
        setVmChartData(false);
        setPopPercentage('0');
        setFullChartConfig({
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
              },
              max: 100
            }
          }
        });

        setChartConfig({
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
              },
              max: 100
            }
          }
        });
        setAnomaliesChartConfig({
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
            colors: ['#ff413a'],
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
        try {
          const [
            capProgressData,
            brandDonutData,
            fullnessKpiData,
            vmComplianceKpiData,
            anomaliesKpiData,
            anomaliesBarChartData,
            barChart,
            vmcChart,
            fullnessLineChart,
            vmcLineChart,
            anomaliesLineChart
          ] = await Promise.all([
            GetCaptureProgress(commonBody),
            GetBrandDonutData(brandDonutBody),
            GetFullnessKpi(commonBody),
            GetVMCompliance(commonBody),
            GetAnomaliesKpi(commonBody),
            GetAnomaliesBarChartData(commonBody),
            GetBarChartData(commonBody),
            GetVMscoreBar(commonBody),
            GetFullnessForOneWeek(body),
            GetVMComplianceForOneWeek(body),
            GetAnomaliesForOneWeek(body)
          ]);

          const CapData = await GetCapProg(capBody);
          const popPercentageData = await GetPopPercentage(popKpiCardBody);
          const popLineData = await GetPopWeekLineData(popKpiCardBody);

          console.log('popPercentageData', popPercentageData.data);
          console.log('popLineData', popLineData);

          if (popLineData) {
            const popScoreFullnessLine = popLineData.data;
            const popScoreFullness = popScoreFullnessLine.map((item) => {
              if (item.data && item.data.FullnessPopPercent) {
                const percentage = parseFloat(item.data.FullnessPopPercent.replace('%', ''));
                return `${percentage.toFixed(2)}%`;
              } else {
                return '0%';
              }
            });
            const dates = popScoreFullnessLine.map((item) => item._id);

            const updatedFullnessChartConfig = {
              ...fullnessChartConfig,
              series: [
                {
                  name: 'Fullness %',
                  data: popScoreFullness
                }
              ],

              options: {
                ...fullnessChartConfig.options,
                xaxis: {
                  ...fullnessChartConfig.options.xaxis,
                  categories: dates
                },
                annotations: {
                  yaxis: [
                    {
                      y: 50.0,
                      borderColor: '#FF0000',
                      label: {
                        borderColor: '#FF0000',
                        style: {
                          color: '#fff',
                          background: '#FF0000'
                        },
                        text: '50%'
                      }
                    }
                  ]
                }
              }
            };

            setFullChartConfig(updatedFullnessChartConfig);
          }
          if (vmcLineChart) {
            const apiData = vmcLineChart.data;
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
                },
                annotations: {
                  yaxis: [
                    {
                      y: 50.0,
                      borderColor: '#FF0000',
                      label: {
                        borderColor: '#FF0000',
                        style: {
                          color: '#fff',
                          background: '#FF0000'
                        },
                        text: '50%'
                      }
                    }
                  ]
                }
              }
            };

            setChartConfig(updatedChartConfig);
          }
          if (anomaliesLineChart) {
            const apiData = anomaliesLineChart.data;

            const anomalies = apiData.map((item) => item.totalAnomalies);
            const dates = apiData.map((item) => item.date);

            const updatedChartConfig = {
              ...anomaliesChartConfig,
              series: [
                {
                  name: 'Anomalies',
                  data: anomalies
                }
              ],
              options: {
                ...anomaliesChartConfig.options,
                xaxis: {
                  ...anomaliesChartConfig.options.xaxis,
                  categories: dates
                }
              }
            };

            setAnomaliesChartConfig(updatedChartConfig);
          }
          if (capProgressData) {
            if (capProgressData.data.length > 0) {
              const totalCapturePercentage = capProgressData.data.reduce((acc, item) => acc + item.capture_percentage, 0);
              const average = totalCapturePercentage / capProgressData.data.length;

              // setAvgCapProgress(Math.floor(average));
              setAvgCapProgress(CapData.data.averageCaptureProgress);
            } else {
              setAvgCapProgress('');
              // setCapProgress('');
            }
            // setCapProgress(capProgressData.data);
            // console.log(capProgressData.data);
            setCapProgress(CapData.data);
          }
          if (brandDonutData) {
            // console.log('Brand Data', brandDonutData);
            // if (brandDonutData.data.length > 0) {
            if (DonutData.data.length > 0) {
              // const extractedFullness = brandDonutData.data.map((item) => Math.floor(item.fullness));
              const extractedFullness = DonutData.data.map((item) =>
                Math.floor(item.data ? parseFloat(item.data.FullnessPopPercentOfGroup) : 0)
              );
              // const extractedBrandNames = brandDonutData.data.map((item) => item.brand_name);
              const extractedBrandNames = DonutData.data.map((item) => item.group_id);
              console.log(extractedFullness, extractedBrandNames);

              setBrandChartOptions({ ...brandChartOptions, labels: extractedBrandNames });

              setBrandFullness(extractedFullness);
              // setBrandNames(extractedBrandNames);
            }
            setBrandDonut(brandDonutData.data);
          }
          if (popPercentageData) {
            if (popPercentageData.data.msg) {
              setPopPercentage('0%');
            } else {
              setPopPercentage(popPercentageData.data.fullnessPopPercent);
            }
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
            console.log('anomaliesBarChartData', anomaliesBarChartData);
          }
          if (barChart) {
            setBarChartData(barChart.data);
            console.log('barchartdata', barChart);
          }
          if (vmcChart) {
            setVmChartData(vmcChart.data);
            console.log('vmcchart', vmcChart);
          }
        } catch (error) {
          console.log(error);
        }
      }
      fetchDashboardData();
    }
    /* eslint-enable no-inner-declarations */
  }, [selectedDate]);
  console.log('bar', barChartData);
  console.log('vmc bar', vmChartData);
  console.log('chartConfig', vmc);
  useEffect(() => {
    if (barChartData && barChartData.length > 0 && selected === histogramChartRequirements.selectOptions[0].value) {
      setSelected(histogramChartRequirements.selectOptions[0].value);
      let chart = barChartData[0]?.data.bayAnalysis;
      console.log('chartttt', chart);

      let allRanges = Array.from({ length: 10 }, (_, i) => `${i * 10}-${(i + 1) * 10}%`);
      console.log('allRanges', allRanges);
      let chartDataMap = Object.fromEntries(allRanges.map((range) => [range, chart[range] || 0]));
      console.log('chartDataMap', chartDataMap);

      let sortedKeys = Object.keys(chartDataMap).sort((a, b) => {
        let [aStart, aEnd] = a.split('-').map(Number);
        let [bStart, bEnd] = b.split('-').map(Number);

        return aStart - bStart || aEnd - bEnd;
      });
      console.log('sortedKeys', sortedKeys);
      // Retrieve values in the sorted order
      const barchart = {
        asuk: sortedKeys.map((key) => chartDataMap[key])
      };

      console.log('barchart', barchart);

      setSeriesData(barchart.asuk);
    } else if (vmChartData && vmChartData.length > 0 && selected === histogramChartRequirements.selectOptions[1].value) {
      setSelected(histogramChartRequirements.selectOptions[1].value);
      console.log('vmc clicked');
      let chart = vmChartData[0]?.data?.anomaliesCount;
      console.log('charttttvmc', chart);
      let allRanges = Array.from({ length: 10 }, (_, i) => `${i * 10}-${(i + 1) * 10}%`);
      console.log('allRangesvmc', allRanges);

      const manualRanges = ['0-10%', '10-20%', '20-30%', '30-40%', '40-50%', '50-60%', '60-70%', '70-80%', '80-90%', '90-100%'];

      let chartDataMap = Object.fromEntries(manualRanges.map((range) => [range, chart[range] || 0]));
      console.log('chartDataMapvmc', chartDataMap);

      const totalBays = barChartData[0]?.data?.totalBaysCount;
      const remainingBays = totalBays - Object.values(chart).reduce((sum, count) => sum + count, 0);

      chartDataMap['0-10%'] += remainingBays;

      let sortedKeys = Object.keys(chartDataMap).sort((a, b) => {
        let [aStart, aEnd] = a.split('-').map(Number);
        let [bStart, bEnd] = b.split('-').map(Number);

        return aStart - bStart || aEnd - bEnd;
      });

      const barchart = {
        vmc: sortedKeys.map((key) => chartDataMap[key])
      };

      console.log('barchartvmc', barchart);

      setSeriesData(barchart.vmc);
    } else if (vmChartData && vmChartData.length === 0) {
      setSelected(histogramChartRequirements.selectOptions[1].value);
      const manualRanges = ['0-10%', '10-20%', '20-30%', '30-40%', '40-50%', '50-60%', '60-70%', '70-80%', '80-90%', '90-100%'];
      const totalBays = barChartData[0]?.data?.totalBaysCount;

      let chartDataMap = Object.fromEntries(manualRanges.map((range) => [range, 0]));
      chartDataMap['90-100%'] += totalBays;

      let sortedKeys = Object.keys(chartDataMap).sort((a, b) => {
        let [aStart, aEnd] = a.split('-').map(Number);
        let [bStart, bEnd] = b.split('-').map(Number);

        return aStart - bStart || aEnd - bEnd;
      });

      const barchart = {
        vmc: sortedKeys.map((key) => chartDataMap[key])
      };

      console.log('barchartvmc', barchart);

      setSeriesData(barchart.vmc);
    }
  }, [barChartData, vmChartData, histogramChartRequirements.selectOptions, selected]);

  let series = [
    {
      name: 'bays',
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

  console.log('seriesData', seriesData);
  console.log('anomalies', anomalies);
  console.log('anomalies bar', anomaliesBarChart);

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
              title="PoP Score"
              count={`${parseFloat(popPercentage) === 0 ? '0' : parseFloat(popPercentage).toFixed(1)}%`}
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
              title="VM Score"
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
            <KpiPop
              isLoaded={fullness}
              chart={statisticsChartsData[3].chart}
              title="PoP Score"
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
              percentage={`${anomalies && anomalies.percentageChange ? Math.abs(Math.floor(anomalies.percentageChange)) : 0}`}
              chipColor={anomalies && anomalies.percentageChange && anomalies.percentageChange < 0 ? 'success' : 'error'}
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
                      {barChartData?.length > 0 &&
                      barChartData[0]?.data?.bayAnalysis['0-10%'] !== 9 &&
                      selected === histogramChartRequirements.selectOptions[0].value ? (
                        <CardContent sx={{ padding: 0, paddingBottom: '0 !important' }}>
                          <Box color="#fff" bgcolor={theme.palette.primary.main} p={3}>
                            <Grid container justifyContent="space-between" alignItems="center">
                              <Grid item>
                                <Grid container spacing={1}>
                                  <Stack direction={'row'} spacing={1}>
                                    <Typography sx={{ paddingLeft: 2 }} variant="h2" color="inherit">
                                      {barChartData[0]?.data?.totalBaysCount}
                                    </Typography>
                                    <Typography paddingBottom={0.6} className="self-end" variant="h5" color="inherit">
                                      Bays
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
                                      <MenuItem key={option.value} value={option.value} disabled={option.disabled}>
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
                      ) : barChartData[0]?.data?.bayAnalysis['0-10%'] === 9 &&
                        vmChartData?.length === 0 &&
                        vmc.currentDay.totalAnomalies === 0 &&
                        vmc.currentDay.totalCaptureCount === 0 ? (
                        <div className="w-full h-full flex justify-center place-items-center">
                          <img style={{ height: '392px' }} src={NoDataImg} alt="No data" />
                        </div>
                      ) : vmChartData?.length > 0 && selected === histogramChartRequirements.selectOptions[1].value ? (
                        <CardContent sx={{ padding: 0, paddingBottom: '0 !important' }}>
                          <Box color="#fff" bgcolor={theme.palette.primary.main} p={3}>
                            <Grid container justifyContent="space-between" alignItems="center">
                              <Grid item>
                                <Grid container spacing={1}>
                                  <Stack direction={'row'} spacing={1}>
                                    <Typography sx={{ paddingLeft: 2 }} variant="h2" color="inherit">
                                      {barChartData[0]?.data?.totalBaysCount}
                                    </Typography>
                                    <Typography paddingBottom={0.6} className="self-end" variant="h5" color="inherit">
                                      Bays
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
                                      <MenuItem key={option.value} value={option.value} disabled={option.disabled}>
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
                      ) : vmChartData?.length === 0 &&
                        vmc.currentDay.totalAnomalies === 0 &&
                        vmc.currentDay.totalCaptureCount !== 0 &&
                        selected === histogramChartRequirements.selectOptions[1].value ? (
                        <CardContent sx={{ padding: 0, paddingBottom: '0 !important' }}>
                          <Box color="#fff" bgcolor={theme.palette.primary.main} p={3}>
                            <Grid container justifyContent="space-between" alignItems="center">
                              <Grid item>
                                <Grid container spacing={1}>
                                  <Stack direction={'row'} spacing={1}>
                                    <Typography sx={{ paddingLeft: 2 }} variant="h2" color="inherit">
                                      {barChartData[0]?.data?.totalBaysCount}
                                    </Typography>
                                    <Typography paddingBottom={0.6} className="self-end" variant="h5" color="inherit">
                                      Bays
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
                                      <MenuItem key={option.value} value={option.value} disabled={option.disabled}>
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
                      <AnomaliesBarChart selectedDate={selectedDate} />
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
                            {capProgress.collectiveCaptureProgress}
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
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
                            value={capProgress.collectiveCaptureProgress}
                            color="primary"
                            onClick={() => setOpenZone(!openZone)}
                            // onScroll={()=>setOpenZone(false)}
                          />
                          {openZone && (
                            <Paper className="mt-10 p-5" elevation={10}>
                              <Typography variant="h4">Zone wise Capture Progress</Typography>
                              {capProgress.captureProgressZoneData.length > 0 &&
                                capProgress.captureProgressZoneData.map((item, index) => (
                                  <>
                                    <Typography key={index} className="m-2" variant="body1" color="initial">
                                      {item.zone_id}
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
                                      value={item.captureProgress}
                                      color="primary"
                                      // onClick={()=>(setOpenZone(!openZone))}
                                    />
                                  </>
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
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Insights;
