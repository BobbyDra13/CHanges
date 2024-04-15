import React, { useState, useEffect } from 'react';
import { Grid, Stack, Typography, Card, Skeleton, LinearProgress, Modal, Box } from '@mui/material';
import { useMediaQuery, useTheme } from '@mui/material';
import { avgDwelTime } from '../../../api/sentinelAPI';
// import { footfallCard } from '../../../api/sentinelAPI';
import { getRatio } from 'api/sentinelAPI';
// import NoDataImg from '../../../assets/images/No_data-amico.svg';
// import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import DatePickerStore from './Calendar';
// import UpdateIcon from '@mui/icons-material/Update';
import Uniquejourney from './KPICards/Uniquejourney';
// import DonutChart from './TrendsViewCharts/DonutChart';
// import DonutChartTwo from './TrendsViewCharts/DonutChartTwo';
// import GroupIcon from '@mui/icons-material/Group';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import Diversity3Icon from '@mui/icons-material/Diversity3';
import LineChartToggle from './lineChartToggle';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import { IoMdSettings } from 'react-icons/io';
import CsvModal from './CsvUpload';
import RadarChart from './RadarChart';
import { GetPopPercentage, GetpopKPI, GetCapProgStoreView, GetAnomalies } from 'api';
import { IoIosWarning } from 'react-icons/io';
// import { get } from 'react-hook-form';
import Chart from 'react-apexcharts';
import popIcon from '../../../assets/images/pop_icon.png';

import pog from '../../../assets/images/pog.jpeg';

function Overview() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));

  const [storeDwelTime, setStoreDwelTime] = useState(false);
  const [averageDwellTime, setAverageDwellTime] = useState(false);
  const [dweltimeData, setDweltimedata] = useState(false);
  const [footfalldata, setFootfalldata] = useState(false);
  const [ftfall, setftfall] = useState([]);
  const [date, setSelectedDate] = useState('');
  //eslint-disable-next-line
  const [empCount, setEmpCount] = useState('');
  //eslint-disable-next-line
  const [costcnt, setCostcnt] = useState('');
  // const [ratio, setRatio] = useState('');
  const [openPopScoreModal, setOpenPopScoreModal] = useState(false);
  //eslint-disable-next-line
  const [captureProg, setCaptureProg] = useState([]);
  const [capProgressValue, setCapProgressValue] = useState(0);
  const [anomaliesCount, setAnomaliesCount] = useState(0);

  const handleClickPopScoreModal = () => {
    setOpenPopScoreModal((prev) => !prev);
    console.log(openPopScoreModal);
  };

  const handleClose = () => {
    setOpenPopScoreModal(false);
  };

  const accentColLight = theme.palette.success.light;
  const accentColDark = theme.palette.success.dark;
  const progressChart = {
    options: {
      chart: {
        height: 180,
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
            padding: 0,
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

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: isSmallScreen ? 300 : isMediumScreen ? 500 : 800,
    height: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: '15px'
  };

  // console.log(ratio);

  // const calDate = (d) => {
  //   setSelectedDate(d.toString());
  //   return d;
  // };

  const [isMounted, setIsMounted] = useState(true);
  const [totalPOP, setTotalPop] = useState(false);
  useEffect(() => {
    // Set the component to be mounted when the effect is run
    setIsMounted(true);

    // Return a cleanup function to set the component to unmounted
    return () => {
      setIsMounted(false);
    };
  }, []);

  useEffect(() => {
    if (isMounted) {
      const commonBody = {
        start_date: date,
        storeId: '65c5e26a0b5be5dc7af327dc'
      };
      const popBody = {
        date: date,
        store_id: '65c74d4112465588b7a4984c'
      };
      // eslint-disable-next-line
      async function getDataDwell() {
        // console.log(date);
        try {
          const data = await avgDwelTime(commonBody);
          console.log('Dwell Time', data);
          // console.log(data.length);
          if (data.storeDwellTime.length == 0) {
            setStoreDwelTime(false);
            setDweltimedata(false);
          } else if (data.storeDwellTime.length > 0) {
            const { storeDwellTime } = data;

            const storeAvgDwellTime = storeDwellTime[0].avgDwellTime;

            setStoreDwelTime(storeAvgDwellTime);

            const filteredZoneDwellTime = data.zoneDwellTime.filter((zone) => zone.zoneName !== 'Entry');
            setDweltimedata(filteredZoneDwellTime);

            const avgDwellTimeValues = filteredZoneDwellTime.map((zone) => zone.avgDwellTime);
            const total = avgDwellTimeValues.reduce((acc, val) => acc + val, 0);
            const avg = total / avgDwellTimeValues.length;
            setAverageDwellTime(avg);
          }
          return data;
        } catch (error) {
          console.log(error);
        }
      }
      // console.log(commonBody);
      // eslint-disable-next-line
      async function getFootfalldata() {
        try {
          // const data = await footfallCard(commonBody);
          const data = await GetpopKPI(popBody);
          const data2 = await GetPopPercentage(popBody);
          // console.log(data2.data);
          data2.data != null ? setTotalPop(parseFloat(data2.data.fullnessPopPercent).toFixed(1)) : setTotalPop(false);

          // console.log(data.data);
          if (data.data.length === 0) {
            // console.log('hello')
            setFootfalldata(false);
            setftfall(false);
          } else if (data.data.length > 0) {
            // const { totalCustomerStore } = data[0];
            // const { zones } = data[0];
            const group = data.data;
            group.forEach((item) => {
              let percentageString = item.data.FullnessPopPercent.replace('%', '');
              item.data.FullnessPopPercent = parseFloat(percentageString);
            });
            group.sort((a, b) => a.data.FullnessPopPercent - b.data.FullnessPopPercent);
            // console.log(group);
            setftfall(true);
            // console.log(zones);
            setFootfalldata(group);
          }

          return data;
        } catch (error) {
          console.log(error);
        }
      }
      // eslint-disable-next-line
      async function getRatioData() {
        const body = {
          date: '2024-03-21',
          store_id: '65c74d4112465588b7a4984c'
        };
        try {
          const {
            'Customer count': customerCount,
            'Employee count': employeeCount
            // 'Employee to customer ratio': ratio
          } = await getRatio(body);
          setEmpCount(employeeCount);
          setCostcnt(customerCount);
          // setRatio(ratio);
          // const u = await data.length
          // setUniquejourneys(u);
          // setJourneyData([...data]);
          // console.log(journeyData.length)
          // console.log(dta);
          // return ;
        } catch (error) {
          console.log(error);
        }
      }
      //eslint-disable-next-line
      async function getCaptureProg() {
        try {
          const capProgress = await GetCapProgStoreView(popBody);
          // console.log('capTop ', capProgress);

          // const capProg = capProgress.data.captureProgressZoneData.map((item) => {
          //   return {
          //     ...item,
          //     captureProgress: parseFloat(item.captureProgress.replace('%', ''))
          //   };
          // });
          // setCaptureProg(capProg);
          setCapProgressValue(capProgress.data[0].capture_percentage);
          console.log('capture progress', capProgressValue);
        } catch (error) {
          console.log(error);
        }
      }
      //eslint-disable-next-line
      async function getAnomalies() {
        try {
          const anomalies = await GetAnomalies(popBody);
          console.log('Anomalies ', anomalies.data.anomaly_count);
          setAnomaliesCount(anomalies.data.anomaly_count);
        } catch (error) {
          console.log(error);
        }
      }

      getAnomalies();
      getFootfalldata();
      getDataDwell();
      getRatioData();
      getCaptureProg();
    }
    return () => {
      setFootfalldata(false);
      // setCaptureProg([]);
      setCapProgressValue(0);
      setAnomaliesCount(0);
      // setftfall(false)
    };
    // eslint-disable-next-line
  }, [date]);

  // ftfall && ftfall.sort((a, b) => b.totalCustomerZone - a.totalCustomerZone);
  // dweltimeData && dweltimeData.sort((a, b) => b.avgDwellTime - a.avgDwellTime);

  return (
    <div className="  w-full ">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Stack direction={isSmallScreen ? 'column' : 'row'} justifyContent={'space-between'}>
            <Typography variant="h3">Overview</Typography>
            <div>
              <DatePickerStore SetSelectedDate={setSelectedDate} style={{ borderRadius: '15px' }} />
            </div>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2.4}>
              <Card className="border border-gray-300" sx={{ height: '276px' }}>
                {ftfall ? (
                  <div className="flex  w-full  flex-col gap-1 p-3">
                    <div className="flex items-center justify-center gap-2 w-full">
                      {footfalldata.length > 0 ? (
                        // <DirectionsWalkIcon className="bg-[#444444] text-white rounded-full p-2 text-6xl" />
                        <img src={popIcon} alt="pop" className="h-14 w-14" />
                      ) : (
                        <Skeleton variant="circular" width={60} height={45} />
                      )}
                      <div className="w-full">
                        {footfalldata.length > 0 ? (
                          <p className="text-3xl">{totalPOP} %</p>
                        ) : (
                          <Skeleton variant="rectangular" className="mb-3 rounded-sm" width={50} height={20} />
                        )}

                        {footfalldata.length > 0 ? (
                          <p className="text-lg font-semibold">PoP</p>
                        ) : (
                          <Skeleton variant="rectangular" width={150} height={15} className=" mb-2 rounded-sm" />
                        )}
                      </div>
                      <>
                        <IoMdSettings className="text-5xl cursor-pointer" onClick={handleClickPopScoreModal} />
                        <Modal
                          open={openPopScoreModal}
                          onClose={handleClose}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                        >
                          <Box sx={modalStyle}>
                            <CsvModal />
                          </Box>
                        </Modal>
                      </>
                    </div>
                    {footfalldata.length > 0 ? (
                      <div className=" bg-slate-100 flex-grow overflow-y-auto h-[184px] p-2 rounded-lg scrollbar">
                        {footfalldata.map((item, index) => {
                          // const percentage = (item.totalCustomerZone / ftfall[0].totalCustomerZone) * 100;
                          const percentage =
                            item.data.FullnessPopPercent != undefined ? Math.round(parseFloat(item.data.FullnessPopPercent)) : 0;
                          const barcolor = percentage >= 80 ? '#00ac69' : percentage >= 50 ? '#f4a100' : '#ff413a';
                          // console.log(percentage);
                          return (
                            <div className="mt-2" key={index}>
                              <div className="flex gap-1 items-center">
                                {/* <div
                                  className=" rounded-full h-4 w-4"
                                  style={{
                                    backgroundColor: `${item.zoneColourHex}`
                                  }}
                                >
                                  {' '}
                                </div> */}
                                <div>
                                  {item.zone_id} : {percentage} %
                                </div>
                              </div>
                              <LinearProgress
                                variant="determinate"
                                value={percentage}
                                className="rounded-lg"
                                sx={{
                                  marginTop: '5px',
                                  backgroundColor: 'white', // Set color for unfilled part
                                  '& .MuiLinearProgress-bar': {
                                    backgroundColor: `${barcolor}` // Set color for filled part
                                  }
                                }}
                              />
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <Skeleton variant="rectangular" height={184} className="rounded-md" />
                    )}
                  </div>
                ) : (
                  <div className="flex  w-full  flex-col gap-1 p-3">
                    <div className="flex items-center justify-center gap-2 w-full">
                      <img src={popIcon} alt="pop" className="h-14 w-14" />
                      <div className="w-full">
                        <p className="text-3xl text-gray-500 ">NA</p>
                        <p className="text-lg font-semibold">PoP</p>
                      </div>
                      <>
                        <IoMdSettings className="text-5xl cursor-pointer" onClick={handleClickPopScoreModal} />
                        <Modal
                          open={openPopScoreModal}
                          onClose={handleClose}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                        >
                          <Box sx={modalStyle}>
                            <CsvModal />
                          </Box>
                        </Modal>
                      </>
                    </div>
                    <div className=" bg-slate-100 flex-grow overflow-y-auto h-[184px] p-2 rounded-lg scrollbar">
                      <p className="text-base font-semibold text-gray-500">Currently No data available</p>
                    </div>
                  </div>

                  // <img src={NoDataImg} style={{height:"100%", width:"100%"}} alt="No data" />
                )}
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2.4}>
              <Card className="border border-gray-300" sx={{ height: '276px' }}>
                {dweltimeData.length > 0 || dweltimeData.length === 0 ? (
                  <div className="flex flex-col w-full gap-1 p-3">
                    <div className="flex items-center justify-center gap-2 w-full">
                      {storeDwelTime ? (
                        <img src={pog} alt="pop" className="h-14 w-14" />
                      ) : (
                        <Skeleton variant="circular" width={45} height={45} />
                      )}
                      <div className="w-full">
                        {storeDwelTime ? (
                          <p className="text-3xl">{averageDwellTime.toFixed(2)} min</p>
                        ) : (
                          <Skeleton variant="rectangular" className="mb-3 rounded-sm" width={50} height={15} />
                        )}
                        {storeDwelTime ? (
                          <p className="text-lg font-semibold">PoG</p>
                        ) : (
                          <Skeleton variant="rectangular" width={150} height={15} className=" mb-5 rounded-sm" />
                        )}
                      </div>
                      <IoMdSettings className="text-5xl cursor-not-allowed" />
                    </div>
                    {storeDwelTime ? (
                      <div className=" bg-slate-100 flex-grow overflow-y-auto h-[184px] scrollbar rounded-lg p-2.5">
                        {dweltimeData.map((item, index) => {
                          const percentage = (item.avgDwellTime / dweltimeData[0].avgDwellTime) * 100;
                          const barcolor = percentage >= 80 ? '#00ac69' : percentage >= 50 ? '#f4a100' : '#ff413a';
                          return (
                            <div className="mt-2" key={index}>
                              <div className="flex gap-1 items-center">
                                <div
                                  className=" rounded-full h-4 w-4"
                                  style={{
                                    backgroundColor: `${item.zoneColourHex}`
                                  }}
                                >
                                  {' '}
                                </div>
                                <div>
                                  {item.zoneName} : {item.avgDwellTime.toFixed(2)} min
                                </div>
                              </div>
                              <LinearProgress
                                variant="determinate"
                                value={percentage}
                                sx={{
                                  marginTop: '5px',
                                  backgroundColor: 'rgb(241 245 249)', // Set color for unfilled part
                                  '& .MuiLinearProgress-bar': {
                                    backgroundColor: `${barcolor}` // Set color for filled part
                                  }
                                }}
                              />
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <Skeleton variant="rectangular" height={184} className="rounded-md" />
                    )}
                  </div>
                ) : (
                  // dfhfdjdgretyuiuoiytrretyuk
                  <div className="flex  w-full  flex-col gap-1 p-3">
                    <div className="flex items-center justify-center gap-2 w-full">
                      {/* <DirectionsWalkIcon className="bg-[#444444] text-white rounded-full p-2 text-6xl" /> */}
                      <img src={pog} alt="pop" className="h-14 w-14" />

                      <div className="w-full">
                        <p className="text-3xl text-gray-500 ">NA</p>
                        <p className="text-lg font-semibold">PoG</p>
                      </div>
                      <IoMdSettings className="text-5xl cursor-not-allowed" />
                    </div>
                    <div className=" bg-slate-100 flex-grow overflow-y-auto h-[184px] p-2 rounded-lg scrollbar">
                      <p className="text-base font-semibold text-gray-500">Currently No data available</p>
                    </div>
                  </div>

                  // <img src={NoDataImg} style={{height:"100%", width:"100%"}} alt="No data" />
                )}
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2.4}>
              <Card className="border border-gray-300" sx={{ height: '276px' }}>
                <Uniquejourney date={date} />
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2.4}>
              <div style={{ height: '276px' }} className="flex flex-col">
                {/* <Card
                  className="border border-gray-300 h-[85px]"
                  sx={{
                    padding: '4px'
                  }}
                >
                  <div className="flex gap-2">
                    <div className="w-24 flex items-center justify-center">
                      <GroupIcon className=" bg-[#444444] text-white rounded-full p-2 text-6xl" />
                    </div>
                    <div className="flex flex-col">
                      <p className="text-4xl text-[#444444]">32</p>
                      <p className="text-lg text-[#444444]">Groups</p>
                    </div>
                  </div>
                </Card> */}
                <Card
                  className="border border-gray-300 h-full"
                  sx={{
                    padding: '5px'
                  }}
                >
                  <RadarChart date={date} />
                </Card>
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2.4}>
              <div className=" flex flex-col gap-2 " style={{ height: '275px' }}>
                <Card
                  className="border border-gray-300 h-2/3"
                  style={{
                    padding: '5px'
                  }}
                >
                  <div className="flex items-center">
                    <div>
                      <Chart
                        options={progressChart.options}
                        series={capProgressValue ? [parseFloat(capProgressValue).toFixed(1)] : [0]}
                        type={progressChart.options.chart.type}
                        height={progressChart.options.chart.height}
                      />
                    </div>
                    <div className="flex gap-1 flex-col">
                      <div className="text-4xl font-semibold">{capProgressValue ? parseFloat(capProgressValue).toFixed(1) : 0}%</div>
                      <div className="text-sm font-semibold">Capture Progress</div>
                    </div>
                  </div>
                </Card>
                <Card
                  className="border border-gray-300 h-1/3"
                  style={{
                    padding: '10px'
                  }}
                >
                  <div className="flex gap-3">
                    <div>
                      <IoIosWarning className="bg-[#444444] text-white rounded-full p-2 text-6xl" />
                    </div>
                    <div className="w-full">
                      <p className="text-4xl text-gray-500 ">{anomaliesCount}</p>
                      <p className="text-lg font-semibold">Anomalies Found</p>
                    </div>
                  </div>
                </Card>
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid className="mb-10" item xs={12} lg={9} xl={9.6}>
              <Card className="border border-gray-300" sx={{ height: '550px' }}>
                <LineChartToggle date={date} />
              </Card>
            </Grid>
            <Grid item className="mb-10" xs={12} lg={3} xl={2.4}>
              <Card className="border border-gray-300 opacity-30 hover:cursor-not-allowed" sx={{ height: '550px' }}>
                <div
                  style={{
                    padding: '10px',
                    textAlign: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <QuestionAnswerIcon className="bg-[#111921] text-white rounded-full p-2 text-5xl" />
                  <div className="flex flex-col items-start pt-1">
                    <h3 className="text-4xl">12</h3>
                    <p>Message Logs</p>
                  </div>
                </div>
                <Card
                  className=" rounded-lg bg-[#111921] text-white w-[95%] mx-auto"
                  sx={{
                    marginTop: '5px',
                    padding: '0.5rem'
                  }}
                >
                  <div className="flex gap-3 mb-1">
                    <AccountCircleIcon className="bg-white text-slate-700 rounded-full p-1 text-3xl" />
                    <div className="flex flex-col gap-2">
                      <div>has not interacted with a customer over 15 mins.</div>
                      <div className="text-blue-500 cursor-pointer font-bold">View {'->'}</div>
                    </div>
                  </div>
                  <div
                    style={{
                      textAlign: 'right'
                    }}
                  >
                    08:02:53 30-01-2024
                  </div>
                </Card>
                <Card
                  className=" rounded-lg bg-[#111921] text-white w-[95%] mx-auto"
                  sx={{
                    marginTop: '5px',
                    padding: '0.5rem'
                  }}
                >
                  <div className="flex gap-3 mb-1">
                    <AccountCircleIcon className="bg-white text-slate-700 rounded-full p-1 text-3xl" />
                    <div className="flex flex-col gap-2">
                      <div>
                        Heavy customer traffic detected at Phone zone. Please re-assign{' '}
                        <span className="font-bold text-cyan-300">Ritesh Kumar</span> to Phones zone for optimal customer - employee ratio.
                      </div>
                      <div className="text-blue-500 cursor-pointer font-bold">View {'->'}</div>
                    </div>
                  </div>
                  <div
                    style={{
                      textAlign: 'right'
                    }}
                  >
                    08:02:53 30-01-2024
                  </div>
                </Card>
                <Card
                  className=" rounded-lg bg-[#111921] text-white w-[95%] mx-auto"
                  sx={{
                    marginTop: '5px',
                    padding: '0.5rem'
                  }}
                >
                  <div className="flex gap-3 mb-1 ">
                    <AccountCircleIcon className="bg-white text-slate-700 rounded-full p-1 text-3xl" />
                    <div className="flex flex-col gap-2">
                      <div>Loyal customer 3330123 detected at entry gate.</div>
                      <div className="text-blue-500 cursor-pointer font-bold">View {'->'}</div>
                    </div>
                  </div>
                  <div
                    style={{
                      textAlign: 'right'
                    }}
                  >
                    <p>08:02:53 30-01-2024</p>
                  </div>
                </Card>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default Overview;
