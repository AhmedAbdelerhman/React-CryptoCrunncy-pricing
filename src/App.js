import styled from "@emotion/styled";
import React from "react";
import { Route } from "react-router-dom";
import "./app.css";
import Header from "./components/Header";
import Coins from "./pages/PageCoins";
import HomePage from "./pages/HomePage";
function App() {
  const MyMainColor = styled("div")({
    backgroundColor: "#14161a",
    color: "#fff",
    height: "100vh",
  });


  
  return (
    <MyMainColor>
      <Header />

        <Route path="/" component={HomePage} exact />
        <Route path="/coins/:id" component={Coins} />
    </MyMainColor>
  );
}

export default App;
