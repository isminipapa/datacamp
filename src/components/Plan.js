export default function Plan({
  section,
  selectedCurrency,
  isMonthly,
  getFormattedPrice,
  goToUrl,
}) {
  return (
    <div className="plan">
      <h2>{section.title}</h2>
      <h3>{section.subtitle}</h3>
      {getFormattedPrice(section, selectedCurrency, isMonthly)}
      <button
        onClick={() => goToUrl(section.buttonUrl)}
        aria-label={`Buy ${section.title}`}
      >
        {section.buttonLabel}
      </button>
      {section?.beforePlanItemsText && <p>{section.beforePlanItemsText}</p>}
      <ul>
        {section.planItems.map((style, styleIndex) => (
          <li key={styleIndex}>
            <span>&#10003;</span> {style}
          </li>
        ))}
      </ul>
      {section?.afterPlanItemsLink && section?.afterPlanItemsLinkCopy && (
        <a href={section.afterPlanItemsLink}>
          {section.afterPlanItemsLinkCopy}
        </a>
      )}
    </div>
  );
}
