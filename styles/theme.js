import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        type: "dark",
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
        background: {
            default: "#FFFFFF",
            paper: "#F3F3F3"
        },
        text: {
            primary: "#000000",
            secondary: "#222222",
            disabled: "#55555",
            icon: "#000000"
        },
        action: {
            disabledBackground: '#AAAAAA',
            disabled: '#000000'
        }
    },
});

export default theme;