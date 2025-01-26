import React from 'react'
import { Outlet } from 'react-router-dom'
import VisitorHeader from './VisitorHeader'
import VisitorFooter from './VisitorFooter'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
const VisitorLayout = () => {
    const navigate = useNavigate()
    useEffect(() => {
        if (!localStorage.getItem('visitorName')) {
          navigate('/')
        }
      },[])
  return (
    <>
    <VisitorHeader/>
    <Outlet/>

    <VisitorFooter/>

    </>
  )
}

export default VisitorLayout