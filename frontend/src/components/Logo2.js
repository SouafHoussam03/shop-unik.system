import React from 'react'
import Logo from './Logo.jpg'

const LogoComponent = ({w,h}) => {
  return (
    <img src={Logo} alt="logo" width={w} height={h} className='object-cover'/>
  )
}

export default LogoComponent;

//