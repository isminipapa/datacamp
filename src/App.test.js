import React from "react";
import {
  render,
  fireEvent,
  waitFor,
  getByTestId,
} from "@testing-library/react";
import { screen } from "@testing-library/dom";
import axios from "axios";
import App from "./App";

jest.mock("axios");

describe("App Component", () => {
  beforeEach(() => {
    const mockResponse = {
      data: [
        {
          title: "Section 1",
          subtitle: "Subtitle 1",
          prices: {
            USD: { monthly: 10, annual: 100 },
            EUR: { monthly: 8, annual: 80 },
            GBP: { monthly: 12, annual: 82 },
          },
          buttonLabel: "Buy Now",
          buttonUrl: "http://example.com",
          planItems: ["Item 1", "Item 2"],
        },
      ],
    };

    axios.get.mockResolvedValueOnce(mockResponse);
  });

  it("renders pricing switch and currency dropdown", async () => {
    const { getByLabelText, getByText } = await render(<App />);

    const pricingSwitch = getByLabelText("Save with Yearly");
    expect(pricingSwitch).toBeInTheDocument();

    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));

    const currencyDropdown = await screen.getByTestId("currency-dropdown");
    expect(currencyDropdown).toBeInTheDocument();

    await waitFor(() => {
      expect(getByText("Section 1")).toBeInTheDocument();

      expect(getByText("Subtitle 1")).toBeInTheDocument();
      expect(getByText("Buy Now")).toBeInTheDocument();
      expect(getByText("Item 1")).toBeInTheDocument();
      expect(getByText("Item 2")).toBeInTheDocument();
    });
  });

  it("toggles between monthly and yearly pricing", async () => {
    const { getByLabelText } = render(<App />);

    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));

    expect(screen.queryAllByAltText("billed annually")).toBeEmptyDOMElement;

    const pricingSwitch = getByLabelText("Save with Yearly");
    fireEvent.click(pricingSwitch);

    expect(screen.getByText("billed annually"));

    // Toggle back to monthly pricing
    fireEvent.click(pricingSwitch);

    expect(screen.queryAllByAltText("billed annually")).toBeEmptyDOMElement;
  });
});
