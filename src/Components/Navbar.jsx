import { Box, Stack, Typography } from "@mui/material";

const Navbar = () => {
  return (
    <Stack direction={"row"} spacing={2} justifyContent={"space-around"}>
      <Typography>search</Typography>
      <Box>Country name</Box>
      <Box>reset</Box>
    </Stack>
  );
};

export default Navbar