import React from 'react'
import { Switch , Route ,  Link, Routes} from 'react-router-dom'
import { Layout ,  Typography ,  Space } from 'antd'
import {Navbar} from './components'

import './App.css'
const App = () => {
  return (
    <div className='app'>
       <div className='navbar'>
          <Navbar />
       </div>
       <div className='main'>
          <Layout>
              <div className='routes'>
                   <Switch>
                       <Routes exact path="/">
                            <Homepage /> 
                       </Routes>
                       <Routes exact path="/exchanges">
                            <Exchanage /> 
                       </Routes>
                       <Routes exact path="/cryptocurrencies">
                            <Cryptocurrencies /> 
                       </Routes>
                       <Routes exact path="/crypto/:coinId">
                            <CryptoDetails />
                       </Routes>
                       <Routes exact path="news">
                            <News />
                       </Routes>
                   </Switch>
              </div>
          </Layout>
       </div>

       <div className='footer'>
          
       </div>
    </div>
  )
}

export default App