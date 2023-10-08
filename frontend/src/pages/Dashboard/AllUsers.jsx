import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { FaEdit, FaTrashAlt, FaUserShield } from "react-icons/fa";

const AllUsers = () => {
  const { data: users = [], refetch } = useQuery(["users"], async () => {
    const res = await fetch("http://localhost:8000/api/all-users");
    return res.json();
  });

  const handleUserDelete = () => {};

  return (
    <div className="w-full p-4">
      <Helmet>
        <title>Restaurant || All Users</title>
      </Helmet>
      <h2 className="text-2xl font-semibold mb-4">All Users: {users.data.length}</h2>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.data.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.role === "admin" ? (
                    "admin"
                  ) : (
                    <button className="btn btn-md text-green-500">
                      <FaUserShield />
                    </button>
                  )}
                </td>
                <td>
                  <button onClick={() => handleUserDelete(user._id)} className="btn btn-md text-red-600">
                    <FaTrashAlt />
                  </button>
                  <button className="btn btn-md text-indigo-500">
                    <FaEdit />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
