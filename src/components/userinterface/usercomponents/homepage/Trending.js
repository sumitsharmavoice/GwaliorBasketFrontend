import React, { createRef,useState,useEffect } from "react";
import Slider from "react-slick";
import { ServerURL,getData,  } from "../../../services/ServerServices";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Button, Grid, useMediaQuery, Paper } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { useNavigate } from "react-router-dom";
// import Button from "@mui/material";



export default function Trending() {
    const navigate=useNavigate()
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm'))
    const smatches = useMediaQuery(theme.breakpoints.down('lg'))
    const [trendingProduct, setTrendingProduct] = useState([])

    const fetchProducts = async () => {
        var result = await getData("userinterface/fetch_all_productstrending");

        setTrendingProduct(result.data)
    };
    useEffect(function () {
        fetchProducts();
    }, []);


    const handleClick=async(pid)=>{
        navigate(`/AllCategory`,{state:{productid:pid,page:'Trending'}})   

    }

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: matches ? 2 : 7,
        slidesToScroll: 2,
        autoplay: !matches ? false : true,
        autoplaySpeed: 5000,
        arrow: false,
    };

    var slider = createRef()


    
    function handleLeftClick() {
        slider.current.slickPrev()
    }
    function handleRightClick() {
        slider.current.slickNext()

    }
    function playImages() {
        return trendingProduct.map((item) => {
            return (<div>
                <Paper elevation={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', width: 150, height: 'auto', margin: 10, padding: 5, flexWrap: 'wrap',cursor:'pointer' }} onClick={()=>handleClick(item.productid)} >
                    <div style={{}}>
                        <img src={`${ServerURL}/images/${item.image}`} style={{ width: 80, height: 80 }} />
                    </div>
                    <div style={{ fontWeight: 'bold', fontFamily: 'poppins',}}><p>{item.productname.length <= 15 ? item.productname.substring(0,15) : item.productname.substring(0,15) + "..." }</p></div>
                    <div style={{ color: '#888', fontWeight: 200, fontSize: 14, fontFamily: 'Poppins' }}><p> {item.description.length <= 16? item.description.substring(0,18):item.description.substring(0,18) +'...'}</p></div>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginLeft: 1, width: '90%' }}>
                       
                        <Paper elevation={4} style={{ width: '100%', height: 37, position: 'relative',  }}><Button style={{ borderColor: 'red', color: 'red', width:'100%', height: 37 }} variant="outlined" >ADD</Button></Paper>
                    </div>
                </Paper>
            </div>)
        })
    }


    return (
        <div style={{ position: 'relative' }}>
            {matches ? <></> :
                <> <KeyboardArrowLeftIcon onClick={handleLeftClick} style={{ position: 'absolute', left: 10, top: '50%', zIndex: 1, cursor: 'pointer', borderRadius: '50px', borderWidth: "2", borderStyle: 'solid', borderColor: "#e0e0e0", boxSizing: 'border-box', backgroundColor: 'red' }} />
                </>}
            <div style={{ fontWeight: 'bold', fontSize: 22, fontFamily: "Lobster", letterSpacing: 2, color: '#3B3B98' }}>Tranding Products</div>
            <Grid>
                <Slider ref={slider} {...settings}>
                    {playImages()}
                </Slider>
            </Grid>

            {matches ? <></> :
                <><KeyboardArrowRightIcon onClick={handleRightClick} style={{ position: 'absolute', right: 10, top: '50%', zIndex: 1, cursor: 'pointer', borderRadius: '50px', borderWidth: "2", borderStyle: 'solid', borderColor: "#e0e0e0", boxSizing: 'border-box', backgroundColor: 'red' }} />
                </>}
        </div>



    )

}