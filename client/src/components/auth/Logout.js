import React, { Component, Fragment } from "react";
import { logout } from "../../actions/authActions";
import { connect } from "react-redux";
import { NavLink } from "reactstrap";
// import PropTypes from "prop-types";
import store from "../../store";
export class Logout extends Component {
  // static propTypes = {
  //   logout: PropTypes.func.isRequired,
  // };

  render() {
    return (
      <Fragment>
        <NavLink onClick={() => store.dispatch(logout())} href="#">
          {/* <NavLink onClick={() => logout} href="#"> */}
          Logout
        </NavLink>
      </Fragment>
    );
  }
}

export default connect(null, { logout })(Logout);
