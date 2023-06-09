import { Container, Typography } from '@mui/material'
import React from 'react'
import Craousel from './Craousel'

const Banner = () => {
  return (
    <div className='banner'>
        <Container>
            <div>
                <Typography
                variant='h1'
                style={{
                  fontFamily:"bold",
                  marginTop:30,
                  display:"flex",
                  alignContent:"center",
                  alignItems:"center",
                  justifyContent:"center",
                  color:"white",
                  paddingTop:45,
                  fontFamily:"Montserrat",
                }}
                >
                Crypto Tracker
                </Typography>
                <Typography
                variant='subtitle2'
                style={{
                  color:"darkgray",
                  fontFamily:"Montserrat",
                  position:"relative",
                  justifyContent:"center",
                  display:"flex"
                }}>
                  Get the all info regarding favorite crypto
                </Typography>
            </div>
            <Craousel/>
        </Container>
    </div>
  )
}

export default Banner