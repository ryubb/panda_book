import React from "react";
import { connect } from "react-redux";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";
import { actions } from "../redux/Timeline";

class Timeline extends React.Component {
  componentDidMount() {
    this.props.fetchTimelines();
  }

  render() {
    const { timelines } = this.props;
    console.log(timelines);

    return (
      <List>
        {timelines &&
          timelines.map(timeline => (
            <ListItem key={timeline._id}>
              <ListItemAvatar>
                <Avatar>
                  <ImageIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={timeline.content} />
            </ListItem>
          ))}
      </List>
    );
  }
}

const mapStateToProps = state => ({
  timelines: state.timeline.timelines
});

const mapDispatchToProps = dispatch => ({
  fetchTimelines: () => dispatch(actions.fetchTimelinesRequest())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Timeline);
