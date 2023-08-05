import {useParams} from "react-router-dom";
import "./Category.scss";
import Products from "../Products/Products";
import useFetch from "../../hooks/useFetch";
const Category = () => {
    const {id}=useParams();

    const products=useFetch(`/api/products?populate=*&[filters][categories][id]=${id}`) // here it will filter out this product which is associate with catagories id 
    console.log(products);
    return <div className="category-main-content">
        <div className="layout">
            <div className="category-title">{products?.data?.[0]?.attributes?.categories?.data?.[0]?.attributes?.title}</div>
            <Products innerPage={true} products={products}/>
        </div>
    </div>;
};

export default Category;