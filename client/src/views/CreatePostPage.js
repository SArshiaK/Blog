import React from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";

require('dotenv').config();
const PORT = process.env.PORT || 8000;

function CreatePost(props) {
  const [formData, setFormData] = React.useState({
    title: "",
    body: "",
    authorID: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(`https://localhost:${PORT}/posts`, {
        title: formData.title,
        content: formData.body,
        authorID: formData.authorID,
      })
      .then((res) => console.log(res.data.message))
      .catch((err) => {
        alert(err)
        console.log(err)
      });
    props.history.push("/posts");
  };

  return (
    <Container>
      <h1 className="mb-4">Create Post</h1>
      <Form>
        <Form.Group controlId="title">
          <Form.Label><p className="titleTexts">Title</p></Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter post title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group controlId="body">
          <Form.Label><p className="titleTexts">Post text</p></Form.Label>
          <Form.Control
            as="textarea"
            rows="3"
            placeholder="Enter post text"
            value={formData.body}
            onChange={(e) => setFormData({ ...formData, body: e.target.value })}
          />
        </Form.Group>
        <Form.Group controlId="name">
          <Form.Label><p className="titleTexts">AuthorID</p></Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter author's ID"
            value={formData.authorID}
            onChange={(e) =>
              setFormData({ ...formData, authorID: e.target.value })
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

export default CreatePost;
