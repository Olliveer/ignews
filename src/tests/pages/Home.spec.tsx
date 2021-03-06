import { render, screen } from "@testing-library/react";
import { stripe } from "../../services/stripe";
import { mocked } from "ts-jest/utils";
import Home, { getStaticProps } from "../../pages";

jest.mock("next/router");
jest.mock("next-auth/client", () => {
  return {
    useSession: () => [null, false],
  };
});

jest.mock("../../services/stripe.ts");

describe("Home page", () => {
  it("renders correctly", () => {
    render(<Home product={{ priceId: "fake-priceid", amount: "R$ 10,00" }} />);

    expect(screen.getByText("for R$ 10,00 month")).toBeInTheDocument();
  });

  it("loads initial data", async () => {
    const stripePricesRetrieveMoked = mocked(stripe.prices.retrieve);

    stripePricesRetrieveMoked.mockResolvedValueOnce({
      id: "fake-priceid",
      unit_amount: 1000,
    } as any);

    const response = await getStaticProps({});

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          product: {
            priceId: "fake-priceid",
            amount: "$10.00",
          },
        },
      })
    );
  });
});
