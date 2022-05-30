import { Box, LinearProgress, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CoinInfo from "../components/CoinInfo";
import { SingleCoin } from "../config/api";
import { GetCryptoContext } from "../store/cryptoContext";
import ReactHtmlParser from "react-html-parser";
import grid from "../grid/grid";

const PageCoins = (props) => {
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const { currency, symbol } = GetCryptoContext();

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const heading = {
    fontWeight: "bold",
    marginBottom: 2,
    fontFamily: "Montserrat",
  };
  const description = {
    width: "100%",
    fontFamily: "Montserrat",
    padding: 2,
    paddingBottom: 2,
    paddingTop: 0,
    textAlign: "justify",
  };

  useEffect(() => {
    const fetchCoin = async () => {
      const { data } = await axios.get(SingleCoin(id));

      if (currency === "EGP") {
        data.market_data.current_price["usd".toLowerCase()] =
          data.market_data.current_price["usd".toLowerCase()] * 18.6;

        setCoin(data);
        return;
      }
      setCoin(data);
    };
    fetchCoin();
  }, [id, currency]);

  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;

  return (
    <Box
      sx={grid("block", "", "", "flex", {
        height: "100vh",
        justifyContent: "center",
        paddingTop: "5px",

        gap: 2,
      })}
    >
      <Box sx={grid("block")} flex={1}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            height={200}
            src={coin?.image?.large}
            style={{ marginBottom: 20 }}
            alt={coin?.name}
          />

          <Typography variant="h3" sx={heading}>
            {coin?.name}
          </Typography>
          <Typography variant="subtitle1" sx={description}>
            {ReactHtmlParser(coin?.description?.en.split(". ")[0])}.
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            padding: 2,
            flexDirection: "column",
            justifyContent: "start",
            fontSize: { xs: "1rem", sm: "1.5rem" },
          }}
        >
          <span style={{ display: "flex", width: "100%" }}>
            <Typography
              variant="h5"
              sx={{ fontSize: { xs: "1.3rem", sm: "1.5rem" }, ...heading }}
            >
              Rank:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              sx={{

                fontFamily: "Montserrat",
              }}

            >
              {numberWithCommas(coin?.market_cap_rank)}
            </Typography>
          </span>

          <span style={{ display: "flex" }}>
            <Typography variant="h5" sx={{ fontSize: { xs: "1rem", sm: "1.5rem" }, ...heading }}>
              Current Price:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol + " "}
              {numberWithCommas(
                coin?.market_data.current_price["usd".toLowerCase()].toFixed(2)
              )}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" sx={{ fontSize: { xs: "1rem", sm: "1.5rem" }, ...heading }}>
              Market Cap:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol + " "}
              {numberWithCommas(
                coin?.market_data.market_cap["usd".toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </Typography>
          </span>
        </Box>
      </Box>

      <Box flex={2}>
        {" "}
        <CoinInfo CoinName={coin?.name} coin={coin} />
      </Box>
    </Box>
  );
};
export default PageCoins;
