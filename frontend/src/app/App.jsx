import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";   // Adjust path if needed

import MarketplaceHome from "../modules/marketplace/pages/MarketplaceHome.jsx";
import ProductDetail from "../modules/marketplace/pages/ProductDetail.jsx";
import Cart from "../modules/marketplace/pages/cart.jsx";
import Checkout from "../modules/marketplace/pages/Checkout.jsx";
import Home from "../modules/home/pages/Home.jsx";
import Recipes from "../modules/recipes/pages/Recipes.jsx";
import RecipeDetail from "../modules/recipes/pages/RecipeDetail.jsx";
import Maladie from "../modules/maladie/pages/Maladie.jsx";
import Actions from "../modules/actions/pages/Actions.jsx";
import Mission from "../modules/mission/pages/Mission.jsx";
import Team from "../modules/team/pages/Team.jsx";
import Cenfidential from "../modules/confidential/pages/Confidential.jsx";
import SignIn from "../modules/auth/pages/SignIn.jsx";
import SignUp from "../modules/auth/pages/SignUp.jsx";
import Welcome from "../modules/auth/pages/Welcome.jsx";
import Event from "../modules/event/pages/Event.jsx";
import Workshop from "../modules/workshop/pages/Workshop.jsx";
import { CartProvider } from "../modules/marketplace/context/CartContext";
import AddProduct from "../modules/dashboard/vendor/pages/AddProduct.jsx";
import AddRecipe from "../modules/dashboard/admin/pages/AddRecipe.jsx";
import VendorDashboard from "../modules/dashboard/vendor/pages/VendorDashboard.jsx";
import AdminDashboard from "../modules/dashboard/admin/pages/AdminDashboard.jsx";
import VendorProducts from "../modules/dashboard/vendor/pages/VendorProducts.jsx";
import VendorOrders from "../modules/dashboard/vendor/pages/VendorOrders.jsx";


function App() {
  return (
    <AuthProvider>
      <CartProvider>
      <BrowserRouter>
        <Routes>
          {/* HOME PAGE */}
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />

          {/* MARKETPLACE */}
          <Route path="/marketplace" element={<MarketplaceHome />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/vendor/dashboard" element={<VendorDashboard />} />
          <Route path="/vendor/products" element={<VendorProducts />} />
          <Route path="/vendor/products/new" element={<AddProduct />} />
          <Route path="/vendor/orders" element={<VendorOrders />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/recette" element={<Recipes />} />
          <Route path="/admin/recipes/new" element={<AddRecipe />} />
          <Route path="/recette/:id" element={<RecipeDetail />} />
          <Route path="/maladie" element={<Maladie />} />
          <Route path="/mission" element={<Mission />} />
          <Route path="/actions" element={<Actions />} />
          <Route path="/team" element={<Team />} />
          <Route path="/confidential" element={<Cenfidential />} />
          <Route path="/event" element={<Event />} />
          <Route path="/workshop" element={<Workshop />} />



          {/* AUTH ROUTES */}
          <Route path="/auth" element={<Welcome />} />
          <Route path="/auth/signin" element={<SignIn />} />
          <Route path="/auth/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
