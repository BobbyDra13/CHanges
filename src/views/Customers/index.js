import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// material-ui
import {
  Card,
  // CardHeader, CardContent, Divider,
  Grid,
  Typography,
  Stack,
  LinearProgress,
  Box,
  useTheme
} from '@mui/material';
// import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

// project import
import Breadcrumb from 'component/Breadcrumb';
import { gridSpacing } from 'config.js';
import { imageData } from 'data/dummyImages';
// import Map from './map';
// assets
import MapImg from '../../assets/images/mapImg.png';

// const location = {
//   address: '1600 Amphitheatre Parkway, Mountain View, california.',
//   lat: 37.42216,
//   lng: -122.08427
// };

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} rounded-[11px] shadow-md ml-1`}
      style={{ ...style, display: 'block', background: '#d1d5db' }}
      onClick={onClick}
    />
  );
}

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} rounded-[11px] shadow-md mr-1`}
      style={{ ...style, display: 'block', background: '#d1d5db' }}
      onClick={onClick}
    />
  );
}

// ==============================|| CUSTOMERS PAGE ||============================== //

const Customers = () => {
  const theme = useTheme();
  const success = theme.palette.success.main;

  const settings = {
    dots: false,
    focusOnSelect: true,
    infinite: false,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 1,
    // initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1526,
        settings: {
          slidesToShow: 7,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 1350,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 1040,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 7,
          slidesToScroll: 1,
          initialSlide: 1
        }
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1,
          initialSlide: 1
        }
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          initialSlide: 1
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 1
        }
      },
      {
        breakpoint: 450,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 340,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <>
      <Breadcrumb title="Stores New">
        <Typography component={Link} to="/" variant="subtitle2" color="inherit" className="link-breadcrumb">
          Insights
        </Typography>
        <Typography variant="subtitle2" color="primary" className="link-breadcrumb">
          Stores New
        </Typography>
      </Breadcrumb>
      <Grid container spacing={gridSpacing}>
        <Grid xs={12} item>
          <Card sx={{ padding: 1 }}>
            <Grid container spacing={1}>
              <Grid item lg={4} md={5} sm={9} xs={12}>
                <Grid container spacing={0}>
                  <Grid sx={{ paddingRight: 1 }} item>
                    <img
                      style={{ display: 'block', objectFit: 'cover' }}
                      className="rounded-md border border-gray-300 w-20 h-[105px] drop-shadow-md"
                      src={MapImg}
                      alt="noImg"
                    />
                    {/* <div className="rounded-md border border-gray-300 w-20 h-[105px] drop-shadow-md">
                      <Map location={location} zoomLevel={3} />
                    </div> */}
                  </Grid>
                  <Grid item sx={{ display: 'flex', flex: 1 }}>
                    <Stack sx={{ width: '100%' }} direction={'column'}>
                      <Stack direction={'row'} spacing={1}>
                        <div className="h-full flex flex-col justify-center">
                          <div className={`bg-emerald-500 shadow-md rounded-full w-3 h-3`}></div>
                        </div>
                        <Typography className=" drop-shadow-md" variant="h5">
                          TX1234 - Seawoods
                        </Typography>
                      </Stack>
                      <Stack direction={'row'} justifyContent={'space-between'}>
                        <Typography sx={{ width: 90 }} variant="subtitle2">
                          Capture %
                        </Typography>
                        <Box sx={{ marginLeft: 2, display: 'flex', flex: 1, alignItems: 'center' }}>
                          <LinearProgress
                            sx={{
                              width: '100%',
                              borderRadius: 3,
                              height: 10,
                              '& .MuiLinearProgress-bar': {
                                backgroundColor: '#06b6d4'
                              }
                            }}
                            variant="determinate"
                            value={92}
                            // color="primary"
                          />
                        </Box>
                      </Stack>
                      <Stack direction={'row'} justifyContent={'space-between'}>
                        <Typography sx={{ width: 90 }} variant="subtitle2">
                          Up-Keep Score
                        </Typography>
                        <Box sx={{ marginLeft: 2, display: 'flex', flex: 1, alignItems: 'center' }}>
                          <LinearProgress
                            sx={{
                              width: '100%',
                              borderRadius: 3,
                              height: 10,
                              '& .MuiLinearProgress-bar': {
                                backgroundColor: success
                              }
                            }}
                            variant="determinate"
                            value={85}
                            // color="primary"
                          />
                        </Box>
                      </Stack>
                      <Stack direction={'row'} justifyContent={'space-between'}>
                        <Typography sx={{ width: 90 }} variant="subtitle2">
                          VM Score
                        </Typography>
                        <Box sx={{ marginLeft: 2, display: 'flex', flex: 1, alignItems: 'center' }}>
                          <LinearProgress
                            sx={{
                              width: '100%',
                              borderRadius: 3,
                              height: 10,
                              '& .MuiLinearProgress-bar': {
                                backgroundColor: success
                              }
                            }}
                            variant="determinate"
                            value={65}
                            // color="primary"
                          />
                        </Box>
                      </Stack>
                      <Stack direction={'row'} justifyContent={'space-between'}>
                        <Typography sx={{ width: 90 }} variant="subtitle2">
                          PoP Score
                        </Typography>
                        <Box sx={{ marginLeft: 2, display: 'flex', flex: 1, alignItems: 'center' }}>
                          <LinearProgress
                            sx={{
                              width: '100%',
                              borderRadius: 3,
                              height: 10,
                              '& .MuiLinearProgress-bar': {
                                backgroundColor: success
                              }
                            }}
                            variant="determinate"
                            value={75}
                            // color="primary"
                          />
                        </Box>
                      </Stack>
                    </Stack>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item lg={1.5} md={2} sm={3} xs={4}>
                <div className="w-full flex flex-col justify-center place-items-center min-[600px]:border-l border-r border-gray-300 h-[105px]">
                  <Stack direction={'column'}>
                    <Typography className="drop-shadow-md" align="center" variant="h2">
                      3/21
                    </Typography>
                    <Typography className="drop-shadow-md" align="center" variant="h6">
                      Anomalies solved
                    </Typography>
                  </Stack>
                </div>
              </Grid>
              <Grid item lg={6.5} md={5} sm={12} xs={8}>
                <div className="w-full px-4 h-[105px]">
                  <Slider {...settings}>
                    {imageData.map((item) => (
                      <div key={item.url} className="rounded-md shadow-md h-full">
                        <img
                          style={{ width: '100%', objectFit: 'cover' }}
                          className="rounded-md shadow-md h-[105px]"
                          src={item.url}
                          alt="no Img"
                        />
                      </div>
                    ))}
                  </Slider>
                </div>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default Customers;
