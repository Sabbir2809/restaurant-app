import { useContext } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import useCart from "../../hooks/useCart";
import { AuthContext } from "../../providers/AuthProvider";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [cart] = useCart();

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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box text-white w-52">
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
              <NavLink to={"/secret"}>Secret</NavLink>
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
            <NavLink to={"/secret"}>Secret</NavLink>
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
