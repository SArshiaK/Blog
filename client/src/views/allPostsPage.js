import React, { useState, useEffect } from "react";
import "./HomePage.css";

require('dotenv').config();
const PORT = process.env.PORT || 8000;

function AllPosts(props) {
  const [data,setData]=useState([]);
console.log(PORT);
  const getData=()=>{
    fetch(`https://localhost:${PORT}/posts`
    ,{
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    }
    )
      .then(function(response){
        console.log(response);
        return response.json();
      })
      .then(function(myJson) {
        console.log(myJson);
        setData(myJson);
        if(myJson['error'] === 'Please log in first'){
          alert(myJson['error']);
          props.history.push('/');
        }
      })
  }
  useEffect(()=>{
    getData()
  },[])

  
  return (
    <div className="App"><h2 className="pageTitle">All Posts:</h2> <br></br>
     {
       data && data.length>0 && data.map((item)=>
       <p className="allPosts">
         
        <p className="title" >{item['title']}</p><br></br>
        {item['content']}<br></br>
       {item['author']['firstName']}<br></br>
       {item['publishedDate']}<br></br>
       postid: {item['postID']}<br></br>
       <div className="comments">
         <p className="commentTitle">comments:</p><br></br>
          {item['comments'].map((comment)=>
         <p className="comment">{comment['content']}<br></br></p>
         )}
        </div>
       </p>)
       
     }
    </div>
    
  );
}

export default AllPosts