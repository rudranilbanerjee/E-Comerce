import {React,useState,useContext} from 'react'
import "./Login.scss";
// import logo from "../assets/amazon-logo.png"
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import {Context} from '../utils/context';
import { storeUser } from '../utils/api';
const initialUser={password:"",identifier:""};

export default function Login() {
    const [user,setUser]=useState(initialUser)
    const navigate=useNavigate();
    const {currentPath,auth,setAuth}=useContext(Context);
    const handleChange=(e)=>{
        setUser((currentUser)=>({
            ...currentUser,
            [e.target.name]:e.target.value
        }));
    }
    const handleLogin=async ()=>{
        const url=process.env.REACT_APP_DEV_URL+"/api/auth/local"
        try{
            if(user.identifier && user.password){
                const {data}=await axios.post(url,user)
                if(data.user.confirmed && data.jwt){
                    storeUser(data);
                    setAuth(true);
                    setUser(initialUser);
                    navigate(currentPath);
                }else{
                    console.log("not")
                }
            }
        }catch(error){
            console.log(error.message);
        }
    }
  return (
    <div className="box">
        <div className="logIn">
            {/* <img src={logo} alt="amazon-logo" className='logo'/> */}
            <input type="email" name="identifier" value={user.identifier} onChange={handleChange} placeholder="Enter Email/Mobile Number" className='inputBox'/>
            <input type="password" name="password" value={user.password} onChange={handleChange} placeholder="Enter Password" className='inputBox'/>
            <button className='loginBtn' onClick={handleLogin}>Log In</button>
            <div className='regis'>
                <span>New User ?</span>
                <Link to="/signup" className="login"> Sign Up</Link>
            </div>
        </div>
    </div>
  )
}
