import axios from "axios";
import { useEffect, useState } from "react";
import { HistoricalChart } from "../config/api";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

//import SelectButton from "./SelectButton";
import { chartDays } from "../config/data";
import { GetCryptoContext } from "../store/cryptoContext";
import { Box, CircularProgress, Typography } from "@mui/material";
import SelectButton from "./SelectButton";
import grid from "../grid/grid";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CoinInfo = ({ coin , CoinName }) => {
  const [historicData, setHistoricData] = useState();
  const [days, setDays] = useState(1);
  const { currency } = GetCryptoContext();
  const [flag, setflag] = useState(false);

  const container = {
    width: "75%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    padding: 40,
  };

  const fetchHistoricData = async () => {
    try {
      const { data } = await axios.get(HistoricalChart(coin.id, days, "usd"));


      setflag(true);
      console.log(data);
      setHistoricData(data.prices);
    } catch (error) {
      setflag(true);
    }
  };

  console.log(coin);

  useEffect(() => {
    fetchHistoricData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days]);

  if (!historicData | (flag === false))
    return (
      <Box sx={{ width: "100%", textAlign: "center" }}>
        <CircularProgress style={{ color: "gold" }} size={250} thickness={1} />
      </Box>
    );

  return (
    <Box
      sx={{ width: { xs: "100%" } }}
      width="80%"
      minHeight="200px"
      margin="1% auto"
    >

<Typography
            variant="subtitle2"
            sx={{
              color: "darkgrey",
              textTransform: "capitalize",
              fontFamily: "Montserrat",
              textAlign:"center",
            fontSize: { xs: "1.3rem", sm: "1.5rem" }
            }}
          >
            <span style={{color:"gold"}}> History of {coin.name} </span> 
          </Typography>

      <Line
        data={{
          labels: historicData.map((coin) => {
            let date = new Date(coin[0]);
            let time =
              date.getHours() > 12
                ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                : `${date.getHours()}:${date.getMinutes()} AM`;
            return days === 1 ? time : date.toLocaleDateString();
          }),

          datasets: [
            {
              data: historicData.map((coin) => {
                if(currency==="EGP")
                return  coin[1] *18.6
              return  coin[1]}),
              label: `Price ( Past ${days} Days ) in ${currency}`,
              borderColor: "#EEBC1D",
            },
          ],
        }}
        options={{
          elements: {
            point: {
              radius: 1,
            },
          },
        }}
      />

      <Box
        sx={{
          ...grid("block", "flex"),
          marginTop: "10%",
          paddingBottom: 5,
          justifyContent: "space-around",
          width: "100%",
        }}
      >
        {chartDays.map((day) => (
          <SelectButton
            key={day.value}
            onClick={() => {
              setDays(day.value);
              setflag(false);
            }}
            selected={day.value === days}
          >
            {day.label}
          </SelectButton>
        ))}
      </Box>
    </Box>
  );
};

export default CoinInfo;
