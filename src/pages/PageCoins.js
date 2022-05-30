import { Box } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CoinInfo from "../components/CoinInfo";
import { SingleCoin } from "../config/api";
import { GetCryptoContext } from "../store/cryptoContext";

const PageCoins = (props) => {
  const { id } = useParams();
  const [coin, setCoin] = useState("");
  const { currency, symbol } = GetCryptoContext();

  useEffect(() => {
    const fetchCoin = async () => {
      const { data } = await axios.get(SingleCoin(id));
      console.log(data);
      setCoin(data);
    };
    fetchCoin();
  }, [id]);
  return <Box sx={{display:"flex" ,alignContent:"center"}}>

    <Box flex={2}> <img src={coin.image.large} alt="" /> </Box>



    <Box flex={5}> chart </Box>


    {/* <Box flex={1}> <CoinInfo coin={coin}/></Box> */}


  </Box>;
};
export default PageCoins;
