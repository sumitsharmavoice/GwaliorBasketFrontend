
import React, { createRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ServerURL } from "../../../services/ServerServices";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from "@mui/material";


export default function DealsSlider() {
   
    const theme = useTheme();
    const matches=useMediaQuery(theme.breakpoints.up('md'))
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        // autoplay: true,
        // autoplayspeed: 100,
        // focusonselect:true,
        // prevArrow:color.red,
        // arrow:true,
    };

    var images = ["d1.webp", "d2.webp","d3.webp","d4.webp","d5.webp","d6.webp","d7.webp","d8.webp",]


    function playImages() {
        return images.map((item) => {
            return (<div><img src={`${ServerURL}/images/${item}`} width='98%' /></div>)
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
       {matches? <KeyboardArrowLeftIcon onClick={handleLeftClick} style={{ position: 'absolute', left: 10, top:'50%', zIndex: 1, cursor: 'pointer', borderRadius: '50px', borderWidth: "2", borderStyle: 'solid', borderColor: "#e0e0e0", boxSizing: 'border-box', backgroundColor: 'red' }} />:<></>}
        <Slider ref={slider} {...settings} >
            {playImages()}
        </Slider>
      {matches?  <KeyboardArrowRightIcon onClick={handleRightClick} style={{ position: 'absolute', right: 10, top:'50%', zIndex: 1, cursor: 'pointer', borderRadius: '50px', borderWidth: "2", borderStyle: 'solid', borderColor: "#e0e0e0", boxSizing: 'border-box', backgroundColor: 'red' }} />:<></>}
    </div>)

}