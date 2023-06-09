import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { TrendingCoins } from '../../config/api'
import { CryptoState } from '../CryptoContex'
import AliceCarousel from 'react-alice-carousel'
import { Link } from 'react-router-dom'


export function numberwithcommas(x){
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");
}

const Craousel = () => {
    const [trending,settrending]=useState([]);

    const{currency,symbol}=CryptoState();

    const fetchtreindindcoins=async()=>{
        const {data}=await axios.get(TrendingCoins(currency))
settrending(data);
    };
    
    useEffect(()=>{
        fetchtreindindcoins();

    },[currency]);
    const items=trending.map((coin)=>{

        let profit=coin.price_change_percentage_24h>=0;
        return(
            <Link
            className='caroselitem'
            to={`/coins/${coin.id}`}>
            <img className='slide'
            src={coin.image}
            alt={coin.name}
            height={80}
            style={{marginBottom:10}}
            />
            <br/>
            <span style={{
                color: profit>0? "dark green":"red",fontWeight:500
            }}>
                {coin.symbol}
                &nbsp;
                <span>{profit&&"+"}{coin.price_change_percentage_24h?.toFixed(2)}%</span>
            </span>
            <br/>
            <span 
            style={{fontSize:22,fontWeight:500,color:"white"}}
            >
                {symbol} {numberwithcommas(coin?.current_price.toFixed(2))}
            </span>

            </Link>
        )
    })
    const responsive={
        0:{
            items:2
        },
        512:{
            items:4
        },
    }
  return (
    <div
    className='carousel'
    
    >
        <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        autoPlay
        
        items={items}
        />

    </div>
  )
}

export default Craousel