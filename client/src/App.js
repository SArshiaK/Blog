import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./views/HomePage";
import CreatePostPage from "./views/CreatePostPage";
import SinglePostPage from "./views/authorPosts";
import Navigation from "./components/Navigation";

function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/author/:id" component={SinglePostPage} />
          <Route path="/create" component={CreatePostPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
