import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const useAdmin = () => {
  const { user } = useAuth();
  const token = localStorage.getItem("access-token");

  // user axios sure with react query
  const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
    queryKey: ["isAdmin", user?.email],
    queryFn: async () => {
      const response = await axios.get(`http://localhost:8000/api/all-users/admin/${user?.email}`, {
        headers: {
          token: token,
        },
      });
      return response.data.admin;
    },
  });
  return [isAdmin, isAdminLoading];
};

export default useAdmin;
