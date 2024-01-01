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
          backgroundColor: theme.palette.primary.light,
          borderColor: theme.palette.primary.main,
          '&.MuiChip-lightError': {
            color: theme.palette.error.dark,
            backgroundColor: theme.palette.error.light,
            borderColor: theme.palette.error.main
          },
          '&.MuiChip-lightSuccess': {
            color: theme.palette.success.dark,
            backgroundColor: theme.palette.success.light,
            borderColor: theme.palette.success.main
          },
          '&.MuiChip-lightWarning': {
            color: theme.palette.warning.dark,
            backgroundColor: theme.palette.warning.light,
            borderColor: theme.palette.warning.main
          }
        }
      }
    }
  };
}
