import { Box, Stack, Typography } from "@mui/material";

const Navbar = () => {
  return (
    <Stack direction={"row"} spacing={2} justifyContent={"space-around"}>
      <Typography>Country Name</Typography>
      <Box>search</Box>
      <Box>reset</Box>
    </Stack>
  );
};

export default Navbar