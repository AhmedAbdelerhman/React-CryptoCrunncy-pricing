import {
  LinearProgress,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { CoinList } from "../config/api";
import grid from "../grid/grid";
import { GetCryptoContext } from "../store/cryptoContext";

const CoinsTable = (props) => {
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { currency, symbol } = GetCryptoContext();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const rowStyle = {
    cursor: "pointer",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#4D4D4F",
    },
    fontFamily: "Montserrat",
  };
  const pagination = {
    "& .MuiPaginationItem-root": {
      color: "#4D4D4F",
    },
    backgroundColor:"gold",

    "& .MuiPaginationItem-root:hover": {
      backgroundColor: "#fff",
    },

   
  };

  const history = useHistory();

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  useEffect(() => {
    const fetchCoins = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(CoinList("usd"));
        let newData=[];
        if(currency==="EGP")
        {
          newData= data.map(coin=>{
            coin.current_price = coin.current_price*18.6
            return  coin
          })
          setCoins(newData);
          setIsLoading(false);

        return
        }
        setCoins(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);

      }
 
    };
    fetchCoins();
  }, [currency]);

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };
  return (
    <Container sx={{ textAlign: "center" }}>
      <Typography variant="h4" sx={{ margin: "9% auto", fontFamily: "Montserrat" }}>
        Cryptocurrency Prices by Market Cap
      </Typography>
      <TextField
        label="Search For a Crypto Currency.."
        variant="filled"
        sx={{
          marginBottom: "5%",
          width: "100%",
          outlineColor: "#fff",
          backgroundColor: "#fff",
          color: "black",
        }}
        onChange={(e) => setSearch(e.target.value)}
      />
      <TableContainer component={Paper}>
        {isLoading ? (
          <LinearProgress style={{ backgroundColor: "gold" }} />
        ) : (
          <Table aria-label="simple table">
            <TableHead sx={{ backgroundColor: "#EEBC1D" }}>
              <TableRow >
                {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                  <TableCell
                    sx={{
                      ...grid(`${(head === "24h Change" || head === "Market Cap")? "none":""}`,"","table-cell"),
                      color: "black",
                      fontWeight: "700",
                      fontFamily: "Montserrat",
                    }}
                    key={head}
                    align={head === "Coin" ? "" : "right"}
                  >
                    {head}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {handleSearch()
                .slice((page - 1) * 10, (page - 1) * 10 + 10)
                .map((row) => {
           
                  const profit = row.price_change_percentage_24h > 0;
                  return (
                    <TableRow 
                      onClick={() => history.push(`/coins/${row.id}`)}
                      sx={rowStyle}
                      key={row.name}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{
                          display: "flex",
                          gap:{xs:1 ,md:8 }
                        }}
                      >
                        <img
                          src={row?.image}
                          alt={row.name}
                          height="50"
                          style={{ marginBottom: 10 }}
                        />
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <span
                            style={{
                              textTransform: "uppercase",
                              fontSize: 22,
                            }}
                          >
                            {row.symbol}
                          </span>
                          <span style={{ color: "darkgrey" }}>{row.name}</span>
                        </div>
                      </TableCell>
                      <TableCell align="right">
                        {symbol}{" "}
                        {numberWithCommas(row.current_price.toFixed(2))}
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{ ...grid("none", "","table-cell"),
                          color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                          fontWeight: 500,
                        }}
                      >
                        {profit && "+"}
                        {row.price_change_percentage_24h.toFixed(2)}%
                      </TableCell>
                      <TableCell  sx= {grid("none", "","table-cell")} align="right">
                        {symbol}{" "}
                        {numberWithCommas(
                          row.market_cap.toString().slice(0, -6)
                        )}
                        M
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        )}
      </TableContainer>

      {/* Comes from @material-ui/lab */}
      <Pagination
        count={(handleSearch()?.length / 10).toFixed(0)}
        sx={{
          padding: "5%",
          margin:"",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          ...pagination,
        }}
        onChange={(_, value) => {
          setPage(value);
          window.scroll(0, 450);
        }}
      />
    </Container>
  );
};
export default CoinsTable;
