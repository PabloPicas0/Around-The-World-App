import RenderWorld from "./Components/RenderWorld";
import Navbar from "./Components/Navbar";
import DisplayInfo from "./Components/DisplayInfo";

import "./App.css";

import { Box, Container } from "@mui/material";

import ImageDialog from "./Components/ImageDialog";

const boxStyles = {
  display: "grid",
  gridTemplateColumns: { xs: "1fr", md: "auto 500px" },
  gridTemplateRows: "auto 1fr",
  overflowX: "hidden",
  height: "100vh",
  minHeight: "100vh",
};

function App() {
  return (
    <Container disableGutters maxWidth={false}>
      <Box sx={boxStyles}>
        <Navbar />
        <RenderWorld />
        <DisplayInfo />
        <ImageDialog />
      </Box>
    </Container>
  );
}

export default App;
