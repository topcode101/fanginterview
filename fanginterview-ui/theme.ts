import { createTheme, ThemeOptions } from '@mui/material/styles';

const themeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#ffff',
    },
    // secondary: {
    //   main: '#f50057',  // blood
    // },
  },
};

const theme = createTheme(themeOptions)

export default theme;