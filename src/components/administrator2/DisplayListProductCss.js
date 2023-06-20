import { makeStyles } from "@mui/styles";
export const useStyles = makeStyles({

    mainContainer: {
        display: 'flex',
        // justifyContent: 'center',
        alignItems: 'center',
        background: '#dfe6e9',
        height: 'auto',
        width: 1262,
    },

    box: {
        padding: 10,
       margin:'40px 20px 120px 20px',
        width: 1200,
        background: '#FFF',
        borderRadius: 20
    },

    headingStyle: {
        fontWeight: 'bolder',
        fontSize: 18,
        fontFamily: 'poppins',
        letterSpacing: 1
    },

    rowStyle: {
        display: 'flex',
        flexDirection: 'row',

    },
    textStyle: {
        fontWeight: 'bold',
        fontSize: 18,
        fontFamily: "Sofia",
        letterSpacing: 1,
        color: '#3B3B98'
    },
    // radio: {
    //     display: 'flex',
    //     justifyContent: 'left',
    //     paddingtop:12,
    //     marginTop:20
    // }
})