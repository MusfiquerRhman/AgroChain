import '../styles/globals.css'
import NavBar from "../components/NavBar"
import theme from "../styles/theme"

    // Material UI components
import Grid from '@mui/material/Grid';
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from '@mui/material/styles';
import { FlashMessageProvider } from '../ContextAPI/flashMessageContext'


function MyApp(props) {
    const { Component, pageProps } = props;
    return (
        <div>
        <ThemeProvider theme={theme}>
            <FlashMessageProvider>
                <CssBaseline />
                <Grid container direction="column">
                    <Grid item><NavBar/></Grid>
                    <Grid item container justifyContent={"center"}>
                        <Grid item xs={12} sm={10} lg={8}><Component {...pageProps}/></Grid>
                    </Grid>
                </Grid>
            </FlashMessageProvider>
        </ThemeProvider>
        </div>
    )
}

export default MyApp

// INSERT INTO restaurents_details (USER_ID, RESTAURENTS_NAME, RESTAURENTS_ADDRESS, RESTAURENTS_ABOUT, RESTAURENTS_WEBSITE) VALUES ("f0efa07c-3425-11ec-971f-38d5470f2067", "Banana heaven", "Chicken mountain", "If you can imagine an banana and chicken dish, this restaurent have it", "www.chickenlovesbanana.com")
// const auth = () => {
//   Axios.get("url", {
//     headers: {
//       "x-access-token": localStorage.getItem("token")
//     }
//   }).then((res) => {
//     // TODO
//   })
// }
