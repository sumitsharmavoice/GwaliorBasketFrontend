import { useEffect, useState } from "react";
import MaterialTable from "@material-table/core";
import { getData, ServerURL, postData } from "../services/ServerServices";
import { Switch, TextField, FormControl, InputLabel, Select, Grid, MenuItem, Avatar, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, IconButton, } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { useStyles } from "./DisplayAllCompaniesCss";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";



export default function DisplayAllCompanies() {

  var navigation=useNavigate()
  var classes = useStyles()

  const [open, setOpen] = useState(false);

  const handleOpenDialog = (rowData) => {
    setOpen(true)
    fetchAllCities(rowData.state)
    setCompanyName(rowData.companyname)
    setOwnerName(rowData.ownername)
    setEmailAddress(rowData.emailaddress)
    setMobileNumber(rowData.mobilenumber)
    setAddress(rowData.address)
    setState(rowData.state)
    setCity(rowData.city)
    setStatus(rowData.status)
    setCompanyId(rowData.companyid)
    setCompanyLogo({ fileName: `${ServerURL}/images/${rowData.logo}`, bytes: '' })
    setOldPicture(rowData.logo)
 
  }

  const handleClose = () => {
    setOpen(false)
  }

  const [companyId,setCompanyId]=useState('')
  const [state, setState] = useState('')
  const [city, setCity] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [ownerName, setOwnerName] = useState('')
  const [emailAddress, setEmailAddress] = useState('')
  const [mobileNumber, setMobileNumber] = useState('')
  const [address, setAddress] = useState('')
  const [status, setStatus] = useState('')
  const [states, setStates] = useState([])
  const [cities, setCities] = useState([])
  const [btnStatus,setBtnStatus]=useState(false)
  const [oldPicture,setOldPicture]=useState('')
  const [message,setMessage]=useState('')

  const [companyLogo, setCompanyLogo] = useState({ fileName: '/assets/watermark.png', bytes: '' })

  const handleImage = (event) => {
    setCompanyLogo({ fileName: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] })
    setBtnStatus(true)
  }

  const fetchAllStates = async () => {
    var result = await getData('statecity/fetch_all_states')
    setStates(result.data)
  }

  const fetchAllCities = async (stateid) => {
    var body = { 'stateid': stateid }
    var result = await postData('statecity/fetch_all_cities', body)
    setCities(result.data)
  }

 

  useEffect(function () {
    fetchAllStates()
  }, [])


  const fillStates = () => {
    return states.map((item) => {
      return (<MenuItem value={item.stateid}>{item.statename}</MenuItem>)
    })
  }
  const fillCities = () => {
    return cities.map((item) => {
      return (<MenuItem value={item.cityid}>{item.cityname}</MenuItem>)
    })
  }

  const handleStateChange = (event) => {
    setState(event.target.value)
    fetchAllCities(event.target.value)
  }

  const handleCityChange = (event) => {
    setCity(event.target.value)
  }

  const handleStatus=(temp)=>{
    if(temp=="Pending")
    { setStatus("Verified")}
    if(temp=="Verified")
    {setStatus("Pending")}
  }

  const handleEditData = async () => {
    var cd = new Date()
    var dd = cd.getFullYear() + "/" + (cd.getMonth() + 1) + "/" + cd.getDate() + " " + cd.getHours() + ':' + cd.getMinutes() + ':' + cd.getSeconds()
    var body = {
      'companyname': companyName,
      'ownername': ownerName,
      'emailaddress': emailAddress,
      'mobilenumber': mobileNumber,
      'address': address,
      'state': state,
      'city': city,
      'updateat': dd,
      'createdby': 'ADMIN',
      'status': status,
      'companyid': companyId

    }

    var result=await postData('company/edit_company_data',body)
    if (result.status)
    {   handleClose()
      Swal.fire({
        icon: 'success',
        title: result.message
      })
    }
    else
    {
      Swal.fire({
        icon: 'error',
        title: result.message
      })
    }
 fetchAllCompanies()
  }

const handleSavePicture=async()=>{
  
  var formdata=new FormData()
  formdata.append('companyid',companyId)
  formdata.append('logo',companyLogo.bytes)

var result=await postData('company/edit_company_logo',formdata)
if (result.status)
{ setMessage(result.message)}

else {setMessage(result.message)}
fetchAllCompanies()
setBtnStatus(false)
}


const handleDelete=async(rowData)=>{
  
  handleClose()
  Swal.fire({
    title: 'Do you want to Delete Company ?',
    showCancelButton: true,
    confirmButtonText: 'Delete',
  }).then(async(result) => {
 
    if (result.isConfirmed) {
      var res=await postData('company/delete_company',{companyid:rowData.companyid})
      if(res.status)
      {   
        Swal.fire('Deleted!', '', 'Successfully')
        fetchAllCompanies()
      }
      else
      {
        Swal.fire({
          icon: 'error',
          title: result.message
         })
      }
    } else if (result.isDenied) {
      Swal.fire('Changes are not saved', '', 'info')
    }
  })



  
}

const handleCancel=()=>{
  setCompanyLogo({fileName :`${ServerURL}/images/${oldPicture}`,bytes:''})
  setOldPicture('')
  setBtnStatus(false)
}

const PictureButton=()=>{
  return(<div>
 { btnStatus?<div style={{display:'flex',}}>
  <Button onClick={handleSavePicture} >Save</Button>
  <Button onClick={handleCancel} >Cancel</Button>
  </div>:<>{message}</> }</div>)
}


  const showCompanyDetails = () => {
    return (
      <div>
        <Dialog
          open={open}

          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
              <img src="assets/logo.png" width='30px' />
              Edit Company
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'right' }}>
              <CloseIcon style={{ cursor: 'pointer' }} onClick={handleClose} />
            </div>
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={2} >
              <Grid item xs={12} className={classes.rowStyle} >

              </Grid>
              <Grid item xs={6}>
                <TextField label="Company Name" value={companyName} variant="outlined" onChange={(event) => setCompanyName(event.target.value)} fullWidth />
              </Grid>
              <Grid item xs={6}>
                <TextField label="Owner Name" value={ownerName} variant="outlined" onChange={(event) => setOwnerName(event.target.value)} fullWidth />
              </Grid>
              <Grid item xs={6}>
                <TextField label="Email" value={emailAddress} variant="outlined" onChange={(event) => setEmailAddress(event.target.value)} fullWidth />
              </Grid>
              <Grid item xs={6}>
                <TextField label="Contact" value={mobileNumber} variant="outlined" onChange={(event) => setMobileNumber(event.target.value)} fullWidth />
              </Grid>
              <Grid item xs={12}>
                <TextField label="Address" variant="outlined" value={address} onChange={(event) => setAddress(event.target.value)} fullWidth color="success" />
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">State</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={state}
                    label="State"
                    onChange={handleStateChange}
                  >
                    <MenuItem value="">Choose State.....</MenuItem>
                    {fillStates()}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">City</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={city}
                    label="City"
                    onChange={handleCityChange}
                  >
                    <MenuItem value="Choose City......">Choose City...</MenuItem>
                    {fillCities()}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={5}>
                {status=="Pending"?<Switch onChange={()=>handleStatus(status)}  />:<Switch onChange={()=>handleStatus(status)} defaultChecked />}
                {status}
              </Grid>
              <Grid item xs={3} sx={{ display: 'flex', justifyContent: "center" }} >
                <IconButton color="primary" aria-label="upload picture" component="label">
                  <input hidden accept="image/*" type="file" onChange={handleImage} />

                  <PhotoCamera />
                </IconButton>
              </Grid>
              <Grid item xs={4} >
                <Avatar
                  alt=""
                  src={companyLogo.fileName}
                  sx={{ width: 68, height: 65 }}
                  variant='rounded'

                />
                <div>
                <PictureButton />
                </div>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions >
            <Button variant="outlined"  onClick={handleEditData} >Edit </Button>
            <Button onClick={handleClose} autoFocus>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

  const [companies, setCompanies] = useState([])

  const fetchAllCompanies = async () => {
    var result = await getData('company/fetch_all_company')
    setCompanies(result.data)
  }

  useEffect(function () {
    fetchAllCompanies()
  }, [])

  function showAllCompanies() {
    return (
      <MaterialTable
        title={<span className={classes.headingStyle}>Company Details</span>}
        columns={[
          {
            title: 'CompanyName & OwnerName',
            render: rowData => <div>{rowData.companyname}<br />{rowData.ownername}</div>
          },
          {
            title: 'Address',
            render: rowData => <div>{rowData.address}<br />{rowData.cityname} , {rowData.statename}</div>
          },
          {
            title: 'Contact Details',
            render: rowData => <div>{rowData.emailaddress}<br />{rowData.mobilenumber} </div>
          },
          { title: 'Status', field: 'status' },
          {
            title: 'Last Updation',
            render: rowData => <div>{rowData.createdat}<br />{rowData.updateat}<br />{rowData.createdby}</div>
          },
          {
            title: 'Logo',
            render: rowData => <Avatar src={`${ServerURL}/images/${rowData.logo}`} variant="rounded" style={{ width: 70, height: 70 }} />
          },


        ]}
        data={companies}
        actions={[
          {
            icon:'add',
            isFreeAction:true,
            onClick:(event,rowData)=>navigation('/company')
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
      {showAllCompanies()}
      {showCompanyDetails()}
    </div>
  </div>)
}