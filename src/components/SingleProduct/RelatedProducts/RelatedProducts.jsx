import useFetch from "../../../hooks/useFetch";
// import Category from "../../Category/Category";
import Products from "../../Products/Products";
const RelatedProducts = ({productId,categoryId}) => {
    // console.log(CategoryId)
    const data=useFetch(`/api/products?populate=*&filters[id][$ne]=${productId}&filters[categories][id]=${categoryId}
    &pagination[start]=0&pagination[limit]=8`)                             //[$ne] is mean not equal to
    // console.log(data);
    return <div className="related-products">
        <Products headingText="Related Products" products={data}/>
    </div>;
};

export default RelatedProducts;
