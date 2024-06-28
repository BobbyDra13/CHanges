import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import {
  Box,
  Dialog,
  DialogContent,
  Divider,
  // Button,
  IconButton,
  Paper,
  TextField,
  Tooltip,
  Typography,
  Avatar,
  AvatarGroup,
  useTheme,
  useMediaQuery
  // Modal
} from '@mui/material';
import { FaCamera } from 'react-icons/fa';
// import src1 from '../../../assets/images/heatmap.jpg';
// import src2 from '../../../assets/images/heatmap2.jpg';
//eslint-disable-next-line
import { GetShelfData, GetShelvesData, GetZonedetails, GetAllBrands, getZonedetails } from 'api';
import { bouncy } from 'ldrs';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import { IoIosClose } from 'react-icons/io';
import '../../Customers/zoom-card-item.css';
import { RiErrorWarningLine } from 'react-icons/ri';
import noData from '../../../assets/images/No_data-amico.svg';
import { FaAngleDoubleRight } from 'react-icons/fa';
import { FaAngleDoubleLeft } from 'react-icons/fa';
import { BsSearch } from 'react-icons/bs';
import { useSelector } from 'react-redux';
bouncy.register();

// const imgURLs = {
//   camera1: src1,
//   camera2: src2,

// };

export default function ShelfView({ date, groups }) {
  console.log('hello i am her');
  const { store } = useParams();
  const zoneIds = useSelector((state) => state.zone);

  const [data, setData] = useState(null);
  const [shelves, setShelves] = useState(false);
  //eslint-disable-next-line
  const [loading, setloading] = useState(true);
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  const [loadDialog, setLoadDialog] = useState(true);
  const [cData, setCdata] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [nextClickLoad, setNextClickLoad] = useState(false);
  const [nextBtn, setNextbtn] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  //eslint-disable-next-line
  const [anomalyType, setAnomalyType] = useState('');
  const [isBrandData, setIsBrandData] = useState([]);
  const [isBrandName, setIsBrandName] = useState([]);
  //eslint-disable-next-line
  const [isBrandId, setIsBrandId] = useState(null);
  const [active, setActive] = useState((isBrandData && isBrandData.length > 0) ? isBrandData[0].brand_id : null);
  const theme = useTheme();
  const success = theme.palette.success.main;
  const error = theme.palette.error.main;
  const isSmallScreen = !useMediaQuery(theme.breakpoints.up('sm'));
  //eslint-disable-next-line
  const [isGroup, setIsGroup] = useState(null);
  const paperRefs = useRef([]);
  //eslint-disable-next-line
  const [open, setOpen] = useState(false);
  //eslint-disable-next-line
  const handleClose = () => setOpen(false);
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
  // const [selectedZoneId, setSelectedZoneId] = useState('');

  //   useEffect(() => {
  //     const storedZoneId = localStorage.getItem('selectedZoneId');
  //     setSelectedZoneId(storedZoneId || '');
  // }, []); // Run once on component mount

  // useEffect(() => {
  //     console.log('Selected Zone ID:', selectedZoneId);
  // }, [selectedZoneId]); // Log whenever selectedZoneId changes
  // useEffect(() => {
  //   // Trigger click on Paper component when zoneId changes
  //   if (zoneid) {
  //     paperRef.current.click();
  //   }
  // }, [zoneid]);

  console.log('ansh', zoneIds);
  //eslint-disable-next-line
  async function zoneDetails(id) {
    setloading(true);
    const body = {
      zone_id: id,
      date: date.toString(),
      store_id: store
    };
    const shelvesData = await GetShelvesData(body);
    console.log('qqaa', shelvesData.data);
    setShelves(shelvesData.data[0]);
    setloading(false);
  }

  function handleImageClick(anomaly) {
    if (antn) {
      setPos({ lft: false, tp: false, wdth: false, ht: false });
      setAntn(!antn);
    }
    setPosArr([]);
    if (!isImageDialogOpen) {
      setCdata(anomaly);
      // setSelectedImage(url);
      // setCdata(anomaly);
      // getAnomalyDetails(id);
      // setAnomalyType(type);
      // setTimestamps({ date: formattedDate, time: formattedTime });
    }
    setIsImageDialogOpen(!isImageDialogOpen);
    setImageLoading(false);
    // setLoadDialog(!loadDialog)
    setLoadDialog(!loadDialog);
    setloading(false);
    console.log('current Data :', cData);
  }
  //eslint-disable-next-line
  async function GetShelfWiseDetails(id) {
    console.log('shelf id is ', id);
    setloading(true);
    const body = {
      date: date.toString(),
      store_id: store,
      shelf_id: id
    };
    const data = await GetShelfData(body);
    console.log('This is the data', data.data);

    handleImageClick(data.data[0]);
  }

  async function GetShelf(id) {
    console.log('shelf id is ', id);
    setloading(true);
    const body = {
      date: date.toString(),
      store_id: store,
      shelf_id: id
    };
    const data = await GetShelfData(body);
    console.log(data.data);

    return data.data[0];
  }

  const latestZoneId = zoneIds.length > 0 ? zoneIds[zoneIds.length - 1] : '';

  const GetZoneDetailees = async (brand_id) => {
    try {
      const body = {
        date: date.toString(),
        // brand_id: '6664320b8b4922abc9b0951c' // hard coded
        brand_id: brand_id
      };
      console.log('tyh', body);
      const Zonedata = store && date && (await getZonedetails(body));
      console.log(Zonedata);
      const shelvesData = Zonedata.data;
      console.log('Zonedata:', shelvesData);
      setData(shelvesData);
      console.log(data);
      setloading(false);
    } catch (e) {
      console.log('error in GetZoneDetails', e);
      setloading(false);
    }
    // setActive(Zonedata[0].name);
    // zoneDetails(Zonedata[0].id);
  };
  const handleOpen = (brand_id) => {
    console.log('heelo from onclick', brand_id);
    setloading(true);
    GetZoneDetailees(brand_id);
  };

  useEffect(()=>{
    handleOpen(active);
  },[active])

  useEffect(() => {
    console.log('latestZoneId fetched from store in shelfView:', latestZoneId);
    setSearchQuery(latestZoneId.toString());

    //  GetZone();
    //  setIsGroup(groups);
    // console.log('hatt', isGroup, date);

    async function getallbrandsname() {
      const body = {
        store_id: [store], // hard coded
        //  store_id: ["6623a893c40c738627f3373f"], // hard coded
        date: '2024-06-19'
        //  date: date.toString()
      };
      console.log('y12', body);
      const brandres = date && store && (await GetAllBrands(body));
      const branddata = brandres.data;
      console.log('te1', branddata[0].brand_name);
      setIsBrandData(branddata);
      console.log('here is branddata', isBrandData);
      setIsBrandName(branddata[0].brand_name);
      console.log('hello frin herere', isBrandName);
    }
    getallbrandsname();
    // eslint-disable-next-line
  }, [date, groups, store, zoneIds]);

  useEffect(() => {}, []);
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
    // console.log('oll',pos);
    console.log('oll', xmin, ymin, xmax, ymax);
  };

  const calculate2 = (xmin, ymin, xmax, ymax, type, naturalWidth, naturalHeight) => {
    console.log('natural width is', naturalWidth, naturalHeight);
    const lft = (xmin / naturalWidth) * 100;
    const top = (ymin / naturalHeight) * 100;
    const width = ((xmax - xmin) / naturalWidth) * 100;
    const height = ((ymax - ymin) / naturalHeight) * 100;
    return { lft: lft, tp: top, wdth: width, hght: height, typ: type };
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
  const [posArr, setPosArr] = useState(false);

  //////////////////////////////////////////////////////////////////////////////////////////////////////
  const imageRefs = useRef([]);
  const [imageDimensions, setImageDimensions] = useState({}); // Object to store dimensions for all images
  const [posarr, setposarr] = useState([]);
  const handleImageLoad = (index) => {
    return () => {
      if (imageRefs.current[index]) {
        const { naturalWidth, naturalHeight } = imageRefs.current[index];
        setImageDimensions((prevDimensions) => ({
          ...prevDimensions,
          [index]: { width: naturalWidth, height: naturalHeight }
        }));
        console.log('hello from 292', imageDimensions);
      }
    };
  };
  const calculate3 = (index, xmin, ymin, xmax, ymax) => {
    const curr = imageDimensions[index];
    console.log(curr);
    const lft = (xmin / curr.width) * 100;
    const top = (ymin / curr.height) * 100;
    const width = ((xmax - xmin) / curr.width) * 100;
    const height = ((ymax - ymin) / curr.height) * 100;
    setPos({ lft: lft, tp: top, wdth: width, hght: height });
    const arr = [];
    arr[index] = { lft: lft, tp: top, wdth: width, hght: height };
    setposarr(arr);
    setAntn(true);
    // console.log('oll',pos);
    console.log('oll', xmin, ymin, xmax, ymax);
  };

  //////////////////////////////////////////////////////////////////////////////////////////////////////
  //eslint-disable-next-line
  const findDimensionss = (event) => {
    setImageLoading(false);
    const { naturalWidth, naturalHeight } = event.target;
    setNaturel({ wdth: naturalWidth, hght: naturalHeight });
  };
  //eslint-disable-next-line
  const findDimensions = (event) => {
    setImageLoading(false);
    const { naturalWidth, naturalHeight } = event.target;
    // const imgDiv = imageRef.current;
    // const { width, height } = imgDiv.getBoundingClientRect();

    setNaturel({ wdth: naturalWidth, hght: naturalHeight });
    const parr = cData.anomalies.map((item) =>
      calculate2(item.xmin, item.ymin, item.xmax, item.ymax, item.anomaly_type, naturalWidth, naturalHeight)
    );
    const parr2 = cData.details_bboxes.map((item) =>
      calculate2(item.xmin, item.ymin, item.xmax, item.ymax, 'green', naturalWidth, naturalHeight)
    );
    const res = parr.concat(parr2);

    setPosArr(res);
    setNextClickLoad(false);
    // setScaleFactor(width / naturalWidth);
  };

  const handleNextClick = async () => {
    setNextbtn(false);
    setNextClickLoad(true);
    setPosArr([]);
    const series = shelves.map((itm) => itm.shelf_id);
    const currentShelf = cData.shelf_id;
    const index = series.indexOf(currentShelf);
    const len = series.length;
    const nextInd = (index + 1) % len;

    const current = await GetShelf(series[nextInd]);
    console.log(current);
    setCdata(current);
    setNextClickLoad(false);
  };

  const handlePrevClick = async () => {
    setNextbtn(false);
    setNextClickLoad(true);
    const series = shelves.map((itm) => itm.shelf_id);

    const currentShelf = cData.shelf_id;

    const index = series.indexOf(currentShelf);

    const len = series.length;

    const nextInd = (index - 1 + len) % len;

    const current = await GetShelf(series[nextInd]);
    setCdata(current);
    setNextClickLoad(false);
  };

  // const brandName = data.map((d) => )
  console.log('uuu', data);
  console.log('y76', isBrandName);

  const brandNames = Array.isArray(isBrandData) && isBrandData.length > 0 ? isBrandData.map((d) => d?.brand_name || '') : [];
  //   if (Array.isArray(data) && data.length > 0) {
  //     data.forEach((d, index) => {
  //         // Update brand_id dynamically
  //         if (d) {
  //             d.brand_id = `B150${index}`; // Example of updating the brand_id dynamically
  //         }

  //         // Extract brand_name and push to the brandNames array
  //         if (d && d.brand_name) {
  //             brandNames.push(d.brand_name);
  //         }
  //     });
  // }
  useEffect(()=>{
      (isBrandData && isBrandData.length  >  0) && setActive(isBrandData[0].brand_id)
  },[isBrandData])
  console.log('yut', brandNames);
  isBrandData.map((name) => {
    console.log(name.brand_name);
  });

  // const brandNames = data.filter((d) => d?.name).map((d) => d.name);
  // const brandNames = data.length > 0 ? data.map((d) => d.name) : [];
  // const brandNames = data.map((d) => d.name);
  // const filteredData = useMemo(() => {
  //   return Array.isArray(data) ? data.filter((d) => d.name.toLowerCase().includes(searchQuery.toLowerCase())) : [];
  // }, [data, searchQuery]);
  // console.log('vb', filteredData);

  return (
    <>
      {isBrandData && isBrandData.length > 0 ? (
        <div style={{ margin: '20px', overflowY: 'scroll' }} className="scrollbar">
          <Grid container spacing={4}>
            <Grid item md={3.5} sm={3.4} style={{ height: '500px', marginBottom: '50px', overflowY: 'scroll' }} className="scrollbar">
              <Grid item xs={9}>
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
              {isBrandData &&
                isBrandData.length > 0 &&
                isBrandData
                  .sort((a, b) => {
                    // Custom sorting function for alphanumeric sorting
                    const nameA = a.brand_name.toLowerCase();
                    const nameB = b.brand_name.toLowerCase();

                    if (nameA < nameB) return -1;
                    if (nameA > nameB) return 1;
                    return 0;
                  })
                  .filter((name) => name.brand_name.trim() !== '')
                  // .map((name) => (name.brand_name).trim())
                  .filter((name, index, self) => self.indexOf(name) === index)
                  .map((d, ind) => {
                    // Check if there is a matching zone_id in the groups data
                    // const match = isGroup ? isGroup.find((group) => group.zone_id === d.name) : [];
                    // console.log('thu', match);
                    // const style = {
                    //   backgroundColor: match && active === d.name ? 'black' : match ? 'white' : 'gray',
                    //   color: active === d.name ? 'white' : 'black',
                    //   fontWeight: 'bolder',
                    //   opacity: match ? 1 : 0.5, // Reduce opacity if no match
                    //   cursor: match ? 'pointer' : 'not-allowed' // Change cursor if no match
                    // };
                    //eslint-disable-next-line
                    const style = {
                      backgroundColor: active === d ? 'black' : active ? 'white' : 'gray',
                      // backgroundColor: active === d.brand_id ? 'black' : 'gray',
                      // background: "black",
                      color: active === d ? 'white' : 'black',
                      fontWeight: 'bolder',
                      opacity: active ? 1 : 0.5, // Reduce opacity if no match
                      cursor: active ? 'pointer' : 'not-allowed' // Change cursor if no match
                    };
                    // Determine the style based on the match
                    // const style = {
                    //   backgroundColor: match ? 'black' : 'gray', // Change background color based on match
                    //   color: match ? 'white' : 'gray', // Change text color based on match
                    //   fontWeight: 'bolder'
                    // };
                    // console.log('whyme', d.brand_id);
                    return (
                      <Paper
                        ref={(ref) => {
                          paperRefs.current[ind] = ref;
                          //   console.log(`Ref assigned for index ${ind}:`, ref);
                        }}
                        key={ind}
                        elevation={4}
                        className="flex items-center mb-4 cursor-pointer p-5  "
                        // onClick={() => {
                        //   // setUrl(imgURLs.camera1);
                        //   setActive(d.name);
                        //   zoneDetails(d.id);
                        // }}
                        onClick={
                          // active
                          // ?
                          () => {
                            // setActive(d.name);
                            // zoneDetails(d.id);
                            setActive(d.brand_id);
                            handleOpen(d.brand_id);
                          }
                          // : undefined
                        }
                        style={{
                          backgroundColor: active === d.brand_id ? 'black' : 'white',
                          color: active === d.brand_id ? 'white' : 'black',
                          fontWeight: 'bolder'
                        }}
                        // style={style}
                      >
                        {/* <div  className='bg-gray-200 m-2  rounded' style={{height:"100px", width:"100px"}}></div> */}
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
                          {' '}
                          <FaCamera />{' '}
                        </div>
                        <h6>{d.brand_name}</h6>
                      </Paper>
                    );
                  })}
            </Grid>
            <Grid
              item
              md={8}
              sm={8.6}
              style={{ height: '460px', marginBottom: '50px', overflowY: 'scroll', marginTop: '35px' }}
              className="scrollbar inline-block "
            >
              {/* <Grid item md={12} sm={12} key={index}> */}
              {data ? (
                data.map((item, index) => {
                  const highlightStyle3 = {
                    position: 'absolute',
                    left: `${posarr[index] ? posarr[index].lft : '0'}%`,
                    top: `${posarr[index] ? posarr[index].tp : '0'}%`,
                    width: `${posarr[index] ? posarr[index].wdth : '0'}%`,
                    height: `${posarr[index] ? posarr[index].hght : '0'}%`,
                    border: '1px solid red', // Change border color as desired
                    boxSizing: 'border-box',
                    pointerEvents: 'none', // So clicks can still interact with the image
                    backgroundColor: 'rgba(255, 0, 0, 0.6)',
                    borderRadius: '5px'
                  };
                  return (
                    <>
                      <Grid item md={12} sm={12} key={index} style={{ marginBottom: '10px' }}>
                        {item.img_url ? (
                          <div className="flex w-full h-full justify-around">
                            <div className=" h-full relative">
                              <img
                                key={index}
                                // style={{ width: '100%', height:objectFit: 'cover' }}
                                src={item.img_url}
                                ref={(el) => (imageRefs.current[index] = el)}
                                alt="img"
                                className="image rounded-md shadow-md  hover:cursor-pointer h-96"
                                // onLoad={findDimensionss}
                                onLoad={handleImageLoad(index)}
                                // style={{ height: '80%', width: '100%', borderRadius: '7px', cursor: 'pointer' }}
                                // onClick={() => GetShelfWiseDetails(item.shelf_id)}
                              />
                              {antn && <div style={highlightStyle3}></div>}
                            </div>
                            <div style={{ width: '85%', padding: '7px' }}>
                              <Typography variant="h3" className="">
                                {/* {details.store_id} - {details.store_name} */}
                                {item.brand_name}
                              </Typography>
                              {/* <Divider /> */}
                              <Typography paddingBottom={1.5} width={'100%'} variant="h5">
                                {/* / {details.bay_id} / {details.shelf_id} */} Bay ID : {item.bay_id}
                              </Typography>
                              <Typography width={'100%'} variant="h3">
                                Date & Time of Capture
                              </Typography>
                              {/* <Divider /> */}
                              <Typography paddingBottom={1.5} width={'100%'} variant="h5">
                                {formatDate(item.timestamps)}
                              </Typography>
                              <Typography width={'100%'} variant="h3">
                                Anomalies
                              </Typography>
                              {/* <Divider /> */}
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

                                  item.shelves.map(
                                    (itm, ind) =>
                                      // itm.shelves.coords && (
                                      itm.anomaly_found > 0 && (
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
                                              itm.anomaly_found > 0 &&
                                                // calculate(itm.coords[0], itm.coords[1], itm.coords[2], itm.coords[3]);
                                                calculate3(index, itm.coords[0], itm.coords[1], itm.coords[2], itm.coords[3]);
                                              //  calculate(itm.xmin, itm.ymin, itm.xmax, itm.ymax);
                                              console.log('here', itm.coords);
                                              setAntn(true);
                                            }}
                                            onMouseOut={() => {
                                              if (antn) {
                                                const arr = [...posarr];
                                                arr[index] = { lft: 0, tp: 0, wdth: 0, ht: 0 };
                                                setposarr(arr);
                                                setPos({ lft: false, tp: false, wdth: false, ht: false });
                                                setAntn(false);
                                              }
                                            }}
                                          >
                                            {console.log('poppp', itm.coords)}
                                            <RiErrorWarningLine className="text-4xl mr-0.5" style={{ color: error }} />
                                            <Typography paddingRight={2} variant="h6">
                                              {removeAfterLastUnderscore(String(itm.type))} - {itm.shelf_index}
                                              {/* {itm.type.map((anomaly) => removeAfterLastUnderscore(anomaly))} */}
                                            </Typography>
                                          </Box>
                                        </Tooltip>
                                      )
                                    // )
                                  )
                                  // )
                                )}
                              </div>
                              {/* <Divider /> */}
                              <Typography width={'100%'} variant="h3">
                                Team
                              </Typography>
                              {/* <Divider /> */}
                              {/* here the anomaly goes */}

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
                              {/* </div>
                      </div>
                      </div> */}
                            </div>
                          </div>
                        ) : (
                          <div className="flex w-full h-full">
                            <img
                              src={noData}
                              alt="img"
                              style={{ height: '50%', width: '100%', borderRadius: '7px', cursor: 'pointer' }}
                              // onClick={() => GetShelfWiseDetails(item.shelf_id)}
                            />
                          </div>
                        )}
                      </Grid>
                    </>
                  );
                })
              ) : (
                <h1 className="text-center text-4xl">Please Choose A Brand</h1>
              )}

              {/* </Grid> */}
            </Grid>
          </Grid>
        </div>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '500px' }}>
          <l-bouncy size="45" speed="1" color="black"></l-bouncy>
          {/* <h1>No data</h1> */}
        </div>
      )}

      {loadDialog ? (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minheight: '500px' }}>
          <l-bouncy size="45" speed="1" color="black"></l-bouncy>
        </div>
      ) : (
        <Dialog maxWidth={600} fullScreen={isSmallScreen ? true : false} open={isImageDialogOpen} onClose={handleImageClick}>
          {nextClickLoad ? (
            <DialogContent
              style={{
                minHeight: '500px',
                width: 'full',
                height: 'full'
              }}
            >
              <div
                style={{
                  width: '90vw',
                  height: '80vh',
                  // backgroundColor: 'red',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center'
                }}
              >
                <l-bouncy size="45" speed="1" color="black"></l-bouncy>
              </div>
            </DialogContent>
          ) : (
            <DialogContent>
              {
                isImageDialogOpen && (
                  // updatedData[0].allAnomalies.map((details, index) => (
                  <div className="zoom-container">
                    <div className="image-container flex justify-center items-center lg:mb-0 mb-10 relative">
                      <TransformWrapper>
                        <div className="image-wrapper rounded-md md:w-full w-full" style={{ marginTop: isSmallScreen ? '200px' : '0' }}>
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
                                src={cData.img_url}
                                alt="No img found"
                                //onLoad={findDimensionss}
                                //   () => {
                                //   setImageLoading(false);
                                // }}
                              />

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
                                    onClick={handleNextClick}
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
                                    onClick={handlePrevClick}
                                  >
                                    <FaAngleDoubleLeft />
                                  </IconButton>
                                </>
                              )}
                              {posArr &&
                                posArr.map((item, index) => (
                                  <div
                                    key={index}
                                    style={{
                                      position: 'absolute',
                                      left: `${item.lft}%`,
                                      top: `${item.tp}%`,
                                      width: `${item.wdth}%`,
                                      height: `${item.hght}%`,
                                      border:
                                        item.typ === 'incorrect_pop'
                                          ? '3px solid red'
                                          : item.typ === 'alien_pop'
                                          ? '3px solid #ffbf00'
                                          : '3px solid green', // Change border color as desired
                                      boxSizing: 'border-box',
                                      pointerEvents: 'none', // So clicks can still interact with the image
                                      // backgroundColor: 'rgba(255, 0, 0, 0.6)',
                                      borderRadius: '5px'
                                    }}
                                  ></div>
                                ))}

                              {antn && <div style={highlightStyle}></div>}
                            </div>

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
                            {cData.store_id} - {cData.store_name}
                          </Typography>
                          <button onClick={handleImageClick} className="md:static absolute top-5 right-5 ">
                            <IoIosClose className="md:text-4xl text-2xl" />
                          </button>
                        </div>
                        <Divider />
                        <Typography paddingBottom={1.5} width={'100%'} variant="h5">
                          {cData.zone_id} / {cData.shelf_name}
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
                          {cData.anomalies.length === 0 && (
                            <Typography width={'100%'} variant="body1">
                              No Anomaly
                            </Typography>
                          )}

                          {cData.anomalies.length > 0 &&
                            cData.anomalies.map(
                              (itm, index) =>
                                itm.anomaly_type != 'no_read_pop' && (
                                  <Tooltip
                                    key={index}
                                    title={
                                      <div>
                                        <Typography variant="body1">
                                          Article Code: {itm.article_code ? itm.article_code : 'No Data Found'}
                                        </Typography>
                                        <Typography variant="body1">
                                          <span>Description :</span>
                                          {itm.anomaly_type === 'alien_pop'
                                            ? itm.print_tag
                                              ? itm.print_tag
                                              : 'No Data Found'
                                            : itm.article_description
                                            ? itm.article_description
                                            : 'No Data Found'}
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
                                      <RiErrorWarningLine className="text-4xl mr-0.5" style={{ color: 'red' }} />
                                      <Typography paddingRight={2} variant="h6">
                                        {itm.anomaly_type}
                                      </Typography>
                                    </Box>
                                  </Tooltip>
                                )
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
                                  <Typography variant="subtitle2">Name: {cData.user_name}</Typography>
                                  <Typography variant="subtitle2">Number: {cData.user_number}</Typography>
                                </div>
                              }
                              enterTouchDelay={1}
                              leaveTouchDelay={100000}
                            >
                              <Avatar className="hover:cursor-pointer" sx={{ bgcolor: success }} alt={cData.user_name} src="/example.jpg" />
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
          )}
        </Dialog>
      )}
    </>
  );
}
