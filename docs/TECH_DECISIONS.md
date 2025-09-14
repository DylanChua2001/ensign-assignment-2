# Technical Decisions

This document explains the **design decisions** and **assumptions** made in the Shopping Cart project.

---

## 🔑 Technical Decisions

1. **React + Vite Setup**  
   - Chose **React** with Create React App for simplicity.  
   - Lightweight, fast to set up, and supports modern JS features.

2. **State Management: Context API**  
   - Used React **Context API** instead of Redux.  
   - Simpler for small projects, avoids extra boilerplate.  
   - `CartContext` stores items, total, and cart actions.

3. **Persistent Cart with LocalStorage**  
   - Items are stored in `localStorage` to survive page refresh.  
   - Sync handled via `useEffect`.

4. **Testing with Jest & React Testing Library**  
   - Jest for unit testing.  
   - RTL to simulate real user interactions (click, input, remove).  
   - Tests cover:
     - Empty cart state
     - Adding/removing items
     - Updating quantity
     - Order summary totals

5. **TailwindCSS for Styling**   
   - Ensures fast, consistent UI design.  
   - Custom classes used for responsive layouts and buttons.

6. **Build Process**  
   - Uses CRA’s default `npm run build` to output an optimized `build/` folder.  

---