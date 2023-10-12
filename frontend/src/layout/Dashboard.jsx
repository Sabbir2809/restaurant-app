import { FaCalendar, FaHome, FaShoppingCart, FaUsers, FaUtensils, FaWallet } from "react-icons/fa";
import { TiThMenu } from "react-icons/ti";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useCart from "../hooks/useCart";

const Dashboard = () => {
  const [cart] = useCart();
  // TODO:
  // const isAdmin = true;
  const [isAdmin] = useAdmin();

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
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          {isAdmin ? (
            <>
              <li>
                <NavLink to={"/dashboard/admin-home"}>
                  <FaHome /> Admin Home
                </NavLink>
              </li>
              <li>
                <NavLink to={"/dashboard/add-item"}>
                  <FaUtensils /> Add an Item
                </NavLink>
              </li>
              <li>
                <NavLink to={"/dashboard/manage-items"}>
                  <FaWallet /> Manage Items
                </NavLink>
              </li>
              <li>
                <NavLink to={"/dashboard/all-users"}>
                  <FaUsers /> All Users
                </NavLink>
              </li>
            </>
          ) : (
            <>
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
                <NavLink to={"/dashboard/payment"}>
                  <FaWallet /> Payment History
                </NavLink>
              </li>
              <li>
                <NavLink to={"/dashboard/my-cart"}>
                  <FaShoppingCart /> My Cart
                  <span className="badge badge-sm inline indicator-item">{cart?.data?.length || 0}</span>
                </NavLink>
              </li>
            </>
          )}

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
