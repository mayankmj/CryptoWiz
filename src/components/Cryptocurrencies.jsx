import React, { useState, useEffect } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col ,Input} from 'antd';
import { useGetCoinsQuery } from '../services/cryptoCoinApi';

const MAX_IMAGE_SIZE = 100; // Define your maximum image size

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCoinsQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  
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

      // Get up to 10 cryptocurrencies if count is set to 10
      const limitedCryptos = count === 10 ? filteredCryptos.slice(0, 10) : filteredCryptos;

      setCryptos(limitedCryptos);
    }
  }, [cryptosList, count]);

  // Filter cryptocurrencies based on the search query
 const handleSearch = (query) => {
    const filteredCryptos = cryptosList['Top 50 Cryptocurrency Details'].filter((currency) =>
      currency.Coin.toLowerCase().includes(query.toLowerCase())
    );

    setCryptos(filteredCryptos);
  };

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.trim() === '') {
      // If the search input is empty, show the default cryptocurrencies
      handleSearch('');
    } else {
      handleSearch(query);
    }
  };

  return (
    <div>
    {!simplified && (
      <div className='search-crypto'>
         <Input
          placeholder="Search Crypto"
          value={searchQuery}
          onChange={handleInputChange}
        />
      </div>
    )} 
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
                  <p style={{ display: 'flex', alignItems: 'center', margin: 0 }}>
                    Price: <h4 style={{ margin: 'auto', marginLeft: '5px', fontWeight: 'bold' }}>{millify(currency.Price)}</h4>
                  </p>
                  <p style={{marginBottom:'0'}}>Market Cap: {millify(currency['Market Cap'])}</p>
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
