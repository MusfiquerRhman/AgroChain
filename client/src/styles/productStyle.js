import { makeStyles } from "@mui/styles"

const style = makeStyles((theme) => ({
    input: {
        border: `1px solid ${theme.palette.primary.light}`,
    },
    offer: {
        padding: "0 1rem"
    }
}))

export default style;