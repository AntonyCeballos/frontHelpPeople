import { useAppSelector } from "../redux/hooks";
import { RxCross1 } from "react-icons/rx";
import { CartProduct } from "./CartProduct";

const Cart = ({setOpenCart}: any) => {

    const products = useAppSelector((store) => store.cart)
    //console.log(useAppSelector((store) => store.cart))

    const getTotal = () => {
        let total = 0;
        products.forEach((item) => (total = total + item.price * item.quantity))
        return total;
    }

  return (
    <div className="fixed left-0 top-0 z-20 overflow-y-scroll bg-[#000007d] w-full min-h-screen">
        <div className="max-w-[400px] w-full min-h-full bg-white absolute right-0 top-0 p-6">
            <RxCross1 onClick={() => setOpenCart(false)} className="absolute right-0 top-0 m-6 text-2xl cursor-pointer"/>
            <h3 className="pt-6 text-lg font-medium text-gray-600 uppercase">Tu Carrito</h3>
            <div>
            {
                products?.map((item:any) => (
                    <CartProduct
                        key={item.id}
                        id={item.id}
                        img={item.img}
                        title={item.title}
                        price={item.price}
                        quantity={item.quantity}
                    />
                ))
            }    
            </div>
            <div className="flex justify-between items-center font-medium text-xl py-4">
                <p>Total:</p>
                <p>${getTotal()}</p>
            </div>
            <div>
                <button className="bg-sky-500 text-white text-center w-full rounded-md py-2 hover:bg-sky-600 my-4">
                    Ver Carrito
                </button>
                <button className="bg-sky-500 text-white text-center w-full rounded-md py-2 hover:bg-sky-600">
                    Ver Productos
                </button>
            </div>       
        </div>
    </div>
  )
}

export default Cart