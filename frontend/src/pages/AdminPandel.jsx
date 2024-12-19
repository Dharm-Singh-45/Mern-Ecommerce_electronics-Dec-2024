import React, { useEffect, useState } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";

import ROLE from "../common/role";

const AdminPandel = () => {
  const user = useSelector((state) => state?.user?.user);
  const navigae = useNavigate();

  useEffect(() => {
    if (user?.data?.role !== ROLE.ADMIN) {
      navigae("/");
    }
  }, [user]);

  return (
    <div className="min-h-[calc(100vh-120px)] md:flex hidden">
      <aside className="bg-white min-h-full w-full  max-w-60 ">
        <div className="h-32 flex justify-center items-center flex-col">
          <div className="text-7xl cursor-pointer relative flex justify-center">
            {user?.data?.profilePic ? (
              <img
                src={user?.data?.profilePic}
                className="w-20 h-20 rounded-full"
                alt={user?.data?.name}
              />
            ) : (
              <FaRegCircleUser />
            )}
          </div>
          <p className="capitalize text-lg font-semibold">{user?.data?.name}</p>
          <p className="text-sm">{user?.data?.role}</p>
        </div>
        <div>
          {/* navigation */}

          <nav className="grid p-4">
            <Link to={"all-users"} className="px-2 py-1 hover:text-red-500">
              All Users
            </Link>
            <Link
              to={"all-products"}
              className="px-2 py-1 hover:text-red-500 Products"
            >
              All Products
            </Link>
          </nav>
        </div>
      </aside>
      <main className="w-full h-full p-2">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminPandel;
