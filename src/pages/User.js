import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { actions, selectors } from "../redux/modules/User";

const UserWrapper = styled.div`
  display: flex;
`;

class User extends React.Component {
  componentDidMount() {
    this.props.fetchUsers();
  }

  render() {
    const { users } = this.props;

    return (
      <>
        <h3>ユーザー一覧</h3>
        <>
          {users &&
            users.map(user => {
              return (
                <UserWrapper key={user._id}>
                  <p>{user.name}</p>
                  <Link to={`/messages/${user._id}`}>チャットへ</Link>
                </UserWrapper>
              );
            })}
        </>
      </>
    );
  }
}

const mapStateToProps = state => ({
  users: selectors.users(state)
});

const mapDispatchToProps = dispatch => ({
  fetchUsers: () => dispatch(actions.fetchUsersRequest())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(User);
