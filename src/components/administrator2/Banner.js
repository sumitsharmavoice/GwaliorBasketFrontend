import React, { useState } from "react"
import { useStyles } from "./BannerCss"
import { DropzoneArea } from "material-ui-dropzone";
import { Grid, TextField, Button } from "@mui/material";
import { postData } from "../services/ServerServices";
import Swal from "sweetalert2";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { useNavigate } from "react-router-dom";



export default function Banner() {
    var admin = JSON.parse(localStorage.getItem('ADMIN'))
    var navigation = useNavigate()
    var classes = useStyles()

    const [companyId, setCompanyId] = useState(admin.companyid)
    const [bannerImg, setBannerImg] = useState([])


    const handleImage = (files) => {
        setBannerImg(files)
    }

    const clearValue = () => {
        setBannerImg('')
    }
    const handleClick = async () => {
        var formData = new FormData()
        var cd = new Date()
        var dd = cd.getFullYear() + "/" + (cd.getMonth() + 1) + '/' + cd.getDate() + "  " + cd.getHours() + ':' + cd.getMinutes() + ':' + cd.getSeconds()

        formData.append('companyid', admin.companyid)
        formData.append('status', true)
        formData.append('createdat', dd)
        formData.append('updateat', dd)
        formData.append('createdby', "Admin")

        bannerImg.map((item, i) => {
            return (formData.append('img' + i, item))
        })

        var result = await postData('banner/add_banners', formData)

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
                <Grid container spacing={2} >
                    <Grid item xs={12} className={classes.rowStyle}>
                        <div className={classes.headingStyle}>
                            Banner Insertion
                        </div>
                        <div style={{ cursor: 'pointer' }}>
                            <FormatListBulletedIcon onClick={() => navigation('/dashboard/displayallbanners')} />
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth  value={companyId}  label="Company Id" variant="outlined" type={"number"} />
                    </Grid>
                    <Grid item xs={12}>
                        <DropzoneArea
                            acceptedFiles={['image/*']}
                            dropzoneText={<span className={classes.textStyle}>Upload Products Images</span>}
                            maxFileSize={'30000000'}
                            filesLimit="20"
                            onChange={(files) => handleImage(files)}
                        />
                    </Grid>
                    <Grid item xs={6} style={{ display: 'flex', marginTop: 20, padding: '20px 30px 10px 30px' }}>
                        <Button fullWidth variant="contained" onClick={handleClick}  >Submit</Button>
                    </Grid>
                    <Grid item xs={6} style={{ display: 'flex', marginTop: 20, padding: '20px 20px 10px 30px' }}>
                        <Button fullWidth variant="contained" onClick={clearValue} >Reset</Button>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}