import { Outlet } from "react-router-dom";
import "./app.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import Context from "./context";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { setUserDetails } from "./store/userSlice";
import { useDispatch } from "react-redux";
import api from "./common/api"

function AppContent() {
  const dispatch = useDispatch();

  const [cartProductCount,setCartProductCount] = useState(0)

  const fetchUserDetails = async () => {
    try {
      const response = await api.get("/user-details");
      dispatch(setUserDetails(response.data));
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch user details.");
    }
  };

  const fetchUserAddToCart = async() =>{
    try {
      const response = await api.get("/countAddToProduct")

      // console.log("response",response.data.data.count)
      setCartProductCount(response?.data?.data?.count)
    } catch (error) {
      toast.error()
    }
  }

  useEffect(() => {
    fetchUserDetails();
    // cart
    fetchUserAddToCart()
  }, []);

  

  return (
    <Context.Provider value={{ fetchUserDetails,cartProductCount,fetchUserAddToCart }}>
      <ToastContainer position="top-center" />
      <Header />
      <main className="min-h-[calc(100vh-120px)] pt-16">
        <Outlet />
      </main>
      <Footer />
    </Context.Provider>
  );
}

export function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}
