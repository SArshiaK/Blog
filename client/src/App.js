import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./views/HomePage";
import CreatePostPage from "./views/CreatePostPage";
import SinglePostPage from "./views/authorPosts";
import deletePost from "./views/deletePost";
import deletePostPage from "./views/deletePostPage"
import authorPostsPage from "./views/authorPostsPage";
import UpdatePost from "./views/UpdatePostPage";
import AllPosts from "./views/allPostsPage";
import Navigation from "./components/Navigation";

function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/create" component={CreatePostPage} />
          <Route path="/delete/:id" component={deletePost} />
          <Route path="/delete" component={deletePostPage} />
          <Route path="/author/:id" component={SinglePostPage} />
          <Route path="/author" component={authorPostsPage} />
          <Route path="/update" component={UpdatePost} />
          <Route path="/posts" component={AllPosts} />




        </Switch>
      </Router>
    </div>
  );
}

export default App;
