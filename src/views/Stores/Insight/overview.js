import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import {
  Grid,
  Stack,
  Typography,
  Card,
  Skeleton,
  LinearProgress,
  Modal,
  Box,
  Tooltip,
  IconButton,
  Snackbar,
  Alert,
  Select,
  MenuItem,
  FormControl
} from '@mui/material';
import { useMediaQuery, useTheme } from '@mui/material';
import LineChartToggle from './lineChartToggle';
import { IoMdSettings } from 'react-icons/io';
import CsvModalAssociate from './CSV_Associate';
import RadarChart from './RadarChart';
import { getsevendaydata, storeviewcaptureprogress, storeanomalycount, associatescoreaforkpi, brandWiseOsaAndTesterScore } from 'api';
import Chart from 'react-apexcharts';
import popIcon from '../../../assets/images/pop_icon.png';
import { FaCircleInfo } from 'react-icons/fa6';
import pog from '../../../assets/images/pog.jpeg';
import associate from '../../../assets/images/profile-user.png';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedCategory } from 'store/slices/categorySlice';

function Overview() {
  const urlParams = new URLSearchParams(window.location.search);
  const data = Object.fromEntries(urlParams.entries());
  const storeID = useMemo(() => JSON.stringify(data).substring(16, 20), [data]);
  const { store } = useParams();

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));

  const [isGroup] = useState([]);
  const [activeButton, setActiveButton] = useState('Trends View');
  const targetRef = useRef(null);
  const [anomaliesLoading, setAnomaliesLoading] = useState(true);
  const [capture7days, setcapture7days] = useState([]);
  const [Osa7days, setOsa7days] = useState([]);
  const [testfullness7days, settestfullness7days] = useState([]);
  const [openAssociateScoreModal, setOpenAssociateScoreModal] = useState(false);
  const [snackbarConfig, setSnackbarConfig] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  const [storeviewcaptureprogres, setstoreviewcaptureprogres] = useState(0);
  const [anomalycount, setanomalycount] = useState([]);
  const [associatescore, setassociatescore] = useState([]);
  const [brandwiseosaandtester_osa, setbrandwiseosaandtester_osa] = useState([]);
  const [brandwiseosaandtester_tester, setbrandwiseosaandtester_tester] = useState([]);
  const [isLoadingBrandScores, setIsLoadingBrandScores] = useState(false);
  const [isLoadingAssociateScore, setIsLoadingAssociateScore] = useState(false);

  const selectedCategory = useSelector((state) => state.category?.selectedCategory) || 'All';
  const dispatch = useDispatch();

  const handleCategoryChange = (event) => {
    dispatch(setSelectedCategory(event.target.value));
  };

  const toLocalDateString = useCallback((date) => {
    if (!date) return null;
    const tzOffset = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() - tzOffset).toISOString().slice(0, 10);
  }, []);

  const selectedDateFromRedux = useSelector((state) => state?.customization?.selectedDate);

  const selectedDate = useMemo(() => {
    if (!selectedDateFromRedux?.end_date) return null;
    return toLocalDateString(selectedDateFromRedux.end_date);
  }, [toLocalDateString, selectedDateFromRedux]);

  const selectedDate2 = useMemo(() => selectedDateFromRedux || null, [selectedDateFromRedux]);

  useEffect(() => {
    // Initialize data when dates are not available
    if (!selectedDate || !selectedDate2) {
      setcapture7days([]);
      settestfullness7days([]);
      setOsa7days([]);
      setanomalycount([]);
      setassociatescore([]);
      setbrandwiseosaandtester_osa([]);
      setbrandwiseosaandtester_tester([]);
    }
  }, [selectedDate, selectedDate2]);

  const get7daysdata = useCallback(async () => {
    if (!selectedDate2 || !store) {
      setcapture7days([]);
      settestfullness7days([]);
      setOsa7days([]);
      return;
    }

    try {
      const result = await getsevendaydata(selectedDate2, store, selectedCategory.toLowerCase());
      if (!result) {
        throw new Error('No data received');
      }

      setcapture7days(Array.isArray(result.capture7days) ? result.capture7days : []);
      settestfullness7days(Array.isArray(result.testerFullness7days) ? result.testerFullness7days : []);
      setOsa7days(Array.isArray(result.OSA7days) ? result.OSA7days : []);
    } catch (error) {
      console.error('Error in get7daysdata:', error);
      setcapture7days([]);
      settestfullness7days([]);
      setOsa7days([]);
      setSnackbarConfig({
        open: true,
        message: 'Failed to fetch 7 days data',
        severity: 'error'
      });
    }
  }, [store, selectedDate2, selectedCategory]);

  useEffect(() => {
    get7daysdata(selectedDate);
  }, [get7daysdata, selectedDate]);

  const handleButtonClick = useCallback((button) => {
    setActiveButton(button);
  }, []);

  const handleCloseSnackbar = useCallback(() => {
    setSnackbarConfig((prev) => ({ ...prev, open: false }));
  }, []);

  const getanomalydetails = useCallback(async () => {
    try {
      if (!selectedDate2 || !store) return;

      const res = await storeanomalycount(selectedDate2, store, selectedCategory.toLowerCase());
      if (res) {
        setanomalycount(res);
        setAnomaliesLoading(false);
      }
    } catch (error) {
      console.error('Error in getanomalydetails:', error);
      setanomalycount(null);
      setAnomaliesLoading(false);
    }
  }, [store, selectedDate2, selectedCategory]);

  useEffect(() => {
    getanomalydetails();
  }, [getanomalydetails]);

  const fetchAssociateScore = useCallback(async () => {
    try {
      if (!selectedDate2 || !store) return;
      setIsLoadingAssociateScore(true);
      const result = await associatescoreaforkpi(selectedDate2, store, selectedCategory.toLowerCase());
      setassociatescore(result || []);
    } catch (e) {
      console.error('Error in getassociatescore:', e);
      setassociatescore([]);
    } finally {
      setIsLoadingAssociateScore(false);
    }
  }, [store, selectedDate2, selectedCategory]);

  useEffect(() => {
    fetchAssociateScore();
  }, [fetchAssociateScore]);

  const calculateAverage = useCallback((data, field) => {
    if (!Array.isArray(data) || data.length === 0) return 'NA';
    if (data.length === 1 && (data[0]._id === null || data[0][field] === null)) return 'NA';
    const validScores = data.filter((item) => item[field] !== null);
    if (validScores.length === 0) return 'NA';
    const sum = validScores.reduce((acc, item) => acc + (parseFloat(item[field]) || 0), 0);
    return (sum / validScores.length).toFixed(1);
  }, []);

  const getbrandwiseosaandtesterscore = useCallback(async () => {
    try {
      if (!selectedDate2 || !store) return;

      setIsLoadingBrandScores(true);
      const [result1, result2] = await Promise.all([
        brandWiseOsaAndTesterScore(selectedDate2, store, selectedCategory.toLowerCase()),
        brandWiseOsaAndTesterScore(selectedDate2, store, selectedCategory.toLowerCase())
      ]);

      setbrandwiseosaandtester_osa(result1 || []);
      setbrandwiseosaandtester_tester(result2 || []);

      if (Array.isArray(result1) && result1.length > 0) {
        result1.sort((a, b) => a.OSA_Score - b.OSA_Score);
      }

      if (Array.isArray(result2) && result2.length > 0) {
        result2.sort((a, b) => a.testers_score - b.testers_score);
      }
    } catch (error) {
      console.error('Error in getbrandwiseosaandtesterscore:', error);
      setbrandwiseosaandtester_osa([]);
      setbrandwiseosaandtester_tester([]);
    } finally {
      setIsLoadingBrandScores(false);
    }
  }, [store, selectedDate2, selectedCategory]);

  const isDataAvailable = useCallback((data) => {
    return Array.isArray(data) && data.length > 0 && data[0]._id !== null;
  }, []);

  useEffect(() => {
    getbrandwiseosaandtesterscore();
  }, [getbrandwiseosaandtesterscore]);

  const getviewcaptureprogress = useCallback(async () => {
    try {
      if (!selectedDate2 || !store) return;

      const response = await storeviewcaptureprogress(selectedDate2, store, selectedCategory.toLowerCase());
      if (response) {
        setstoreviewcaptureprogres(response[0].captureProgress);
      }
    } catch (error) {
      console.error('Error in getviewcaptureprogress:', error);
      setstoreviewcaptureprogres(0);
    }
  }, [store, selectedDate2, selectedCategory]);

  useEffect(() => {
    getviewcaptureprogress();
  }, [getviewcaptureprogress]);

  const accentColLight = theme.palette.success.light;
  const accentColDark = theme.palette.success.dark;
  const progressChart = {
    options: {
      chart: {
        height: 180,
        type: 'radialBar',
        sparkline: {
          enabled: true
        }
      },
      colors: [accentColLight],
      plotOptions: {
        radialBar: {
          hollow: {
            margin: 0,
            padding: 0,
            size: '30%'
            // background: '#293450'
          },
          track: {
            dropShadow: {
              enabled: true,
              top: 2,
              left: 0,
              blur: 4,
              opacity: 0.15
            }
          },
          dataLabels: {
            show: false,
            name: {
              offsetY: -10,
              color: '#fff',
              fontSize: '13px'
            },
            value: {
              color: '#fff',
              fontSize: '30px',
              show: false
            }
          }
        }
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          type: 'vertical',
          gradientToColors: [accentColDark],
          stops: [0, 100]
        }
      },
      stroke: {
        // lineCap: 'round'
      }
      // labels: ['Progress']
    },
    series: [storeviewcaptureprogres ? storeviewcaptureprogres : 0],
    labels: ['A']
  };

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: isSmallScreen ? 300 : isMediumScreen ? 500 : 800,
    height: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: '15px'
  };

  const handleAssociateUploadComplete = useCallback((success) => {
    if (success) {
      setSnackbarConfig({
        open: true,
        message: 'File uploaded successfully!',
        severity: 'success'
      });
    } else {
      setSnackbarConfig({
        open: true,
        message: 'Error uploading file!',
        severity: 'error'
      });
    }
  }, []);

  const handleCloseAssociateScoreModal = useCallback(() => {
    setOpenAssociateScoreModal(false);
  }, []);

  const handleClickAssociateScoreModal = useCallback(() => {
    setOpenAssociateScoreModal(true);
  }, []);

  return (
    <div className="w-full">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Stack direction={isSmallScreen ? 'column' : 'row'} justifyContent={'space-between'}>
            <Typography variant="h3">Overview </Typography>
            {storeID ? <Typography variant="h6">Store ID: {storeID}</Typography> : <></>}
            <div className="flex space-x-2 sm:mt-2">
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <Select
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  displayEmpty
                  sx={{
                    backgroundColor: 'white',
                    '& .MuiSelect-select': {
                      py: 1
                    }
                  }}
                >
                  <MenuItem value="All">All</MenuItem>
                  <MenuItem value="Fragrance">Fragrance</MenuItem>
                  <MenuItem value="Beauty">Beauty</MenuItem>
                </Select>
              </FormControl>
            </div>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2.4}>
              <div style={{ height: '276px' }} className="flex flex-col">
                <Card className="border border-gray-300" sx={{ height: '276px' }}>
                  {isLoadingBrandScores ? (
                    <div className="flex  w-full  flex-col gap-1 p-3">
                      <div className="flex items-center justify-center gap-2 w-full">
                        <img src={popIcon} alt="pop" className="h-14 w-14" />
                        <div className="w-full">
                          <p className="text-3xl text-gray-500 ">NA</p>
                          <p className="text-lg font-semibold">OSA</p>
                        </div>
                        <IoMdSettings className="text-5xl cursor-not-allowed" />
                      </div>
                      <div className=" bg-slate-100 flex-grow overflow-y-auto h-[184px] p-2 rounded-lg scrollbar">
                        <Skeleton variant="rectangular" height={184} className="rounded-md" />
                      </div>
                    </div>
                  ) : (
                    <div className="flex  w-full  flex-col gap-1 p-3">
                      <div className="flex items-center justify-center gap-2 w-full">
                        <img src={popIcon} alt="pop" className="h-14 w-14" />
                        <div className="w-full">
                          <p className="text-3xl text-gray-500 ">
                            {calculateAverage(brandwiseosaandtester_osa, 'OSA_Score')}
                            {calculateAverage(brandwiseosaandtester_osa, 'OSA_Score') !== 'NA' && '%'}
                          </p>
                          <p className="text-lg font-semibold">OSA</p>
                        </div>
                        <IoMdSettings className="text-5xl cursor-not-allowed" />
                      </div>
                      <div className=" bg-slate-100 flex-grow overflow-y-auto h-[184px] p-2 rounded-lg scrollbar">
                        {isDataAvailable(brandwiseosaandtester_osa) ? (
                          brandwiseosaandtester_osa.map((item, index) => {
                            console.log('item', item.OSA_Score);
                            const percentage = Math.round(parseFloat(item.OSA_Score)) > 100 ? 100 : Math.round(parseFloat(item.OSA_Score));
                            const barcolor = percentage >= 99 ? '#00ac69' : percentage >= 95 ? '#f4a100' : '#ff413a';
                            return (
                              <div className="mt-2" key={index}>
                                <div className="flex gap-1 items-center justify-between">
                                  <div>
                                    {item._id?.toUpperCase()} :
                                    <span className="text-base font-semibold" style={{ color: barcolor }}>
                                      {' ' + percentage} %
                                    </span>
                                  </div>
                                  <Tooltip
                                    key={index}
                                    title={
                                      <div>
                                        <div className="mb-2 p-2">
                                          <p className="text-base">Bays Captured</p>
                                          <p className="text-base "> {item.no_of_bays_captured}</p>
                                        </div>
                                      </div>
                                    }
                                    disableHoverListener={true}
                                  >
                                    <IconButton>
                                      <FaCircleInfo className="text-xs" />
                                    </IconButton>
                                  </Tooltip>
                                </div>
                                <LinearProgress
                                  variant="determinate"
                                  value={percentage}
                                  className="rounded-lg"
                                  sx={{
                                    marginTop: '5px',
                                    backgroundColor: 'white', // Set color for unfilled part
                                    '& .MuiLinearProgress-bar': {
                                      backgroundColor: `${barcolor}` // Set color for filled part
                                    }
                                  }}
                                />
                              </div>
                            );
                          })
                        ) : (
                          <p className="text-base font-semibold text-gray-500">Currently No data available</p>
                        )}
                      </div>
                    </div>
                  )}
                </Card>
              </div>
            </Grid>

            <Grid item xs={12} sm={6} md={4} lg={3} xl={2.4}>
              <div style={{ height: '276px' }} className="flex flex-col">
                <Card className="border border-gray-300" sx={{ height: '276px' }}>
                  {isLoadingBrandScores ? (
                    <div className="flex  w-full  flex-col gap-1 p-3">
                      <div className="flex items-center justify-center gap-2 w-full">
                        <img src={popIcon} alt="pop" className="h-14 w-14" />
                        <div className="w-full">
                          <p className="text-3xl text-gray-500 ">NA</p>
                          <p className="text-lg font-semibold">Tester Score</p>
                        </div>
                        <IoMdSettings className="text-5xl cursor-not-allowed" />
                      </div>
                      <div className=" bg-slate-100 flex-grow overflow-y-auto h-[184px] p-2 rounded-lg scrollbar">
                        <Skeleton variant="rectangular" height={184} className="rounded-md" />
                      </div>
                    </div>
                  ) : (
                    <div className="flex  w-full  flex-col gap-1 p-3">
                      <div className="flex items-center justify-center gap-2 w-full">
                        <img src={popIcon} alt="pop" className="h-14 w-14" />
                        <div className="w-full">
                          <p className="text-3xl text-gray-500 ">
                            {calculateAverage(brandwiseosaandtester_tester, 'testers_score')}
                            {calculateAverage(brandwiseosaandtester_tester, 'testers_score') !== 'NA' && '%'}
                          </p>
                          <p className="text-lg font-semibold">Tester Score</p>
                        </div>
                        <IoMdSettings className="text-5xl cursor-not-allowed" />
                      </div>
                      <div className=" bg-slate-100 flex-grow overflow-y-auto h-[184px] p-2 rounded-lg scrollbar">
                        {isDataAvailable(brandwiseosaandtester_tester) ? (
                          brandwiseosaandtester_tester.map((item, index) => {
                            console.log('item', item.testers_score);
                            const percentage =
                              Math.round(parseFloat(item.testers_score)) > 100 ? 100 : Math.round(parseFloat(item.testers_score));
                            const barcolor = percentage >= 99 ? '#00ac69' : percentage >= 95 ? '#f4a100' : '#ff413a';
                            return (
                              <div className="mt-2" key={index}>
                                <div className="flex gap-1 items-center justify-between">
                                  <div>
                                    {item._id?.toUpperCase()} :
                                    <span className="text-base font-semibold" style={{ color: barcolor }}>
                                      {' ' + percentage} %
                                    </span>
                                  </div>
                                  <Tooltip
                                    key={index}
                                    title={
                                      <div>
                                        <div className="mb-2 p-2">
                                          <p className="text-base">Bays Captured</p>
                                          <p className="text-base "> {item.no_of_bays_captured}</p>
                                        </div>
                                      </div>
                                    }
                                    disableHoverListener={true}
                                  >
                                    <IconButton>
                                      <FaCircleInfo className="text-xs" />
                                    </IconButton>
                                  </Tooltip>
                                </div>
                                <LinearProgress
                                  variant="determinate"
                                  value={percentage}
                                  className="rounded-lg"
                                  sx={{
                                    marginTop: '5px',
                                    backgroundColor: 'white', // Set color for unfilled part
                                    '& .MuiLinearProgress-bar': {
                                      backgroundColor: `${barcolor}` // Set color for filled part
                                    }
                                  }}
                                />
                              </div>
                            );
                          })
                        ) : (
                          <p className="text-base font-semibold text-gray-500">Currently No data available</p>
                        )}
                      </div>
                    </div>
                  )}
                </Card>
              </div>
            </Grid>

            <Grid item xs={12} sm={6} md={4} lg={3} xl={2.4}>
              <div style={{ height: '276px' }} className="flex flex-col">
                <Card className="border border-gray-300" sx={{ height: '276px' }}>
                  {isLoadingAssociateScore ? (
                    <div className="flex w-full flex-col gap-1 p-3">
                      <div className="flex items-center justify-center gap-2 w-full">
                        <img src={associate} alt="pop" className="h-14 w-14" />
                        <div className="w-full">
                          <p className="text-3xl text-gray-500">NA</p>
                          <p className="text-lg font-semibold">Associate Score</p>
                        </div>
                        <IoMdSettings className="text-5xl cursor-not-allowed" />
                      </div>
                      <div className="bg-slate-100 flex-grow overflow-y-auto h-[184px] p-2 rounded-lg scrollbar">
                        <Skeleton variant="rectangular" height={184} className="rounded-md" />
                      </div>
                    </div>
                  ) : associatescore && associatescore.length > 0 ? (
                    <div className="flex w-full flex-col gap-1 p-3">
                      <div className="flex items-center justify-center gap-2 w-full">
                        <img src={associate} alt="pop" className="h-14 w-14" />
                        <div className="w-full">
                          <p className="text-3xl text-gray-500">
                            {(associatescore.reduce((acc, curr) => acc + curr.associate_score, 0) / associatescore.length).toFixed(1)}%
                          </p>
                          <p className="text-lg font-semibold">Associate Score</p>
                        </div>
                        <IoMdSettings className="text-5xl cursor-not-allowed" />
                        <Modal
                          open={openAssociateScoreModal}
                          onClose={handleCloseAssociateScoreModal}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                        >
                          <Box sx={modalStyle}>
                            <CsvModalAssociate onUploadComplete={handleAssociateUploadComplete} />
                          </Box>
                        </Modal>
                      </div>
                      <div className="bg-slate-100 flex-grow overflow-y-auto h-[184px] p-2 rounded-lg scrollbar">
                        {[...associatescore]
                          .sort((a, b) => a.associate_score - b.associate_score)
                          .map((item, index) => {
                            const barcolor = item.associate_score >= 99 ? '#00ac69' : item.associate_score >= 95 ? '#f4a100' : '#ff413a';
                            return (
                              <div className="mt-2" key={index}>
                                <div className="flex gap-1 items-center justify-between">
                                  <div>
                                    {item.user_name} :
                                    <span className="text-base font-semibold" style={{ color: barcolor }}>
                                      {' ' + item.associate_score}%
                                    </span>
                                  </div>
                                  <Tooltip
                                    title={
                                      <div>
                                        <div className="mb-2 p-2">
                                          <p className="text-base">Bays Captured</p>
                                          <p className="text-base">{item.no_of_bays_captured ? item.no_of_bays_captured : 0}</p>
                                        </div>
                                      </div>
                                    }
                                    disableHoverListener={true}
                                  >
                                    <IconButton>
                                      <FaCircleInfo className="text-xs" />
                                    </IconButton>
                                  </Tooltip>
                                </div>
                                <LinearProgress
                                  variant="determinate"
                                  value={item.associate_score}
                                  className="rounded-lg"
                                  sx={{
                                    marginTop: '5px',
                                    backgroundColor: 'white',
                                    '& .MuiLinearProgress-bar': {
                                      backgroundColor: barcolor
                                    }
                                  }}
                                />
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  ) : (
                    <div className="flex w-full flex-col gap-1 p-3">
                      <div className="flex items-center justify-center gap-2 w-full">
                        <img src={popIcon} alt="pop" className="h-14 w-14" />
                        <div className="w-full">
                          <p className="text-3xl text-gray-500">NA</p>
                          <p className="text-lg font-semibold">Associate Score</p>
                        </div>
                        <IoMdSettings className="text-5xl" onClick={handleClickAssociateScoreModal} />
                        <Modal
                          open={openAssociateScoreModal}
                          onClose={handleCloseAssociateScoreModal}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                        >
                          <Box sx={modalStyle}>
                            <CsvModalAssociate onUploadComplete={handleAssociateUploadComplete} type="associateStore" />
                          </Box>
                        </Modal>
                      </div>
                      <div className="bg-slate-100 flex-grow overflow-y-auto h-[184px] p-2 rounded-lg scrollbar">
                        <p className="text-base font-semibold text-gray-500">Currently No data available</p>
                      </div>
                    </div>
                  )}
                </Card>
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2.4}>
              <Card className="border border-gray-300" sx={{ height: '276px' }}>
                <div className="flex  w-full  flex-col gap-1 p-3">
                  <div className="flex items-center justify-center gap-2 w-full">
                    <img src={pog} alt="pop" className="h-14 w-14" />

                    <div className="w-full">
                      <p className="text-3xl text-gray-500 ">NA</p>
                      <p className="text-lg font-semibold">PoG</p>
                    </div>
                    <IoMdSettings className="text-5xl cursor-not-allowed" />
                  </div>
                  <div className=" bg-slate-100 flex-grow overflow-y-auto h-[184px] p-2 rounded-lg scrollbar">
                    <p className="text-base font-semibold text-gray-500">Currently No data available</p>
                  </div>
                </div>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4} lg={3} xl={2.4}>
              <Card
                className="border border-gray-300 h-full"
                sx={{
                  padding: '5px'
                }}
                style={{ height: '275px' }}
              >
                <RadarChart storeId={store} date={selectedDate} />
              </Card>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid ref={targetRef} className="mb-10" item xs={12} lg={9} xl={9.6}>
              <Card className="border border-gray-300" sx={{ height: '550px' }}>
                <LineChartToggle
                  capture7days={capture7days}
                  Osa7days={Osa7days}
                  testfullness7days={testfullness7days}
                  storeId={store}
                  date={selectedDate}
                  groups={isGroup}
                  activeButton={activeButton}
                  handleButtonClick={handleButtonClick}
                />
              </Card>
            </Grid>
            <Grid item className="mb-10" xs={12} lg={3} xl={2.4}>
              <div className=" flex flex-col gap-2 " style={{ height: '275px' }}>
                <Card
                  className="border border-gray-300 h-2/3"
                  style={{
                    padding: '5px'
                  }}
                >
                  <div className="flex items-center">
                    <div>
                      <Chart
                        options={progressChart.options}
                        series={progressChart.series}
                        type={progressChart.options.chart.type}
                        height={progressChart.options.chart.height}
                      />
                    </div>
                    <div className="flex gap-1 flex-col">
                      <div className="text-4xl font-semibold">{storeviewcaptureprogres ? storeviewcaptureprogres.toFixed(1) : 0}%</div>
                      <div className="text-sm font-semibold">Capture Progress</div>
                    </div>
                  </div>
                </Card>
                <Card
                  className="border border-gray-300 bg-[#ff413a] h-1/3"
                  style={{
                    padding: '10px'
                  }}
                >
                  <div className="flex w-full h-full">
                    <div className="w-1/2 h-full flex flex-col">
                      <span className="text-center text-white text-sm font-semibold">Missing Tester</span>
                      {!anomaliesLoading && anomalycount !== null ? (
                        <span className="text-center text-white  flex-grow flex flex-col justify-center text-3xl font-semibold">
                          {anomalycount && console.log('dds', anomalycount)}
                          {anomalycount.length > 0 ? anomalycount[0].missingTesterCount : 'NA'}
                        </span>
                      ) : (
                        <Skeleton variant="rectangular" height={184} className="rounded-md" />
                      )}
                    </div>
                    <div className="w-1/2 h-full flex flex-col border-l-2 border-t-0 border-b-0 border-l-white">
                      <span className="text-center text-white  text-sm font-semibold">Empty Shelf</span>
                      {!anomaliesLoading && anomalycount !== null ? (
                        <span className="text-center text-white  flex-grow flex flex-col justify-center text-3xl font-semibold">
                          {anomalycount.length > 0 ? anomalycount[0].emptyTrayCount : 'NA'}
                        </span>
                      ) : (
                        <Skeleton variant="rectangular" height={184} className="rounded-md" />
                      )}
                    </div>
                  </div>
                </Card>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Snackbar
        open={snackbarConfig.open}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        key={'bottom' + 'right'}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarConfig.severity} sx={{ width: '100%' }}>
          {snackbarConfig.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Overview;
