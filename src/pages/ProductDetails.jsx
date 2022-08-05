import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getProductsThunk } from '../store/slices/Products.slice';

const ProductDetails = () => {
    const [productDetails, setProductDetails]=useState({})
    const {id} = useParams()
    const products = useSelector(state=>  state.products)
    const dispatch=useDispatch()
    const [suggestedProducts,setSuggestedProducts]= useState([])
    const navigate = useNavigate()
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

    return (
        <div>
            <h1>{productDetails?.title}</h1>
            <ul>
                {
                    suggestedProducts.map(suggestedProduct => (
                        <li onClick={()=>navigate(`/product/${suggestedProduct.id}`)}>{suggestedProduct.title}</li> 
                    ))
                }
            </ul>
        </div>
       
    );
};

export default ProductDetails;