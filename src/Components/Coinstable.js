import { Container, LinearProgress, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { CryptoState } from './CryptoContex';
import axios from 'axios';
import { CoinList } from '../config/api';
import { useNavigate } from 'react-router-dom';
import{numberwithcommas} from './Banner/Craousel'
import { grey } from '@mui/material/colors';

 export default function Coinstable()  {

const [coins,setcoins]=useState([]);
const [loading,setloading]=useState(false);
const [search,setsearch]=useState("");
const {currency,symbol}=CryptoState();
const history=useNavigate();
const [page,setpage]=useState(1);
let start=(page-1)*10;
let end=start+10;


const fetchcoins=async()=>{
    setloading(true);
    const {data}=await axios.get(CoinList(currency));
    
    setcoins(data);
    setloading(false);
};
useEffect(()=>{
    fetchcoins();

},[currency]);


const handleSearch=()=>{
    return coins.filter(
        (coin)=>
        
        coin.name.toLowerCase().includes(search)||
        coin.symbol.toLowerCase().includes(search)
        
        
    );
};
  return (
    <div className='table'>
        <Container
        style={{textAlign:"center"}}>
            <Typography
            variant='h4'
            style={{
                margin:0,
                fontFamily:"serif"
            }}
            >
Cryptocurrency Prices By Marketcap

            </Typography>
            <TextField
            label="Search for Cryptocurrency"
            variant='outlined'
            style={{color:"white",backgroundColor:"white",
        marginBottom:20,width:"100%"}}
        onChange={(e)=>setsearch(e.target.value)}
            />
            <TableContainer>
                {
                    loading ? (
                        <LinearProgress style={{backgroundColor:"gold"}}/>

                    ):( 
                     <Table>
                        <TableHead style={{backgroundColor:"gold"}}
                        >
                            <TableRow>
                                 {["Coin","Price","24h Change","Market Cap"].map((head)=>
                                 (
                                    <TableCell
                                    style={{
                                        color:"black",
                                        fontWeight:700,
                                        fontFamily:"sans-serif"
                                    }}
                                    key={head}
                                    align={head==="coin"? "":"left"}
                                    >{head}

                                    </TableCell>
                                    
                                    
                                 ))}
                            </TableRow>

                        </TableHead>
                        <TableBody>
                            {handleSearch().slice((page-1)*10,(page-1)*10+10).map((row)=>{
                            const profit=row.price_change_percentage_24h>0;
                                console.log({row})
                                return(
                                    <TableRow 
                                    onClick={()=>history(`/coins/${row.id}`)}
                                    key={row.name}
                                    >
                                   <TableCell
                                   component='th'
                                   scope='row'
                                   style={{
                                    display:"flex",
                                    
                    
                                    
                                   }}>
    
                                    <img
                                    src={row.image}
                                    alt={row.name}
                                    height={50}
                                    width={50}
                                    style={{marginBottom:5}}

                                    /> " "
                                    <span style={{textTransform:"uppercase",fontSize:22,color:"white"
                                ,display:"flex",flexDirection:'column'
                                }}>
                                        
                                        {row.symbol}
                                        <span style={{color:"darkgray",textTransform:"none",fontSize:15}}>
                                            {row.name}
                                        </span>
                                        </span>
                                        
                                        
                                

                                   </TableCell>
                                   <TableCell align='left'
                                   style={{color:"white"}}
                                   >
                                    {symbol}{" "}
                                    {numberwithcommas(row.current_price.toFixed(2))}


                                   </TableCell>
                                   <TableCell
                                    align='left'
                                    style={{color:profit>0?"rgb(14,203,129)":"red",
                                fontWeight:500}}
                                    >{profit&& "+"}
                                    {row.price_change_percentage_24h.toFixed(2)}%

                                    </TableCell>
                                    <TableCell
                                    align='left'
                                    style={{color:"white"}}>
                                        {symbol}{" "}
                                        {numberwithcommas(
                                            row.market_cap.toString().slice(0,-6)
                                        )}M

                                    </TableCell>
                                    
                                   

                                    </TableRow>
                                )
                                })}

                        </TableBody>
                     </Table>

                    )
                }
            </TableContainer>
    
            <Pagination
            style={{backgroundColor:"whitesmoke",
        padding:10,
    width:"100%",
    display:"flex",
    justifyContent:"center"

}}
            count={(handleSearch()?.length/10).toFixed(0)}

            onChange={(_,value)=>{
                setpage(value);
                window.scroll(0,450)
            }}
            />
            

        </Container>
        </div>
  )
}
