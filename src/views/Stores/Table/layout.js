import React, { useEffect, useRef, useState } from 'react';
// import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import Breadcrumb from 'component/Breadcrumb';
import { ChevronLeftRounded, ChevronRightRounded, CloseRounded } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import Tooltip from '@mui/material/Tooltip';
import { Dialog, DialogContent, IconButton } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { GetStoreLayout, GetImagesFromSignedUrl } from '../../../api/index';
import NewLoader from '../../../component/Loader/Loader';
import { Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';
// import { GetAllStores } from 'api';

const theme = createTheme({
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: '#101010bf'
        }
      }
    }
  }
});
const StoreLayout = () => {
  const imageRef = useRef(null);
  const [openShelves, setOpenShelves] = useState(false);
  const [openBay, setOpenBay] = useState(false);
  const [currentBay, setCurrentBay] = useState({}); // [0,1,2,3,4,5,6,7,8
  const [currentShelf, setCurrentShelf] = useState({}); // [0,1,2,3,4,5,6,7,8
  // const [numberOfShelves, setNumberOfShelves] = useState(1); // [1,2,3,4,5,6,7,8
  const [scaleFactor, setScaleFactor] = useState(1); // [1,2,3,4,5,6,7,8
  const [updatedPartDetails, setUpdatedPartDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [layoutData, setLayoutData] = useState({});
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await GetAllStores();
  //       setStoresData(response.data.data);
  //     } catch (error) {
  //       console.error('Error fetching stores data:', error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  const handleCloseImageDialog = () => {
    setIsImageDialogOpen(false);
  };

  // const handleImageClick = (imageUrl) => {
  //   setSelectedImage(imageUrl);
  //   setIsImageDialogOpen(true);
  // };
  const handleImageClick = (image_url) => {
    setSelectedImage(image_url);
    setIsImageDialogOpen(true);
  };

  const date = new Date();
  const today = date.toISOString().split('T')[0];
  console.log(today);
  const getLayoutData = async () => {
    const input = {
      Store_IDs: ['6582be9ac5ed94d792a563b8'],
      // start_date: '2024-01-01'
      start_date: today
    };
    const response = await GetStoreLayout(input);
    // console.log(response.data[0]);
    setLayoutData(response.data[0]);
    setLoading(false);
  };

  useEffect(() => {
    getLayoutData();
  }, []);

  const findMidpoint = (coordinates, dimensions) => {
    const { x, y } = coordinates;
    const { width, height } = dimensions;
    const midPoint = { x: x + width / 2, y: y + height / 2 };
    return midPoint;
  };
  const handleCloseBay = () => {
    setOpenBay(false);
    setLoading(true);
    getLayoutData();
  };
  const handleOpenBay = (item) => {
    setOpenBay(true);
    setCurrentBay(item);
  };
  const handlePrevBay = () => {
    let sortedBayArray = layoutData.bayDetails.sort((a, b) => {
      return a.bay_name.localeCompare(b.bay_name);
    });
    // console.log(sortedBayArray[parseInt(currentBay?.bay_name?.split(' ')[1]) - 1]);
    parseInt(currentBay?.bay_name?.split(' ')[1]) === 1
      ? setCurrentBay(sortedBayArray[layoutData.bayDetails.length - 1])
      : setCurrentBay(sortedBayArray[parseInt(currentBay?.bay_name?.split(' ')[1]) - 2]);
  };
  const handleNextBay = () => {
    let sortedBayArray = layoutData.bayDetails.sort((a, b) => {
      return a.bay_name.localeCompare(b.bay_name);
    });
    parseInt(currentBay?.bay_name?.split(' ')[1]) === layoutData.bayDetails.length
      ? setCurrentBay(sortedBayArray[0])
      : setCurrentBay(sortedBayArray[parseInt(currentBay?.bay_name?.split(' ')[1])]);
  };
  const handleCloseShelves = () => {
    setOpenShelves(false);
    setLoading(true);
    getLayoutData();
  };
  const handleOpenShelves = async (item) => {
    setLoading(true);
    console.log('partdetails', item.partsDetails);
    const input = item.partsDetails.filter((value) => value.img_url);
    console.log(input);
    handleCloseBay();
    let data;
    if (input.length > 0) {
      data = await GetImagesFromSignedUrl(input);
      console.log('api data', data);
    }
    // console.log(data);
    const mergedPartsDetails = item.partsDetails.map((originalPart) => {
      const matchingApiData = data?.data?.find((apiPart) => apiPart.name === originalPart.name);
      return matchingApiData || originalPart;
    });
    setCurrentShelf(item);
    setUpdatedPartDetails(mergedPartsDetails);
    setLoading(false);
    setOpenShelves(true);
  };
  console.log('updated parts', updatedPartDetails);
  // const handlePrevShelves = () => {
  //   // SORTING THE SHELVES IN THE BASIS OF THEIR NAME
  //   let sortedShelvesArray = currentBay.shelves.sort((a, b) => {
  //     return a.shelf_name.localeCompare(b.shelf_name);
  //   });

  //   // CHECKING FOR BOTTOM SHELF
  //   const hasBottomShelf = currentBay?.shelves?.some((shelf) => shelf.location === "bottom");

  //   // IF BOTTOM SHELF IS PRESENT THEN CONDITION FOR SELECTING CURRENTSHELF
  //   hasBottomShelf
  //     ? parseInt(currentShelf?.shelf_name?.split(" ")[2]) === 0
  //       ? setCurrentShelf(sortedShelvesArray[currentBay?.shelves?.length - 1])
  //       : setCurrentShelf(
  //           sortedShelvesArray[
  //             parseInt(currentShelf?.shelf_name?.split(" ")[2]) - 1
  //           ]
  //         )

  //     // IF BOTTOM SHELF IS NOT PRESENT THEN CONDITION FOR SELECTING CURRENTSHELF
  //     : parseInt(currentShelf?.shelf_name?.split(" ")[2]) === 1
  //     ? setCurrentShelf(sortedShelvesArray[currentBay?.shelves?.length - 1])
  //     : setCurrentShelf(
  //         sortedShelvesArray[
  //           parseInt(currentShelf?.shelf_name?.split(" ")[2]) - 2
  //         ]
  //       );
  // };

  // const handleNextShelves = () => {

  //   // SORTING THE SHELVES IN THE BASIS OF THEIR NAME
  //   let sortedShelvesArray = currentBay.shelves.sort((a, b) => {
  //     return a.shelf_name.localeCompare(b.shelf_name);
  //   });

  //   // CHECKING FOR BOTTOM SHELF
  //   const hasBottomShelf = currentBay?.shelves?.some((shelf) => shelf.location === "bottom");

  //   // IF BOTTOM SHELF IS PRESENT THEN CONDITION FOR SELECTING CURRENTSHELF
  //   hasBottomShelf
  //     ? parseInt(currentShelf?.shelf_name?.split(" ")[2]) ===
  //       currentBay.shelves.length - 1
  //       ? setCurrentShelf(sortedShelvesArray[0])
  //       : setCurrentShelf(
  //           sortedShelvesArray[
  //             parseInt(currentShelf?.shelf_name?.split(" ")[2]) + 1
  //           ]
  //         )

  //     // IF BOTTOM SHELF IS NOT PRESENT THEN CONDITION FOR SELECTING CURRENTSHELF
  //     : parseInt(currentShelf?.shelf_name?.split(" ")[2]) ===
  //       currentBay.shelves.length
  //     ? setCurrentShelf(sortedShelvesArray[0])
  //     : setCurrentShelf(
  //         sortedShelvesArray[
  //           parseInt(currentShelf?.shelf_name?.split(" ")[2])
  //         ]
  //       );
  // };

  const findDimensions = (event) => {
    const { naturalWidth } = event.target;
    const imgDiv = imageRef.current;
    const { width } = imgDiv.getBoundingClientRect();
    setScaleFactor(width / naturalWidth);
  };
console.log("layoutdata", layoutData);
  return (
    <div className="w-full flex bg-gray-100 ">
      <div className="w-full h-full">
        <Breadcrumb
        // title={
        //   openShelves ? (
        //     <Box component={'span'}>
        //       {currentBay.bay_name} / {currentShelf.shelf_name}
        //     </Box>
        //   ) : openBay ? (
        //     <Box component={'span'}>{currentBay.bay_name}</Box>
        //   ) : loading ? (
        //     'Loading'
        //   ) : (
        //     'Layout'
        //   )
        // }
        >
          <Typography component={Link} to="/stores" variant="subtitle2" color="inherit" className="link-breadcrumb">
            Stores
          </Typography>
            <Typography variant="subtitle2" color="primary" className="link-breadcrumb">
            {layoutData?.name}
            </Typography>
          {openShelves ? (
            <Box component={'span'}>
              {currentBay.bay_name} / {currentShelf.shelf_name}
            </Box>
          ) : openBay ? (
            <Box component={'span'}>{currentBay.bay_name}</Box>
          ) : loading ? (
            'Loading'
          ) : (
            'Layout'
          )}
        </Breadcrumb>
        {loading ? (
          <div className="flex justify-center items-center">
            <NewLoader />{' '}
          </div>
        ) : (
          <div className={`w-full h-full relative ${openShelves || openBay ? 'hidden' : ''}`}>
            <img src={layoutData?.image_url} alt="layout" loading="lazy" onLoad={findDimensions} ref={imageRef} />
            <div className="absolute top-0 left-0 w-full h-full">
              {layoutData?.bayDetails.map((item, index) => (
                <ThemeProvider theme={theme} key={index}>
                  <Tooltip
                    title={
                      <div className="">
                        <span>Fullness: {item?.bay_fullness?.toFixed(2) || 'No Capture'}</span>
                      </div>
                    }
                  >
                    <button
                      key={index}
                      className={`absolute lg:px-2 ${
                        item?.bay_fullness >= 80
                          ? 'bg-emerald-500'
                          : item?.bay_fullness >= 50 && item?.bay_fullness < 80
                          ? 'bg-orange-500'
                          : item?.bay_fullness < 50
                          ? 'bg-red-600'
                          : 'bg-gray-500 disabled:'
                      } rounded-lg text-sm  h-10 text-white`}
                      style={{
                        top: `${findMidpoint(item.coordinates, item.dimensions).y * scaleFactor}px`,
                        left: `${findMidpoint(item.coordinates, item.dimensions).x * scaleFactor}px`
                      }}
                      onClick={() => {
                        handleOpenBay(item);
                      }}
                    >
                      {item.bay_name}
                    </button>
                  </Tooltip>
                </ThemeProvider>
              ))}
            </div>
          </div>
        )}
        {openBay && (
          <div className="w-full relative flex justify-center items-center h-[92%]">
            <CloseRounded
              onClick={handleCloseBay}
              className="z-10 text-xl cursor-pointer text-gray-600 opacity-60 hover:opacity-100 absolute"
              style={{
                right: '4%',
                top: '2%'
              }}
            />
            <ChevronLeftRounded
              onClick={handlePrevBay}
              className="text-gray-400 opacity-50 hover:opacity-100 text-7xl absolute z-10 cursor-pointer"
              style={{
                left: '2%',
                top: '45%'
              }}
            />
            <ChevronRightRounded
              onClick={handleNextBay}
              className="text-gray-400 opacity-50 hover:opacity-100 text-7xl absolute z-10 cursor-pointer"
              style={{
                right: '2%',
                top: '45%'
              }}
            />

            <div
              className={`w-[45%]  h-[67vh] `}
              style={{
                perspective: '900px'
              }}
            >
              <div
                className={`w-full h-full  grid grid-rows-[repeat(9,_minmax(0,_1fr))] relative`}
                style={{
                  transform: 'rotateX(45deg)',
                  gridTemplateColumns: `repeat(6, minmax(0, 1fr))`
                }}
              >
                {currentBay.shelves.map((item, index) => {
                  if (item.location === 'left')
                    return (
                      <div
                        key={index}
                        className="border-emerald-500 border-[5px] rounded-lg col-span-1 cursor-pointer row-start-2 flex justify-center items-center text-xl font-semibold hover:bg-emerald-200 duration-500"
                        style={{
                          gridRowEnd: 8
                        }}
                        onClick={() => {
                          handleOpenShelves(item);
                        }}
                      >
                        <div className="h-full flex justify-center items-center">
                          <p className="-rotate-90 border-0 border-red-500 m-0 w-24 text-center">shelf - 1</p>
                        </div>
                      </div>
                    );
                  else if (item.location === 'right')
                    return (
                      <div
                        key={index}
                        className="border-emerald-500 border-[5px] rounded-lg col-span-1 row-start-2 flex justify-center items-center text-xl font-semibold hover:bg-emerald-200 duration-500"
                        style={{
                          gridRowEnd: 8,
                          gridColumnStart: 6
                        }}
                        onClick={() => {
                          handleOpenShelves(item);
                        }}
                      >
                        <div className="h-full flex justify-center items-center cursor-pointer">
                          <p className="rotate-90 border-0 border-red-500 m-0 w-24 text-center">shelf - 3</p>
                        </div>
                      </div>
                    );
                  else if (item.location === 'top')
                    return (
                      <div
                        key={index}
                        className="border-emerald-500 cursor-pointer border-[5px] rounded-lg col-start-2 row-span-1 flex justify-center items-center text-xl font-semibold hover:bg-emerald-200 duration-500"
                        style={{
                          gridColumnEnd: 6,
                          gridRowStart: 1
                        }}
                        onClick={() => {
                          handleOpenShelves(item);
                        }}
                      >
                        <p className="">shelf - 2</p>
                      </div>
                    );
                  return (
                    <div
                      key={index}
                      className="border-emerald-500 cursor-pointer border-[5px] rounded-lg col-start-2 row-span-1 flex justify-center items-center text-xl font-semibold hover:bg-emerald-200 duration-500"
                      style={{
                        gridColumnEnd: 6,
                        gridRowStart: currentBay.id === 9 ? 9 : 8
                      }}
                      onClick={() => {
                        handleOpenShelves(item);
                      }}
                    >
                      <p className="border-0 border-red-500 ">shelf - 0</p>
                    </div>
                  );
                })}

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl font-semibold text-gray-600">
                  {currentBay.bay_name}
                </div>
              </div>
            </div>
          </div>
        )}
        {openShelves && (
          <div className="w-full relative flex flex-col justify-center items-center ">
            <CloseRounded
              onClick={handleCloseShelves}
              className="z-20 text-xl cursor-pointer text-gray-600 opacity-60 hover:opacity-100 absolute"
              style={{
                right: '4%',
                top: '2%'
              }}
            />
            {/* <GoChevronLeft
              onClick={handlePrevShelves}
              className="text-gray-400 opacity-50 hover:opacity-100 text-7xl absolute z-10 cursor-pointer"
              style={{
                left: "2%",
                top: "45%",
              }}
            />
            <GoChevronRight
              onClick={handleNextShelves}
              className="text-gray-400 opacity-50 hover:opacity-100 text-7xl absolute z-10 cursor-pointer"
              style={{
                right: "2%",
                top: "45%",
              }}
            /> */}

            <div
              className={` w-[80%] h-full text-3xl font-semibold border-[0px] overflow-y-auto border-emerald-500 rounded-lg grid gap-2`}
              style={{
                gridTemplateColumns: `repeat(${currentShelf?.partsDetails?.length / 2}, minmax(0, 1fr))`
              }}
            >
              {updatedPartDetails.map((item, index) => (
                <div
                  key={index}
                  className="cursor-pointer row-span-2 flex justify-center items-center"
                  onClick={() => handleImageClick(item.img_url)}
                >
                  {/* {item.img_url ? <img src={item.img_url} alt="shelf" className="w-full h-80 object-contain" /> : 'NO IMAGE'} */}
                  {item.img_url ? (
                    <img
                      src={item.img_url}
                      alt="shelf"
                      className="w-full h-80 rounded-xl object-cover"
                    />
                  ) : (
                    'NO IMAGE'
                  )}
                </div>
              ))}
              <Dialog open={isImageDialogOpen} onClose={handleCloseImageDialog} maxWidth="lg">
                <DialogContent>
                  <IconButton
                    edge="end"
                    color="inherit"
                    onClick={handleCloseImageDialog}
                    aria-label="close"
                    sx={{ position: 'absolute', right: 8, top: 8 }}
                  >
                    <CloseIcon />
                  </IconButton>
                  <img
                    src={selectedImage}
                    alt="Full-screen"
                    style={{ width: '100%', height: 'auto' }}
                  />
                </DialogContent>
              </Dialog>
            </div>

            {/* <div
              className={` w-[45%] h-[75%] text-3xl font-semibold border-[5px] border-emerald-500 rounded-lg `}
            >
              <div className="text-sm font-medium text-center text-gray-500 border-b border-emerald-200 ">
                <ul className="flex flex-wrap -mb-px">
                  <li
                    className="me-2"
                    onClick={() => {
                      setTab(0);
                    }}
                  >
                    <button
                      className={`inline-block p-4  rounded-t-lg ${
                        tab === 0
                          ? "text-emerald-600 border-b-2 border-emerald-600"
                          : "border-b-2 border-transparent hover:text-gray-600 "
                      }`}
                    >
                      Top
                    </button>
                  </li>
                  <li
                    className="me-2"
                    onClick={() => {
                      setTab(1);
                    }}
                  >
                    <button
                      className={`inline-block p-4  rounded-t-lg ${
                        tab === 1
                          ? "text-emerald-600 border-b-2 border-emerald-600"
                          : "border-b-2 border-transparent hover:text-gray-600 "
                      }`}
                    >
                      Bottom
                    </button>
                  </li>
                </ul>
              </div>
              {tab === 0 ? (
                <div className="flex justify-center items-center w-full">
                  Images Top
                </div>
              ) : (
                <div className="flex justify-center w-full items-center">
                  Images Bottom
                </div>
              )}
            </div> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default StoreLayout;
