import React from 'react';
import { useTheme, Box, Card, Stack, Grid, Typography, LinearProgress, Chip } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

function PoPScoreKPICard() {
  const theme = useTheme();
  const disabledColor = theme.palette.grey[600]; // Darker grey for better visibility

  return (
    <Card
      sx={{
        paddingTop: 2,
        paddingBottom: 2,
        backgroundColor: '#fff',
        position: 'relative'
      }}
    >
      <Stack spacing={0.5}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, width: '100%' }}>
          <Grid item>
            {/* <Grid container alignItems="center" spacing={1} sx={{ paddingLeft: 1, paddingRight: 2.25 ,display: 'flex', justifyContent: 'flex-start' }}> */}
            <Typography
              sx={{ color: disabledColor, display: 'flex', justifyContent: 'flex-start', marginX: 2 }}
              variant="h4"
              color="textSecondary"
            >
              POP Score
              <Grid item>
                <LockIcon sx={{ color: disabledColor, fontSize: '1rem' }} />
              </Grid>
            </Typography>
            <Grid sx={{ display: 'flex', justifyContent: 'flex-start', paddingLeft: 2.25 }}>
              <Grid
                item
                sx={{
                  backgroundColor: disabledColor,
                  color: 'white',
                  pl: 0,
                  pr: 0,
                  width: '4rem',
                  borderRadius: 2,
                  fontWeight: 10,
                  marginRight: 2,
                  display: 'flex', // Add flex display
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Typography variant="h6" sx={{ fontSize: '1rem', fontWeight: 'bold', color: 'white', paddingLeft: 0, paddingRight: 0 }}>
                  N/A
                </Typography>
              </Grid>

              {/* <Grid item>
            <LockIcon sx={{ color: disabledColor, fontSize: '1rem' }} />
          </Grid> */}
              {/* </Grid> */}

              <Grid item>
                <Chip
                  variant="combined"
                  sx={{
                    color: disabledColor,

                    cursor: 'not-allowed'
                  }}
                  label="--"
                  size="small"
                />
              </Grid>
            </Grid>
          </Grid>

          <LocalOfferIcon style={{ paddingBottom: '20px', paddingRight: '20px', color: disabledColor, fontSize: '3rem' }} />
        </Box>

        <Stack spacing={2} sx={{ px: 2.25, py: 2 }}>
          <div>
            <div className="flex justify-between mb-1">
              <Typography variant="body2" sx={{ color: disabledColor, fontWeight: 500 }}>
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
                <Typography variant="body2" sx={{ color: disabledColor, fontWeight: 500, fontSize: '10px' }}>
                  N/A
                </Typography>
              </Box>
            </div>
            <LinearProgress
              variant="determinate"
              value={0}
              sx={{
                height: 10,
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
              <Typography variant="body2" sx={{ color: disabledColor }}>
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
                <Typography variant="body2" sx={{ color: disabledColor, fontSize: '10px' }}>
                  N/A
                </Typography>
              </Box>
            </div>
            <LinearProgress
              variant="determinate"
              value={0}
              sx={{
                height: 10,
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
