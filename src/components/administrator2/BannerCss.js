import { makeStyles } from "@mui/styles";

export const useStyles=makeStyles({

    mainContainer:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        background:'#dfe6e9',
        height:'auto',
        width:'100%',
    },

   box:{ 
    padding:20,
    marginTop:80,
    marginBottom:180,
    width:600,
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
    
   },
   textStyle: {
    fontWeight: 'bold',
    fontSize: 22,
    fontFamily: "Lobster", 
    letterSpacing: 2,
    color: '#3B3B98'
},
})
