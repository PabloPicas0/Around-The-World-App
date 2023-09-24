import RenderWorld from "./Components/RenderWorld";
import Navbar from "./Components/Navbar";
import DisplayInfo from "./Components/DisplayInfo";

import "./App.css";

import { Box, Container } from "@mui/material";

import { useParams } from "./Utils/context";


import ImageDialog from "./Components/ImageDialog";

const boxStyles = {
  display: "grid",
  gridTemplateColumns: { xs: "1fr", md: "auto 500px" },
  gridTemplateRows: "auto 1fr",
  height: "100vh",
  minHeight: "100vh",
};

function App() {
  const { showInfo } = useParams();
  const { width } = window.screen;

  return (
    <Container disableGutters maxWidth={false}>
      <Box
        sx={{
          ...boxStyles,
          overflow: (width < 960 && !showInfo) || width > 960 ? "hidden" : "visible",
        }}>
        <Navbar />
        <RenderWorld />
        <DisplayInfo />
        <ImageDialog />
      </Box>
    </Container>
  );
}

export default App;
