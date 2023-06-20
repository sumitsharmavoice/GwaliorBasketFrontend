import { makeStyles } from "@mui/styles";

export const useStyles=makeStyles({

    mainContainer:{
        display:'flex',
        // justifyContent:'center',
        // alignItems:'center',
        // background:'#dfe6e9',
        width:'1000',
        
    },
 
   box:{
    padding:30,
    margin:10,
    marginLeft:'20%',
    width:600,
    background:'#FFF',
    borderRadius:20,
  
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