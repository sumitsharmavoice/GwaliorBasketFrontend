import React, { useState, } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Badge, Button, useMediaQuery } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MenuIcon from '@mui/icons-material/Menu';
import { useStyles } from '../../screens/HomeCss';
import { useTheme } from '@mui/material/styles';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HomePageDrawer from './HomePageDrawer';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Header(props) {
  var location = useLocation()
  var navigate = useNavigate()
  var products = useSelector((state) => state.cart)
  var totalproducts = Object.keys(products)
  console.info("Cart>>>>>", totalproducts)
  var classes = useStyles()
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = useState(false)
  const handleOpenDrawer = () => {

    setOpen(true)
  }


  return (<div style={{ display: 'flex', }} >
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static' style={{ display: 'flex', alignItems: 'left', justifyContent: "center", height: 50, background: 'rgba(93,9,121,1)', }}>
        <Toolbar style={{ display: 'flex', marginLeft: 2, alignItems: 'center' }}>
          <div style={{ marginLeft: 10, cursor: 'pointer' }}> {matches ? <MenuIcon onClick={handleOpenDrawer} /> : <></>}
          </div>
          <IconButton style={{ display: 'flex', color: 'inherit', marginLeft: 20 }}   >
            <LocationOnIcon />
            <span style={{ fontSize: 16, fontFamily: 'Poppins', fontWeight: 'bold', }}>Gwalior</span>
          </IconButton>
          <div style={{ display: 'flex', justifyContent: !matches ? 'space-between' : 'end', width: !matches ? 250 : '10%', fontFamily: 'Poppins', fontWeight: 500, fontSize: 14, marginLeft: 'auto', marginRight: !matches ? 40 : 0, cursor: 'pointer' }}>
            {!matches ? <>
              <span>Offer</span>
              <span>Deals</span>
              <span>Coupons</span>
              <span><PersonIcon onClick/></span>
              <Badge badgeContent={totalproducts.length} color='success'> <span onClick={()=>navigate("/cart")} ><ShoppingCartIcon /></span></Badge>
            </> : <><span><PersonIcon /></span>
              <Badge badgeContent={totalproducts.length} color='success'> <span><ShoppingCartIcon /></span></Badge>
            </>
            }
          </div>

        </Toolbar>
      </AppBar>
      {location.pathname == '/home' ?
        <AppBar position='relative' style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: "left", height: !matches ? 70 : 60, background: '#FFF', color: '#000', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', flexDirection: 'row', marginLeft: !matches ? 40 : 10, justifyContent: 'start', width: '100%' }}>
            <img src='assets/targetlogo.png' style={{ width: 50, height: 50, cursor: 'pointer' }} />
            {!matches ? <><div style={{ display: 'flex', justifyContent: 'space-evenly', width: 400, marginLeft: 5, marginRight: !matches ? 10 : 4 }}>
              <Button style={{ color: 'rgba(93,9,121,1)', fontWeight: 600 }}>Categories</Button>
              <Button style={{ color: 'rgba(93,9,121,1)', fontWeight: 600 }}>Deals</Button>
              <Button style={{ color: 'rgba(93,9,121,1)', fontWeight: 600 }}>What's new</Button>
              <Button style={{ color: 'rgba(93,9,121,1)', fontWeight: 600 }}>trending</Button>
            </div>
            </> : <></>}
          </div>
        </AppBar>
        : <></>}
      <HomePageDrawer open={open} setOpen={setOpen} />

    </Box>

  </div>
  );
}