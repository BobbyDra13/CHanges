import React, { useEffect, useRef, useState } from 'react';
// import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import Breadcrumb from 'component/Breadcrumb';
import { ChevronLeftRounded, ChevronRightRounded } from '@mui/icons-material';
import { ImCross } from 'react-icons/im';
import Tooltip from '@mui/material/Tooltip';
import { Dialog, DialogContent, Typography, Box, Stack, ImageList, ImageListItem, ImageListItemBar, useMediaQuery } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { GetStoreLayout, GetImagesFromSignedUrl } from '../../../api/index';
// import NewLoader from '../../../component/Loader/Loader';
import { Link, useNavigate } from 'react-router-dom';
import { IoReturnUpBack } from 'react-icons/io5';

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
import { bouncy } from 'ldrs';

bouncy.register();

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
  const [imgLoading, setImgLoading] = useState(false);
  const [layoutData, setLayoutData] = useState({});
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

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
  const isMdOrLarger = useMediaQuery((theme) => theme.breakpoints.up('md'));

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
  const getLayoutData = async () => {
    const input = {
      Store_IDs: ['6582be9ac5ed94d792a563b8'],
      // start_date: '2024-01-01'
      start_date: today
    };
    const response = await GetStoreLayout(input);
    // console.log(response.data[0]);
    setLayoutData(response.data[0]);
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
    getLayoutData();
  };
  const handleGetUpdatedPartDetails = async (item) => {
    setLoading(true);
    setImgLoading(true);
    const input = item.partsDetails.filter((value) => value.img_url);
    let data;
    if (input.length > 0) {
      data = await GetImagesFromSignedUrl(input);
      // console.log('api data', data);
    }
    // console.log(data);
    const mergedPartsDetails = item.partsDetails.map((originalPart) => {
      const matchingApiData = data?.data?.find((apiPart) => apiPart.name === originalPart.name);
      return matchingApiData || originalPart;
    });

    setUpdatedPartDetails(mergedPartsDetails);
    setLoading(false);
  };
  const handleOpenShelves = (item) => {
    // console.log('partdetails', item.partsDetails);
    handleGetUpdatedPartDetails(item);
    handleCloseBay();
    setCurrentShelf(item);
    setOpenShelves(true);
  };
  // console.log('updated parts', updatedPartDetails);
  const handleBack = () => {
    if (openBay) {
      handleCloseBay();
      getLayoutData();
    } else if (openShelves) {
      handleCloseShelves();
      handleOpenBay(currentBay);
    } else navigate('/main/stores');
    // console.log('back button');
  };
  const handleKeyDownBay = (e) => {
    if (e.key === 'ArrowLeft') {
      handlePrevBay();
    } else if (e.key === 'ArrowRight') {
      handleNextBay();
    }
  };
  const handleKeyDownShelves = (e) => {
    if (e.key === 'ArrowLeft') {
      handlePrevShelves();
    } else if (e.key === 'ArrowRight') {
      handleNextShelves();
    }
  };
  const handlePrevShelves = () => {
    console.log(currentShelf);
    // SORTING THE SHELVES IN THE BASIS OF THEIR NAME
    let sortedShelvesArray = currentBay.shelves.sort((a, b) => {
      return a.shelf_name.localeCompare(b.shelf_name);
    });

    // CHECKING FOR BOTTOM SHELF
    const hasBottomShelf = currentBay?.shelves?.some((shelf) => shelf.location === 'bottom');
    // CHECKING FOR TOP SHELF
    const hasTopShelf = currentBay?.shelves?.some((shelf) => shelf.location === 'top');

    // IF TOP SHELF IS NOT PRESENT THEN CONDITION FOR SELECTING CURRENTSHELF
    if (!hasTopShelf) {
      if (parseInt(currentShelf?.shelf_name?.split(' ')[2]) === 0) {
        setCurrentShelf(sortedShelvesArray[currentBay?.shelves?.length - 1]);
        handleGetUpdatedPartDetails(sortedShelvesArray[currentBay?.shelves?.length - 1]);
      } else if (parseInt(currentShelf?.shelf_name?.split(' ')[2]) === 3) {
        setCurrentShelf(sortedShelvesArray[1]);
        handleGetUpdatedPartDetails(sortedShelvesArray[1]);
      } else {
        setCurrentShelf(sortedShelvesArray[parseInt(currentShelf?.shelf_name?.split(' ')[2]) - 1]);
        handleGetUpdatedPartDetails(sortedShelvesArray[parseInt(currentShelf?.shelf_name?.split(' ')[2]) - 1]);
      }
    }
    // IF BOTTOM SHELF IS PRESENT THEN CONDITION FOR SELECTING CURRENTSHELF
    else if (hasBottomShelf) {
      if (parseInt(currentShelf?.shelf_name?.split(' ')[2]) === 0) {
        setCurrentShelf(sortedShelvesArray[currentBay?.shelves?.length - 1]);
        handleGetUpdatedPartDetails(sortedShelvesArray[currentBay?.shelves?.length - 1]);
      } else {
        setCurrentShelf(sortedShelvesArray[parseInt(currentShelf?.shelf_name?.split(' ')[2]) - 1]);
        handleGetUpdatedPartDetails(sortedShelvesArray[parseInt(currentShelf?.shelf_name?.split(' ')[2]) - 1]);
      }
    }

    // IF BOTTOM SHELF IS NOT PRESENT THEN CONDITION FOR SELECTING CURRENTSHELF
    else {
      if (parseInt(currentShelf?.shelf_name?.split(' ')[2]) === 1) {
        setCurrentShelf(sortedShelvesArray[currentBay?.shelves?.length - 1]);
        handleGetUpdatedPartDetails(sortedShelvesArray[currentBay?.shelves?.length - 1]);
      } else {
        setCurrentShelf(sortedShelvesArray[parseInt(currentShelf?.shelf_name?.split(' ')[2]) - 2]);
        handleGetUpdatedPartDetails(sortedShelvesArray[parseInt(currentShelf?.shelf_name?.split(' ')[2]) - 2]);
      }
    }
  };

  const handleNextShelves = () => {
    console.log('next shelf');
    // SORTING THE SHELVES IN THE BASIS OF THEIR NAME
    let sortedShelvesArray = currentBay.shelves.sort((a, b) => {
      return a.shelf_name.localeCompare(b.shelf_name);
    });

    // CHECKING FOR BOTTOM SHELF
    const hasBottomShelf = currentBay?.shelves?.some((shelf) => shelf.location === 'bottom');
    const hasTopShelf = currentBay?.shelves?.some((shelf) => shelf.location === 'top');

    //IF TOP SHELF IS NOT PRESENT THEN CONDITION FOR SELECTING CURRENTSHELF
    if (!hasTopShelf) {
      if (parseInt(currentShelf?.shelf_name?.split(' ')[2]) === currentBay.shelves.length) {
        setCurrentShelf(sortedShelvesArray[0]);
        handleGetUpdatedPartDetails(sortedShelvesArray[0]);
      } else {
        setCurrentShelf(sortedShelvesArray[parseInt(currentShelf?.shelf_name?.split(' ')[2]) + 1]);
        handleGetUpdatedPartDetails(sortedShelvesArray[parseInt(currentShelf?.shelf_name?.split(' ')[2]) + 1]);
      }
    }
    // IF BOTTOM SHELF IS PRESENT THEN CONDITION FOR SELECTING CURRENTSHELF
    else if (hasBottomShelf) {
      if (parseInt(currentShelf?.shelf_name?.split(' ')[2]) === currentBay.shelves.length - 1) {
        setCurrentShelf(sortedShelvesArray[0]);
        handleGetUpdatedPartDetails(sortedShelvesArray[0]);
      } else {
        setCurrentShelf(sortedShelvesArray[parseInt(currentShelf?.shelf_name?.split(' ')[2]) + 1]);
        handleGetUpdatedPartDetails(sortedShelvesArray[parseInt(currentShelf?.shelf_name?.split(' ')[2]) + 1]);
      }
    }

    // IF BOTTOM SHELF IS NOT PRESENT THEN CONDITION FOR SELECTING CURRENTSHELF
    else {
      if (parseInt(currentShelf?.shelf_name?.split(' ')[2]) === currentBay.shelves.length) {
        setCurrentShelf(sortedShelvesArray[0]);
        handleGetUpdatedPartDetails(sortedShelvesArray[0]);
      } else {
        setCurrentShelf(sortedShelvesArray[parseInt(currentShelf?.shelf_name?.split(' ')[2])]);
        handleGetUpdatedPartDetails(sortedShelvesArray[parseInt(currentShelf?.shelf_name?.split(' ')[2])]);
      }
    }
  };

  const findDimensions = (event) => {
    setLoading(false);
    const { naturalWidth } = event.target;
    const imgDiv = imageRef.current;
    const { width } = imgDiv.getBoundingClientRect();
    setScaleFactor(width / naturalWidth);
  };

  return (
    // <div className="w-full flex border border-black">
    <div className="w-full h-full flex-col flex overflow-x-hidden">
      <Breadcrumb>
        <Typography component={Link} to="/main/stores" variant="subtitle2" color="inherit" className="link-breadcrumb">
          Stores
        </Typography>
        <Typography variant="subtitle2" color="inherit" className="link-breadcrumb">
          {layoutData?.name}
        </Typography>
        {openShelves ? (
          <Stack direction={'row'} gap={1}>
            <Typography
              variant="subtitle2"
              color={openBay ? 'primary' : 'inherit'}
              onClick={() => {
                handleCloseShelves();
                handleOpenBay(currentBay);
              }}
              className="cursor-pointer"
            >
              {currentBay.bay_name}
            </Typography>
            <Typography variant="subtitle2">/</Typography>
            <Typography variant="subtitle2" className="text-emerald-500">
              {currentShelf.shelf_name}
            </Typography>
          </Stack>
        ) : openBay ? (
          <Box component={'span'} className="text-emerald-500">
            {currentBay.bay_name}
          </Box>
        ) : loading ? (
          'Loading'
        ) : (
          'Layout'
        )}
      </Breadcrumb>
      {loading && (
        <div className="flex justify-center items-center fixed top-0 left-0 z-10 text-5xl overflow-x-hidden bg-white w-screen h-screen">
          <l-bouncy size="45" speed="1.75" color="black"></l-bouncy>
        </div>
      )}
      <div className={`border-0 border-black  ${openShelves || openBay ? 'min-h-0' : 'min-h-screen'}`}>
        <div className="flex items-center gap-2 w-24 cursor-pointer  border-red-500" onClick={handleBack}>
          <IoReturnUpBack className="text-lg cursor-pointer text-gray-600 opacity-60 hover:opacity-100" style={{}} />
          <span className="cursor-pointer text-lg text-black-600 opacity-60 hover:opacity-100">Back</span>
        </div>

        <div
          className={`w-full h-full relative ${
            openShelves || openBay ? 'hidden' : ''
          } border-red-500  md:rotate-0 rotate-90 flex justify-start items-center  scale-[1.5] md:scale-100 md:top-0 top-48`}
        >
          <img src={layoutData?.image_url} alt="layout" loading="lazy" onLoad={findDimensions} ref={imageRef} className="lg:w-full" />
          <div className="absolute top-0 left-0 w-full h-full">
            {layoutData?.bayDetails?.map((item, index) => (
              <ThemeProvider theme={theme} key={index}>
                <Tooltip
                  title={
                    <div className="flex flex-col">
                      <span>Brand: {item?.brand || 'No Capture'}</span>
                      <span>Fullness: {Math.floor(item?.bay_fullness) + '%' || 'No Capture'}</span>
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
                    } rounded-lg text-xs  h-4 md:h-10 text-white md:rotate-0 md:px-2 px-1`}
                    style={{
                      top: `${findMidpoint(item.coordinates, item.dimensions).y * scaleFactor}px`,
                      left: isMdOrLarger
                        ? `${findMidpoint(item.coordinates, item.dimensions).x * scaleFactor}px`
                        : `${findMidpoint(item.coordinates, item.dimensions).x * scaleFactor * 1.2}px`
                    }}
                    onClick={() => {
                      handleOpenBay(item);
                    }}
                  >
                    {isMdOrLarger ? item.bay_name : item.bay_name.split(' ')[1]}
                  </button>
                </Tooltip>
              </ThemeProvider>
            ))}
          </div>
        </div>
      </div>

      {openBay && (
        <div className="w-full relative flex justify-center items-center">
          <ChevronLeftRounded
            onClick={handlePrevBay}
            className="text-gray-400 opacity-50 hover:opacity-100 text-7xl absolute z-10 cursor-pointer lg:left-[2%] lg:top-[45%] left-0 top-[35%]"
            onKeyDown={handleKeyDownBay}
            tabIndex="0"
          />
          <ChevronRightRounded
            onClick={handleNextBay}
            className="text-gray-400 opacity-50 hover:opacity-100 text-7xl absolute z-10 cursor-pointer lg:right-[2%] lg:top-[45%] right-0 top-[35%]"
            onKeyDown={handleKeyDownBay}
            tabIndex="0"
          />

          <div
            className={`lg:w-[45%] w-[70%]  lg:h-[67vh] h-[45vh]`}
            style={{
              perspective: '56.25rem'
            }}
          >
            <div
              className={`w-full h-full  grid grid-rows-[repeat(9,_minmax(0,_1fr))] relative`}
              style={{
                transform: 'rotateX(45deg)',
                gridTemplateColumns: 'repeat(6, minmax(0, 1fr))'
              }}
            >
              {currentBay?.shelves?.map((item, index) => {
                if (item.location === 'left')
                  return (
                    <div
                      key={index}
                      className={`border-emerald-500 border-[5px] rounded-lg col-span-1 cursor-pointer row-start-2  text-xl font-semibold hover:bg-emerald-200 duration-500`}
                      style={{
                        gridRowEnd: 8,
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                      onClick={() => {
                        handleOpenShelves(item);
                      }}
                    >
                      <p className="-rotate-90 m-0 w-20 whitespace-nowrap">Shelf - 1</p>
                      {/* <p className="-rotate-90 m-0 w-20 whitespace-nowrap"> Fullness: {item.shelf_fullness.toFixed(2)}%</p> */}
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
                      <div className="h-full flex justify-between items-center cursor-pointer">
                        {/* <p className="rotate-90 border-0 border-red-500 w-20 text-center mt-2  whitespace-nowrap">
                          {' '}
                          Fullness: {item.shelf_fullness.toFixed(2)}%
                        </p> */}
                        <p className="rotate-90 border-0 border-red-500 m-0 w-20 whitespace-nowrap">Shelf - 3</p>
                      </div>
                    </div>
                  );
                else if (item.location === 'top')
                  return (
                    <div
                      key={index}
                      className="border-emerald-500  flex-col cursor-pointer border-[5px] rounded-lg col-start-2 row-span-1 flex justify-center items-center text-xl font-semibold hover:bg-emerald-200 duration-500"
                      style={{
                        gridColumnEnd: 6,
                        gridRowStart: 1
                      }}
                      onClick={() => {
                        handleOpenShelves(item);
                      }}
                    >
                      <p className="">Shelf - 2</p>
                      {/* <p className=""> Fullness: {item.shelf_fullness.toFixed(2)}%</p> */}
                    </div>
                  );
                return (
                  <div
                    key={index}
                    className="border-emerald-500 cursor-pointer border-[5px] rounded-lg col-start-2 row-span-1 flex flex-col justify-center items-center text-xl font-semibold hover:bg-emerald-200 duration-500"
                    style={{
                      gridColumnEnd: 6,
                      gridRowStart: currentBay.id === 9 ? 9 : 8
                    }}
                    onClick={() => {
                      handleOpenShelves(item);
                    }}
                  >
                    <p className="border-0 border-red-500 ">Shelf - 0</p>
                    {/* <p className="border-0 border-red-500 w-15 text-center mt-2"> Fullness: {item.shelf_fullness.toFixed(2)}%</p> */}
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
        <div className="w-full relative flex flex-col justify-center items-start ">
          <ChevronLeftRounded
            onClick={handlePrevShelves}
            className="text-gray-400 opacity-100 hover:opacity-100 text-7xl absolute z-10 cursor-pointer lg:left-[2%] lg:top-[45%] left-0 top-[35%]"
            onKeyDown={handleKeyDownShelves}
            tabIndex="0"
          />
          <ChevronRightRounded
            onClick={handleNextShelves}
            className="text-gray-400 opacity-100 hover:opacity-100 text-7xl absolute z-10 cursor-pointer lg:right-[2%] lg:top-[45%] right-0 top-[35%]"
            onKeyDown={handleKeyDownShelves}
            tabIndex="0"
          />
          <div className="w-full h-full flex lg:justify-center text-3xl font-semibold  py-6 overflow-auto">
            {/* <div className="overflow-auto w-full "> */}
            <ImageList
              sx={{
                minWidth: '680px',
                maxWidth: '70%'
              }}
              cols={currentShelf?.partsDetails?.length / 2}
              gap={10}
            >
              {console.log(currentShelf)}
              {updatedPartDetails?.map((item, index) => (
                <ImageListItem key={index} onClick={() => handleImageClick(item.img_url)}>
                  {item.img_url ? (
                    <div className="relative w-full h-full">
                      {imgLoading && (
                        <div className="flex justify-center items-center absolute top-0 left-0 z-10  overflow-x-hidden bg-white w-full h-full">
                          <l-bouncy size="45" speed="1.75" color="black"></l-bouncy>
                        </div>
                      )}
                      <img
                        src={item.img_url}
                        alt={`Shelf ${index}`}
                        className="w-full h-full object-cover cursor-pointer "
                        onLoad={() => {
                          setImgLoading(false);
                        }}
                      />
                    </div>
                  ) : (
                    <img
                      src="https://img.freepik.com/premium-vector/no-data-found-empty-file-folder-concept-design-vector-illustration_620585-1698.jpg"
                      alt="no data found"
                      className=" w-full h-full object-cover"
                      onLoad={() => {
                        setImgLoading(false);
                      }}
                    />
                  )}
                  <ImageListItemBar title={`Fullness: ${item.avg_full || 0}%`} subtitle={item.name + '/' + updatedPartDetails.length} />
                </ImageListItem>
              ))}
            </ImageList>
            {/* </div> */}

            {/* <Dialog open={isImageDialogOpen} onClose={handleCloseImageDialog} maxWidth="lg"> */}
            <Dialog
              // fullWidth={fullWidth}
              // maxWidth={maxWidth}
              fullScreen
              open={isImageDialogOpen}
              onClose={handleCloseImageDialog}
              PaperProps={{
                sx: {
                  width: '100%',
                  maxHeight: '1300px',
                  background: 'black',
                  boxShadow: 'none'
                }
              }}
            >
              <DialogContent className="w-full h-full flex justify-center relative overflow-hidden">
                <div className="self-center">
                  <ImCross
                    onClick={handleCloseImageDialog}
                    className="z-20 text-xl cursor-pointer text-white opacity-60 hover:opacity-100 absolute"
                    style={{
                      right: '4%',
                      top: '2%'
                    }}
                  />
                  <img src={selectedImage} alt="Full-screen" className="self-center" style={{ maxHeight: '95svh' }} />
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      )}
    </div>
    // </div>
  );
};

export default StoreLayout;
