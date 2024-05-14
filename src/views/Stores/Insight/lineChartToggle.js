import { Grid, Paper } from '@mui/material';
import { useEffect, useState } from 'react';
// import Chart from 'react-apexcharts';
import StoreView from './storeView';
import TrendsChart from './TrendsViewCharts/Trendchart';
import ShelfView from './shelfView';

const LineChartToggle = ({ storeId, date, groups, activeButton, handleButtonClick ,zoneid}) => {
  // const theme = useTheme();
  // const [activeButton, setActiveButton] = useState('Trends View');
  const [isGroup, setIsGroup] = useState(null);
  // const [isZoneid, setIsZoneid] = useState('');
  
  // const handleButtonClick = (button) => {
  //   setActiveButton(button);
  // };
  console.log('okaybhai',groups);
  // const isSmallScreen = !useMediaQuery(theme.breakpoints.up('sm'));
  // const isMediumScreen = !useMediaQuery(theme.breakpoints.up('md'));

  // const data = {
  //   VM: {
  //     data: [42, 17, 89, 53, 78, 26, 61, 94, 12, 32, 69, 48, 85, 19, 73, 5, 91, 38, 67, 30, 75, 80, 40, 43, 56, 81],
  //     dates: [
  //       'Fri, Jan 5, 2024 00:00:00 GMT+0000',
  //       'Sat, Jan 6, 2024 00:00:00 GMT+0000',
  //       'Sun, Jan 7, 2024 00:00:00 GMT+0000',
  //       'Mon, Jan 8, 2024 00:00:00 GMT+0000',
  //       'Tue, Jan 9, 2024 00:00:00 GMT+0000',
  //       'Wed, Jan 10, 2024 00:00:00 GMT+0000',
  //       'Thu, Jan 11, 2024 00:00:00 GMT+0000',
  //       'Fri, Jan 12, 2024 00:00:00 GMT+0000',
  //       'Sat, Jan 13, 2024 00:00:00 GMT+0000',
  //       'Sun, Jan 14, 2024 00:00:00 GMT+0000',
  //       'Mon, Jan 15, 2024 00:00:00 GMT+0000',
  //       'Tue, Jan 16, 2024 00:00:00 GMT+0000',
  //       'Wed, Jan 17, 2024 00:00:00 GMT+0000',
  //       'Thu, Jan 18, 2024 00:00:00 GMT+0000',
  //       'Fri, Jan 19, 2024 00:00:00 GMT+0000',
  //       'Sat, Jan 20, 2024 00:00:00 GMT+0000',
  //       'Sun, Jan 21, 2024 00:00:00 GMT+0000',
  //       'Mon, Jan 22, 2024 00:00:00 GMT+0000',
  //       'Tue, Jan 23, 2024 00:00:00 GMT+0000',
  //       'Wed, Jan 24, 2024 00:00:00 GMT+0000',
  //       'Thu, Jan 25, 2024 00:00:00 GMT+0000',
  //       'Fri, Jan 26, 2024 00:00:00 GMT+0000',
  //       'Sat, Jan 27, 2024 00:00:00 GMT+0000',
  //       'Sun, Jan 28, 2024 00:00:00 GMT+0000',
  //       'Mon, Jan 29, 2024 00:00:00 GMT+0000',
  //       'Tue, Jan 30, 2024 00:00:00 GMT+0000'
  //     ]
  //   },
  //   Anomalies: {
  //     data: [68, 39, 74, 23, 56, 81, 12, 47, 60, 18, 85, 31, 42, 76, 50, 92, 28, 65, 10, 70, 45, 65, 76, 32, 78, 48],
  //     dates: [
  //       'Fri, Jan 5, 2024 00:00:00 GMT+0000',
  //       'Sat, Jan 6, 2024 00:00:00 GMT+0000',
  //       'Sun, Jan 7, 2024 00:00:00 GMT+0000',
  //       'Mon, Jan 8, 2024 00:00:00 GMT+0000',
  //       'Tue, Jan 9, 2024 00:00:00 GMT+0000',
  //       'Wed, Jan 10, 2024 00:00:00 GMT+0000',
  //       'Thu, Jan 11, 2024 00:00:00 GMT+0000',
  //       'Fri, Jan 12, 2024 00:00:00 GMT+0000',
  //       'Sat, Jan 13, 2024 00:00:00 GMT+0000',
  //       'Sun, Jan 14, 2024 00:00:00 GMT+0000',
  //       'Mon, Jan 15, 2024 00:00:00 GMT+0000',
  //       'Tue, Jan 16, 2024 00:00:00 GMT+0000',
  //       'Wed, Jan 17, 2024 00:00:00 GMT+0000',
  //       'Thu, Jan 18, 2024 00:00:00 GMT+0000',
  //       'Fri, Jan 19, 2024 00:00:00 GMT+0000',
  //       'Sat, Jan 20, 2024 00:00:00 GMT+0000',
  //       'Sun, Jan 21, 2024 00:00:00 GMT+0000',
  //       'Mon, Jan 22, 2024 00:00:00 GMT+0000',
  //       'Tue, Jan 23, 2024 00:00:00 GMT+0000',
  //       'Wed, Jan 24, 2024 00:00:00 GMT+0000',
  //       'Thu, Jan 25, 2024 00:00:00 GMT+0000',
  //       'Fri, Jan 26, 2024 00:00:00 GMT+0000',
  //       'Sat, Jan 27, 2024 00:00:00 GMT+0000',
  //       'Sun, Jan 28, 2024 00:00:00 GMT+0000',
  //       'Mon, Jan 29, 2024 00:00:00 GMT+0000',
  //       'Tue, Jan 30, 2024 00:00:00 GMT+0000'
  //     ]
  //   },
  //   PoP: {
  //     data: [88, 19, 72, 45, 31, 60, 83, 27, 55, 12, 69, 37, 80, 24, 50, 14, 91, 42, 75, 10, 93, 76, 43, 88, 32, 43],
  //     dates: [
  //       'Fri, Jan 5, 2024 00:00:00 GMT+0000',
  //       'Sat, Jan 6, 2024 00:00:00 GMT+0000',
  //       'Sun, Jan 7, 2024 00:00:00 GMT+0000',
  //       'Mon, Jan 8, 2024 00:00:00 GMT+0000',
  //       'Tue, Jan 9, 2024 00:00:00 GMT+0000',
  //       'Wed, Jan 10, 2024 00:00:00 GMT+0000',
  //       'Thu, Jan 11, 2024 00:00:00 GMT+0000',
  //       'Fri, Jan 12, 2024 00:00:00 GMT+0000',
  //       'Sat, Jan 13, 2024 00:00:00 GMT+0000',
  //       'Sun, Jan 14, 2024 00:00:00 GMT+0000',
  //       'Mon, Jan 15, 2024 00:00:00 GMT+0000',
  //       'Tue, Jan 16, 2024 00:00:00 GMT+0000',
  //       'Wed, Jan 17, 2024 00:00:00 GMT+0000',
  //       'Thu, Jan 18, 2024 00:00:00 GMT+0000',
  //       'Fri, Jan 19, 2024 00:00:00 GMT+0000',
  //       'Sat, Jan 20, 2024 00:00:00 GMT+0000',
  //       'Sun, Jan 21, 2024 00:00:00 GMT+0000',
  //       'Mon, Jan 22, 2024 00:00:00 GMT+0000',
  //       'Tue, Jan 23, 2024 00:00:00 GMT+0000',
  //       'Wed, Jan 24, 2024 00:00:00 GMT+0000',
  //       'Thu, Jan 25, 2024 00:00:00 GMT+0000',
  //       'Fri, Jan 26, 2024 00:00:00 GMT+0000',
  //       'Sat, Jan 27, 2024 00:00:00 GMT+0000',
  //       'Sun, Jan 28, 2024 00:00:00 GMT+0000',
  //       'Mon, Jan 29, 2024 00:00:00 GMT+0000',
  //       'Tue, Jan 30, 2024 00:00:00 GMT+0000'
  //     ]
  //   }
  // };
  const currentDate = new Date();
  const currentDay = currentDate.getDay();
  const startOfWeek = new Date(currentDate.setUTCHours(0, 0, 0, 0));
  startOfWeek.setDate(currentDate.getDate() - currentDay - 3);

  const endOfWeek = new Date(currentDate.setUTCHours(0, 0, 0, 0));
  endOfWeek.setDate(currentDate.getDate() + 2);

  useEffect(() => {
    // console.log(startOfWeek);
    // console.log(date);
    // eslint-disable-next-line
    setIsGroup(groups);
  }, [date]);

  // useEffect(() => {
  //   setIsZoneid(zoneid);
  // },[zoneid]);
  
  return (
    <Grid item sx={{ maxWidth: '100%', maxHeight: '100%', height: 'auto' }}>
      <Paper
        elevation={3}
        sx={{
          width: '100%',
          height: 'auto',
          padding: '20px',
          marginBottom: '20px',
          position: 'relative',
          left: 'auto',
          borderRadius: '15px'
        }}
      >
        <div style={{ padding: '2px', display: 'flex', justifyContent: 'center', alignItems: 'center', paddingBottom: '1%' }}>
          <button
            onClick={() => handleButtonClick('Trends View')}
            style={{
              backgroundColor: activeButton === 'Trends View' ? 'black' : 'gray',
              color: '#fff',
              padding: '4px',
              borderRadius: '17px 0 0 17px',
              marginRight: '3px',
              width: '15%',
              fontSize: '1rem'
            }}
          >
            Trends View
          </button>
          <button
            // onClick={() => handleButtonClick('Store View')}
            style={{
              backgroundColor: activeButton === 'Store View' ? 'black' : 'gray',
              color: '#fff',
              padding: '4px',
              marginRight: '3px',
              width: '15%',
              fontSize: '1rem',
              cursor: 'not-allowed'
            }}
          >
            Store View
          </button>
          <button
            onClick={() => handleButtonClick('Shelf View')}
            style={{
              backgroundColor: activeButton === 'Shelf View' ? 'black' : 'gray',
              color: '#fff',
              padding: '4px',
              borderRadius: '0 17px 17px 0',
              width: '15%',
              fontSize: '1rem'
            }}
          >
            Camera view
          </button>
        </div>
        
        {activeButton == 'Trends View' ? (
          <div style={{ width: '100%', overflow: 'auto', height: '500px' }}>
            {/* <Chart options={chartOptions} series={series} type="line" height={500} width={isSmallScreen || isMediumScreen ? 720 : '100%'} /> */}
            <TrendsChart storeId={storeId} date={date} />
            {/* <Grid
              container
              spacing={1}
              style={{ marginLeft: isSmallScreen || isMediumScreen ? '5%' : '1.3%', marginTop: '-20px', flexWrap: 'nowrap', width: '97%' }}
            >
              {data.VM.dates.slice(-9).map((date, index) => (
                <Grid key={index} item xs={12} sm={6} md={3} sx={{ position: 'relative' }}>
                  <Paper
                    style={{
                      padding: '10%',
                      display: 'flex',
                      border: '2px dotted ',
                      borderRadius: '100%',
                      height: '1%',
                      width: '0.5%',
                      backgroundColor:
                        date == 'Tue, Jan 30, 2024 00:00:00 GMT+0000'
                          ? '#C4C4C4'
                          : date == 'Mon, Jan 29, 2024 00:00:00 GMT+0000'
                          ? '#FF9500'
                          : '#47EBEE',
                      borderColor: '#00b3b3',
                      position: 'relative'
                    }}
                  ></Paper>
                  <Typography variant="body2" sx={{ marginTop: '10px' }}>
                    {isSmallScreen ? new Date(date).toLocaleDateString() : new Date(date).toLocaleDateString()}
                  </Typography>
                  {index < data.VM.dates.slice(-9).length - 1 && (
                    <Paper
                      sx={{
                        position: 'relative',
                        flexGrow: '1',
                        top: '-75%',
                        transform: 'translateX(30%)',
                        width: '79%',
                        height: '10%',
                        backgroundColor:
                          date == 'Sun, Jan 28, 2024 00:00:00 GMT+0000'
                            ? '#FF9500'
                            : date == 'Mon, Jan 29, 2024 00:00:00 GMT+0000'
                            ? '#C4C4C4'
                            : '#00b3b3',
                        content: '""',
                        display: 'block',
                        borderRadius: '0'
                      }}
                    />
                  )}
                </Grid>
              ))}
            </Grid> */}
          </div>
        ) : activeButton == 'Store View' ?(
          <Grid>
            <StoreView activeButton={activeButton} setActiveButton={setActiveButton} date={date} groups={isGroup}/>
          </Grid>
        ): activeButton == 'Shelf View' ? (
          <Grid>
            {console.log("grpspr", groups )}
            
            {console.log('uio',zoneid)}
            {console.log('ytt',activeButton)}
            <ShelfView date={date} groups={groups} zoneid={zoneid}/>
          </Grid>
        ) : (null)
      }
      </Paper>
    </Grid>
  );
};

export default LineChartToggle;
