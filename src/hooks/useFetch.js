import {useEffect,useState} from "react";
import { fetchDataFromApi } from "../utils/api";

const useFetch=(endpoint)=>{
    const [data,setData]=useState();

    useEffect(()=>{
        makeApiCall();
    },[endpoint])
    useEffect( ()=>{
        console.log(data);
    },[data])
    const makeApiCall = async ()=>{
        const data=await fetchDataFromApi(endpoint);
        setData(data);
    }
    return data;
}

export default useFetch;