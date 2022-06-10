import { useContext } from "react";
import { ImCross } from "react-icons/im";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/Context";
import "./sidebarStyle.css";

const Sidebar = ({ close, setClose }) => {
  const { state, dispatch } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <>
      <div
        className={"sidebarSide" + (close ? "hidden" : "") + " md:hidden"}
        onClick={() => setClose(true)}
      ></div>
      <div
        className={"sidebar" + (!close ? " sidebarOpen" : "") + " md:hidden"}
      >
        <div className="innerSidebar">
          <div>
            <ul>
              <li
                className="hover:text-emerald-100 hover:cursor-pointer"
                key="1"
              >
                {" "}
                <Link to="/createpost">
                  {" "}
                  <i className="fas fa-plus" /> Create Post
                </Link>
              </li>
              <li
                className="hover:text-emerald-100 hover:cursor-pointer"
                key="2"
              >
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
            </ul>
          </div>
          <div onClick={() => setClose(true)} className="cross">
            <ImCross className="cursor-pointer" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
