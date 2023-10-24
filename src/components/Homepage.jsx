import React from 'react'
import millify from 'millify' // used ot convert long no to human readable format
import { Typography ,  Row, Col ,Statistic } from 'antd'
import { Link } from 'react-router-dom'


import { useGetCryptosQuery } from '../services/cryptoApi'
import Cryptocurrencies from './Cryptocurrencies'
import News from './News'
const {Title} = Typography

const Homepage = () => {

  const {data,isFetching} = useGetCryptosQuery();
  console.log(data);

  const globalStats = data;

  if(isFetching) return 'Loading..';
  return (
    <div>
      <Title level={2} className='heading'>
          Global Crypto Statistic
      </Title>

      <Row>
          {/* total 24 col , 12 means half page */}
          <Col span={12}>
               <Statistic title="Totol Cryptocurrencies" value={globalStats.cryptocurrencies_number
}/>
          </Col>
           <Col span={12}>
               <Statistic title="Totol Exchanges" value="5"/>
          </Col>
           <Col span={12}>
               <Statistic title="Totol Market Cap" value="5"/>
          </Col>
           <Col span={12}>
               <Statistic title="Totol 24th Volume" value="5"/>
          </Col>
           <Col span={12}>
               <Statistic title="Totol Markets" value="5"/>
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