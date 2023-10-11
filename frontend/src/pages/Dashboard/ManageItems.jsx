import axios from "axios";
import { Helmet } from "react-helmet-async";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import SectionTitle from "../../components/SectionTitle";
import useMenu from "../../hooks/useMenu";

const ManageItems = () => {
  const [menu, refetch] = useMenu();
  const token = localStorage.getItem("access-token");

  const handleItemDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:8000/api/delete-menu-item/${_id}`, {
            headers: {
              token: token,
            },
          })
          .then((data) => {
            if (data.data.data.deletedCount > 0) {
              refetch();
              Swal.fire("Deleted!", "Menu Item has been Deleted", "success");
            }
          });
      }
    });
  };

  return (
    <div className="w-full">
      <Helmet>
        <title>Restaurant || Manage Items</title>
      </Helmet>
      <SectionTitle heading={"Manage All Item"} subHeading={"Hurry Up"} />

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Food</th>
              <th>Item Name</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {menu?.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img src={item?.image} alt={item?.name} />
                    </div>
                  </div>
                </td>
                <td>{item?.name}</td>
                <td className="text-end">${item?.price}</td>
                <td>
                  <button onClick={() => handleItemDelete(item._id)} className="btn btn-md text-red-600 m-2">
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

export default ManageItems;
