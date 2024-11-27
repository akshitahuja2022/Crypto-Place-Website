import { createContext, useEffect, useState } from "react";

export const CoinContext = createContext();

// CoinContextProvider is a function that return CoinContext.Provider
const CoinContextProvider = (props) => {
  // Create a state variable to store the api data
  const [allCoin, setAllCoin] = useState([]);
  const [currency, setCurrenncy] = useState({
    name: "usd",
    symbol: "$",
  });

  // Create a function that will fetch the coin data from the api
  const fetchAllCoin = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": " CG-94qcmVLmucp1KcRDhHgppCHw ",
      },
    };

    fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`,
      options
    )
      .then((res) => res.json())
      .then((res) => setAllCoin(res))
      .catch((err) => console.error(err));
  };

  // After that we have execute the fetchAllCoin function whenever the component is loaded. for dependency whenever the currency gets updated to add a new api request
  useEffect(() => {
    fetchAllCoin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

  const contextValue = {
    allCoin,
    currency,
    setCurrenncy,
  };

  return (
    <CoinContext.Provider value={contextValue}>
      {props.children}
    </CoinContext.Provider>
  );
};
export default CoinContextProvider;
