import { makeStyles } from "@mui/styles"

const style = makeStyles((theme) => ({
    activeProductsHeaderText: {
        margin: 0,
        paddingTop: '1rem',
        paddingRight: '1rem',
        paddingLeft: '1rem',
    },
    activeProductsSubHeading: {
        color: theme.palette.grey[700],
        margin: 0,
        fontSize: '1rem',
        paddingTop: '0.5rem',
        paddingBottom: '1rem',
        paddingRight: '1rem',
        paddingLeft: '1rem',
    }
}));

export default style;