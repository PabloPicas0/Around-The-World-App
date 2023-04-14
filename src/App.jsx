import RenderWorld from "./Components/RenderWorld";
import Navbar from "./Components/Navbar";
import { ParamsProvider } from "./Context/context";

import "./App.css";

function App() {
  return (
    <>
      <ParamsProvider>
        <Navbar />
        <RenderWorld />
      </ParamsProvider>
    </>
  );
}

export default App;
