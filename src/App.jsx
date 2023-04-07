import { useState } from "react";

import "./App.css";
import * as d3 from "d3";

import RenderWorld from "./Components/RenderWorld";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <RenderWorld></RenderWorld>
    </div>
  );
}

export default App;
