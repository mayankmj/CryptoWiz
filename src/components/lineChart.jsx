import React, { useState } from 'react'
import { Line } from 'react-chartjs-2'
import {Col, Row,Typography} from 'antd'

const {Title} = Typography
const lineChart = ({coinHistory,currentPrice,coinName}) => {

    // const[coinHistory,setCoinHistory] = useState();
    const[days,setDays] = useState(1);
    const currency = 'usd';
  return (
     <div>
     </div>
  )
}

export default lineChart