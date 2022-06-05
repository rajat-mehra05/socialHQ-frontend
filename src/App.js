import { useContext, useEffect, useReducer, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import CreatePost from "./components/CreatePost";
import Login from "./components/Login";
import MainPage from "./components/MainPage";
import Navbar from "./components/Navbar";
import ProfilePage from "./components/ProfilePage";
import SignUp from "./components/SignUp";
import UserProfile from "./components/UserProfile";
import { UserContext } from "./context/Context";
import { initialState, reducer } from "./reducers/userReducer";

const { Provider } = UserContext;

const Routing = () => {
  const [auth, setAuth] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);

  const { dispatch } = useContext(UserContext);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    /* console.log(user); */
    if (user) {
      dispatch({ type: "USER", payload: user });
    }

    if (
      !user &&
      location.pathname !== "/signup" &&
      location.pathname !== "/login"
    )
      navigate("/login");
    setAuth(!!user);
  }, [dispatch, location, navigate]);

  return (
    <Routes>
      {auth ? (
        <>
          <Route path="/" exact element={<MainPage />} />
          <Route exact path="/profile" element={<ProfilePage />} />
          <Route path="/createpost" element={<CreatePost />} />
          <Route path="/profile/:userid" element={<UserProfile />} />
        </>
      ) : (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </>
      )}
    </Routes>
  );
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Provider value={{ state, dispatch }}>
      <Router>
        <Navbar />
        <div>
          <ToastContainer />
          <Routing />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
