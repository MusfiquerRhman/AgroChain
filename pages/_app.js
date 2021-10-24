import '../styles/globals.css'
import NavBar from "../components/NavBar"
import theme from "../styles/theme"

// Material UI components
import Grid from '@mui/material/Grid';
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from '@mui/material/styles';
import { UserProvider } from '../ContextAPI/userContext'
import { FlashMessageProvider } from '../ContextAPI/flashMessageContext'


function MyApp(props) {
  const { Component, pageProps } = props;
  return (
    <div>
      <ThemeProvider theme={theme}>
        <UserProvider>
          <FlashMessageProvider>
            <CssBaseline />
            <Grid container direction="column">
              <Grid item><NavBar/></Grid>
              <Grid item container>
                <Grid item xs={1} sm={2}/>
                <Grid item xs={10} sm={8}><Component {...pageProps}/></Grid>
                <Grid item xs={1} sm={2}/>
              </Grid>
            </Grid>
          </FlashMessageProvider>
        </UserProvider>
      </ThemeProvider>
    </div>
  )
}

export default MyApp


// const auth = () => {
//   Axios.get("url", {
//     headers: {
//       "x-access-token": localStorage.getItem("token")
//     }
//   }).then((res) => {
//     // TODO
//   })
// }