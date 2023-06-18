import RenderWorld from "./Components/RenderWorld";
import Navbar from "./Components/Navbar";
import DisplayInfo from "./Components/DisplayInfo";

import { ParamsProvider } from "./Utils/context";

import "./App.css";

// TODO
// Add third API with news or someting like that about country https://api.unsplash.com/
// Consider change API with coutry info to https://restcountries.com/#rest-countries

function App() {
  return (
    <>
      <ParamsProvider>
        <Navbar />
        <RenderWorld />
        <DisplayInfo />
      </ParamsProvider>
    </>
  );
}

export default App;
