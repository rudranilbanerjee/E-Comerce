import {React,useState,useContext} from 'react'
// import logo from '../assets/amazon-logo.png'
import { Link, useNavigate } from 'react-router-dom'
import "./Signup.scss";
import axios from "axios";
import {Context} from '../utils/context';
import { storeUser } from '../utils/api';

const initialUser={username:'',email:'',password:''};
export default function Signup() {
    const navigate=useNavigate();
    const [user,setUser]=useState(initialUser);
    const {currentPath,auth,setAuth}=useContext(Context);
    const signUp=async ()=>{
        try {
            const url=process.env.REACT_APP_DEV_URL+"/api/auth/local/register";
            if(user.username && user.email && user.password){
                const {data}=await axios.post(url,user);
                if(data.user.confirmed && data.jwt){
                    storeUser(data);
                    setAuth(true);
                    setUser(initialUser);
                    navigate(currentPath);
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
    const handleUserChange=(e)=>{
        setUser((currentuser)=>({
            ...currentuser,
            [e.target.name]:e.target.value
        }))
    }
  return (
    <div className='box'>
        <div className='signup'>
            {/* <img src={logo} alt="amazon-logo" className='logo'/> */}
            <input type="text" name="username" value={user.username} onChange={handleUserChange} placeholder="Enter UserName" className='inputBox'/>
            <input type="email" name="email" value={user.email} onChange={handleUserChange} placeholder="Enter Email/Mobile Number" className='inputBox'/>
            <input type="password" name="password" value={user.password} onChange={handleUserChange} placeholder="Enter Password" className='inputBox'/>
            <button className='loginBtn' onClick={signUp}>Sign Up</button>
            <div className='log'>Already have an account ?<Link to="/login" className="login"> Log In</Link></div>
        </div>
    </div>
  )
}
