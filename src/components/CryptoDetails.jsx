import React , {useState}from 'react'
import HTMLReactParser from 'html-react-parser'
import { useParams } from 'react-router-dom'
import millify from 'millify'
import { useGetCoinDetailQuery } from '../services/coinDetailsApi'
import {Row,Col,Typography,Select} from 'antd'
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';

const{Title,Text} = Typography;
const{Option} = Select

const CryptoDetails = () => {
  const{coinId} = useParams();
  const lowerCoinId = coinId.toLowerCase();
  const{data,isFetching} = useGetCoinDetailQuery(lowerCoinId);
  
  console.log(data);


  const[timePeriod,setTimeperiod] = useState('7d');


  const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];
   const stats = [
    { title: 'Price to USD', value: `$ ${data?.market_data?.current_price?.usd && millify(data?.market_data?.current_price?.usd)}`, icon: <DollarCircleOutlined /> },
    { title: 'Rank', value: data?.coingecko_rank, icon: <NumberOutlined /> },
    { title: '24h Volume', value: `$ ${data?.tickers?.volume && millify(data?.tickers?.volume)}`, icon: <ThunderboltOutlined /> },
    { title: 'Market Cap', value: `$ ${data?.market_data?.market_cap?.usd && millify(data?.market_data?.market_cap?.usd)}`, icon: <DollarCircleOutlined /> },
    { title: 'All-time-high(daily avg.)', value: `$ ${data?.market_data?.high_24h?.usd && millify(data?.market_data?.high_24h?.usd)}`, icon: <TrophyOutlined /> },
  ];

  const genericStats = [
    { title: 'FDV Ratio', value: data?.market_data?.market_cap_fdv_ratio, icon: <FundOutlined /> },
    { title: 'Liquidity Supply', value: data?.liquidity_score, icon: <MoneyCollectOutlined /> },
    { title: 'Aprroved Supply', value: 1? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
    { title: 'Total Supply', value: `$ ${data?.supply?.max_supply && millify(data?.supply?.max_supply)}`, icon: <ExclamationCircleOutlined /> },
    { title: 'Circulating Supply', value: `$ ${data?.market_data?.circulating_supply && millify(data?.market_data?.circulating_supply)}`, icon: <ExclamationCircleOutlined /> },
  ];




 return (
    <Col className="coin-detail-container">
      <Col className="coin-heading-container">
        <Title level={2} className="coin-name">
          {data?.name} ({data?.symbol}) Price
        </Title>
        <p>{data?.name} live price in US Dollar (USD). View value statistics, market cap and supply.</p>
      </Col>
      <Select defaultValue="7d" className="select-timeperiod" placeholder="Select Timeperiod" onChange={(value) => setTimeperiod(value)}>
        {time.map((date) => <Option key={date}>{date}</Option>)}
      </Select>
      {/* <LineChart coinHistory={coinHistory} currentPrice={millify(cryptoDetails?.price)} coinName={cryptoDetails?.name} /> */}
      <Col className="stats-container">
        <Col className="coin-value-statistics">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">{data?.name} Value Statistics</Title>
            <p>An overview showing the statistics of {data?.name}, such as the base and quote currency, the rank, and trading volume.</p>
          </Col>
          {stats.map(({ icon, title, value }) => (
            <Col className="coin-stats">
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
        <Col className="other-stats-info">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">Other Stats Info</Title>
            <p>An overview showing the statistics of {data?.name}, such as the base and quote currency, the rank, and trading volume.</p>
          </Col>
          {genericStats.map(({ icon, title, value }) => (
            <Col className="coin-stats">
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
      </Col>
      <Col className="coin-desc-link">
        <Row className="coin-desc">
          <Title level={3} className="coin-details-heading">What is {data?.name}?</Title>
          {data?.description?.bg}
        </Row>
        <Col className="coin-links">
          <Title level={3} className="coin-details-heading">{data?.name} Links</Title>
          {/* {data.links?.map((link) => (
            <Row className="coin-link" key={link.name}>
              <Title level={5} className="link-name">{link.type}</Title>
              <a href={link.url} target="_blank" rel="noreferrer">{link.name}</a>
            </Row>
          ))} */}
        </Col>
      </Col>
    </Col>
  );
};
export default CryptoDetails