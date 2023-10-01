import { Outlet } from "react-router-dom";
import Footer from "../pages/Common/Footer";
import Navbar from "../pages/Common/Navbar";

const MainLayout = () => {
  return (
    <>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </>
  );
};

export default MainLayout;
