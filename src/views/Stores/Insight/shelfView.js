import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ImCross } from 'react-icons/im';
import Grid from '@mui/material/Grid';
// import { Box, Dialog, DialogContent, Divider, Paper, Tooltip, Typography, Avatar, AvatarGroup, useTheme } from '@mui/material';
import {
  Dialog,
  DialogContent,
  Typography,
  Box,
  Menu,
  MenuItem,
  IconButton,
  Divider,
  Paper,
  Tooltip,
  Avatar,
  AvatarGroup,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { FaCamera } from 'react-icons/fa';
import { GetAllBrands, getZonedetails } from 'api';
import { bouncy } from 'ldrs';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import '../../Customers/zoom-card-item.css';
import { RiErrorWarningLine, RiCheckboxCircleLine } from 'react-icons/ri';
import noData from '../../../assets/images/No_data-amico.svg';
import { BsSearch } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import MenuIcon from '@mui/icons-material/Menu';
bouncy.register();

export default function ShelfView({ date }) {
  const { store } = useParams();
  const zoneIds = useSelector((state) => state.zone);
  const imageRef = useRef(null);
  const [sliderData, setSliderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isBrandData, setIsBrandData] = useState([]);
  const [active, setActive] = useState(null);
  const theme = useTheme();
  const success = theme.palette.success.main;
  const error = theme.palette.error.main;
  const paperRefs = useRef([]);
  const [brandempty, setBrandEmpty] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [dialogData, setDialogData] = useState(null);
  const [anomalyType] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: false,
    fade: true,
    waitForAnimate: false,
    beforeChange: (current, next) => setCurrentSlide(next)
  };

  // Format date for display
  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const amPm = hours >= 12 ? 'PM' : 'AM';
    const modifiedHours = hours % 12 || 12;

    return `${year}-${month}-${day} / ${modifiedHours}:${minutes} ${amPm}`;
  }

  // Capitalize words and replace underscores with spaces
  function formatText(str) {
    return str
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }

  function capitalizeWords(str) {
    return str
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
  function replaceUnderscores(str) {
    // Use the replace method with a regular expression
    return capitalizeWords(str.replace(/_/g, ' '));
  }
  function removeAfterLastUnderscore(str) {
    const lastUnderscoreIndex = str.lastIndexOf('_');
    if (lastUnderscoreIndex !== -1) {
      return replaceUnderscores(str.substring(0, lastUnderscoreIndex));
    } else {
      // No underscore found, return original string
      return replaceUnderscores(str);
    }
  }

  // Fetch zone details
  const getZoneDetails = useCallback(
    async (brand_id) => {
      try {
        setLoading(true);
        const body = {
          date: date.toString(),
          brand_id: brand_id
        };
        const zoneData = store && date && (await getZonedetails(body));
        setSliderData(zoneData.data);
      } catch (e) {
        console.error('Error in getZoneDetails', e);
      } finally {
        setLoading(false);
      }
    },
    [date, store]
  );

  // Handle image click

  const handleImageClick = useCallback(() => {
    if (antn) {
      setPos({ lft: false, tp: false, wdth: false, ht: false });
      setAntn(!antn);
    }
    const clickedItem = sliderData[currentSlide];
    setDialogData(clickedItem);
    setIsImageDialogOpen(true);
    // eslint-disable-next-line
  }, [sliderData, currentSlide]);

  // Fetch data when active brand changes
  useEffect(() => {
    if (active) {
      getZoneDetails(active);
    }
  }, [active, getZoneDetails]);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  // Initialize brands data
  useEffect(() => {
    const latestZoneId = zoneIds && zoneIds.length > 0 ? zoneIds[zoneIds.length - 1] : null;
    setSearchQuery(latestZoneId ? latestZoneId.toString() : '');

    async function getAllBrandsName() {
      try {
        const body = {
          store_id: [store],
          date: date
        };
        const brandRes = date && store && (await GetAllBrands(body));
        const brandData = brandRes && brandRes.data && brandRes.data.data && brandRes.data.data.brands;
        if (brandData && brandData.length > 0) {
          setBrandEmpty(1);
          setIsBrandData(brandData);
        } else {
          setBrandEmpty(2);
        }
      } catch (e) {
        console.error('Error in getAllBrandsName', e);
        setBrandEmpty(2);
      }
    }
    getAllBrandsName();
  }, [date, store, zoneIds]);

  // Set initial active brand
  useEffect(() => {
    if (isBrandData && isBrandData.length > 0) {
      setActive(isBrandData[0].brand_id);
    }
  }, [isBrandData]);
  const [antn, setAntn] = useState(0);
  const [pos, setPos] = useState({ lft: false, tp: false, wdth: false, ht: false });

  // Add this function in your component
  const calculate = (xmin, ymin, xmax, ymax, code) => {
    const lft = (xmin / imageDimensions.width) * 100;
    // const top = (ymin / imageDimensions.height) * 100;
    const width = ((xmax - xmin) / imageDimensions.width) * 100;
    const height = ((ymax - ymin) / imageDimensions.height) * 100;
    setPos({ lft, tp, wdth: width, hght: height });
    setAntn(code);
  };
  // Filter brands based on search query
  const filteredData = useMemo(() => {
    return Array.isArray(isBrandData) ? isBrandData.filter((d) => d.brand_name.toLowerCase().includes(searchQuery.toLowerCase())) : [];
  }, [isBrandData, searchQuery]);
  console.log('dialogData', dialogData);
  return (
    <>
      {isBrandData && isBrandData.length > 0 ? (
        <div style={{ margin: '20px', overflowY: 'scroll' }} className="scrollbar">
          <Grid container spacing={4}>
            {/* Brand list */}
            <Grid item md={3.5} sm={3.4} style={{ height: '500px', marginBottom: '50px', overflowY: 'scroll' }} className="scrollbar">
              {/* Search input */}
              <Grid item xs={12} className="sticky top-0 bg-white z-10">
                <Grid container alignItems="center" className="mb-4">
                  <Grid item>
                    <BsSearch className="text-black text-lg cursor-pointer" />
                  </Grid>
                  <Grid item xs>
                    <input
                      type="search"
                      placeholder="Search"
                      className="text-base bg-transparent w-full text-black focus:outline-none ml-2"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value.trim())}
                    />
                  </Grid>
                </Grid>
              </Grid>
              {/* Brand list items */}
              {filteredData
                .sort((a, b) => a.brand_name.localeCompare(b.brand_name))
                .filter((name) => name.brand_name.trim() !== '')
                .map((d, ind) => (
                  <Paper
                    ref={(ref) => {
                      paperRefs.current[ind] = ref;
                    }}
                    key={ind}
                    elevation={4}
                    className="flex items-center mb-4 cursor-pointer p-5"
                    onClick={() => {
                      d.capture_status === 1 && setActive(d.brand_id);
                    }}
                    style={{
                      backgroundColor: d.capture_status === 0 ? '#f5f5f5' : active === d.brand_id ? 'black' : 'white',
                      opacity: d.capture_status === 0 ? '0.4' : '1',
                      color: active === d.brand_id ? 'white' : 'black',
                      fontWeight: 'bolder',
                      cursor: d.capture_status === 0 ? 'not-allowed' : 'pointer'
                    }}
                  >
                    <div
                      style={{
                        height: '30px',
                        width: '30px',
                        borderRadius: '50%',
                        background: 'black',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: '8px'
                      }}
                    >
                      <FaCamera />
                    </div>
                    <h6>{d.brand_name}</h6>
                  </Paper>
                ))}
            </Grid>
            {/* Slider */}
            <Grid
              item
              md={8}
              sm={8.6}
              style={{ height: '460px', marginBottom: '50px', overflowY: 'scroll', marginTop: '35px' }}
              className="inline-block w-[550px]"
            >
              <Slider {...settings} className="w-[600px] h-[400px]">
                {sliderData.map((item, index) => (
                  <Grid item key={item._id || index} style={{ marginBottom: '10px' }} className="w-full flex">
                    {item.img_url ? (
                      <div className="flex w-full h-full">
                        <div className="h-full relative">
                          <img
                            src={item.img_url}
                            alt="img"
                            className="image rounded-md shadow-md hover:cursor-pointer h-96"
                            onClick={handleImageClick}
                          />
                        </div>
                        <div className="ml-3" style={{ padding: '7px' }}>
                          <Typography variant="h3" className="">
                            {item.brand_name}
                          </Typography>
                          <Divider />
                          <Typography paddingBottom={1.5} width={'100%'} variant="h5">
                            Bay ID : {item.bay_id}
                          </Typography>
                          <Typography width={'100%'} variant="h5">
                            Date & Time of Capture
                          </Typography>
                          <Typography paddingBottom={1.5} width={'100%'} variant="h5">
                            {formatDate(item.timestamp)}
                          </Typography>
                          <Typography width={'100%'} variant="h5">
                            Anomalies
                          </Typography>
                          <Divider />
                          <div style={{ paddingBottom: 13 }} className="w-full flex flex-wrap gap-2">
                            {item.shelves &&
                              item.shelves.length > 0 &&
                              item.shelves.map((itm, ind) =>
                                itm.anomaly_type !== '' ? (
                                  <Tooltip key={ind}>
                                    <Box
                                      paddingX={0.2}
                                      paddingY={0.04}
                                      className="bg-gray-200 rounded-full flex gap-1 justify-center place-items-center cursor-pointer hover:bg-amber-500"
                                    >
                                      <RiErrorWarningLine className="text-4xl mr-0.5" style={{ color: error }} />
                                      <Typography paddingRight={2} variant="h6">
                                        {formatText(itm.anomaly_type)}
                                      </Typography>
                                    </Box>
                                  </Tooltip>
                                ) : (
                                  <Tooltip key={ind}>
                                    <Box
                                      paddingX={0.2}
                                      paddingY={0.04}
                                      className="bg-gray-200 rounded-full flex gap-1 justify-center place-items-center cursor-pointer hover:bg-amber-500"
                                    >
                                      <RiCheckboxCircleLine className="text-4xl mr-0.5" style={{ color: 'green' }} />
                                      <Typography paddingRight={2} variant="h6">
                                        No Anomaly
                                      </Typography>
                                    </Box>
                                  </Tooltip>
                                )
                              )}
                          </div>
                          <Divider />
                          <Typography width={'100%'} variant="h5">
                            Team
                          </Typography>
                          <div style={{ paddingBottom: 13 }} className="w-full flex justify-start">
                            <AvatarGroup
                              sx={{
                                '& .MuiAvatar-root': { width: 40, height: 40, fontSize: 24 }
                              }}
                              max={2}
                            >
                              <Tooltip
                                title={
                                  <div className="w-[200px] p-2 flex flex-col space-y-2">
                                    <Typography sx={{ width: '100%', color: 'white' }} variant="h6">
                                      Agent Details
                                    </Typography>
                                    <Typography variant="subtitle2">Name: {item.user[0].name}</Typography>
                                    <Typography variant="subtitle2">Number: {item.user[0].number}</Typography>
                                  </div>
                                }
                                enterTouchDelay={1}
                                leaveTouchDelay={100000}
                              >
                                <Avatar
                                  className="hover:cursor-pointer"
                                  sx={{ bgcolor: success }}
                                  alt={item.user[0].name}
                                  src="/example.jpg"
                                />
                              </Tooltip>
                            </AvatarGroup>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex w-full h-full">
                        <img src={noData} alt="img" style={{ height: '50%', width: '100%', borderRadius: '7px', cursor: 'pointer' }} />
                      </div>
                    )}
                  </Grid>
                ))}
              </Slider>
            </Grid>
          </Grid>
        </div>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '500px' }}>
          {brandempty === 0 && <l-bouncy size="45" speed="1" color="black"></l-bouncy>}
          {brandempty === 2 && <img style={{ height: '310px' }} src={noData} alt="No data" />}
        </div>
      )}

      {/* Image Dialog */}
      <Dialog
        fullScreen
        open={isImageDialogOpen}
        onClose={() => setIsImageDialogOpen(false)}
        PaperProps={{
          sx: {
            width: '100%',
            maxHeight: '1300px',
            background: 'rgba(0, 0, 0, 0.8)',
            boxShadow: 'none'
          }
        }}
      >
        <DialogContent className="w-full h-full flex justify-center relative overflow-hidden">
          <ImCross
            onClick={() => setIsImageDialogOpen(false)}
            className="z-20 text-lg cursor-pointer text-white opacity-60 hover:opacity-100 absolute"
            style={{
              right: '4%',
              top: '4%'
            }}
          />
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <l-bouncy size="45" speed="1.75" color="white"></l-bouncy>
            </div>
          ) : (
            dialogData && (
              <div className="zoom-container">
                <div className="image-container flex justify-center items-center lg:mb-0 mb-10 relative">
                  <TransformWrapper>
                    <TransformComponent>
                      <div style={{ position: 'relative' }}>
                        <img
                          className="self-center lg:max-h-[95vh] lg:max-w-[95vw] max-h-[80vh] md:max-h-[85vh] mt-10 md:mt-0 text-white"
                          src={dialogData.img_url}
                          alt="No img found"
                          ref={imageRef}
                          onLoad={dialogData.img_url}
                        />
                        {antn !== 0 && (
                          <div
                            style={{
                              position: 'absolute',
                              left: `${pos.lft}%`,
                              top: `${pos.tp}%`,
                              width: `${pos.wdth}%`,
                              height: `${pos.hght}%`,
                              border: `2px solid ${antn === 1 ? 'red' : 'green'}`,
                              backgroundColor: antn === 1 ? 'rgba(255, 0, 0, 0.2)' : 'rgba(0, 255, 0, 0.2)',
                              pointerEvents: 'none'
                            }}
                          />
                        )}
                      </div>
                    </TransformComponent>
                  </TransformWrapper>
                </div>
                {isMobile ? (
                  <>
                    <IconButton
                      className="absolute text-white left-[4%] top-[3%]"
                      size="large"
                      aria-label="more"
                      id="long-button"
                      aria-controls={open ? 'long-menu' : undefined}
                      aria-expanded={open ? 'true' : undefined}
                      aria-haspopup="true"
                      onClick={handleClick}
                    >
                      <MenuIcon />
                    </IconButton>
                    <Menu
                      id="long-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      PaperProps={{
                        style: {
                          maxHeight: '80vh',
                          width: '80vw',
                          backgroundColor: 'white',
                          color: 'rgba(0, 0, 0, 0.8)'
                        }
                      }}
                    >
                      <MenuItem>
                        <Typography variant="h6">
                          {dialogData.bay_id} - {dialogData.bay_info.brand_name}
                        </Typography>
                      </MenuItem>
                      <Divider style={{ backgroundColor: 'white' }} />
                      <MenuItem>
                        <Typography variant="body1">Date & Time: {formatDate(dialogData.timestamp)}</Typography>
                      </MenuItem>
                      <Divider style={{ backgroundColor: 'white' }} />
                      <MenuItem>
                        <Typography variant="body1">OSA Score: {dialogData.OSA_Score}%</Typography>
                      </MenuItem>
                      <MenuItem>
                        <Typography variant="body1">Tester Score: {dialogData.testers_score}%</Typography>
                      </MenuItem>
                      <MenuItem>
                        <Typography variant="body1">Category: {dialogData.category}</Typography>
                      </MenuItem>
                      <Divider style={{ backgroundColor: 'white' }} />
                      <MenuItem>
                        <Typography variant="body1">Name: {dialogData.user[0].name}</Typography>
                      </MenuItem>
                      <MenuItem>
                        <Typography variant="body1">Number: {dialogData.user[0].number}</Typography>
                      </MenuItem>
                      <Divider style={{ backgroundColor: 'white' }} />
                      <MenuItem style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                        <div className="flex flex-wrap gap-2">
                          <Typography variant="body1">Anomalies</Typography>
                          <Divider style={{ backgroundColor: 'white' }} />
                          {anomalyType === 'color_assortment' ? (
                            <Box
                              paddingX={0.2}
                              paddingY={0.04}
                              className="bg-white rounded-full flex gap-1 justify-center place-items-center"
                            >
                              <RiErrorWarningLine className="text-2xl mr-0.5 text-purple-500" />
                              <Typography variant="body2">Colour</Typography>
                            </Box>
                          ) : (
                            dialogData.shelves &&
                            dialogData.shelves.map((itm, ind) =>
                              itm.anomaly_type !== '' ? (
                                <Box
                                  key={ind}
                                  paddingX={0.2}
                                  paddingY={0.04}
                                  className="bg-white rounded-full flex gap-1 justify-center place-items-center"
                                >
                                  <RiErrorWarningLine className="text-2xl mr-0.5" style={{ color: error }} />
                                  <Typography variant="body2">{formatText(itm.anomaly_type)}</Typography>
                                </Box>
                              ) : (
                                <Box
                                  key={ind}
                                  paddingX={0.2}
                                  paddingY={0.04}
                                  className="bg-white rounded-full flex gap-1 justify-center place-items-center"
                                >
                                  <RiCheckboxCircleLine className="text-2xl mr-0.5" style={{ color: 'green' }} />
                                  <Typography variant="body2">No Anomaly</Typography>
                                </Box>
                              )
                            )
                          )}
                        </div>
                      </MenuItem>
                    </Menu>
                  </>
                ) : (
                  <>
                    <div
                      className=" text-xl cursor-pointer text-white absolute hidden xl:block"
                      style={{
                        left: '4%',
                        top: '3%'
                      }}
                    >
                      <Typography variant="h3" className="text-white">
                        {dialogData.bay_id} - {dialogData.bay_info.brand_name}
                      </Typography>
                    </div>
                    <div
                      className=" text-xl cursor-pointer text-white absolute hidden xl:block"
                      style={{
                        left: '4%',
                        top: '20%'
                      }}
                    >
                      <Typography variant="h3" className="text-white">
                        Date & Time of Capture
                      </Typography>
                      <Divider color="white" className="mb-2" />
                      <Typography variant="h5" className="text-white">
                        {formatDate(dialogData.timestamp)}
                      </Typography>
                    </div>
                    <div
                      className=" text-xl cursor-pointer text-white absolute hidden xl:block"
                      style={{
                        left: '4%',
                        top: '35%'
                      }}
                    >
                      <Typography variant="h3" className="text-white">
                        OSA Score: {dialogData.OSA_Score}%
                      </Typography>
                      <Typography variant="h3" className="text-white">
                        Tester Score: {dialogData.testers_score}%{' '}
                      </Typography>
                      <Typography variant="h3" className="text-white">
                        Category: {dialogData.category}
                      </Typography>
                    </div>
                    <div
                      className=" text-xl cursor-pointer text-white absolute xl:block hidden"
                      style={{
                        left: '4%',
                        bottom: '3%'
                      }}
                    >
                      <Typography variant="h3" className="text-white">
                        Name: {dialogData.user[0].name}
                      </Typography>
                      <Typography variant="h3" className="text-white">
                        Number: {dialogData.user[0].number}
                      </Typography>
                    </div>

                    <div
                      className=" text-xl cursor-pointer text-white absolute hidden xl:block"
                      style={{
                        right: '4%',
                        top: '20%'
                      }}
                    >
                      <Typography variant="h3" className="text-white">
                        Anomalies
                      </Typography>
                      <Divider color="white" className="mb-2" />
                      <div className="flex flex-wrap gap-2 w-80">
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
                          dialogData &&
                          dialogData.shelves &&
                          dialogData.shelves.map(
                            (itm, ind) =>
                              itm.anomaly_type !== '' ? (
                                <Tooltip key={0 + ind}>
                                  <Box
                                    key={ind}
                                    paddingX={0.2}
                                    paddingY={0.04}
                                    className="bg-gray-200 rounded-full flex gap-1 justify-center place-items-center cursor-pointer hover:bg-amber-500"
                                    onMouseOver={() => {
                                      // itm.anomaly_found > 0 &&
                                      // calculate(itm.coords[0], itm.coords[1], itm.coords[2], itm.coords[3]);
                                      calculate(
                                        itm.coords.xmin,
                                        itm.coords.ymin,
                                        itm.coords.xmax,
                                        itm.coords.ymax,
                                        itm.anomaly_type !== '' ? 1 : 2
                                      );
                                      //  calculate(itm.xmin, itm.ymin, itm.xmax, itm.ymax);
                                      // console.log('here', itm.coords);
                                      // setAntn(true);
                                    }}
                                    onMouseOut={() => {
                                      // if (antn) {
                                      //   const arr = [...posarr];
                                      //   arr[index] = { lft: 0, tp: 0, wdth: 0, ht: 0 };
                                      //   setposarr(arr);
                                      //   setPos({ lft: false, tp: false, wdth: false, ht: false });
                                      //   setAntn(false);
                                      // }
                                      if (antn) {
                                        setPos({ lft: false, tp: false, wdth: false, ht: false });
                                        setAntn(0);
                                      }
                                    }}
                                  >
                                    {console.log('poppp', itm.coords)}
                                    <RiErrorWarningLine className="text-4xl mr-0.5" style={{ color: error }} />
                                    <Typography paddingRight={2} variant="h6">
                                      {removeAfterLastUnderscore(itm.anomaly_type)}
                                      {/* {itm.type.map((anomaly) => removeAfterLastUnderscore(anomaly))} */}
                                    </Typography>
                                  </Box>
                                </Tooltip>
                              ) : (
                                <Tooltip
                                  key={0 + ind}
                                  // title={
                                  //   <div>
                                  //     {console.log(itm, ind)}
                                  //     <Typography variant="body1">
                                  //       Article Code: {itm.article_code ? itm.article_code : 'No Data Found'}
                                  //     </Typography>
                                  //     <Typography variant="body1">
                                  //       <span>Description :</span>
                                  //       {itm.anomaly_type === 'alien_pop'
                                  //         ? itm.print_tag
                                  //           ? itm.print_tag
                                  //           : 'No Data Found'
                                  //         : itm.article_description
                                  //         ? itm.article_description
                                  //         : 'No Data Found'}
                                  //     </Typography>
                                  //     <Typography variant="body1">Ean Code: {itm.ean_code ? itm.ean_code : 'No Data Found'}</Typography>
                                  //   </div>
                                  // }
                                >
                                  <Box
                                    key={ind}
                                    paddingX={0.2}
                                    paddingY={0.04}
                                    className="bg-gray-200 rounded-full flex gap-1 justify-center place-items-center cursor-pointer hover:bg-amber-500"
                                    onMouseOver={() => {
                                      calculate(
                                        itm.coords.xmin,
                                        itm.coords.ymin,
                                        itm.coords.xmax,
                                        itm.coords.ymax,
                                        itm.anomaly_type !== '' ? 1 : 2
                                      );
                                      // setAntn(true);
                                    }}
                                    onMouseOut={() => {
                                      if (antn) {
                                        setPos({ lft: false, tp: false, wdth: false, ht: false });
                                        setAntn(0);
                                      }
                                    }}
                                  >
                                    <RiCheckboxCircleLine className="text-4xl mr-0.5" style={{ color: 'green' }} />
                                    <Typography paddingRight={2} variant="h6">
                                      No Anomaly
                                      {/* {removeAfterLastUnderscore(itm.anomaly_type)} */}
                                      {/* {cData[0].unique_anomaly_array.map((anomaly) => removeAfterLastUnderscore(anomaly) )} */}
                                    </Typography>
                                  </Box>
                                </Tooltip>
                              )
                            // )
                          )
                          // )
                        )}
                      </div>
                      <IconButton
                        className="absolute text-white left-[4%] top-[3%] xl:hidden"
                        size="large"
                        aria-label="more"
                        id="long-button"
                        aria-controls={open ? 'long-menu' : undefined}
                        aria-expanded={open ? 'true' : undefined}
                        aria-haspopup="true"
                        onClick={handleClick}
                      >
                        <MenuIcon />
                      </IconButton>
                    </div>
                  </>
                )}
              </div>
            )
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
