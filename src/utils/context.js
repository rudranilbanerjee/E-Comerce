import {createContext,useEffect,useState} from "react";
import { useLocation } from "react-router-dom";
export const Context=createContext();

const AppContext=({children})=>{  // children are come as a props and destucturing props object
    const [categories,setCategories]=useState("");
    const [products,setProducts]=useState("");
    const [cartItems,setCartItems]=useState([]);
    const [cartCount,setCartCount]=useState(0);
    const [cartSubTotal,setCartSubTotal]=useState(0);
    const [auth,setAuth]=useState(false);
    const [currentPath,setCurrentPath]=useState("");
    const location=useLocation();
    useEffect(()=>{
        // console.log(location);
        window.scrollTo(0,0);
    },[location])
    
    useEffect(()=>{
        let count=0;
        cartItems.map(item=>count+=item.attributes.quantity);
        setCartCount(count);

        let subTotal=0;
        cartItems.map(item=> subTotal+=(item.attributes.price)*(item.attributes.quantity));
        setCartSubTotal(subTotal);
    },[cartItems]);

    const handleAddToCart=(product,quantity)=>{
        let items=[...cartItems];// shallow copy by speread operator in form of array
        let index=items.findIndex(p=>p.id===product.id)// inside items all the data in form of object so we find like an object inside this array
        if(index!==-1){// product not exist
            items[index].attributes.quantity+=quantity;
        }else{
            product.attributes.quantity=quantity;
            items=[...items,product];
        }
        setCartItems(items);
    };
    const handleRemoveFromCart=(product)=>{
        let items=[...cartItems];
        items=items.filter(p=>{
            return p.id !== product.id;
        });
        setCartItems(items);
    };
    const handleCartProductQuantity=(type,product)=>{
        let items=[...cartItems];
        let index=items.findIndex(p=>p.id===product.id)
        if(type==='inc'){
            items[index].attributes.quantity+=1;
        }else{
            if(items[index].attributes.quantity>1){
                items[index].attributes.quantity-=1;
            }
        }
        setCartItems(items);
    };//type means which type algorith you want to deall with it like increment and decrement
    return(
        <Context.Provider value={{
            categories,setCategories,
            products,setProducts,
            cartItems,setCartItems,
            cartCount,setCartCount,
            cartSubTotal,setCartSubTotal,
            auth,setAuth,
            currentPath,setCurrentPath,
            location,
            handleAddToCart,
            handleRemoveFromCart,
            handleCartProductQuantity,
            }}>
            {children}
        </Context.Provider>
    )
}

export default AppContext;