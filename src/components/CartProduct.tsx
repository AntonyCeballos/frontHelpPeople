import React from 'react'
import { RxCross1 } from 'react-icons/rx'
import { useAppDispatch } from '../redux/hooks'
import { removeProduct } from '../redux/slice/cartSlice'

interface propsType{
    id: number,
    img: string,
    title: string,
    price: number,
    quantity: number
}

export const CartProduct: React.FC<propsType> = ({id, img, title, price, quantity}) => {
  
    const dispatch = useAppDispatch()
    const newPrice = Math.ceil(price * 0.9)

    return (
    <div className='flex justify-between items-center'>
        <div className='flex items-center gap-4'>
            <img src={img} alt={title} className='h-[80px]' />
            <div className='space-y-2'>
                <h2 className='font-medium'>{title}</h2>
                <p className='text-gray-600'>{quantity} x {newPrice}</p>
            </div>
        </div>
        <RxCross1 onClick={()=> dispatch(removeProduct(id))} className='cursor-pointer'/>
    </div>
  )
}
