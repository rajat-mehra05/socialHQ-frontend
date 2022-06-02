import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../context/Context";

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const { state, dispatch } = useContext(UserContext);
  const { userid } = useParams();
  const [showFollow, setShowFollow] = useState(
    !state?.following?.includes(userid) || true
  );

  useEffect(() => {
    fetch(`/user/${userid}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);
        setUserProfile(result);
      });
  }, [userid]);

  const followUser = () => {
    fetch("/follow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        followId: userid,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        dispatch({
          type: "UPDATE",
          payload: { following: data.following, followers: data.followers },
        });
        localStorage.setItem("user", JSON.stringify(data));
        setUserProfile((prevState) => {
          return {
            ...prevState,
            user: {
              ...prevState.user,
              followers: [...prevState.user.followers, data._id],
            },
          };
        });
        setShowFollow(false);
      });
  };

  const unfollowUser = () => {
    fetch("/unfollow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        unfollowId: userid,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: "UPDATE",
          payload: { following: data.following, followers: data.followers },
        });
        localStorage.setItem("user", JSON.stringify(data));

        setUserProfile((prevState) => {
          const newFollower = prevState.user.followers.filter(
            (item) => item !== data._id
          );
          return {
            ...prevState,
            user: {
              ...prevState.user,
              followers: newFollower,
            },
          };
        });
        setShowFollow(true);
      });
  };

  const defaultPicHandler = (e) => {
    e.target.src =
      "https://res.cloudinary.com/dxgo68vci/image/upload/v1654137691/default_oqgq0v.png";
  };

  return (
    <>
      {userProfile ? (
        <div className="max-w-5xl my-0 mx-auto">
          <div className="flex flex-col sm:justify-around items-center justify-center border-solid border-b-2 border-zinc-400 py-2">
            <div className="w-28 h-28 rounded-full sm:w-48 sm:h-48 overflow-hidden">
              <img
                src={userProfile.user.pic}
                onError={defaultPicHandler}
                alt="random"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-8">
              <>
                <h2 className="font-bold text-center text-xl">
                  {userProfile.user.name}
                </h2>

                {showFollow ? (
                  <button
                    onClick={() => followUser()}
                    className="bg-gray-800 hover:bg-gray-900 text-white text-lg font-semibold h-8 mt-2 rounded px-4 w-full"
                  >
                    Follow
                  </button>
                ) : (
                  <button
                    onClick={() => unfollowUser()}
                    className="bg-gray-800 hover:bg-gray-900 text-white text-lg font-semibold h-8 mt-2 rounded px-4 w-full"
                  >
                    Unfollow
                  </button>
                )}

                <div className="flex gap-4 my-4">
                  <h5>
                    {" "}
                    {userProfile.posts.length}{" "}
                    <span className="font-semibold">Posts</span>{" "}
                  </h5>
                  <h5>
                    {" "}
                    {userProfile.user.followers.length}{" "}
                    <span className="font-semibold">Followers</span>{" "}
                  </h5>
                  <h5>
                    {" "}
                    {userProfile.user.following.length}{" "}
                    <span className="font-semibold">Following</span>{" "}
                  </h5>
                </div>
              </>
            </div>
          </div>

          <div className="m-8 flex flex-wrap gap-8 sm:justify-center">
            {userProfile.posts.map((item) => {
              return (
                <img
                  key={item._id}
                  className="w-72 h-72 object-fit"
                  src={item.photo}
                  alt={item.title}
                  loading="lazy"
                />
              );
            })}
          </div>
        </div>
      ) : (
        <h2>Loading...</h2>
      )}
    </>
  );
};

export default UserProfile;
