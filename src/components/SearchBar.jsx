import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../constants";
import { UserContext } from "../context/Context";

export default function SearchBar() {
  const [search, setSearch] = useState("");
  const [userDetails, setUserDetails] = useState([]);
  const { state } = useContext(UserContext);

  const fetchUsers = async (query) => {
    setSearch(query);
    const res = await fetch(`${API_URL}/search-users`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
      }),
    });

    const data = await res.json();
    setUserDetails(data.user);
  };

  return (
    <>
      <div>
        <input
          className="text-gray-700 p-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-300"
          type="text"
          placeholder="Search users "
          value={search}
          onChange={(e) => fetchUsers(e.target.value)}
        />
        <ul className="bg-gray-800 mt-4 w-auto">
          {userDetails.map((item) => {
            return (
              <Link
                to={
                  item._id !== state._id ? "/profile/" + item._id : "/profile"
                }
                onClick={() => {
                  setSearch("");
                }}
              >
                <li className="collection-item">{item.email}</li>
              </Link>
            );
          })}
        </ul>
      </div>
    </>
  );
}
