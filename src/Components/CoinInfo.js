import React, { useEffect, useState } from 'react'
import { CryptoState } from './CryptoContex';
import axios from 'axios';
import { HistoricalChart } from '../config/api';
import { CircularProgress } from '@mui/material';
import { Line } from 'react-chartjs-2';
import { useParams } from 'react-router-dom';
import Chart from 'chart.js/auto';
import { chartDays } from '../config/data';






const CoinInfo = ({coin}) => {
  const{id}=useParams();

  const [historicaldata,sethistoricaldata]=useState();
  const[days,setdays]=useState();
  const {currency}=CryptoState();
  const fetchhistoricdata=async()=>{
    const {data}=await axios.get(HistoricalChart(id,days,currency));
    sethistoricaldata(data.prices);
    console.log(historicaldata)
  };

  // fetchhistoricdata();
  useEffect(()=>{
    fetchhistoricdata();
  },[currency,days])
  return (
    <div className='chart'>
      {/* {console.log(historicaldata)} */}
      {!historicaldata?(

        <CircularProgress
        style={{color:"gold"}}
        size={250}
        thickness={2}/>
      ):(<>
      
      <Line
      style={{}}
      data={{
        labels:historicaldata.map((coin)=>{
          let date=new Date(coin[0]);
          let time=
          date.getHours()>12
          ?`${date.getHours()-12}:${date.getMinutes()} PM`
          :`${date.getHours()-12}:${date.getMinutes()} AM`;

          return days===1?time:date.toLocaleDateString()
        }),
        datasets:[
          {data:historicaldata.map((coin)=>coin[1]),
          label:`Price(Past${days} Days) in ${currency}`,
        borderColor:'gold'}
        ]
      }}
      options={{
        elements:{
          point:{
            radius:1,
          }
        }
      }}
      />
      <div
      style={{
        display:"flex",
        marginTop:20,
        justifyContent:"space-around",
        width:"100%",
      }}
      
      >
        {chartDays.map(days=>(
          <button className='btn'
          onClick={()=>setdays(days.value)}
          >
            {days.label}
          </button>
        ))
        }
      </div>
      </>)}
      
      Coin
      Info</div>
  )
}

export default CoinInfo