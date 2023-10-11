import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";

const useCart = () => {
  const { user, loading } = useAuth();
  const token = localStorage.getItem("access-token");

  //react query
  const { data: cart = [], refetch } = useQuery({
    queryKey: ["carts", user?.email],
    enabled: !loading,
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
