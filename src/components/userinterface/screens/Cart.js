import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import DiscountIcon from "@mui/icons-material/Discount";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Button, Grid } from "@mui/material";
import Box from "@mui/material/Box";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartItemPricing from "../usercomponents/cart/CartItemPricing";
import CartItems from "../usercomponents/cart/CartItems";
import Header from "../usercomponents/homepage/Header";
import LoginDialog from "../usercomponents/loginpage/LoginDialog";
import Address from "../usercomponents/loginpage/Address";

export default function Cart() {
  const styles = {
    nav: { flexGrow: 1, background: "linear-gradient(89deg ,#21D9FD,#B721FF)", display: "flex", alignItems: "center", gap: 2, justifyContent: "center", fontSize: 20, position: "static", py: 1.5, color: "whitesmoke" },
    offr: { backgroundColor: "#bbf7d0", padding: "4px 20px", borderRadius: 6, marginLeft: 18, fontSize: 12 },
  };
  const [refresh, setRefresh] = useState(false);
  const [dialogState, setDialogState] = useState(false)
  const [addressState, setAddressState] = useState(false)
  const [userData,setUserData]=useState({userid:'',mobilenumber:''})

  const dispatch = useDispatch();
  const products = useSelector((state) => state.cart);
  const productList = Object.values(products)
  const keys = Object.keys(products);

  const handleDelete = () => {
    keys.forEach((key) => {
      dispatch({ type: "DELETE_CART", payload: [key] });
    });
    setRefresh(!refresh);
  };

 const handleClick=()=>{

  setDialogState(true)
 }

  return (
    <>
      <Header />
      <div style={{ backgroundColor: "#f2f2f2", width: "100%" }}>

        {/* Top Strip */}
        <Box sx={styles.nav}>
          <LocalShippingIcon fontSize="medium" /> Delivering to you very fast.
        </Box>

        {/* Cart Action */}
        <Grid container maxWidth={1300} mx="auto">
          <Grid item xs={12} p={2} display="flex" justifyContent="space-between">
            <div>
              <span>Cart ({Object.keys(products).length} Items)</span>
            </div>
            <Button onClick={handleDelete} variant="outlined" color="warning" size="small">
              Empty cart
            </Button>
          </Grid>

          {/* Left Part */}
          <CartItems products={productList} />

          {/* Right Part */}
          <Grid item xs={12} md={5}>

            {/* Coupons */}
            <Grid item xs={11.6} p={2} mx="auto" bgcolor="white" display="flex" alignItems="center" gap={2}>
              <DiscountIcon fontSize="large" style={{ color: "#05c46b" }} />
              <span>Avail Offers and Coupons</span>
              <ArrowRightIcon fontSize="large" style={{ color: "red", marginLeft: "auto" }} />
            </Grid>

            <CartItemPricing refresh={refresh} data={productList} />

            {/* Address */}
            <Grid item xs={11.6} p={2} py={4} mx="auto" bgcolor="white" mt={3} container justifyContent="center" gap={3}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <LocationOnIcon fontSize="large" color="primary" />
                <b style={{ color: "gray" }}>Enter your delivery address</b>
              </div>
              <Button fullWidth size="large" variant="contained" onClick={handleClick} >
                Add Address to Proceed
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </div>
      <LoginDialog state={dialogState} setDialogState={setDialogState} setAddressState={setAddressState} userData={userData} setUserData={setUserData} />
      <Address userData={userData} setUserData={setUserData} addressState={addressState} setAddressState={setAddressState} />
    </>
  );
}
