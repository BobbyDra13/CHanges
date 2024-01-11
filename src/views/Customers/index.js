import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate } from 'react-router-dom';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

// api imports
import {
  GetStoreLayout
  // GetImagesFromSignedUrl
} from 'api';

// material-ui
import {
  Card,
  Grid,
  Typography,
  Stack,
  LinearProgress,
  Box,
  useTheme,
  Tooltip,
  Avatar,
  AvatarGroup,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogContent
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';

// react icons import
import { ImCross } from 'react-icons/im';

// project import
import Breadcrumb from 'component/Breadcrumb';
import { gridSpacing } from 'config.js';
import settings from '../../configs/react-slick-config';
import dummyStoresData from 'data/stores-data';
// import Map from './map';

// assets
import OrionImg from '../../assets/images/MapImages/orion.png';
// import MapImg from '../../assets/images/mapImg.png';
// import OrionImg from '../../assets/images/MapImages/orion.png';

// const location = {
//   address: '1600 Amphitheatre Parkway, Mountain View, california.',
//   lat: 37.42216,
//   lng: -122.08427
// };

// ==============================|| CUSTOMERS PAGE ||============================== //

const Customers = () => {
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [storesData, setStoresData] = useState(false);
  // const [upKeepData, setUpKeepData] = useState(false);
  // const [vmData, setVmData] = useState(false);
  // const [popData, setPopata] = useState(false);
  const [clickedBar, setClickedBar] = useState({
    isUpKeep: false,
    isVm: false,
    isPop: false
  });
  const theme = useTheme();
  const success = theme.palette.success.main;
  const successDark = theme.palette.success.dark;
  const warning = theme.palette.warning.main;
  const warningDark = theme.palette.warning.dark;
  const error = theme.palette.error.main;
  const errorDark = theme.palette.error.dark;
  const navigate = useNavigate();
  const options = [
    { label: 'View', icon: <VisibilityIcon />, onClick: () => navigate('/main/stores/layout') },
    { label: 'Edit', icon: <EditIcon />, disabled: true },
    { label: 'Delete', icon: <DeleteIcon />, color: 'red', disabled: true }
  ];
  const [anchorEl, setAnchorEl] = useState(null);
  const ITEM_HEIGHT = 48;

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const upKeepClicked = () => {
    if (!clickedBar.isUpKeep) {
      setClickedBar({ isUpKeep: true, isVm: false, isPop: false });
    } else {
      setClickedBar({ isUpKeep: false, isVm: false, isPop: false });
    }
  };
  const vMClicked = () => {
    if (!clickedBar.isVm) {
      setClickedBar({ isUpKeep: false, isVm: true, isPop: false });
    } else {
      setClickedBar({ isUpKeep: false, isVm: false, isPop: false });
    }
  };
  const popClicked = () => {
    if (!clickedBar.isPop) {
      setClickedBar({ isUpKeep: false, isVm: false, isPop: true });
    } else {
      setClickedBar({ isUpKeep: false, isVm: false, isPop: false });
    }
  };

  const handleImageClick = (url) => {
    if (!isImageDialogOpen) {
      setSelectedImage(url);
    }
    setIsImageDialogOpen(!isImageDialogOpen);
  };

  const date = new Date();
  const today = date.toISOString().split('T')[0];
  const getStoresData = async () => {
    const input = {
      Store_IDs: ['6582be9ac5ed94d792a563b8'],
      // start_date: '2024-01-01'
      start_date: today
    };
    setStoresData(false);
    try {
      const response = await GetStoreLayout(input);
      if (response) {
        console.log('Store Data', response.data);
        setStoresData(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const getSignedImg = async (input) => {
  //   try {
  //     const final_dict = input.map((item) => item.store_anomalies);
  //     const response = await GetImagesFromSignedUrl(final_dict);

  //     if (response && response.data) {
  //       // console.log('Signed Img', response.data);
  //       // return response.data; // Return the correct data property
  //       setAnomalyImgs(response.data);
  //     } else {
  //       // Handle the case where response is not successful or data is missing
  //       // return []; // Or return a default value
  //       setAnomalyImgs([]);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching signed images:', error);
  //     // return []; // Or handle the error differently
  //     setAnomalyImgs([]);
  //   }
  // };

  useEffect(() => {
    getStoresData();
  }, []);
  // useEffect(() => {
  //   if (storesData) {
  //     getSignedImg(Object.values(storesData[0].store_anomalies));
  //   }
  // }, [storesData]);

  // console.log('Stores Data', storesData && storesData.map((item) => item.store_id));
  // console.log('Stores Data', storesData);
  // console.log('Anomaly Data', anomalyImgs);
  // console.log('Clicked', clickedBar);
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
        {storesData &&
          storesData.map((item, index) => (
            <Grid key={index} xs={12} item>
              <Card className="shadow-xl" sx={{ padding: 1 }}>
                <Grid container spacing={1}>
                  <Grid item lg={5} md={6} sm={9} xs={12}>
                    <Grid container spacing={0}>
                      <Grid sx={{ paddingRight: 1 }} item>
                        <Tooltip
                          title={'Plot no: 311, Orion Mall, near ST Bus Depot, Forest Colony, Panvel, Navi Mumbai, Maharashtra 410206'}
                        >
                          <img
                            style={{ display: 'block', objectFit: 'cover' }}
                            className="rounded-md border border-gray-300 max-[600px]:w-24 w-32 h-[153px] drop-shadow-md hover:cursor-pointer"
                            src={OrionImg}
                            alt="noImg"
                          />
                        </Tooltip>
                        {/* <div className="rounded-md border border-gray-300 w-20 h-[105px] drop-shadow-md">
                      <Map location={location} zoomLevel={3} />
                    </div> */}
                      </Grid>
                      <Grid item sx={{ display: 'flex', flex: 1 }}>
                        <Stack sx={{ width: '100%' }} direction={'column'} spacing={1}>
                          <Box sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'space-between' }}>
                            <Stack direction={'row'} spacing={1}>
                              <div className="h-full flex flex-col justify-center">
                                <Tooltip title={'Active'}>
                                  <div
                                    className="shadow-md mb-0.5 rounded-full hover:cursor-pointer w-3 h-3 bg-emerald-500"
                                    // className={`shadow-md mb-0.5 rounded-full hover:cursor-pointer w-3 h-3 ${
                                    //   item.active ? 'bg-emerald-500' : 'bg-gray-400'
                                    // }`}
                                  ></div>
                                </Tooltip>
                              </div>
                              <Typography className="drop-shadow-md self-center" variant="h5">
                                {item.store_id} - {item.name}
                              </Typography>
                            </Stack>
                            <IconButton
                              size="small"
                              aria-label="more"
                              id="long-button"
                              aria-controls={open ? 'long-menu' : undefined}
                              aria-expanded={open ? 'true' : undefined}
                              aria-haspopup="true"
                              onClick={handleClick}
                            >
                              <MoreVertIcon />
                            </IconButton>
                            <Menu
                              id="long-menu"
                              anchorEl={anchorEl}
                              open={open}
                              onClose={handleClose}
                              anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right'
                              }}
                              transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right'
                              }}
                              PaperProps={{
                                style: {
                                  maxHeight: ITEM_HEIGHT * 4.5,
                                  width: '20ch'
                                }
                              }}
                            >
                              {options.map((option) => (
                                <MenuItem
                                  key={option.label}
                                  selected={option.label === 'View'}
                                  disabled={option.disabled} // Apply the disabled attribute conditionally
                                  onClick={() => {
                                    if (option.disabled != true) {
                                      option.onClick();
                                      handleClose();
                                    }
                                  }}
                                >
                                  {option.icon && <span style={{ marginRight: '8px', color: option.color }}>{option.icon}</span>}
                                  <span style={{ color: option.color }}>{option.label}</span>
                                </MenuItem>
                              ))}
                            </Menu>
                          </Box>
                          <Stack direction={'row'} justifyContent={'space-between'}>
                            <Typography sx={{ width: 95 }} variant="subtitle1">
                              Capture %
                            </Typography>
                            <Box className="relative" sx={{ marginLeft: 2, display: 'flex', flex: 1, alignItems: 'center' }}>
                              <LinearProgress
                                sx={{
                                  width: '100%',
                                  borderRadius: 3,
                                  height: 20,
                                  '& .MuiLinearProgress-bar': {
                                    backgroundColor: '#06b6d4'
                                  }
                                }}
                                variant="determinate"
                                value={62}
                                color="secondary"
                              />
                              <div className="absolute w-full h-full flex justify-center place-items-center">
                                <Typography sx={{ color: 'white' }} variant="subtitle2">
                                  62 %
                                </Typography>
                              </div>
                            </Box>
                          </Stack>
                          <Stack direction={'row'} justifyContent={'space-between'}>
                            <Typography sx={{ width: 95 }} variant={clickedBar.isUpKeep ? 'h6' : 'subtitle1'}>
                              Up-Keep Score
                            </Typography>
                            <Box className="relative" sx={{ marginLeft: 2, display: 'flex', flex: 1, alignItems: 'center' }}>
                              <LinearProgress
                                sx={{
                                  width: '100%',
                                  borderRadius: 3,
                                  height: 20,
                                  // '& .MuiLinearProgress-bar': {
                                  //   backgroundColor: warning
                                  // }
                                  '& .MuiLinearProgress-bar': {
                                    backgroundColor:
                                      Math.floor(item.store_fullness) >= 80 && !clickedBar.isUpKeep
                                        ? success
                                        : Math.floor(item.store_fullness) >= 80 && clickedBar.isUpKeep
                                        ? successDark
                                        : Math.floor(item.store_fullness) < 50 && !clickedBar.isUpKeep
                                        ? error
                                        : Math.floor(item.store_fullness) < 50 && clickedBar.isUpKeep
                                        ? errorDark
                                        : !clickedBar.isUpKeep
                                        ? warning
                                        : warningDark
                                  }
                                }}
                                variant="determinate"
                                // value={78}
                                value={Math.floor(item.store_fullness)}
                                color="secondary"
                              />
                              <button
                                onClick={upKeepClicked}
                                className="absolute hover:cursor-pointer w-full h-full flex justify-center place-items-center"
                              >
                                <Typography sx={{ color: 'white' }} variant="subtitle2">
                                  {Math.floor(item.store_fullness)} %
                                </Typography>
                              </button>
                            </Box>
                          </Stack>
                          <Stack direction={'row'} justifyContent={'space-between'}>
                            <Typography sx={{ width: 95 }} variant={clickedBar.isVm ? 'h6' : 'subtitle1'}>
                              VM Score
                            </Typography>
                            <Box className="relative" sx={{ marginLeft: 2, display: 'flex', flex: 1, alignItems: 'center' }}>
                              <LinearProgress
                                sx={{
                                  width: '100%',
                                  borderRadius: 3,
                                  height: 20,
                                  '& .MuiLinearProgress-bar': {
                                    backgroundColor: clickedBar.isVm ? errorDark : error
                                  }
                                  // '& .MuiLinearProgress-bar': {
                                  //   backgroundColor: item.kpiValues.vm >= 80 ? success : item.kpiValues.vm < 50 ? error : warning
                                  // }
                                }}
                                variant="determinate"
                                value={47}
                                color="secondary"
                              />
                              <button
                                onClick={vMClicked}
                                className="absolute hover:cursor-pointer w-full h-full flex justify-center place-items-center"
                              >
                                <Typography sx={{ color: 'white' }} variant="subtitle2">
                                  47 %
                                </Typography>
                              </button>
                            </Box>
                          </Stack>
                          <Stack direction={'row'} justifyContent={'space-between'}>
                            <Typography sx={{ width: 95 }} variant={clickedBar.isPop ? 'h6' : 'subtitle1'}>
                              PoP Score
                            </Typography>
                            <Box className="relative" sx={{ marginLeft: 2, display: 'flex', flex: 1, alignItems: 'center' }}>
                              <LinearProgress
                                sx={{
                                  width: '100%',
                                  borderRadius: 3,
                                  height: 20,
                                  '& .MuiLinearProgress-bar': {
                                    backgroundColor: clickedBar.isPop ? successDark : success
                                  }
                                  // '& .MuiLinearProgress-bar': {
                                  //   backgroundColor: item.kpiValues.pop >= 80 ? success : item.kpiValues.pop < 50 ? error : warning
                                  // }
                                }}
                                variant="determinate"
                                value={85}
                                color="secondary"
                              />
                              <button
                                onClick={popClicked}
                                className="absolute hover:cursor-pointer w-full h-full flex justify-center place-items-center"
                              >
                                <Typography sx={{ color: 'white' }} variant="subtitle2">
                                  85 %
                                </Typography>
                              </button>
                            </Box>
                          </Stack>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item lg={1.5} md={2} sm={3} xs={5}>
                    <div className="w-full flex flex-col justify-center place-items-center min-[600px]:border-l border-r border-gray-300 h-full">
                      <Stack direction={'column'}>
                        <Typography className="drop-shadow-md" align="center" variant="h2">
                          0/{item.store_anomalies.length}
                        </Typography>
                        <Typography className="drop-shadow-md" align="center" variant="h6">
                          Anomalies solved
                        </Typography>
                        <div className="w-full mt-2 flex justify-center">
                          <AvatarGroup
                            sx={{
                              '& .MuiAvatar-root': { width: 24, height: 24, fontSize: 15 }
                            }}
                            max={2}
                          >
                            {dummyStoresData[0].agents.map((agent, index) => (
                              <Tooltip
                                key={index}
                                title={
                                  <div className="w-[200px] p-2 flex flex-col space-y-2">
                                    <Typography sx={{ width: '100%', color: 'white' }} variant="h6">
                                      Agent Details
                                    </Typography>
                                    <Typography variant="subtitle2">Name: {agent.name}</Typography>
                                    <Typography variant="subtitle2">Number: {agent.number}</Typography>
                                  </div>
                                }
                              >
                                <Avatar className="hover:cursor-pointer" sx={{ bgcolor: success }} alt={agent.name} src="/example.jpg" />
                              </Tooltip>
                            ))}
                          </AvatarGroup>
                        </div>
                      </Stack>
                    </div>
                  </Grid>
                  <Grid item lg={5.5} md={4} sm={12} xs={7}>
                    <div className="w-full px-4 flex flex-col justify-center h-full">
                      <Slider {...settings}>
                        {item.store_anomalies.map((anomaly, index) => (
                          <div
                            onClick={() => handleImageClick(anomaly.store_anomalies.image_url)}
                            key={index}
                            className="rounded-md border shadow-md h-[147px]"
                          >
                            <img
                              style={{ width: '100%', objectFit: 'cover' }}
                              className="rounded-md shadow-md h-full hover:cursor-pointer"
                              src={anomaly.store_anomalies.image_url}
                              alt="no Img"
                            />
                          </div>
                        ))}
                        {/* {storesData && console.log('Array', getSignedImg(Object.values(item.store_anomalies)))} */}
                      </Slider>
                    </div>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          ))}
      </Grid>
      <Dialog
        fullScreen
        open={isImageDialogOpen}
        // onClose={handleImageClick}
        PaperProps={{
          sx: {
            width: '100%',
            maxHeight: '1300px',
            background: 'black',
            boxShadow: 'none'
          }
        }}
      >
        <TransformWrapper>
          <DialogContent className="w-full h-full flex justify-center relative overflow-hidden">
            <div className="self-center">
              <ImCross
                onClick={handleImageClick}
                className="z-20 text-xl cursor-pointer text-white opacity-60 hover:opacity-100 absolute"
                style={{
                  right: '4%',
                  top: '2%'
                }}
              />
              <TransformComponent>
                <img src={selectedImage} alt="Full-screen" className="self-center" style={{ maxHeight: '95svh' }} />
              </TransformComponent>
            </div>
          </DialogContent>
        </TransformWrapper>
      </Dialog>
    </>
  );
};

export default Customers;
