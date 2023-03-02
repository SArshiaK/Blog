import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <div className="Navigation mb-4">
      <Navbar bg="light">
        <Nav className="mx-auto">
          <Nav.Item className="mr-5">
            <Link to="/">Home</Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/create">Create Post </Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/delete" style={{ marginLeft: '2.4rem' }}>Delete Post</Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/author" style={{ marginLeft: '2.4rem' }}>Author's Posts</Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/update" style={{ marginLeft: '2.4rem' }}>Update Post</Link>
          </Nav.Item>
        </Nav>
      </Navbar>
    </div>
  );
}

export default Navigation;
