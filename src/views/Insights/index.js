import { React, useState, useEffect } from 'react';

// API imports
import {
  GetRadarChartData,
  GetCapProg,
  //eslint-disable-next-line
  GetPopHistogramData,
  //eslint-disable-next-line
  seven_day_anomalies,
  testerPercentAndOsaScoreHistogram,
  OsaScoreMultistoreSevenday,
  testerPercentSevenDayMultistore,
  getAnomalyCountInsights
} from 'api';
// import { useHistory } from 'react-router-dom';

// Apex chart import
import Chart from 'react-apexcharts';
import { useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Box,
  Stack,
  TextField,
  MenuItem,
  Skeleton,
  Paper,
  Select
} from '@mui/material';

//project import
//eslint-disable-next-line
import statisticsChartsData from 'data/statistics-charts-data';
import BrandDonutChart from './BrandDonutChart';
import BrandChartData from './chart/brand-chart';
//eslint-disable-next-line
import KpiPop from './KpiCard/kpiPop';
import { gridSpacing } from 'config.js';
import AnomaliesBarChart from './AnomaliesBarChart';
//eslint-disable-next-line
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import CaptureProgressCard from './CaptureProgressCard';

// assets
import NoDataPng from '../../assets/images/No_data.png';
import NoDataImg from '../../assets/images/No_data-amico.svg';
import PoPScoreKPICard from './PoPScoreKPICard';
import AnomalyKPICard from './AnomalyKPICard';
import PopUp from './PopUp';
import OSAkpiPop from './OSAkpiPop';
import TesterPercentKpiCard from './TesterPercentKpiCard';
// import { useDispatch } from 'react-redux';

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

  // const dispatch = useDispatch();
  const toLocalDateString = (date) => {
    const tzOffset = date.getTimezoneOffset() * 60000; // offset in milliseconds
    const localISOTime = new Date(date.getTime() - tzOffset).toISOString().slice(0, 10);
    return localISOTime;
  };

  // const selectedDate = useSelector((state) => state.customization.selectedDate)
  // .toISOString()
  // .slice(0, 10);

  const selectedDate = toLocalDateString(useSelector((state) => state.customization.selectedDate));

  console.log('getDate', selectedDate);

  const { selectOptions } = histogramChartRequirements;
  const [selected, setSelected] = useState(selectOptions[0].value);
  const [seriesData, setSeriesData] = useState([]);
  // const [selectedDate, setSelectedDate] = useState(new Date());
  const [capProgress, setCapProgress] = useState(false);
  const [avgCapProgress, setAvgCapProgress] = useState(false);
  //eslint-disable-next-line
  const [fullness, setFullness] = useState(false);
  const [histo, sethisto] = useState(null);
  const [brandNames, setBrandNames] = useState([]);
  const [brandChartOptions, setBrandChartOptions] = useState(BrandChartData.options);
  const [brandFullness, setBrandFullness] = useState(false);
  const [barChartData, setBarChartData] = useState(false);
  //eslint-disable-next-line
  const [anomaliesCount, setAnomaliesCount] = useState(false);
  const [anomaliesLoading, setAnomaliesLoading] = useState(true);
  // const [openZone, setOpenZone] = useState({});
  const [osascorehistogram, setosascorehistogram] = useState(true);
  const [testerpercenthistogram, settesterpercenthistogram] = useState(false);
  const [dropdown, setdropdown] = useState('Osa Score');

  // const [anchorEl, setAnchorEl] = useState(null);
  const handleclickOnOsa = () => {
    if (osascorehistogram == true) return;
    settesterpercenthistogram(false);
    setosascorehistogram(true);
  };
  const handleclickontester = () => {
    if (testerpercenthistogram == true) return;
    setosascorehistogram(false);
    settesterpercenthistogram(true);
  };

  const [osaMultiScore, setosaMultiScore] = useState(null);
  const [testerMultiScore, settesterMultiScore] = useState(null);
  const [anomalycount7days, setanomalycount7days] = useState(null);
  const getsevendaysdataForOsaAndTester = async () => {
    const data = {
      date: selectedDate,
      //  user_id : "666fef1bdbf527b634e95c0b"
      user_id: '66795cbe1d905892a4256692'
    };
    const data1 = {
      start_date: selectedDate,
      //  user_id : "666fef1bdbf527b634e95c0b"
      user_id: '66795cbe1d905892a4256692'
    };
    try {
      console.log('sel', selectedDate);
      const res = selectedDate && (await OsaScoreMultistoreSevenday(data));
      const res2 = selectedDate && (await testerPercentSevenDayMultistore(data1));
      const res3 = selectedDate && (await seven_day_anomalies(data));
      console.log(res3);
      const anomaly = res && res.data && res.data.OSA.length > 0 && res.data.OSA.map((item) => (item ? item.toFixed(2) : 0));
      const anomaly2 =
        res2 && res2.data && res2.data.TesterScore.length > 0 && res2.data.TesterScore.map((item) => (item ? item.toFixed(2) : 0));
      const anomaly3 = res3 && res3.data && res3.data.length > 0 && res3.data.map((item) => (item ? item.anomaly_count.toFixed(2) : 0));
      console.log(anomaly);
      anomaly && setosaMultiScore(anomaly);
      anomaly2 && settesterMultiScore(anomaly2);
      anomaly3 && setanomalycount7days(anomaly3);
    } catch (e) {
      console.log('error in getsevendays', e);
    }
  };
  const [anoCount, setAnoCount] = useState(null);
  useEffect(() => {
    const getAnomalyCount = async () => {
      const data = {
        date: selectedDate,
        //  user_id : "666fef1bdbf527b634e95c0b"
        user_id: '66795cbe1d905892a4256694'
      };
      try {
        const anomalyCount = await getAnomalyCountInsights(data);
        if (anomalyCount) {
          setAnoCount(anomalyCount);
        } else {
          setAnoCount('');
        }
        console.log('anomaly count insights', res);
      } catch (e) {
        console.log('error in anomaly count data', e);
      }
    };
    getAnomalyCount();
  }, [selectedDate]);
  //eslint-disable-next-line
  const getHistogramdata = async () => {
    const data = {
      // user_id: '666fef1bdbf527b634e95c0b', /// hard coded
      user_id: '66795cbe1d905892a4256692', /// hard coded
      date: '2024-06-19' // hard coded
    };
    try {
      const res = selectedDate && (await testerPercentAndOsaScoreHistogram(data));
      console.log('here from getHistogram data ', res);
    } catch (e) {
      console.log('error in historgram data', e);
    }
  };
  // useEffect(()=>{
  //     getHistogramdata();
  // },[])

  // const handleZoneCaptureProgressMenuOpen = (key) => {
  //   setOpenZone((prevState) => ({
  //     ...prevState,
  //     [key]: true
  //   }));
  // setAnchorEl(event.currentTarget);
  // };
  // const handleZoneCaptureProgressMenuClose = (key) => {
  //   setOpenZone((prevState) => ({
  //     ...prevState,
  //     [key]: false
  //   }));
  //   // setAnchorEl(null);
  // };

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
  console.log(isMounted);
  useEffect(() => {
    // Set the component to be mounted when the effect is run
    setIsMounted(true);

    // Return a cleanup function to set the component to unmounted
    return () => {
      setIsMounted(false);
    };
  }, []);
  // ------------------------
  async function fetchDashboardData() {
    const capBody = {
      date: selectedDate,
      user_id: '66795cbe1d905892a4256693'
      // user_id: user_id
    };
    //eslint-disable-next-line
    const popKpiCardBody = {
      date: selectedDate,
      user_id: user_id
    };
    const donutBody = {
      date: selectedDate,
      user_id: '66795cbe1d905892a4256694'
    };
    const dataa = {
      // user_id: '666fef1bdbf527b634e95c0b',
      user_id: '66795cbe1d905892a4256692',
      //date: '2024-06-27'
      date: selectedDate
    };
    console.log('donutBody', donutBody);
    // const anomlayBody = {
    //   date: selectedDate.toString(),
    //   user_id: '66795cbe1d905892a4256694'
    //   // date: selectedDate.toString(),
    //   // user_id: user_id
    // };
    // console.log('anomlybody', anomlayBody);
    setAvgCapProgress(false);
    setCapProgress(false);
    setFullness(false);
    setBarChartData(false);
    console.log('abc date', selectedDate);
    try {
      const brandDonutData = await GetRadarChartData(donutBody);
      console.log('bebo', brandDonutData);
      const CapData = await GetCapProg(capBody);
      console.log('thala', CapData);
      //const histogramData = await GetPopHistogramData(popKpiCardBody);
      const histogramData = selectedDate && (await testerPercentAndOsaScoreHistogram(dataa));
      console.log(histogramData);
      sethisto(histogramData);
      const anomalies = await GetRadarChartData(donutBody);
      // const anomalyCount = await getAnomalyCountInsights(anomlayBody);
      // console.log('jiop',anomalyCount);
      if (anomalies) {
        setAnomaliesLoading(false);
        setAnomaliesCount(anomalies.data);
        console.log('abc', anomalies.data);
      }
      // if(anomalyCount) {
      //   console.log('before',anoCount);
      //   setAnoCount(anomalyCount);
      //   console.log('after',anoCount);
      // } else {
      //   setAnoCount('');
      // }
      if (CapData) {
        if (CapData.data.results.length > 0) {
          // let sum = 0;
          // for (let i = 0; i < CapData.data.length; i++) {
          //   sum += CapData.data[i].captureProgress;
          // }
          // const average = sum / CapData.data.length;
          const average = CapData.data.avgCaptureProgress;
          setAvgCapProgress(average);
        } else {
          setAvgCapProgress('');
        }
        console.log('thik', CapData.data.results);
        console.log('uii', avgCapProgress);
        setCapProgress(CapData.data.results);
      }
      if (brandDonutData) {
        if (brandDonutData.data.length > 0) {
          console.log('Donut chart data', brandDonutData);
          const extractedFullness = brandDonutData.data.map((item) => [item.missing_tester, item.empty_tray, item.correct]);
          const extractedBrandNames = ['Missing tester', 'Empty Shelf', 'Correct'];
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
        //    if(dropdown === "")
        //  setBarChartData(histogramData.data[0].OSA_Score_histogram);

        if (dropdown === 'Osa Score') {
          setBarChartData(histogramData.data[0].OSA_Score_histogram);
        } else {
          setBarChartData(histogramData.data[0].testers_score_histogram);
        }

        setFullness(true);
        console.log('histogramData', barChartData);
      }
    } catch (error) {
      console.log(error);
    }
  }
  const user_id = JSON.parse(localStorage.getItem('userData')).data._id;
  console.log('brooo', user_id);
  useEffect(() => {
    // const storeIds = JSON.parse(localStorage.getItem('userData')).data.stores;
    // dispatch({ type: 'DATE', date: storeIds });
    /* eslint-disable no-inner-declarations */
    // if (isMounted) {
    //   async function fetchDashboardData() {
    //     const capBody = {
    //       date: selectedDates,
    //       user_id: '66795cbe1d905892a4256693'
    //       // user_id: user_id
    //     };
    //     //eslint-disable-next-line
    //     const popKpiCardBody = {
    //       date: selectedDates,
    //       user_id: user_id
    //     };
    //     const donutBody = {
    //       date: selectedDates,
    //       user_id: '66795cbe1d905892a4256694'
    //     };
    //     const dataa = {
    //       // user_id: '666fef1bdbf527b634e95c0b',
    //       user_id: '66795cbe1d905892a4256692',
    //       //date: '2024-06-27'
    //       date: selectedDates
    //     };
    //     console.log('donutBody', donutBody);
    //     // const anomlayBody = {
    //     //   date: selectedDate.toString(),
    //     //   user_id: '66795cbe1d905892a4256694'
    //     //   // date: selectedDate.toString(),
    //     //   // user_id: user_id
    //     // };
    //     // console.log('anomlybody', anomlayBody);
    //     setAvgCapProgress(false);
    //     setCapProgress(false);
    //     setFullness(false);
    //     setBarChartData(false);
    //     console.log('abc date', selectedDates);
    //     try {
    //       const brandDonutData = await GetRadarChartData(donutBody);
    //       console.log('bebo', brandDonutData);
    //       const CapData = await GetCapProg(capBody);
    //       console.log('thala', CapData);
    //       //const histogramData = await GetPopHistogramData(popKpiCardBody);
    //       const histogramData = selectedDates.toString() && (await testerPercentAndOsaScoreHistogram(dataa));
    //       console.log(histogramData);
    //       sethisto(histogramData);
    //       const anomalies = await GetRadarChartData(donutBody);
    //       // const anomalyCount = await getAnomalyCountInsights(anomlayBody);
    //       // console.log('jiop',anomalyCount);
    //       if (anomalies) {
    //         setAnomaliesLoading(false);
    //         setAnomaliesCount(anomalies.data);
    //         console.log('abc', anomalies.data);
    //       }
    //       // if(anomalyCount) {
    //       //   console.log('before',anoCount);
    //       //   setAnoCount(anomalyCount);
    //       //   console.log('after',anoCount);
    //       // } else {
    //       //   setAnoCount('');
    //       // }
    //       if (CapData) {
    //         if (CapData.data.results.length > 0) {
    //           // let sum = 0;
    //           // for (let i = 0; i < CapData.data.length; i++) {
    //           //   sum += CapData.data[i].captureProgress;
    //           // }
    //           // const average = sum / CapData.data.length;
    //           const average = CapData.data.avgCaptureProgress;
    //           setAvgCapProgress(average);
    //         } else {
    //           setAvgCapProgress('');
    //         }
    //         console.log('thik', CapData.data.results);
    //         console.log('uii', avgCapProgress);
    //         setCapProgress(CapData.data.results);
    //       }
    //       if (brandDonutData) {
    //         if (brandDonutData.data.length > 0) {
    //           console.log('Donut chart data', brandDonutData);
    //           const extractedFullness = brandDonutData.data.map((item) => [item.missing_tester, item.empty_tray, item.correct]);
    //           const extractedBrandNames = ['Missing tester', 'Empty Shelf', 'Correct'];
    //           setBrandChartOptions({ ...brandChartOptions, labels: extractedBrandNames });
    //           setBrandFullness(extractedFullness);
    //           console.log('Brand Fullness', extractedFullness);
    //           setBrandNames(extractedBrandNames);
    //           console.log('Brand Names', brandNames);
    //         } else {
    //           setBrandFullness([]);
    //         }
    //       }

    //       if (histogramData) {
    //         //    if(dropdown === "")
    //         //  setBarChartData(histogramData.data[0].OSA_Score_histogram);

    //         if (dropdown === 'Osa Score') {
    //           setBarChartData(histogramData.data[0].OSA_Score_histogram);
    //         } else {
    //           setBarChartData(histogramData.data[0].testers_score_histogram);
    //         }

    //         setFullness(true);
    //         console.log('histogramData', barChartData);
    //       }
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   }
    //   fetchDashboardData();
    // }
    fetchDashboardData();
    getsevendaysdataForOsaAndTester();
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
  console.log('jaii', brandFullness);
  const allZero = brandFullness && brandFullness.length === 0;
  useEffect(() => {
    if (histo) {
      if (dropdown === 'Osa Score') {
        setBarChartData(histo.data[0].OSA_Score_histogram);
      } else {
        setBarChartData(histo.data[0].testers_score_histogram);
      }
      setFullness(true);
      console.log('histogramData', barChartData);
    }
    //eslint-disable-next-line
  }, [dropdown]);
  useEffect(
    () => {
      if (barChartData) {
        setSelected(histogramChartRequirements.selectOptions[0].value);
        let chart = barChartData;
        //let chart = barChartData[0].data;
        console.log(barChartData);
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

        categories: [0, 0, 0, 0, 0, 0, 0],

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

  const [popupOpen, setPopupOpen] = useState(false);
  const [showPopUp, setShowPopUp] = useState(true);
  const [val, setVal] = useState('0');
  // const [score,setScore]=useState(0);
  const handleOpenPopup = () => {
    if (showPopUp) {
      setPopupOpen(true);
    }
  };

  const handleClosePopup = () => {
    console.log(' close popup ');
    setPopupOpen(false);
  };
  console.log('popup open-->', popupOpen);
  // const history = useHistory();

  // const navigateToStoreInsight = (id) => {
  //   history.push(`/main/stores/storeinsight/overview/${id}`);
  // };

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 640px)'); // Tailwind's sm breakpoint

    const handleMediaQueryChange = (event) => {
      if (event.matches) {
        console.log('yes');
        setShowPopUp(true);
      } else {
        console.log('no');
        setShowPopUp(false);
      }
    };

    // Initial check
    if (mediaQuery.matches) {
      console.log('yes');
      setShowPopUp(true);
    } else {
      console.log('no');
      setShowPopUp(false);
    }

    // Add listener
    mediaQuery.addEventListener('change', handleMediaQueryChange);

    // Clean up listener on unmount
    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, [showPopUp]);
  console.log(selectedDate);

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
          {/* <Box>
            <DatePickerComp SetSelectedDate={setSelectedDate} />
          </Box> */}
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          {/* shows pop score */}
          <Grid item lg={3} sm={6} xs={12}>
            <OSAkpiPop date={selectedDate} osaMultiScore={osaMultiScore} />
          </Grid>
          <Grid item lg={3} sm={6} xs={12}>
            <TesterPercentKpiCard date={selectedDate} testerMultiScore={testerMultiScore} />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xs={12}
            onClick={() => {
              handleOpenPopup();
              setVal('0');
            }}
          >
            <PoPScoreKPICard date={selectedDate} />
          </Grid>

          {/* <div className="w-full"> */}

          {/* {!showPopUp && (
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
          )} */}

          {/* </div> */}

          {/* <Grid item lg={3} sm={6} xs={12}> */}
          {/* KPI VIEW */}
          {/* OSA */}
          {/* <KpiPop */}
          {/* isLoaded={fullness} */}
          {/* chart={statisticsChartsData[2].chart} */}
          {/* title="OSA" */}
          {/* count="NA" */}
          {/* percentage="NA" */}
          {/* // isLoss */}
          {/* // chipColor="success" */}
          {/* color={'#9CA3AF'} */}
          {/* // color={theme.palette.success.main} */}
          {/* /> */}
          {/* </Grid> */}

          {showPopUp && (
            <Grid
              item
              lg={3}
              sm={6}
              xs={12}
              onClick={() => {
                handleOpenPopup();
                setVal('1');
              }}
            >
              <CaptureProgressCard date={selectedDate} />
            </Grid>
          )}

          {showPopUp && <PopUp open={popupOpen} onClose={handleClosePopup} value={val} selectedDate={selectedDate} />}

          <Grid item lg={3} sm={6} xs={12}>
            <AnomalyKPICard date={selectedDate} anomalycount7days={anomalycount7days} />
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
                    <Card style={{ position: 'relative' }}>
                      {
                        // histogramData
                        seriesData.length > 0 || seriesData.length == 0 ? (
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
                                      {/* <div style={{display: "flex", alignItems:"center", gap : "7px", marginLeft: "40px", cursor:"pointer"}} onClick={()=>{handleclickontester()}}>
                                      <div className='' style={{height:"12px",width: "12px" , background: "red", borderRadius:"50%"}}>

                                      </div>
                                      <div className=''> 
                                              Tester Percent
                                      </div>
                                      </div>
                                      <div style={{display: "flex", alignItems:"center", gap : "7px", marginLeft: "9px",  cursor:"pointer"}} onClick={()=>{handleclickOnOsa()}}>
                                      <div className=' bg-red-300' style={{height:"12px",width: "12px" , borderRadius:"50%"}}>

                                      </div>
                                      <div className=''>
                                              Osa Score
                                      </div>
                                      </div> */}
                                      <Select
                                        style={{
                                          position: 'absolute',
                                          right: '20px',
                                          top: '9px',
                                          background: '#fff',
                                          height: '40px',
                                          outline: 'hidden'
                                        }}
                                        value={dropdown}
                                        onChange={(e) => {
                                          setdropdown(e.target.value);
                                        }}
                                      >
                                        <MenuItem
                                          onClick={() => {
                                            handleclickOnOsa();
                                          }}
                                          value="Osa Score"
                                        >
                                          Osa Score
                                        </MenuItem>
                                        <MenuItem
                                          onClick={() => {
                                            handleclickontester();
                                          }}
                                          value="Tester Score"
                                        >
                                          Tester Score
                                        </MenuItem>
                                      </Select>
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
                      {/* content */}
                      <AnomaliesBarChart selectedDate={selectedDate} />
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item lg={3} xs={12} className="invisible lg:visible">
            <Stack spacing={gridSpacing}>
              <Card
                className="border border-gray-300 bg-[#ff413a] h-1/3"
                style={{
                  padding: '10px'
                }}
              >
                <div className="flex w-full h-full">
                  <div className="w-1/2 h-full flex flex-col">
                    <span className="text-center text-white text-sm font-semibold">Missing</span>
                    {!anomaliesLoading ? (
                      <span className="text-center text-white  flex-grow flex flex-col justify-center text-3xl font-semibold">
                        {anoCount ? anoCount.unresolvedMissingTesterCount : 'NA'}
                      </span>
                    ) : (
                      <Skeleton variant="rectangular" height={42} className="rounded-md" />
                    )}
                  </div>
                  <div className="w-1/2 h-full flex flex-col border-l-2 border-t-0 border-b-0 border-l-white">
                    <span className="text-center text-white  text-sm font-semibold">Empty Shelf</span>
                    {!anomaliesLoading ? (
                      <span className="text-center text-white  flex-grow flex flex-col justify-center text-3xl font-semibold">
                        {anoCount ? anoCount.unresolvedEmptyTrayCount : 'NA'}
                      </span>
                    ) : (
                      <Skeleton variant="rectangular" height={42} className="rounded-md" />
                    )}
                  </div>
                  {/* <div className="w-2/6 h-full flex flex-col">
                    <span className="text-center text-white  text-sm font-semibold">Correct</span>
                    {!anomaliesLoading ? (
                      <span className="text-center text-white  flex-grow flex flex-col justify-center text-3xl font-semibold">
                        {anomaliesCount[0].correct}
                      </span>
                    ) : (
                      <Skeleton variant="rectangular" height={45} className="rounded-md" />
                    )}
                  </div> */}
                </div>
              </Card>
              <Card>
                {/* progress */}
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
                      capProgress.length > 0 &&
                      capProgress.map((item, key) => {
                        return (
                          <Grid key={key} item xs={12}>
                            <Grid container justifyContent={'space-between'} alignItems="center" spacing={1}>
                              <Grid item sm zeroMinWidth>
                                <Typography variant="body2">{item.store_name}</Typography>
                              </Grid>
                              <Grid item>
                                <Typography variant="body2" align="right">
                                  {/* {Math.floor(item.capture_percentage)}% */}
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

                                        [theme.breakpoints.up('xl')]: {
                                          height: 5 // Height for screens equal to or larger than 'lg' breakpoint
                                        }
                                      }}
                                      variant="determinate"
                                      aria-label="direct"
                                      // value={Math.floor(item.capture_percentage)}
                                      value={parseFloat(item.captureProgress)}
                                      color="primary"

                                      // onScroll={()=>setOpenZone(false)}
                                    />
                                  </div>
                                  {/* {openZone[key] ? (
                                    <FaEyeSlash className="cursor-pointer" onClick={() => handleZoneCaptureProgressMenuClose(key)} />
                                  ) : (
                                    <FaEye className="cursor-pointer" onClick={() => handleZoneCaptureProgressMenuOpen(key)} />
                                  )} */}
                                </div>
                                {false && (
                                  <Paper className="mt-10 p-5 max-h-96 overflow-y-auto" elevation={10}>
                                    <Typography variant="h4">Zone wise Capture Progress</Typography>
                                    {/* {item.length > 0 && */}
                                    {item.captureProgressZoneData.map((it, index) => {
                                      return (
                                        <div key={index}>
                                          <Typography key={index} className="m-2" variant="body1" color="initial">
                                            {it.zone_id} - {parseFloat(it.capturePercentage).toFixed(2)}%
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
                                            value={parseFloat(it.capturePercentage)}
                                            color="primary"
                                            // onClick={()=>(setOpenZone(!openZone))}
                                          />
                                        </div>
                                      );
                                    })}
                                  </Paper>
                                  //                                   <Menu
                                  //   id="capture-progress-menu"
                                  //   anchorEl={anchorEl}
                                  //   open={openZone}
                                  //   onClose={handleZoneCaptureProgressMenuClose}
                                  //   anchorOrigin={{
                                  //     vertical: 'bottom',
                                  //     horizontal: 'right',
                                  //   }}
                                  //   transformOrigin={{
                                  //     vertical: 'top',
                                  //     horizontal: 'right',
                                  //   }}
                                  //   // PaperProps={{
                                  //   //   style: {
                                  //   //     maxHeight: ITEM_HEIGHT * 4.5,
                                  //   //     width: '20ch',
                                  //   //   },
                                  //   // }}
                                  // >
                                  //   <MenuItem disabled>
                                  //     <Typography variant="h6">Zone-wise Capture Progress</Typography>
                                  //   </MenuItem>
                                  //   {item.captureProgressZoneData.map((it, index) => (
                                  //     <MenuItem key={index} disabled>
                                  //       <Typography variant="body1" color="initial">
                                  //         {it.zone_id} - {parseFloat(it.capturePercentage).toFixed(2)}%
                                  //       </Typography>
                                  //       <LinearProgress
                                  //         sx={{
                                  //           borderRadius: 3,
                                  //           height: 5,
                                  //           [theme.breakpoints.up('xl')]: {
                                  //             height: 5,
                                  //           },
                                  //         }}
                                  //         variant="determinate"
                                  //         aria-label="direct"
                                  //         value={parseFloat(it.capturePercentage)}
                                  //         color="primary"
                                  //       />
                                  //     </MenuItem>
                                  //   ))}
                                  // </Menu>
                                )}
                              </Grid>
                            </Grid>
                          </Grid>
                        );
                      })
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
