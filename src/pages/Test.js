import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { actions as userActions } from "../redux/modules/User";

class Test extends React.Component {
  componentDidMount() {
    this.props.fetchUsers();
  }

  render() {
    return <p>test</p>;
  }
}

const mapStateToProps = state => ({
  state: state
});

const mapDispatchToProps = dispatch => ({
  fetchUsers: () => dispatch(userActions.fetchUsersRequest())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Test);
