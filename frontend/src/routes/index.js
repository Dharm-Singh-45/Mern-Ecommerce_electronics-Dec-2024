import { createBrowserRouter } from "react-router-dom";
import { App } from "../app.jsx";
import Home from "../pages/Home.jsx";
import Login from "../pages/Login.jsx";
import ForgotPassword from "../pages/ForgotPassword.jsx";
import SignUp from "../pages/SignUp.jsx";
import AdminPandel from "../pages/AdminPandel.jsx";

import AllProducts from "../pages/AllProducts.jsx";
import AllUsers from "../pages/AllUsers.jsx";
import CategoryProduct from "../pages/CategoryProduct.jsx";
import ProductDetails from "../pages/ProductDetails.jsx";
import Cart from "../pages/Cart.jsx";
import SearchProduct from "../pages/SearchProduct.jsx";
import Success from "../pages/Success.jsx";
import Cancel from "../pages/Cancel.jsx";
import OrderPage from "../pages/OrderPage.jsx";
import AllOrder from "../pages/AllOrder.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "product-category",   ///:categoryName
        element: <CategoryProduct />,
      },
      {
        path: "product-details/:_id",
        element: <ProductDetails />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "search",
        element: <SearchProduct />,
      },
      {
        path: "order",
        element: <OrderPage />,
      },
      {
        path: "success",
        element: <Success />,
      },
      {
        path: "cancel",
        element: <Cancel />,
      },
      {
        path: "admin-panel",
        element: <AdminPandel />,
        children: [
          {
            path: "all-users",
            element: <AllUsers />,
          },
          {
            path: "all-products",
            element: <AllProducts />,
          },
          {
            path: "all-order",
            element: <AllOrder />,
          },
        ],
      },
    ],
  },
]);

export default router;
