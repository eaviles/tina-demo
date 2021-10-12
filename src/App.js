import * as React from "react";
// import { Suspense } from 'react';
// import { Canvas } from "@react-three/fiber";
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider
} from "@mui/material/styles";

import Info from "./components/Info";
import Country from "./components/Country";
import Loader from "./components/Loader";
import { Noise } from "noisejs";

const noise = new Noise(Math.random());

let theme = createTheme({
  palette: {
    primary: {
      main: "#FF7F50"
    },
    secondary: {
      main: "#8a8a8a"
    }
  }
});

theme = responsiveFontSizes(theme);

const rootStyle = {
  position: "absolute",
  display: "inline-block",
  height: "100vh",
  width: "100vw"
};

const canvasStyle = {
  position: "absolute"
};

function App() {
  const [country, setCountry] = React.useState(true);
  const [canvas, setCanvas] = React.useState(<Loader />);
  const [hums, setHums] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    console.warn("using effect");
    fetch("https://longesthum.xyz/api/gethums")
      .then(response => response.json())
      .then(data => {
        console.log(data.length, document.getElementById("curves"));
        if (data) {
          setHums(data);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleCountryClose = () => {
    //this is a hacky way to have user interaction trigger audio
    // console.log("filename:", hums[0].fileName);
    const canv = () => {
      return (
        <svg
          id="curves"
          style={canvasStyle}
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
        ></svg>
      );
    };
    setCountry(false);
    setCanvas(canv);

    let svg;
    setInterval(() => {
      if (svg === undefined) {
        svg = document.getElementById("curves");
      }
      let paths = svg.getElementsByTagName("*");
      for (let i = paths.length; i < hums.length; i += 1) {
        const newPath = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "path"
        );
        const b = 180 + Math.random() * 60;
        newPath.setAttributeNS(null, "stroke", `rgb(${b}, ${b}, ${b})`);
        newPath.setAttributeNS(null, "fill", "transparent");
        newPath.setAttributeNS(null, "stroke-width", 24);
        newPath.setAttributeNS(
          null,
          "filter",
          "drop-shadow( 0 10px 6px rgba(0, 0, 0, .2)"
        );
        svg.appendChild(newPath);
      }
      const { width, height } = svg.getBoundingClientRect();
      paths = svg.getElementsByTagName("*");
      const t = Date.now() * 0.00015;
      const mh = height / 2;
      const wd = width / 5;
      const sh = height * 0.75;

      for (let i = 0; i < paths.length; i += 1) {
        const path = paths[i];
        path.setAttributeNS(
          null,
          "d",
          `M ${[-12, mh + noise.simplex3(i, i + 1, t) * sh].join(", ")} C ${[
            wd * 1,
            mh + noise.simplex3(i, i + 2, t) * sh
          ].join(", ")}, ${[wd * 2, mh + noise.simplex3(i, i + 3, t) * sh].join(
            ", "
          )}, ${[wd * 3, mh + noise.simplex3(i, i + 4, t) * sh * 0.5].join(
            ", "
          )} S ${[wd * 4, mh + noise.simplex3(i, i + 5, t) * sh * 0.5].join(
            ", "
          )}, ${[wd * 5 + 12, mh + noise.simplex3(i, i + 6, t) * sh].join(
            ", "
          )}`
        );
      }
    }, 1000 / 20);
  };

  return (
    <ThemeProvider theme={theme}>
      <div id="container" style={rootStyle}>
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
