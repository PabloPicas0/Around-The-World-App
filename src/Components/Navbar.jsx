import { Autocomplete, Box, Stack, TextField, Typography } from "@mui/material";

import { useParams } from "../Context/context";

const Navbar = () => {
  const { countryData } = useParams();

  const handleOption = () => {
    if (countryData) {
      const { geometries } = countryData.objects.countries;

      return geometries
        .map((element) => {
          return element.properties.name;
        })
        .sort((a, b) => {
          if (a < b) {
            return -1;
          }
          if (a > b) {
            return 1;
          }
          return 0;
        });
    }
    return ["Loading..."];
  };

  return (
    <Stack direction={"row"} spacing={2} justifyContent={"space-around"}>
      <Autocomplete
        id="select-box"
        sx={{ width: 280 }}
        options={handleOption()}
        renderInput={(params) => <TextField {...params} label="Find Country" />}>
        search
      </Autocomplete>
      <Typography>Country name</Typography>
      <Box>reset</Box>
    </Stack>
  );
};

export default Navbar;
