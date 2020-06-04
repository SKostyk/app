import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Link from "react-router-dom/Link";

// MUI Staff
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const styles = {
  card: {
    display: "flex",
    marginBottom: 20,
  },
  content: {
    padding: 25,
  },
};

class Post extends Component {
  render() {
    const {
      classes,
      post: { title, content, author },
    } = this.props;
    return (
      <Card className={classes.card}>
        <CardContent className={classes.content}>
          <Typography variant="h5">{title}</Typography>
          <Typography variant="body2" color="textSecondary">
            {content}
          </Typography>
          <Typography
            variant="body1"
            component={Link}
            to={`/users/${author}`}
            color="primary"
          >
            {author}
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(Post);
