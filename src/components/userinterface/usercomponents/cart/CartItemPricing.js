import { Divider, Grid } from "@mui/material";
import { useEffect, useState } from "react";

const CartItemPricing = (props) => {
  const [totalPrice, setTotalPrice] = useState("");

  const price = () => {
    let total = 0;
    props.data.map((item) => {
      total += parseInt(item.offerprice);
    });
    setTotalPrice(total);
  };

  useEffect(() => {
    price();
  }, [props.refresh]);

  return (
    <>
      <Grid item xs={11.6} bgcolor="white" p={2} mx="auto" mt={3} lineHeight={1.8}>
        <div>
          <b>Items Total</b>
          <b style={{ float: "right" }}>Rs. {totalPrice}</b>
        </div>
        <div>
          <span>Handling Charge</span>
          <span style={{ float: "right" }}>Rs. 15</span>
        </div>
        <div>
          <span>Delivery Fee</span>
          <span style={{ float: "right" }}>Rs. 40</span>
        </div>
        <Divider sx={{ my: 1 }} />
        <div>
          <b>Total Fee</b>
          <b style={{ float: "right" }}>Rs. {totalPrice + 55}</b>
        </div>
      </Grid>
    </>
  );
};

export default CartItemPricing;