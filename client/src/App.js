import { Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Contact from "./pages/Contact";
import HomePage from "./pages/HomePage";
import Login from "./pages/auth/Login";
import PageNotFound from "./pages/PageNotFound";
import Policy from "./pages/Policy";
import Register from "./pages/auth/Register";
// import { toast } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Dashboard from "./pages/user/Dashboadr";
import PrivateRoute from "./route/Private";
import ForgotPassword from "./pages/auth/ForgotPassword";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminRoute from "./route/AdminRoute";
import AdminCreateCategory from "./pages/admin/AdminCreateCategory";
import AdminCreatePost from "./pages/admin/AdminCreatePost";
import UsersList from "./pages/admin/UsersList";
import EditUser from "./pages/user/EditUser";
import ProductList from "./pages/admin/ProductList";
import UpdateProduct from "./pages/admin/UpdateProduct";
import Search from "./pages/Search";
import ProductDetail from "./pages/ProductDetail";
import Categories from "./pages/Categories";
import CategoriesProduct from "./pages/CategoriesProduct";
import Cart from "./pages/Cart";
import Orders from "./pages/admin/Orders";
import PrivateLogin from "./route/PrivateLogin";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<Search />} />
        {/* Dashboard User */}
        <Route path="/login" element={<PrivateLogin />}>
          <Route path="" element={<Login />} />
        </Route>
        <Route path="/register" element={<PrivateLogin />}>
          <Route path="" element={<Register />} />
        </Route>

        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/edit-profile" element={<EditUser />} />
        </Route>
        {/* Dashboard Admin */}
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route
            path="admin/create-category"
            element={<AdminCreateCategory />}
          />
          <Route path="admin/create-post" element={<AdminCreatePost />} />
          <Route path="admin/user-list" element={<UsersList />} />
          <Route path="admin/product-list" element={<ProductList />} />
          <Route
            path="admin/update-product/:slug"
            element={<UpdateProduct />}
          />
          <Route path="admin/orders" element={<Orders />} />
        </Route>
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/*" element={<PageNotFound />} />
        {/* <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> */}
        <Route path="/product/:slug" element={<ProductDetail />} />
        <Route path="/categories/" element={<Categories />} />
        <Route path="/category/:slug" element={<CategoriesProduct />} />
        <Route path="/cart/" element={<Cart />} />
      </Routes>
    </>
  );
}

export default App;
