import { useState } from "react";
import "./App.css";
import Routers from "./routes/Routers"

import Navbar from "./components/Navbar";

import Cart from "./components/Cart";

function App() {
  const [openCart, setOpenCart] = useState(false);

  return (
    <>
      <Navbar setOpenCart={setOpenCart} />
      {openCart && <Cart setOpenCart={setOpenCart} />}
      <Routers/>
    </>
  );
}

export default App;
