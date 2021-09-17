import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const SimpleBackdrop = (props) => {
  const { open, title } = props;
  const classes = useStyles();

  return (
    <div>
      <Backdrop className={classes.backdrop} open={open}>
        <Grid container direction="column" alignItems="center">
          <CircularProgress color="inherit" />
          <Typography>{title}</Typography>
        </Grid>
      </Backdrop>
    </div>
  );
};

export default SimpleBackdrop;
