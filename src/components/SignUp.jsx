import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_URL } from "../constants";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const navigate = useNavigate();

  const uploadPic = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "socialhq");
    data.append("cloud_name", "dxgo68vci");
    fetch("https://api.cloudinary.com/v1_1/dxgo68vci/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setUrl(data.url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const uploadFields = () => {
    // validation for email
    if (
      !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      toast("Invalid email!", { type: "error" });
      return;
    }

    fetch(`${API_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        pic: url,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          toast(data.error, { type: "error" });
        } else {
          toast(data.message, { type: "success" });
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const PostData = () => {
    if (image) {
      uploadPic();
    } else {
      uploadFields();
    }
  };

  useEffect(() => {
    if (url) {
      uploadFields();
    }
  }, [url]);

  return (
    <div className="sm:flex-row flex flex-col gap-12 sm:gap-32 py-8 mx-auto min-h-[calc(100vh-80px)] justify-center items-center bg-white">
      <div className="flex flex-col justify-center items-center">
        <div className="flex items-center gap-2 bg-gray-800 justify-center mb-2 w-full rounded-lg">
          <span className="w-8 h-8">
            {" "}
            <img src="/key.png" alt="key" className="w-full h-full" />{" "}
          </span>
          <h1 className="text-2xl text-white font-semibold my-2">
            {" "}
            Create a new account{" "}
          </h1>
        </div>
        <div className="p-8 bg-gradient-to-l from-slate-200 to-slate-600">
          <div className="flex flex-col">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded h-12 w-72 sm:w-full px-4 mb-4 font-semibold text-zinc-800 border-2 border-zinc-500"
              placeholder="Enter name"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded h-12 w-72 sm:w-full px-4 mb-4 font-semibold text-zinc-800 border-2 border-zinc-500"
              placeholder="Enter email"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded h-12 w-72 sm:w-full  px-4 mb-4 font-semibold text-zinc-800 border-2 border-zinc-500"
              placeholder="Enter password"
            />
            <div className="flex flex-col gap-2">
              <span className="font-semibold"> Upload your picture</span>
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
            <button
              onClick={() => PostData()}
              className="bg-gradient-to-r from-[#0f151a] to-slate-800 hover:from-slate-800 hover:to-gray-900 text-white text-lg font-semibold h-12 mb-4 mt-2 rounded px-4 w-full"
            >
              Sign up
            </button>
            <h3 className="hover:underline text-slate-900 italic font-semibold">
              <Link to="/login"> Already have an account? Log in. </Link>
            </h3>
          </div>
        </div>
      </div>
      <img src="/signup.png" alt="picture1" className="h-full" />
    </div>
  );
};

export default SignUp;
