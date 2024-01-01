<<<<<<< HEAD
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { Grid, Typography } from '@mui/material';
import Progress_bar from '../Stores/Table/progressBar';
import { Tooltip, Dialog, DialogContent, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
=======
import React from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { Card, CardHeader, CardContent, Divider, Grid, Typography } from '@mui/material';
>>>>>>> 2a90240c57e011d4a69c4ed616d203686d2904b6

// project import
import Breadcrumb from 'component/Breadcrumb';
import { gridSpacing } from 'config.js';

// ==============================|| BRANDS PAGE ||============================== //

const Brands = () => {
<<<<<<< HEAD
  const [clickedBar, setClickedBar] = useState(null);
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleProgressBarClick = (storeId, columnName) => {
    const matchingImage = imageData.find((data) => data.id === storeId);
    setClickedBar({
      storeId,
      columnName,
      imageUrls: matchingImage ? matchingImage.url : undefined
    });
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setIsImageDialogOpen(true);
  };

  const handleCloseImageDialog = () => {
    setIsImageDialogOpen(false);
  };

  console.log('clicked bar', clickedBar);

  const storeData = [
    {
      id: 'TX1234-Seawoods',
      upKeep: '90%',
      vm: '60%',
      promo: '80%',
      anomalies: (
        <Progress_bar
          bgcolor="rgb(134 239 172)"
          progress="60"
          height={20}
          handleProgressBarClick={() => handleProgressBarClick('TX1234-Seawoods', 'anomalies')}
        />
      )
    },
    {
      id: 'TX1234-Bandra',
      upKeep: '85%',
      vm: '76%',
      promo: '30%',
      anomalies: (
        <Progress_bar
          bgcolor="rgb(134 239 172)"
          progress="20"
          height={20}
          handleProgressBarClick={() => handleProgressBarClick('TX1234-Bandra', 'anomalies')}
        />
      )
    },
    {
      id: 'TX1234-Pune',
      upKeep: '60%',
      vm: '50%',
      promo: '78%',
      anomalies: (
        <Progress_bar
          bgcolor="rgb(134 239 172)"
          progress="40"
          height={20}
          handleProgressBarClick={() => handleProgressBarClick('TX1234-Pune', 'anomalies')}
        />
      )
    },
    {
      id: 'TX1234-Raurkela',
      upKeep: '30%',
      vm: '90%',
      promo: '59%',
      anomalies: (
        <Progress_bar
          bgcolor="rgb(134 239 172)"
          progress="90"
          height={20}
          handleProgressBarClick={() => handleProgressBarClick('TX1234-Raurkela', 'anomalies')}
        />
      )
    }
  ];

  const imageData = [
    {
      id: 'TX1234-Seawoods',
      url: [
        'https://simplyorganized.me/wp-content/uploads/2016/12/IMG_9029-768x1027.jpg',
        'https://simplyorganized.me/wp-content/uploads/2016/12/IMG_9029-768x1027.jpg'
      ]
    },
    {
      id: 'TX1234-Bandra',
      url: [
        'https://simplyorganized.me/wp-content/uploads/2016/12/IMG_9029-768x1027.jpg',
        'https://simplyorganized.me/wp-content/uploads/2016/12/IMG_9029-768x1027.jpg',
        'https://simplyorganized.me/wp-content/uploads/2016/12/IMG_9029-768x1027.jpg'
      ]
    }
  ];

=======
>>>>>>> 2a90240c57e011d4a69c4ed616d203686d2904b6
  return (
    <>
      <Breadcrumb title="Brands">
        <Typography component={Link} to="/" variant="subtitle2" color="inherit" className="link-breadcrumb">
          Insights
        </Typography>
        <Typography variant="subtitle2" color="primary" className="link-breadcrumb">
          Brands
        </Typography>
      </Breadcrumb>
      <Grid container spacing={gridSpacing}>
<<<<<<< HEAD
        {/* <div className="flex justify-center items-start mt-20 min-h-screen"> */}
        <table className="border-collapse mt-20 ml-20 w-4/5">
          <thead>
            <tr className="">
              <th className="flex-1 p-0.5 cursor-pointer" style={{ width: '8%' }}>
                <div className="bg-gray-200 p-0.5 rounded">Store ID</div>
              </th>
              <th className="flex-1 p-0.5 cursor-pointer" style={{ width: '5%' }}>
                <div className="bg-gray-200 p-0.5 rounded">Up Keep</div>
              </th>
              <th className="flex-1 p-0.5 cursor-pointer" style={{ width: '5%' }}>
                <div className="bg-gray-200 p-0.5 rounded">VM</div>
              </th>
              <th className="flex-1 p-0.5 cursor-pointer" style={{ width: '5%' }}>
                <div className="bg-gray-200 p-0.5 rounded">Promo</div>
              </th>
              <th className="flex-1 p-0.5 cursor-pointer" style={{ width: '20%' }}>
                <div className="bg-gray-200 p-0.5 rounded">Anomalies</div>
              </th>
            </tr>
          </thead>
          <tbody className="">
            {storeData.map((store) => (
              <tr key={store.id} className="text-center">
                <td className="p-0.5 w-5 cursor-pointer">
                  <div className="bg-gray-100 p-0.5 rounded h-[100px] flex items-center justify-center hover:bg-gray-200 hover:text-black transition">
                    {store.id}
                  </div>
                </td>
                <td className="p-0.5 cursor-pointer">
                  <div className="bg-gray-100 p-0.5 rounded h-[100px] flex items-center justify-center hover:bg-gray-200 hover:text-black transition">
                    {store.upKeep}
                  </div>
                </td>
                <td className="p-0.5 cursor-pointer">
                  <div className="bg-gray-100 p-0.5 rounded h-[100px] flex items-center justify-center hover:bg-gray-200 hover:text-black transition">
                    {store.vm}
                  </div>
                </td>
                <td className="p-0.5 cursor-pointer">
                  <div className="bg-gray-100 p-0.5 rounded h-[100px] flex items-center justify-center hover:bg-gray-200 hover:text-black transition">
                    {store.promo}
                  </div>
                </td>
                <td className="p-0.5 w-20 cursor-pointer">
                  <div className="bg-gray-100 p-0.5 rounded h-[100px] flex items-center flex-col justify-center hover:bg-gray-200 hover:text-black transition">
                    {clickedBar && clickedBar.storeId === store.id && clickedBar.columnName === 'anomalies' ? (
                      <>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px'
                          }}
                        >
                          {clickedBar.imageUrls &&
                            clickedBar.imageUrls.map((imageUrl, index) => (
                              <Tooltip
                                key={index}
                                title={
                                  <div>
                                    <img
                                      key={index}
                                      className="w-fit h-fit max-h-[200px] "
                                      src={imageUrl}
                                      alt={`Image_no. ${index + 1} for ${store.id}`}
                                    />
                                  </div>
                                }
                              >
                                <div
                                  className="w-15 h-12 m-1 cursor-pointer"
                                  key={index}
                                  role="button"
                                  tabIndex={0}
                                  onClick={() => handleImageClick(imageUrl)}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                      handleImageClick(imageUrl);
                                    }
                                  }}
                                >
                                  <img
                                    src={imageUrl}
                                    alt={`Image_no. ${index + 1} for ${store.id}`}
                                    style={{ width: '100%', height: '100%' }}
                                  />
                                </div>
                              </Tooltip>
                            ))}
                        </div>
                        {store.anomalies}
                      </>
                    ) : (
                      store.anomalies
                    )}
                  </div>
                </td>
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
                    <img src={selectedImage} alt="Full-screen" style={{ width: '100%', height: 'auto' }} />
                  </DialogContent>
                </Dialog>
              </tr>
            ))}
          </tbody>
        </table>
        {/* </div> */}
=======
        <Grid item>
          <Card>
            <CardHeader
              title={
                <Typography component="div" className="card-header">
                  Heading
                </Typography>
              }
            />
            <Divider />
            <CardContent>
              <Typography variant="body2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiatnulla pariatur. Excepteur sint occaecat cupidatat non
                proident, sunt in culpa qui officia deserunt mollitanim id est laborum.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
>>>>>>> 2a90240c57e011d4a69c4ed616d203686d2904b6
      </Grid>
    </>
  );
};

export default Brands;
