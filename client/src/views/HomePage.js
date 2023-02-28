import React, { useState, useEffect } from "react";
import "./HomePage.css";

function HomePage() {
  const [data,setData]=useState([]);
  const getData=()=>{
    fetch('https://localhost:8000/posts'
    ,{
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    }
    )
      .then(function(response){
        console.log(response)
        return response.json();
      })
      .then(function(myJson) {
        console.log(myJson);
        setData(myJson)
      });
  }
  useEffect(()=>{
    getData()
  },[])
  return (
    <div className="App"><h2>All Posts:</h2> <br></br>
     {
       data && data.length>0 && data.map((item)=><p>{item['content']}<br></br>
       {item['author']['firstName']}<br></br>
       {item['publishedDate']}<br></br>
       postid: {item['postID']}<br></br>
       </p>)
     }
    </div>
  );
}

export default HomePage