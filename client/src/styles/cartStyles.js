import { makeStyles } from "@mui/styles"

const style = makeStyles((theme) => ({
    cartHeaderBox: {
        marginTop: "1rem",
        marginBottom: "1rem"
    },
    cartHeading: {
        marginTop: "1rem",
        marginLeft: "1rem",
        marginBottom: "0",
        fontSize: "3rem"
    },
    cartPrice: {
        marginLeft: "1rem",
        marginTop: "0",
        paddingTop: "0",
        paddingBottom: "0.5rem",
        fontSize: "1.5rem"
    },
    placeButton: {
        [theme.breakpoints.up('xs')]: {
            marginLeft: '0',
            width: "100%",
        },
        [theme.breakpoints.up('md')]: {
            marginLeft: '30%',
            width: "40%",
        },
        marginTop: "1rem",
        padding: "0.5rem",
        fontSize:"1rem"
    }
}));

export default style;