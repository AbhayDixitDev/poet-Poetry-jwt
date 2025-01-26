import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Layout from './Component/Layout'
import Login from './Pages/Login'
const App = () => {
  return (
   <>
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<Layout/>}>
      <Route index element={<Login/>} ></Route>

    </Route>
   </Routes>
   </BrowserRouter>
   </>
  )
}

export default App