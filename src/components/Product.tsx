import React, { useEffect } from "react";
import ProductCart from "./ProductCart";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchProducts } from "../redux/slice/productSlice";
import { NavLink } from "react-router-dom";

const Product: React.FC = () => {
  // const products = [
  //     {
  //         id: 0,
  //         img: ima,
  //         title: "Laptop",
  //         category: "Tecno",
  //         price: "200"
  //     },
  //     {
  //         id: 1,
  //         img: ima,
  //         title: "Laptop",
  //         category: "Tecno",
  //         price: "200"
  //     },
  //     {
  //         id: 2,
  //         img: ima,
  //         title: "Laptop",
  //         category: "Tecno",
  //         price: "200"
  //     },
  //     {
  //         id: 3,
  //         img: ima,
  //         title: "Laptop",
  //         category: "Tecno",
  //         price: "200"
  //     },
  //     {
  //         id: 4,
  //         img: ima2,
  //         title: "Celular",
  //         category: "Tecno",
  //         price: "200"
  //     },
  // ]
  const dispatch = useAppDispatch();
  const { products, status, error } = useAppSelector((state) => state.products);
  const ima: string = "https://res.cloudinary.com/dofxo1uga/image/upload/v1721630202/images/laptop_gggskb.jpg"

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  let content;

  if (status === "loading") {
    content = <div>Loading...</div>;
  } else if (status === "succeeded") {
    content = (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-8">
        {products.map((prod) => (
          <ProductCart
            key={prod.id}
            id={prod.id}
            img={ima}
            category={prod.category}
            title={prod.name}
            price={prod.price}
          />
        ))}
      </div>
    );
  } else if (status === "failed") {
    content = <div>{error}</div>;
  }

  return (
    <div className="container mt-32">
      <div className="sm:flex justify-between items-center">
        <h2 className="text-4xl font-medium">Products</h2>
        <NavLink to={"create-product"} className="text-xl border rounded-md bg-sky-500 text-white px-2">Crear Nuevo Producto</NavLink>
        <div className="text-gray-500 flex gap-4 text-xl mt-4 sm:mt-0">
        </div>
      </div>      
        {content}
      </div>
    
  );
};

export default Product;
