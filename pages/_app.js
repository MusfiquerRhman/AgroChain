import '../styles/globals.css'
import NavBar from "../components/NavBar"
import { ThemeProvider } from '@mui/material/styles';
import theme from "../styles/theme"
import Grid from '@mui/material/Grid';

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Grid container direction="column">
          <Grid item><NavBar/></Grid>
          <Grid item container>
            <Grid item xs={1} sm={2}/>
            <Grid item xs={10} sm={8}><Component {...pageProps}/></Grid>
            <Grid item xs={1} sm={2}/>
          </Grid>
        </Grid>
      </ThemeProvider>
    </div>
  )
}

export default MyApp
