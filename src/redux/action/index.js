import types from "../constants";
import * as nearAPI from "near-api-js";
import { Contract, WalletConnection } from "near-api-js";
import { parseNearAmount } from "near-api-js/lib/utils/format";
import { NFTStorage, File } from "nft.storage";

const contractName = "dev-1631593699267-67257229190655";

const getNear = async () => {
  const { keyStores, connect } = nearAPI;
  const keyStore = new keyStores.BrowserLocalStorageKeyStore();

  const config = {
    networkId: "testnet",
    keyStore, // optional if not signing transactions
    nodeUrl: "https://rpc.testnet.near.org",
    walletUrl: "https://wallet.testnet.near.org",
    helperUrl: "https://helper.testnet.near.org",
    explorerUrl: "https://explorer.testnet.near.org",
  };
  const near = await connect(config);
  return near;
};

const setMediaToNftStorage = async (payload) => {
  const apiKey = process.env.REACT_APP_NFT_STORAGE_API_KEY;
  const client = new NFTStorage({ token: apiKey });
  const metadata = await client.store({
    name: payload.name,
    description: "",
    image: payload.fileBuffer,
  });
  return metadata;
};

class NearClient {
  // The user account name
  accountId;
  // The sigined to wallet
  auth;
  // Near Object
  near;
  // The wallet
  wallet;
  // The wallet balance
  walletBalance;
  // The contract near
  contract;

  setupInitializeNear = async () => {
    this.near = await getNear();
    this.wallet = new WalletConnection(this.near);
    return this.wallet;
  };

  getWallet = () => {
    if (!this.wallet) {
      throw Error("not initial near blockchain");
    }
    return this.wallet;
  };

  getContract = () => {
    if (!this.wallet) {
      throw Error("not initial near blockchain");
    }
    this.contract = new Contract(this.wallet.account(), contractName, {
      // view methods do not change state but usually return a value
      viewMethods: [
        "get_token_ids",
        "nft_token",
        "get_sale",
        "nft_total_supply",
      ],
      changeMethods: [
        "new",
        "nft_mint",
        "nft_transfer",
        "nft_approve_account_id",
      ], // change methods modify state
      // account object to initialize and sign transactions.
      sender: this.wallet.getAccountId(),
    });
    return this.contract;
  };

  initAuth = () => {
    return this.wallet.isSignedIn();
  };
  // Add dispatch title for login and logout
  login = () => {
    if (!this.wallet) {
      throw Error("not initial near blockchain");
    }
    this.wallet.requestSignIn();
  };

  logout = () => {
    if (!this.wallet) {
      throw Error("not initial near blockchain");
    }
    this.wallet.signOut();
    this.auth = false;
    return this.auth;
  };
}

const nearClient = new NearClient();

export const initNear = () => async (dispatch) => {
  const wallet = await nearClient.setupInitializeNear();

  dispatch({
    type: types.WALLET,
    payload: wallet,
  });
  console.log("wallet", wallet);
  return wallet;
};

export const getNftList = () => async (dispatch) => {
  if (!nearClient.wallet) {
    throw Error("not initial near blockchain");
  }
  const contract = nearClient.getContract();
  // Change total supply to ids tokens to current contract
  // const totalSupply = parseInt(await contract.nft_total_supply());
  const tokenIds = await contract.get_token_ids();
  const nftList = [];
  for (let i = 0; i < tokenIds.length; i++) {
    const token_id = tokenIds[i];
    const res = await contract.nft_token({ token_id });
    nftList.push({ ...res, token_id });
  }

  dispatch({
    type: types.GET_MEME_TOKEN_LIST,
    payload: nftList,
  });
};

export const login = () => (dispatch) => {
  dispatch({
    type: types.TITLE,
    payload: "Connect to wallet",
  });
  nearClient.login();
  dispatch({
    type: types.LOGIN,
    payload: true,
  });
};

export const logout = () => (dispatch) => {
  dispatch({
    type: types.TITLE,
    payload: "Logout to wallet",
  });
  nearClient.logout();
  dispatch({
    type: types.LOGIN,
    payload: false,
  });
};

export const registerNft = (payload) => async (dispatch) => {
  const {
    utils: {
      format: { formatNearAmount },
    },
  } = nearAPI;

  dispatch({
    type: types.LOADING,
    payload: true,
  });
  dispatch({
    type: types.TITLE,
    payload: "Register NFT to NEAR blockchain",
  });
  console.log(payload);
  const raw = await setMediaToNftStorage(payload);
  console.log("raw", raw.data.image.hostname + raw.data.image.pathname);
  const path = raw.data.image.hostname + raw.data.image.pathname;
  const GAS = 200000000000000;
  const deposit = parseNearAmount("1");
  const contract = nearClient.getContract();
  await contract.nft_mint(
    {
      token_id: `token-${Date.now()}`,
      metadata: path,
    },
    GAS,
    deposit
  );
  dispatch({
    type: types.LOADING,
    payload: false,
  });
};
