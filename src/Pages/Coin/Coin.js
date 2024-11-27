/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import "./Coin.css";
import { useParams } from "react-router-dom";
import { CoinContext } from "../../Context/CoinContext";
import LineChart from "../../Components/LineChart/LineChart";

// Now using the useParam we can find the coinId from url

function Coin() {
  const { currency } = useContext(CoinContext);
  const { coinId } = useParams();
  const [coinData, setCoinData] = useState();
  const [historicalData, setHistoricalData] = useState();

  const fetchCoinData = async () => {
    const options = { method: "GET", headers: { accept: "application/json" } };

    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
      .then((res) => res.json())
      .then((res) => setCoinData(res))
      .catch((err) => console.error(err));
  };

  const fetchHistoricalData = async () => {
    const options = { method: "GET", headers: { accept: "application/json" } };

    fetch(
      "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=10&interval=daily",
      options
    )
      .then((res) => res.json())
      .then((res) => setHistoricalData(res))
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    fetchCoinData();
    fetchHistoricalData();
  }, [currency]);

  if ((coinData, historicalData)) {
    return (
      coinData && (
        <div className="coin">
          <div className="coin-name">
            <img src={coinData.image.large} alt="" />

            <p>
              <b>
                {coinId}
                {" - "}
                {coinData.name} ({coinData.symbol.toUpperCase()})
              </b>
            </p>
          </div>
          <div className="coin-chart">
            <LineChart historicalData={historicalData} />
          </div>

          <div className="coin-info">
            <ul>
              <li>Crypto Market Rank</li>
              <li>{coinData.market_cap_rank}</li>
            </ul>
            <ul>
              <li>Current Price</li>
              <li>
                {currency.symbol}{" "}
                {coinData.market_data.current_price[
                  currency.name
                ].toLocaleString()}
              </li>
            </ul>
            <ul>
              <li>Market Cap</li>
              <li>
                {currency.symbol}{" "}
                {coinData.market_data.market_cap[
                  currency.name
                ].toLocaleString()}
              </li>
            </ul>
          </div>
        </div>
      )
    );
  } else {
    return (
      <div className="spinner">
        <div className="spin"></div>
      </div>
    );
  }
}

export default Coin;