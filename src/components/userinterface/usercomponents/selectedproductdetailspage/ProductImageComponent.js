import React,{useEffect,useState,createRef} from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { postData,ServerURL } from "../../../services/ServerServices";
import { useLocation } from "react-router-dom";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from "@mui/material";


var productImage = {
    dots: false,
    arrow: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    focusOnSelect:true,
    
}

var sliderNav = {
    slidesToShow: 2,
    slidesToScroll: 1,
    asNavFor: '.slider-for',
    dots: false,
    centerMode: true,
    focusOnSelect: true,
    vertical: true,
    centerMode: true
}


export default function ProductImageComponent(props) {
   
    var data=JSON.parse(props.data)
    const theme = useTheme();

    const sm=useMediaQuery(theme.breakpoints.up('sm'))
    const md=useMediaQuery(theme.breakpoints.up('md'))
    const lg=useMediaQuery(theme.breakpoints.up('lg'))
    const xl=useMediaQuery(theme.breakpoints.up('xl'))
     

    const [nav1, setNav1] = useState();
    const [nav2, setNav2] = useState();
    const images =["1.webp","2.webp","3.webp","4.webp","5.webp",]

    const setImageSlider = () => {
        return images.map((item) => {
            return (<div style={{ display: 'flex', justifyContent:'center',width:'50%'}}>
                <img src={`${ServerURL}/images/${item}`} alt="xx" style={{ display: 'flex', justifyContent:'center',width: '50%',paddingLeft:'25%'}} />
            </div>)
        })
       

    }
    var slider = createRef()

    function handleLeftClick() {
        slider.current.slickPrev()
    }

    function handleRightClick() {
        slider.current.slickNext()
    }

    return (
        <div style={{position:'relative'}}>
      {md?<KeyboardArrowLeftIcon onClick={handleLeftClick} style={{ position: 'absolute', left: 10, top:'50%', zIndex: 1, cursor: 'pointer', borderRadius: '50px', borderWidth: "2", borderStyle: 'solid', borderColor: "#e0e0e0", boxSizing: 'border-box', backgroundColor: 'red' }} />:<></>}
        <Slider ref={slider} {...productImage} >
            {setImageSlider()}
        </Slider>
    {md?<KeyboardArrowRightIcon onClick={handleRightClick} style={{ position: 'absolute', right: 10, top: '50%', zIndex: 1, cursor: 'pointer', borderRadius: '50px', borderWidth: "2", borderStyle: 'solid', borderColor: "#e0e0e0", boxSizing: 'border-box', backgroundColor: 'red' }} />:<></>}
    </div>)
}