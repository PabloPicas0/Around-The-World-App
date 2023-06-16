import RenderWorld from "./Components/RenderWorld";
import Navbar from "./Components/Navbar";
import DisplayInfo from "./Components/DisplayInfo";

import { ParamsProvider } from "./Context/context";

import "./App.css";

// TODO
// Sync search field with info api
// Reset button resets DisplayInfo component too
// Add slide animation for DisplayInfo component

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
