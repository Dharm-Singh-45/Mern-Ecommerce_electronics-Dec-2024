import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { MdModeEdit } from "react-icons/md";
import ChangeUSerRole from "../components/ChangeUSerRole";
import api from "../common/api"; // Import the centralized api instance

const AllUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [openUpdateRole, setOpenUpdateRole] = useState(false);
  const [updateUserDetails, setUpdateUserDetails] = useState({
    email: "",
    name: "",
    role: "",
    _id: "",
  });

  const fetchAllUsers = async () => {
    try {
      const response = await api.get("/all-users", { withCredentials: true });
      setAllUsers(response?.data?.data || []); // Ensure this is an array
    } catch (error) {
      toast(error?.response?.data?.message || "Failed to fetch users");
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []); // Add an empty dependency array to avoid infinite calls

  return (
    <div className="bg-white pb-4">
      <table className="w-full usertable">
        <thead>
          <tr className="bg-black text-white">
            <th>Sr.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="">
          {allUsers.map((el, index) => (
            <tr key={el.id || index}>
              <td>{index + 1}</td>
              <td>{el?.name}</td>
              <td>{el?.email}</td>
              <td>{el?.role}</td>
              <td>{new Date(el.createdAt).toLocaleDateString()}</td>
              <td>
                <button
                  className="bg-red-500 p-2 rounded-full cursor-pointer hover:text-white hover:bg-green-500"
                  onClick={() => {
                    setUpdateUserDetails(el);
                    setOpenUpdateRole(true);
                  }}
                >
                  <MdModeEdit />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {openUpdateRole && (
        <ChangeUSerRole
          onClose={() => setOpenUpdateRole(false)}
          name={updateUserDetails.name}
          email={updateUserDetails.email}
          role={updateUserDetails.role}
          userId={updateUserDetails._id}
          callFunc={fetchAllUsers}
        />
      )}
    </div>
  );
};

export default AllUsers;
