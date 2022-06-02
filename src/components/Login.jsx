import { useState,useContext } from "react";
import { Link, useNavigate } from "react-router-dom"
import {  toast } from 'react-toastify';
import {UserContext} from "../context/Context"

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    const {dispatch} = useContext(UserContext)
    

    const PostData = () => {

        // validation for email
        if (
            !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
              email
            )
          ) {
            toast("Invalid email!", { type: "error"} );
            return;
          }

        fetch("/login", {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email, password
            })
        }).then((res) => res.json())
           .then((data) => {
             /*   console.log(data); */
               if(data.error) {
                   toast(data.error, {type:"error"})
               } else {
                   localStorage.setItem("jwt", data.token)
                   localStorage.setItem("user", JSON.stringify(data.user));

                   dispatch({
                    type: "USER",
                    payload: data.user,
                  });

                   toast("Welcome to Social HQ.", {type: "success"});
                   navigate("/");
               }
           }).catch((err) => {
               console.log(err);
           }) 
    }

    return (
        <>
              <div className="flex flex-col justify-center items-center">
           <h1 className="text-3xl text-zinc-900 text-center my-2"> Log in to your account </h1>
       <div className="border-2 border-zinc-400 p-8">
           <div className="flex flex-col">
           <input type="email" 
            value={email} onChange={(e) => setEmail(e.target.value)}
           className="rounded h-12 w-72 px-4 mb-4 bg-emerald-100 font-semibold text-zinc-800 border-2 border-zinc-500" placeholder="Enter email" />
           <input type="password" 
            value={password} onChange={(e) => setPassword(e.target.value)}
           className="rounded h-12 w-72 px-4 mb-4 bg-emerald-100 font-semibold text-zinc-800 border-2 border-zinc-500" placeholder="Enter password" />
           <button onClick={() => PostData()} 
           className="bg-gray-800 hover:bg-gray-900 text-white text-lg font-semibold h-12 mb-4 rounded px-4 w-full">Login</button>
                
                <h3 className="hover:underline">
                    <Link to="/signup"> New user? Create a new account. </Link>
                </h3>  
           </div>
           </div>
       </div>   
        </>
    )
}

export default Login
