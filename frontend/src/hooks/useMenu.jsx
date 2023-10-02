import { useEffect, useState } from "react";

const useMenu = () => {
  const [loading, setLoading] = useState(true);
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/menu-details")
      .then((res) => res.json())
      .then((data) => {
        setMenu(data.data);
        setLoading(false);
      });
  }, []);
  return [menu];
};

export default useMenu;
