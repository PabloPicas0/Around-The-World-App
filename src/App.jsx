import RenderWorld from "./Components/RenderWorld";
import Navbar from "./Components/Navbar";
import DisplayInfo from "./Components/DisplayInfo";

import { ParamsProvider } from "./Context/context";

import "./App.css";

// TODO
// Sync search field with info api
// Work on mobile version

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
