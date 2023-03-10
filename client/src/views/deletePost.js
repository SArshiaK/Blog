import React from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";

require('dotenv').config();
const PORT = process.env.PORT || 8000;

function CreatePost(props) {

  const postID = props.match.params.id;
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .delete(`https://localhost:${PORT}/posts/${postID}`)
      .then((res) => console.log(res.data.message))
      .catch((err) => {
        console.log(err);
        alert(err);
      });
    props.history.push("/");
  };

  return (
    <Container>
      <h3 className="mb-4">Are you sure you want to delete post with id: {postID} ?</h3>
      <Form>
        <Form.Group className="text-center">
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Delete
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
}

export default CreatePost;
