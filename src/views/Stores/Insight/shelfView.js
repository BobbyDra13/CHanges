import React, { useEffect, useState, useRef, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ChevronLeftRounded, ChevronRightRounded } from '@mui/icons-material';
import { ImCross } from 'react-icons/im';
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
import { GetShelfData, GetShelvesData, GetZonedetails, GetAllBrands, getZonedetails, GetSingleBrandDetails } from 'api';
import { bouncy } from 'ldrs';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import { IoIosClose } from 'react-icons/io';
import '../../Customers/zoom-card-item.css';
import { RiErrorWarningLine, RiCheckboxCircleLine } from 'react-icons/ri';
import noData from '../../../assets/images/No_data-amico.svg';
import { FaAngleDoubleRight } from 'react-icons/fa';
import { FaAngleDoubleLeft } from 'react-icons/fa';
import { BsSearch } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import NoDataImg from '../../../assets/images/No_data-amico.svg';
bouncy.register();

// const imgURLs = {
//   camera1: src1,
//   camera2: src2,

// };

export default function ShelfView({ date, groups }) {
  console.log('hello i am her');
  const { store } = useParams();
  const zoneIds = useSelector((state) => state.zone);
  const imageRef = useRef(null);
  const [data, setData] = useState(null);
  const [shelves, setShelves] = useState(false);
  const [brands, setBrands] = useState(false);
  //eslint-disable-next-line
  const [loading, setloading] = useState(true);
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  const [loadDialog, setLoadDialog] = useState(true);
  const [load, setLoad] = useState(true);
  const [brandsLoadData, setBrandsLoadData] = useState(false);
  const [cData, setCdata] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [nextClickLoad, setNextClickLoad] = useState(false);
  const [nextBtn, setNextbtn] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  //eslint-disable-next-line
  const [anomalyType, setAnomalyType] = useState('');
  const [isBrandData, setIsBrandData] = useState([]);
  const [isBrandName, setIsBrandName] = useState([]);
  const [brand, setBrand] = useState(null);
  const [msg, setMsg] = useState('');
  //eslint-disable-next-line
  const [isBrandId, setIsBrandId] = useState(null);
  const [active, setActive] = useState(isBrandData && isBrandData.length > 0 ? isBrandData[0].brand_id : null);
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
    console.log('i am clicked', isImageDialogOpen);
    console.log('anomaly', anomaly);
    if (antn) {
      setPos({ lft: false, tp: false, wdth: false, ht: false });
      setAntn(!antn);
    }
    // setPosArr([]);
    if (!isImageDialogOpen) {
      console.log('i am clicked inside', isImageDialogOpen);
      // setCdata(anomaly);
      setBrandsLoadData(anomaly);
      // setSelectedImage(url);
      // setCdata(anomaly);
      // getAnomalyDetails(id);
      // setAnomalyType(type);
      // setTimestamps({ date: formattedDate, time: formattedTime });
      // setIsImageDialogOpen(true);
    }
    setIsImageDialogOpen(true);

    setImageLoading(false);
    // setLoadDialog(!loadDialog)
    // setLoadDialog(!loadDialog);
    setLoad(!load);
    setloading(false);
    console.log('current Data :', brandsLoadData);
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

    // handleImageClick(data.data[0]);
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
      console.log('brand_id', brand_id);
      const body = {
        date: date.toString(),
        // brand_id: '6664320b8b4922abc9b0951c' // hard coded
        brand_id: brand_id
      };
      console.log('tyh', body);
      const Zonedata = store && date && (await getZonedetails(body));
      console.log('llm', Zonedata);
      const shelvesData = Zonedata.data;
      console.log('Zonedata:', shelvesData);
      setData(shelvesData);
      // handleImageClick(Zonedata.data[0]);
      console.log(data);
      setloading(false);
    } catch (e) {
      console.log('error in GetZoneDetails', e);
      setloading(false);
    }
    // setActive(Zonedata[0].name);
    // zoneDetails(Zonedata[0].id);
  };
  // console.log("i am clicked also");
  const handleCloseImageDialog = () => {
    setPos({ lft: false, tp: false, wdth: false, hght: false });
    setAntn(false);
    // console.log("i am clicked also");
    setIsImageDialogOpen(false);
  };
  const GetBrandWiseDetails = async (brand_id) => {
    try {
      console.log('brand_id', brand_id);
      const body = {
        brand_id: brand_id
      };
      console.log('bodyy', body);
      const brandData = await GetSingleBrandDetails(body);
      console.log('brand', brandData);
      const brandWiseData = brandData.data;
      console.log('brandWiseData:', brandWiseData[0]);
      setBrand(brandWiseData[0]);
      handleImageClick(brandData.data[0]);
      // handleImageClick(brandWiseData);
      setloading(false);
      setBrands(brandData.data);
      return brandData.data[0];
    } catch (e) {
      console.log('error in BrandWiseDetails', e);
      setloading(false);
    }
    // setActive(Zonedata[0].name);
    // zoneDetails(Zonedata[0].id);
  };
  console.log('brandDat', brand);
  const handleOpen = (brand_id) => {
    console.log('heelo from onclick', brand_id);
    setloading(true);
    GetZoneDetailees(brand_id);
    // GetBrandWiseDetails(brand_id);
  };

  useEffect(() => {
    handleOpen(active);
    //eslint-disable-next-line
  }, [active, date]);
  const [brandempty, setbrandempty] = useState(0);
  useEffect(() => {
    console.log('latestZoneId fetched from store in shelfView:', latestZoneId);
    setSearchQuery(latestZoneId.toString());

    //  GetZone();
    //  setIsGroup(groups);
    // console.log('hatt', isGroup, date);

    async function getallbrandsname() {
      try {
        const body = {
          store_id: [store], // hard coded
          //  store_id: ["6623a893c40c738627f3373f"], // hard coded
          date: date
          //  date: date.toString()
        };
        console.log('y12', body);
        const brandres = date && store && (await GetAllBrands(body));
        console.log(brandres);
        const branddata = brandres && brandres.data.data.brands;
        if (branddata && branddata.length > 0) setbrandempty(1);
        else setbrandempty(2);
        console.log('te1', branddata[0].brand_name);
        setIsBrandData(branddata);
        console.log('here is branddata', isBrandData);
        setIsBrandName(branddata[0].brand_name);
        console.log('hello frin herere', isBrandName);
      } catch (e) {
        console.log('error in getall brands', e);
      }
    }
    getallbrandsname();
    // eslint-disable-next-line
  }, [date, groups, store, zoneIds]);

  useEffect(() => {}, []);
  const [antn, setAntn] = useState(false);
  const [pos, setPos] = useState({ lft: false, tp: false, wdth: false, ht: false });

  const [natural, setNaturel] = useState({ wdth: false, hght: false });

  // const calculate = (xmin, ymin, xmax, ymax) => {
  //   const lft = (xmin / natural.wdth) * 100;
  //   const top = (ymin / natural.hght) * 100;
  //   const width = ((xmax - xmin) / natural.wdth) * 100;
  //   const height = ((ymax - ymin) / natural.hght) * 100;
  //   setPos({ lft: lft, tp: top, wdth: width, hght: height });
  //   setAntn(true);
  //   // console.log('oll',pos);
  //   console.log('oll', xmin, ymin, xmax, ymax);
  // };

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

  const calculate = (xmin, ymin, xmax, ymax, code) => {
    const lft = (xmin / natural.wdth) * 100;
    const top = (ymin / natural.hght) * 100;
    const width = ((xmax - xmin) / natural.wdth) * 100;
    const height = ((ymax - ymin) / natural.hght) * 100;
    setPos({ lft: lft, tp: top, wdth: width, hght: height });
    setAntn(code);
    console.log('calcaulte', pos);
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

  // const settings = {
  //   dots: true,
  //   infinite: false,
  //   speed: 500,
  //   slidesToShow: 3,
  //   slidesToScroll: 1,
  //   responsive: [
  //     {
  //       breakpoint: 1024,
  //       settings: {
  //         slidesToShow: 3,
  //         slidesToScroll: 1,
  //         infinite: true,
  //         dots: true
  //       }
  //     },
  //     {
  //       breakpoint: 600,
  //       settings: {
  //         slidesToShow: 2,
  //         slidesToScroll: 1,
  //         initialSlide: 2
  //       }
  //     },
  //     {
  //       breakpoint: 480,
  //       settings: {
  //         slidesToShow: 1,
  //         slidesToScroll: 1
  //       }
  //     }
  //   ]
  // };
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: false,
    fade: true,
    waitForAnimate: false
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
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNextClick = async () => {
    console.log('clicked');
    setNextbtn(false);
    setNextClickLoad(true);
    setPosArr([]);
    const series = brands.map((itm) => itm.brand_id);
    // console.log("series", series);
    const currentShelf = brands[0].brand_id;
    // console.log("series", currentShelf);
    const index = series.indexOf(currentShelf);
    // console.log("series", index);
    const len = series.length;
    // console.log("series", (index + 1));
    // const nextInd = (index + 1) % len;
    const nextInd = index + 1;
    console.log('series', series[nextInd]);

    const current = await GetSingleBrandDetails(series[nextInd]);
    console.log('current', current);
    // setCdata(current);
    // setBrandsLoadData(current);
    setBrands(current);
    setNextClickLoad(false);
  };

  const handlePrevClick = async () => {
    setNextbtn(false);
    setNextClickLoad(true);
    const series = brands.map((itm) => itm.brand_id);

    const currentShelf = brands[0].brand_id;

    const index = series.indexOf(currentShelf);

    const len = series.length;

    const nextInd = (index - 1 + len) % len;

    const current = await GetSingleBrandDetails(series[nextInd]);
    // setCdata(current);
    setBrandsLoadData(current);
    setNextClickLoad(false);
  };

  // const brandName = data.map((d) => )
  console.log('uuu', data);
  console.log('y76', isBrandName);
  console.log('brands loaded', brandsLoadData);

  console.log('brandsss', brands);

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
  useEffect(() => {
    isBrandData && isBrandData.length > 0 && setActive(isBrandData[0].brand_id);
  }, [isBrandData]);
  console.log('yut', brandNames);
  isBrandData.map((name) => {
    console.log(name.brand_name);
  });

  // const brandNames = data.filter((d) => d?.name).map((d) => d.name);
  // const brandNames = data.length > 0 ? data.map((d) => d.name) : [];
  // const brandNames = data.map((d) => d.name);
  console.log('hhhop', data);
  const filteredData = useMemo(() => {
    return Array.isArray(isBrandData) ? isBrandData.filter((d) => d.brand_name.toLowerCase().includes(searchQuery.toLowerCase())) : [];
  }, [isBrandData, searchQuery]);
  console.log('vb', filteredData);

  return (
    <>
      {isBrandData && isBrandData.length > 0 ? (
        <div style={{ margin: '20px', overflowY: 'scroll' }} className="scrollbar">
          <Grid container spacing={4}>
            <Grid item md={3.5} sm={3.4} style={{ height: '500px', marginBottom: '50px', overflowY: 'scroll' }} className="scrollbar">
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
              {isBrandData &&
                isBrandData.length > 0 &&
                filteredData
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
                    // console.log("d", d);
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
                            d.capture_status === 1 && setActive(d.brand_id);
                            d.capture_status === 1 && handleOpen(d.brand_id);
                          }
                          // : undefined
                        }
                        style={{
                          //  backgroundColor: active === d.brand_id ? 'black' : 'white',
                          backgroundColor: d.capture_status === 0 ? '#f5f5f5' : active === d.brand_id ? 'black' : 'white',
                          opacity: d.capture_status === 0 ? '0.4' : '1',
                          color: active === d.brand_id ? 'white' : 'black',
                          //color: active === d.brand_id ? 'white' : 'black',
                          fontWeight: 'bolder',
                          cursor: d.capture_status === 0 ? 'not-allowed' : 'pointer'
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
              className="inline-block w-[550px]"
            >
              {/* <Grid item md={12} sm={12} key={index}> */}
              <Slider {...settings} className="w-[600px] h-[400px]">
                {data && data.length > 0 ? (
                  data.map((item, index) => {
                    // const highlightStyle3 = {
                    //   position: 'absolute',
                    //   left: `${posarr[index] ? posarr[index].lft : '0'}%`,
                    //   top: `${posarr[index] ? posarr[index].tp : '0'}%`,
                    //   // width: `${posarr[index] ? posarr[index].wdth : '0'}%`,
                    //   height: `${posarr[index] ? posarr[index].hght : '0'}%`,
                    //   border: '1px solid red', // Change border color as desired
                    //   boxSizing: 'border-box',
                    //   pointerEvents: 'none', // So clicks can still interact with the image
                    //   backgroundColor: 'rgba(255, 0, 0, 0.6)',
                    //   borderRadius: '5px'
                    // };
                    return (
                      <>
                        <Grid item key={index} style={{ marginBottom: '10px' }} className="w-full flex">
                          {item.img_url ? (
                            <div className="flex w-full h-full">
                              <div className="h-full relative">
                                <img
                                  key={index}
                                  // style={{ width: '100%', height:objectFit: 'cover' }}
                                  src={item.img_url}
                                  // ref={(el) => (imageRefs.current[index] = el)}
                                  ref={imageRef}
                                  alt="img"
                                  className="image rounded-md shadow-md  hover:cursor-pointer h-96"
                                  // onLoad={findDimensionss}
                                  // onLoad={handleImageLoad(index)}
                                  // style={{ height: '80%', width: '100%', borderRadius: '7px', cursor: 'pointer' }}
                                  onClick={() => {
                                    // setIsImageDialogOpen(true);
                                    console.log('i am clicked too');
                                    GetBrandWiseDetails(item.brand_id);
                                  }}
                                />
                                {/* {antn && <div style={highlightStyle3}></div>} */}
                              </div>
                              <div className="ml-3" style={{ padding: '7px' }}>
                                <Typography variant="h3" className="">
                                  {/* {details.store_id} - {details.store_name} */}
                                  {item.brand_name}
                                </Typography>
                                <Divider />
                                <Typography paddingBottom={1.5} width={'100%'} variant="h5">
                                  {/* / {details.bay_id} / {details.shelf_id} */} Bay ID : {item.bay_id}
                                </Typography>
                                <Typography width={'100%'} variant="h5">
                                  Date & Time of Capture
                                </Typography>
                                {/* <Divider /> */}
                                <Typography paddingBottom={1.5} width={'100%'} variant="h5">
                                  {formatDate(item.timestamp)}
                                </Typography>
                                <Typography width={'100%'} variant="h5">
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
                                    // cData.anomaly_details.map((item, index) =>

                                    // brands[0].shelves.map(
                                    //   (itm, ind) =>
                                    // itm.shelves.coords && (
                                    item.shelves &&
                                    item.shelves.length > 0 &&
                                    item.shelves.map(
                                      (itm, ind) =>
                                        itm.anomaly_type !== '' ? (
                                          <Tooltip>
                                            <Box
                                              // key={ind}
                                              paddingX={0.2}
                                              paddingY={0.04}
                                              className="bg-gray-200 rounded-full flex gap-1 justify-center place-items-center cursor-pointer hover:bg-amber-500"
                                              // onMouseOver={() => {
                                              //   // itm.anomaly_found > 0 &&
                                              //   // calculate(itm.coords[0], itm.coords[1], itm.coords[2], itm.coords[3]);
                                              //   calculate(itm.coords.xmin, itm.coords.ymin, itm.coords.xmax, itm.coords.ymax, 1);
                                              //   //  calculate(itm.xmin, itm.ymin, itm.xmax, itm.ymax);
                                              //   // console.log('here', itm.coords);
                                              //   // setAntn(true);
                                              // }}
                                              // onMouseOut={() => {
                                              //   // if (antn) {
                                              //   //   const arr = [...posarr];
                                              //   //   arr[index] = { lft: 0, tp: 0, wdth: 0, ht: 0 };
                                              //   //   setposarr(arr);
                                              //   //   setPos({ lft: false, tp: false, wdth: false, ht: false });
                                              //   //   setAntn(false);
                                              //   // }
                                              //   if (antn) {
                                              //     setPos({ lft: false, tp: false, wdth: false, ht: false });
                                              //     setAntn(0);
                                              //   }
                                              // }}
                                            >
                                              {/* {console.log('poppp', itm.coords)} */}
                                              <RiErrorWarningLine className="text-4xl mr-0.5" style={{ color: error }} />
                                              <Typography paddingRight={2} variant="h6">
                                                {removeAfterLastUnderscore(itm.anomaly_type)}
                                                {/* {itm.type.map((anomaly) => removeAfterLastUnderscore(anomaly))} */}
                                              </Typography>
                                            </Box>
                                          </Tooltip>
                                        ) : (
                                          <Tooltip
                                          // key={0 + ind}
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
                                              // onMouseOver={() => {
                                              //   calculate(itm.coords.xmin, itm.coords.ymin, itm.coords.xmax, itm.coords.ymax, 2);
                                              //   //  calculate(itm.xmin, itm.ymin, itm.xmax, itm.ymax);
                                              //   // setAntn(true);
                                              // }}
                                              // onMouseOut={() => {
                                              //   if (antn) {
                                              //     setPos({ lft: false, tp: false, wdth: false, ht: false });
                                              //     setAntn(0);
                                              //   }
                                              // }}
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
                                <Divider />
                                <Typography width={'100%'} variant="h5">
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
                              {/* <div className="w-fit">
                                <Typography variant="h3">OSA Score: {item.OSA_Score}%</Typography>
                                <Typography variant="h3">Tester Score: {item.testers_score}%</Typography>
                                <Typography variant="h3">Category: {item.category}</Typography>
                              </div> */}
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
                  // <h1 className="text-center text-4xl">Please Choose A Brand</h1>
                  <div className="w-full h-full flex justify-center place-items-center">
                    <img style={{ height: '310px' }} src={NoDataImg} alt="No data" />
                  </div>
                )}
              </Slider>
              {/* </Grid> */}
            </Grid>
          </Grid>
        </div>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '500px' }}>
          {brandempty === 0 && <l-bouncy size="45" speed="1" color="black"></l-bouncy>}
          {brandempty === 2 && <img style={{ height: '310px' }} src={NoDataImg} alt="No data" />}
          {/* <h1>No data</h1> */}
        </div>
      )}

      {load ? (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minheight: '500px' }}>
          <l-bouncy size="45" speed="1" color="black"></l-bouncy>
        </div>
      ) : (
        <Dialog
          fullScreen
          open={isImageDialogOpen}
          PaperProps={{
            sx: {
              width: '100%',
              maxHeight: '1300px',
              background: 'rgba(0, 0, 0, 0.8)',
              boxShadow: 'none'
            }
          }}
        >
          {nextClickLoad ? (
            <DialogContent className="w-full h-full flex justify-center relative overflow-hidden">
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
            <DialogContent className="w-full h-full flex justify-center relative overflow-hidden">
              {/* <ChevronLeftRounded
                    onClick={handlePrevPart}
                    className="text-gray-400 opacity-100 hover:opacity-100 text-7xl absolute z-10 cursor-pointer lg:left-[2%] top-[45%] left-0"
                    onKeyDown={handleKeyDownPart}
                    tabIndex="0"
                  />
                  <ChevronRightRounded
                    onClick={handleNextPart}
                    className="text-gray-400 opacity-100 hover:opacity-100 text-7xl absolute z-10 cursor-pointer lg:right-[2%] top-[45%] right-0"
                    onKeyDown={handleKeyDownPart}
                    tabIndex="0"
                  /> */}
              {/* {anomalyDetails.length > 0 && */}
              <div className="self-center ">
                <ImCross
                  onClick={handleImageClick}
                  className="z-20 text-lg cursor-pointer text-white opacity-60 hover:opacity-100 absolute"
                  style={{
                    right: '4%',
                    top: '4%'
                  }}
                />
                {isImageDialogOpen && (
                  // updatedData[0].allAnomalies.map((details, index) => (
                  <div className="zoom-container ">
                    <div className="image-container flex justify-center items-center lg:mb-0 mb-10 relative">
                      <TransformWrapper>
                        <div className="image-wrapper rounded-md md:w-full w-4/5">
                          <TransformComponent>
                            {imageLoading && (
                              <div className="flex justify-center items-center absolute top-0 left-0 z-10  overflow-x-hidden bg-white w-full h-full">
                                <l-bouncy size="45" speed="1.75" color="black"></l-bouncy>
                              </div>
                            )}
                            <div className="w-full h-full relative">
                              <img
                                className="self-center lg:max-h-[95vh] lg:max-w-[95vw] max-h-[80vh] md:max-h-[85vh] mt-10 md:mt-0 text-white"
                                src={brands[0].img_url}
                                alt="No img found"
                                onLoad={findDimensions}
                                ref={imageRef}
                              />

                              {/* {nextBtn && (
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
                              )} */}

                              {antn !== 0 && <div style={antn === 1 ? highlightStyle : highlightStyle2}></div>}
                            </div>

                            {/* <ImageListItemBar title={`Date: ${timestamps?.date}`} subtitle={`Time: ${timestamps?.time}`} /> */}
                          </TransformComponent>
                        </div>
                      </TransformWrapper>
                    </div>
                    <div
                      className=" text-xl cursor-pointer text-white absolute hidden xl:block"
                      style={{
                        left: '4%',
                        top: '3%'
                      }}
                    >
                      <Typography variant="h3" className="text-white">
                        {brands[0].bay_id} - {brands[0].bay_info.brand_name}
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
                        {formatDate(data.map((itm) => itm.timestamp))}
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
                        OSA Score: {brands[0].OSA_Score}%
                      </Typography>
                      <Typography variant="h3" className="text-white">
                        Tester Score: {brands[0].testers_score}%{' '}
                      </Typography>
                      <Typography variant="h3" className="text-white">
                        Category: {brands[0].category}
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
                        Name: {brands[0].user[0].name}
                      </Typography>
                      <Typography variant="h3" className="text-white">
                        Number: {brands[0].user[0].number}
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
                          brands &&
                          brands.length > 0 &&
                          brands[0].shelves &&
                          brands[0].shelves.map(
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
                                      calculate(itm.coords.xmin, itm.coords.ymin, itm.coords.xmax, itm.coords.ymax, 1);
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
                            // )
                          )
                          // )
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </DialogContent>
          )}
        </Dialog>
      )}
    </>
  );
}
