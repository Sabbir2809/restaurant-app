import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const useMenu = () => {
  const {
    data: menu = [],
    isLoading: loading,
    refetch,
  } = useQuery({
    queryKey: ["menu"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:8000/api/menu-details");
      return response.data.data;
    },
  });
  return [menu, refetch];
};

export default useMenu;
