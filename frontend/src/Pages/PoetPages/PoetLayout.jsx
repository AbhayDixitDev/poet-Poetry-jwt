import React from 'react'
import { Outlet } from 'react-router-dom'
import PoetHeader from './PoetHeader'
import PoetFooter from './PoetFooter'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
const PoetLayout = () => {
    const navigate = useNavigate()
    useEffect(() => {
        if (!localStorage.getItem('poetName')) {
          navigate('/')
        }
      },[])
  return (
    <>
    <PoetHeader/>
    <Outlet/>

    <PoetFooter/>

    </>
  )
}

export default PoetLayout