import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux/es/exports';
import { filterProductsThunk, getProductsThunk } from '../store/slices/Products.slice';
import { useNavigate } from 'react-router-dom';
import "../styles/productsHome.css"
import { getInputSearchThunk } from '../store/slices/Products.slice';
import axios from 'axios';
import {BsFilterRight} from "react-icons/bs"
import Filter from '../components/Filter';
import {AiOutlineShoppingCart} from "react-icons/ai"



const Home = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const products = useSelector(state => state.products)
    const [inputValue, setImputValue] = useState("")
    const [categories, setCategories] = useState([])
    const [filter, setFilter]= useState(true)

    useEffect(() => {
        dispatch(getProductsThunk())
        axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/products/categories/`)
            .then(res => setCategories(res.data.data.categories))
    }, [])

    console.log(categories)

    return (
        <div className="containerHome">
            <div className='leftContainer'>
                <Filter categories={categories} filter={filter} dispatch={dispatch}/>
            </div>
            <div className='rightContainer'>
                    <div class="input-group mb-3 inputContainer">
                        <input type="text"
                            class="form-control"
                            placeholder="Search Product"
                            aria-label="Recipient's username"
                            aria-describedby="button-addon2"
                            onChange={e => setImputValue(e.target.value)}
                            value={inputValue} />

                        <button onClick={() => dispatch(getInputSearchThunk(category.id))} class="btn btn-outline-secondary" type="button" >Search</button>
            
                </div>

                <div className="filter filterOff" onClick={()=>{setFilter(!filter)}}>
                {filter===true?(
                        <h1><BsFilterRight/><small>Filters</small> </h1>
                ) :(
                    <div className='categories'>
                    <ul class="list-group">
                        {
                        
                            categories.map(category=>(
                            
                                <li class="list-group-item" key={category.id}  onClick={()=>{dispatch(filterProductsThunk(category.id))}}>
                                    {category.name}
                                </li>
            
                            ))
                        }
                    </ul>
                </div>
                ) }     
                </div>

            

                <div className="containerListProducts">

                    {products.map(product => (
                        <div onClick={() => { navigate(`/product/${product.id}`) }} className="containerList" key={product.id}>
                            <div className="containerImg">
                                <img src={product.productImgs[0]} alt="" />

                            </div>
                            <h3>{product.title}</h3>
                            <p>Price</p>
                            <div className='containerPrice'>
                                <h4>${product.price}</h4>
                                <button><AiOutlineShoppingCart/></button>
                            </div>   
                        </div>
                    ))}
                </div>
            </div>


        </div>
    );
};

export default Home;