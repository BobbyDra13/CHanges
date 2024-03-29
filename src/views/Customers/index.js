/* eslint-disable react-hooks/exhaustive-deps */
import { React, useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate } from 'react-router-dom';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import './zoom-card-item.css';
import { bouncy } from 'ldrs';
import MapComponent from './map';
bouncy.register();

// api imports
import {
  GetStoreData,
  GetStoreWiseInfo
  // GetImagesFromSignedUrl,
  // GetAnolamayDetails
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
  // Avatar,
  AvatarGroup,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogContent,
  Skeleton,
  Divider,
  // ImageListItemBar,
  // ToggleButton,
  // ToggleButtonGroup,
  TextField
} from '@mui/material';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';

// react icons import
// import { ImCross } from 'react-icons/im';
import { RiErrorWarningLine } from 'react-icons/ri';
import { IoIosClose } from 'react-icons/io';

// project import
import Breadcrumb from 'component/Breadcrumb';
import { gridSpacing } from 'config.js';
import settings from '../../configs/react-slick-config';
// import { ZoomCardItem } from 'component/ZoomCardItem';
// import { ZoomCardItem } from 'component/ZoomCardItem';
// import dummyStoresData from 'data/stores-data';
// import Map from './map';

// assets
// import OrionImg from '../../assets/images/MapImages/orion.png';
import CheckMarkImg from '../../assets/images/checkmark.png';
import BarChartIcon from '@mui/icons-material/BarChart';
// import MapImg from '../../assets/images/mapImg.png';
// import OrionImg from '../../assets/images/MapImages/orion.png';

// const location = {
//   address: '1600 Amphitheatre Parkway, Mountain View, california.',
//   lat: 37.42216,
//   lng: -122.08427
// };

const totalParts = 142;

// ==============================|| CUSTOMERS PAGE ||============================== //

const Customers = () => {
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  const [storesData, setStoresData] = useState(false);
  const [colorArray, setColorArray] = useState([]);
  // const [promoArray, setPromoArray] = useState([]);
  const [anomalies_count, setAnomalies_count] = useState(false);
  const [fullnessArray, setFullnessArray] = useState([]);
  // eslint-disable-next-line
  const [anomalyDetails, setAnonmalyDetails] = useState([]);
  // eslint-disable-next-line
  const [timestamps, setTimestamps] = useState({ date: '', time: '' });
  // eslint-disable-next-line
  const [anomalyType, setAnomalyType] = useState('');
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false);
  const [clickedBar, setClickedBar] = useState({
    isUpKeep: false,
    isVm: false,
    isPop: false
  });

  // const [liveAnomalyImg, setLiveAnomalyImg] = useState(true);
  const [imageLoading, setImageLoading] = useState(false);
  // const [openTooltipIndex, setOpenTooltipIndex] = useState(null);
  const [updatedData, setUpdateddata] = useState(false);
  const [cData, setCdata] = useState(false);
  const [lcData, setLCdata] = useState(false);

  const theme = useTheme();
  const success = theme.palette.success.main;
  const successDark = theme.palette.success.dark;
  const warning = theme.palette.warning.main;
  const warningDark = theme.palette.warning.dark;
  const error = theme.palette.error.main;
  const errorDark = theme.palette.error.dark;
  const navigate = useNavigate();
  const options = [
    {
      label: 'Analysis',
      icon: <BarChartIcon />,
      onClick: () => navigate('/main/stores/storeinsight/overview')
    },
    {
      label: 'View',
      icon: <VisibilityIcon />,
      onClick: () => navigate('/main/stores/layout'),
      disabled: true
    },
    { label: 'Edit', icon: <EditIcon />, disabled: true },
    { label: 'Delete', icon: <DeleteIcon />, color: 'red', disabled: true }
  ];
  const [anchorEl, setAnchorEl] = useState(null);
  const ITEM_HEIGHT = 48;

  const dateToday = new Date();
  const today = dateToday.toISOString().split('T')[0];
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // const handleToggleImage = () => {
  //   setImageLoading(true);
  //   setLiveAnomalyImg(!liveAnomalyImg);
  // };

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
    // if (!clickedBar.isPop) {
    //   setClickedBar({ isUpKeep: false, isVm: false, isPop: true });
    // } else {
    //   setClickedBar({ isUpKeep: false, isVm: false, isPop: false });
    // }
  };

  // const getAnomalyDetails = async (id) => {
  //   console.log('id:', id);
  //   setLoading(true);
  //   try {
  //     const response = await GetAnomalyDetails(id);
  //     if (response) {
  //       console.log('AnomalyDetails api', response);
  //       setAnonmalyDetails(response.data);
  //       setLoading(false);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleImageClick = (url, anomaly, time) => {
    if (antn) {
      setPos({ lft: false, tp: false, wdth: false, ht: false });
      setAntn(!antn);
    }
    //(url, id, type, time)
    const dateTime = new Date(time);
    const day = dateTime.toLocaleDateString(undefined, { day: '2-digit' });
    const month = dateTime.toLocaleDateString(undefined, { month: '2-digit' });
    const year = dateTime.toLocaleDateString(undefined, { year: 'numeric' });

    const formattedDate = `${day}/${month}/${year}`;
    const formattedTime = dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
    console.log('time', time);
    setLCdata(!lcData);
    if (!isImageDialogOpen) {
      // setSelectedImage(url);
      setCdata(anomaly);
      // getAnomalyDetails(id);
      // setAnomalyType(type);
      setTimestamps({ date: formattedDate, time: formattedTime });
    }
    setIsImageDialogOpen(!isImageDialogOpen);
  };

  const getStoresData = async () => {
    // const input = {
    //   Store_IDs: ['6582be9ac5ed94d792a563b8'],
    //   start_date: today
    // };
    const store_id = '6582be9ac5ed94d792a563b8';
    const date = today;
    setStoresData(false);
    // try {
    //   const response = await GetStoreLayout(input);
    //   if (response) {
    //     console.log('Store Data', response.data);
    //     setStoresData(response.data);
    //     const anomaliesByType = new Map();
    //     response.data[0]?.store_anomalies.forEach((anomaly) => {
    //       const type = anomaly?.store_anomalies?.anomalies_found[0]?.type;
    //       anomaliesByType.set(type, anomaliesByType.get(type) || []);
    //       anomaliesByType.get(type).push(anomaly);
    //     });

    //     // Set the state values based on the Map
    //     setColorArray(anomaliesByType.get('color_assortment') || []);
    //     // setPromoArray(anomaliesByType.get('promo_assortment') || []);
    //     setFullnessArray(anomaliesByType.get('empty_bin') || []);
    //   }
    // } catch (error) {
    //   console.log(error);
    // }

    const dt = {
      date: '2024-03-28'
    };

    try {
      const response = await GetStoreWiseInfo(date, store_id);
      const response2 = await GetStoreData(dt);
      if (response2) {
        setUpdateddata(response2.data);
        // console.log(updatedData[0].store_name);
        console.log('dop', response2.data);
      }
      if (response) {
        console.log('Store Data', response.data.storeDetails);
        console.log('Store Data', response2.data);

        setStoresData(response.data.storeDetails);
        setUpdateddata(response2.data);
        console.log(updatedData);
        // console.log(updatedData[0].allAnomalies);

        const anomalies_details = response.data.anomalies_details;
        setAnomalies_count(anomalies_details.length);
        const anomaliesByType = new Map();
        response.data?.anomalies_details.forEach((anomaly) => {
          const type = anomaly[0]?.anomalies_found[0]?.type;
          anomaliesByType.set(type, anomaliesByType.get(type) || []);
          anomaliesByType.get(type).push(anomaly[0]);
        });

        // console.log('anomaliesByType ',anomaliesByType )

        // Set the state values based on the Map
        setColorArray(anomaliesByType.get('color_assortment') || []);
        setColorArray((prevArray) => [...prevArray, ...(anomaliesByType.get('category_assortment') || [])]);
        // setPromoArray(anomaliesByType.get('promo_assortment') || []);
        setFullnessArray(anomaliesByType.get('empty_bin') || []);
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log('anomalyesCOunt', anomalies_count);
  const imageRef = useRef(null);
  const [antn, setAntn] = useState(false);
  const [pos, setPos] = useState({ lft: false, tp: false, wdth: false, ht: false });
  const [natural, setNaturel] = useState({ wdth: false, hght: false });

  const calculate = (xmin, ymin, xmax, ymax) => {
    const lft = (xmin / natural.wdth) * 100;
    const top = (ymin / natural.hght) * 100;
    const width = ((xmax - xmin) / natural.wdth) * 100;
    const height = ((ymax - ymin) / natural.hght) * 100;
    setPos({ lft: lft, tp: top, wdth: width, hght: height });
    setAntn(true);
  };
  const highlightStyle = {
    position: 'absolute',
    left: `${pos.lft}%`,
    top: `${pos.tp}%`,
    width: `${pos.wdth}%`,
    height: `${pos.hght}%`,
    border: '1px solid red', // Change border color as desired
    boxSizing: 'border-box',
    pointerEvents: 'none', // So clicks can still interact with the image
    backgroundColor: 'rgba(255, 0, 0, 0.6)',
    borderRadius: '5px'
  };
  console.log('position= ', pos);
  const findDimensions = (event) => {
    setImageLoading(false);
    const { naturalWidth, naturalHeight } = event.target;
    // const imgDiv = imageRef.current;
    // const { width, height } = imgDiv.getBoundingClientRect();

    setNaturel({ wdth: naturalWidth, hght: naturalHeight });

    // setScaleFactor(width / naturalWidth);
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
  console.log('Stores Data', storesData);
  console.log('Anomaly Type', anomalyType);
  console.log('Stores Data', storesData);
  console.log('Anomaly Type', anomalyType);
  console.log('Anomaly Type', cData.length);
  // console.log('Anomaly Type', updatedData[0]?.allAnomalies[0]);
  // console.log('Color Data', colorArray);
  // console.log('Promo Data', promoArray);
  // console.log('Fullness Data', fullnessArray);
  // console.log('Fullness Data', fullnessArray);
  // console.log('Anomaly Data', anomalyImgs);
  // console.log('Clicked', clickedBar);
  // console.log('Analysis Id', analysisId);
  console.log('AnomalyDetails', anomalyDetails[0]?.reference_img);

  // const handleTooltipOpen = (index) => {
  //   setOpenTooltipIndex(index);
  // };

  // const handleTooltipClose = () => {
  //   setOpenTooltipIndex(null);
  // };

  // const navigate = useNavigate()

  console.log('fullness araya', fullnessArray);
  return (
    <>
      <Breadcrumb title="Stores">
        <Typography component={Link} to="/" variant="subtitle2" color="inherit" className="link-breadcrumb">
          Insights
        </Typography>
        <Typography variant="subtitle2" color="primary" className="link-breadcrumb">
          Stores
        </Typography>
      </Breadcrumb>
      <Grid container spacing={gridSpacing}>
        <Typography variant="h6" component="h2" sx={{ paddingLeft: '25px', paddingTop: '12px' }}>
          *Showing last Captured data.
        </Typography>
        {storesData && storesData.length > 0 ? (
          storesData.map((item, index) => (
            <Grid key={index} xs={12} item>
              <Card className="shadow-xl" sx={{ padding: 1 }}>
                <Grid container spacing={1}>
                  <Grid item lg={5} md={6} sm={9} xs={12}>
                    <Grid container spacing={0}>
                      <Grid sx={{ paddingRight: 1 }} item>
                        {/* <Tooltip
                          title={'Plot no: 311, Orion Mall, near ST Bus Depot, Forest Colony, Panvel, Navi Mumbai, Maharashtra 410206'}
                        > */}
                        {/* <img
                            style={{ display: 'block', objectFit: 'cover' }}
                            className="rounded-md border border-gray-300 max-[600px]:w-24 w-36 h-[153px] drop-shadow-md hover:cursor-pointer"
                            src={OrionImg}
                            alt="noImg"
                            onClick={() => navigate('/main/stores/layout')}
                          /> */}
                        <MapComponent
                          lat={updatedData[0].location.latitude}
                          lng={updatedData[0].location.longitude}
                          address={updatedData[0].address}
                          name={updatedData[0].store_name}
                        />
                        {/* </Tooltip> */}
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
                              <Typography
                                className="drop-shadow-md self-center cursor-pointer"
                                variant="h5"
                                onClick={() => navigate('/main/stores/storeinsight/overview')}
                              >
                                {updatedData[0]?.store_id} - {updatedData[0]?.store_name}
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
                          <Stack direction={{ xs: 'column', md: 'row' }} justifyContent={'space-between'}>
                            <Typography sx={{ width: 120 }} variant="h6">
                              Capture %
                            </Typography>
                            <Box className="relative" sx={{ marginLeft: 2, display: 'flex', flex: 1, alignItems: 'start' }}>
                              <LinearProgress
                                sx={{
                                  width: '100%',
                                  borderRadius: 3,
                                  height: 20,
                                  backgroundColor: '#e5e7eb',
                                  '& .MuiLinearProgress-bar': {
                                    backgroundColor: '#06b6d4'
                                  }
                                }}
                                variant="determinate"
                                // value={item.capture_count ? Math.min(Math.floor((item.capture_count / totalParts) * 100), 100) : 0}
                                value={updatedData[0].capture_percentage ? parseFloat(updatedData[0].capture_percentage) : 0}
                                // color="secondary"
                              />
                              <button className="absolute hover:cursor-not-allowed w-full h-full flex justify-center place-items-center">
                                <Typography sx={{ color: 'white' }} variant="subtitle2">
                                  {/* {item.capture_count ? Math.min(Math.floor((item.capture_count / totalParts) * 100), 100) : 0} % */}
                                  {updatedData[0].capture_percentage ? updatedData[0].capture_percentage : '0%'}
                                </Typography>
                              </button>
                            </Box>
                          </Stack>
                          <Stack direction={{ xs: 'column', md: 'row' }} justifyContent={'space-between'}>
                            <Typography sx={{ width: 120 }} variant={clickedBar.isUpKeep ? 'h5' : 'h6'}>
                              Up-Keep Score
                            </Typography>
                            <Box className="relative" sx={{ marginLeft: 2, display: 'flex', flex: 1, alignItems: 'center' }}>
                              <LinearProgress
                                sx={{
                                  width: '100%',
                                  borderRadius: 3,
                                  height: clickedBar.isUpKeep ? 25 : 20,
                                  // '& .MuiLinearProgress-bar': {
                                  //   backgroundColor: warning
                                  // }
                                  backgroundColor: '#e5e7eb',
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
                                // value={Math.floor(item.store_fullness) || 0}
                                value={0}
                                // color="secondary"
                              />
                              <button
                                onClick={upKeepClicked}
                                className="absolute hover:cursor-not-allowed w-full h-full flex justify-center place-items-center"
                              >
                                <Typography sx={{ color: 'white' }} variant="subtitle1">
                                  {/* {Math.floor(item.store_fullness) || 0} % */}
                                  NA
                                </Typography>
                              </button>
                            </Box>
                          </Stack>
                          <Stack direction={{ xs: 'column', md: 'row' }} justifyContent={'space-between'}>
                            <Typography sx={{ width: 120 }} variant={clickedBar.isVm ? 'h5' : 'h6'}>
                              VM Score
                            </Typography>
                            <Box className="relative" sx={{ marginLeft: 2, display: 'flex', flex: 1, alignItems: 'center' }}>
                              <LinearProgress
                                sx={{
                                  width: '100%',
                                  borderRadius: 3,
                                  height: clickedBar.isVm ? 25 : 20,
                                  backgroundColor: '#e5e7eb',
                                  '& .MuiLinearProgress-bar': {
                                    backgroundColor:
                                      Math.floor((anomalies_count / totalParts) * 100) >= 80 && !clickedBar.isVm
                                        ? success
                                        : Math.floor((anomalies_count / totalParts) * 100) >= 80 && clickedBar.isVm
                                        ? successDark
                                        : Math.floor((anomalies_count / totalParts) * 100) < 50 && !clickedBar.isVm
                                        ? error
                                        : Math.floor((anomalies_count / totalParts) * 100) < 50 && clickedBar.isVm
                                        ? errorDark
                                        : !clickedBar.isVm
                                        ? warning
                                        : warningDark
                                  }
                                }}
                                variant="determinate"
                                // value={
                                //   Math.floor((anomalies_count / totalParts) * 100) > 100
                                //     ? 100
                                //     : Math.floor((anomalies_count / totalParts) * 100)
                                // }
                                value={0}
                                // color="secondary"
                              />
                              <button
                                onClick={vMClicked}
                                className="absolute hover:cursor-not-allowed w-full h-full flex justify-center place-items-center"
                              >
                                <Typography sx={{ color: 'white' }} variant="subtitle1">
                                  {/* {Math.floor((anomalies_count / totalParts) * 100) > 100
                                    ? 100
                                    : Math.floor((anomalies_count / totalParts) * 100)}{' '}
                                  % */}
                                  NA
                                </Typography>
                              </button>
                            </Box>
                          </Stack>
                          <Stack direction={{ xs: 'column', md: 'row' }} justifyContent={'space-between'}>
                            <Typography sx={{ width: 120 }} variant={clickedBar.isPop ? 'h5' : 'h6'}>
                              PoP Score
                            </Typography>
                            <Box className="relative" sx={{ marginLeft: 2, display: 'flex', flex: 1, alignItems: 'center' }}>
                              <LinearProgress
                                sx={{
                                  width: '100%',
                                  borderRadius: 3,
                                  height: 20,
                                  backgroundColor: '#e5e7eb',
                                  '& .MuiLinearProgress-bar': {
                                    backgroundColor: clickedBar.isPop ? successDark : success
                                  }
                                  // '& .MuiLinearProgress-bar': {
                                  //   backgroundColor: item.kpiValues.pop >= 80 ? success : item.kpiValues.pop < 50 ? error : warning
                                  // }
                                }}
                                variant="determinate"
                                // value={0}
                                value={updatedData[0].pop_percentage ? parseFloat(updatedData[0].pop_percentage) : 0}
                                // color="secondary"
                              />
                              <button
                                onClick={popClicked}
                                className="absolute hover:cursor-pointer w-full h-full flex justify-center place-items-center"
                              >
                                <Typography sx={{ color: 'white' }} variant="subtitle2">
                                  {updatedData[0].pop_percentage ? updatedData[0].pop_percentage : '0%'}
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
                          0/
                          {!clickedBar.isUpKeep && !clickedBar.isVm && !clickedBar.isPop
                            ? anomalies_count
                            : clickedBar.isUpKeep
                            ? fullnessArray.length
                            : colorArray.length}
                        </Typography>
                        <Typography className="drop-shadow-md" align="center" variant="h6">
                          Anomalies solved
                        </Typography>
                        {/* <div className="w-full mt-2 flex justify-center">
                          <AvatarGroup
                            sx={{
                              '& .MuiAvatar-root': { width: 24, height: 24, fontSize: 15 }
                            }}
                            // max={2} for //for showing only 2 user agents
                          >
                            {item.agentsDetails.map((agent, index) => (
                              <Tooltip
                                key={index}
                                title={
                                  <div className="w-[200px] p-2 flex flex-col space-y-2">
                                    <Typography sx={{ width: '100%', color: 'white' }} variant="h6">
                                      Agent Details
                                    </Typography>
                                    <Typography variant="subtitle2">Name: {agent.agentsDetails.user_name}</Typography>
                                    <Typography variant="subtitle2">Number: {agent.agentsDetails.number}</Typography>
                                  </div>
                                }
                                enterTouchDelay={1}
                                leaveTouchDelay={100000}
                              >
                                <Avatar
                                  className="hover:cursor-pointer"
                                  sx={{ bgcolor: success }}
                                  alt={agent.agentsDetails.user_name}
                                  src="/example.jpg"
                                />
                              </Tooltip>
                            ))}
                          </AvatarGroup>
                        </div> */}
                      </Stack>
                    </div>
                  </Grid>
                  <Grid item lg={5.5} md={4} sm={12} xs={7}>
                    <div className="w-full px-4 flex flex-col justify-center h-full">
                      {!clickedBar.isUpKeep && !clickedBar.isVm && !clickedBar.isPop ? (
                        <Slider {...settings}>
                          {/* {item.store_anomalies.map((anomaly, index) => (  */}
                          {updatedData[0].allAnomalies.map((anomaly, index) => (
                            <div
                              onClick={() =>
                                handleImageClick(
                                  anomaly.raw_img_url,
                                  // anomaly.img_url,
                                  // anomaly.store_anomalies.analysis_id,
                                  // anomaly.zone_id,
                                  // anomaly.store_anomalies.anomalies_found[0].type,
                                  anomaly,
                                  // anomaly.store_anomalies.timestamps
                                  '2024-01-01'
                                )
                              }
                              key={index}
                              className="rounded-md border shadow-md h-[147px]"
                            >
                              <img
                                style={{ width: '100%', objectFit: 'cover' }}
                                className="rounded-md shadow-md h-full hover:cursor-pointer"
                                // src={anomaly.img_url}
                                src={anomaly.raw_img_url}
                                alt="no Img"
                                loading="lazy"
                              />
                            </div>
                          ))}
                        </Slider>
                      ) : clickedBar.isUpKeep && !clickedBar.isVm && !clickedBar.isPop && fullnessArray.length > 0 ? (
                        <Slider {...settings}>
                          {fullnessArray.map((anomaly, index) => (
                            <div
                              // onClick={() =>
                              //   handleImageClick(
                              //     anomaly.image_url,
                              //     anomaly.analysis_id,
                              //     anomaly.anomalies_found[0].type,
                              //     anomaly.timestamps
                              //   )
                              // }
                              key={index}
                              className="rounded-md border shadow-md h-[147px]"
                            >
                              <img
                                style={{ width: '100%', objectFit: 'cover' }}
                                className="rounded-md shadow-md h-full hover:cursor-pointer"
                                src={anomaly.image_url}
                                alt="no Img"
                                loading="lazy"
                              />
                            </div>
                          ))}
                        </Slider>
                      ) : !clickedBar.isUpKeep && clickedBar.isVm && !clickedBar.isPop && colorArray.length > 0 ? (
                        <Slider {...settings}>
                          {colorArray.map((anomaly, index) => (
                            <div
                              // onClick={() =>
                              //   handleImageClick(
                              //     anomaly.image_url,
                              //     anomaly.analysis_id,
                              //     anomaly.anomalies_found[0].type,
                              //     anomaly.timestamps
                              //   )
                              // }
                              key={index}
                              className="rounded-md border shadow-md h-[147px]"
                            >
                              <img
                                style={{ width: '100%', objectFit: 'cover' }}
                                className="rounded-md shadow-md h-full hover:cursor-pointer"
                                src={anomaly.image_url}
                                alt="no Img"
                                loading="lazy"
                              />
                            </div>
                          ))}
                        </Slider>
                      ) : (
                        <div className=" w-full h-full flex justify-center place-items-center">
                          <Stack direction={'column'} spacing={1}>
                            <div className="w-28 flex justify-center ">
                              <img src={CheckMarkImg} alt="complete" className="w-20" />
                            </div>
                            <button
                              onClick={() => navigate('/main/stores/layout')}
                              className="rounded-xl w-28 h-8 border border-emerald-600 hover:bg-emerald-600 hover:text-white hover:shadow-lg text-base"
                            >
                              No Anomalies
                            </button>
                          </Stack>
                        </div>
                      )}
                    </div>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          ))
        ) : (
          <Stack marginLeft={3} width={'100%'} paddingTop={3} spacing={gridSpacing}>
            <Grid xs={12} item>
              <Card className="shadow-xl" sx={{ padding: 1 }}>
                <Grid container>
                  <Skeleton animation="wave" variant="rounded" width={'100%'} height={160} />
                </Grid>
              </Card>
            </Grid>
            <Grid xs={12} item>
              <Card className="shadow-xl" sx={{ padding: 1 }}>
                <Grid container>
                  <Skeleton animation="wave" variant="rounded" width={'100%'} height={160} />
                </Grid>
              </Card>
            </Grid>
            <Grid xs={12} item>
              <Card className="shadow-xl" sx={{ padding: 1 }}>
                <Grid container>
                  <Skeleton animation="wave" variant="rounded" width={'100%'} height={160} />
                </Grid>
              </Card>
            </Grid>
          </Stack>
        )}
      </Grid>
      {loading ? (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minheight: '100vh' }}>
          <l-bouncy size="45" speed="1" color="black"></l-bouncy>
        </div>
      ) : (
        <Dialog maxWidth={600} open={isImageDialogOpen} onClose={handleImageClick}>
          <DialogContent>
            {/* {anomalyDetails.length > 0 && */}
            {
              lcData > 0 && (
                // updatedData[0].allAnomalies.map((details, index) => (
                <div className="zoom-container">
                  <div className="image-container flex justify-center items-center lg:mb-0 mb-10 relative">
                    <TransformWrapper>
                      <div className="image-wrapper rounded-md md:w-full w-4/5">
                        <TransformComponent>
                          {imageLoading && (
                            <div className="flex justify-center items-center absolute top-0 left-0 z-10  overflow-x-hidden bg-white w-full h-full">
                              <l-bouncy size="45" speed="1.75" color="black"></l-bouncy>
                            </div>
                          )}
                          <div style={{ position: 'relative' }}>
                            <img
                              className="image rounded-md"
                              // src={liveAnomalyImg ? selectedImage : anomalyDetails[0]?.reference_img}
                              src={cData.raw_img_url}
                              alt="No img found"
                              onLoad={findDimensions}
                              ref={imageRef}

                              //   () => {
                              //   setImageLoading(false);
                              // }}
                            />
                            {antn && <div style={highlightStyle}></div>}
                          </div>
                          {/* <div className="toggle-button-container absolute top-1 right-2">
                            <ToggleButtonGroup
                              color="primary"
                              value={liveAnomalyImg}
                              exclusive
                              onChange={handleToggleImage}
                              aria-label="Platform"
                              className="text-white bg-white"
                            >
                              <ToggleButton
                                value={true}
                                style={{
                                  backgroundColor: liveAnomalyImg ? 'rgb(16, 185, 129)' : '',
                                  color: liveAnomalyImg ? 'white' : '#10b981'
                                }}
                              >
                                Live
                              </ToggleButton>
                              <ToggleButton
                                value={false}
                                style={{
                                  backgroundColor: !liveAnomalyImg ? 'rgb(16, 185, 129)' : '',
                                  color: !liveAnomalyImg ? 'white' : '#10b981'
                                }}
                              >
                                Reference
                              </ToggleButton>
                            </ToggleButtonGroup>
                          </div> */}
                          {/* <ImageListItemBar title={`Date: ${timestamps?.date}`} subtitle={`Time: ${timestamps?.time}`} /> */}
                        </TransformComponent>
                      </div>
                    </TransformWrapper>
                  </div>

                  <div className="md:w-[30vw] md:ml-[1.5vw] h-[80vh] flex flex-col w-full">
                    <div className="flex-grow flex flex-col space-y-1.5 overflow-y-auto scrollbar">
                      <div className="w-full flex justify-between place-items-center">
                        <Typography variant="h3" className="">
                          {/* {details.store_id} - {details.store_name} */}
                          {updatedData[0]?.store_id} - {updatedData[0]?.store_name}
                        </Typography>
                        <button onClick={handleImageClick} className="md:static absolute top-5 right-5 ">
                          <IoIosClose className="md:text-4xl text-2xl" />
                        </button>
                      </div>
                      <Divider />
                      <Typography paddingBottom={1.5} width={'100%'} variant="h5">
                        {/* / {details.bay_id} / {details.shelf_id} */}/ {cData.zone_id} / {cData.shelf_id}
                      </Typography>
                      <Typography width={'100%'} variant="h3">
                        Groups
                      </Typography>
                      <Divider />
                      <div style={{ paddingBottom: 13 }} className="w-full flex flex-wrap gap-2">
                        <div className="bg-[#002F01] rounded-full">
                          <Typography color={'white'} paddingY={1} paddingX={2} variant="h5">
                            {cData.group_id}
                          </Typography>
                        </div>
                      </div>
                      <Typography width={'100%'} variant="h3">
                        Anomalies
                      </Typography>
                      <Divider />
                      <div style={{ paddingBottom: 13 }} className="w-full flex flex-wrap gap-2">
                        {anomalyType === 'color_assortment' ? (
                          <Box
                            paddingX={0.2}
                            paddingY={0.04}
                            className="bg-gray-200 rounded-full flex gap-1 justify-center place-items-center"
                          >
                            <RiErrorWarningLine className="text-4xl mr-0.5 text-purple-500" />
                            <Typography paddingRight={2} variant="h6">
                              Colour
                            </Typography>
                          </Box>
                        ) : (
                          cData.anomalies[0][0].map((itm, index) => (
                            <Tooltip
                              key={index}
                              title={
                                <div>
                                  <Typography variant="body1">
                                    Article Code: {itm.article_code ? itm.article_code : 'No Data Found'}
                                  </Typography>
                                  <Typography variant="body1">
                                    Description: {itm.article_description ? itm.article_description : 'No Data Found'}
                                  </Typography>
                                  <Typography variant="body1">Ean Code: {itm.ean_code ? itm.ean_code : 'No Data Found'}</Typography>
                                </div>
                              }
                            >
                              <Box
                                key={index}
                                paddingX={0.2}
                                paddingY={0.04}
                                className="bg-gray-200 rounded-full flex gap-1 justify-center place-items-center cursor-pointer hover:bg-amber-500"
                                onMouseOver={() => {
                                  calculate(itm.xmin, itm.ymin, itm.xmax, itm.ymax);
                                }}
                                onMouseOut={() => {
                                  if (antn) {
                                    setPos({ lft: false, tp: false, wdth: false, ht: false });
                                    setAntn(!antn);
                                  }
                                }}
                              >
                                <RiErrorWarningLine className="text-4xl mr-0.5" style={{ color: error }} />
                                <Typography paddingRight={2} variant="h6">
                                  {itm.anomaly_type}
                                </Typography>
                              </Box>
                            </Tooltip>
                          ))
                        )}
                      </div>
                      {/* <Typography width={'100%'} variant="h3">
                        Team
                      </Typography>
                      <Divider /> */}
                      <div style={{ paddingBottom: 13 }} className="w-full flex justify-start">
                        <AvatarGroup
                          sx={{
                            '& .MuiAvatar-root': { width: 40, height: 40, fontSize: 24 }
                          }}
                          max={2}
                        >
                          {/* <Tooltip
                            title={
                              <div className="w-[200px] p-2 flex flex-col space-y-2">
                                <Typography sx={{ width: '100%', color: 'white' }} variant="h6">
                                  Agent Details
                                </Typography>
                                <Typography variant="subtitle2">Name: {details.user_name}</Typography>
                                <Typography variant="subtitle2">Number: {details.user_number}</Typography>
                              </div>
                            }
                            enterTouchDelay={1}
                            leaveTouchDelay={100000}
                          >
                            <Avatar className="hover:cursor-pointer" sx={{ bgcolor: success }} alt={details.user_name} src="/example.jpg" />
                          </Tooltip> */}
                        </AvatarGroup>
                      </div>
                      <Typography sx={{ paddingBottom: 1 }} width={'100%'} variant="h3">
                        Comments
                      </Typography>
                      {/* <Divider /> */}
                      <TextField
                        // sx={{ paddingTop: 2 }}
                        id="outlined-textarea"
                        label="Add a comment"
                        placeholder="Give your Comments"
                        multiline
                        rows={4}
                      />
                    </div>
                    <div className="w-full bg-white mt-5 flex flex-row-reverse gap-3">
                      <button className="lg:rounded-full rounded-xl md:w-[125px]  text-lg lg:text-2xl p-2.5 hover:cursor-not-allowed border-2 border-gray-300">
                        <Typography className="text-gray-400">Ignore</Typography>
                      </button>
                      <button
                        className="lg:rounded-full rounded-xl md:w-[125px]  hover:cursor-not-allowed text-lg lg:text-2xl p-2.5"
                        // style={{ backgroundColor: success }}
                        style={{ backgroundColor: '#6ee7b7' }}
                      >
                        <Typography color={'white'}>Solved</Typography>
                      </button>
                      <button
                        className="lg:rounded-full rounded-xl md:w-[125px] hover:cursor-not-allowed text-lg lg:text-2xl p-2.5"
                        // style={{ backgroundColor: error }}
                        style={{ backgroundColor: '#fca5a5' }}
                      >
                        <Typography color={'white'}>Alert Store</Typography>
                      </button>
                    </div>
                  </div>
                </div>
              )
              // ))}
            }
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default Customers;
