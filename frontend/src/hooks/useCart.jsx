import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const useCart = () => {
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem("access-token");

  const { data: cart = [], refetch } = useQuery({
    queryKey: ["cart", user?.email],
    queryFn: async () => {
      const response = await fetch(`http://localhost:8000/api/carts?email=${user?.email}`, {
        headers: {
          token: token,
        },
      });
      return response.json();
    },
  });
  return [cart, refetch];
};

export default useCart;
