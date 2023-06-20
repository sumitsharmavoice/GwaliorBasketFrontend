import { Grid, TextField, FormControl, MenuItem, InputLabel, Select, Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { useStyles } from "./DisplayListProductCss";
import MaterialTable from "@material-table/core";
import { getData, postData } from "../services/ServerServices";
import { useEffect, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";



export default function DisplayListProduct() {

    var navigation=useNavigate()
    var classes = useStyles()

    const [productList, setProductList] = useState([])
    const [companyId, setCompanyId] = useState('')
    const [categoryId, setCategoryId] = useState('')
    const [productId, setProductId] = useState('')
    const [quantity, setQuantity] = useState('')
    const [price, setPrice] = useState('')
    const [OfferPrice, setOfferPrice] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState([])
    const [products, setProducts] = useState([])


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
    const [open, setOpen] = useState(false)

    const handleOpenDialog = (rowData) => {
        setOpen(true)
        fetchAllProducts(rowData.categoryid)
        setCompanyId(rowData.companyid)
        setCategoryId(rowData.categoryid)
        setProductId(rowData.productid)
        setQuantity(rowData.quantity)
        setPrice(rowData.price)
        setOfferPrice(rowData.offerprice)
        setDescription(rowData.description)
        setProductListId(rowData.productlistid)
    }

    const handleClose = () => {
        setOpen(false)
    }






    const showProductListDetails = () => {

        return (
            <div>

                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"  >
                    <DialogTitle id="alert-dialog-title" style={{ display: 'flex', justifyContent: 'space-between', padding: 5, marginBottom: 30 }}>
                        <div className={classes.headingStyle} style={{ display: 'flex', padding: "10px 0px 0px 15px", }} >
                            Edit Product List
                        </div>
                        <CloseIcon style={{ cursor: 'pointer' }} onClick={handleClose} />
                    </DialogTitle>
                    <DialogContent>
                        <Grid container spacing={2} padding={1}>
                            <Grid item xs={6}   >
                                <TextField fullWidth value={companyId} onChange={(event) => setCompanyId(event.target.value)} label="Company Id" type={"Number"} variant="outlined" />
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
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleEdit} >Edit</Button>
                        <Button onClick={handleClose} >
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }



    const [ProductListId, setProductListId] = useState('')

    const fetchProductList = async () => {
        var result = await getData('listproduct/fetch_listproduct')
        setProductList(result.data)
    }
    useEffect(function () {
        fetchProductList()
    }, [])



    const handleEdit = async () => {
        var cd = new Date()
        var dd = cd.getFullYear() + '/' + (cd.getMonth() + 1) + '/' + cd.getDate() + ' ' + cd.getHours() + ':' + cd.getMinutes() + ':' + cd.getSeconds()
        var body = {
            'companyid':companyId,
            'categoryid':categoryId,
            'productid':productId,
            'quantity':quantity,
            'price':price,
            'offerprice':OfferPrice,
            'description':description,
            'updateat': dd,
            'createdby': 'ADMIN',
            'productlistid':ProductListId


        }
        var result = await postData('listproduct/edit_listproduct_data', body)

        if (result.status) {
            handleClose()
            Swal.fire({
                icon: 'success',
                title: result.message
            })
        }
        else {
            handleClose()
            Swal.fire({
                icon: 'error',
                title: result.message
            })
        }
        fetchProductList()

    }

 

      const handleDelete = async (rowData) => {
        handleClose()
    
        Swal.fire({
          title: 'Do you want to Delete Product?',
          showCancelButton: true,
          confirmButtonText: 'Delete',
        }).then(async (result) => {
    
          if (result.isConfirmed) {
            var res=await postData('listproduct/delete_productlist_data',{productlistid:rowData.productlistid})
           if (res.status) {
              Swal.fire('Deleted!', '', 'Successfully')
              fetchProductList()
            }
    
            else {
              handleClose()
              Swal.fire({
                icon: 'error',
                title: result.message
              })
            }
          }
    
          else if (result.isDenied) {
            Swal.fire('Changes are not saved', '', 'info')
          }
        })
    
    
      }
    


    function ListProducts() {
        return (
            <MaterialTable
                title="Product List Preview"
                columns={[
                    { title: 'ProductListId', field: 'productlistid' },
                    { title: 'CompanyId', field: 'companyid' },
                    { title: 'CategoryId', field: 'categoryid', },
                    { title: 'ProductId', field: 'productid' },
                    { title: 'Quantity', field: 'quantity' },
                    { title: 'Price', field: 'price' },
                    { title: 'OfferPrice', field: 'offerprice' },
                    { title: 'Description', field: 'description' },
                    {
                        title: 'Last Updation',
                        render: rowData => <div>{rowData.createdat}<br />{rowData.updateat}<br />{rowData.createdby}</div>
                    },
                ]}
                data={productList}
                actions={[
                   {
                    icon:'add',
                    isFreeAction:true,
                    tooltip:'List Product',
                    onClick:(event,rowData)=>navigation('/dashboard/listproduct')
                   },
                    {
                        icon: 'edit',
                        tooltip: 'Edit User',
                        onClick: (event, rowData) => handleOpenDialog(rowData)
                    },
                    {
                        icon: 'delete',
                        tooltip: 'Delete User',
                        onClick: (event, rowData) => handleDelete(rowData)
                    }
                ]}
            />
        )
    }


    return (<div className={classes.mainContainer}>
        <div className={classes.box}>
            {ListProducts()}
            {showProductListDetails()}
        </div>
    </div>)
}