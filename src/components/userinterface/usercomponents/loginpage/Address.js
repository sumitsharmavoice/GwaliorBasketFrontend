import { CloseRounded } from "@mui/icons-material";
import { Dialog, DialogContent, Grid, TextField, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { postData } from "../../../services/ServerServices";

const Address = (props) => {
  const matches = useMediaQuery("(max-width:600px)");
  const [fullName, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState(props.userData.mobilenumber);
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [address, setAddress] = useState("");
  const [userId,setUserID]=useState(props.userData.userId)
  // alert("userdi",props.userData.mobilenumbernumber)
  //  alert("MobileNumber>>>>>",mobileNumber)
  const handleClose = () => {
    props.setAddressState(false);
  };

  const handleClick =async () => {

    console.log("userid>>>>>>",userId)

    var body={"userid":userId,"fullname":fullName,"mobilenumber":mobileNumber,"city":city,"state":state,"zipcode":zipCode,"address":address}

    var result= await postData("userinterface/add_user_address",body)
    if(result.status)

    {
      alert("Address Submitted")
      props.setAddressState(false)
    }
    else
    {
      alert("Fail to Submit Address")
    }
  };

  // console.log(props.userData,"propssssssssssss");
  useEffect(()=>{
    setMobileNumber(props.userData.mobilenumber)
  },[props.addressState])

  return (
    <>
      <Dialog fullScreen={matches} PaperProps={{ style: { borderRadius: 6 } }} maxWidth="md" open={props.addressState} fullWidth aria-labelledby="responsive-dialog-title">
        <DialogContent width={"100%"}>
          <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
            <h2 style={{ fontSize: 20, margin: "3px 0px 14px 0px" }}>Add New Address</h2>
            <CloseRounded onClick={handleClose} sx={{ cursor: "pointer" }} />
          </div>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField onChange={(e) => setName(e.target.value)} fullWidth label="Full Name" />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField value={mobileNumber}  onChange={(e) => setMobileNumber(e.target.value)} fullWidth label="Phone Number" />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField onChange={(e) => setState(e.target.value)} fullWidth label="State" />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField onChange={(e) => setCity(e.target.value)} fullWidth label="City" />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField onChange={(e) => setZipCode(e.target.value)} fullWidth label="Zip Code" />
            </Grid>
            <Grid item xs={12}>
              <TextField onChange={(e) => setAddress(e.target.value)} multiline rows={3} fullWidth label="Address" />
            </Grid>
            <Grid item xs={12}>
              <button onClick={handleClick} style={{ width: "100%", backgroundColor: "#1dd391", outline: "none", border: "none", padding: "12px 0px", borderRadius: "24px", color: "white", fontSize: "18px", cursor: "pointer" }}>
                Submit
              </button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Address;
