import { useState } from "react";

import "./App.css";
import * as d3 from "d3";

import RenderWorld from "./Components/RenderWorld";

const w = 960;
const h = 600;

function App() {
  return (
    <svg width={w} height={h}>
      <RenderWorld></RenderWorld>
    </svg>
  );
}

export default App;
