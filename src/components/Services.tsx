import React from 'react'
import { MdSupportAgent } from 'react-icons/md'
import { SiMoneygram } from 'react-icons/si'
import { ImTruck } from 'react-icons/im'
import { MdDiscount } from 'react-icons/md'
import FeatureCard from './FeatureCard'

const Services = () => {

    const data = [
        {
            icon:<ImTruck className='text-4xl' />,
            title: "Envíos gratis",
            desc: "Envíos a todas partes del país"
        },
        {
            icon:<SiMoneygram className='text-4xl' />,
            title: "Devoluciones y reembolso",
            desc: "Garantía de regreso de dinero"
        },
        {
            icon:<MdDiscount className='text-4xl' />,
            title: "Descuento para miembros",
            desc: "En compras mayores a $300"
        },
        {
            icon:<MdSupportAgent className='text-4xl' />,
            title: "Soporte 24/7",
            desc: "Contáctenos a cualquiet hora del día"
        },
    ]

  return (
    <div className='container grid gap-1 sm:grid-cols-2 lg:grid-cols-4 mt-8'>
        {
            data.map(item => (
                <FeatureCard
                    key={item.title}
                    icon={item.icon}
                    desc={item.desc}
                    title={item.title}/>
            ))
        }
    </div>
  )
}

export default Services