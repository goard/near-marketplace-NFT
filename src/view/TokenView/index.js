import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import MediaNft from "./MediaNft";
import InfoNft from "./InfoNft";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const TokenView = (props) => {
  const { nftList } = props;
  const linkId = useParams().id;
  const classes = useStyles();
  console.log(nftList);

  const tokenData = nftList.find((el) => el.token_id === linkId);
  console.log(tokenData);

  return (
    <Container className={classes.root}>
      <Grid container spacing={3}>
        <Grid item lg={6} md={6} xs={12}>
          <MediaNft img={tokenData.metadata} title={tokenData.name} />
        </Grid>
        <Grid item lg={6} md={6} xs={12}>
          <InfoNft nft={tokenData} />
        </Grid>
      </Grid>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  nftList: state.app.nftList,
});

export default connect(mapStateToProps)(TokenView);
