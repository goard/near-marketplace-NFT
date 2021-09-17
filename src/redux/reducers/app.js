import types from "../constants";

const initialState = {
  wallet: null,
  near: null,
  auth: null,
  paths: null,
  nftList: null,
  totalMemes: null,
  title: "",
  addMeme: null,
  loading: false,
};

const app = (state = initialState, action) => {
  switch (action.type) {
    case types.WALLET:
      return { ...state, wallet: action.payload };
    case types.INIT_NEAR:
      return { ...state, near: action.payload };
    case types.LOGIN:
      return { ...state, auth: action.payload };
    case types.GET_MEME_TOKEN_LIST:
      return { ...state, nftList: action.payload };
    case types.ADD_MEME:
      return { ...state, addMeme: action.payload };
    case types.TITLE:
      return { ...state, title: action.payload };
    case types.LOADING:
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

export default app;
