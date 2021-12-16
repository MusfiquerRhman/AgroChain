import { makeStyles } from "@mui/styles"

const style = makeStyles((theme) => ({
    form: {
        margin: "3rem 1rem",
        padding: "2rem",
        paddingBottom: "1rem",
    },
    imagetext: {
        padding: "10rem 5rem",
        border: "5px solid #006B63",
    },
    image: {
        width: "100%",
        height: "40vh"
    },
    flashMessages: {
        color: "#DC0000"
    },
    formBox: {
        [theme.breakpoints.up('xl')]: {
            width: "100%"
        },
        [theme.breakpoints.up('md')]: {
            marginLeft: "10%",
            width: "80%"
        },
        [theme.breakpoints.up('lg')]: {
            marginLeft: "22%",
            width: "55%"
        }
    },
}));

export default style;