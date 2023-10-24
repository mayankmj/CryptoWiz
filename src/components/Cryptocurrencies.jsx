import React, { useState, useEffect } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col } from 'antd';
import { useGetCoinsQuery } from '../services/cryptoCoinApi';

const MAX_IMAGE_SIZE = 100; // Define your maximum image size

const Cryptocurrencies = () => {
  const { data: cryptosList, isFetching } = useGetCoinsQuery();
  const [cryptos, setCryptos] = useState([]);

  useEffect(() => {
    if (cryptosList && cryptosList['Top 50 Cryptocurrency Details']) {
      // Filter cryptocurrencies with images smaller than or equal to MAX_IMAGE_SIZE
      const filteredCryptos = cryptosList['Top 50 Cryptocurrency Details'].filter(
        (currency) => {
          const image = new Image();
          image.src = currency.Image;
          return image.width <= MAX_IMAGE_SIZE && image.height <= MAX_IMAGE_SIZE;
        }
      );

      setCryptos(filteredCryptos);
    }
  }, [cryptosList]);

  return (
    <div>
      <Row gutter={[32, 32]} className='crypto-card-container'>
        {cryptos.length > 0 ? (
          cryptos.map((currency) => (
            <Col xs={24} sm={12} lg={6} className='crypto-card' key={currency.Rank}>
              <Link to={`/crypto/${currency.Coin}`}>
                <Card
                  title={`${currency.Rank}. ${currency.Coin}`}
                  extra={<img className='crypto-image' src={currency.Image} alt={currency.Coin} />}
                  hoverable
                >
                  <p>Price: {millify(currency.Price)}</p>
                  <p>Market Cap: {millify(currency['Market Cap'])}</p>
                  <p>Daily Change: {millify(currency['Volume 24hr'])}</p>
                </Card>
              </Link>
            </Col>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </Row>
    </div>
  );
}

export default Cryptocurrencies;
