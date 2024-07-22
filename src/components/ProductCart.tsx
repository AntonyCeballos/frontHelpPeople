import React from "react";
import {
  AiFillStar,
  AiOutlineShoppingCart,
  AiOutlineStar,
} from "react-icons/ai";
import { useAppDispatch } from "../redux/hooks";
import { addToCart } from "../redux/slice/cartSlice";
import { Link } from "react-router-dom";

interface propTypes {
  id: number;
  title: string;
  img: string;
  category: number;
  price: number;
}

const ProductCart = ({ id, img, title, category, price }: propTypes) => {
  const dispatch = useAppDispatch();
  const addProductoToCart = () => {
    const payload = {
      id,
      img,
      title,
      price,
      quantity: 1,
    };
    dispatch(addToCart(payload));
  };

  return (
    <Link to={`product/${id}`} >
      <div className="border border-gray-200">
        <div className="text-center border-b border-gray-200">
          <img src={img} className="inline-block" alt="" />
        </div>
        <div className="px-8 py-4">
          <div className="flex justify-center items-center gap-x-8">
            <p className="text-gray-500 text-sm font-medium">{category}</p>
            <h2 className="font-medium">{title}</h2>
          </div>
          <div className="mt-3 flex items-center justify-between text-[#ffb21d] w-[85%]">
            <div className="flex items-center">
              <div className="flex">
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiOutlineStar />
              </div>
              <p className="text-gray-600 text-sm ml-2">(3 Reviews)</p>
            </div>
            <div>
              <h2 className="font-medium text-green-600 text-xl">${price}</h2>
            </div>
          </div>
          <button
            onClick={addProductoToCart}
            className="flex w-full gap-x-3 justify-center rounded-lg items-center bg-sky-500 text-white mt-2 px-4 py-2 cursor-pointer
        hover:bg-sky-600"
          >
            <AiOutlineShoppingCart className="text-2xl" />
            Agregar al Carrito
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCart;
