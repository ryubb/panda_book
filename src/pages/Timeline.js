import React from "react";
import { connect } from "react-redux";
import { Formik } from "formik";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";
import { actions, selectors } from "../redux/Timeline";

class Timeline extends React.Component {
  componentDidMount() {
    this.props.fetchTimelines();
  }

  render() {
    const { timelines } = this.props;

    return (
      <>
        <List>
          {timelines &&
            timelines.map(timeline => (
              <ListItem key={timeline._id}>
                <ListItemAvatar>
                  <Avatar>
                    <ImageIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={timeline.content}
                  secondary={timeline.user && timeline.user.name}
                />
              </ListItem>
            ))}
        </List>
        <Formik
          initialValues={{ content: "" }}
          onSubmit={values => {
            console.log(values);
            this.props.postTimeline(values);
          }}
          render={({ values, handleChange, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <FormControl>
                <InputLabel>タイムラインを送信する</InputLabel>
                <Input
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
  timelines: selectors.timelines(state)
});

const mapDispatchToProps = dispatch => ({
  fetchTimelines: () => dispatch(actions.fetchTimelinesRequest()),
  postTimeline: form => dispatch(actions.postTimelineRequest(form))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Timeline);
