import { createContext, useContext, useEffect, useState } from "react";

const Crypto = createContext();

const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState("USD");
  const [symbol, setSymbol] = useState("E£");

  useEffect(() => {
    if (currency === "EGP") setSymbol("E£");
    else if (currency === "USD") setSymbol("$");
  }, [currency]);
  return (
    <Crypto.Provider
      value={{
        currency,
        setCurrency,
        symbol
      }}
    >
      {children}{" "}
    </Crypto.Provider>
  );
};

export const GetCryptoContext = () => {
  return useContext(Crypto);
};

export default CryptoContext;
