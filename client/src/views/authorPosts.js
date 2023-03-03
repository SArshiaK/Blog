import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";

require('dotenv').config();
const PORT = process.env.PORT || 8000;

function SingleauthorPage(props) {
  const [data, setAuthor] = useState({});

  const authorID = props.match.params.id;
  useEffect(() => {
    axios
      .get(`https://localhost:${PORT}/authors/${authorID}/posts`,{
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
         }
      })
      .then((response) => setAuthor(response.data.authorPosts))
      .then(function(response){
        console.log(response)
        return response.json();
      })
      .then(function(myJson) {
        console.log(myJson);
        alert(myJson['error']);
        setAuthor(myJson);
        props.history.push('/');
      })
      .catch((error) => {
        console.log(error);
        if(error.message === 'Request failed with status code 404'){
          alert(error);
          props.history.push("/author");
        }
        else if(error.message === 'Request failed with status code 400'){
          alert('Please log in first.');
          props.history.push('/');
        }
      });
  }, [authorID], [history.props]);

  return (
    <Container>
      <div className="App"><h2 className="pageTitle">All posts from author with id: {authorID}</h2> <br></br><br></br>
     {
       data && data.length>0 && data.map((item)=><p className="allPosts">
         {item['title']}<br></br>
         {item['content']}<br></br>
       {item['author']['firstName']}<br></br>
       {item['publishedDate']}<br></br>
       {item['postID']}<br></br>

       </p>)
     }
    </div>
    </Container>
  );
}

export default SingleauthorPage;