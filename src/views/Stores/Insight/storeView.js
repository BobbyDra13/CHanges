/* eslint-disable react-hooks/exhaustive-deps */

import { Grid, useMediaQuery } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import { GetStoreLayout } from 'api';
import { bouncy } from 'ldrs';
import { useEffect, useRef, useState } from 'react';
import ShelfView from './shelfView';

bouncy.register();

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
const StoreView = ({ activeButton, setActiveButton }) => {
  const [loading, setLoading] = useState(true);
  const [bayToOpen, setBayToOpen] = useState({});

  const imageRef = useRef(null);
  const [scaleFactor, setScaleFactor] = useState(1);
  const isMdOrLarger = useMediaQuery((theme) => theme.breakpoints.up('md'));
  const [layoutData, setLayoutData] = useState({});

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
  const findDimensions = (event) => {
    setLoading(false);
    const { naturalWidth } = event.target;
    const imgDiv = imageRef.current;
    const { width } = imgDiv.getBoundingClientRect();
    setScaleFactor(width / naturalWidth);
  };
  return (
    <>
      {activeButton == 'Store View' ? (
        <>
          {loading ? (
            <div
              style={{
                alignContent: 'center',
                display: 'flex',
                flexGrow: '1',
                padding: '6%',
                justifyItems: 'center',
                alignItems: 'center',
                position: 'relative',
                flexDirection: 'column'
              }}
            >
              <l-bouncy size="45" speed="1.75" color="black"></l-bouncy>
            </div>
          ) : (
            <Grid item sx={{ paddingTop: '1%', padding: '2%' }}>
              <div
                className={`w-full h-full relative
          } border-red-500  md:rotate-0 rotate-90 flex justify-start items-center scale-[1.5] md:scale-100 md:top-0 top-48`}
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
                            <span>
                              {/* Timestamp: {item?.timestamps || ''} */}
                              {`Date: ${item?.timestamps?.split('T')[0]}`}
                            </span>
                            <span>
                              {`Time: ${new Date(item?.timestamps).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                                second: '2-digit'
                              })}`}
                            </span>
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
                            top: isMdOrLarger
                              ? `${findMidpoint(item.coordinates, item.dimensions).y * scaleFactor}px`
                              : `${findMidpoint(item.coordinates, item.dimensions).y * scaleFactor * 1.4}px`,
                            left: isMdOrLarger
                              ? `${findMidpoint(item.coordinates, item.dimensions).x * scaleFactor}px`
                              : `${findMidpoint(item.coordinates, item.dimensions).x * scaleFactor * 1.58}px`
                          }}
                          onClick={() => {
                            setActiveButton('Shelf View');
                            setBayToOpen(item);
                            console.log(bayToOpen);
                          }}
                        >
                          {isMdOrLarger ? item.bay_name : item.bay_name.split(' ')[1]}
                        </button>
                      </Tooltip>
                    </ThemeProvider>
                  ))}
                </div>
              </div>
            </Grid>
          )}
        </>
      ) : (
        <ShelfView
        // bayToOpen={bayToOpen} layoutData={layoutData}
        />
      )}
    </>
  );
};

export default StoreView;
