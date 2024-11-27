/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import "./home.css";
import { CoinContext } from "../../Context/CoinContext";
import { Link } from "react-router-dom";

const home = () => {
  const { allCoin, currency } = useContext(CoinContext);

  const [displayCoin, setDisplayCoin] = useState([]);
  const [input, setInput] = useState("");

  const inputHandler = (event) => {
    setInput(event.target.value);
    if (event.target.value === "") {
      setDisplayCoin(allCoin);
    }
  };

  // When we type something in the input field that input field data will be store in (input.toLowerCase())
  // here we are getting all coin data and we are adding the filter so it will filter the data which include
  // this text that we are typing the input field

  const searchHandler = async (event) => {
    event.preventDefault();
    const coins = await allCoin.filter((item) => {
      return item.name.toLowerCase().includes(input.toLowerCase());
    });
    setDisplayCoin(coins);
  };
  useEffect(() => {
    setDisplayCoin(allCoin);
  }, [allCoin]);

  return (
    <div className="home">
      <div className="hero">
        <h1>Largest</h1>
        <h1>Crypto MarketPlace</h1>
        <p>
          Welcome to the world's largest cryptocurrency marketplace. Sign up to
          exolore more about cryptos.
        </p>
        <form onSubmit={searchHandler}>
          <input
            list="coinlist"
            value={input}
            onChange={inputHandler}
            type="text"
            placeholder="Search crypto.."
            required
          />
          {/* Now we have provide this id in this input field. so this coin data will be display in this input field */}
          <datalist id="coinlist">
            {allCoin.map((item, index) => (
              <option key={index} value={item.name} />
            ))}
          </datalist>

          <button type="submit">Search</button>
        </form>
      </div>
      <div className="crypto-table">
        <div className="table-layout">
          <p className="serial-num">#</p>
          <p>Coins</p>
          <p>Price</p>
          <p style={{ textAlign: "center" }}>24H Change</p>
          <p className="market-cap">Market Cap</p>
        </div>
        {displayCoin.slice(0, 10).map((item, index) => (
          <Link to={`/coin/${item.id}`} className="table-layout" key={index}>
            <p className="serial-num">{item.market_cap_rank}</p>
            <div>
              <img src={item.image} alt="" />
              <p>{item.name + " - " + item.symbol}</p>
            </div>
            <p>
              {currency.symbol} {item.current_price.toLocaleString()}
            </p>
            <p className={item.price_change_24h > 0 ? "green" : "red"}>
              {Math.floor(item.price_change_24h * 100) / 100}
            </p>
            <p className="market-cap">
              {" "}
              {currency.symbol} {item.market_cap.toLocaleString()}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default home;
