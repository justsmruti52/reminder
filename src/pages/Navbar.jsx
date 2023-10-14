import React from 'react'

const Navbar = () => {
  let name="aru"
  return (
    <nav className='navbar'>
    
    <ul className='list1'>
        <a href='/login'>Login</a>
        <a href='/signup'>Signup</a>
        </ul>
    </nav>
  )
}

export default Navbar