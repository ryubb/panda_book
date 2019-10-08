import React from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { selectors as loginSelectors } from "../redux/modules/Login";
import {
  actions as messageActions,
  selectors as messageSelectors
} from "../redux/modules/Message";

const Mymessage = styled.div`
  display: flex;
  flex-direction: column;
`;

const Yourmessage = styled.div`
  display: flex;
  flex-direction: column;
`;

class Message extends React.Component {
  componentDidMount() {
    const { location, fetchMessages } = this.props;
    const matchRoomId = location.pathname.match(/\/messages\/(\d+)/);
    if (matchRoomId && matchRoomId[1]) {
      fetchMessages(Number(matchRoomId[1]));
    }
  }

  render() {
    const { loginUser, messages } = this.props;
    console.log(loginUser);

    return (
      messages &&
      messages.map(message => (
        <div key={message.id}>
          <p>user: {message.userId}</p>
          <p>content: {message.content}</p>
        </div>
      ))
    );
  }
}

const mapStateToProps = state => ({
  loginUser: loginSelectors.loginUser(state),
  messages: messageSelectors.messages(state)
});

const mapDispatchToProps = dispatch => ({
  fetchMessages: roomId => dispatch(messageActions.fetchMessagesRequest(roomId))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Message)
);
