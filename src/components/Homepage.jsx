import React from 'react'
import { Typography ,  Row, Col ,Statistic } from 'antd'
import { Link } from 'react-router-dom'


import { useGetCryptosQuery } from '../services/cryptoApi'
import Cryptocurrencies from './Cryptocurrencies'
import News from './News'

import './style/HomepageStyle.css'

const {Title} = Typography

const Homepage = () => {

  const {data,isFetching} = useGetCryptosQuery();

  const globalStats = data;
  console.log(data);

  if(isFetching) return 'Loading..';
  return (
    <div className='homepage-div'>
      <Title level={2} className='homepage-title'>
          Global Crypto Statistic
      </Title>

      <Row>
          {/* total 24 col , 12 means half page */}
          <Col span={12}>
               <Statistic title="Totol Cryptocurrencies" value={globalStats.cryptocurrencies_number
}/>
          </Col>
           <Col span={12}>
               <Statistic title="Totol Market Cap" value={globalStats.market_cap_usd}/>
          </Col>
           <Col span={12}>
               <Statistic title="Totol 24th Volume" value={globalStats.volume_24h_usd}/>
          </Col>
           <Col span={12}>
               <Statistic title="Bitcoin Dominance Percentage" value={globalStats.bitcoin_dominance_percentage}/>
          </Col> 
      </Row>

      <div className='home-heading-container'>
        <Title level={2} className='home-title'>Top 10 cryptocurrencies in the world</Title>
         <Title level={3} className='show-more'><Link to='/cryptocurrencies'>Show more</Link></Title>
      </div>
      <Cryptocurrencies simplified/>

       <div className='home-heading-container'>
        <Title level={2} className='home-title'>Latest Crypto News</Title>
         <Title level={3} className='show-more'><Link to='/news'>Show more</Link></Title>
      </div>
      <News simplified/>
    </div>
  )
}

export default Homepage