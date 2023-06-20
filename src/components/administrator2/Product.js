import React, { useEffect, useState } from "react";
import { Grid, TextField, Select, InputLabel, FormControl, MenuItem, Radio, Avatar, IconButton, Button, } from "@mui/material";
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { useStyles } from "./ProductCss";
import { getData, postData } from "../services/ServerServices";
import Swal from "sweetalert2";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { useNavigate } from "react-router-dom";



export default function Product() {
    
    var navigation=useNavigate()
    var classes = useStyles()
    var admin= JSON.parse(localStorage.getItem('ADMIN'))


    const [companyid, setCompanyid] = useState(admin.companyid)
    const [categoryid, setCategoryid] = useState('')
    const [productname, setProductname] = useState('')
    const [status, setStatus] = useState('')
    const [description, setDescription] = useState('')
    const [trending, setTrending] = useState('')
    const [deals, setDeals] = useState('')
    const [image, setImage] = useState({ filename: 'assets/watermark.png', bytes: '' })
    const [pricetype, setPricetype] = useState('')

    const [fillCategoryid, setFillCategoryid] = useState([])



    const handleImage = (event) => {
        setImage({ filename: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] })
    }

    const fatchAllCategories = async () => {
        var result = await getData('category/fetch_categoryid')
        setFillCategoryid(result.data)
    }

    useEffect(function () {
        fatchAllCategories()
    }, [])

    const fill_Categoryid = () => {
        return fillCategoryid.map((item) => {
            return (<MenuItem value={item.categoryid}>{item.categorytype}</MenuItem>)
        })
    }
    const handleCategoryChange = (event) => {
        setCategoryid(event.target.value)
    }


    const handleClick = async () => {
        var formData = new FormData()
        var cd = new Date()
        var dd = cd.getFullYear() + "/" + (cd.getMonth() + 1) + "/" + cd.getDate() + " " + cd.getHours() + ':' + cd.getMinutes() + ':' + cd.getSeconds()
        formData.append('companyid', companyid)
        formData.append('categoryid', categoryid)
        formData.append('productname', productname)
        formData.append('description', description)
        formData.append('status', status)
        formData.append('trending', trending)
        formData.append('deals', deals)
        formData.append('pricetype', pricetype)
        formData.append('image', image.bytes)
        formData.append('createdat', dd)
        formData.append('updateat', dd)
        formData.append('createdby', 'ADMIN')


        var result = await postData('product/add_product_details', formData)
        // alert(result.status)
        if (result.status) {
            Swal.fire({
                icon: 'success',
                title: result.message
            })
        }
        else {
            Swal.fire({
                icon: 'error',
                title: result.message
            })
        }
        clearValue()
    }

    const clearValue = () => {
        setCategoryid('')
        setProductname('')
        setDescription('')
        setStatus('')
        setTrending('')
        setDeals('')
        setPricetype('')
        setImage({ filename: 'assets/watermark.png', bytes: '' })
    }


    return (<>
        <div className={classes.mainContainer}>
            <div className={classes.box}>
                <Grid container spacing={2}>
                    <Grid item xs={12} className={classes.rowStyle}>
                        <div className={classes.headingStyle}> Products Insertion</div>
                        <div style={{ cursor: 'pointer' }}>
                            <FormatListBulletedIcon onClick={() => navigation('/dashboard/displayallproducts')} />
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField fullWidth label="Company Id" value={admin.companyid}  variant="outlined" type={"number"} />
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Category Id</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={categoryid}
                                label="Category Id"
                                onChange={handleCategoryChange}

                            >
                                <MenuItem value="Choose Category...">Choose Category...</MenuItem>
                                {fill_Categoryid()}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField fullWidth value={productname} onChange={(event) => setProductname(event.target.value)} label="Product Name" variant="outlined" />
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Status</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={status}
                                label="Status"
                                onChange={(event) => setStatus(event.target.value)}
                            >
                                <MenuItem value="Product Available">Product Available</MenuItem>
                                <MenuItem value="Product Not Available">Product Not Available</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth label="Description" value={description} onChange={(event) => setDescription(event.target.value)} variant="outlined" />
                    </Grid>
                    <Grid item xs={3} className={classes.textStyle} >
                        Trending
                    </Grid>

                    <Grid item xs={9} >
                        <Radio
                            checked={trending === 'Yes'}
                            onChange={(event) => setTrending(event.target.value)}
                            value="Yes"
                            name="radio-buttons"
                            inputProps={{ 'aria-label': 'Yes' }}
                        /> yes

                        <Radio
                            checked={trending === 'No'}
                            onChange={(event) => setTrending(event.target.value)}
                            value="No"
                            name="radio-buttons"
                            inputProps={{ 'aria-label': 'No' }}
                        />No
                    </Grid>
                    <Grid item xs={3} className={classes.textStyle} >
                        Deals
                    </Grid>

                    <Grid item xs={9} >
                        <Radio
                            checked={deals === 'Yes'}
                            onChange={(event) => setDeals(event.target.value)}
                            value="Yes"
                            name="radio-buttons"
                            inputProps={{ 'aria-label': 'Yes' }}
                        /> yes

                        <Radio
                            checked={deals === 'No'}
                            onChange={(event) => setDeals(event.target.value)}
                            value="No"
                            name="radio-buttons"
                            inputProps={{ 'aria-label': 'No' }}
                        />No
                    </Grid>
                    <Grid item xs={12} className={classes.textStyle} >
                        Image
                    </Grid>
                    <Grid item xs={3} sx={{ display: 'flex', justifyContent: "center" }} >
                        <IconButton color="primary" aria-label="upload picture" component="label">
                            <input hidden accept="image/*" type="file" onChange={handleImage} />
                            <PhotoCamera />
                        </IconButton>
                    </Grid>
                    <Grid item xs={4} sx={{ display: 'flex', justifyContent: "center", paddingRight: 10 }} >
                        <Avatar
                            alt=""
                            src={image.filename}
                            sx={{ width: 68, height: 65 }}
                            variant='rounded'
                        />
                    </Grid>
                    <Grid item xs={5}>
                        <FormControl fullWidth variant="standard">
                            <InputLabel id="demo-simple-select-label">Price Type</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={pricetype}
                                label="Price Type"
                                onChange={(event) => setPricetype(event.target.value)}
                            >
                                <MenuItem value="kg">kg</MenuItem>
                                <MenuItem value="g">g</MenuItem>
                                <MenuItem value="ltr">ltr</MenuItem>
                                <MenuItem value="ml">ml</MenuItem>
                                <MenuItem value="pcs">pcs</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <div style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 20 }}>
                            <Button fullWidth variant="contained" onClick={handleClick}  >Submit</Button>
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <div style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 20 }}>
                            <Button fullWidth variant="contained" onClick={clearValue} >Reset</Button>
                        </div>
                    </Grid>

                </Grid>
            </div>
        </div>

    </>)
}
