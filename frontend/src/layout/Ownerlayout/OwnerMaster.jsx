import React from 'react'
import OwnerHeader from './Ownerheader'
import { Outlet } from 'react-router-dom'
import OwnerFooter from './OwnerFooter'

const OwnerMaster = () => {
  return (
    <>
        <OwnerHeader/>
        <Outlet/>
        <OwnerFooter/>
    
    </>
  )
}

export default OwnerMaster