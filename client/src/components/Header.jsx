import React from 'react'
import Avatar from '@mui/material/Avatar';

function Header() {
  return (
    <div className='w-full px-10 py-3 flex justify-between items-center shadow-md'>
      <h1 className='text-2xl font-bold'>HyuGen Tech</h1>
      <Avatar sx={{backgroundColor:"blue"}}>H</Avatar>
    </div>
  )
}

export default Header
