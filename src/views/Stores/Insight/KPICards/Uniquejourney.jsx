import { Box, Grid, Paper, Stack, Typography, Tooltip, Skeleton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import RouteIcon from '@mui/icons-material/Route';
// import NoDataImg from '../../../../assets/images/No_data-amico.svg';
import { uniqueJourney } from '../../../../api/sentinelAPI';

export default function Uniquejourney({ date }) {
  const [uniquejourneys, setUniquejourneys] = useState('');
  const [journeyData, setJourneyData] = useState(false);

  useEffect(() => {
    async function getData() {
      const body = {
        date: date
      };
      try {
        const data = await uniqueJourney(body);
        // console.log(data);
        const u = await data.length;
        setUniquejourneys(u);
        setJourneyData([...data]);
        // console.log(journeyData.length);
        return data;
      } catch (error) {
        console.log(error);
      }
    }

    getData();
    // eslint-disable-next-line
  }, [date]);

  journeyData && journeyData.sort((a, b) => b.total_customers - a.total_customers);

  return (
    <>
      {journeyData.length > 0 ? (
        <Box className="flex flex-col w-full gap-1 p-3">
          {/* <Paper elevation={0} sx={{width:"100%", height:"100%"}}> */}
          <Stack direction={'row'} className="flex  gap-2">
            {uniquejourneys ? (
              <RouteIcon
                className="bg-[#444444] text-white rounded-full p-2 text-6xl"
                style={{ margin: '2px 10px', transform: 'rotate(45deg)' }}
              />
            ) : (
              <Skeleton variant="circular" width={45} height={45} />
            )}
            <Stack direction={'column'} alignItems="flex-start">
              {/* <Typography variant="h2">117 </Typography>
          <Typography variant="body2">Unique journey</Typography> */}
              {uniquejourneys ? (
                <p className="text-3xl">{uniquejourneys}</p>
              ) : (
                <Skeleton variant="rectangular" className="mb-3 rounded-sm" width={50} height={15} />
              )}
              {uniquejourneys ? (
                <p className="text-lg font-semibold">Unique journey</p>
              ) : (
                <Skeleton variant="rectangular" width={150} height={15} className=" mb-5 rounded-sm" />
              )}
            </Stack>
          </Stack>
          {/* <Box> */}
          {uniquejourneys ? (
            <Box
              //   backgroundColor="#e3e3e3"
              //   padding="5px"
              //   sx={{ overflowY: 'scroll', overflowX: 'hidden', width: '100%', height: '200px', margin: "15px 0 0 10px" }}
              sx={{ overflowX: 'hidden' }}
              className=" bg-slate-100 flex-grow overflow-y-auto h-[184px] scrollbar rounded-lg p-2.5"
            >
              {journeyData.map((j, index) => {
                return (
                  <Grid
                    key={index}
                    container
                    spacing={1}
                    // className="flex gap-1 items-center"
                    style={{
                      marginLeft: '5.5%',
                      marginTop: '5px',
                      marginBottom: '10px',
                      flexWrap: 'nowrap',
                      width: '97%',
                      overflowY: 'hidden',
                      overflowX: 'auto'
                    }}
                  >
                    <Stack direction={'Column'} width="100%">
                      <Typography variant="body1" color="initial">
                        {j.total_customers} Customers
                      </Typography>
                      <Stack direction={'row'} width="100%">
                        {j.unique_path.map((z, ind) => {
                          return (
                            <Grid key={ind} item xs={12} sm={6} md={1.5} sx={{ position: 'relative' }}>
                              <Tooltip title={z.name} placement="top">
                                <Paper
                                  style={{
                                    padding: '8px',
                                    display: 'flex',
                                    // border: '1px solid aqua ',
                                    borderRadius: '50%',
                                    height: '3%',
                                    width: '1%',
                                    backgroundColor: `${z.colourHex}`,
                                    borderColor: '#00b3b3',
                                    position: 'relative',
                                    zIndex: '2'
                                  }}
                                ></Paper>
                              </Tooltip>
                              {ind < j.unique_path.length - 1 && (
                                <Paper
                                  sx={{
                                    position: 'relative',
                                    flexGrow: '1',
                                    top: '-60%',
                                    transform: 'translateX(95%)', // Center the line horizontally
                                    width: '50%', // Full width to cover the space between circles
                                    height: '10%',
                                    backgroundColor: 'grey',
                                    content: '""',
                                    display: 'block',
                                    borderRadius: '0'
                                  }}
                                />
                              )}
                            </Grid>
                          );
                        })}
                      </Stack>
                    </Stack>
                  </Grid>
                );
              })}
            </Box>
          ) : (
            <Skeleton variant="rectangular" height={184} className="rounded-md" />
          )}
          {/* </Box> */}
          {/* </Paper> */}
        </Box>
      ) : (
        <div className="flex  w-full  flex-col gap-1 p-3">
          <div className="flex items-center justify-center gap-2 w-full">
            <RouteIcon
              className="bg-[#444444] text-white rounded-full p-2 text-6xl"
              style={{ margin: '2px 10px', transform: 'rotate(45deg)' }}
            />

            <div className="w-full">
              <p className="text-3xl text-gray-500 ">NA</p>
              <p className="text-lg font-semibold">Unique journey</p>
            </div>
          </div>
          <div className=" bg-slate-100 flex-grow overflow-y-auto h-[184px] p-2 rounded-lg scrollbar">
            <p className="text-base font-semibold text-gray-500">Currently No data available</p>
          </div>
        </div>

        // <img src={NoDataImg} style={{height:"100%", width:"100%"}} alt="No data" />
      )}
    </>
  );
}
