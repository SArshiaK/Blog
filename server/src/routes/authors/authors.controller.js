const authorModel = require('../../models/author.model');

async function httpGetAllAuthors(req, res){
    res.status(200).json(await authorModel.getAllAuthors());
}

async function httpCreateAuthor(req, res){
    const newAuthor = req.body;
    
    if (!newAuthor.firstName || !newAuthor.lastName || !newAuthor.gmail || !newAuthor.age){
        return res.status(400).json({
            error: 'Missing required property',});
    };

    await authorModel.createAuthor(newAuthor);
    res.status(201).json(newAuthor);
}

async function httpDeleteAuthor(req, res){
    const authorid = Number(req.params.id);
    
    const author = await authorModel.findAuthorByID(authorid);

    if(!author){
        return res.status(404).json({error: "author not found!"});
    };
    if(author.deleted === true){
        return res.status(400).json({error: "The author has already been deleted!"})
    }

    const deleted = await authorModel.deleteAthor(authorid);

    if(!deleted){
        return res.status(400).json({erro: "Couldn't delete the author."})
    }

    return res.status(200).json({status: "The author deleted successfully."})
}

async function httpUpdateAuthor(req, res){
    const authorid = Number(req.params.id);
    
    const changes = req.body;
    const msg = await authorModel.updateAuthor(changes, authorid);
    if(msg === 'Author Not Found!'){
        return res.status(404).json({error: msg});
    }
    else if(msg === "Author didn't modify!")
    {
        return res.status(400).json({error: msg});
    }
    const updatedAuthor = await authorModel.findAuthorByID(authorid);
    return res.status(200).json(updatedAuthor);
}

module.exports = {
    httpGetAllAuthors,
    httpCreateAuthor,
    httpDeleteAuthor,
    httpUpdateAuthor
}