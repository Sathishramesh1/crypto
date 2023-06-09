import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CryptoState } from '../Components/CryptoContex';
import axios from 'axios';
import { SingleCoin } from '../config/api';
import CoinInfo from '../Components/CoinInfo';
import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import{numberwithcommas} from '../Components/Banner/Craousel'
const Coinpage = () => {
  const{id}=useParams();
  const [coin,setcoin]=useState();
  const {currency,symbol}=CryptoState();
const parse=require('html-react-parser');
  const fetchsinglecoin=async()=>{
    const {data}=await axios.get(SingleCoin(id));
    setcoin(data);
    
  };
  useEffect(()=>{
    fetchsinglecoin();
  },[id]);

  const usestyles=styled((theme)=>({
    container:{
      display:"flex",
      [theme.breakpoints.down("md")]:{
      alignItems:"right",
      flexDirection:"column"}
      
    },
    sidebar:{
      width:"30%",
      [theme.breakpoints.down("md")]:{
        width:"100%",
      },
      display:"flex",
      flexDirection:"column",
      alignItems:'center',
      marginTop:25,
      borderRight:"2px solid white",
      padding:10,
    },
    heading:{
      fontWeight:"bold",
      marginBottom:20,
      fontFamily:"san-sherif",
      color:"red"
    },
    description:{
      width:"100%",
      fontFamily:'Montserrat',
      padding:25,
      paddingBottom:15,
      paddingTop:0,
      textAlign:"justify"
    }
  }))

  const classes=usestyles();
  return (
    <div className={classes.container}>
      <div className='sidebar'>
   <img
   src={coin?.image.large}
   alt={coin?.name}
   height={200}
   style={{marginBottom:10}}/>
   <Typography variant='h3' className={classes.heading}>
    {coin?.name}

   </Typography>
   <Typography variant='subtitle1' className={classes.description}>
    {((coin?.description.en.split(".")[0]))}.
    

   </Typography>
   <Typography variant='h5'>

    Rank: {coin?.market_cap_rank}

   </Typography>
   <Typography variant='h5'>

    Current Price:{symbol}{" "}{(coin?.market_data.current_price[currency.toLowerCase()].toLocaleString("en-US"))}
    {/* {console.log(coin?.market_data.current_price[currency.toLowerCase()])} */}

   </Typography>
   <Typography variant='h5'>

    Marketcap:{symbol}{" "} 
    {(coin?.market_data.market_cap[currency.toLowerCase()].toLocaleString("en-US").slice(0,-6))}
    {" "}M

   </Typography>
   </div>
   <CoinInfo coin={coin} />
   

    </div>
  )
}

export default Coinpage