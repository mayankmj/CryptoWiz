import React from "react";
import { useState } from "react";
import { Select, Typography, Row, Col, Avatar, Card } from "antd";
import moment from "moment";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import { useGetCoinsQuery } from "../services/cryptoCoinApi";

const { Text, Title } = Typography;
const { Option } = Select;

const newsImageStyle = {
  maxHeight: "120px",
  maxWidth: "120px",
};

const News = ({ simplified }) => {
  const demoImageUrl =
    "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";


    const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
    
  const { data: cryptoNews } = useGetCryptoNewsQuery({
    newsCategory,
    count: simplified ? 6 : 200,
  });

  const{data} = useGetCoinsQuery(100);
  if (!cryptoNews?.value) return "Loading...";
  return (
    <div>
      <Row gutter={[24, 24]}>
      {!simplified && ( 
        <Col span={24}>
          <Select
           showSearch
           className="select-news"
           placeholder="Seach a crypto"
           onChange={(value) => setNewsCategory(value)}
          filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          > 
           <Option value="Cryptocurency">Cryptocurrency</Option>
            {data?.['Top 50 Cryptocurrency Details']?.map((currency) => <Option value={currency.Coin}>{currency.Coin}</Option>)}
          </Select>
        </Col>
      )}
       {cryptoNews.value.slice(0, simplified ? 6 : cryptoNews.value.length).map((news, i) => (
          <Col xs={24} sm={12} lg={8} key={i}>
            <Card hoverable className="news-card">
              <a href={news.url} target="_blank" rel="norefrence">
                <div className="news-image-container">
                  <Title className="news-title" level={4}>
                    {news.name.length > 50
                      ? `${news.name.substring(0, 50)}...`
                      : news.name}
                  </Title>
                  <img
                    src={news?.image?.thumbnail?.contentUrl || demoImageUrl}
                    alt="no-iamge"
                    style={newsImageStyle}
                  />
                </div>
                <p style={{ marginBottom: "0px" }}>
                  {news.description.length > 400
                    ? `${news.description.substring(0, 400)} ...`
                    : news.description}
                </p>
                <div className="provider-container">
                  <div>
                    <Avatar
                      src={
                        news.provider[0]?.image?.thumbnail?.contentUrl ||
                        demoImageUrl
                      }
                      alt=""
                    />
                    <Text className="provider-name">
                      {news.provider[0]?.name}
                    </Text>
                  </div>
                  <Text>
                    {moment(news.datePublished).startOf("ss").fromNow()}
                  </Text>
                </div>
              </a>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};
export default News;
