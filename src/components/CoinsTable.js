import axios from "axios";
import { useEffect, useState } from "react";
import { CoinList } from "../config/api";
import { GetCryptoContext } from "../store/cryptoContext";

const CoinsTable = (props) => {
  const [coins, setCoins] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { currency, symbol } = GetCryptoContext();
  
  useEffect(() => {
      
        const fetchCoins = async () => {
          setIsLoading(true);
          const { data } = await axios.get(CoinList(currency));
          console.log(data);
      
          setCoins(data);
          setIsLoading(false);
        };
        fetchCoins()
  }, [currency]);

//   const handleSearch = () => {
//     return coins.filter(
//       (coin) =>
//         coin.name.toLowerCase().includes(search) ||
//         coin.symbol.toLowerCase().includes(search)
//     );
//   };
  return <> </>;
};
export default CoinsTable;
