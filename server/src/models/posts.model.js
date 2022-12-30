const postsDatabase = require('./posts.mongo');

DEFAULT_POST_ID = 1;

async function findPostByID(postid){
    return await postsDatabase.findOne({postID: postid});
}

async function getLastPostID(){
    const lastPost =  await postsDatabase.findOne({}).sort({postID: -1});
    if(!lastPost){
        return DEFAULT_POST_ID;
    }
    return lastPost.postID;
}

async function getAllPosts(){
    return await postsDatabase.find({}).sort({postID: -1});
}

async function addPost(post){
    await postsDatabase.findOneAndUpdate({postID: post.postID},post,{
        upsert: true,
    });
}

async function creatNewPost(post){
    const lastPostID = await getLastPostID();
    const newPost = Object.assign(post, {
        postID: Number(lastPostID + 1),
        deleted: false
    });

    await addPost(newPost);
};

async function updatePost(changedPost, postid){
    await postsDatabase.updateOne({postID: postid}, changedPost);
}

async function deletePost(postid){
    await postsDatabase.updateOne({postID: postid}, {
        deleted: true,
    });
    // const postToDelete = await postsDatabase.updateOne({postID: postid}, {
    //     deleted: true
    // });
    // if(!postToDelete){
    //     return false;
    // };
    // return true;
};

module.exports = {
    findPostByID,
    getAllPosts,
    creatNewPost,
    updatePost,
    deletePost
}