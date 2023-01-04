const authorDatabase = require('./author.mongo');
const postsDatabase = require('./posts.mongo');
const commentsDataBase = require('./comments.mongo');

const DEFAULT_AUTHOR_ID = 1;

async function getAuthorID(){
    // const lastAuthor = await authorDatabase.find({authorID: -1});
    const lastAuthor = await authorDatabase.findOne().sort('-authorID');
    if(!lastAuthor){
        return DEFAULT_AUTHOR_ID;
    }
    return lastAuthor.authorID + 1;
};

async function findAuthorByID(authorid){
    return await authorDatabase.findOne({authorID: authorid});
};

async function getAllAuthors(){
    return await authorDatabase.find({})
    .populate({
        path: 'posts', 
        model: 'posts',
        select: {postID:1, title: 1, deleted:1, _id:0},
    })
    .populate(
        'comments', 
        {_id: 0, commentID:1, content:1, deleted:1})
    .select({
        _id:0,
        __v:0
    });
}

async function addAuthor(author){
    await authorDatabase.findOneAndUpdate({
        authorID: author.authorID,
    },
    author,{
        upsert: true,
    });
};

async function createAuthor(author){
    const date = new Date().toLocaleString('fa-IR');;
    const authorID = await getAuthorID();
    const newAuthor = Object.assign(author, {
        authorID: authorID,
        deleted: false,
        joinedDate: date,
    });

    await addAuthor(newAuthor);
};

async function deleteAthor(authorid){
   const authorToDelete = await authorDatabase.updateOne({authorID: authorid},
    {
        deleted: true,
    });
    if(!authorToDelete){
        return false;
    };

    const author = await authorDatabase.findOne({authorID: authorid})
        .populate('comments', {_id: 0, commentID:1})
        .populate('posts', {_id: 0, postID:1});
    
    const posts = author.posts;
    const comments = author.comments;

    posts.forEach(async post => {
        await postsDatabase.updateOne({postID: post.postID}, {
            deleted: true,
        });
    });
    comments.forEach(async comment => {
        await commentsDataBase.updateOne({commentID: comment.commentID}, {
            deleted: true,
        });
    });

    return true;
};

async function updateAuthor(updatedAuthor, authorid){
    await authorDatabase.updateOne({authorID: authorid},updatedAuthor);
}

module.exports = {
    findAuthorByID,
    getAllAuthors,
    createAuthor,
    deleteAthor,
    updateAuthor
}
