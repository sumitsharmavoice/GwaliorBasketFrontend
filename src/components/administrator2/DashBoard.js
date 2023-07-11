
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Grid, Paper, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import CategoryIcon from '@mui/icons-material/Category';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import LogoutIcon from '@mui/icons-material/Logout';
import { Routes,Route } from 'react-router-dom';
import Category from './Category';
import Product from './Product';
import ListProduct from './ListProduct';
import Banner from './Banner';
import DisplayAllCategories from "./DisplayAllCategories";
import DisplayAllProducts from './DisplayAllProducts';
import DisplayListProduct from './DisplayListProduct';
import DisplayAllBanners from './DisplayAllBanners';
import AdminLogin from './AdminLogin';
import { ServerURL } from '../services/ServerServices';
import { useStyles } from './DashBoardCss';


export default function DashBoard (props) {
    var classes=useStyles()
    var navigation=useNavigate()
    var admin= JSON.parse(localStorage.getItem('ADMIN'))
    console.log("ADMIN",admin)

    return (<div>

        <AppBar position='static' style={{ background: '#488A99' }}>
            <Toolbar variant="dense">
                <IconButton edge="start" aria-label="menu" sx={{ mr: 2 }}>
                    <MenuIcon style={{ color: '#FFF' }} />
                </IconButton>
                <Typography variant="h6" component="div">
                    <div style={{ color: '#FFF' }}> GwaliorBasket</div>
                </Typography>
            </Toolbar>
        </AppBar>
        <Grid container spacing={3}>
            <Grid item xs={2}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <img src={`${ServerURL}/images/${admin.logo}`} style={{ width: 80, margin: 20 }} />
                    <Paper elevation={4} style={{ width: 220, height: 80, margin: 20, backgroundColor: '#dfe6e9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <img src='assets/admin.jpg' style={{ width: 50, borderRadius: 25, marginLeft: 20 }} />
                        <span style={{ fontWeight: 'bold', fontFamily: 'Poppins', marginRight: 30 }} >{admin.ownername}</span>
                    </Paper>

                    {/* list */}
                    <div style={{ width: 220, margin: 20, }}>
                        <List component="nav" aria-label="main mailbox folders">
                            <ListItemButton
                              onClick={() => navigation('/dashboard/displayallcategories')}
                            >
                                <ListItemIcon>
                                    <CategoryIcon />
                                </ListItemIcon>
                                <ListItemText primary={<span style={{ fontFamily: 'poppins', fontWeight: 700, letterSpacing: 1 }}>Category</span>} />
                            </ListItemButton>

                            <ListItemButton
                              onClick={() => navigation('/dashboard/displayallproducts')}
                            >
                                <ListItemIcon>
                                    <AddShoppingCartIcon />
                                </ListItemIcon>
                                <ListItemText primary={<span style={{ fontFamily: 'poppins', fontWeight: 700, letterSpacing: 1 }}>Products</span>} />
                            </ListItemButton>

                            <ListItemButton
                              onClick={() => navigation('/dashboard/displaylistproduct')}
                            >
                                <ListItemIcon>
                                    <AddPhotoAlternateIcon />
                                </ListItemIcon>
                                <ListItemText primary={<span style={{ fontFamily: 'poppins', fontWeight: 700, letterSpacing: 1 }}>Product List</span>} />
                            </ListItemButton>
                            <ListItemButton
                              onClick={() => navigation('/dashboard/displayallbanners')}
                            >
                                <ListItemIcon>
                                    <ViewCarouselIcon />
                                </ListItemIcon>
                                <ListItemText primary={<span style={{ fontFamily: 'poppins', fontWeight: 700, letterSpacing: 1 }}>Add Banners</span>} />
                            </ListItemButton>

                            <Divider />
                            <ListItemButton
                              onClick={() => navigation('/adminlogin')}
                            >
                                <ListItemIcon>
                                    <LogoutIcon />
                                </ListItemIcon>
                                <ListItemText primary={<span style={{ fontFamily: 'poppins', fontWeight: 700, letterSpacing: 1 }}>Logout</span>} />
                            </ListItemButton>

                        </List>
                    </div>
                </div> 
            </Grid>
            <Grid item xs={9} >
                <div >
                <Routes>
                <Route element={<Category/>} path="/category" />
                <Route element={<Product/>} path="/product" />
                <Route element={<ListProduct/>} path="/listproduct"  />
                <Route element={<Banner/>} path="/banner"  />
                <Route element={<DisplayAllCategories/>} path="/displayallcategories" />
                <Route element={<DisplayAllProducts/>}  path="/displayallproducts"/>
                <Route element={<DisplayListProduct/>} path="/displaylistproduct" />
                <Route element={<DisplayAllBanners/>} path="/displayallbanners" />
                <Route element={<AdminLogin/>} path="/adminlogin" />
                </Routes>
                </div>
            </Grid>

        </Grid>

    </div>
    )
}