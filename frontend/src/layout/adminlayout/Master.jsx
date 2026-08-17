import React from 'react'
import AdminHeader from './AdminHeader'
import { Outlet } from 'react-router-dom'
import AdminFooter from './AdminFooter'

const AdminMaster = () => {
  return (
    <>
        <AdminHeader/>
        <Outlet/>
        <AdminFooter/>
    
    </>
  )
}

export default AdminMaster