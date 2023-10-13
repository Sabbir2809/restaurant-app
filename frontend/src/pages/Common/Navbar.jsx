import { AiOutlineMenuFold } from "react-icons/ai";
import { FaShoppingCart } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import useAdmin from "../../hooks/useAdmin";
import useCart from "../../hooks/useCart";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [cart] = useCart();
  const [isAdmin] = useAdmin();

  const handleLogOut = () => {
    logout()
      .then(() => {})
      .catch((error) => console.log(error));
  };

  return (
    <div className="navbar bg-[#15151580] text-white fixed z-10 bg-opacity-30 max-w-screen-xl">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <AiOutlineMenuFold />
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-[#15151580] rounded-box text-white w-52">
            <li>
              <NavLink to={"/"}>Home</NavLink>
            </li>
            <li>
              <NavLink to={"/menu"}>Our Menu</NavLink>
            </li>
            <li>
              <NavLink to={"/order/salad"}>Our Shop</NavLink>
            </li>
            <li>
              <NavLink to={isAdmin ? "/dashboard/admin-home" : "/dashboard/user-home"}>Dashboard</NavLink>
            </li>
            <li>
              <NavLink to={"/dashboard/my-cart"}>
                <div className="indicator">
                  <FaShoppingCart />
                  <span className="badge badge-sm indicator-item">{cart?.data?.length || 0}</span>
                </div>
              </NavLink>
            </li>
            {user ? (
              <>
                <li>
                  <Link>{user?.displayName}</Link>
                </li>
                <li>
                  <Link onClick={handleLogOut}>Logout</Link>
                </li>
              </>
            ) : (
              <li>
                <Link to={"/login"}>Login</Link>
              </li>
            )}
          </ul>
        </div>

        <NavLink to={"/"} className="btn btn-ghost normal-case text-xl">
          Restaurant App
        </NavLink>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <NavLink to={"/"}>Home</NavLink>
          </li>
          <li>
            <NavLink to={"/menu"}>Our Menu</NavLink>
          </li>
          <li>
            <NavLink to={"/order/salad"}>Our Shop</NavLink>
          </li>
          <li>
            <NavLink to={isAdmin ? "/dashboard/admin-home" : "/dashboard/user-home"}>Dashboard</NavLink>
          </li>
          <li>
            <NavLink to={"/dashboard/my-cart"}>
              <div className="indicator">
                <FaShoppingCart />
                <span className="badge badge-sm indicator-item">{cart?.data?.length || 0}</span>
              </div>
            </NavLink>
          </li>
          {user ? (
            <>
              <li>
                <Link>{user?.displayName}</Link>
              </li>
              <li>
                <Link onClick={handleLogOut}>Logout</Link>
              </li>
            </>
          ) : (
            <li>
              <Link to={"/login"}>Login</Link>
            </li>
          )}
        </ul>
      </div>
      <div className="navbar-end"></div>
    </div>
  );
};

export default Navbar;
