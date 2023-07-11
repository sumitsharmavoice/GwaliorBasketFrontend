import { ArrowForward, West } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import SmsIcon from "@mui/icons-material/Sms";
import { Button, InputAdornment, TextField, useMediaQuery } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { Box } from "@mui/system";
import { MuiOtpInput } from 'mui-one-time-password-input'
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { postData } from "../../../services/ServerServices";
export default function LoginDialog(props) {

  const matches = useMediaQuery("(max-width:600px)");

  const styles = {

    dialogBg: { background: "linear-gradient(19deg ,#21D9FD,#B721FF)", color: "white" },
    heading: { fontWeight: 500, fontSize: matches ? "1.25rem" : "2.125rem", maxWidth: "350px", lineHeight: 1.3, margin: matches && "80px 0px" },
    arrForward: { bgcolor: "white", color: "black", borderRadius: 8, p: 1, fontSize: 28, cursor: "pointer" },

  };
  const [otp, setOtp] = useState("");
  const [number, setNumber] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [errMsg, setErrMsg] = useState({ otp: "", num: "" });
  const [testOtp, setTestOtp] = useState("");
  
  let navigate = useNavigate();
  // Dialog Close
  const handleClose = () => {
    props.setDialogState(false);
    setOtp("");
    setNumber("");
    setErrMsg({ otp: "", num: "" });
  };

  // Get OTP value
  const handleChange = (newValue) => {
    setOtp(newValue);
  };

  // OTP validation and navigating to cart page
  async function handleOTP() {
    if (testOtp == otp) { //alert("Correct")
      var result = await postData("userinterface/add_new_user", { mobilenumber: number, })
      console.log(result.data,"dadfadsf");
      
      // console.log(result.status)
    if(result.status==0)
    {alert("server error")}
     else
     {
      if(result.status==2)
      {
        props.setDialogState(false)
        props.setAddressState(true)
        props.setUserData({userid:result.data[0].userid,mobilenumber:result.data[0].mobilenumber}) 
      }
      else if(result.status==1)
      {
        alert(result.message)
        var result_address= await postData("userinterface/check_user_address",{mobilenumber:number})
        if(result_address)
        {
          alert("Address Already Exist")
          props.setDialogState(false)
        }
        else
        {
          // alert("UserId>>>>",result.data[0].userid)
          // alert("MobileNumber>>>>",result.data[0].mobilenumber)
          props.setAddressState(true)
          
        }
      }
     }
 
      
    }
    else { alert("incorrect") }
  }

  const generateOtp = () => {

    var gotp = parseInt(Math.random() * 899999) + 100000
    alert(gotp)
    setTestOtp(gotp)
  }
  const handleClick = () => {
    generateOtp()
    setIsOpen(true)
  };

  const handleSendOtpAgain = () => {
    var gotp = parseInt(Math.random() * 899999) + 100000
    alert(gotp)
    setTestOtp(gotp)
  };

  return (
    <Dialog fullScreen={matches} onClose={handleClose} TransitionProps={{ onExited: () => setIsOpen(false) }} PaperProps={{ style: { borderRadius: 16 } }} maxWidth="sm" open={props.state} fullWidth aria-labelledby="responsive-dialog-title">
      <DialogContent width={"100%"} sx={styles.dialogBg}>
        {isOpen ? (
          <div>
            <Box color="white" py={0.7} display="flex" justifyContent="space-between" alignItems="center">
              <West onClick={() => setIsOpen(false)} style={{ fontSize: 32, cursor: "pointer" }} />
              <CloseIcon onClick={handleClose} fontSize="small" sx={{ bgcolor: "black", borderRadius: 4, p: 0.5, cursor: "pointer" }} />
            </Box>
            <h2 style={styles.heading}>OTP Verification</h2>
            <p>OTP has been sent to +91 {number}</p>
            <MuiOtpInput length={6} value={otp} onChange={handleChange} />
            <div style={{ color: "#8f111c", textAlign: "center", paddingBottom: 25 }}>{errMsg.otp}</div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <ArrowForward style={{ backgroundColor: otp.length == 6 ? "white" : "gray" }} onClick={handleOTP} sx={styles.arrForward} />
            </div>
            <p style={{ textAlign: "center" }}>Didn't get code?</p>
            <div onClick={handleSendOtpAgain} style={{ display: "flex", justifyContent: "center", gap: 4, cursor: "pointer" }}>
              <SmsIcon /> Send again
            </div>
          </div>
        ) : (
          <div>
            <Box color="white" fontSize={matches ? "29px" : "38px"} fontWeight="bold" display="flex" justifyContent="space-between" alignItems="center">
              <span style={{ color: "black" }}>GwaliorBasket</span>
              <CloseIcon onClick={handleClose} fontSize="small" sx={{ bgcolor: "black", borderRadius: 4, p: 0.5, cursor: "pointer" }} />
            </Box>
            <h2 style={styles.heading}>Buy Groceries and get upto 60% discount.</h2>

            <TextField fullWidth placeholder="Enter Mobile Number" variant="filled" value={number} onChange={(event) => setNumber(event.target.value)} hiddenLabel style={{ backgroundColor: "white", borderRadius: 22 }} size="small" InputProps={{ sx: { backgroundColor: "white", borderRadius: 8, py: 0.5 }, startAdornment: <InputAdornment position="start">+91</InputAdornment>, disableUnderline: true }} />
            <div style={{ color: "#8f111c", margin: "5px 0" }}>{errMsg.num}</div>
            <Button disabled={number.length !== 10} color="inherit" sx={{ borderRadius: 8, my: 2, py: 1.2 }} fullWidth onClick={handleClick} variant="outlined" size="large">
              Continue
            </Button>
            <p style={{ textAlign: "center", fontSize: 14, marginTop: matches && "4rem" }}>
              By continuing, you agree to our <br /> Terms of Service & Privacy Policy
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

