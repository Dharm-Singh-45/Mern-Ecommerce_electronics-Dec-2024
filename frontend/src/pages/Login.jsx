import React, { useContext, useState } from "react";
import loginIcons from "../assest/signin.gif";
import { FaEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../common/api"; // Importing the centralized api client
import Context from "../context";

const Login = () => {
  const [showPassword, setShowPassword] = useState(true);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { fetchUserDetails, fetchUserAddToCart } = useContext(Context);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/signin", data); // Using the centralized API client

      const token = response.data.token;

      if (token) {
        localStorage.setItem("authToken", token); // Store the token in local storage
        localStorage.setItem("userData", JSON.stringify(response.data.user));
        toast(response.data.message);
        navigate("/");

        fetchUserDetails();
        fetchUserAddToCart();
      }
    } catch (error) {
      toast(error.response?.data?.message || "An unexpected error occurred.");
    }
  };

  return (
    <section id="login">
      <div className="mx-auto container p-4">
        <div className="bg-white p-5 w-full max-w-sm mx-auto rounded">
          <div className="w-20 h-20 mx-auto p-2 py-5">
            <img src={loginIcons} alt="login icon" />
          </div>

          <form className="pt-6 flex flex-col gap-2" onSubmit={handleSubmit}>
            <div className="grid">
              <label htmlFor="email">Email :</label>
              <div className="bg-slate-100">
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  name="email"
                  onChange={handleOnChange}
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>
            <div>
              <label htmlFor="password">Password :</label>
              <div className="bg-slate-100 flex">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Your Password"
                  name="password"
                  onChange={handleOnChange}
                  className="w-full h-full outline-none bg-transparent"
                />
                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  <span>{showPassword ? <FaRegEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
              <Link
                to={"/forgot-password"}
                className="block w-fit ml-auto hover:underline hover:text-red-600"
              >
                Forgot password ?
              </Link>
            </div>
            <button className="bg-red-600 text-white w-full px-6 py-2 max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6 hover:bg-red-700">
              Login
            </button>
          </form>
          <p className="my-5">
            Don't have account ?{" "}
            <Link to={"/signup"} className="hover:text-red-700">
              SignUp
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
