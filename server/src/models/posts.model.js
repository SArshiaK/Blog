const postsDatabase = require('./posts.mongo');
const authorDatabase = require('./author.mongo')
const commentsDataBase = require('./comments.mongo');

DEFAULT_POST_ID = 1;

async function findPostByID(postid){
    return await postsDatabase.findOne({postID: postid});
}

async function getPostID(){
    const lastPost = await postsDatabase.findOne({}).sort({postID: -1});
    if(!lastPost){
        return DEFAULT_POST_ID;
    }
    return lastPost.postID + 1;
}

async function getAllPosts(){
    return await postsDatabase.find({}).sort({postID: -1}).populate('comments', {content: 1,deleted: 1, _id: 0}).populate('author', {
        firstName:1,
        lastName:1,
        gmail:1,
        authorID:1,
        _id:0
    }).select({
        _id:0,
        __v:0,
        authorID:0
    });
}

async function getPostsByAuthor(authorid){
    const authorExist = await authorDatabase.findOne({authorID: authorid});
    if(!authorExist){
        return false;
    }

    return await postsDatabase.find({authorID: authorid}).sort({postID: -1})
    .populate('comments', {content: 1,deleted: 1, _id: 0})
    .populate('author', {
        firstName:1,
        lastName:1,
        gmail:1,
        authorID:1,
        _id:0
    }).select({
        _id:0,
        __v:0,
        authorID:0
    });
}

async function addPost(post){
    await postsDatabase.findOneAndUpdate({postID: post.postID},post,{
        upsert: true,
    });

    // Add Post to Author
    const addedPost = await postsDatabase.findOne({postID: post.postID});
    const author = await authorDatabase.findOne({authorID: post.authorID});
    author.posts.push(addedPost._id);
    await authorDatabase.updateOne({authorID: post.authorID}, author)
}

async function creatNewPost(post){
    const lastPostID = await getPostID();
    const author = await authorDatabase.findOne({authorID: post.authorID});
    if(!author){
        return false;
    }
    const date = new Date().toLocaleString('fa-IR')
    const newPost = Object.assign(post, {
        postID: Number(lastPostID),
        publishedDate: date,
        author: author._id,
        deleted: false
    });

    await addPost(newPost);
};

async function updatePost(changedPost, postid){
    await postsDatabase.updateOne({postID: postid}, changedPost);
}

async function deletePost(postid){
    const post = await postsDatabase.findOne({postID: postid}).populate({
        path: 'comments',
        model: 'comments',
        select: {_id:1, commentID:1, authorID:1},
    });
    // Delete post from author posts
    await authorDatabase.findOneAndUpdate(
        { authorID: post.authorID },
        {
            $pull: { posts: post._id },
        },
        { new: true }
    );

    const comments = post.comments;
    // Delete comment from author's comments
    comments.forEach(async comment => {
        await authorDatabase.findOneAndUpdate(
            { authorID: comment.authorID},
            {
                $pull: {comments: comment._id},
            },
            { new: true },
        )
        })    
    // Delete post's comments
    comments.forEach(async comment => {
        await commentsDataBase.deleteOne({commentID: comment.commentID})
    })
    await postsDatabase.deleteOne({postID: postid});
};

module.exports = {
    findPostByID,
    getPostsByAuthor,
    getAllPosts,
    creatNewPost,
    updatePost,
    deletePost
}