import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Plan from "./components/Plan";
import PricingSwitch from "./components/PricingSwitch";
import CurrencyDropdown from "./components/CurrencyDropdown";

function App() {
  const [sections, setSections] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [isMonthly, setIsMonthly] = useState(true);

  useEffect(() => {
    axios
      .get("sections.json")
      .then((response) => {
        setSections(response.data);
        // Extract currencies from the JSON data
        const currenciesFromData = response.data.reduce((acc, section) => {
          return Object.keys(section.prices);
        }, []);
        setCurrencies(currenciesFromData);
      })
      .catch((error) => {
        console.error("Error fetching sections data:", error);
      });
  }, []);

  const handleCurrencyChange = (event) => {
    setSelectedCurrency(event.target.value);
  };

  const togglePriceType = () => {
    setIsMonthly(!isMonthly);
  };

  const getCurrencyIcon = (currency) => {
    switch (currency) {
      case "USD":
        return "$";
      case "EUR":
        return "€";
      case "GBP":
        return "£";
      default:
        return null;
    }
  };

  const getPriceForCurrency = (section, currency) => {
    return isMonthly
      ? section.prices[currency].monthly
      : section.prices[currency].annual;
  };

  const getFormattedPrice = (section, currency) => {
    const price = getPriceForCurrency(section, selectedCurrency);
    if (!isNaN(price)) {
      return (
        <p>
          {getCurrencyIcon(selectedCurrency)} {price} <span>/month</span>{" "}
          {isMonthly ? "" : <span> billed annually</span>}
        </p>
      );
    } else {
      return <p>{price}</p>;
    }
  };

  const goToUrl = (url) => {
    window.location.href = url;
  };

  return (
    <div className="App">
      <div className="feature-wrapper">
        <div className="pricing-switches">
          <PricingSwitch
            isMonthly={isMonthly}
            togglePriceType={togglePriceType}
          />

          <CurrencyDropdown
            currencies={currencies}
            selectedCurrency={selectedCurrency}
            handleCurrencyChange={handleCurrencyChange}
          />
        </div>
        <section className="plans">
          {sections &&
            sections.map((section, index) => (
              <Plan
                key={index}
                section={section}
                selectedCurrency={selectedCurrency}
                isMonthly={isMonthly}
                getFormattedPrice={getFormattedPrice}
                goToUrl={goToUrl}
              />
            ))}
        </section>
      </div>
    </div>
  );
}

export default App;
