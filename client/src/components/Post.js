import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import ReadMoreReact from "read-more-react";

function Post(props) {
  const min = 250;
  const ideal = 500;
  const max = 1000;

  return (
    <Card style={{ maxWidth: "500px" }} className="mx-auto mb-2">
      <Card.Body>
        <Card.Title>{props.post.title}</Card.Title>
        <Card.Text>
          <ReadMoreReact
            text={props.post.body}
            min={min}
            ideal={ideal}
            max={max}
            readMoreText="...read more"
          />
        </Card.Text>
        <Link to={`/post/${props.post._id}`}>
          <Button variant="primary">See Post</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

export default Post;
