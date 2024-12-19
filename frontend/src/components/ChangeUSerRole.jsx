import React, { useState } from "react";
import ROLE from "../common/role";
import { IoMdClose } from "react-icons/io";
import axios from "axios";
import { toast } from "react-toastify";

const ChangeUSerRole = ({ name, email, role, onClose,userId,callFunc }) => {
  const [userRole, setUserRole] = useState(role);

  const handleOnChangeSelect = (e) => {
    setUserRole(e.target.value);
  };

  const updateUserRole = async () => {
    try {
      const data = { userId, role: userRole };
      const response = await axios.post(
        "http://localhost:8080/api/update-users",
        data,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      toast(response.data.message);
      onClose()
      callFunc()

    console.log("hello from try")

    } catch (error) {
      toast(error?.response?.data?.message || "An unexpected error occurred.")
    }
  };
  return (
    <div className="fixed top-0 bottom-0 right-0 left-0 h-full w-full z-10 flex justify-between items-center bg-slate-200 bg-opacity-40">
      <div className="mx-auto bg-white shadow-md p-4 w-full max-w-sm">
        <button className="block ml-auto" onClick={onClose}>
          <IoMdClose />
        </button>

        <h1 className="pb-4 text-lg font-medium">Change user Role</h1>
        <p>Name : {name}</p>
        <p>Email : {email}</p>

        <div className="flex items-center justify-between my-4">
          <p>Role :</p>

          <select
            className="border px-4 py-1"
            value={userRole}
            onChange={handleOnChangeSelect}
          >
            {Object.values(ROLE).map((el) => {
              return <option> {el}</option>;
            })}
          </select>
        </div>
        <button
          className="w-fit mx-auto block  py-1 px-3 rounded-full bg-red-500 text-white hover:bg-red-700"
          onClick={updateUserRole}
        >
          change role
        </button>
      </div>
    </div>
  );
};

export default ChangeUSerRole;
