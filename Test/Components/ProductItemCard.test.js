import { render, screen } from "@testing-library/react";
import { it, expect, describe } from "vitest";
import ProductItemCard from "../../src/Components/ProductItemCard";

describe("ProductItemCard", () => {
  it("Display productData, isInWishList and handle mouseIsOver event to show productModal component", () => {
    render(
      <ProductItemCard
        productData={{
          title: "Dodge Charger",
          price: "200",
          id: "3",
          description: "This is a dodge charge car from 2024",
          brand: "Dodge",
          discountPercentage: "5%",
          rating: "5",
          stock: "52",
        }}
        // isInWishList="true"
      />
    );
    screen.debug();
  });
});
