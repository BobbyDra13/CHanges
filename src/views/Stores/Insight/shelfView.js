import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import {
  Box,
  Dialog,
  DialogContent,
  Divider,
  IconButton,
  Paper,
  TextField,
  Tooltip,
  Typography,
  Avatar,
  AvatarGroup,
  useTheme
} from '@mui/material';
import { FaCamera } from 'react-icons/fa';
// import src1 from '../../../assets/images/heatmap.jpg';
// import src2 from '../../../assets/images/heatmap2.jpg';
import { GetShelfData, GetShelvesData, GetZonedetails } from 'api';
import { bouncy } from 'ldrs';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import { IoIosClose } from 'react-icons/io';
import '../../Customers/zoom-card-item.css';
import { RiErrorWarningLine } from 'react-icons/ri';
import noData from '../../../assets/images/No_data-amico.svg';
import { FaAngleDoubleRight } from 'react-icons/fa';
import { FaAngleDoubleLeft } from 'react-icons/fa';
import { BsSearch } from 'react-icons/bs';
bouncy.register();

// const imgURLs = {
//   camera1: src1,
//   camera2: src2,

// };

export default function ShelfView({ date }) {
  const { store } = useParams();
  const [active, setActive] = useState(false);
  const [data, setData] = useState(false);
  const [shelves, setShelves] = useState(false);
  const [loading, setloading] = useState(true);
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  const [loadDialog, setLoadDialog] = useState(true);
  const [cData, setCdata] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [nextClickLoad, setNextClickLoad] = useState(false);
  const [nextBtn, setNextbtn] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const theme = useTheme();
  const success = theme.palette.success.main;

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

  useEffect(() => {
    async function GetZone() {
      const body = {
        store_id: store
      };
      const Zonedata = await GetZonedetails(body);
      setData(Zonedata);
      console.log('Zonedata:', Zonedata);
      setActive(Zonedata[0].name);
      zoneDetails(Zonedata[0].id);
    }
    GetZone();
    // eslint-disable-next-line
  }, [date]);

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

  const calculate2 = (xmin, ymin, xmax, ymax, type) => {
    const lft = (xmin / natural.wdth) * 100;
    const top = (ymin / natural.hght) * 100;
    const width = ((xmax - xmin) / natural.wdth) * 100;
    const height = ((ymax - ymin) / natural.hght) * 100;
   return({ lft: lft, tp: top, wdth: width, hght: height, typ:type })
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
  const [posArr, setPosArr]= useState([]);
  console.log('position= ', pos);
  const findDimensions = (event) => {
    const parr= cData.anomalies.map(item=>(calculate2(item.xmin ,  item.ymin,  item.xmax,  item.ymax, item.anomaly_type)));
    const parr2= cData.details_bboxes.map(item=>(calculate2(item.xmin ,  item.ymin,  item.xmax,  item.ymax, "green")));
    const res= parr.concat(parr2);

    setPosArr(res);
    setImageLoading(false);
    const { naturalWidth, naturalHeight } = event.target;
    // const imgDiv = imageRef.current;
    // const { width, height } = imgDiv.getBoundingClientRect();

    setNaturel({ wdth: naturalWidth, hght: naturalHeight });
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
    console.log(nextInd);

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

  const filteredData = Array.isArray(data) ? data.filter((d) => d.name.toLowerCase().includes(searchQuery.toLowerCase())) : [];

  return (
    <>
      {data ? (
        <div style={{ margin: '20px', overflowY: 'scroll' }} className="scrollbar">
          <Grid container spacing={4}>
            <Grid item md={2.5} sm={2} style={{ height: '500px', marginBottom: '50px', overflowY: 'scroll' }} className="scrollbar">
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
              {data &&
                filteredData.map((d, ind) => (
                  <Paper
                    key={ind}
                    elevation={4}
                    className="flex items-center mb-4 cursor-pointer p-5  "
                    onClick={() => {
                      // setUrl(imgURLs.camera1);
                      setActive(d.name);
                      zoneDetails(d.id);
                    }}
                    style={{
                      backgroundColor: active === d.name ? 'black' : 'white',
                      color: active === d.name ? 'white' : 'black',
                      fontWeight: 'bolder'
                    }}
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
                    <h6>{d.name}</h6>
                  </Paper>
                ))}
            </Grid>

            <Grid
              item
              md={9.5}
              sm={10}
              style={{ height: '460px', marginBottom: '50px', overflowY: 'scroll', marginTop: '35px' }}
              className="scrollbar inline-block "
            >
              {/* {!url ? <div>please select one camera</div> : <img src={url} alt="img" style={{ height: '400px', width: '100%' }} />} */}
              <Grid container>
                {loading ? (
                  <Grid item md={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '500px' }}>
                    <l-bouncy size="45" speed="1" color="black"></l-bouncy>
                  </Grid>
                ) : (
                  shelves &&
                  shelves.map((item, index) => (
                    <Grid item md={12} sm={12} key={index}>
                      {item.img_url ? (
                        <div className="flex w-full h-full justify-around">
                          <div style={{ width: '70%', height: '100%' }}>
                            <img
                              src={item.img_url}
                              alt="img"
                              style={{ height: '80%', width: '100%', borderRadius: '7px', cursor: 'pointer' }}
                              onClick={() => GetShelfWiseDetails(item.shelf_id)}
                            />
                          </div>
                          <div style={{ width: '25%', padding: '7px' }}>
                            {/* <div className='text-black text-sm font-bold'>Name : {item.shelf_name}</div> */}

                            <div>
                              <span className="text-black text-sm font-bold">Shelf Id: {item.id} </span>
                              {/* <span className='text-black text-lg font-bold'>55 </span>  */}
                            </div>
                            <div>
                              <span className="text-black text-sm font-bold">PoP Score : {item.fullnessPopPercent}% </span>
                              {/* <span className='text-black text-lg font-bold'>60% </span>  */}
                            </div>
                            <div>
                              {/* <span className="text-black text-sm font-bold">Anomaly : {item.total_anomalies_detected} </span> */}
                              {/* <span className='text-black text-lg font-bold'>60% </span>  */}
                            </div>
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
                  ))
                )}
              </Grid>
            </Grid>
          </Grid>
        </div>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '500px' }}>
          <l-bouncy size="45" speed="1" color="black"></l-bouncy>
        </div>
      )}

      {loadDialog ? (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minheight: '500px' }}>
          <l-bouncy size="45" speed="1" color="black"></l-bouncy>
        </div>
      ) : (
        <Dialog maxWidth={600} open={isImageDialogOpen} onClose={handleImageClick}>
          {nextClickLoad ? (
            <DialogContent style={{ minheight: '500px' }}>
              <div
                style={{
                  width: '90vw',
                  height: '80vh',
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
              {/* {anomalyDetails.length > 0 && */}
              {
                isImageDialogOpen && (
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
                                className="image rounded-md "
                                // src={liveAnomalyImg ? selectedImage : anomalyDetails[0]?.reference_img}
                                src={cData.img_url}
                                alt="No img found"
                                onLoad={findDimensions}

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
                    {posArr && posArr.map((item, index)=>
                              <div key={index} style={
                                {
                                  position: 'absolute',
                                  left: `${item.lft}%`,
                                  top: `${item.tp}%`,
                                  width: `${item.wdth}%`,
                                  height: `${item.hght}%`,
                                  border: item.typ=== 'incorrect_pop'? '3px solid red':item.typ=== 'alien_pop'?'3px solid #ffbf00':'3px solid green', // Change border color as desired
                                  boxSizing: 'border-box',
                                  pointerEvents: 'none', // So clicks can still interact with the image
                                  // backgroundColor: 'rgba(255, 0, 0, 0.6)',
                                  borderRadius: '5px'
                                }
                              }></div>)}
                              

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
                            cData.anomalies.map((itm, index) => itm.anomaly_type!= 'no_read_pop' && (
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
                            ))}
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
