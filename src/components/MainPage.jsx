import { useEffect, useState } from "react";
import Card from "./Card";

const MainPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/allpost", {
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
      <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-4 p-8 mx-auto bg-gradient-to-l from-gray-200 to-zinc-400">
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
