import { FaCalendar, FaHome, FaShoppingCart, FaWallet } from "react-icons/fa";
import { TiThMenu } from "react-icons/ti";
import { NavLink, Outlet } from "react-router-dom";
import useCart from "../hooks/useCart";

const Dashboard = () => {
  const [cart] = useCart();
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        {/* Page content here */}
        <Outlet></Outlet>
        <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
          Open drawer
        </label>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 min-h-full bg-[#D1A054] text-base-content">
          {/* Sidebar content here */}
          <li>
            <NavLink to={"/dashboard/user-home"}>
              <FaHome /> User Home
            </NavLink>
          </li>
          <li>
            <NavLink to={"/dashboard/reservation"}>
              <FaCalendar /> Reservations
            </NavLink>
          </li>
          <li>
            <NavLink to={"/dashboard/payment-history"}>
              <FaWallet /> Payment History
            </NavLink>
          </li>
          <li>
            <NavLink to={"/dashboard/my-cart"}>
              <FaShoppingCart /> My Cart
              <span className="badge badge-sm inline indicator-item">{cart?.data?.length || 0}</span>
            </NavLink>
          </li>
          <div className="divider"></div>
          <li>
            <NavLink to={"/"}>
              <FaHome /> Home
            </NavLink>
          </li>
          <li>
            <NavLink to={"/menu"}>
              <TiThMenu /> Menu
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
