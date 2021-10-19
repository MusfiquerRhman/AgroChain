import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: "#006B63",
            light: "#00B3A6",
            dark: "#002422",
            contrastText: "#FFFFFF"
        },
        secondary: {
            main: "#289672",
            light: "#29BB89",
            dark: "#1E6F5C",
            contrastText: "#FFFFFF"
        },
        error: {
            main: "#DC0000"
        },
    }
});

export default theme;