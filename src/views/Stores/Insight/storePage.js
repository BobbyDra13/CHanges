import React, { useEffect, useState } from 'react';
import { Grid, Paper, LinearProgress, Skeleton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// import Chart from 'react-apexcharts';
//import { PaidSharp } from '@mui/icons-material';
import SideBar from './sideBar';
import LineChartToggle from './lineChartToggle';
import Rightbar from './rightbar';
import GroupIcon from '@mui/icons-material/Group';
import DonutChart from './TrendsViewCharts/DonutChart';
import DonutChartTwo from './TrendsViewCharts/DonutChartTwo';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import UpdateIcon from '@mui/icons-material/Update';
import Uniquejourney from './KPICards/Uniquejourney';
import { avgDwelTime } from '../../../api/sentinelAPI';
import { footfallCard } from '../../../api/sentinelAPI';
import NoDataImg from '../../../assets/images/No_data-amico.svg';

const StorePage = () => {
  const theme = useTheme();
  // const accentColDark = theme.palette.success.dark;
  // const accentColLight = theme.palette.success.light;
  // const avgCapProgress = 75;
  // const isMediumScreen = !useMediaQuery(theme.breakpoints.up('md'));
  //const isSmallScreen = !useMediaQuery(theme.breakpoints.up('sm'));
  // const isExtraSmallScreen = !useMediaQuery(theme.breakpoints.up('xs'));

  //avg dweltime data fetch start
  const [storeDwelTime, setStoreDwelTime] = useState(false);
  const [averageDwellTime, setAverageDwellTime] = useState(false);
  const [dweltimeData, setDweltimedata] = useState(false);
  const [footfalldata, setFootfalldata] = useState(false);
  const [ftfall, setftfall] = useState([]);
  const [dt, setdt] = useState('');
  const calDate = (d) => {
    setdt(d.toString());
    return d;
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

  useEffect(() => {
    if (isMounted) {
      const commonBody = {
        start_date: dt,
        storeId: '65c5e26a0b5be5dc7af327dc'
      };
      // eslint-disable-next-line
      async function getDataDwell() {
        // console.log(dt);
        try {
          const data = await avgDwelTime(commonBody);
          // console.log('Dwell Time', data);
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
      // eslint-disable-next-line
      async function getFootfalldata() {
        try {
          const data = await footfallCard(commonBody);
          // console.log(data);
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
      getFootfalldata();
      getDataDwell();
    }
    // eslint-disable-next-line
  }, [dt]);

  //avg dweltime data fetch end

  const sidebarStyle = {
    flex: '0 0 200px',
    // width: '230px',
    margin: '0',
    // backgroundColor: '#f0f0f0',
    // position: 'fixed',
    padding: '2px',
    paddingTop: '32px',
    right: '0px',
    top: '65px',
    height: '100%'
    // [theme.breakpoints.down('md')]: {
    //   position: 'fixed',
    //   top: '0',
    //   height: 'auto',
    //   width: '100%',
    //   zIndex: 1000,
    //   ...(isMediumScreen && {
    //     flexGrow: '1',
    //     maxWidth: '100%',
    //     display: 'flex',
    //     position: 'relative',
    //     flexDirection: 'column',
    //     alignItems: 'center'
    //   }),
    //   ...(isSmallScreen && {
    //     flexGrow: '1',
    //     maxWidth: '100%',
    //     position: 'relative',
    //     display: 'flex',
    //     flexDirection: 'column',
    //     paddingTop: '0',
    //     padding: '0',
    //     alignItems: 'center',
    //     left: '0'
    //   }),
    //   ...(isExtraSmallScreen && { flexGrow: '1', maxWidth: '100%', display: 'flex', position: 'relative', flexDirection: 'column' })
    // }
  };

  //end
  const mainContentStyle = {
    flexGrow: '1',
    maxWidth: '100%',
    minWidth: '0',
    // width:'auto',
    // marginLeft: isSmallScreen ? '0' : '200px',
    // marginRight: isSmallScreen ? '0' : '200px',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    [theme.breakpoints.down('md')]: {
      marginLeft: 0,
      width: '100%'
    }
  };

  const paperStyle = {
    width: '100%',
    maxHeight: '280px',
    height: '280px',
    padding: '10px',
    marginBottom: '20px',
    position: 'relative',
    left: 'auto',
    borderRadius: '15px',
    display: 'flex',
    alignItems: 'center',
    flex: '1'
  };

  ftfall && ftfall.sort((a, b) => b.totalCustomerZone - a.totalCustomerZone);
  dweltimeData && dweltimeData.sort((a, b) => b.avgDwellTime - a.avgDwellTime);

  return (
    <Grid container spacing={2}>
      <SideBar selField="storeOverview" />
      <Grid item md={1.5}></Grid>
      <Grid item xs={12} md={8.5} sx={mainContentStyle}>
        <Grid container spacing={1}>
          <Grid
            item
            xs={12}
            md={3}
            sm={6}
            sx={{
              width: '100%',
              // height:'100px',
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
            <Paper elevation={3} sx={paperStyle}>
              {ftfall.length > 0 ? (
                <div className="flex  w-full  flex-col gap-1">
                  <div className="flex items-center justify-center gap-2 w-full">
                    {footfalldata ? (
                      <DirectionsWalkIcon className="bg-[#444444] text-white rounded-full p-2 text-5xl" />
                    ) : (
                      <Skeleton variant="circular" width={60} height={45} />
                    )}
                    <div className="w-full">
                      {/* {footfallData ? <p><p> : <p>....<p> */}
                      {footfalldata ? (
                        <p className="text-3xl">{footfalldata}</p>
                      ) : (
                        <Skeleton variant="rectangular" className="mb-3 rounded-sm" width={50} height={20} />
                      )}

                      {footfalldata ? (
                        <p className="text-lg">Store Footfall</p>
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
                <img style={{ height: '392px' }} src={NoDataImg} alt="No data" />
              )}
            </Paper>
          </Grid>
          <Grid
            item
            xs={12}
            md={3}
            sm={6}
            sx={{
              width: '100%',
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
            <Paper elevation={3} sx={paperStyle}>
              {dweltimeData.length > 0 || dweltimeData.length === 0 ? (
                <div className="flex flex-col w-full gap-1">
                  <div className="flex  gap-2">
                    {storeDwelTime ? (
                      <UpdateIcon className="bg-[#444444] text-white rounded-full p-2 text-5xl" />
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
                        <p className="text-lg">Avg Dwell Time</p>
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
                <img style={{ height: '392px' }} src={NoDataImg} alt="No data" />
              )}
            </Paper>
          </Grid>
          <Grid
            item
            md={3}
            sm={6}
            sx={{
              width: '100%',
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
            <Paper elevation={3} sx={paperStyle}>
              {/* <div style={{ flex: 0.5 }}>
                <PaidSharp
                  sx={{
                    fontSize: '6rem',
                    width: '75%',
                    minWidth: '50%',
                    marginLeft: '10px',
                    color: theme.palette.success.main
                  }}
                />
              </div>
              <div className="flex flex-col" style={{ flex: '1' }}>
                <Typography variant="h1" sx={{ fontSize: 'auto', color: theme.palette.success.main }}>
                  {avgCapProgress ? (
                    `Rs. --`
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
                <Typography variant="h3" color="textSecondary" sx={{ maxWidth: '100%', fontSize: 'auto' }}>
                  Conversion Saved
                </Typography>
              </div> */}
              <Uniquejourney date={dt} />
            </Paper>
          </Grid>
          <Grid
            item
            md={3}
            sm={6}
            sx={{
              width: '100%',
              mb: -1,
              mt: 1,
              [theme.breakpoints.up('sm')]: {
                mb: 5,
                mt: 1 // Height for screens equal to or larger than 'md' breakpoint
              },
              [theme.breakpoints.up('md')]: {
                mb: -1,
                mt: -1 // Height for screens equal to or larger than 'md' breakpoint
              }
            }}
            className="opacity-30 "
          >
            <Paper
              elevation={3}
              sx={{
                padding: '10px'
              }}
            >
              <div className="flex gap-2">
                <GroupIcon className="bg-[#444444] text-white rounded-full p-2 text-6xl" />
                <div className="flex flex-col">
                  <p className="text-4xl text-[#444444]">32</p>
                  <p className="text-lg text-[#444444]">Groups</p>
                </div>
              </div>
            </Paper>
            <Paper
              elevation={3}
              sx={{
                padding: '5px',
                marginTop: '5px'
              }}
            >
              <div className="flex gap-2">
                <div className=" w-16">
                  <DonutChart />
                </div>
                <div className="flex flex-col">
                  <p className="text-4xl text-[#444444]">20-25</p>
                  <p className="text-lg text-[#444444]">avg age</p>
                </div>
              </div>
            </Paper>
            <Paper
              elevation={3}
              sx={{
                padding: '5px',
                marginTop: '5px'
              }}
            >
              <div className="flex gap-2">
                <div className=" w-16">
                  <DonutChartTwo />
                </div>
                <div className="flex flex-col">
                  <p className="text-4xl text-[#444444]">63%</p>
                  <p className="text-lg text-[#444444]">male</p>
                </div>
              </div>
            </Paper>
          </Grid>
        </Grid>
        <LineChartToggle date={dt} />
      </Grid>
      <Grid item sx={sidebarStyle} md={2} sm={12}>
        <Rightbar date={calDate} />
      </Grid>
    </Grid>
  );
};

export default StorePage;
