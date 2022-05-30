import { Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Slider from "./Slider";

const Banner = (props) => {
  const banner = {
    backgroundImage: "url(./banner2.jpg)",
  };
  const bannerContent = {
    height: 400,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
  };

  const tagline = {
    display: "flex",
    height: "40%",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
  };

  return (
    <Box sx={banner}>
      <Container sx={bannerContent}>
        <Box sx={tagline}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: "bold",
              fontFamily: "Montserrat",
              fontSize:{xs:"2rem" , md:"3.75rem"}
            }}
          >
            Crypto Hunter
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{
              color: "darkgrey",
              textTransform: "capitalize",
              fontFamily: "Montserrat",
            }}
          >
            <span style={{color:"gold"}}> Top 10 </span> cryptocurrency 2022 pricing according to
             
            world's largest independent cryptocurrency website (CoinGecko)
          </Typography>
        </Box>
        <Slider />
      </Container>
    </Box>
  );
};
export default Banner;
