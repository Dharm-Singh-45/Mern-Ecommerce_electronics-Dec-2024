import React, { useContext, useState } from "react";
import Logo from "./Logo";
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";
import ROLE from "../common/role";
import Context from "../context";

const Header = () => {
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();

  const context = useContext(Context);
  const navigate = useNavigate()

  const searchInput = useLocation()

  const urlSearch = new URLSearchParams(searchInput?.search)
const searchQuery = urlSearch.getAll("q")

  const [search,setSearch] = useState(searchQuery)
  

  const [menuDisplay, setMenuDisplay] = useState(false);

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/user-logout",
        { withCredentials: true }
      );

      toast(response.data.message);
      dispatch(setUserDetails(null));
      navigate('/')
    } catch (error) {
      toast(error.response?.data.message);
    }
  };

  const handleSearch = (e) =>{
    const {value} = e.target
    setSearch(value)

    if(value){
      navigate(`/search?q=${value}`)
    }else{
      navigate('/search')
    }

  }

  return (
    <header className="h-16 shadow-md bg-white fixed w-full z-40">
      <div className="h-full container mx-auto flex items-center px-4 justify-between">
        <div>
          <Link to={"/"}>
            <Logo w={90} h={50} />
          </Link>
        </div>

        <div className="hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2">
          <input
            type="text"
            placeholder="search product here..."
            className="w-full outline-none"
            onChange={handleSearch}
            value={search}
          />
          <div className="text-lg min-w-[50px] h-8 flex items-center justify-center rounded-r-full bg-red-600">
            <GrSearch />
          </div>
        </div>

        <div className="flex items-center gap-7">
          <div className="relative  flex justify-center">
            {user?.data?._id && (
              <div
                className="text-3xl cursor-pointer relative flex justify-center"
                onClick={() => setMenuDisplay((prev) => !prev)}
              >
                {user?.data?.profilePic ? (
                  <img
                    src={user?.data?.profilePic}
                    className="w-10 h-10 rounded-full"
                    alt={user?.data?.name}
                  />
                ) : (
                  <FaRegCircleUser />
                )}
              </div>
            )}

            {/* Menu Option */}

            {menuDisplay && (
              <div className="absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded ">
                <nav>
                  {user?.data?.role === ROLE.ADMIN && (
                    <Link
                      to={"/admin-panel/all-products"}
                      className="whitespace-nowrap hidden md:block hover:text-red-500"
                      onClick={() => setMenuDisplay((prev) => !prev)}
                    >
                      Admin Panel
                    </Link>
                  )}
                  <Link to={"/order"} 
                   className="whitespace-nowrap hidden md:block hover:text-red-500"
                   onClick={() => setMenuDisplay((prev) => !prev)}
                   >Order</Link>
                </nav>
              </div>
            )}
          </div>
          {user?.data?._id && (
            <Link to={"cart"} className="text-2xl relative">
              <span>
                <FaShoppingCart />
              </span>

              <div className="bg-red-600 text-white w-5 h-5 p-1 flex items-center justify-center rounded-full absolute -top-2 -right-3">
                <p className="text-xs">{context?.cartProductCount}</p>
              </div>
            </Link>
          )}

          <div>
            {user?.data?._id ? (
              <Link
                onClick={handleLogout}
                className="px-3 py-1 rounded-full bg-red-600 text-white"
              >
                Logout
              </Link>
            ) : (
              <Link
                to={"/login"}
                className="px-3 py-1 rounded-full bg-red-600 text-white"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
