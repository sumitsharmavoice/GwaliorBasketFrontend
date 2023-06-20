import React, { useEffect, useState } from "react";
import { DropzoneArea } from "material-ui-dropzone";
import { Grid, FormControl, InputLabel, Select, MenuItem, TextField, Button, } from "@mui/material";
import { useStyles } from "./ListProductCss";
import { getData, postData } from "../services/ServerServices";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';


export default function ListProduct() {
    
    var navigation=useNavigate()
    var classes = useStyles()
    var admin= JSON.parse(localStorage.getItem('ADMIN'))


    const [companyId, setCompanyId] = useState(admin.companyid)
    const [categoryId, setCategoryId] = useState('')
    const [productId, setProductId] = useState('')
    const [quantity, setQuantity] = useState('')
    const [price, setPrice] = useState('')
    const [OfferPrice, setOfferPrice] = useState('')
    const [description, setDescription] = useState('')
    const [images, setImages] = useState([])
    const [category, setCategory] = useState([])
    const [products, setProducts] = useState([])

   const handleImage=(files)=>{
    setImages(files)
   
   }


    const fetchAllCategories = async () => {
        var result = await getData('listproduct/fetch_categoryid')
        setCategory(result.data)
    }
    const fetchAllProducts = async (categoryid) => {
        var body = { 'categoryid': categoryid }
        var result = await postData('listproduct/fetch_productid', body)
        setProducts(result.data)
    }


    useEffect(function () {
        fetchAllCategories()
    }, [])

    const fillCategory = () => {
        return category.map((item) => {
            return (<MenuItem value={item.categoryid}>{item.categorytype}</MenuItem>)
        })
    }

    const fillProducts = () => {
        return products.map((item) => {
            return (<MenuItem value={item.productid}>{item.productname}</MenuItem>)
        })
    }

    const handleCategoryChange = (event) => {
        setCategoryId(event.target.value)
        fetchAllProducts(event.target.value)
    }

    const handleProductChange = (event) => { 
        setProductId(event.target.value)
    }

    const clearValue = () => {
        setCategoryId('Choose Category...')
        setProductId('Choose Product...')
        setQuantity('')
        setPrice('')
        setOfferPrice('')
        setDescription('')
        setImages('')
    }

    const handleClick = async () => {

        var formData = new FormData()

        var cd = new Date()
        var dd = cd.getFullYear() + "/" + (cd.getMonth() + 1) + '/' + cd.getDate() + "  " + cd.getHours() + ':' + cd.getMinutes() + ':' + cd.getSeconds()

        formData.append('companyid', companyId)
        formData.append('categoryid', categoryId)
        formData.append('productid', productId)
        formData.append('quantity', quantity)
        formData.append('price', price)
        formData.append('offerprice', OfferPrice)
        formData.append('description', description)
        formData.append('createdat', dd)
        formData.append('updateat', dd)
        formData.append('createdby', "Admin")

        images.map((item,i)=>{
            formData.append('img'+i,item)
        })

        var result = await postData('listproduct/add_productlist', formData)
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


    return (
        <div className={classes.mainContainer}>
            <div className={classes.box}>
            <Grid container spacing={2}>
                    <Grid item xs={12} className={classes.rowStyle}>
                        <div className={classes.headingStyle}>
                            Product List
                        </div>
                        <div style={{ cursor: 'pointer' }}>
                            <FormatListBulletedIcon onClick={() => navigation('/dashboard/displaylistproduct')} />
                        </div>
                    </Grid>
                    <Grid item xs={6}   >
                        <TextField fullWidth value={companyId}  label="Company Id" type={"Number"} variant="outlined" />
                    </Grid>
                    <Grid item xs={6}   >
                        <TextField fullWidth value={quantity} onChange={(event) => setQuantity(event.target.value)} label="Quantity" variant="outlined" />
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Category</InputLabel>
                            <Select
                                style={{ borderRadius: 12 }}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={categoryId}
                                label="Category"
                                onChange={handleCategoryChange}
                            >
                                <MenuItem value="Choose Category..."><em>Choose Category...</em></MenuItem>
                                {fillCategory()}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} >
                        <FormControl fullWidth >
                            <InputLabel id="demo-simple-select-label">Product</InputLabel>
                            <Select
                                style={{ borderRadius: 12 }}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={productId}
                                label="Product"
                                onChange={handleProductChange}
                            >
                                <MenuItem value="Choose Product..."> <em>Choose Product...</em></MenuItem>
                                {fillProducts()}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={6}   >
                        <TextField fullWidth value={price} onChange={(event) => setPrice(event.target.value)} label="Price" variant="outlined" />
                    </Grid>
                    <Grid item xs={6}   >
                        <TextField fullWidth value={OfferPrice} onChange={(event) => setOfferPrice(event.target.value)} label="OfferPrice" variant="outlined" />
                    </Grid>
                    <Grid item xs={12}   >
                        <TextField fullWidth value={description} onChange={(event) => setDescription(event.target.value)} label="Description" variant="outlined" />
                    </Grid>
                    <Grid item xs={12}>
                        <DropzoneArea

                            acceptedFiles={['image/*']}
                            dropzoneText={<span className={classes.textStyle}>Upload Products Images</span>}
                            maxFileSize={'30000000'}
                            filesLimit="6"
                            onChange={(files) => handleImage(files)}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <div style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 20 }}>
                            <Button fullWidth onClick={handleClick} variant="contained"  >Submit</Button>
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <div style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 20 }}>
                            <Button fullWidth onClick={clearValue} variant="contained"  >Reset</Button>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}