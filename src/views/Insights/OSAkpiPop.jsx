import React, { useMemo } from 'react';
import { useTheme, Card, Stack, Grid, Typography, LinearProgress, Chip, Skeleton } from '@mui/material';
import { useSelector } from 'react-redux';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

function OSAkpiPop({ kpiData, prevKpiData, loading }) {
  const theme = useTheme();
  const dropdownValue = useSelector((state) => state.customization.selectedRange);

  // Calculate difference
  const diff = useMemo(() => {
    if (dropdownValue === 'Custom Range') return 0;

    const currentScore = !kpiData ? 0 : kpiData.AvgOsaScore;
    const prevScore = !prevKpiData ? 0 : prevKpiData.AvgOsaScore;
    return currentScore - prevScore;
  }, [kpiData, prevKpiData, dropdownValue]);

  return (
    <Card sx={{ paddingTop: !loading ? 2.25 : 0, paddingBottom: 2.25 }}>
      <Stack spacing={0.5}>
        <Typography sx={{ color: theme.palette.success.main, paddingLeft: 2.25, paddingRight: 2.25 }} variant="h3" color="textSecondary">
          OSA
        </Typography>
        <Grid container alignItems="center">
          <Grid item>
            {!loading ? (
              <Typography variant="h3" sx={{ color: 'chocolate', paddingLeft: 2.25, paddingRight: 2.25 }}>
                {kpiData ? `${kpiData.AvgOsaScore}%` : 'N/A'}
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
                sx={{ backgroundColor: diff >= 0 ? '#10B981' : '#FF6761', color: 'white', ml: 1.25, pl: 1 }}
                icon={
                  <>
                    {diff >= 0 && <TrendingUpIcon style={{ fontSize: '1rem', color: 'inherit' }} />}
                    {diff < 0 && <TrendingDownIcon style={{ fontSize: '1rem', color: 'inherit' }} />}
                  </>
                }
                label={`${diff >= 0 ? '+' : ''}${diff.toFixed(2)}%`}
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
                {loading ? '0%' : `${kpiData?.FragranceAvgOsaScore || '0'}%`}
              </Typography>
            </div>
            <LinearProgress
              variant="determinate"
              value={loading ? 0 : parseFloat(kpiData?.FragranceAvgOsaScore || 0)}
              sx={{
                height: 8,
                borderRadius: 5,
                bgcolor: theme.palette.grey[200],
                '& .MuiLinearProgress-bar': {
                  borderRadius: 5,
                  backgroundColor: '#ff8f00'
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
                {loading ? '0%' : `${kpiData?.BeautyAvgOsaScore || '0'}%`}
              </Typography>
            </div>
            <LinearProgress
              variant="determinate"
              value={loading ? 0 : parseFloat(kpiData?.BeautyAvgOsaScore || 0)}
              sx={{
                height: 8,
                borderRadius: 5,
                bgcolor: theme.palette.grey[200],
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

export default OSAkpiPop;
