import * as React from 'react';
import {
  Canvas,
} from '@react-three/fiber'
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from '@mui/material/styles';  

import Info from './components/Info';
import Wire from './components/Wire';
import Country from './components/Country';

let theme = createTheme({
  palette: {
    primary: {
      main:'#FF7F50',
    },
    secondary: {
      main: '#8a8a8a',
    },
  },
});

theme = responsiveFontSizes(theme);

const rootStyle = {
  position: 'absolute',
  display: 'inline-block',
  height: '100vh',
  width: '100vw',
}

const canvasStyle = {
  position: 'absolute',
}

function App() {
  const [country, setCountry] = React.useState(true);

  const handleCountryClose = () => {
    setCountry(false);
  }

  return (
    <ThemeProvider theme={theme}>
      <div style={rootStyle}>
        <Canvas style={canvasStyle}>
          <Wire />
        </Canvas>
        <Info />
        <Country country={country} handleCountryClose={handleCountryClose} />
      </div>
    </ThemeProvider>
  );
}

export default App;
