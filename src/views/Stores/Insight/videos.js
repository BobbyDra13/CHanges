import React, { useRef, useState } from 'react';
import { Grid, Stack, Typography, Card } from '@mui/material';
import { useMediaQuery, useTheme } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { MdOutlineKeyboardDoubleArrowLeft } from 'react-icons/md';
import { MdOutlineKeyboardDoubleArrowRight } from 'react-icons/md';
import ImageAnnotationTool from './videoPage/ImageAnnotationTool';
import VideoComponent from './videoPage/videocomponent';
import ThirdCard from './videoPage/cardsControllers/thirdCard';
import FirstCard from './videoPage/cardsControllers/firstCard';
import MiddleController from './videoPage/cardsControllers/middleController';
import RightBar from './videoPage/RightBar';

function Videos() {
  const [isOpenCamerList, setIsOpenCamerList] = useState(false);
  const [source, setSource] = useState('');
  const [isAnnotation, setIsAnnotation] = useState(false);
  const targetRef = useRef(null);

  const scrollToTarget = () => {
    if (targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: 'smooth' });
      document.body.style.cursor = 'crosshair'; // Change cursor style
    }
  };

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isLargeScreen = useMediaQuery(theme.breakpoints.down('lg'));

  const handleOpenCameraList = () => {
    setIsOpenCamerList((prev) => !prev);
  };

  return (
    <>
      <div className="text-2xl font-semibold w-full">
        <Grid
          container
          spacing={2}
          sx={{
            marginBottom: '20px'
          }}
        >
          <Grid item xs={12}>
            <Stack direction={isSmallScreen ? 'column' : 'row'} justifyContent={'space-between'}>
              <Typography variant="h3">Video</Typography>
              <Card className="border border-gray-300 hidden" sx={{ height: '40px', width: '200px' }}></Card>
            </Stack>
          </Grid>
          <Grid item lg={9} xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Card className="border border-gray-300" sx={{ height: '80vh' }}>
                  <div ref={targetRef} className="  w-full m-0 p-0">
                    {isAnnotation ? <ImageAnnotationTool setIsAnnotation={setIsAnnotation} /> : <VideoComponent vdoSource={source} />}
                  </div>
                </Card>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item lg={4} md={4} sm={6} xs={12}>
                    <Card className="border border-gray-300" sx={{ height: '300px' }}>
                      <div className="h-[300px] bg-[#454545] rounded-lg text-white">
                        <FirstCard vdoSource={source} />
                      </div>
                    </Card>
                  </Grid>
                  <Grid item lg={4} md={4} sm={6} xs={12}>
                    <Card className="border border-gray-300" sx={{ height: '300px' }}>
                      <div className=" h-[300px] text-white bg-[#454545] rounded-lg">
                        <MiddleController setIsAnnotation={setIsAnnotation} onOkClick={scrollToTarget} />
                      </div>
                    </Card>
                  </Grid>
                  <Grid item lg={4} md={4} sm={6} xs={12}>
                    <Card className="border  border-gray-300" sx={{ height: '300px' }}>
                      <div className=" h-[300px] text-white bg-[#454545] rounded-lg">
                        <ThirdCard />
                      </div>
                    </Card>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={3} className={`${isLargeScreen && 'hidden'}`}>
            <Card className="border scrollbar border-gray-300" sx={{ height: '85vh' }}>
              <RightBar videoSource={setSource} />
            </Card>
          </Grid>
        </Grid>
      </div>
      {isLargeScreen && (
        <>
          <div
            className={` hover:cursor-pointer z-40  bg-slate-400 opacity-50 h-20 w-12 rounded-l-xl  fixed right-[0%] top-[46.9%] duration-700 ${
              isOpenCamerList && 'right-[40vw!important]'
            } `}
          >
            {' '}
          </div>
          <div
            className={` hover:cursor-pointer z-50 fixed right-[1%] top-[50%] duration-700 ${isOpenCamerList && 'right-[41vw!important]'} `}
          >
            {isOpenCamerList ? (
              <MdOutlineKeyboardDoubleArrowRight className="text-3xl" onClick={handleOpenCameraList} />
            ) : (
              <MdOutlineKeyboardDoubleArrowLeft className="text-3xl" onClick={handleOpenCameraList} />
            )}
          </div>
        </>
      )}
      <AnimatePresence>
        {isLargeScreen && isOpenCamerList && (
          <motion.div
            initial={{ x: '100%', height: '100vh', width: '40vw' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5 }}
            style={{
              position: 'fixed',
              top: 65,
              right: 0
            }}
          >
            <div className="border border-gray-300 overflow-y-scroll h-full bg-slate-300">
              <RightBar videoSource={setSource} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Videos;
