import React, {  createContext, useContext, useEffect, useState } from 'react'


const Crypto =createContext();
const CryptoContex = ({children}) => {
  const [currency,setcurrency]=useState("INR");
  console.log(currency)
  const [symbol,setsymbol]=useState("₹")
  useEffect(()=>{
    if(currency==="INR") setsymbol("₹");
    else if(currency==="USD") setsymbol("$");
  },[currency])
  return (
    <Crypto.Provider value={{currency,
    setcurrency,
    symbol}}>
      {children}
    </Crypto.Provider>
  )
}

export default CryptoContex;

export const CryptoState=()=>{
  return useContext(Crypto)
};