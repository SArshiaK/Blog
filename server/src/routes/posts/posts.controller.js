const postModel = require('../../models/posts.model');

async function httpGetAllPosts(req, res){
    const posts = await postModel.getAllPosts();
    res.status(200).json(posts);
};

async function httpGetPostsByAuthor(req, res){
    const authorid = req.params.id;
    const posts = await postModel.getPostsByAuthor(authorid);
    if(posts === false){
        return res.status(404).json({error: 'Author Not Found'});
    }
    return res.status(200).json({authorPosts: posts});
}

async function httpCreatePost(req, res){
    const newPost = req.body;
    if (!newPost.title || !newPost.content || !newPost.authorID){
        return res.status(400).json({
            error: 'Missing required property',});
    };

    const succeed = await postModel.creatNewPost(newPost);
    if(succeed === false){
        return res.status(404).json({error: "Author Not Found"});
    }
    return res.status(201).json(newPost);
}

async function httpUpdatePost(req, res){
    const postid = Number(req.params.id);

    const postToUpdate = await postModel.findPostByID(postid);
    if(!postToUpdate){
        return res.status(404).json({erro: 'Post Not Found'});
    }

    const changes = req.body;
    await postModel.updatePost(changes, postid);

    const updatedPost = await postModel.findPostByID(postid);
    res.status(200).json(updatedPost);
}

async function httpDeletePost(req, res){
    const postid = Number(req.params.id);

    const postToDelete = await postModel.findPostByID(postid);
    if(!postToDelete){
        return res.status(404).json({error: 'Post Not Found'});
    };

    await postModel.deletePost(postid);
    return res.status(200).json({status: "Post deleted successfully."});
};

module.exports = {
    httpGetAllPosts,
    httpGetPostsByAuthor,
    httpCreatePost,
    httpUpdatePost,
    httpDeletePost
}