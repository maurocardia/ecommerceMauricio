import React from 'react';
import { BsFilterRight } from 'react-icons/bs';
import "../styles/filter.css"
import { filterProductsThunk } from '../store/slices/Products.slice';

const Filter = ({categories,filter,dispatch}) => {
    return (
        <div>
           <div className='categoriesLeft'>
                <ul class="list-group listCategories">
                    <li className="liTitle">Categories</li>
                     {
                        
                        categories.map(category=>(
                            
                             <li class="list-group-item" key={category.id}  onClick={()=>{dispatch(filterProductsThunk(category.id))}}>
                                {category.name}
                            </li>
            
                            ))
                    }
                </ul>
                
                     
            </div>
            
        </div>
    );
};

export default Filter;