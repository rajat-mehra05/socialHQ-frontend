import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../constants";
import { UserContext } from "../context/Context";

const Card = ({ item, setData, data }) => {
  const { state } = useContext(UserContext);
  const [comment, setComment] = useState("");

  //like post
  const likePost = (id) => {
    fetch(`${API_URL}/like`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        //   console.log(result)
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //unlike post
  const unlikePost = (id) => {
    fetch(`${API_URL}/unlike`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        //   console.log(result)
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // add comment
  const addComment = (text, postId) => {
    fetch(`${API_URL}/comment`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId,
        text,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //delete post
  const deletePost = (postid) => {
    fetch(`${API_URL}/deletepost/${postid}`, {
      method: "delete",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        const newData = data.filter((item) => {
          return item._id !== result._id;
        });
        setData(newData);
      });
  };

  //handleSharePost
  const handleSharePost = async () => {
    await navigator.share({
      url: `https://social-hq.vercel.app/post/${item._id}`,
      text: item.body,
      title: item.body,
    });
  };

  const defaultPicHandler = (e) => {
    e.target.src =
      "https://res.cloudinary.com/dxgo68vci/image/upload/v1654137691/default_oqgq0v.png";
  };

  return (
    <div
      className="shadow-sm max-w-2xl p-2 rounded-2xl bg-gradient-to-r from-[#e9f1ed] to-gray-200"
      key={item._id}
    >
      <div className="flex justify-between p-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <Link
              to={
                item.postedBy._id !== state._id
                  ? "/profile/" + item.postedBy._id
                  : "/profile"
              }
            >
              <img
                src={item.postedBy.pic}
                onError={defaultPicHandler}
                alt="userImage"
              />
            </Link>
          </div>
          <h2 className="py-2 text-xl font-semibold text-gray-900">
            <Link
              to={
                item.postedBy._id !== state._id
                  ? "/profile/" + item.postedBy._id
                  : "/profile"
              }
            >
              {item.postedBy.name}
            </Link>
          </h2>
        </div>

        {item.postedBy._id === state._id && (
          <button>
            <i
              onClick={() => deletePost(item._id)}
              className="fas fa-trash trash-icon hover:cursor-pointer hover:scale-105 text-gray-800 hover:text-red-700"
            />
          </button>
        )}
      </div>

      {/* image section */}
      <h3 className="font-semibold text-slate-900 py-1 pl-2 italic">
        {" "}
        {item.body}{" "}
      </h3>
      <img
        className="w-full h-64 object-cover rounded-2xl"
        src={item.photo}
        alt="postPic"
        loading="lazy"
      />

      {/* card body section */}

      <div className="flex flex-col px-4 py-2 gap-1">
        <div className="flex items-center gap-4">
          <span className="text-xl hover:cursor-pointer">
            {item.likes.includes(state._id) ? (
              <i
                className="fas fa-heart text-red-500 text-2xl"
                onClick={() => {
                  unlikePost(item._id);
                }}
              />
            ) : (
              <i
                className="fas fa-heart text-[#727981] text-2xl"
                onClick={() => {
                  likePost(item._id);
                }}
              />
            )}
          </span>

          <span onClick={handleSharePost}>
            <i className="fas fa-share-square text-[#727981] text-2xl cursor-pointer"></i>
          </span>
        </div>

        <span className="font-semibold italic text-gray-900">
          {" "}
          Liked by {item.likes.length} people{" "}
        </span>

        <div className="py-2">
          {item.comments.map((record) => {
            return (
              <>
                <h6 key={record._id}>
                  <span className="font-semibold text-gray-900">
                    {record?.postedBy.name}
                  </span>{" "}
                  {record.text}
                </h6>
              </>
            );
          })}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              addComment(e.target[0].value, item._id);
              setComment("");
            }}
          >
            <input
              type="text"
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
              className="rounded w-full h-12 px-4 bg-white border-2 border-gray-900 text-gray-900"
              placeholder="add a comment..."
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Card;
