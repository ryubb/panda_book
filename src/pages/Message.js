import React from "react";
import styled from "styled-components";
import { Formik } from "formik";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Textarea from "@material-ui/core/TextareaAutosize";
import Button from "@material-ui/core/Button";

import { selectors as loginSelectors } from "../redux/modules/Login";
import {
  actions as messageActions,
  selectors as messageSelectors
} from "../redux/modules/Message";

const Mymessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Yourmessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
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
    const { loginUser, messages, postMessage, location } = this.props;

    return (
      <>
        {messages &&
          messages.map(message =>
            loginUser && loginUser.id === message.userId ? (
              <Mymessage key={message.id}>
                <p>content: {message.content}</p>
              </Mymessage>
            ) : (
              <Yourmessage key={message.id}>
                <p>user: {message.userId}</p>
                <p>content: {message.content}</p>
              </Yourmessage>
            )
          )}
        <Formik
          intialValues={{ content: "" }}
          onSubmit={values => {
            const matchedRoomId =
              location &&
              location.pathname &&
              location.pathname.match(/\/\w*\/(\d)/);
            const roomId = Number(matchedRoomId[1]);
            const data = Object.assign({}, values);
            data.roomId = roomId;
            postMessage(data);
          }}
          render={({ values, handleChange, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <FormControl>
                <InputLabel>メッセージを入力してください</InputLabel>
                <Textarea
                  name="content"
                  value={values.content}
                  onChange={handleChange}
                />
              </FormControl>
              <Button type="submit">送信</Button>
            </form>
          )}
        />
      </>
    );
  }
}

const mapStateToProps = state => ({
  loginUser: loginSelectors.loginUser(state),
  messages: messageSelectors.messages(state)
});

const mapDispatchToProps = dispatch => ({
  fetchMessages: roomId =>
    dispatch(messageActions.fetchMessagesRequest(roomId)),
  postMessage: data => dispatch(messageActions.postMessageRequest(data))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Message)
);
