import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import Alert from "@material-ui/core/Alert";
import Container from "@material-ui/core/Container";
import Snackbar from "@material-ui/core/Snackbar";
import { registerNft } from "../../redux/action";
import SimpleBackdrop from "./Backdrop";
import CreateNft from "./CreateNft";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

function AlertShow(props) {
  return <Alert elevation={6} variant="filled" {...props} />;
}

const CreateTokenView = (props) => {
  const { loading, title, registerNft } = props;
  const classes = useStyles();
  const [openSnackbar, setOpenSnacbar] = useState(false);

  const handleClose = () => {
    setOpenSnacbar(false);
  };
  return (
    <Container maxWidth={false}>
      <CreateNft registerNft={registerNft} />
      <SimpleBackdrop open={loading} title={title} />
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <AlertShow onClose={handleClose} severity="success">
          Успех, NFT token создан!
        </AlertShow>
      </Snackbar>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  loading: state.app.loading,
  title: state.app.title,
});

const mapDispatchToProps = (dispatch) => ({
  registerNft: (payload) => dispatch(registerNft(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateTokenView);
