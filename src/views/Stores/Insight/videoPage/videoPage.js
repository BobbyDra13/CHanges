import SideBar from '../sideBar';
import RightBar from './RightBar';
import VideoComponent from './videocomponent';
import MiddleController from './cardsControllers/middleController';
import ImageAnnotationTool from './ImageAnnotationTool';
import FirstCard from './cardsControllers/firstCard';
import ThirdCard from './cardsControllers/thirdCard';
import Grid from '@mui/material/Grid';
import { useState, useRef } from 'react';

const VideoPage = () => {
  const [source, setSource] = useState('');
  const [isAnnotation, setIsAnnotation] = useState(false);
  const targetRef = useRef(null);

  const scrollToTarget = () => {
    if (targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: 'smooth' });
      document.body.style.cursor = 'crosshair'; // Change cursor style
    }
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item md={1.7}></Grid>
        <SideBar selField="videos" />
        <Grid item md={10.3}>
          <div className=" flex gap-2 w-full mb-3">
            <div className="  w-4/5 ">
              <div ref={targetRef} className="  w-full m-0 p-0">
                {isAnnotation ? <ImageAnnotationTool setIsAnnotation={setIsAnnotation} /> : <VideoComponent vdoSource={source} />}
              </div>
              <div className="flex mt-2 gap-1 mb-1 text-white">
                <div className="w-1/3 h-[300px] bg-[#454545] rounded-lg ">
                  <FirstCard vdoSource={source} />
                </div>
                <div className="w-1/3 h-[300px] bg-[#454545] rounded-lg">
                  <MiddleController setIsAnnotation={setIsAnnotation} onOkClick={scrollToTarget} />
                </div>
                <div className="w-1/3 h-[300px] bg-[#454545] rounded-lg">
                  <ThirdCard />
                </div>
              </div>
            </div>
            <div className="w-1/4">
              <RightBar videoSource={setSource} />
            </div>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default VideoPage;
