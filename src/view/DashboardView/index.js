import { useEffect, useCallback } from "react";
import { connect } from "react-redux";
import { getNftList } from "../../redux/action";
import Album from "./Album";

const DashboardView = (props) => {
  const { wallet, nftList, getNftList } = props;

  const getNftListDashboard = useCallback(async () => {
    await getNftList();
  }, [getNftList]);

  useEffect(() => {
    getNftListDashboard();
  }, [getNftListDashboard]);

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
  getNftList: () => dispatch(getNftList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardView);
