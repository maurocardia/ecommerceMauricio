import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getProductsThunk } from '../store/slices/Products.slice';
import "../styles/productsDetails.css"
import {GrFormNext, GrFormPrevious} from "react-icons/gr"
import { addToCartThunk } from '../store/slices/cart.slice'
import {AiOutlineShoppingCart} from "react-icons/ai"

const ProductDetails = () => {
    const [productDetails, setProductDetails]=useState({})
    const {id} = useParams()
    const products = useSelector(state=>  state.products)
    const dispatch=useDispatch()
    const [suggestedProducts,setSuggestedProducts]= useState([])
    const navigate = useNavigate()
    const [quantity,setQuantity]=useState(0)
    const [codImg,setCodImg]=useState(0)


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
const changeToImage=()=>{
    if(codImg===2){
        setCodImg(0)
    }else{setCodImg(codImg+1)}


    
    console.log(codImg)
    return codImg
}

const changeToImagerev=()=>{
    if(codImg===0){
        setCodImg(2)
    }else{setCodImg(codImg-1)}
}


    return (
        <div>
            <div className='containerDetails'>
                <div className='containerProductLeft'>

                    <div className='productLeft'>
                        <button className='leftButton' onClick={()=>changeToImagerev()}><h1><GrFormPrevious/></h1></button>
                        <img src={productDetails?.productImgs?.[codImg]} alt="" />
                        <button className='rightButton' onClick={()=>changeToImage()}><h1><GrFormNext/></h1></button>
                    </div>
                    <div className='containerImgDetails'>
                        <img src={productDetails?.productImgs?.[1] } alt="" onClick={()=>{setCodImg(1)}} />
                        <img src={productDetails?.productImgs?.[2]} alt="" onClick={()=>{setCodImg(2)}}/>
                        <img src={productDetails?.productImgs?.[0]} alt="" onClick={()=>{setCodImg(0)}}/>
                    </div>
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
                      <li >
                        <div className='containerSuggested'>
                            <div className='containerImgSuggested' onClick={()=>navigate(`/product/${suggestedProduct.id}`)}>
                                <img src={suggestedProduct.productImgs[0]} alt="" />

                            </div>
                            <h5 className='titleSuggested'>{suggestedProduct.title}</h5>  
                            <h4  className='priceSuggested'>Price</h4>  
                            <div className="containerPriceSuggest">
                                <h4 className='totalPrice'>$ {suggestedProduct.price}</h4>
                                <button className='priceButton' onClick={()=>addToCart(productDetails.id)}><AiOutlineShoppingCart/></button>
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