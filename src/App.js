import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Layout, Typography, Space } from 'antd';
import { Navbar, Exchanges, Homepage, CryptoDetails, Cryptocurrencies, News } from './components';

import './App.css';

const App = () => {
  return (
    <div className='app'>
      <div className='navbar'>
        <Navbar />
      </div>
      <div className='main'>
        <Layout>
          <div className='Routes'>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/exchanges" element={<Exchanges />} />
              <Route path="/cryptocurrencies" element={<Cryptocurrencies />} />
              <Route path="/crypto/:coinId" element={<CryptoDetails />} />
              <Route path="/news" element={<News />} />
            </Routes>
          </div>
        </Layout>
      
      <div className='footer' >
        <Typography.Title level={5} style={{color:'white' , textAlign: 'center'}}>
            Made by Mayank Johari   
        </Typography.Title>
        <Space >
            <Link to="https://github.com/mayankmj">Github</Link>
             <Link to="https://twitter.com/MayankJohari3">Twitter</Link>
              <Link to="mailto:mayankjohari877@gmail.com">Email</Link>
        </Space>
      </div>
      </div>
    </div>
  );
}

export default App;
