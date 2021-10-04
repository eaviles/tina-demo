import * as React from 'react';
// import { Suspense } from 'react';
import {
  Canvas,
} from '@react-three/fiber'
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from '@mui/material/styles';


import Info from './components/Info';
import Noodle from './components/Noodle';
import Country from './components/Country';
import Loader from './components/Loader';


let theme = createTheme({
  palette: {
    primary: {
      main: '#FF7F50',
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
  const [canvas, setCanvas] = React.useState(<Loader />);
  const [hums, setHums] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch("https://longesthum.xyz/api/gethums")
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data) {
          setHums(data);
        }
      })
      .catch(console.log)
      .finally(() => setLoading(false))
  }, []);

  const handleCountryClose = () => {
    //this is a hacky way to have user interaction trigger audio
    console.log('filename:', hums[0].fileName)
    const canv = () => {
      return (
        <Canvas style={canvasStyle} shadows dpr={[1, 2]} camera={{ position: [-1, 1.5, 2], fov: 25 }}>
          <React.Suspense fallback={null}>
            {hums && <Noodle position-z={0} url={"https://freesound.org/data/previews/545/545952_4984902-lq.mp3"} />}
            {/* {hums && hums.map(hum=><Noodle position-z={0} url={`https://thelongesthumstore.sgp1.digitaloceanspaces.com/${fileName.fileName}`} />} */}
          </React.Suspense>
        </Canvas>
      )
    }
    setCountry(false);
    setCanvas(canv)
  }

  return (
    <ThemeProvider theme={theme}>
      <div style={rootStyle}>
        {canvas}
        {loading && <Loader />}
        {/* <Audio /> */}
        <Info />
        <Country country={country} handleCountryClose={handleCountryClose} />
      </div>
    </ThemeProvider>
  );
}

export default App;
