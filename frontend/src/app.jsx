import { Outlet } from "react-router-dom";
import "./app.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Context from "./context";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { setUserDetails } from "./store/userSlice";
import { useDispatch } from "react-redux";

function AppContent() {
  const dispatch = useDispatch();

  const [cartProductCount,setCartProductCount] = useState(0)

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/user-details", {
        withCredentials: true,
      });
      dispatch(setUserDetails(response.data));
    } catch (error) {
      toast.error()
    }
  };

  const fetchUserAddToCart = async() =>{
    try {
      const response = await axios.get("http://localhost:8080/api/countAddToProduct",{
        withCredentials:true
      })

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