import {useContext, useEffect} from 'react';
import {Routes,Route} from "react-router-dom"
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"
import Home from "./components/Home/Home"
import Category from "./components/Category/Category"
import SingleProduct from "./components/SingleProduct/SingleProduct"
import Newsletter from "./components/Footer/Newsletter/Newsletter"
// import Myorder from "./components/MyOrder/Myorder";
import Success from './components/Success/Success';
// import Cancel from './components/Cancel/Cancel';
import {Context} from "./utils/context"
import Login from "./login/Login"
import Signup from "./signup/Signup"
function App() {
    const {auth,setAuth}=useContext(Context);
    const loginHandler=()=>{
        setAuth(!auth);
    }
    useEffect(()=>{
        const details=localStorage.getItem('User-Token');
        if(details){
            if(JSON.parse(details).jwt){
                console.log("jhhh");
                setAuth(true);
            }else{
                setAuth(false);
            }
        }
    },[auth])
    return (<>
            <Header login={loginHandler} status={auth}/>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path='/' element={<Home/>}/>
                <Route path='/category/:id' element={<Category/>}/>
                <Route path='/product/:id' element={<SingleProduct/>}/>
                {/* <Route path='/myorder' element={<Myorder/>}/> */}
                <Route path='/success' element={<Success/>}/>
                {/* <Route path='/failed' element={<Cancel/>}/> */}
                {/* <Route path='/facebook' element={<Facebok/>}/>
                <Route path='/instagram' element={<Instagram/>}/>
                <Route path='/twitter' element={<Twitter/>}/>
                <Route path='/whatsapp' element={<WhatsApp/>}/> */}
            </Routes>
            <Newsletter/>
            <Footer/>
        </>
    );
}

export default App;
