import { makeStyles } from "@mui/styles";

export const useStyles=makeStyles({

    mainContainer:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        background:'#dfe6e9',
        height:'100vh',
        width:'100vw',
    },
 
   box:{ 
    padding:20,
    margin:10,
    width:800,
    background:'#FFF',
    borderRadius:20 
   },

   headingStyle:{
    fontWeight:'bolder',
    fontSize:18,
    fontFamily:'poppins',
    letterSpacing:1
   },
   
   rowStyle:{
    display:'flex',
    flexDirection:'row',  
    justifyContent:'space-between'
    
   }
})
