import React from 'react'
//import img from '../assets/img/bg.png'


const Home = () => {
  return (
    <div className='bg-[#e3edf6] pt-4'>
        <div className='py-4 px-48 grid md:grid-cols-2 w-full'>
            <div className='flex items-center'>
                <div className='max-w-[450px] space-y-4 bg-white p-4 rounded-lg shadow'>
                    <h2 className='text-gray-950 font-bold text-3xl md:text-4xl'>
                        Lo más nuevo al mejor precio
                    </h2>
                    <h3 className='text-3xl font-semibold'>Ofertas especiales</h3>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Home