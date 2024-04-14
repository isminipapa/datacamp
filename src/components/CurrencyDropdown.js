export default function CurrencyDropdown({
  currencies,
  selectedCurrency,
  handleCurrencyChange,
}) {
  return (
    <select
      data-testid="currency-dropdown"
      id="currency"
      onChange={handleCurrencyChange}
      value={selectedCurrency}
    >
      {currencies.map((currency, index) => (
        <option key={index} value={currency}>
          {currency}
        </option>
      ))}
    </select>
  );
}
