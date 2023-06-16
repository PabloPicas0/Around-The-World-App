import { Paper } from "@mui/material";
import { useParams } from "../Context/context";

const DisplayInfo = () => {
  const { basicInfo } = useParams();

  const { name, population, area } = basicInfo;

  const handleNumberFormat = (number = 0) => {
    return new Intl.NumberFormat("en", { notation: "compact" }).format(number);
  };

  return (
    <Paper className="info-displayer">
      <aside>
        <div>
          <ul>
            <li>Country Name: {name}</li>
            <li>Country Population: {handleNumberFormat(population)}</li>
            <li>Country Area: {handleNumberFormat(area)}</li>
          </ul>
        </div>

        <div>test 2</div>
      </aside>
    </Paper>
  );
};

export default DisplayInfo;
