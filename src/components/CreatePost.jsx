import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RingLoader } from "react-spinners";
import { toast } from "react-toastify";
import { API_URL } from "../constants";

const CreatePost = () => {
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const createPost = async (url) => {
    const res = await fetch(`${API_URL}/createpost`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        body,
        pic: url,
      }),
    });

    const data = await res.json();

    if (data.error) {
      toast(data.error, { type: "error" });
    } else {
      toast("You have successfully posted.");
      navigate("/");
    }
  };

  const uploadImage = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "socialhq");
    formData.append("cloud_name", "dxgo68vci");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dxgo68vci/image/upload",
        {
          method: "post",
          body: formData,
        }
      );

      const data = await response.json();
      await createPost(data.url);
    } catch (error) {
      console.log(error);
      toast("Error occured while creating your post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center min-h-[calc(100vh-80px)]">
          <RingLoader color={"#1F2937"} loading={loading} size={60} />
          <p className="text-gray-900"> Creating your post ... </p>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center sm:pt-20 pt-12">
          <h1 className="text-3xl text-center text-white w-[345px] bg-gray-900 my-2">
            {" "}
            Create Post{" "}
          </h1>
          <div className="p-8 bg-gradient-to-l from-slate-200 to-slate-600 rounded-lg">
            <div className="flex flex-col">
              <input
                type="text"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="rounded h-12 w-72 px-4 mb-4 font-semibold text-zinc-800 border-2 border-zinc-500"
                placeholder="Enter caption..."
              />
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                className="block w-full text-sm text-gray-800
      file:mr-4 file:py-2 file:px-4
      file:rounded-full
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-gray-800
      hover:file:bg-violet-100
      file:border-zinc-500
      file:border-0
    "
              />
              <button
                onClick={() => uploadImage()}
                className="bg-gray-800 hover:bg-gray-900 text-white text-lg font-semibold h-12 mt-2 rounded px-4 w-full"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreatePost;
