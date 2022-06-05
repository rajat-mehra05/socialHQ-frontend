import { useEffect, useState } from "react";
import { API_URL } from "../constants";
import Card from "./Card";

const MainPage = () => {
  const [data, setData] = useState([]);

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
      });
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-4 p-8 mx-auto bg-white">
        {data.map((item) => {
          return (
            <Card item={item} data={data} setData={setData} key={item.key} />
          );
        })}
      </div>
    </>
  );
};

export default MainPage;
