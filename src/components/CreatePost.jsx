import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify"
 
const CreatePost = () => {
    const [body, setBody] = useState("")
    const [image, setImage] = useState("");
    const [url, setUrl] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (url) {
          fetch("/createpost", {
            method: "post",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
            body: JSON.stringify({
              body,
              pic: url,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.error) {
                toast(data.error, {type:"error"});
              } else {
                toast("You have successfully posted.");
                navigate("/");
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }, [body, navigate,
         url]);

    const postDetails = () => {
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

    return (
        <div className="flex flex-col justify-center items-center">
           <h1 className="text-3xl text-zinc-900 text-center my-2"> Create Post </h1>
       <div className="border-2 border-zinc-400 p-8">
           <div className="flex flex-col">
           <input type="text" 
            value={body}
            onChange={(e) => setBody(e.target.value)}
           className="rounded h-12 w-72 px-4 mb-4 bg-emerald-100 font-semibold text-zinc-800 border-2 border-zinc-500" placeholder="Enter caption..." />
           <input type="file" 
           onChange={(e) => setImage(e.target.files[0]) }
           className="block w-full text-sm text-gray-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-gray-700
      hover:file:bg-violet-100
      file:border-zinc-500
      file:border-0
    "/> 
     <button
       onClick={() => postDetails()} 
      className="bg-gray-800 hover:bg-gray-900 text-white text-lg font-semibold h-12 mt-2 rounded px-4 w-full">Post</button>
           </div>
           </div>
       </div>
    )
}

export default CreatePost
