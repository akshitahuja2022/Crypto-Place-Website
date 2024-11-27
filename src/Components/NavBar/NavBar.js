import React, { useContext } from "react";
import "./NavBar.css";
import logo from "../../assets/logo.png";
import arrow_icon from "../../assets/arrow_icon.png";
import { CoinContext } from "../../Context/CoinContext";
import { Link } from "react-router-dom";
function NavBar() {
  const { setCurrenncy } = useContext(CoinContext);

  const currencyHandler = (event) => {
    switch (event.target.value) {
      case "usd": {
        setCurrenncy({ name: "usd", symbol: "$" });
        break;
      }
      case "inr": {
        setCurrenncy({ name: "inr", symbol: "₹" });
        break;
      }

      case "eur": {
        setCurrenncy({ name: "eur", symbol: "€" });
        break;
      }

      default: {
        setCurrenncy({ name: "usd", symbol: "$;" });
        break;
      }
    }
  };
  return (
    <div className="navbar">
      <Link to={"/"}>
        <img src={logo} alt="" className="logo" />
      </Link>
      <ul>
        <Link to={"/"} style={{ textDecoration: "none" }}>
          <li>Home</li>
        </Link>
        <li>Blog</li>
        <li>Features</li>
        <li>Pricing</li>
      </ul>
      <div className="nav-right">
        <select onChange={currencyHandler}>
          <option value="usd">USD</option>
          <option value="inr">INR</option>
          <option value="eur">EUR</option>
        </select>
        <button>
          Sign Up <img src={arrow_icon} alt="" />
        </button>
      </div>
    </div>
  );
}

export default NavBar;
