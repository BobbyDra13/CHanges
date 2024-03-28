import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { Box, Dialog, DialogContent, Divider, Paper, TextField, Tooltip, Typography } from '@mui/material';
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
bouncy.register();

// const imgURLs = {
//   camera1: src1,
//   camera2: src2,

// };

export default function ShelfView({ date }) {
  const [active, setActive] = useState(false);
  const [data, setData] = useState(false);
  const [shelves, setShelves] = useState(false);
  const [loading, setloading] = useState(true);
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  const [loadDialog, setLoadDialog] = useState(true);
  const [cData, setCdata] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);

  async function zoneDetails(id) {
    setloading(true);
    const body = {
      zone_id: id,
      date: date.toString(),
      store_id: '65c74d4112465588b7a4984c'
    };
    const shelvesData = await GetShelvesData(body);
    console.log(shelvesData.data);
    setShelves(shelvesData.data[0]);
    setloading(false);
  }

  function handleImageClick(anomaly) {
    if (antn) {
      setPos({ lft: false, tp: false, wdth: false, ht: false });
      setAntn(!antn);
    }

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
      store_id: '65c74d4112465588b7a4984c',
      shelf_id: id
    };
    const data = await GetShelfData(body);
    console.log(data.data);

    handleImageClick(data.data[0]);
  }

  useEffect(() => {
    async function GetZone() {
      const body = {
        store_id: '65c74d4112465588b7a4984c'
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

  return (
    <>
      {data ? (
        <div style={{ margin: '20px', overflowY: 'scroll' }} className="scrollbar">
          <Grid container spacing={4}>
            <Grid item md={2.5} sm={2} style={{ height: '500px', marginBottom: '50px', overflowY: 'scroll' }} className="scrollbar">
              {data &&
                data.map((d, ind) => (
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
              style={{ height: '460px', marginBottom: '50px', overflowY: 'scroll', marginTop:'35px' }}
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
                              <span className="text-black text-sm font-bold">POP Score : {item.fullnessPopPercent} </span>
                              {/* <span className='text-black text-lg font-bold'>60% </span>  */}
                            </div>
                            <div>
                              <span className="text-black text-sm font-bold">Anomaly : {item.total_anomalies_detected} </span>
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
                          <div style={{ position: 'relative' }}>
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
                        {cData.anomalies.length == 0 && (
                          <Typography width={'100%'} variant="body1">
                            No Anomaly
                          </Typography>
                        )}

                        {cData.anomalies.length > 0 &&
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
                                <RiErrorWarningLine className="text-4xl mr-0.5" style={{ color: 'red' }} />
                                <Typography paddingRight={2} variant="h6">
                                  {itm.anomaly_type}
                                </Typography>
                              </Box>
                            </Tooltip>
                          ))}
                      </div>
                      {/* <Typography width={'100%'} variant="h3">
                        Team
                      </Typography>
                      <Divider /> */}

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
                      <button className="lg:rounded-full rounded-xl md:w-[125px]  text-lg lg:text-2xl p-2.5 hover:cursor-not-allowed border-2 border-gray-400">
                        <Typography>Ignore</Typography>
                      </button>
                      <button
                        className="lg:rounded-full rounded-xl md:w-[125px]  hover:cursor-not-allowed text-lg lg:text-2xl p-2.5"
                        style={{ backgroundColor: 'green' }}
                      >
                        <Typography color={'white'}>Solved</Typography>
                      </button>
                      <button
                        className="lg:rounded-full rounded-xl md:w-[125px] hover:cursor-not-allowed text-lg lg:text-2xl p-2.5"
                        style={{ backgroundColor: 'red' }}
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
}
