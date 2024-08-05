// import React from 'react';
// import { bouncy } from 'ldrs';
// import OverlappingCards from './CustomerTrial';
// bouncy.register();

// const Customers = () => {
//   return <div>
//     SOME TEXT HAHA
//     <OverlappingCards/>
//   </div>;
// };

// export default Customers;

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
// import DatePickerComp from 'views/Insights/DatePicker';

bouncy.register();

// material-ui
import {
  Card,
  Grid,
  Typography,
  Stack,
  LinearProgress,
  Box,
  useTheme,
  useMediaQuery,
  Tooltip,
  Avatar,
  AvatarGroup,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogContent,
  Skeleton,
  Divider,
  TextField,
  Snackbar,
  Alert
} from '@mui/material';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';

// react icons import
import { RiErrorWarningLine, RiCheckboxCircleLine } from 'react-icons/ri';
import { IoIosClose } from 'react-icons/io';

// project import
import Breadcrumb from 'component/Breadcrumb';
import { gridSpacing } from 'config.js';
import settings from '../../configs/react-slick-config';
import CheckMarkImg from '../../assets/images/checkmark.png';
import BarChartIcon from '@mui/icons-material/BarChart';
import { CgSpinner } from 'react-icons/cg';
import { FaAngleDoubleRight } from 'react-icons/fa';
import { FaAngleDoubleLeft } from 'react-icons/fa';
import { GetSignedImagesAllStores } from 'api';
import { useSelector } from 'react-redux';
//eslint-disable-next-line
const totalParts = 142;

// Dummy Data
//eslint-disable-next-line
const dummyStoreData = [
  {
    store: 'Store123',
    store_id: 'S123',
    store_name: 'Example Store 1',
    address: '123 Main St, Anytown, USA',
    location: {
      latitude: 34.0522,
      longitude: -118.2437
    },
    capture_percentage: 85.2,
    pop_percentage: 92.5,
    anomaliesFound: 15,
    store_anomalies: [
      {
        _id: 'anomaly1',
        raw_img_url: 'https://example.com/image1.jpg',
        metadata_id: 'metadata123',
        zone_id: 'Zone A',
        shelf_id: 'Shelf 1',
        group_id: 'Group X',
        timestamp: '2024-03-08T10:30:00Z',
        id: 'P123',
        name: 'Product 123',
        anomalies: [
          [
            {
              xmin: 100,
              ymin: 50,
              xmax: 200,
              ymax: 150,
              anomaly_type: 'empty_shelf',
              article_code: 'ART123',
              article_description: 'Missing Product',
              ean_code: 'EAN12345'
            }
          ]
        ],
        user_name: 'John Doe',
        user_number: '123-456-7890'
      },
      {
        _id: 'anomaly2',
        raw_img_url: 'https://example.com/image2.jpg',
        metadata_id: 'metadata456',
        zone_id: 'Zone B',
        shelf_id: 'Shelf 2',
        group_id: 'Group Y',
        timestamp: '2024-03-08T12:45:00Z',
        id: 'P456',
        name: 'Product 456',
        anomalies: [
          [
            {
              xmin: 300,
              ymin: 200,
              xmax: 400,
              ymax: 300,
              anomaly_type: 'misplaced_item',
              article_code: 'ART456',
              article_description: 'Incorrect Placement',
              ean_code: 'EAN67890'
            }
          ]
        ],
        user_name: 'Jane Smith',
        user_number: '987-654-3210'
      }
    ]
  }
  // Add more dummy store data as needed
];
//eslint-disable-next-line
const dummyAnomaliesData = {
  Store123: {
    anomalies_detected: 15,
    allAnomalies: [
      // ... (Populate with dummy anomaly data similar to store_anomalies)
    ]
  }
  // Add data for other stores in a similar format
};

const Customers = () => {
  //eslint-disable-next-line
  const [cord, setcord] = useState(null);
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  const [storesData, setStoresData] = useState([]);
  //eslint-disable-next-line
  const [colorArray, setColorArray] = useState([]);
  //eslint-disable-next-line
  const [anomalies_count, setAnomalies_count] = useState(0);
  //eslint-disable-next-line
  const [fullnessArray, setFullnessArray] = useState([]);
  //eslint-disable-next-line
  const [anomalyDetails, setAnonmalyDetails] = useState([]);
  //eslint-disable-next-line
  const [timestamps, setTimestamps] = useState({ date: '', time: '' });
  //eslint-disable-next-line
  const [anomalyType, setAnomalyType] = useState('');
  const [loading, setLoading] = useState(false);
  // const [selectedDate, setSelectedDate] = useState(new Date());
  const [clickedBar, setClickedBar] = useState({
    isOSAScore: false,
    isMT: false,
    isPog: false
  });

  const [imageLoading, setImageLoading] = useState(false);
  const [updatedData, setUpdateddata] = useState([]);
  const [cData, setCdata] = useState(null);
  const [lcData, setLCdata] = useState(false);
  const [storeAnomalies, setStoreAnomalies] = useState();
  //eslint-disable-next-line
  const [metadata, setMetadata] = useState('');
  const [alertData, setAlertData] = useState({
    zone_id: false,
    shelf_id: false,
    group_id: false,
    user_name: false,
    user_id: false,
    user_number: false,
    user_email: false,
    user_role: false,
    anomaly_type: false,
    message: false
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [msg, setMsg] = useState('');
  const [loadsend, setLoadsend] = useState(false);
  const [solvedLoad, setSolvedLoad] = useState(false);
  const [ignoreLoad, setIgnoreLoad] = useState(false);
  const [nextBtn, setNextbtn] = useState(false);
  const theme = useTheme();
  const isSmallScreen = !useMediaQuery(theme.breakpoints.up('sm'));
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
      onClick: () => navigate(`/main/stores/storeinsight/overview/${item.store}`),
      disabled: true
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
  //eslint-disable-next-line
  const user_id = 'dummyUserId';
  const open = Boolean(anchorEl);
  // const datess = useSelector((state) => state.customization.selectedDate)
  // .toISOString()
  // .slice(0, 10);

  const toLocalDateString = (date) => {
    const tzOffset = date.getTimezoneOffset() * 60000; // offset in milliseconds
    const localISOTime = new Date(date.getTime() - tzOffset).toISOString().slice(0, 10);
    return localISOTime;
  };
  
  // const selectedDate = useSelector((state) => state.customization.selectedDate)
  // .toISOString()
  // .slice(0, 10);

  const datess = toLocalDateString(useSelector((state) => state.customization.selectedDate));
  console.log("datesbabe", datess);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [bayImages, setBayImages] = useState([]);
  const [signedUrls, setSignedUrls] = useState([]);
  useEffect(() => {
    if (updatedData.length > 0) {
      const extractBayImages = () => {
        const images = [];
        updatedData.forEach((item, storeIndex) => {
          item.anomalies_details.forEach((anomaly, anomalyIndex) => {
            const uniqueKey = `${storeIndex}-${anomalyIndex}`;
            images.push({ url: anomaly.bay_img, key: uniqueKey });
          });
        });
        setBayImages(images);
      };
      extractBayImages();
    }
  }, [updatedData]);
  console.log('updated dta', updatedData);
  // const body = {
  //   "imageUrls": bayImages
  // }
  // console.log("body is",body);
  useEffect(() => {
    const fetchSignedUrls = async () => {
      try {
        for (const { url, key } of bayImages) {
          const body = { imageUrls: [url] };
          const res = await GetSignedImagesAllStores(body);
          console.log('response is', res);
          setSignedUrls((prevState) => ({
            ...prevState,
            [key]: res.data[0] // Assuming res.data is an array with a single signed URL
          }));
          console.log('body is', body);
        }
      } catch (error) {
        console.log('error fetching image urls', error);
      }
    };
    if (bayImages.length > 0) {
      fetchSignedUrls();
    }
  }, [bayImages]);

  // console.log(storeAnomalies['Store123']);
  // const upKeepClicked = () => {
  //   setClickedBar((prevState) => ({ ...prevState, isUpKeep: !prevState.isUpKeep }));
  // };
  //eslint-disable-next-line
  const osaClicked = () => {
    if (!clickedBar.isOSAScore) {
      setClickedBar({ isOSAScore: true, isMT: false, isPog: false });
    } else {
      setClickedBar({ isOSAScore: true, isMT: false, isPog: false });
    }
  };
  //eslint-disable-next-line
  const vMClicked = () => {
    if (!clickedBar.isMT) {
      setClickedBar({ isOSAScore: true, isMT: false, isPog: false });
    } else {
      setClickedBar({ isOSAScore: true, isMT: false, isPog: false });
    }
  };
  // const vMClicked = () => {
  //   setClickedBar((prevState) => ({ ...prevState, isVm: !prevState.isVm }));
  // };
  //eslint-disable-next-line
  const [map, setmap] = useState(null);
  //eslint-disable-next-line
  const [mapindex, setmapindex] = useState(0);

  useEffect(() => {
    console.log('here is storesData', storesData);

    const ids = storesData && storesData.length > 0 && storesData[0].anomalies_details;
    console.log(ids);
    const map = new Map();
    if (ids.length > 0) {
      for (var i = 0; i < ids.length; i++) {
        map.set(ids[i], i);
      }
    }
    console.log('map', map);
    setmap(map);
  }, [storesData]);

  const handleImageClick = async (url, id, anomaly, store_id, time) => {
    const link = 'https://pd9ydtkpok.execute-api.ap-south-1.amazonaws.com/dev/web-app/getanomlie-detail';
    const data = {
      metadata_id: id
    };
    console.log('urlop', url);
    try {
      //if (!id) return;
      const response = await fetch(link, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      // result[0].img_url = url;
      // console.log('For each Image ', result[0]);
      // setCdata(result);
      // setLCdata(!lcData);
      // cData && console.log(cData[0]);
      let updatedResult = { ...result[0], img_url: url, store_id };
      console.log('Updated Image:', updatedResult);
      updatedResult && setCdata([updatedResult]);

      // Toggle lcData state
      //setLCdata((prevLcData) => !prevLcData);
      setLCdata(true);

      // Log updated cData
      console.log(cData && cData[0]);
    } catch (error) {
      console.error('Error:', error);
    }

    console.log(id);
    setMetadata(id);

    if (antn) {
      setPos({ lft: false, tp: false, wdth: false, ht: false });
      //setAntn(!antn);
      setAntn(0);
    }

    const dateTime = new Date(time);
    const day = dateTime.toLocaleDateString(undefined, { day: '2-digit' });
    const month = dateTime.toLocaleDateString(undefined, { month: '2-digit' });
    const year = dateTime.toLocaleDateString(undefined, { year: 'numeric' });

    const formattedDate = `${day}/${month}/${year}`;
    const formattedTime = dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });

    if (!isImageDialogOpen) {
      console.log('C data value', anomaly);
      setTimestamps({ date: formattedDate, time: formattedTime });
    }
    setIsImageDialogOpen(!isImageDialogOpen);
  };

  // useEffect(() => {
  //   handleImageClick();
  // },[url]);

  const handleImageClickfromnext = async (url, id, anomaly, store_id, time) => {
    const link = 'https://pd9ydtkpok.execute-api.ap-south-1.amazonaws.com/dev/web-app/getanomlie-detail';
    const data = {
      metadata_id: id
    };
    console.log('yuri', url);
    try {
      const response = await fetch(link, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      // console.log('For each Image ', result);
      // setCdata(result);
      let updatedResult = { ...result[0], img_url: url, store_id };
      console.log('Updated Image:', updatedResult);
      setCdata([updatedResult]);

      // Toggle lcData state
      //setLCdata((prevLcData) => !prevLcData);

      // setLCdata(!lcData);
      cData && console.log(cData[0]);
    } catch (error) {
      console.error('Error:', error);
    }

    console.log(id);
    setMetadata(id);

    if (antn) {
      setPos({ lft: false, tp: false, wdth: false, ht: false });
      //setAntn(!antn);
      setAntn(0);
    }

    const dateTime = new Date(time);
    const day = dateTime.toLocaleDateString(undefined, { day: '2-digit' });
    const month = dateTime.toLocaleDateString(undefined, { month: '2-digit' });
    const year = dateTime.toLocaleDateString(undefined, { year: 'numeric' });

    const formattedDate = `${day}/${month}/${year}`;
    const formattedTime = dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });

    if (!isImageDialogOpen) {
      console.log('C data value', anomaly);
      setTimestamps({ date: formattedDate, time: formattedTime });
    }
    //  setIsImageDialogOpen(!isImageDialogOpen);
  };

  //here make a body
  //make the first API CALL

  const handleSolved = async () => {
    setSolvedLoad(true);
    // Simulate API call delay
    setTimeout(() => {
      setSolvedLoad(false);
      setSnackbarMessage('Solved successfully!');
      setSnackbarOpen(true);
      // Update anomalyDetails state if needed
    }, 1000);
  };

  //here the 2nd body call
  //some api's called
  const handleIgnored = async () => {
    setIgnoreLoad(true);
    // Simulate API call delay
    setTimeout(() => {
      setIgnoreLoad(false);
      setSnackbarMessage('Ignored successfully!');
      setSnackbarOpen(true);
      // Update anomalyDetails state if needed
    }, 1000);
  };
  //eslint-disable-next-line
  const unique_anomalies = 1;

  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Pad month with leading zero
    const day = String(date.getDate()).padStart(2, '0'); // Pad day with leading zero
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0'); // Pad with leading zero
    const amPm = hours >= 12 ? 'PM' : 'AM';
    const modifiedHours = hours % 12 || 12; // Convert to 12-hour format (12 for midnight/noon)

    return `${year}-${month}-${day} / ${modifiedHours}:${minutes} ${amPm}`;
  }

  const getStoresData = async () => {
    setLoading(true);
    // Simulate API call delay
    const url = 'https://pd9ydtkpok.execute-api.ap-south-1.amazonaws.com/dev/web-app/get-store-details';
    const data = {
      user_id: '66795cbe1d905892a4256691',
      // date: new Date().toISOString().split('T')[0]
      date: datess
      // date: '2024-07-10'
    };



    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('the result is ', result);
      setStoresData(result);
      setUpdateddata(result);
      console.log('hello');
      console.log('resut', result);

      const imagemap = new Map();
      result.map((itm) => {
        imagemap.set(itm._id, itm.anomalies_details);
      });
      console.log('imagemap', imagemap);
      imagemap && setStoreAnomalies(imagemap);

      imagemap && console.log('storeanomalies', storeAnomalies);

      setLoading(false);
    } catch (error) {
      console.error('Error loading tira API :', error);
      setLoading(false);
    }
  };
  useEffect(() => {
    console.log('storeAnomalies', storeAnomalies);
  }, [storeAnomalies]);

  const imageRef = useRef(null);
  const [antn, setAntn] = useState(0);
  const [pos, setPos] = useState({ lft: false, tp: false, wdth: false, ht: false });
  const [natural, setNaturel] = useState({ wdth: false, hght: false });

  const calculate = (xmin, ymin, xmax, ymax, code) => {
    const lft = (xmin / natural.wdth) * 100;
    const top = (ymin / natural.hght) * 100;
    const width = ((xmax - xmin) / natural.wdth) * 100;
    const height = ((ymax - ymin) / natural.hght) * 100;
    setPos({ lft: lft, tp: top, wdth: width, hght: height });
    setAntn(code);
    console.log('calcaulte', pos);
  };

  const highlightStyle = {
    position: 'absolute',
    left: `${pos.lft}%`,
    top: `${pos.tp}%`,
    width: `${pos.wdth}%`,
    height: `${pos.hght}%`,
    border: '1px solid red',
    boxSizing: 'border-box',
    pointerEvents: 'none',
    backgroundColor: 'rgba(255, 0, 0, 0.6)',
    borderRadius: '5px'
  };

  const highlightStyle2 = {
    position: 'absolute',
    left: `${pos.lft}%`,
    top: `${pos.tp}%`,
    width: `${pos.wdth}%`,
    height: `${pos.hght}%`,
    border: '1px solid green',
    boxSizing: 'border-box',
    pointerEvents: 'none',
    backgroundColor: 'rgba(0, 255, 0, 0.6)',
    borderRadius: '5px'
  };

  const findDimensions = (event) => {
    setImageLoading(false);
    const { naturalWidth, naturalHeight } = event.target;
    setNaturel({ wdth: naturalWidth, hght: naturalHeight });
  };
  //calling the getStoresData() function
  useEffect(() => {
    getStoresData();
  }, [datess]);

  const settingAnalysisStoreDetails = (storeName, lat, lng, store, id) => {
    localStorage.setItem('analysisStoreDetails', JSON.stringify({ storeName, lat, lng, store, id }));
  };

  useEffect(() => {
    async function sendAlertMsg() {
      if (alertData.zone_id) {
        // (You can simulate a successful response here)
        setLoadsend(false);
        setSnackbarOpen(true);
        setSnackbarMessage('Alert store message sent successfully!');
      }
    }
    sendAlertMsg();
  }, [alertData]);

  const handelAlertClick = () => {
    setLoadsend(true);

    const array = cData.anomalies[0][0].map((item) => item.anomaly_type);

    const uniqueSet = new Set(array);
    const uniqueArray = Array.from(uniqueSet);
    let result;

    if (uniqueArray.length === 1) {
      result = array[0].split('_')[0].charAt(0).toUpperCase() + array[0].split('_')[0].slice(1);
    } else {
      result = array
        .map((item) => item.split('_')[0].charAt(0).toUpperCase() + item.split('_')[0].slice(1))
        .reverse()
        .join(' and ');
    }

    const string = cData.shelf_id;
    const substring = string.substring(string.indexOf('S') + 1);
    const shelf = 'Shelf ' + substring;

    setAlertData({
      zone_id: cData.zone_id,
      shelf_id: shelf,
      group_id: cData.group_id,
      user_name: cData.user_name,
      user_id: cData.user_id,
      user_number: cData.user_number,
      user_email: cData.user_email,
      user_role: cData.user_role,
      anomaly_type: result,
      message: msg
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };
  //eslint-disable-next-line
  const handleNextClick1 = () => {
    cData && console.log('storedatdtadtatdat', storeAnomalies.get(cData[0].store_id));
    //if (!cData || !storeAnomalies[cData[0].store_id]) return;

    const series = storeAnomalies.get(cData[0].store_id).map((itm) => itm.metadata_id);
    console.log('series', series);
    const currentShelf = cData[0]._id;
    const index = series.lastIndexOf(currentShelf);

    console.log('index', index);
    const len = series.length;
    if (index === len - 1) return;
    const nextInd = (index + 1) % len;
    //eslint-disable-next-line
    const current = series[nextInd];

    const nextData = storeAnomalies.get(cData[0].store_id)[nextInd];
    console.log('nextfata', nextData);

    console.log('from next click', nextData.bay_img);
    handleImageClickfromnext(nextData.bay_img, nextData.metadata_id, nextData, cData[0].store_id);

    // setCdata(current);
  };

  const handlePrevClick1 = () => {
    cData && console.log('storedatdtadtatdat', storeAnomalies.get(cData[0].store_id));
    //if (!cData || !storeAnomalies[cData[0].store_id]) return;

    const series = storeAnomalies.get(cData[0].store_id).map((itm) => itm.metadata_id);
    console.log('series', series);
    const currentShelf = cData[0]._id;
    const index = series.indexOf(currentShelf);
    console.log('index', index);
    const len = series.length;

    const nextInd = (index - 1) % len;
    //eslint-disable-next-line
    const current = series[nextInd];

    const nextData = storeAnomalies.get(cData[0].store_id)[nextInd];
    console.log('nextfata', nextData);
    handleImageClickfromnext(nextData.bay_img, nextData.metadata_id, nextData, cData[0].store_id);
    // setCdata(current);
  };

  let unkey = [];
  let currentUnkeyIndex = 0;
  //eslint-disable-next-line
  const handlexnextclick = () => {
    console.log(cData);
    // let index = 0;
    const current = cData && cData[0]._id;
    console.log(current);
    // for (var i = 0; i < storesData[0].anomalies_details.length; i++) {
    //   if (String(storesData[0].anomalies_details[i].metadata_id) === String(current)) {
    //     index = i;
    //   }
    // }
    // console.log(storesData[0].anomalies_details.length);

    // index = (index + 1) % storesData[0].anomalies_details.length;

    // let anomaly = storesData[0].anomalies_details[index];
    // console.log("hkl",anomaly);
    // handleImageClickfromnext(anomaly.bay_img, anomaly.metadata_id, anomaly);
    updatedData.map((item, index) => {
      item.anomalies_details.map((anomaly, anomalyIndex) => {
        unkey.push(`${index}-${anomalyIndex}`);
      });
    });
    const currentKey = unkey[currentUnkeyIndex];
    console.log('Current key:', currentKey);
    console.log('Signed key:', signedUrls[currentKey]);
    handleImageClickfromnext(signedUrls[currentKey], anomaly.metadata_id, anomaly);
    currentUnkeyIndex = (currentUnkeyIndex + 1) % unkey.length;
    console.log('all ', unkey);
    console.log('Nextkeys index:', currentUnkeyIndex);
  };
  //eslint-disable-next-line
  const handleprevclick = () => {
    console.log(cData);
    let index = 0;
    const current = cData && cData[0]._id;
    console.log(current);
    for (var i = 0; i < storesData[0].anomalies_details.length; i++) {
      if (String(storesData[0].anomalies_details[i].metadata_id) === String(current)) {
        index = i;
        break;
      }
    }
    console.log(storesData[0].anomalies_details.length);

    index = (index - 1) % storesData[0].anomalies_details.length;

    let anomaly = storesData[0].anomalies_details[index];
    console.log(anomaly);

    handleImageClickfromnext(anomaly.bay_img, anomaly.metadata_id, anomaly);
  };
  //eslint-disable-next-line
  const handlePrevClick = () => {
    if (!cData || !storeAnomalies[cData._id]) return;

    const series = storeAnomalies[cData._id].allAnomalies.map((itm) => itm.shelf_id);
    const currentShelf = cData.shelf_id;
    const index = series.indexOf(currentShelf);
    const len = series.length;
    const nextInd = (index - 1 + len) % len;
    const current = storeAnomalies[cData._id].allAnomalies[nextInd];
    setCdata(current);
  };
  useEffect(() => {
    fetchData();
  }, [updatedData]);
  const fetchData = async () => {
    if (updatedData.length > 0) {
      const promises = updatedData.map(async (s) => {
        try {
          const data = await getAnomalyForStore({ store_id: s.store });
          console.log('anomaly', data);
          return { storeId: s.store, data };
        } catch (error) {
          console.error(`Error fetching anomalies for store ${s.store}:`, error);
          return { storeId: s.store, data: null }; // Set data to null in case of error
        }
      });
      try {
        const results = await Promise.all(promises);
        const anomaliesData = {};
        results.forEach((result) => {
          anomaliesData[result.storeId] = result.data;
        });
        //  setStoreAnomalies(anomaliesData);
      } catch (error) {
        console.error('Error fetching anomalies for stores:', error);
      }
    }
  };

  cData && console.log('cdata', cData);

  useEffect(() => {
    //   cData && console.log(cData[0].anomaly_details);
  }, [cData]);
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
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const findUniqueObjects = (originalArray) => {
    const seen = new Set(); // Set to store seen combinations of name and coords

    const uniqueObjects = [];

    for (const obj of originalArray) {
      const key = JSON.stringify({ type: obj.type, coords: obj.coords }); // Create a unique key

      if (!seen.has(key)) {
        seen.add(key);
        uniqueObjects.push(obj);
      }
    }

    return uniqueObjects;
  };
  //eslint-disable-next-line
  const [uniqueArrayy, setUniqueArrayy] = useState([]);

  useEffect(() => {
    if (cData) {
      const uniqueObjects = cData && cData.length > 0 && cData[0].anomaly_details && findUniqueObjects(cData[0].anomaly_details);
      console.log('unique array of anomalies ', uniqueObjects);
      setUniqueArrayy(uniqueObjects);
    }
  }, [cData]);

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
        {updatedData && updatedData.length > 0 ? (
          updatedData.map((item, index) => (
            <Grid key={index} xs={12} item>
              <Card className="shadow-xl" sx={{ padding: 1 }}>
                <Grid container spacing={1}>
                  <Grid item lg={5} md={6} sm={9} xs={12}>
                    <Grid container spacing={0}>
                      <Grid sx={{ paddingRight: 1 }} item>
                        <MapComponent lat={item.lat} lng={item.long} address={item.address} name={item.store_name} />
                      </Grid>
                      <Grid item sx={{ display: 'flex', flex: 1 }}>
                        <Stack sx={{ width: '100%' }} direction={'column'} spacing={1}>
                          <Box sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'space-between' }}>
                            <Stack direction={'row'} spacing={1}>
                              <div className="h-full flex flex-col justify-center">
                                <Tooltip title={'Active'}>
                                  <div className="shadow-md mb-0.5 rounded-full hover:cursor-pointer w-3 h-3 bg-emerald-500"></div>
                                </Tooltip>
                              </div>
                              <Typography
                                className="drop-shadow-md self-center cursor-pointer"
                                variant="h5"
                                onClick={() => {
                                  settingAnalysisStoreDetails(item.store_name, item.lat, item.long, item._id);
                                  navigate(`/main/stores/storeinsight/overview/${item._id}`);
                                  localStorage.setItem('analysisStoreId', JSON.stringify(item._id));
                                }}
                              >
                                {item.id} - {item.store_name}
                              </Typography>
                            </Stack>
                            {/* <div className="h-full w-fit"></div> 
                             <button
                              onClick={() => {
                                settingAnalysisStoreDetails(item.store_name, item.lat, item.long, item._id, item.id);
                                navigate(`/main/stores/storeinsight/overview/${item.store}`);
                              }}
                              className="w-20 h-6 text-sm border border-emerald-500 self-center shadow-md drop-shadow-md text-emerald-500 rounded-lg"
                            >
                              Analysis
                            </button>  */}
                            <div className="hidden">
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
                                    selected={option.label === 'Analysis'}
                                    disabled={option.disabled} // Apply the disabled attribute conditionally
                                    onClick={() => {
                                      if (option.disabled != true) {
                                        // option.onClick();
                                        navigate(`/main/stores/storeinsight/overview/${item.store}`);
                                        handleClose();
                                      }
                                    }}
                                    // onClick={() => navigate(`/main/stores/storeinsight/overview/${item.store}`)}
                                  >
                                    {option.icon && <span style={{ marginRight: '8px', color: option.color }}>{option.icon}</span>}
                                    <span style={{ color: option.color }}>{option.label}</span>
                                  </MenuItem>
                                ))}
                              </Menu>
                            </div>
                          </Box>
                          <Stack direction={{ xs: 'column', md: 'row' }} justifyContent={'space-between'}>
                            <Typography sx={{ width: 120 }} variant="h6">
                              Capture %
                            </Typography>
                            <Box className="relative" sx={{ marginLeft: 2, display: 'flex', flex: 1, alignItems: 'start' }}>
                              {/* here we have linearProgress showing the PoP */}
                              {/* {item.capture_percentage} */}
                              {/* marker 1 */}
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
                                value={item.capturePercent ? parseFloat(item.capturePercent) : 0}
                                // color="secondary"
                              />
                              <button className="absolute hover:cursor-not-allowed w-full h-full flex justify-center place-items-center">
                                <Typography sx={{ color: 'black' }} variant="subtitle1">
                                  {/* {item.capture_count ? Math.min(Math.floor((item.capture_count / totalParts) * 100), 100) : 0} % */}
                                  Capture : {item.capturePercent ? parseFloat(item.capturePercent).toFixed(1) : '0'}%
                                </Typography>
                              </button>
                            </Box>
                          </Stack>
                          <Stack direction={{ xs: 'column', md: 'row' }} justifyContent={'space-between'}>
                            <Typography sx={{ width: 120 }} variant={clickedBar.isOSAScore ? 'h5' : 'h6'}>
                              OSA Score %
                            </Typography>
                            <Box className="relative" sx={{ marginLeft: 2, display: 'flex', flex: 1, alignItems: 'center' }}>
                              {/* marker 2 */}
                              {/* Store Fullness */}
                              {/* We don't need to relace this   */}
                              <LinearProgress
                                sx={{
                                  width: '100%',
                                  borderRadius: 3,
                                  height: clickedBar.isOSAScore ? 25 : 20,
                                  // '& .MuiLinearProgress-bar': {
                                  //   backgroundColor: warning
                                  // }
                                  backgroundColor: '#e5e7eb',
                                  '& .MuiLinearProgress-bar': {
                                    backgroundColor:
                                      Math.floor(item.OSA_score) >= 80 && !clickedBar.isOSAScore
                                        ? success
                                        : Math.floor(item.OSA_score) >= 80 && clickedBar.isOSAScore
                                        ? successDark
                                        : Math.floor(item.OSA_score) < 50 && !clickedBar.isOSAScore
                                        ? error
                                        : Math.floor(item.OSA_score) < 50 && clickedBar.isOSAScore
                                        ? errorDark
                                        : !clickedBar.isOSAScore
                                        ? warning
                                        : warningDark
                                  }
                                }}
                                variant="determinate"
                                // value={78}
                                // value={Math.floor(item.store_fullness) || 0}
                                // value={0}
                                value={Math.floor(item.OSA_score)}
                                // color="secondary"
                              />
                              <button
                                // onClick={upKeepClicked}
                                className="absolute hover:cursor-not-allowed w-full h-full flex justify-center place-items-center"
                              >
                                <Typography sx={{ color: 'black' }} variant="subtitle1">
                                  OSA Score: {item.OSA_score ? parseFloat(item.OSA_score).toFixed(1) : '0'}%
                                </Typography>
                              </button>
                            </Box>
                          </Stack>
                          <Stack direction={{ xs: 'column', md: 'row' }} justifyContent={'space-between'}>
                            <Typography sx={{ width: 120 }} variant={clickedBar.isMT ? 'h5' : 'h6'}>
                              Tester Score %
                            </Typography>
                            <Box className="relative" sx={{ marginLeft: 2, display: 'flex', flex: 1, alignItems: 'center' }}>
                              {/* marker 3 */}
                              {/* anomalies count */}
                              <LinearProgress
                                sx={{
                                  width: '100%',
                                  borderRadius: 3,
                                  height: clickedBar.isMT ? 25 : 20,
                                  backgroundColor: '#e5e7eb',
                                  '& .MuiLinearProgress-bar': {
                                    backgroundColor:
                                      Math.floor(item.tester_fullness_score) >= 80 && !clickedBar.isMT
                                        ? success
                                        : Math.floor(item.tester_fullness_score) >= 80 && clickedBar.isMT
                                        ? successDark
                                        : Math.floor(item.tester_fullness_score) < 50 && !clickedBar.isMT
                                        ? error
                                        : Math.floor(item.tester_fullness_score) < 50 && clickedBar.isMT
                                        ? errorDark
                                        : !clickedBar.isMT
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
                                value={Math.floor(item.tester_fullness_score)}
                                // color="secondary"
                              />
                              <button
                                // onClick={vMClicked}
                                className="absolute hover:cursor-not-allowed w-full h-full flex justify-center place-items-center"
                              >
                                <Typography sx={{ color: 'black' }} variant="subtitle1">
                                  {/* {Math.floor((anomalies_count / totalParts) * 100) > 100
                                    ? 100
                                    : Math.floor((anomalies_count / totalParts) * 100)}{' '}
                                  %  */}
                                  Tester Score: {item.tester_fullness_score ? parseFloat(item.tester_fullness_score).toFixed(1) : '0'}%
                                </Typography>
                              </button>
                            </Box>
                          </Stack>
                          <Stack direction={{ xs: 'column', md: 'row' }} justifyContent={'space-between'}>
                            <Typography sx={{ width: 120 }} variant={clickedBar.isPog ? 'h5' : 'h6'}>
                              PoG Score %
                            </Typography>
                            <Box className="relative" sx={{ marginLeft: 2, display: 'flex', flex: 1, alignItems: 'center' }}>
                              <LinearProgress
                                sx={{
                                  width: '100%',
                                  borderRadius: 3,
                                  height: clickedBar.isPog ? 25 : 20,
                                  backgroundColor: '#e5e7eb',
                                  '& .MuiLinearProgress-bar': {
                                    backgroundColor:
                                      Math.floor(item.pop_percentage) >= 80 && !clickedBar.isPog
                                        ? success
                                        : Math.floor(item.pop_percentage) >= 80 && clickedBar.isPog
                                        ? successDark
                                        : Math.floor(item.pop_percentage) < 50 && !clickedBar.isPog
                                        ? error
                                        : Math.floor(item.pop_percentage) < 50 && clickedBar.isPog
                                        ? errorDark
                                        : !clickedBar.isPog
                                        ? warning
                                        : warningDark
                                  }
                                }}
                                variant="determinate"
                                // value={0}
                                value={item.pop_percentage ? parseFloat(item.pop_percentage) : 0}
                                // color="secondary"
                              />
                              <button
                                // onClick={popClicked}
                                className="absolute hover:cursor-pointer w-full h-full flex justify-center place-items-center"
                              >
                                <Typography sx={{ color: 'black' }} variant="subtitle1">
                                  {/* pop percentage is being shown  */}
                                  PoG Score: {item.pop_percentage ? parseFloat(item.pop_percentage).toFixed(2) : '0'}%
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
                        {/* marker */}
                        {/* section showing anomalies detected  */}
                        {/* anomalies_detected */}
                        <Typography className="drop-shadow-md" align="center" variant="h2">
                          0/
                          {item.anomalies_details.length > 0 ? item.anomalies_details.length : '...'}
                          {/* { console.log(storeAnomalies)} */}
                        </Typography>
                        <Typography className="drop-shadow-md" align="center" variant="h6">
                          Anomalies solved
                        </Typography>
                      </Stack>
                    </div>
                  </Grid>
                  <Grid item lg={5.5} md={4} sm={12} xs={7}>
                    <div className="w-full px-4 flex flex-col justify-center h-full">
                      {console.log(item.store_anomalies)}
                      {!clickedBar.isUpKeep && !clickedBar.isVm && !clickedBar.isPop ? (
                        <Slider {...settings} key={index}>
                          {/* {item.store_anomalies.map((anomaly, index) => (  */}
                          {item.anomalies_details.length ? (
                            // marker
                            // all anomalies
                            item.anomalies_details.map((anomaly, anomalyIndex) => {
                              const uniqueKey = `${index}-${anomalyIndex}`;
                              return (
                                <div
                                  key={uniqueKey}
                                  onClick={() => {
                                    console.log('from current', signedUrls[uniqueKey]);
                                    console.log('from current normal', anomaly.bay_img);
                                    handleImageClick(signedUrls[uniqueKey], anomaly.metadata_id, anomaly, item._id);
                                    //  handleImageClick(signedUrls[anomaly.bay_img], anomaly.metadata_id, anomaly, item._id);
                                  }}
                                  // onClick={() => handleImageClick(anomaly.bay_img_urls, anomaly.metadata_id, anomaly)}
                                  className="rounded-md border shadow-md h-[147px]"
                                >
                                  {/* {console.log(anomaly.raw_img_url, anomaly.metadata_id, anomaly)} */}
                                  <img
                                    style={{ width: '100%', objectFit: 'cover' }}
                                    className="rounded-md shadow-md h-full hover:cursor-pointer"
                                    // src={anomaly.img_url}
                                    src={signedUrls[uniqueKey] || anomaly.bay_img}
                                    //src={anomaly.bay_img_urls}
                                    alt="no Img"
                                    loading="lazy"
                                  />
                                </div>
                              );
                            })
                          ) : (
                            <div> No anomalies found.</div>
                          )}
                        </Slider>
                      ) : clickedBar.isUpKeep && !clickedBar.isVm && !clickedBar.isPop && fullnessArray.length > 0 ? (
                        <Slider {...settings}>
                          {fullnessArray.map((anomaly, index) => (
                            <div key={index} className="rounded-md border shadow-md h-[147px]">
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
                            <div key={index} className="rounded-md border shadow-md h-[147px]">
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
        <Dialog
          fullScreen={isSmallScreen ? true : false}
          maxWidth={200}
          open={isImageDialogOpen}
          onClose={() => {
            handleImageClick();
          }}
        >
          <DialogContent>
            {/* {anomalyDetails.length > 0 && */}
            {
              lcData > 0 && (
                // updatedData[0].allAnomalies.map((details, index) => (
                <div className="zoom-container">
                  <div className="image-container flex justify-center items-center lg:mb-0 mb-10 relative">
                    <TransformWrapper>
                      <div className="image-wrapper rounded-md md:w-full w-full" style={{ marginTop: isSmallScreen ? '300px' : '0' }}>
                        <TransformComponent>
                          {imageLoading && (
                            <div className="flex justify-center items-center absolute top-0 left-0 z-10  overflow-x-hidden bg-white w-full h-full">
                              <l-bouncy size="45" speed="1.75" color="black"></l-bouncy>
                            </div>
                          )}
                          <div
                            style={{ position: 'relative' }}
                            onMouseOver={() => {
                              setNextbtn(true);
                            }}
                            onMouseOut={() => {
                              setNextbtn(false);
                            }}
                          >
                            <img
                              className="image rounded-md"
                              // src={liveAnomalyImg ? selectedImage : anomalyDetails[0]?.reference_img}
                              src={cData[0].img_url}
                              alt="No img found"
                              onLoad={findDimensions}
                              ref={imageRef}

                              //   () => {
                              //   setImageLoading(false);
                              // }}
                            />
{/* 
                            {nextBtn && (
                              <>
                                <IconButton
                                  className="absolute top-1/2 right-0"
                                  style={{
                                    fontSize: '30px',
                                    color: 'white',
                                    backgroundColor: 'black',
                                    borderRadius: '50%',
                                    padding: '5px'
                                  }}
                                  onClick={handleNextClick1}
                                  //onClick={handlexnextclick}
                                >
                                  <FaAngleDoubleRight />
                                </IconButton>
                                <IconButton
                                  className="absolute top-1/2 left-0"
                                  style={{
                                    fontSize: '30px',
                                    color: 'white',
                                    backgroundColor: 'black',
                                    borderRadius: '50%',
                                    padding: '5px'
                                  }}
                                  onClick={handlePrevClick1}
                                >
                                  <FaAngleDoubleLeft />
                                </IconButton>
                              </>
                            )} */}
                            {antn !== 0 && <div style={antn === 1 ? highlightStyle : highlightStyle2}></div>}
                          </div>
                        </TransformComponent>
                      </div>
                    </TransformWrapper>
                  </div>

                  <div className="md:w-[30vw] md:ml-[1.5vw] h-[80vh] flex flex-col w-full">
                    <div className="flex-grow flex flex-col space-y-1.5 overflow-y-auto scrollbar">
                      <div className="w-full flex justify-between place-items-center">
                        <Typography variant="h3" className="">
                          {/* {details.store_id} - {details.store_name} */}
                          {/* {cData[0].brand_id} - */}
                          {cData[0].brand_name}
                        </Typography>
                        <button onClick={handleImageClick} className="md:static absolute top-5 right-5 ">
                          <IoIosClose className="md:text-4xl text-2xl" />
                        </button>
                      </div>
                      <Divider />
                      <Typography paddingBottom={1.5} width={'100%'} variant="h5">
                        {/* / {details.bay_id} / {details.shelf_id} */}
                        {/* Bay ID : {cData[0].bay_id} */}
                      </Typography>
                      <Typography width={'100%'} variant="h3">
                        Date & Time of Capture
                      </Typography>
                      <Divider />
                      <Typography paddingBottom={1.5} width={'100%'} variant="h5">
                        {formatDate(cData[0].timestamp)}
                      </Typography>
                      {/* <Typography width={'100%'} variant="h3">
                        Groups
                      </Typography>
                      <Divider />
                      <div style={{ paddingBottom: 13 }} className="w-full flex flex-wrap gap-2">
                        <div className="bg-[#002F01] rounded-full">
                          <Typography color={'white'} paddingY={1} paddingX={2} variant="h5">
                            {cData.group_id}
                          </Typography>
                        </div>
                      </div> */}
                      <Typography width={'100%'} variant="h3">
                        Anomalies
                      </Typography>

                      <Divider />
                      {/* <Typography width={'100%'} variant="h6">
                      {cData[0].unique_anomaly_array.map((anomaly) => anomaly)}
                      </Typography> */}

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
                          // cData.anomaly_details.map((item, index) =>

                          // cData[0].anomaly_details.map((itm, ind) => (
                          cData &&
                          cData.length > 0 &&
                          cData[0].shelves &&
                          cData[0].shelves.map((itm, ind) =>
                            itm.anomaly_type !== '' ? (
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
                                    calculate(itm.coords.xmin, itm.coords.ymin, itm.coords.xmax, itm.coords.ymax, 1);
                                    //  calculate(itm.xmin, itm.ymin, itm.xmax, itm.ymax);
                                    // setAntn(true);
                                  }}
                                  onMouseOut={() => {
                                    if (antn) {
                                      setPos({ lft: false, tp: false, wdth: false, ht: false });
                                      setAntn(0);
                                    }
                                  }}
                                >
                                  <RiErrorWarningLine className="text-4xl mr-0.5" style={{ color: error }} />
                                  <Typography paddingRight={2} variant="h6">
                                    {removeAfterLastUnderscore(itm.anomaly_type)}
                                    {/* {cData[0].unique_anomaly_array.map((anomaly) => removeAfterLastUnderscore(anomaly) )} */}
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
                                    calculate(itm.coords.xmin, itm.coords.ymin, itm.coords.xmax, itm.coords.ymax, 2);
                                    //  calculate(itm.xmin, itm.ymin, itm.xmax, itm.ymax);
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
                          )
                          // )
                        )}
                      </div>
                      <Typography width={'100%'} variant="h3">
                        Team
                      </Typography>
                      <Divider />
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
                                <Typography variant="subtitle2">Name: {cData[0].user_name}</Typography>
                                <Typography variant="subtitle2">Number: {cData[0].user_number}</Typography>
                              </div>
                            }
                            enterTouchDelay={1}
                            leaveTouchDelay={100000}
                          >
                            <Avatar className="hover:cursor-pointer" sx={{ bgcolor: success }} alt={cData[0].name} src="/example.jpg" />
                          </Tooltip>
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
                        onChange={(e) => setMsg(e.target.value)}
                      />
                    </div>
                    <div className="w-full bg-white mt-5 flex flex-row-reverse gap-3">
                      <button
                        className="lg:rounded-full rounded-xl md:w-[125px]  text-lg lg:text-2xl p-2.5 border-2 border-gray-300 flex align-middle justify-center"
                        onClick={() => handleIgnored()}
                      >
                        {ignoreLoad && <CgSpinner className="animate-spin" />}
                        <Typography className="text-gray-400">{ignoreLoad ? ' Ignoring...' : 'Ignore'}</Typography>
                      </button>
                      <button
                        className="lg:rounded-full rounded-xl md:w-[125px]  text-lg lg:text-2xl p-2.5 flex align-middle justify-center"
                        // style={{ backgroundColor: success }}
                        style={{ backgroundColor: success }}
                        onClick={() => handleSolved()}
                      >
                        {solvedLoad && <CgSpinner className="animate-spin" />}
                        <Typography color={'white'}>{solvedLoad ? ' Solving...' : 'Solved'}</Typography>
                      </button>

                      <button
                        className="lg:rounded-full rounded-xl md:w-[125px]  text-lg lg:text-2xl p-2.5 flex align-middle justify-center"
                        style={{ backgroundColor: error }}
                        onClick={() => handelAlertClick()}
                        // style={{ backgroundColor: '#fca5a5' }}
                      >
                        {loadsend && <CgSpinner className="animate-spin" />}
                        <Typography color={'white'}>{loadsend ? ' Alerting...' : 'Alert Store'} </Typography>
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
      <Snackbar
        open={snackbarOpen}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        key={'bottom' + 'right'}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} className="text-white" severity="success" sx={{ width: '100%', bgcolor: 'yellowgreen' }}>
          {/* Alert store message sent successfully ! */}
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Customers;
