import { makeStyles } from "@mui/styles";


export const useStyles=makeStyles({
    
    mainContainer:{
        
        display:'flex',
        justifyContent:'center',
        // alignItems:'center',
        background:'#dfe6e9',
        height:'auto',
        width:1262,
        flexWrap:'wrap'
    },

   box:{
    padding:30,
    width:"40%",
    marginRight:'19%',
    // height:'auto',
    background:'#FFF',
    borderRadius:20,
    margin:'20px 20px 50px 100px',
   },

   headingStyle:{
    fontWeight:'bolder',
    fontSize:18,
    fontFamily:'poppins',
    letterSpacing:1,
    marginBottom:10

   },
   
   rowStyle:{
    display:'flex',
    flexDirection:'row',  
    justifyContent:'space-between'
    
   },
   
   textStyle: {
    fontWeight: 'bold',
    fontSize: 22,
    fontFamily: "Lobster", 
    letterSpacing: 2,
    color: '#3B3B98'
},
})