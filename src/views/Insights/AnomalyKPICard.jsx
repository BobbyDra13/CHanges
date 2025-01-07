import React, { useMemo } from 'react';
import { useTheme, Card, Stack, Grid, Typography, LinearProgress, Chip, Skeleton } from '@mui/material';
import { useSelector } from 'react-redux';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

function AnomalyKPICard({ kpiData, prevKpiData, loading }) {
  const theme = useTheme();
  const dropdownValue = useSelector((state) => state.customization.selectedRange);

  // Calculate total anomalies (sum of empty trays and missing testers)
  const calculateTotalAnomalies = (data) => {
    if (!data) return 0;
    return parseInt(data.Total_empty_tray_count || 0) + parseInt(data.Total_missing_tester_count || 0);
  };

  // Calculate difference
  const diff = useMemo(() => {
    if (dropdownValue === 'Custom Range') return 0;

    const currentTotal = !kpiData ? 0 : calculateTotalAnomalies(kpiData);
    const prevTotal = !prevKpiData ? 0 : calculateTotalAnomalies(prevKpiData);
    return currentTotal - prevTotal; // Using toFixed(0) since we're dealing with whole numbers
  }, [kpiData, prevKpiData, dropdownValue]);

  const totalAnomalies = useMemo(() => {
    return calculateTotalAnomalies(kpiData);
  }, [kpiData]);

  return (
    <Card sx={{ paddingTop: !loading ? 2.25 : 0, paddingBottom: 2.25 }}>
      <Stack spacing={0.5}>
        <Typography sx={{ color: theme.palette.error.main, paddingLeft: 2.25, paddingRight: 2.25 }} variant="h3" color="textSecondary">
          Anomalies
        </Typography>
        <Grid container alignItems="center">
          <Grid item>
            {!loading ? (
              <Typography variant="h3" sx={{ color: 'chocolate', paddingLeft: 2.25, paddingRight: 2.25 }}>
                {kpiData ? totalAnomalies : 'N/A'}
              </Typography>
            ) : (
              <Skeleton
                sx={{ marginLeft: 2.25, marginTop: 0.75, marginRight: 2.25 }}
                animation="wave"
                variant="rounded"
                width={82}
                height={35}
              />
            )}
          </Grid>
          {!loading && diff !== 0 && dropdownValue !== 'Custom Range' && (
            <Grid item>
              <Chip
                variant="combined"
                sx={{ backgroundColor: diff <= 0 ? '#10B981' : '#FF6761', color: 'white', ml: 1.25, pl: 1 }}
                icon={
                  <>
                    {diff > 0 && <TrendingUpIcon style={{ fontSize: '1rem', color: 'inherit' }} />}
                    {diff <= 0 && <TrendingDownIcon style={{ fontSize: '1rem', color: 'inherit' }} />}
                  </>
                }
                label={`${diff <= 0 ? '-' : '+'}${Math.abs(diff)}`}
                size="small"
              />
            </Grid>
          )}
        </Grid>

        <Stack spacing={2} sx={{ px: 2.25, py: 2 }}>
          <div>
            <div className="flex justify-between mb-1">
              <Typography variant="body2" className="text-gray-600">
                Fragrance
              </Typography>
              <Typography variant="body2" className="text-gray-600">
                {loading ? '0' : `${kpiData?.Fragrance_total_anomaly_bays || '0'}`}
              </Typography>
            </div>
            <LinearProgress
              variant="determinate"
              value={loading ? 0 : Math.min((parseFloat(kpiData?.Fragrance_total_anomaly_bays || 0) / (totalAnomalies || 1)) * 100, 100)}
              sx={{
                height: 8,
                borderRadius: 5,
                bgcolor: theme.palette.grey[200],
                '& .MuiLinearProgress-bar': {
                  borderRadius: 5,
                  backgroundColor: '#FF6761'
                }
              }}
            />
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <Typography variant="body2" className="text-gray-600">
                Beauty
              </Typography>
              <Typography variant="body2" className="text-gray-600">
                {loading ? '0' : `${kpiData?.Beauty_total_anomaly_bays || '0'}`}
              </Typography>
            </div>
            <LinearProgress
              variant="determinate"
              value={loading ? 0 : Math.min((parseFloat(kpiData?.Beauty_total_anomaly_bays || 0) / (totalAnomalies || 1)) * 100, 100)}
              sx={{
                height: 8,
                borderRadius: 5,
                bgcolor: theme.palette.grey[200],
                '& .MuiLinearProgress-bar': {
                  borderRadius: 5,
                  backgroundColor: '#FF6761'
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
