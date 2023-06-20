import { makeStyles } from "@mui/styles";


export const useStyles=makeStyles({

    mainContainer:{
        display:'flex',
        flexWrap:'wrap',
        // justifyContent:'center',
        // alignItems:'center',
        background:'#dfe6e9',
        height:'100 vh',
        width:1262,
        // height:'auto'    
    },

   box:{
    flexWrap:'wrap',
    padding:10,
    marginBottom:50,
    marginTop:30,
    marginLeft:50,
    width:"90%",
    // height:'auto',
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
    
   }
})