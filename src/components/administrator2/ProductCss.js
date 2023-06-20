import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({

    mainContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#dfe6e9',
        height: "100vh",
        width: 1262,
    },

    box: {
        padding: 30,
        margin: '10px 0px 20px 130px',
        marginRight:'15%',
        width: 550,
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
        justifyContent:'space-between'

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