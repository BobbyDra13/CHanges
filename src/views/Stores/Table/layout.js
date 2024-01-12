import React, { useEffect, useRef, useState } from 'react';
// import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import Breadcrumb from 'component/Breadcrumb';
import { ChevronLeftRounded, ChevronRightRounded } from '@mui/icons-material';
import { ImCross } from 'react-icons/im';
import Tooltip from '@mui/material/Tooltip';
import {
  Dialog,
  DialogContent,
  Typography,
  Box,
  Stack,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  useMediaQuery,
  ToggleButton,
  ToggleButtonGroup
} from '@mui/material';
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
  const [liveImg, setLiveImg] = useState(true);
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
  const handleImageClick = (item) => {
    setSelectedImage(item);
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
      console.log('image data', data);
    }
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
  const handlePrevPart = () => {
    let sortedPartsArray = updatedPartDetails.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
    parseInt(selectedImage?.name?.split('  ')[1]) === 1
      ? setSelectedImage(sortedPartsArray[updatedPartDetails.length - 1])
      : setSelectedImage(sortedPartsArray[parseInt(selectedImage?.name?.split('  ')[1]) - 2]);
  };
  const handleNextPart = () => {
    let sortedPartsArray = updatedPartDetails.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
    parseInt(selectedImage?.name?.split('  ')[1]) === updatedPartDetails.length
      ? setSelectedImage(sortedPartsArray[0])
      : setSelectedImage(sortedPartsArray[parseInt(selectedImage?.name?.split('  ')[1])]);
  };
  const handleKeyDownPart = (e) => {
    if (e.key === 'ArrowLeft') {
      handlePrevPart();
    } else if (e.key === 'ArrowRight') {
      handleNextPart();
    }
  };
  const findDimensions = (event) => {
    setLoading(false);
    const { naturalWidth } = event.target;
    const imgDiv = imageRef.current;
    const { width } = imgDiv.getBoundingClientRect();
    setScaleFactor(width / naturalWidth);
  };
  const handleToggleImage = () => {
    setImgLoading(true);
    setLiveImg(!liveImg);
  };
  console.log(layoutData);
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
                      <span>Brand: {item?.brand_name || ''}</span>
                      <span>Fullness: {isNaN(item?.bay_fullness) ? 'No Capture' : Math.floor(item?.bay_fullness) + '%'}</span>
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
        <div className={`w-full relative flex justify-center items-center ${loading ? 'h-0' : ''}`}>
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
              perspective: '900px'
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
                      className={`${
                        item?.shelf_fullness >= 80
                          ? 'border-emerald-500 hover:bg-emerald-200'
                          : item?.shelf_fullness >= 50 && item?.shelf_fullness < 80
                          ? 'border-orange-500 hover:bg-orange-200'
                          : item?.shelf_fullness < 50
                          ? 'border-red-600 hover:bg-red-200'
                          : 'border-gray-500 hover:bg-gray-200'
                      } border-[5px] rounded-lg col-span-1 cursor-pointer row-start-2 flex justify-center items-center text-xl font-semibold  duration-500`}
                      style={{
                        gridRowEnd: 8
                      }}
                      onClick={() => {
                        if (item?.shelf_fullness != 0) {
                          handleOpenShelves(item);
                        }
                      }}
                    >
                      <div className="h-full flex justify-center items-center">
                        <p className="-rotate-90 border-0 border-red-500 m-0 w-28 text-center">
                          shelf - 1
                          <br />
                          {isNaN(item?.shelf_fullness) ? 'No Capture' : Math.floor(item?.shelf_fullness) + '%'}
                        </p>
                        {/* <p className="-rotate-90 border-0 border-red-500 m-0 w-24 text-center">{item.shelf_fullness}</p> */}
                      </div>
                    </div>
                  );
                else if (item.location === 'right')
                  return (
                    <div
                      key={index}
                      className={`${
                        item?.shelf_fullness >= 80
                          ? 'border-emerald-500 hover:bg-emerald-200'
                          : item?.shelf_fullness >= 50 && item?.shelf_fullness < 80
                          ? 'border-orange-500 hover:bg-orange-200'
                          : item?.shelf_fullness < 50
                          ? 'border-red-600 hover:bg-red-200'
                          : 'border-gray-500 hover:bg-gray-200'
                      }
                      border-emerald-500 border-[5px] rounded-lg col-span-1 row-start-2 flex justify-center items-center text-xl font-semibold hover:bg-emerald-200 duration-500`}
                      style={{
                        gridRowEnd: 8,
                        gridColumnStart: 6
                      }}
                      onClick={() => {
                        handleOpenShelves(item);
                      }}
                    >
                      <div className="h-full flex justify-center items-center cursor-pointer">
                        <p className="rotate-90 border-0 border-red-500 m-0 w-28 text-center">
                          shelf - 3
                          <br />
                          {isNaN(item?.shelf_fullness) ? 'No Capture' : Math.floor(item?.shelf_fullness) + '%'}
                        </p>
                        {/* <p className="-rotate-90 border-0 border-red-500 m-0 w-24 text-center">{item.shelf_fullness}</p> */}
                      </div>
                    </div>
                  );
                else if (item.location === 'top')
                  return (
                    <div
                      key={index}
                      className={`${
                        item?.shelf_fullness >= 80
                          ? 'border-emerald-500 hover:bg-emerald-200'
                          : item?.shelf_fullness >= 50 && item?.shelf_fullness < 80
                          ? 'border-orange-500 hover:bg-orange-200'
                          : item?.shelf_fullness < 50
                          ? 'border-red-600 hover:bg-red-200'
                          : 'border-gray-500 hover:bg-gray-200'
                      }
                      border-emerald-500 cursor-pointer border-[5px] rounded-lg col-start-2 row-span-1 flex justify-center items-center text-xl font-semibold hover:bg-emerald-200 duration-500`}
                      style={{
                        gridColumnEnd: 6,
                        gridRowStart: 1
                      }}
                      onClick={() => {
                        handleOpenShelves(item);
                      }}
                    >
                      <p className="">
                        shelf - 2
                        <br />
                        {isNaN(item?.shelf_fullness) ? 'No Capture' : Math.floor(item?.shelf_fullness) + '%'}
                      </p>
                    </div>
                  );
                return (
                  <div
                    key={index}
                    className={`${
                      item?.shelf_fullness >= 80
                        ? 'border-emerald-500 hover:bg-emerald-200'
                        : item?.shelf_fullness >= 50 && item?.shelf_fullness < 80
                        ? 'border-orange-500 hover:bg-orange-200'
                        : item?.shelf_fullness < 50
                        ? 'border-red-600 hover:bg-red-200'
                        : 'border-gray-500 hover:bg-gray-200'
                    }
                    border-emerald-500 cursor-pointer border-[5px] rounded-lg col-start-2 row-span-1 flex justify-center items-center text-xl font-semibold hover:bg-emerald-200 duration-500`}
                    style={{
                      gridColumnEnd: 6,
                      gridRowStart: currentBay.id === 9 ? 9 : 8
                    }}
                    onClick={() => {
                      handleOpenShelves(item);
                    }}
                  >
                    <p className="border-0 border-red-500 ">
                      shelf - 0
                      <br />
                      {isNaN(item?.shelf_fullness) ? 'No Capture' : Math.floor(item?.shelf_fullness) + '%'}
                    </p>
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
        <div className={`w-full relative flex flex-col justify-center items-start ${loading ? 'h-0' : ''}`}>
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
            <ImageList
              sx={{
                minWidth: '680px',
                maxWidth: '70%'
              }}
              cols={currentShelf?.partsDetails?.length / 2}
              gap={10}
            >
              {updatedPartDetails?.map((item, index) => (
                <ImageListItem
                  key={index}
                  onClick={() => handleImageClick(item)}
                  sx={{
                    gridRow: index % 2 === 0 ? '1' : '2'
                  }}
                >
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
                  {/* `Fullness: ${item.avg_full || 0}%` */}
                  <ImageListItemBar
                    title={
                      <Stack direction={'row'} justifyContent={'space-between'}>
                        <Typography>{`Fullness: ${item.avg_full || 0}%`}</Typography>
                        {item?.timestamps && <Typography>{`Date: ${item?.timestamps?.split('T')[0]}`}</Typography>}
                      </Stack>
                    }
                    subtitle={item.name + '/' + updatedPartDetails.length}
                  />
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
                <div className="self-center ">
                  <ChevronLeftRounded
                    onClick={handlePrevPart}
                    className="text-gray-400 opacity-100 hover:opacity-100 text-7xl absolute z-10 cursor-pointer lg:left-[2%] lg:top-[45%] left-0 top-[35%]"
                    onKeyDown={handleKeyDownPart}
                    tabIndex="0"
                  />
                  <ChevronRightRounded
                    onClick={handleNextPart}
                    className="text-gray-400 opacity-100 hover:opacity-100 text-7xl absolute z-10 cursor-pointer lg:right-[2%] lg:top-[45%] right-0 top-[35%]"
                    onKeyDown={handleKeyDownPart}
                    tabIndex="0"
                  />
                  <ImCross
                    onClick={handleCloseImageDialog}
                    className="z-20 text-xl cursor-pointer text-white opacity-60 hover:opacity-100 absolute"
                    style={{
                      right: '4%',
                      top: '3%'
                    }}
                  />
                  <ToggleButtonGroup
                    color="primary"
                    value={liveImg}
                    exclusive
                    onChange={handleToggleImage}
                    aria-label="Platform"
                    className="absolute left-[10%] top-[2%] text-white"
                  >
                    <ToggleButton value={true} style={{ backgroundColor: liveImg ? 'rgb(16, 185, 129' : '', color: 'white' }}>
                      Live
                    </ToggleButton>
                    <ToggleButton value={false} style={{ backgroundColor: !liveImg ? 'rgb(16, 185, 129' : '', color: 'white' }}>
                      Reference
                    </ToggleButton>
                  </ToggleButtonGroup>
                  <div className="relative w-full h-full">
                    {imgLoading && (
                      <div className="flex justify-center items-center absolute top-0 left-0 z-10  overflow-x-hidden bg-white w-full h-full">
                        <l-bouncy size="45" speed="1.75" color="black"></l-bouncy>
                      </div>
                    )}
                    <img
                      src={liveImg ? selectedImage?.img_url : selectedImage?.onboarded_image_url}
                      alt="Full-screen"
                      className="self-center lg:max-h-[95svh] max-h-[90svh] mt-10 md:mt-0"
                      onLoad={() => {
                        setImgLoading(false);
                      }}
                    />
                  </div>
                  <div className="  border-red-500 absolute left-[10%] top-1/2 -translate-y-1/2 w-80 h-80 flex flex-col justify-center items-start text-white">
                    <Typography variant="h2" className="text-white">
                      {selectedImage?.userDetails?.user_name}
                    </Typography>
                    <Typography variant="h2" className="text-white">
                      {selectedImage?.userDetails?.number}
                    </Typography>
                    <Typography variant="h2" className="text-white">
                      {selectedImage?.userDetails?.store_id} - {layoutData?.name}
                    </Typography>
                    <Typography variant="h2" className="text-white">
                      {currentBay?.bay_name?.split(' ')[1]} / {currentShelf?.shelf_name?.split(' ')[2]}
                    </Typography>
                  </div>
                  <div
                    className="  border-red-500 absolute right-[10%] top-1/2 -translate-y-1/2 w-96 h-96 grid text-white gap-4"
                    style={{
                      gridTemplateColumns: `repeat(${selectedImage?.tray_detail?.length}, 1fr)`,
                      gridTemplateRows: `repeat(${selectedImage?.tray_detail[0]?.length}, 1fr)`
                    }}
                  >
                    {selectedImage?.tray_detail?.length > 0 &&
                      selectedImage?.tray_detail?.map((item, index) => {
                        return (
                          <div key={index} className="flex flex-col h-96">
                            {item?.map((value, i) => {
                              console.log(value.rgb);
                              return (
                                <Box
                                  className={` border-white border flex justify-center items-center col-span-1 row-span-1 w-full h-full`}
                                  style={{ backgroundColor: `rgb(${value?.rgb})` }}
                                  key={i}
                                >
                                  <span className="text-lg">{value?.color_family}</span>
                                </Box>
                              );
                            })}
                          </div>
                        );
                      })}
                    {/* (<Box
                  className="border border-red-500 flex justify-center items-center col-span-1 row-span-1"
                   ></Box>) */}
                  </div>
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
