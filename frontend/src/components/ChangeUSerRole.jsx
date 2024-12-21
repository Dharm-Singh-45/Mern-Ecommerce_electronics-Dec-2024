import React, { useState } from "react";
import ROLE from "../common/role";
import { IoMdClose } from "react-icons/io";
import api from "../common/api"; // Import the centralized axios instance
import { toast } from "react-toastify";

const ChangeUSerRole = ({ name, email, role, onClose, userId, callFunc }) => {
  const [userRole, setUserRole] = useState(role);

  const handleOnChangeSelect = (e) => {
    setUserRole(e.target.value);
  };

  const updateUserRole = async () => {
    try {
      const data = { userId, role: userRole };
      const response = await api.post("/update-users", data); // Use the centralized `api` instance
      toast(response.data.message);
      onClose(); // Close the modal after successful update
      callFunc(); // Call the callback function to refresh the user list or handle the updated role
    } catch (error) {
      toast(error?.response?.data?.message || "An unexpected error occurred.");
    }
  };

  return (
    <div className="fixed top-0 bottom-0 right-0 left-0 h-full w-full z-10 flex justify-center items-center bg-slate-200 bg-opacity-40">
      <div className="bg-white shadow-md p-4 w-full max-w-sm">
        <button className="block ml-auto" onClick={onClose}>
          <IoMdClose />
        </button>

        <h1 className="pb-4 text-lg font-medium">Change user Role</h1>
        <p>Name: {name}</p>
        <p>Email: {email}</p>

        <div className="flex items-center justify-between my-4">
          <p>Role:</p>

          <select
            className="border px-4 py-1"
            value={userRole}
            onChange={handleOnChangeSelect}
          >
            {Object.values(ROLE).map((el, index) => (
              <option key={index} value={el}>
                {el}
              </option>
            ))}
          </select>
        </div>
        <button
          className="w-fit mx-auto block py-1 px-3 rounded-full bg-red-500 text-white hover:bg-red-700"
          onClick={updateUserRole}
        >
          Change Role
        </button>
      </div>
    </div>
  );
};

export default ChangeUSerRole;
