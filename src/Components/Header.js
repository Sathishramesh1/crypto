import { AppBar, Container, MenuItem, Select, Toolbar, Typography } from '@mui/material'
import React from 'react'
import {  useNavigate } from 'react-router-dom';
import { CryptoState } from './CryptoContex';

const Header = () => {
    const history=useNavigate();
    const{currency,setcurrency}=CryptoState();
    console.log(currency)
  return (
    <AppBar color='transparent' position='static'>
        <Container>
            <Toolbar variant='outlined'>
                <Typography className='title'
                onClick={()=>{history("/")}}
                ><h2>Crypto Tracker</h2></Typography>
                <Select variant='outlined'
                style={{
                    width:100,
                    height:40,
                    marginRight:15,
                    color:'white',
                    backgroundColor:'grey',
                }}
                value={currency}
                onChange={(e)=>setcurrency(e.target.value)}>
                    <MenuItem value={"INR"}>INR</MenuItem>
                    <MenuItem value={"USD"}>USD</MenuItem>
                </Select>
            </Toolbar>
        </Container>

    </AppBar>
  )
}

export default Header