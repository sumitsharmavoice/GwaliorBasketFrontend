import React, { useEffect, useState } from "react";
import MaterialTable from "@material-table/core";
import { useStyles } from "./DisplayAllProductsCss";
import { getData, postData, ServerURL } from "../services/ServerServices";
import { Avatar, Button, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, MenuItem, Grid, Select, TextField, Radio, FormControl, InputLabel, IconButton, } from "@mui/material";
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import CloseIcon from '@mui/icons-material/Close';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function DisplayAllProducts() {

  var navigation = useNavigate()
  var classes = useStyles()

  const [productId, setProductId] = useState('')
  const [companyid, setCompanyid] = useState('')
  const [categoryid, setCategoryid] = useState('')
  const [productname, setProductname] = useState('')
  const [status, setStatus] = useState('')
  const [description, setDescription] = useState('')
  const [trending, setTrending] = useState('')
  const [deals, setDeals] = useState('')
  const [image, setImage] = useState({ filename: 'assets/watermark.png', bytes: '' })
  const [pricetype, setPricetype] = useState('')
  const [oldPicture, setOldPicture] = useState('')
  const [btnStatus, setBtnStatus] = useState(false)
  const [message, setMessage] = useState('')

  const [fillCategoryid, setFillCategoryid] = useState([])



  const handleImage = (event) => {
    setImage({ filename: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] })
    setBtnStatus(true)
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








  const [open, setOpen] = useState(false)

  const handleOpenDialog = (rowData) => {
    setOpen(true)
    setCompanyid(rowData.companyid)
    setCategoryid(rowData.categoryid)
    setProductname(rowData.productname)
    setDescription(rowData.description)
    setStatus(rowData.status)
    setTrending(rowData.trending)
    setDeals(rowData.deals)
    setPricetype(rowData.pricetype)
    setProductId(rowData.productid)
    setImage({ filename: `${ServerURL}/images/${rowData.image}`, bytes: '' })
    setOldPicture(rowData.image)
  }
  const handleClose = () => {

    setOpen(false)
  }

  const handleEdit = async () => {
    var cd = new Date()
    var dd = cd.getFullYear() + "/" + (cd.getMonth() + 1) + "/" + cd.getDate() + " " + cd.getHours() + ':' + cd.getMinutes() + ':' + cd.getSeconds()


    var body = {
      'productid': productId,
      'categoryid': categoryid,
      'companyid': companyid,
      'productname': productname,
      'status': status,
      'description': description,
      'trending': trending,
      'deals': deals,
      'pricetype': pricetype,
      'updateat': dd,
      'createdby': 'Admin',

    }

    var result = await postData('product/edit_products_data', body)

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
    fetchAllProducts()
  }

  const [products, setProducts] = useState([])
  const fetchAllProducts = async () => {
    var result = await getData('product/fetch_products')
    setProducts(result.data)
  }
  useEffect(function () {
    fetchAllProducts()
  }, [])

  const handleCancel = () => {
    setImage({ filename: `${ServerURL}/images/${oldPicture}`, bytes: '' })
    setBtnStatus(false)
  }

  const handleSavePicture = async () => {
    var formData = new FormData()
    formData.append('productid', productId)
    formData.append('image', image.bytes)
    var result = await postData('product/edit_products_image', formData)

    if (result.status) {
      setMessage(result.message)
    }
    else {
      setMessage(result.message)
    }
    setBtnStatus(false)
    fetchAllProducts()
  }


  const handleDelete = async (rowData) => {
    handleClose()

    Swal.fire({
      title: 'Do you want to Delete Product?',
      showCancelButton: true,
      confirmButtonText: 'Delete',
    }).then(async (result) => {

      if (result.isConfirmed) {
        var res = await postData('product/delete_product', { productid: rowData.productid })
        if (res.status) {
          Swal.fire('Deleted!', '', 'Successfully')
          fetchAllProducts()
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





  const PictureButton = () => {
    return (<div>
      {btnStatus ? <div style={{ display: 'flex', flexDirection: 'row', }}>
        <Button onClick={handleCancel}  >Cancel</Button>
        <Button onClick={handleSavePicture} >Save</Button>
      </div> : <>{message}</>}
    </div>
    )
  }



  function showProductDetails() {

    return (
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title" style={{ display: 'flex', justifyContent: 'right', alignItems: 'right', padding: '8px 0px 1px 15px' }} >
            {<div style={{ display: 'flex', justifyContent: 'right', cursor: "pointer", }} >
              <CloseIcon onClick={handleClose} />
            </div>}
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12} className={classes.headingStyle}>
                Products Insertion
              </Grid>
              <Grid item xs={6}>
                <TextField fullWidth label="Company Id" value={companyid} onChange={(event) => setCompanyid(event.target.value)} variant="outlined" type={"number"} />
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
              <Grid item xs={4} sx={{ display: 'flex', justifyContent: "center", paddingRight: 10, flexDirection: 'column' }} >
                <div style={{ display: 'flex', padding: 20 }}>
                  <Avatar
                    alt=""
                    src={image.filename}
                    sx={{ width: 68, height: 65 }}
                    variant='rounded'
                  />
                </div>
                <div style={{ display: 'flex', }}>
                  <PictureButton />
                </div>
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
    );

  }




  function showProducts() {
    return (
      <MaterialTable
        title="Products Preview"
        columns={[
          { title: 'ProductId', field: 'productid' },
          { title: 'Category Id', field: 'categoryid' },
          {
            title: 'Product Details ',
            render: rowData => <div>{rowData.productname}<br />{rowData.description}</div>
          },
          {
            title: 'Last Updation',
            render: rowData => <div>{rowData.createdat}<br />{rowData.updateat}<br />{rowData.createdby}</div>
          },
          {
            title: 'Logo',
            render: rowData => <Avatar src={`${ServerURL}/images/${rowData.image}`} variant="rounded" style={{ width: 70, height: 70 }} />
          },

        ]}
        data={products}
        actions={[
          {
            icon: 'add',
            isFreeAction: true,
            tooltip: 'Add Product',
            onClick: (event, rowData) => navigation('/dashboard/product')
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



  return (<div>
    <div className={classes.mainContainer}>
      <div className={classes.box}>
        {showProducts()}
        {showProductDetails()}
      </div>
    </div>
  </div>)
}