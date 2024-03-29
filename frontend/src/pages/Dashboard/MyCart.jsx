import axios from "axios";
import { Helmet } from "react-helmet-async";
import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import SectionTitle from "../../components/SectionTitle";
import { useAuth } from "../../context/AuthContext";
import useCart from "../../hooks/useCart";

const MyCart = () => {
  const [cart, refetch] = useCart();
  const { user } = useAuth();

  const totalPrice = cart?.data?.reduce((sum, item) => item.price + sum, 0);

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
          .delete(`http://localhost:8000/api/delete-cart/${_id}`, {
            headers: { email: user?.email },
          })
          .then((data) => {
            if (data.data.data.deletedCount > 0) {
              refetch();
              Swal.fire("Deleted!", "Cart Food Item has been Deleted", "success");
            }
          });
      }
    });
  };

  return (
    <div className="w-full">
      <Helmet>
        <title>Restaurant || My Cart</title>
      </Helmet>
      <SectionTitle heading={"Wanna Add More?"} subHeading={"My Cart"} />
      <div className="uppercase font-semibold h-[60px] flex justify-evenly items-center">
        <h3 className="text-3xl">Total Items: {cart?.data?.length}</h3>
        <h3 className="text-3xl">Total Price: ${totalPrice}</h3>
        <Link to="/dashboard/payment">
          <button className="btn btn-warning btn-sm">Pay</button>
        </Link>
      </div>
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
            {cart?.data?.map((item, index) => (
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
                  <button onClick={() => handleItemDelete(item._id)} className="btn btn-md text-red-600">
                    <FaTrashAlt />
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

export default MyCart;
