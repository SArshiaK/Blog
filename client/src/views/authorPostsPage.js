import React from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";

function PostsByAuthor(props) {
  const [formData, setFormData] = React.useState({
    AuthorID: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
        props.history.push(`/author/${formData.AuthorID}`);
  };

  return (
    <Container>
      <h1 className="mb-4">Find author's posts</h1>
      <Form>
        <Form.Group controlId="name">
          <Form.Label><p className="authorID">AuthorID:</p></Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter author's ID"
            value={formData.AuthorID}
            onChange={(e) =>
              setFormData({ ...formData, AuthorID: e.target.value })
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

export default PostsByAuthor;
