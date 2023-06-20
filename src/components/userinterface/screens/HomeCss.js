import { makeStyles } from "@mui/styles";

export const useStyles=makeStyles({

    mainContainer:{ 
        // flexWrap:'wrap',
        display:'flex',
        flexDirection:'column',
        justifyContent:'normal',
        // alignItems:'center',
        // background:'#dfe6e9',
        height:'100%',
        width:'100%',
   
    },

   box:{ 
   
    width:'100%',
    background:'#FFF',
    // borderRadius:20 
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
