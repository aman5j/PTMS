// theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#800080', // your purple color
    },
    secondary: {
      main: '#a020f0', // lighter purple shade for accent/hover
    },
    background: {
      default: '#f5f5f5', // subtle light background
      paper: '#fff',
    },
  },
  typography: {
    fontFamily: `'Roboto', 'Helvetica', 'Arial', sans-serif`,
  },
});

export default theme;
