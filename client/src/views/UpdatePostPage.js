import React from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";

require('dotenv').config();
const PORT = process.env.PORT || 8000;

function UpdatePost(props) {
  const [formData, setFormData] = React.useState({
    title: "",
    content: "",
    postID: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .patch(`https://localhost:${PORT}/posts/${formData.postID}`, {
        title: formData.title,
        content: formData.content,
      })
      .then((res) => {console.log(res.data.message)
        props.history.push("/posts");})
      .catch((err) => {
        if(err.message === 'Request failed with status code 400'){
          alert('Please log in first.');
          props.history.push('/');
        }
        console.log(err);
      });
    
  };

  return (
    <Container>
      <h1 className="mb-4">Update Post</h1>
      <Form>
        <Form.Group controlId="title">
          <Form.Label><p className="titleTexts">Title</p></Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter post title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </Form.Group>
        <Form.Group controlId="content">
          <Form.Label><p className="titleTexts">Content</p></Form.Label>
          <Form.Control
            as="textarea"
            rows="3"
            placeholder="Enter post content"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          />
        </Form.Group>
        <Form.Group controlId="postID">
          <Form.Label><p className="titleTexts">Post ID</p></Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter posts's ID"
            value={formData.postID}
            onChange={(e) =>
              setFormData({ ...formData, postID: e.target.value })
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

export default UpdatePost;
