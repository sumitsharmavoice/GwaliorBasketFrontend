import { useStyles } from "./DisplayAllBannersCss"
import MaterialTable from "@material-table/core";
import { getData, ServerURL } from "../services/ServerServices";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export default function DisplayAllBanners() {

    var classes = useStyles()
    var navigation=useNavigate() 

    const [companyId, setCompanyId] = useState('')
    const [bannerImg, setBannerImg] = useState([])


    const handleImage = (files) => {
        setBannerImg(files)
    }

    const [open, setOpen] = useState(false)

    // const handleOpenDialog = (rowData) => {
    //     setOpen(true)
    //     setCompanyid(rowData.companyid)
    //     setCategory(rowData.categorytype)
    //     setDescription(rowData.description)
    //     setCategoryIcon({ filename: `${ServerURL}/images/${rowData.icon}`, bytes: '' })
    //     setOldPicture(rowData.icon)
    //     setCategoryId(rowData.categoryid)

    // }

    const handleClose = () => {
        setOpen(false)
    }



    const [banners, setBanners] = useState([])

  const fetchAllBanners=async()=>{
    var result= await getData('banner/fetch_all_banners')
    setBanners(result.data)
  }
  useEffect(function (){
fetchAllBanners()
  },[])

    function showBanners() {
        return (
            <MaterialTable
                title="Banners Preview"
                columns={[
                    { title: 'Company Id', field: 'companyid' },
                    {
                        title: 'Last Updation',
                        render: rowData => <div>{rowData.createdat}<br />{rowData.updateat}<br />{rowData.createdby}</div>
                    },
                    {
                        title: 'Banner Img',field:'banners'
                    },

                ]}
                data={banners}
                actions={[
                    {
                        icon: 'add',
                        isFreeAction: true,
                        tooltip: 'Add Banners',
                        onClick:(event,rowData)=>navigation('/dashboard/banner')
                    },
                    {
                        icon: 'edit',
                        tooltip: 'Edit User',
                        // onClick: (event, rowData) => handleOpenDialog(rowData)
                    },
                    {
                        icon: 'delete',
                        tooltip: 'Delete User',
                        // onClick: (event, rowData) => handleDelete(rowData)
                    }
                ]}
            />
        )
    }

    return (
        <div className={classes.mainContainer}>
            <div className={classes.box}>
                {showBanners()}
            </div>
        </div>
    )
}