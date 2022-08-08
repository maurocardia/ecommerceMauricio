import { useState } from 'react'
import './App.css'
import { HashRouter, Routes, Route } from 'react-router-dom'
import Purchases from './pages/Purchases'
import Login from './pages/Login'
import Home from './pages/Home'
import ProductDetails from './pages/ProductDetails'
import { NavBar,Loading } from './components'
import { useSelector } from 'react-redux/es/exports'
import CartModal from './components/CartModal'



function App() {
  const loading = useSelector(state => state.loading)
  

  return (
    <div className='containerApp'>

        <HashRouter>
            <NavBar/>
            <CartModal/>
            {loading && <Loading/>}
          <Routes>
            <Route path='/purchases' element={<Purchases/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/' element={<Home/>}/>
            <Route path='/product/:id' element={<ProductDetails/>}/>
          </Routes>
        </HashRouter>
    </div>
    
  )
}

export default App
