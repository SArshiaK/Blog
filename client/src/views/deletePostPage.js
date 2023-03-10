import React from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";

require('dotenv').config();
const PORT = process.env.PORT || 8000;

function DeletePost(props) {
  const [formData, setFormData] = React.useState({
    PostID: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .delete(`https://localhost:${PORT}/posts/${formData.PostID}`)
      .then((res) => {console.log(res.data.message)
        props.history.push("/posts");})
      .catch((err) => {
        console.log(err);
        if(err.message === 'Request failed with status code 400'){
          alert('Please log in first.');
          props.history.push('/');
        }
      });
    
  };

  return (
    <Container>
      <h1 className="mb-4">Delete Post</h1>
      <Form>
        <Form.Group controlId="name">
          <Form.Label><p className="postID">PostID</p></Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter post's ID"
            value={formData.PostID}
            onChange={(e) =>
              setFormData({ ...formData, PostID: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group className="text-center">
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
}

export default DeletePost;
