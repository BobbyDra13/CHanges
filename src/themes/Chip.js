// ==============================|| OVERRIDES - CHIP ||============================== //

export default function Chip(theme) {
  return {
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          '&:active': {
            boxShadow: 'none'
          }
        },
        sizeLarge: {
          fontSize: '1rem',
          height: 40
        },
        light: {
          color: theme.palette.primary.dark,
<<<<<<< HEAD
          backgroundColor: theme.palette.primary.light,
          borderColor: theme.palette.primary.main,
          '&.MuiChip-lightError': {
            color: theme.palette.error.dark,
            backgroundColor: theme.palette.error.light,
=======
          bgcolor: theme.palette.primary.light,
          borderColor: theme.palette.primary.main,
          '&.MuiChip-lightError': {
            color: theme.palette.error.dark,
            bgcolor: theme.palette.error.light,
>>>>>>> 2a90240c57e011d4a69c4ed616d203686d2904b6
            borderColor: theme.palette.error.main
          },
          '&.MuiChip-lightSuccess': {
            color: theme.palette.success.dark,
<<<<<<< HEAD
            backgroundColor: theme.palette.success.light,
=======
            bgcolor: theme.palette.success.light,
>>>>>>> 2a90240c57e011d4a69c4ed616d203686d2904b6
            borderColor: theme.palette.success.main
          },
          '&.MuiChip-lightWarning': {
            color: theme.palette.warning.dark,
<<<<<<< HEAD
            backgroundColor: theme.palette.warning.light,
=======
            bgcolor: theme.palette.warning.light,
>>>>>>> 2a90240c57e011d4a69c4ed616d203686d2904b6
            borderColor: theme.palette.warning.main
          }
        }
      }
    }
  };
}
