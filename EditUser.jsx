

import axios from "axios";
import React, { useState, useEffect } from "react";
import { updateUser } from "./redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const EditUser = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const users = useSelector((state) => state.users?.users || []);
  const existingUser = users.find((u) => u._id === id);

  const [name, setName] = useState(existingUser?.name || "");
  const [email, setEmail] = useState(existingUser?.email || "");
  const [age, setAge] = useState(existingUser?.age || "");
  const [loading, setLoading] = useState(!existingUser);

  useEffect(() => {
    if (!existingUser) {
      axios.get(`http://localhost:3005/user/${id}`)
        .then((response) => {
          const userData = response.data;
          setName(userData.name);
          setEmail(userData.email);
          setAge(userData.age);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching user:", error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [existingUser, id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:3005/update/${id}`, { name, email, age });

      dispatch(updateUser({ _id: id, name, email, age }));

      navigate("/");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };




  




  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Update User</h2>

        {loading ? (
          <p className="text-center text-gray-600">Loading user data...</p>
        ) : (
          <form onSubmit={handleUpdate}>
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                placeholder="Enter Name"
                className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                placeholder="Enter Email"
                className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Age</label>
              <input
                type="number"
                placeholder="Enter Age"
                className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 transition"
            >
              Update
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditUser;

