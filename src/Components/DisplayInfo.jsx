import { Card, CardContent, Paper, Typography } from "@mui/material";

import { useParams } from "../Context/context";

const DisplayInfo = () => {
  const { basicInfo } = useParams();

  const { name, population, area, capital, languages } = basicInfo;

  const handleNumberFormat = (number = 0) => {
    return new Intl.NumberFormat("en", { notation: "compact" }).format(number);
  };

  const handleLanguages = (language = { test: 0 }) => {
    return Object.entries(language);
  };

  return (
    <Paper
      className="info-displayer"
      style={{ transform: "translateX(500px)", transition: "transform 250ms ease-in-out" }}>
      <aside>
        <h2 style={{ textAlign: "center" }}>About Country</h2>
        <Card sx={{ maxWidth: "400px" }}>
          <CardContent>
            <Typography variant="h6" component={"p"}>
              Country Name: {name}
            </Typography>
            <Typography variant="h6">Capital: {capital}</Typography>
            <Typography variant="h6">
              Languages: {handleLanguages(languages).map((language) => `${language[1]}, `)}
            </Typography>
            <Typography variant="h6">Population: {handleNumberFormat(population)}</Typography>
            <Typography variant="h6">Area: {handleNumberFormat(area)}</Typography>
          </CardContent>
        </Card>

        <div>test 2</div>
      </aside>
    </Paper>
  );
};

export default DisplayInfo;
