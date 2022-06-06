import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/Context";

const Navbar = () => {
  const { state, dispatch } = useContext(UserContext);
  const navigate = useNavigate();

  const renderList = () => {
    if (state) {
      return [
        <>
          <li className="hover:text-emerald-100 hover:cursor-pointer" key="1">
            {" "}
            <Link to="/createpost">
              {" "}
              <i className="fas fa-plus" /> Create Post
            </Link>
          </li>
          <li className="hover:text-emerald-100 hover:cursor-pointer" key="2">
            {" "}
            <Link to="/profile">My Profile</Link>
          </li>
          <li key="3">
            <span
              onClick={() => {
                localStorage.clear();
                dispatch({
                  type: "CLEAR",
                });
                navigate("/login");
              }}
              className="hover:text-emerald-100 hover:cursor-pointer"
            >
              Logout <i className="fas fa-sign-out-alt" />
            </span>
          </li>
        </>,
      ];
    } else {
      return [
        <>
          <li className="hover:text-emerald-100 hover:cursor-pointer" key="4">
            {" "}
            <Link to="/login"> Login</Link>
          </li>
          <li className="hover:text-emerald-100 hover:cursor-pointer" key="5">
            {" "}
            <Link to="/signup"> Sign Up</Link>
          </li>
        </>,
      ];
    }
  };

  return (
    <>
      <header className="flex justify-between w-full items-center text-emerald-50 bg-gray-800 h-20">
        <Link to={state ? "/" : "/login"}>
          {" "}
          <h1 className="text-2xl ml-4 font-semibold select-none">
            {" "}
            Social HQ.{" "}
          </h1>{" "}
        </Link>
        <nav className="mr-4">
          <ul className="flex items-center sm:gap-8 gap-4">{renderList()}</ul>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
