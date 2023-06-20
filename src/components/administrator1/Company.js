import React, { useState, useEffect } from "react";
import { Avatar, Grid, TextField, IconButton, FormControl, InputLabel, OutlinedInput, InputAdornment, Select, MenuItem, Button } from "@mui/material";
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useStyles } from "./CompanyCss";
import { getData, postData } from "../services/ServerServices";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';


export default function Company() {

  var navigation = useNavigate()
  var classes = useStyles()

  const [state, setState] = useState('')
  const [city, setCity] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [ownerName, setOwnerName] = useState('')
  const [emailAddress, setEmailAddress] = useState('')
  const [mobileNumber, setMobileNumber] = useState('')
  const [address, setAddress] = useState('')
  const [password, setPassword] = useState('')
  const [states, setStates] = useState([])
  const [cities, setCities] = useState([])

  const [companyLogo, setCompanyLogo] = useState({ fileName: '/assets/watermark.png', bytes: '' })

  const fatchAllStates = async () => {
    var result = await getData('statecity/fetch_all_states')
    setStates(result.data)
  }

  const fetchAllCities = async (stateid) => {
    var body = { 'stateid': stateid }
    var result = await postData('statecity/fetch_all_cities', body)
    setCities(result.data)
  }



  useEffect(function () {
    fatchAllStates()
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

  /******************************** */
  const [error, setError] = useState({})

  const handleError = (inputs, value) => {
    setError(prev => ({ ...prev, [inputs]: value }))
  }

  const validation = () => {
    var isValid = true

    if (!companyName) {
      handleError('companyName', 'Invalid Company Name')
      isValid = false
    }

    if (!ownerName) {
      handleError('ownerName', 'Invalid Owner Name')
      isValid = false
    }
    if (!emailAddress || !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailAddress))) {
      handleError('emailAddress', 'Invalid Email Address')
      isValid = false
    }
    if (!mobileNumber || !(/^[0-9]{10}$/.test(mobileNumber))) {
      handleError('mobileNumber', 'Invalid Mobile Number')
      isValid = false
    }
    if (!address) {
      handleError('address', 'Pls Input Address')
      isValid = false
    }
    if (!state || state == ('Choose State.....')) {
      handleError('state', 'Pls Select State')
      isValid = false
    }
    if (!city || city == ('Choose City.....')) {
      handleError('city', 'Pls Select City')
      isValid = false
    }
    if (!password) {
      handleError('password', 'Invalid Password')
      isValid = false
    }


  }

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleImage = (event) => {
    setCompanyLogo({ fileName: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] })
  }
  const handleStateChange = (event) => {
    setState(event.target.value)
    fetchAllCities(event.target.value)
  }

  const handleCityChange = (event) => {
    setCity(event.target.value)
  }

  const clearValue = () => {
    setCompanyName('')
    setOwnerName('')
    setEmailAddress('')
    setMobileNumber('')
    setAddress('')
    setState("Choose State.....")
    setCity('Choose City.....')
    setCompanyLogo({ fileName: '/assets/watermark.png', bytes: '' })
    setPassword('')
  }

  const handleClick = async () => {

    validation()

    var formData = new FormData()

    var cd = new Date()
    var dd = cd.getFullYear() + "/" + (cd.getMonth() + 1) + "/" + cd.getDate() + " " + cd.getHours() + ':' + cd.getMinutes() + ':' + cd.getSeconds()

    formData.append('companyname', companyName)
    formData.append('ownername', ownerName)
    formData.append('emailaddress', emailAddress)
    formData.append('mobilenumber', mobileNumber)
    formData.append('address', address)
    formData.append('state', state)
    formData.append('city', city)
    formData.append('logo', companyLogo.bytes)
    formData.append('password', password)
    formData.append('createdat', dd)
    formData.append('updateat', dd)
    formData.append('createdby', 'ADMIN')
    formData.append('status', 'Pending')

    var result = await postData('company/add_new_company', formData)
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



  return (
    <>
      <div className={classes.mainContainer}>
        <div className={classes.box}>
          <Grid container spacing={2} >
            <Grid item xs={12} className={classes.rowStyle} >
              <div style={{display:'flex',flexDirection:'row'}}>
                <div >
                  <img src="assets/logo.png" width='30px' />
                </div>
                <div className={classes.headingStyle}>
                  Company Registration
                </div>
              </div>
              <div style={{cursor:'pointer'}}>
                <FormatListBulletedIcon onClick={()=>navigation('/displayallcompanies')} />
              </div> 
            </Grid>
            <Grid item xs={6}>
              <TextField error={!error.companyName ? false : true} helperText={error.companyName} onFocus={() => handleError("companyName")} label="Company Name" value={companyName} variant="outlined" onChange={(event) => setCompanyName(event.target.value)} fullWidth />
            </Grid>
            <Grid item xs={6}>
              <TextField error={!error.ownerName ? false : true} helperText={error.ownerName} onFocus={() => handleError('ownerName')} label="Owner Name" value={ownerName} variant="outlined" onChange={(event) => setOwnerName(event.target.value)} fullWidth />
            </Grid>
            <Grid item xs={6}>
              <TextField error={!error.emailAddress ? false : true} helperText={error.emailAddress} onFocus={() => handleError('emailAddress')} label="Email" value={emailAddress} variant="outlined" onChange={(event) => setEmailAddress(event.target.value)} fullWidth />
            </Grid>
            <Grid item xs={6}>
              <TextField error={!error.mobileNumber ? false : true} helperText={error.mobileNumber} onFocus={() => handleError('mobileNumber')} label="Contact" value={mobileNumber} variant="outlined" onChange={(event) => setMobileNumber(event.target.value)} fullWidth />
            </Grid>
            <Grid item xs={12}>
              <TextField error={!error.address ? false : true} helperText={error.address} onFocus={() => handleError('address')} label="Address" variant="outlined" value={address} onChange={(event) => setAddress(event.target.value)} fullWidth color="success" />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">State</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  error={!error.state ? false : true}
                  onFocus={() => handleError('state')}
                  value={state}
                  label="State" 
                  onChange={handleStateChange}
                >
                  <MenuItem value="Choose State....."><em>Choose State.....</em></MenuItem>
                  {fillStates()}
                </Select>
                <div style={{ fontSize: 12, color: 'red', padding: '5px 0px 0px 15px', letterSpacing: 1, fontWeight: 50 }} >{error.state}</div>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">City</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  error={!error.city ? false : true}
                  onFocus={() => handleError('city')}
                  value={city}
                  label="City"
                  onChange={handleCityChange}
                >
                  <MenuItem value="Choose City....."><em>Choose City.....</em></MenuItem>
                  {fillCities()}
                </Select>
                <div style={{ fontSize: 12, color: 'red', padding: '5px 0px 0px 15px', letterSpacing: 1, fontWeight: 50 }} >{error.city}</div>
              </FormControl>
            </Grid>
            <Grid item xs={3} sx={{ display: 'flex', justifyContent: "center" }} >
              <IconButton color="primary" aria-label="upload picture" component="label">
                <input hidden accept="image/*" type="file" onChange={handleImage} />

                <PhotoCamera />
              </IconButton>
            </Grid>
            <Grid item xs={3} >
              <Avatar
                alt=""
                src={companyLogo.fileName}
                sx={{ width: 68, height: 65 }}
                variant='rounded'

              />

            </Grid>
            <Grid item xs={6} >
              <FormControl fullWidth variant="outlined" >
                <InputLabel htmlFor="outlined-adornment-password" >Password</InputLabel>
                <OutlinedInput

                  id="outlined-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  onChange={(event) => setPassword(event.target.value)}
                  error={!error.password ? false : true}
                  onFocus={() => handleError('password')}
                  value={password}
                  endAdornment={
                    <InputAdornment position="end" >
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
                <div style={{ fontSize: 12, color: 'red', padding: '5px 0px 0px 15px', letterSpacing: 1, fontWeight: 50 }} >{error.password}</div>

              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <div style={{ paddingLeft: 20, paddingRight: 20 }}>
                <Button fullWidth variant="contained" onClick={handleClick}  >Submit</Button>
              </div>
            </Grid>
            <Grid item xs={6}>
              <div style={{ paddingLeft: 20, paddingRight: 20 }}>
                <Button fullWidth variant="contained" onClick={clearValue} >Reset</Button>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  )


}

