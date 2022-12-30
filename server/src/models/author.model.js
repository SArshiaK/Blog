const authorDatabase = require('./author.mongo');

const DEFAULT_AUTHOR_ID = 1;

async function getLastAuthorID(){
    // const lastAuthor = await authorDatabase.find({authorID: -1});
    const lastAuthor = await authorDatabase.findOne().sort('-authorID');
    if(!lastAuthor){
        return DEFAULT_AUTHOR_ID;
    }
    return lastAuthor.authorID;
};

async function findAuthorByID(authorid){
    return await authorDatabase.findOne({authorID: authorid});
};

async function addAuthor(author){
    await authorDatabase.findOneAndUpdate({
        authorID: author.authorID,
    },
    author,{
        upsert: true,
    });
};

async function createAuthor(author){
    const lastAuthorID = await getLastAuthorID();
    const newAuthor = Object.assign(author, {
        authorID: lastAuthorID + 1,
        deleted: false,
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
    return true;
};

async function updateAuthor(updatedAuthor, authorid){
    await authorDatabase.updateOne({authorID: authorid},updatedAuthor);
}

module.exports = {
    findAuthorByID,
    createAuthor,
    deleteAthor,
    updateAuthor
}
