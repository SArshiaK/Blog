import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";
import "./HomePage.css";

require("dotenv").config();
const PORT = process.env.PORT || 8000;

function HomePage() {
  const history = useHistory();
  const login = () =>{ 
    let path = '/auth/google'; 
    history.push(path);
  }
  const logout = () =>{ 
    let path = '/auth/logout'; 
    history.push(path);
  }

    const [data, setData] = useState([]);
    console.log(PORT);
    const getData = () => {
        fetch(`https://localhost:${PORT}/posts`, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        })
            .then(function (response) {
                console.log(response);
                return response.json();
            })
            .then(function (myJson) {
                console.log(myJson);
                setData(myJson);
            });
    };
    useEffect(() => {
        getData();
    }, []);

    return (
        <Container>
            <h1 className="mb-4">Home</h1>
            <Form>
                <Form.Group className="text-center">
                    <Button variant="primary" type="submit" className="btnLogIN" onClick={login}>
                        Login
                    </Button> 
                    <p className="space"> </p>
                    <Button variant="primary" type="submit" className="btnSignOut"  onClick={logout}>
                        Logout
                    </Button>
                </Form.Group>
            </Form>
        </Container>
    );
}

export default HomePage;