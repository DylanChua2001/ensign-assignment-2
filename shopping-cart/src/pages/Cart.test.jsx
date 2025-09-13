import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CartPage from "./Cart";
import { CartContext } from "../context/CartContext";

// Utility to render with mocked context
function renderWithCart(cartItems, actions = {}) {
  const defaultActions = {
    updateQty: vi.fn(),
    removeItem: vi.fn(),
    clearCart: vi.fn(),
  };

  return render(
    <CartContext.Provider
      value={{ items: cartItems, ...defaultActions, ...actions }}
    >
      <CartPage />
    </CartContext.Provider>
  );
}

describe("Cart Page", () => {
  it("renders empty state with browse link", () => {
    renderWithCart([]);

    expect(
      screen.getByText(/your cart is empty/i)
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /browse products/i })).toBeVisible();
  });

  it("renders items with title, unit price and qty (row-scoped assertions)", () => {
    renderWithCart([
      {
        id: 1,
        title: "Mens Cotton Jacket",
        price: 55.99,
        quantity: 2,
        image: "img1",
      },
      {
        id: 2,
        title: "Backpack",
        price: 29.99,
        quantity: 1,
        image: "img2",
      },
    ]);

    // Jacket row
    const jacketRow = screen.getByText(/mens cotton jacket/i).closest("div");
    expect(jacketRow).toBeInTheDocument();

    expect(
      within(jacketRow).getByText((c, n) =>
        n?.textContent?.replace(/\s+/g, "").includes("$55.99")
      )
    ).toBeInTheDocument(); // unit price

    expect(
      within(jacketRow).getByText((c, n) =>
        n?.textContent?.replace(/\s+/g, "").includes("$111.98")
      )
    ).toBeInTheDocument(); // line total

    expect(
      within(jacketRow).getByDisplayValue("2")
    ).toBeInTheDocument(); // qty input

    // Backpack row
    const backpackRow = screen.getByText(/backpack/i).closest("div");
    expect(backpackRow).toBeInTheDocument();

    expect(
      within(backpackRow).getByText((c, n) =>
        n?.textContent?.replace(/\s+/g, "").includes("$29.99")
      )
    ).toBeInTheDocument(); // unit price

    expect(
      within(backpackRow).getByDisplayValue("1")
    ).toBeInTheDocument(); // qty input
  });

  it("shows correct order total (scoped to Order Summary aside)", () => {
    renderWithCart([
      { id: 1, title: "Book", price: 10, quantity: 2, image: "img" },
      { id: 2, title: "Pen", price: 5, quantity: 3, image: "img" },
    ]);

    const summaryHeading = screen.getByText(/order summary/i);
    const summary = summaryHeading.closest("aside") ?? summaryHeading.parentElement;

    expect(
      within(summary).getByText((c, n) =>
        n?.textContent?.replace(/\s+/g, "").includes("$35.00")
      )
    ).toBeInTheDocument();
  });

  it("updates quantity when user types (assert spy, not DOM value)", async () => {
    const user = userEvent.setup();
    const updateQty = vi.fn();
