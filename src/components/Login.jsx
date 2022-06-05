import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../context/Context";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { dispatch } = useContext(UserContext);

  const PostData = () => {
    // validation for email
    if (
      !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      toast("Invalid email!", { type: "error" });
      return;
    }

    fetch("/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        /*   console.log(data); */
        if (data.error) {
          toast(data.error, { type: "error" });
        } else {
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));

          dispatch({
            type: "USER",
            payload: data.user,
          });

          toast("Welcome to Social HQ.", { type: "success" });
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="sm:flex-row flex flex-col gap-12 sm:gap-32 py-2 min-h-screen justify-center bg-gradient-to-l from-slate-200 to-slate-600">
        <div className="flex flex-col justify-center items-center">
          <div className="flex items-center gap-2 bg-gray-800 justify-center mb-2 w-full">
            <span className="w-8 h-8">
              {" "}
              <img src="/key.png" alt="key" className="w-full h-full" />{" "}
            </span>
            <h1 className="text-2xl text-white text-center my-2 font-semibold">
              {" "}
              Log in to your account{" "}
            </h1>
          </div>
          <div className="p-8 bg-gradient-to-l from-slate-200 to-slate-600">
            <div className="flex flex-col">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded h-12 w-72 px-4 mb-4 font-semibold text-zinc-800 border-2 border-zinc-500"
                placeholder="Enter email"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded h-12 w-72 px-4 mb-4 font-semibold text-zinc-800 border-2 border-zinc-500"
                placeholder="Enter password"
              />
              <button
                onClick={() => PostData()}
                className="bg-gray-800 hover:bg-gray-900 text-white text-lg font-semibold h-12 mb-4 rounded px-4 w-full"
              >
                Login
              </button>

              <h3 className="hover:underline italic">
                <Link to="/login"> New to Social HQ! Sign up here. </Link>
              </h3>
            </div>
          </div>
        </div>
        <div className="sm:w-[600px] w-96">
          <img
            src="/login.png"
            alt="picture1"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </>
  );
};

export default Login;
