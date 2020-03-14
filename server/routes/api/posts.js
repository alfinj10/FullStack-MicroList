const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

//get posts

router.get('/', async (req,res) => {
    const posts = await loadPostCollection();
    res.send(await posts.find({}).toArray());

})

//Add post

router.post('/', async (req,res) => {
    const posts = await loadPostCollection();
    await posts.insertOne({
        text: req.body.text,
        createdAt: new Date()
    });

    res.status(201).send();
})

//Delete post 

router.delete('/:id', async (req,res) => {
    const posts = await loadPostCollection();
    await posts.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
    res.status(200).send();

})

async function loadPostCollection() {

    connectionString = 'mongodb+srv://abc123:admin@vueexpress1-whjde.mongodb.net/test?retryWrites=true&w=majority'

    const client = await mongodb.MongoClient.connect(connectionString,{
        useNewUrlParser: true
    });

    return client.db('vueExpress1').collection('posts');
    
}



module.exports = router;