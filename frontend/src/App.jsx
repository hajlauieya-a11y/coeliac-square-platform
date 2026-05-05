import { BrowserRouter, Routes, Route } from "react-router-dom";

import MarketplaceHome from "./modules/marketplace/pages/MarketplaceHome.jsx";
import ProductDetail from "./modules/marketplace/pages/ProductDetail.jsx";
import Cart from "./modules/marketplace/pages/Cart";
import Checkout from "./modules/marketplace/pages/Checkout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MarketplaceHome />} />
        <Route path="/product" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;