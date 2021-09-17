import { NFTStorage, File } from "nft.storage";

const client = new NFTStorage({
  token: process.env.REACT_APP_NFT_STORAGE_API_KEY,
});

const AccountView = () => {
  console.log('NFTStorage', client);
  return <h1>AccountView</h1>;
};

export default AccountView;
