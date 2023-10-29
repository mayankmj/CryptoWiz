import React from 'react';
import millify from 'millify';
import { Collapse, Row, Col, Typography, Avatar } from 'antd';
import './style/exchangesCrypts.css'
import { useGetExchangesQuery } from '../services/coinDetailsApi';
const { Text } = Typography;
const { Panel } = Collapse;

const Exchanges = () => {
  const { data, isFetching } = useGetExchangesQuery();
  const exchangesList = data;
  
  if (isFetching) return 'Loading...';

  return (
    <div>
      <Row className='table'>
        <Col className='table_heading' span={6}>Exchanges</Col>
        <Col className='table_heading'span={6}>24h Trade Vol.</Col>
        <Col className='table_heading'span={6}>Trust Score</Col>
        <Col className='table_heading'span={6}>Origin Country</Col>
      </Row>
      <Row>
        {exchangesList.map((exchange) => (
          <Col span={24}>
            <Collapse>
              <Panel
                key={exchange.uuid}
                showArrow={false}
                header={(
                  <Row key={exchange.uuid}>
                    <Col span={6}>
                      <Text><strong>{exchange?.trust_score_rank}.</strong></Text>
                      <Avatar className="exchange-image" src={exchange?.image} />
                      <Text><strong>{exchange.name}</strong></Text>
                    </Col>
                    <Col span={6}>${millify(exchange?.trade_volume_24h_btc)}</Col>
                    <Col span={6}>{millify(exchange?.trust_score)}</Col>
                    <Col span={6}>{millify(exchange?.country)}</Col>
                  </Row>
                  )}
              >
                <p>{exchange?.description} </p>
              </Panel>
            </Collapse>
          </Col>
        ))}
      </Row>
    </div>
  );
};



export default Exchanges;