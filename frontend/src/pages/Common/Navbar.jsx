import { Link } from "react-router-dom";
const Navbar = () => {
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
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to={"/menu"}>Our Menu</Link>
            </li>
            <li>
              <Link to={"/order/salad"}>Our Shop</Link>
            </li>
          </ul>
        </div>

        <Link to={"/"} className="btn btn-ghost normal-case text-xl">
          Restaurant App
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/menu"}>Our Menu</Link>
          </li>
          <li>
            <Link to={"/order/salad"}>Our Shop</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <Link to={"/login"} className="btn">
          Login
        </Link>
        <Link to={"/signup"} className="btn">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
