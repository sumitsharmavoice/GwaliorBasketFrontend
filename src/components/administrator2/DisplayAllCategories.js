import { useEffect, useState } from "react";
import MaterialTable from "@material-table/core";
import { useStyles } from "./DisplayAllCategoryCss";
import { getData, postData, ServerURL } from "../services/ServerServices";
import { Avatar, Button, DialogTitle, DialogContent, Dialog, DialogActions, Grid, TextField, IconButton } from "@mui/material";
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import CloseIcon from '@mui/icons-material/Close';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function DisplayAllCategories() {

  var classes = useStyles()
   const navigation=useNavigate()
  const [categoryId, setCategoryId] = useState('')
  const [companyid, setCompanyid] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [categoryIcon, setCategoryIcon] = useState({ filename: '/assets/watermark.png', bytes: '' })
  const [btnStatus, setBtnStatus] = useState(false)
  const [oldPicture, setOldPicture] = useState('')
  const [message, setMessage] = useState('')


  const handleImage = (event) => {
    setCategoryIcon({ filename: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] })
    setBtnStatus(true)
  }





  const [open, setOpen] = useState(false)

  const handleOpenDialog = (rowData) => {
    setOpen(true)
    setCompanyid(rowData.companyid)
    setCategory(rowData.categorytype)
    setDescription(rowData.description)
    setCategoryIcon({ filename: `${ServerURL}/images/${rowData.icon}`, bytes: '' })
    setOldPicture(rowData.icon)
    setCategoryId(rowData.categoryid)

  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleEdit = async () => {

    var cd = new Date()
    var dd = cd.getFullYear() + '/' + (cd.getMonth() + 1) + '/' + cd.getDate() + ' ' + cd.getHours() + ':' + cd.getMinutes() + ':' + cd.getSeconds()
    var body = {
      'categoryid': categoryId,
      'companyid': companyid,
      'categorytype': category,
      'description': description, 
      'updateat': dd,
      'createdby': 'ADMIN',


    }
    var result = await postData('category/edit_category_data', body)

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
    fetchAllCategory()
  }





  const handleCancel = () => {
    setCategoryIcon({ filename: `${ServerURL}/images/${oldPicture}`, bytes: '' })
    setBtnStatus(false)

  }
  const handleSavePicture = async () => {

    var formdata = new FormData()

    formdata.append('icon', categoryIcon.bytes)
    formdata.append('categoryid', categoryId)

    var result = await postData('category/edit_category_icon', formdata)
    if (result.status) { setMessage(result.message) }
    else { setMessage(result.message) }
    fetchAllCategory()
    setBtnStatus(false)
  }


  const PictureButton = () => {
    return (<div>
      {btnStatus ? <div style={{ display: 'flex' }}>
        <Button onClick={handleCancel} >Cancel</Button>
        <Button onClick={handleSavePicture} >Save</Button>
      </div> : <>{message}</>}
    </div>)
  }

  const handleDelete = async (rowData) => {
    handleClose()

    Swal.fire({
      title: 'Do you want to Delete Category?',
      showCancelButton: true,
      confirmButtonText: 'Delete',
    }).then(async(result) => {

      if (result.isConfirmed) {
        var res = await postData('category/delete_category', { categoryid: rowData.categoryid })

        if (res.status) 
        {
           Swal.fire('Deleted!', '', 'Successfully')
           fetchAllCategory()
        }
        
       else
        {
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

const showCategoryDetails = () => {

  return (
    <div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"  >
        <DialogTitle id="alert-dialog-title" style={{ display: 'flex', justifyContent: 'space-between', padding: 5, marginBottom: 30 }}>
          <div className={classes.headingStyle} style={{ display: 'flex', padding: "10px 0px 0px 15px", }} >
            Edit Category
          </div>
          <CloseIcon style={{ cursor: 'pointer' }} onClick={handleClose} />
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} padding={1}>
            <Grid item xs={6}>
              <TextField fullWidth value={companyid} onChange={(event) => setCompanyid(event.target.value)} label="Company Id" variant="outlined" type={"number"} />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth value={category} onChange={(event) => setCategory(event.target.value)} label="Category" variant="outlined" />
            </Grid>
            <Grid item xs={3}  >
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: 12 }}>
                <IconButton color="primary" aria-label="upload picture" component="label"  >
                  <input hidden accept="image/*" type="file" onChange={handleImage} />
                  <PhotoCamera />
                </IconButton>
              </div>
            </Grid>
            <Grid item xs={3}  >
              <div style={{ display: 'flex', justifyContent: 'left' }}>
                <Avatar
                  alt=""
                  variant="rounded"
                  src={categoryIcon.filename}
                  sx={{ width: 56, height: 56 }}
                />
              </div>
              <div>
                <PictureButton />
              </div>
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Description" value={description} onChange={(event) => setDescription(event.target.value)} variant="outlined" />
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



const [catagories, setCatagories] = useState([])

const fetchAllCategory = async () => {
  var result = await getData('category/fetch_all_category')
  setCatagories(result.data)
}
useEffect(function () {
  fetchAllCategory()
}, [])





function showCategories() {
  return (
    <MaterialTable
      title="Category Preview"
      columns={[
        { title: 'Company Id', field: 'companyid' },
        { title: 'Category Type', field: 'categorytype' },
        { title: 'Description ', field: 'description' },
        {
          title: 'Last Updation',
          render: rowData => <div>{rowData.createdat}<br />{rowData.updateat}<br />{rowData.createdby}</div>
        },
        {
          title: 'Logo',
          render: rowData => <Avatar src={`${ServerURL}/images/${rowData.icon}`} variant="rounded" style={{ width: 70, height: 70 }} />
        },

      ]}
      data={catagories}
      actions={[
        {
          icon:'add',
          isFreeAction:true,
          tooltip:'Add Category',
          onClick:(event,rowData)=>navigation('/dashboard/category')
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
    {showCategories()}
    {showCategoryDetails()}
  </div>
</div>)


}