// src/pages/Cart.test.jsx
import { render, screen, fireEvent, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Cart from "./Cart";
import { CartContext } from "../context/CartContext";

function renderWithCart(items = [], overrides = {}) {
  const defaultContext = {
    items,
    addItem: jest.fn(),
    removeItem: jest.fn(),
    updateQty: jest.fn(),
    clear: jest.fn(),
    totalItems: items.reduce((s, p) => s + p.qty, 0),
    total: items.reduce((s, p) => s + p.qty * p.price, 0),
  };
  const value = { ...defaultContext, ...overrides };

  return render(
    <CartContext.Provider value={value}>
      <MemoryRouter>
        <Cart />
      </MemoryRouter>
    </CartContext.Provider>
  );
}

describe("Cart Page", () => {
  it("renders empty cart message", () => {
    renderWithCart([]);
    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
  });

  it("renders cart items with title, price, and quantity", () => {
    const items = [{ id: 1, title: "Backpack", price: 29.99, image: "img1", qty: 1 }];
    renderWithCart(items);

    // Title
    expect(screen.getByText("Backpack")).toBeInTheDocument();

    // Price (check textContent because $ and number may be split)
    const priceEls = screen.getAllByText((_, el) =>
      el.textContent.includes("29.99")
    );
    expect(priceEls.length).toBeGreaterThan(0);

    // Quantity input
    expect(screen.getByDisplayValue("1")).toBeInTheDocument();
  });

  it("updates quantity when buttons clicked", () => {
    const updateQty = jest.fn();
    const items = [{ id: 1, title: "Backpack", price: 29.99, image: "img1", qty: 1 }];
    renderWithCart(items, { updateQty });

    fireEvent.click(screen.getByRole("button", { name: /increase quantity/i }));
    expect(updateQty).toHaveBeenCalledWith(1, 2);

    fireEvent.click(screen.getByRole("button", { name: /decrease quantity/i }));
    expect(updateQty).toHaveBeenCalledWith(1, 0); // then clamped to >=1 in component
  });

  it("removes item when remove button clicked", () => {
    const removeItem = jest.fn();
    const items = [{ id: 1, title: "Backpack", price: 29.99, image: "img1", qty: 1 }];
    renderWithCart(items, { removeItem });

    fireEvent.click(screen.getByRole("button", { name: /remove/i }));
    expect(removeItem).toHaveBeenCalledWith(1);
  });

  it("shows correct order total and clears cart", () => {
    const clear = jest.fn();
    const items = [
      { id: 1, title: "Backpack", price: 29.99, image: "img1", qty: 1 },
      { id: 2, title: "Jacket", price: 111.0, image: "img2", qty: 1 },
    ];
    renderWithCart(items, { clear });

    expect(screen.getByText("Backpack")).toBeInTheDocument();
    expect(screen.getByText("Jacket")).toBeInTheDocument();

    // Jacket line total
    expect(
      screen.getAllByText((_, el) => el.textContent.includes("111.00")).length
    ).toBeGreaterThan(0);

    // Order summary aside
    const summary = screen.getByRole("complementary");
    expect(summary).toHaveTextContent("140.99");

    fireEvent.click(screen.getByRole("button", { name: /clear cart/i }));
    expect(clear).toHaveBeenCalled();
  });
});
