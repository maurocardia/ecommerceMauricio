import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getProductsThunk } from '../store/slices/Products.slice';
import "../styles/productsDetails.css"
import {GrFormNext, GrFormPrevious} from "react-icons/gr"
import { addToCartThunk } from '../store/slices/cart.slice'


const ProductDetails = () => {
    const [productDetails, setProductDetails]=useState({})
    const {id} = useParams()
    const products = useSelector(state=>  state.products)
    const dispatch=useDispatch()
    const [suggestedProducts,setSuggestedProducts]= useState([])
    const navigate = useNavigate()
    const [quantity,setQuantity]=useState(0)


    useEffect(()=>{
    const product = products.find(selectProduct=> selectProduct.id === Number(id)) 
    setProductDetails(product)
    console.log(productDetails)
    

    const filteredProducts = products.filter(productItem => productItem?.category.id === product?.category.id)
    setSuggestedProducts(filteredProducts)
},[products,id])


useEffect(()=>{
    dispatch(getProductsThunk())
},[])

const addToCart = (idProduct)=>{
    const item={
        "id": idProduct,
        "quantity": quantity
    }
   dispatch(addToCartThunk(item))
   console.log(item)

}
console.log(productDetails)

    return (
        <div>
            <div className='containerDetails'>

                <div className='productLeft'>
                    <button><h1><GrFormPrevious/></h1></button>
                    <img src={productDetails?.productImgs?.[0]} alt="" />
                    <button><h1><GrFormNext/></h1></button>
                </div>
                <div className='productRight'>

                    <h1>{productDetails?.title}</h1>
                    <p>{productDetails?.description}</p>
                    <h4>Price</h4>
                    <div className='containerAdd'>

                        <h5>$ {productDetails?.price}</h5>
                        <div className='containerQuantity'>
                            
                            <button onClick={()=>{setQuantity(quantity-1)}}><h4>-</h4></button>
                            <h3>{quantity}</h3>
                            <button onClick={()=>{setQuantity(quantity+1)}}><h4>+</h4></button>
                        </div>
                    </div>
                    <div className='containerButtonAdd'>
                        <button className='buttonAdd' onClick={()=>addToCart(productDetails.id)}>Add to cart</button>
                    </div>

                </div>

            </div>
            <ul className='containerSuggestedUl'>
                {
                    suggestedProducts.map(suggestedProduct => (
                      <li onClick={()=>navigate(`/product/${suggestedProduct.id}`)}>
                        <div className='containerSuggested'>
                            <div className='containerImgSuggested'>
                                <img src={suggestedProduct.productImgs[0]} alt="" />

                            </div>
                            <h5 className='titleSuggested'>{suggestedProduct.title}</h5>  
                            <h4  className='priceSuggested'>Price</h4>  
                            <div className="containerPriceSuggest">
                                <h4 className='totalPrice'>$ {suggestedProduct.price}</h4>
                                <button className='priceButton'></button>
                            </div>
                        </div>
                      </li> 
                               
                    ))
                }
            </ul>
        </div>
       
    );
};

export default ProductDetails;