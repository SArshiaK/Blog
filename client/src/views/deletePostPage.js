import React from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";

function CreatePost(props) {
  const [formData, setFormData] = React.useState({
    PostID: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .delete(`https://localhost:8000/posts/${formData.PostID}`)
      .then((res) => console.log(res.data.message))
      .catch((err) => console.log(err));
    props.history.push("/");
  };

  return (
    <Container>
      <h1 className="mb-4">Delete Post</h1>
      <Form>
        <Form.Group controlId="name">
          <Form.Label>PostID</Form.Label>
          <Form.Control
            type="text"
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

export default CreatePost;
