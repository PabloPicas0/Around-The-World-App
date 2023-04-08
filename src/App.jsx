import "./App.css";

import RenderWorld from "./Components/RenderWorld";

// Dimmensions for svg element 
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
