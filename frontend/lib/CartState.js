import { createContext, useContext, useState } from "react";

const LocalStateContext = createContext();
const LocalStateProvider = LocalStateContext.Provider;

export function CartStateProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  function toggleOpen() {
    setIsOpen(!isOpen);
  }

  function closeOpen() {
    setIsOpen(false);
  }

  return (
    <LocalStateProvider value={{ isOpen, setIsOpen, toggleOpen, closeOpen }}>
      {children}
    </LocalStateProvider>
  );
}

export function useCart() {
  const all = useContext(LocalStateContext);

  return all;
}
