# 📌 Assumptions

During the implementation of the Shopping Cart application, some details were not explicitly defined in the requirements. I made the following assumptions:

- **Product Data**  
  - Products (title, price, image, id) are assumed to be **fetched externally** (API or static file).  
  - For testing, mock items are **hardcoded**.  

---

- **Cart Behavior**  
  - Quantity cannot go below **1**.  
  - `Clear Cart` removes all items at once without confirmation.  
  - Subtotal and total values are **recalculated dynamically** when quantities or items change.  

---

- **Checkout Flow**  
  - The "Checkout" button is a **placeholder**.  
  - In a production system, it would connect to a payment gateway.  

---

- **Testing Scope**  
  - Tests focus on **UI rendering and cart state behavior**.  
