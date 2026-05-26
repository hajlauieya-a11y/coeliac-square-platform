import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";   // Adjust path if needed

import MarketplaceHome from "../modules/marketplace/pages/MarketplaceHome.jsx";
import ProductDetail from "../modules/marketplace/pages/ProductDetail.jsx";
import Cart from "../modules/marketplace/pages/cart.jsx";
import Checkout from "../modules/marketplace/pages/Checkout.jsx";
import Orders from "../modules/marketplace/pages/Orders.jsx";
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
import MyTickets from "../modules/event/pages/MyTickets.jsx";
import Workshop from "../modules/workshop/pages/Workshop.jsx";
import { CartProvider } from "../modules/marketplace/context/CartContext";
import AddProduct from "../modules/dashboard/vendor/pages/AddProduct.jsx";
import AddRecipe from "../modules/dashboard/admin/pages/AddRecipe.jsx";
import VendorDashboard from "../modules/dashboard/vendor/pages/VendorDashboard.jsx";
import AdminDashboard from "../modules/dashboard/admin/pages/AdminDashboard.jsx";
import VendorProducts from "../modules/dashboard/vendor/pages/VendorProducts.jsx";
import VendorOrders from "../modules/dashboard/vendor/pages/VendorOrders.jsx";
import AdminRecipes from "../modules/dashboard/admin/pages/AdminRecipes.jsx";
import ProtectedRoute from "../modules/auth/components/ProtectedRoute.jsx";
import AdminEvents from "../modules/dashboard/admin/pages/AdminEvents.jsx";
import AddEvent from "../modules/dashboard/admin/pages/AddEvent.jsx";
import AdminUsers from "../modules/dashboard/admin/pages/AdminUsers.jsx";
import { ToastProvider } from "../modules/shared/components/ui/ToastContext.jsx";
import FormateurDashboard from "../modules/dashboard/formateur/pages/FormateurDashboard.jsx";
import AddWorkshop from "../modules/dashboard/formateur/pages/AddWorkshop.jsx";
import FormateurWorkshops from "../modules/dashboard/formateur/pages/FormateurWorkshops.jsx";
import ExpertDashboard from "../modules/dashboard/expert/pages/ExpertDashboard.jsx";
import ExpertContents from "../modules/dashboard/expert/pages/ExpertContents.jsx";
import ExpertProfile from "../modules/dashboard/expert/pages/ExpertProfile.jsx";


function App() {
  return (
    <AuthProvider>
      <ToastProvider>
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
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/vendor/dashboard"
            element={
              <ProtectedRoute allowedRoles={["vendor"]}>
                <VendorDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/vendor/products"
            element={
              <ProtectedRoute allowedRoles={["vendor"]}>
                <VendorProducts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/vendor/products/new"
            element={
              <ProtectedRoute allowedRoles={["vendor"]}>
                <AddProduct />
              </ProtectedRoute>
            }
          />
          <Route
            path="/vendor/orders"
            element={
              <ProtectedRoute allowedRoles={["vendor"]}>
                <VendorOrders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/formateur/dashboard"
            element={
              <ProtectedRoute allowedRoles={["formateur"]}>
                <FormateurDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/formateur/workshops"
            element={
              <ProtectedRoute allowedRoles={["formateur"]}>
                <FormateurWorkshops />
              </ProtectedRoute>
            }
          />
          <Route
            path="/formateur/workshops/new"
            element={
              <ProtectedRoute allowedRoles={["formateur"]}>
                <AddWorkshop />
              </ProtectedRoute>
            }
          />
          <Route
            path="/expert/dashboard"
            element={
              <ProtectedRoute allowedRoles={["expert"]}>
                <ExpertDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/expert/contents"
            element={
              <ProtectedRoute allowedRoles={["expert"]}>
                <ExpertContents />
              </ProtectedRoute>
            }
          />
          <Route
            path="/expert/profile"
            element={
              <ProtectedRoute allowedRoles={["expert"]}>
                <ExpertProfile />
              </ProtectedRoute>
            }
          />
          <Route path="/recette" element={<Recipes />} />
          <Route
            path="/admin/recipes"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminRecipes />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/events"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminEvents />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/events/new"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AddEvent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminUsers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/recipes/new"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AddRecipe />
              </ProtectedRoute>
            }
          />
          <Route path="/recette/:id" element={<RecipeDetail />} />
          <Route path="/maladie" element={<Maladie />} />
          <Route path="/mission" element={<Mission />} />
          <Route path="/actions" element={<Actions />} />
          <Route path="/team" element={<Team />} />
          <Route path="/confidential" element={<Cenfidential />} />
          <Route path="/event" element={<Event />} />
          <Route
            path="/tickets"
            element={
              <ProtectedRoute>
                <MyTickets />
              </ProtectedRoute>
            }
          />
          <Route path="/workshop" element={<Workshop />} />



          {/* AUTH ROUTES */}
          <Route path="/auth" element={<Welcome />} />
          <Route path="/auth/signin" element={<SignIn />} />
          <Route path="/auth/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
      </CartProvider>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
