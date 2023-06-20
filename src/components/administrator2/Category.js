import React, { useState } from "react";
import { Grid, TextField, IconButton, Avatar, Button } from "@mui/material";
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { useStyles } from "./CategoryCss";
import { postData } from "../services/ServerServices";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';



export default function Category() {
    var classes = useStyles()
    const navigation = useNavigate()

    var admin = JSON.parse(localStorage.getItem('ADMIN'))

    const [companyId, setCompanyId] = useState(admin.companyid)
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')
    const [categoryIcon, setCategoryIcon] = useState({ filename: '/assets/watermark.png', bytes: '' })


    const handleImage = (event) => {
        setCategoryIcon({ filename: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] })
    }

    const handleClick = async () => {
        var formData = new FormData()
        var cd = new Date()
        var dd = cd.getFullYear() + '/' + (cd.getMonth() + 1) + '/' + cd.getDate() + ' ' + cd.getHours() + ':' + cd.getMinutes() + ':' + cd.getSeconds()
        formData.append('companyid', admin.companyid)
        formData.append('categorytype', category)
        formData.append('description', description)
        formData.append('icon', categoryIcon.bytes)
        formData.append('createdat', dd)
        formData.append('updateat', dd)
        formData.append('createdby', 'ADMIN')


        var result = await postData('category/add_category', formData)

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
        setCategory('')
        setDescription('')
        setCategoryIcon({ filename: '/assets/watermark.png', bytes: '' })
    }

    return (<>
        <div className={classes.mainContainer}>
            <div className={classes.box}>
                <Grid container spacing={2}>
                    <Grid item xs={12} className={classes.rowStyle}>
                        <div className={classes.headingStyle}>Category Insertion</div>
                        <div style={{ cursor: 'pointer' }}>
                            <FormatListBulletedIcon onClick={() => navigation('/dashboard/displayallcategories')} />
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField fullWidth  value={companyId}  label="Company Id" variant="outlined" type={"number"} />
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
                    </Grid>
                    <Grid item xs={6}>
                        <TextField fullWidth label="Description" value={description} onChange={(event) => setDescription(event.target.value)} variant="outlined" />
                    </Grid>
                    <Grid item xs={6} style={{ display: 'flex', justifyContent: 'right', marginTop: 20, paddingRight: 50 }}>
                        <Button fullWidth variant="contained" onClick={handleClick} >Submit</Button>
                    </Grid>
                    <Grid item xs={6} style={{ display: 'flex', justifyContent: 'left', marginTop: 20, paddingLeft: '50px' }}>
                        <Button fullWidth variant="contained" onClick={clearValue} >Reset</Button>
                    </Grid>
                </Grid>

            </div>
        </div>
    </>)

}