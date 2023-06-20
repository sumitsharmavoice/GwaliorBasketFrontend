import React, { createRef, useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getData, ServerURL } from "../../../services/ServerServices";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from "@mui/material";

export default function MainSlider() {

    const theme = useTheme();

    const sm=useMediaQuery(theme.breakpoints.up('sm'))
    const md=useMediaQuery(theme.breakpoints.up('md'))
    const lg=useMediaQuery(theme.breakpoints.up('lg'))
    const xl=useMediaQuery(theme.breakpoints.up('xl'))

    var settings = {
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplayspeed: 3000,
        // focusonselect:true,
        // prevArrow:color.red,
        // arrow:true,
    };

    

    const [images,setImages]=useState([])
    const fetchBannerImages= async()=>{
       var result= await getData('banner/fetch_banner_images')
       var dataImages=result.data[0].banners
       var im=dataImages.substring(0,dataImages.length-1).split(',')
      setImages(im)
       
    }

  useEffect(function() {
  fetchBannerImages()
  },[])


    function playImages() {
        return images.map((item) => {
            return (<div><img src={`${ServerURL}/images/${item}`}width="100%" /></div>)
        })
    }

    var slider = createRef()

    function handleLeftClick() {
        slider.current.slickPrev()
    }

    function handleRightClick() {
        slider.current.slickNext()
    }
    return (<div style={{position:'relative'}}>
      {md?<KeyboardArrowLeftIcon onClick={handleLeftClick} style={{ position: 'absolute', left: 10, top:'50%', zIndex: 1, cursor: 'pointer', borderRadius: '50px', borderWidth: "2", borderStyle: 'solid', borderColor: "#e0e0e0", boxSizing: 'border-box', backgroundColor: 'red' }} />:<></>}
        <Slider ref={slider} {...settings} >
            {playImages()}
        </Slider>
    {md?<KeyboardArrowRightIcon onClick={handleRightClick} style={{ position: 'absolute', right: 10, top: '50%', zIndex: 1, cursor: 'pointer', borderRadius: '50px', borderWidth: "2", borderStyle: 'solid', borderColor: "#e0e0e0", boxSizing: 'border-box', backgroundColor: 'red' }} />:<></>}
    </div>)

}