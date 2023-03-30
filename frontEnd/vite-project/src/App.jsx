import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './App.css'
import { Admin_Page } from './pages/Admin_Page'
import { Detail_Page } from './pages/Detail_Page'
import { Home_Page } from './pages/Home_Page'

function App() {

  return (
    <div className="App">
      <h1>App.jsx</h1>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home_Page> </Home_Page>}></Route>

          <Route path='/detail/:id' element={<Detail_Page> </Detail_Page>}></Route>

          <Route path='/admin' element={<Admin_Page> </Admin_Page>}></Route>
        </Routes>


      </BrowserRouter>



    </div>
  )
}

export default App
