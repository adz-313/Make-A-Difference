import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
    appName: {
        textDecoration: "none",
        color: theme.palette.primary.contrastText,
        marginRight: theme.spacing(2),
        [theme.breakpoints.down("sm")]: {
            display: "none"
        }
    },
    iconBtn: {
        color: theme.palette.primary.contrastText,
        marginRight: theme.spacing(1),
    },
    arrange: {
        marginLeft: theme.spacing(15),
        marginRight: theme.spacing(50)
    },
    links: {
        textDecoration: "none",
        color: theme.palette.primary.contrastText,
        marginRight: theme.spacing(5)
    }
}))