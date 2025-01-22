import React, { useMemo } from 'react';
import { Box, Card, Stack, Grid, Typography, LinearProgress, Chip, Skeleton } from '@mui/material';
import { useSelector } from 'react-redux';
import WarningIcon from '@mui/icons-material/Warning';
import Tooltip from '@mui/material/Tooltip';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';

function AnomalyKPICard({ kpiData, prevKpiData, loading }) {
  // const theme = useTheme();
  const dropdownValue = useSelector((state) => state.customization.selectedRange);

  // Calculate total anomalies (sum of empty trays and missing testers)
  const calculateTotalAnomalies = (data) => {
    if (!data) return 0;
    return parseInt(data.Total_empty_tray_count || 0) + parseInt(data.Total_missing_tester_count || 0);
  };

  // Calculate difference
  const { diff, comparisonPeriod } = useMemo(() => {
    if (dropdownValue === 'Custom Range') return { diff: 0, comparisonPeriod: '' };

    const currentTotal = !kpiData ? 0 : calculateTotalAnomalies(kpiData);
    const prevTotal = !prevKpiData ? 0 : calculateTotalAnomalies(prevKpiData);
    const difference = currentTotal - prevTotal;

    let period;
    switch (dropdownValue) {
      case 'Current Day':
        console.log('current day');
        period = 'vs Day Before Yesterday';
        break;
      case 'Last Week':
        period = 'vs Previous 7 Days';
        break;
      case 'Last 30 Days':
        period = 'vs Previous 30 Days';
        break;
      default:
        period = '';
    }

    return { diff: difference, comparisonPeriod: period };
    // return currentTotal - prevTotal; // Using toFixed(0) since we're dealing with whole numbers
  }, [kpiData, prevKpiData, dropdownValue]);
  const CustomChipLabel = () => (
    <Box sx={{ display: 'flex' }}>
      <Typography
        component="span"
        sx={{
          color: diff <= 0 ? '#10B981' : '#FF6761',
          fontWeight: 500,
          fontSize: '10px'
        }}
      >
        {`${diff >= 0 ? '+' : ''}${diff.toFixed(2)}`}
      </Typography>
      {diff !== 0 && (
        <ArrowOutwardIcon
          style={{
            color: diff <= 0 ? '#10B981' : '#FF6761',
            fontSize: '10px',
            transform: diff < 0 ? 'rotate(90deg)' : 'none',
            margin: '0 1px',
            marginTop: '2px'
          }}
        />
      )}
      <Typography
        component="span"
        sx={{
          color: 'black',
          fontWeight: 500,
          fontSize: '0.5rem',
          ml: 0.5,
          marginTop: '1px'
        }}
      >
        {comparisonPeriod}
      </Typography>
    </Box>
  );

  const totalAnomalies = useMemo(() => {
    return calculateTotalAnomalies(kpiData);
  }, [kpiData]);

  return (
    <Card sx={{ paddingTop: !loading ? 2.25 : 0, paddingBottom: 2.25 }}>
      <Stack spacing={0.5}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, width: '100%' }}>
          <Grid>
            <Typography sx={{ color: 'black', paddingLeft: 2.25, paddingRight: 2.25 }} variant="h4" color="textSecondary">
              Anomalies
            </Typography>
            {/* {!loading && diff !== 0 && dropdownValue !== 'Custom Range' && ( */}
            <Grid item sx={{ display: 'flex', justifyContent: 'flex-start', paddingLeft: 2.25 }}>
              <Grid
                item
                sx={{
                  backgroundColor: '#ff8f00',
                  color: 'white',
                  pl: 0,
                  pr: 0,
                  width: '4rem',
                  borderRadius: 2,
                  fontWeight: 10,
                  display: 'flex', // Add flex display
                  justifyContent: 'center',
                  alignItems: 'center'
                  // marginRight:2
                }}
              >
                {!loading ? (
                  <Typography variant="h6" sx={{ fontSize: '1rem', fontWeight: 'bold', color: 'white', paddingLeft: 0, paddingRight: 0 }}>
                    {kpiData ? totalAnomalies : 'N/A'}
                  </Typography>
                ) : (
                  <Skeleton
                    sx={{ marginLeft: 2.25, marginTop: 0.75, marginRight: 2.25 }}
                    animation="wave"
                    variant="rounded"
                    width={82}
                    height={20}
                  />
                )}
              </Grid>
              <Tooltip title={`Comparing ${dropdownValue.toLowerCase()} with the previous period`}>
                <Chip
                  variant="combined"
                  sx={{
                    backgroundColor: 'white',
                    ml: '2PX',
                    '& .MuiChip-label': {
                      color: diff <= 0 ? '#10B981' : '#FF6761',
                      fontWeight: 500,
                      fontSize: '0.875rem'
                    }
                  }}
                  // icon={
                  //   <>
                  //     {diff > 0 && <TrendingUpIcon style={{ fontSize: '1rem', color:'#10B981' }} />}
                  //     {diff <= 0 && <TrendingDownIcon style={{ fontSize: '1rem', color: '#FF6761' }} />}
                  //   </>
                  // }
                  label={<CustomChipLabel />}
                  // label={`${diff <= 0 ? '-' : '+'}${Math.abs(diff)}`}
                  size="small"
                />
              </Tooltip>
            </Grid>
            {/* // )} */}
          </Grid>

          <WarningIcon style={{ paddingBottom: '20px', paddingRight: '20px', color: '#FF6761', fontSize: '3rem' }} />
        </Box>

        <Stack spacing={2} sx={{ px: 2.25, py: 2 }}>
          <div>
            <div className="flex justify-between mb-1">
              <Typography variant="body2" className="text-gray-600" sx={{ color: 'text.primary', fontWeight: 500 }}>
                Fragrance
              </Typography>
              <Box
                sx={{
                  backgroundColor: '#FEE2E2',
                  color: '#DC2626',
                  px: 0.5,
                  py: 0.5,
                  borderRadius: 1
                }}
              >
                <Typography variant="body2" className="text-gray-600" sx={{ fontSize: '10px' }}>
                  {loading ? '0' : `${kpiData?.Fragrance_total_anomaly_bays || '0'}`}
                </Typography>
              </Box>
            </div>
            <LinearProgress
              variant="determinate"
              value={loading ? 0 : Math.min((parseFloat(kpiData?.Fragrance_total_anomaly_bays || 0) / (totalAnomalies || 1)) * 100, 100)}
              sx={{
                height: 10,
                borderRadius: 5,
                bgcolor: '#F3F4F6',
                '& .MuiLinearProgress-bar': {
                  borderRadius: 5,
                  backgroundColor: '#AB47BC'
                }
              }}
            />
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <Typography variant="body2" className="text-gray-600" sx={{ color: 'text.primary', fontWeight: 500 }}>
                Beauty
              </Typography>
              <Box
                sx={{
                  backgroundColor: '#FEE2E2',
                  color: '#DC2626',
                  px: 0.5,
                  py: 0.5,
                  borderRadius: 1
                }}
              >
                <Typography variant="body2" className="text-gray-600" sx={{ fontSize: '10px' }}>
                  {loading ? '0' : `${kpiData?.Beauty_total_anomaly_bays || '0'}`}
                </Typography>
              </Box>
            </div>
            <LinearProgress
              variant="determinate"
              value={loading ? 0 : Math.min((parseFloat(kpiData?.Beauty_total_anomaly_bays || 0) / (totalAnomalies || 1)) * 100, 100)}
              sx={{
                height: 10,
                borderRadius: 5,
                bgcolor: '#F3F4F6',
                '& .MuiLinearProgress-bar': {
                  borderRadius: 5,
                  backgroundColor: '#e91e63'
                }
              }}
            />
          </div>
        </Stack>
      </Stack>
    </Card>
  );
}

export default AnomalyKPICard;
