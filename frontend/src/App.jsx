import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Layout from './Component/Layout'
import Login from './Pages/Login'
import Registration from './Pages/Registration'
import PoetLayout from './Pages/PoetPages/PoetLayout' 
import AddPoem from './Pages/PoetPages/AddPoem'
import MyPoems from './Pages/PoetPages/MyPoetry'
import AllPoems from './Pages/PoetPages/AllPoems'
import VisitorLayout from './Pages/VisitorPages/VisitorLayout'
import LikedPoem from './Pages/VisitorPages/LikedPoems'
import AllPoemsV from './Pages/VisitorPages/AllPoems'
import YourReviews from './Pages/VisitorPages/YourReviews'
import MyPoemsReviews from './Pages/PoetPages/MyPoemsReviews'
const App = () => {
  return (
   <>
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<Layout/>}>
      <Route index element={<Login/>} ></Route>
      <Route path='register' element={<Registration/>} ></Route>
    </Route>
    <Route path='/poet' element={<PoetLayout/>}>
    <Route index element={<AddPoem/>} ></Route>
    <Route path='addpoem' element={<AddPoem/>} ></Route>
    <Route path='myPoetry' element={<MyPoems/>} ></Route>
    <Route path='allPoetry' element={<AllPoems/>} ></Route>
    <Route path='mypoemreviews' element={<MyPoemsReviews/>} ></Route>
    </Route>
    <Route path='/visitor' element={<VisitorLayout/>}>
    <Route index element={<AllPoemsV/>} ></Route>
    <Route path='allPoetry' element={<AllPoemsV/>} ></Route>
    <Route path='likedPoetry' element={<LikedPoem/>} ></Route>
    <Route path='myreviews' element={<YourReviews/>} ></Route>
    </Route>
   </Routes>
   </BrowserRouter>
   </>
  )
}

export default App