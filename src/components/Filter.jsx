import React, { useState } from 'react';
import { BsFilterRight } from 'react-icons/bs';
import "../styles/filter.css"
import { filterProductsThunk } from '../store/slices/Products.slice';

const Filter = ({categories,filter,dispatch}) => {
    const [activeFilter,setActiveFilter]=useState(false)
    return (
        <div>
           <div className='categoriesLeft'>
                <ul class="list-group listCategories">
                    <li className="liTitle"
                        onClick={()=>{setActiveFilter(!activeFilter)}}>
                        Categories
                    </li>
                     {activeFilter && categories?.map(category=>(
                            
                            <li class="list-group-item" 
                                key={category.id}  
                                onClick={()=>{dispatch(filterProductsThunk(category.id))}}>
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