import { useEffect, useCallback } from "react";
import { connect } from "react-redux";
import Album from "./Album";
// import { Link as RouterLink } from "react-router-dom";
import { getNftList, initNear } from "../../redux/action";

const MarketView = (props) => {
  const { nftList, getNftList, initNear } = props;
  // if (!nftList) {
  //   setInterval(getNftList, 3000);
  // }

  const initNearGetNft = useCallback(async () => {
    await initNear();
    await getNftList();
  }, [initNear, getNftList]);

  // The depencies to nftList if nftList add depencies to cycle call initNearGetNft()
  useEffect(() => {
    initNearGetNft();
  }, [initNearGetNft]);

  return (
    <>
      {Array.isArray(nftList) && nftList.length > 0 && (
        <Album dataArr={nftList} />
      )}
      {!nftList && <h1>loading...</h1>}
    </>
  );
};

const mapStateToProps = (state) => ({
  wallet: state.app.wallet,
  nftList: state.app.nftList,
});

const mapDispatchToProps = (dispatch) => ({
  initNear: () => dispatch(initNear()),
  getNftList: () => dispatch(getNftList()),
});
export default connect(mapStateToProps, mapDispatchToProps)(MarketView);
