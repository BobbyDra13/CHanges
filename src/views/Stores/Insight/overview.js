import React, { useState, useEffect } from 'react';
import { Grid, Stack, Typography, Card, Skeleton, LinearProgress } from '@mui/material';
import { useMediaQuery, useTheme } from '@mui/material';
import { avgDwelTime } from '../../../api/sentinelAPI';
import { footfallCard } from '../../../api/sentinelAPI';
import { getRatio } from 'api/sentinelAPI';
// import NoDataImg from '../../../assets/images/No_data-amico.svg';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import DatePickerStore from './Calendar';
import UpdateIcon from '@mui/icons-material/Update';
import Uniquejourney from './KPICards/Uniquejourney';
import DonutChart from './TrendsViewCharts/DonutChart';
import DonutChartTwo from './TrendsViewCharts/DonutChartTwo';
import GroupIcon from '@mui/icons-material/Group';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import LineChartToggle from './lineChartToggle';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';

function Overview() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [storeDwelTime, setStoreDwelTime] = useState(false);
  const [averageDwellTime, setAverageDwellTime] = useState(false);
  const [dweltimeData, setDweltimedata] = useState(false);
  const [footfalldata, setFootfalldata] = useState(false);
  const [ftfall, setftfall] = useState([]);
  const [date, setSelectedDate] = useState('');
  const [empCount, setEmpCount] = useState('');
  const [costcnt, setCostcnt] = useState('');
  const [ratio, setRatio] = useState('');
  console.log(ratio);

  // const calDate = (d) => {
  //   setSelectedDate(d.toString());
  //   return d;
  // };

  const [isMounted, setIsMounted] = useState(true);
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
      console.log(commonBody);
      // eslint-disable-next-line
      async function getFootfalldata() {
        try {
          const data = await footfallCard(commonBody);
          console.log(data);
          if (data.length == 0) {
            // console.log('hello')
            setFootfalldata(false);
            setftfall(false);
          } else if (data.length > 0) {
            const { totalCustomerStore } = data[0];
            const { zones } = data[0];
            setftfall(zones);
            // console.log(zones);
            setFootfalldata(totalCustomerStore);
          }

          return data;
        } catch (error) {
          console.log(error);
        }
      }
      async function getRatioData() {
        const body = {
          start_date: date,
          storeId: '65c5e26a0b5be5dc7af327dc'
        };
        try {
          const {
            'Customer count': customerCount,
            'Employee count': employeeCount,
            'Employee to customer ratio': ratio
          } = await getRatio(body);
          setEmpCount(employeeCount);
          setCostcnt(customerCount);
          setRatio(ratio);
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
      getFootfalldata();
      getDataDwell();
      getRatioData();
    }
    // eslint-disable-next-line
  }, [date]);

  ftfall && ftfall.sort((a, b) => b.totalCustomerZone - a.totalCustomerZone);
  dweltimeData && dweltimeData.sort((a, b) => b.avgDwellTime - a.avgDwellTime);

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
                {ftfall.length > 0 ? (
                  <div className="flex  w-full  flex-col gap-1 p-3">
                    <div className="flex items-center justify-center gap-2 w-full">
                      {footfalldata ? (
                        <DirectionsWalkIcon className="bg-[#444444] text-white rounded-full p-2 text-6xl" />
                      ) : (
                        <Skeleton variant="circular" width={60} height={45} />
                      )}
                      <div className="w-full">
                        {footfalldata ? (
                          <p className="text-3xl">{footfalldata}</p>
                        ) : (
                          <Skeleton variant="rectangular" className="mb-3 rounded-sm" width={50} height={20} />
                        )}

                        {footfalldata ? (
                          <p className="text-lg font-semibold">Store Footfall</p>
                        ) : (
                          <Skeleton variant="rectangular" width={150} height={15} className=" mb-2 rounded-sm" />
                        )}
                      </div>
                    </div>
                    {footfalldata ? (
                      <div className=" bg-slate-100 flex-grow overflow-y-auto h-[184px] p-2 rounded-lg scrollbar">
                        {ftfall.map((item, index) => {
                          const percentage = (item.totalCustomerZone / ftfall[0].totalCustomerZone) * 100;
                          const barcolor = percentage >= 80 ? '#00ac69' : percentage >= 50 ? '#f4a100' : '#ff413a';
                          // console.log(percentage);
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
                                  {item.zoneName} : {item.totalCustomerZone}
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
                  <div className="flex  w-full  flex-col gap-1 p-3">
                    <div className="flex items-center justify-center gap-2 w-full">
                      <DirectionsWalkIcon className="bg-[#444444] text-white rounded-full p-2 text-6xl" />

                      <div className="w-full">
                        <p className="text-3xl text-gray-500 ">NA</p>
                        <p className="text-lg font-semibold">Store Footfall</p>
                      </div>
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
                    <div className="flex  gap-2">
                      {storeDwelTime ? (
                        <UpdateIcon className="bg-[#444444] text-white rounded-full p-2 text-6xl" />
                      ) : (
                        <Skeleton variant="circular" width={45} height={45} />
                      )}
                      <div>
                        {storeDwelTime ? (
                          <p className="text-3xl">{averageDwellTime.toFixed(2)} min</p>
                        ) : (
                          <Skeleton variant="rectangular" className="mb-3 rounded-sm" width={50} height={15} />
                        )}
                        {storeDwelTime ? (
                          <p className="text-lg font-semibold">Avg Dwell Time</p>
                        ) : (
                          <Skeleton variant="rectangular" width={150} height={15} className=" mb-5 rounded-sm" />
                        )}
                      </div>
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
                      <UpdateIcon className="bg-[#444444] text-white rounded-full p-2 text-6xl" />

                      <div className="w-full">
                        <p className="text-3xl text-gray-500 ">NA</p>
                        <p className="text-lg font-semibold">Avg Dwell Time</p>
                      </div>
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
              <div style={{ height: '276px' }}>
                <Card
                  className="border border-gray-300"
                  sx={{
                    padding: '7.5px'
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
                </Card>
                <Card
                  className="border border-gray-300"
                  sx={{
                    padding: '5px',
                    marginTop: '5px'
                  }}
                >
                  <div className="flex gap-2">
                    <div className=" w-24 ">
                      <DonutChart />
                    </div>
                    <div className="flex flex-col">
                      <p className="text-4xl text-[#444444]">20-25</p>
                      <p className="text-lg text-[#444444]">avg age</p>
                    </div>
                  </div>
                </Card>
                <Card
                  className="border border-gray-300"
                  sx={{
                    padding: '5px',
                    marginTop: '5px'
                  }}
                >
                  <div className="flex gap-2">
                    <div className=" w-24">
                      <DonutChartTwo />
                    </div>
                    <div className="flex flex-col">
                      <p className="text-4xl text-[#444444]">63%</p>
                      <p className="text-lg text-[#444444]">male</p>
                    </div>
                  </div>
                </Card>
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2.4}>
              <div className=" " style={{ height: '275px' }}>
                <Card
                  className="border border-gray-300"
                  style={{
                    padding: '10px',
                    textAlign: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    height: '84.8px'
                  }}
                >
                  <Diversity3Icon className="bg-[#444444] text-white rounded-full p-2 text-5xl" />
                  <div className="flex flex-col items-start pt-1">
                    {empCount ? <h3 className="text-4xl">{empCount}</h3> : <h3 className="text-4xl">NA</h3>}
                    <p>Total employee count</p>
                  </div>
                </Card>
                <Card
                  className="border border-gray-300 mt-[5px]"
                  style={{
                    padding: '10px',
                    textAlign: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    height: '90.47px'
                  }}
                >
                  <Diversity3Icon className="bg-[#444444] text-white rounded-full p-2 text-5xl" />
                  <div className="flex flex-col items-start pt-1">
                    {empCount ? (
                      <h3 className="text-4xl">
                        {empCount}:{costcnt}
                      </h3>
                    ) : (
                      <h3 className="text-4xl">NA</h3>
                    )}
                    <p>Assoc.-Cust. ratio</p>
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
              <Card className="border border-gray-300" sx={{ height: '550px' }}>
                <div
                  style={{
                    padding: '10px',
                    textAlign: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <QuestionAnswerIcon className="bg-[#444444] text-white rounded-full p-2 text-5xl" />
                  <div className="flex flex-col items-start pt-1">
                    <h3 className="text-4xl">12</h3>
                    <p>Message Logs</p>
                  </div>
                </div>
                <Card
                  className=" rounded-lg bg-slate-700 text-white w-[95%] mx-auto"
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
                  className=" rounded-lg bg-slate-700 text-white w-[95%] mx-auto"
                  sx={{
                    marginTop: '5px',
                    padding: '0.5rem'
                  }}
                >
                  <div className="flex gap-3 mb-1">
                    <AccountCircleIcon className="bg-white text-slate-700 rounded-full p-1 text-3xl" />
                    <div className="flex flex-col gap-2">
                      <div>
                        Heavy customer traffic detected at Phone zone. Please re-assign <span className="font-bold">Ritesh Kumar</span> to
                        Phones zone for optimal customer - employee ratio.
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
                  className=" rounded-lg bg-slate-700 text-white w-[95%] mx-auto"
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
