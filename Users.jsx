

import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./redux/userSlice";
import { Link } from "react-router-dom";

function Users() {
  const users = useSelector((state) => state.users.users); // Ensure correct state path
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3005"); // Fixed API route
        dispatch(getUser(response.data));
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [dispatch]);

  // Delete User Function
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3005/delete/${id}`);
      window.location.reload(); // Refresh page after deletion
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <Link to={"/create"} className="btn btn-success btn-sm mb-3">
          Add +
        </Link>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}> {/* Used _id instead of id */}
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.age}</td>
                <td>
                  <Link
                    to={`/edit/${user.id}`}
                    className="btn btn-sm btn-success me-2"
                  >
                    Update
                  </Link>
                  
                  <button onClick={()=>{handleDelete(user.id)}} className="btn btn-sm btn-danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;





