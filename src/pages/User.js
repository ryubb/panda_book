import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { actions as userActions, selectors } from "../redux/modules/User";
import { actions as roomActions } from "../redux/modules/Room";

const UserWrapper = styled.div`
  display: flex;
`;

class User extends React.Component {
  componentDidMount() {
    this.props.fetchUsers();
  }

  onClick(e, toUserId) {
    e.preventDefault();
    this.props.fetchRoom(toUserId);
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
                <UserWrapper key={user.id}>
                  <p>{user.name}</p>
                  <a href="/" onClick={e => this.onClick(e, user.id)}>
                    チャットへ
                  </a>
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
  fetchUsers: () => dispatch(userActions.fetchUsersRequest()),
  fetchRoom: toUserId => dispatch(roomActions.fetchRoomRequest(toUserId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(User);
