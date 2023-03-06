import { createTheme, ThemeProvider } from '@mui/material';
import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import NavRoutes from './components/NavRoutes/NavRoutes';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: "#bfbfbf"
    }
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: ".8rem"
        }
      }
    }
  }
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <Header />
      <NavRoutes />
    </ThemeProvider>

  );
}

export default App;
