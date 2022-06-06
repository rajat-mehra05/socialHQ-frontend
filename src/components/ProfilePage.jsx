import { useContext, useEffect, useState } from "react";
import { RingLoader } from "react-spinners";
import { API_URL } from "../constants";
import { UserContext } from "../context/Context";

const ProfilePage = () => {
  const [photos, setPhotos] = useState([]);
  const [avatar, setAvatar] = useState("");
  const [loading, setLoading] = useState(true);

  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    fetch(`${API_URL}/mypost`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setPhotos(result.mypost);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (avatar) {
      const data = new FormData();
      data.append("file", avatar);
      data.append("upload_preset", "socialhq");
      data.append("cloud_name", "dxgo68vci");
      fetch("https://api.cloudinary.com/v1_1/dxgo68vci/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          fetch(`${API_URL}/updatepic`, {
            method: "put",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
            body: JSON.stringify({
              pic: data.url,
            }),
          })
            .then((res) => res.json())
            .then((result) => {
              console.log(result);
              localStorage.setItem(
                "user",
                JSON.stringify({ ...state, pic: result.pic })
              );
              dispatch({ type: "UPDATEPIC", payload: result.pic });
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [dispatch, avatar, state]);

  const updatePhoto = (file) => {
    setAvatar(file);
  };

  const defaultPicHandler = (e) => {
    e.target.src =
      "https://res.cloudinary.com/dxgo68vci/image/upload/v1654137691/default_oqgq0v.png";
  };

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center min-h-[calc(100vh-80px)]">
          <RingLoader color={"#1F2937"} loading={loading} size={60} />
          <p className="text-gray-900 italic font-semibold">
            {" "}
            Fetching your posts ...{" "}
          </p>
        </div>
      ) : (
        <div className="bg-white">
          <div className="max-w-5xl my-0 mx-auto">
            <div className="flex flex-col sm:justify-around items-center justify-center border-solid border-b-2 border-zinc-400 py-2">
              <div className="w-28 h-28 rounded-full sm:w-48 sm:h-48 overflow-hidden">
                <img
                  src={state?.pic}
                  onError={defaultPicHandler}
                  alt="random"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="mt-8">
                <h2 className="font-bold text-center text-xl">
                  {" "}
                  {state?.name}{" "}
                </h2>
                <div className="flex justify-center mx-auto relative">
                  <label
                    for="files"
                    className="bg-gray-100 text-center text-black text-lg font-semibold h-8 mt-2 rounded px-2 w-72"
                  >
                    Choose Avatar
                  </label>
                  <input
                    id="files"
                    type="file"
                    onChange={(e) => updatePhoto(e.target.files[0])}
                    className="bg-red-400 absolute left-0 top-0 w-0 h-0"
                  />
                </div>

                <div className="flex gap-4 my-4 justify-center">
                  <h5>
                    {" "}
                    {photos?.length}{" "}
                    <span className="font-semibold">Posts</span>{" "}
                  </h5>
                  <h5>
                    {" "}
                    {state?.followers?.length || "0"}{" "}
                    <span className="font-semibold">Followers</span>{" "}
                  </h5>
                  <h5>
                    {" "}
                    {state?.following?.length || "0"}{" "}
                    <span className="font-semibold">Following</span>{" "}
                  </h5>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 flex flex-wrap gap-8 sm:justify-center">
            {photos.length ? (
              photos.map((item) => {
                return (
                  <img
                    key={item._id}
                    className="w-72 h-72 object-cover"
                    src={item.photo}
                    alt={item.title}
                    loading="lazy"
                  />
                );
              })
            ) : (
              <p className="text-center font-semibold text-black italic">
                No posts yet!
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ProfilePage;
