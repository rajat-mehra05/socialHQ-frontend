import { useEffect, useState } from "react";
import { RingLoader } from "react-spinners";
import { API_URL } from "../constants";
import Card from "./Card";

const MainPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/allpost`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        /* console.log(result); */
        setData(result.posts);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <RingLoader color={"#1F2937"} loading={loading} size={70} />
          <p className="text-gray-900 italic font-semibold">
            {" "}
            Fetching your feed ...{" "}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-4 p-8 mx-auto bg-white">
          {data.map((item) => {
            return (
              <Card item={item} data={data} setData={setData} key={item._id} />
            );
          })}
        </div>
      )}
    </>
  );
};

export default MainPage;
