import React from 'react'
import { Route, Routes } from 'react-router'
import ProductsPage from '../pages/ProductsPage'
import CategoryPage from '../pages/CategoryPage'
import UsersPage from '../pages/UsersPage'
import CreateProductPage from '../pages/CreateProductPage'
import DetailProductPage from '../pages/DetailProductPage'

const Routers = () => {
  return (
    <Routes>
        <Route path='/' element={<ProductsPage/>} />
        <Route path='categories' element={<CategoryPage/>}/>
        <Route path='users' element={<UsersPage/>}/>
        <Route path="create-product" element={<CreateProductPage />} />
        <Route path="product/:id" element={<DetailProductPage />} />
    </Routes>
  )
}

export default Routers