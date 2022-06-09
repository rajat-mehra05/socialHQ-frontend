import { useContext, useState } from "react";
import { FaBars } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/Context";
import SearchBar from "./SearchBar";
import Sidebar from "./Sidebar";

const Navbar = () => {
  const { state, dispatch } = useContext(UserContext);
  const navigate = useNavigate();
  const [close, setClose] = useState(true);

  const renderList = () => {
    if (state) {
      return [
        <>
          <li key="search" className="cursor-pointer">
            <SearchBar />
          </li>
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
      <Sidebar close={close} setClose={setClose} className="sm:hidden" />
      <div className="fixed top-0 left-0  flex w-full p-4 z-[99] bg-gradient-to-b from-gray-700 to-transparent">
        <header className="flex justify-between w-full items-center text-white bg-gradient-to-r from-[#0f151a] to-slate-800 h-20">
          <Link to={state ? "/" : "/login"}>
            <div className="flex pl-4">
              <span className="flex items-center">
                <img
                  src="https://cdn4.iconfinder.com/data/icons/miu-black-social-2/60/location-256.png"
                  alt="logo"
                  loading="lazy"
                  className="w-8 h-8"
                />
              </span>
              <h1 className="text-3xl ml-4 font-semibold select-none">
                Social HQ.
              </h1>
            </div>
          </Link>

          <nav className="mr-4 hidden sm:flex">
            <ul className="flex items-center sm:gap-8 gap-4">{renderList()}</ul>
          </nav>
          <div className="flex items-center gap-4 sm:hidden pr-2">
            <FaBars
              className="sm:hidden text-white text-2xl cursor-pointer"
              onClick={() => setClose(false)}
            />
          </div>
        </header>
      </div>
    </>
  );
};

export default Navbar;
