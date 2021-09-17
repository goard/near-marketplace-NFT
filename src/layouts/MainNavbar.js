import { connect } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Box } from "@material-ui/core";
import { LogIn as LoginIcon } from "react-feather";
import Logo from "../components/Logo";
import { login } from "../redux/action";

const MainNavbar = (props) => {
  const { login, ...prop } = props;
  return (
    <AppBar elevation={0} {...prop}>
      <Toolbar sx={{ height: 64 }}>
        <RouterLink to="/">
          <Logo height="68" weight="68" />
        </RouterLink>
        <Box sx={{ flexGrow: "1" }} />
        <IconButton onClick={() => login()} color="inherit">
          <LoginIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

const mapStateToProps = (state) => ({
  wallet: state.app.wallet,
});

const mapDispatchToProps = (dispatch) => ({
  login: () => dispatch(login()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainNavbar);
