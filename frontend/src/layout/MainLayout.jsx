import { Outlet, useLocation } from "react-router-dom";
import Footer from "../pages/Common/Footer";
import Navbar from "../pages/Common/Navbar";

const MainLayout = () => {
  const location = useLocation();
  const noHeaderFooter = location.pathname.includes("/login") || location.pathname.includes("/signup");
  return (
    <>
      {noHeaderFooter || <Navbar></Navbar>}
      <Outlet></Outlet>
      {noHeaderFooter || <Footer></Footer>}
    </>
  );
};

export default MainLayout;
