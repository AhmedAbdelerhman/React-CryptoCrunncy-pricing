import {
  AppBar,
  Container,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useHistory } from "react-router-dom";
import { GetCryptoContext } from "../store/cryptoContext";

const Header = (props) => {
  const title = {
    flex: 1,
    fontFamily: "Montserrat",
    fontWeight: "bold",
    color: "gold",
    cursor: "pointer",
  };

  const history = useHistory();
  const { currency, setCurrency } = GetCryptoContext();

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            <Typography onClick={() => history.push("/")} sx={title}>
              crypto Hunter
            </Typography>
            <Select
              variant="outlined"
              labelId="demo-simple-select-label"
               id="demo-simple-select"
              value={currency}
              sx={{ width: 100, height: 40, marginLeft: 15, color: "#fff"  }}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <MenuItem  sx={{borderColor: '#fff'}} value={"USD"}>USD</MenuItem>
              <MenuItem value={"INR"}>INR</MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};
export default Header;
