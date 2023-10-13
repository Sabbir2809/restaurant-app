import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from "../context/AuthContext";
import useCart from "../hooks/useCart";

const Card = ({ items }) => {
  const { image, price, name, recipe, _id } = items;
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [, refetch] = useCart();

  const handleAddToCart = () => {
    const cartItem = {
      menuItemId: _id,
      name,
      image,
      price,
      recipe,
      email: user?.email,
    };
    if (user) {
      axios.post("http://localhost:8000/api/create-carts", cartItem).then(({ data }) => {
        if (data.status) {
          refetch();
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Food added on the Cart",
            showConfirmButton: false,
            timer: 1000,
          });
        }
      });
    } else {
      Swal.fire({
        title: "Please Login to Order the Food",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login Now",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location } });
        }
      });
    }
  };

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure className="px-10 pt-10">
        <img src={image} alt={name} className="rounded-xl" />
      </figure>
      <p className="absolute right-0 mr-10 mt-10 bg-slate-700 text-white px-2">${price}</p>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{name}</h2>
        <p>{recipe}</p>
        <div className="card-actions">
          <button
            onClick={handleAddToCart}
            className="btn btn-outline bg-slate-200 border-0 border-b-4 border-orange-500 mt-4">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
