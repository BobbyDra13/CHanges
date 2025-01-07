import React from 'react';
import { useTheme, Card, Stack, Grid, Typography, LinearProgress, Chip } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';

function PoPScoreKPICard() {
  const theme = useTheme();
  const disabledColor = theme.palette.grey[600]; // Darker grey for better visibility

  return (
    <Card sx={{ 
      paddingTop: 1.5, 
      paddingBottom: 2,
      backgroundColor: '#fff',
      position: 'relative'
    }}>
      <Stack spacing={0.5}>
        <Grid container alignItems="center" spacing={1} sx={{ paddingLeft: 1, paddingRight: 2.25 }}>
          <Grid item>
            <Typography sx={{ color: disabledColor }} variant="h3" color="textSecondary">
              POP Score
            </Typography>
          </Grid>
          <Grid item>
            <LockIcon sx={{ color: disabledColor, fontSize: '1rem' }} />
          </Grid>
        </Grid>

        <Grid container alignItems="center">
          <Grid item>
            <Typography variant="h3" sx={{ color: disabledColor, paddingLeft: 2.25, paddingRight: 2.25 }}>
              N/A
            </Typography>
          </Grid>
          <Grid item>
            <Chip
              variant="combined"
              sx={{ 
                backgroundColor: theme.palette.grey[200], 
                color: disabledColor, 
                ml: 1.25, 
                pl: 1,
                cursor: 'not-allowed'
              }}
              label="--"
              size="small"
            />
          </Grid>
        </Grid>

        <Stack spacing={2} sx={{ px: 2.25, py: 2 }}>
          <div>
            <div className="flex justify-between mb-1">
              <Typography variant="body2" sx={{ color: disabledColor }}>Fragrance</Typography>
              <Typography variant="body2" sx={{ color: disabledColor }}>
                N/A
              </Typography>
            </div>
            <LinearProgress
              variant="determinate"
              value={0}
              sx={{
                height: 8,
                borderRadius: 5,
                bgcolor: theme.palette.grey[100],
                '& .MuiLinearProgress-bar': {
                  borderRadius: 5,
                  backgroundColor: theme.palette.grey[300]
                }
              }}
            />
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <Typography variant="body2" sx={{ color: disabledColor }}>Beauty</Typography>
              <Typography variant="body2" sx={{ color: disabledColor }}>
                N/A
              </Typography>
            </div>
            <LinearProgress
              variant="determinate"
              value={0}
              sx={{
                height: 8,
                borderRadius: 5,
                bgcolor: theme.palette.grey[100],
                '& .MuiLinearProgress-bar': {
                  borderRadius: 5,
                  backgroundColor: theme.palette.grey[300]
                }
              }}
            />
          </div>
        </Stack>
      </Stack>
    </Card>
  );
}

export default PoPScoreKPICard;
