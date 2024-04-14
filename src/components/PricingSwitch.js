export default function PricingSwitch({ isMonthly, togglePriceType }) {
  return (
    <div className="toggle-label">
      <label htmlFor="toggle-switch">Save with Yearly</label>
      <div className="toggle-switch" onClick={togglePriceType}>
        <input
          type="checkbox"
          id="toggle-switch"
          checked={!isMonthly}
          readOnly
        />
        <span className="slider"></span>
      </div>
    </div>
  );
}
