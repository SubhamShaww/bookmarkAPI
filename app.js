const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const {Schema} = mongoose;

const port = 3000 || process.env.port;
const app = express();

app.set('view engine', 'ejs');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

app.use(express.static("public"));

mongoose.connect('mongodb://localhost:27017/bookmarkDB', {useNewUrlParser: true, useUnifiedTopology: true});

//       ******** SCHEMA **********
//tag schema
const tagSchema = new Schema({
    title: {type: String, required: true, unique: true},
    timeCreated: Number, // in epoch time
    timeUpdated: Number // in epoch time
});

//bookmark schema
const bookmarkSchema = new Schema({
    link: {type: String, required: true, unique: true},
    title: String,
    timeCreated: Number, // in epoch time
    timeUpdated: Number, // in epoch time
    publisher: String,
    tags: [tagSchema]
});

//       *********** MODEL *********

const Tag = mongoose.model("Tag", tagSchema);

const Bookmark = mongoose.model("Bookmark", bookmarkSchema);

// using REST API architecture
//        ********** ENDPOINTS **********

// FOR GENERAL ENDPOINT

// for bookmarks
app.route("/bookmarks")

.get((req, res) => {
    // retrieve all bookmarks
    Bookmark.find((err, foundBookmarks) => {
        if(!err) {
            res.send(foundBookmarks);
        } else {
            res.send(err);
        }
    });
})

.post((req, res) => {
    // create a bookmark
    const newBookmark = new Bookmark({
        link: req.body.link,
        title: req.body.title,
        timeCreated: req.body.timeCreated,
        timeUpdated: req.body.timeUpdated,
        publisher: req.body.publisher,
        tags: req.body.tags
    });

    newBookmark.save((err) => {
        if(!err){
            res.send("Successfully added a bookmark.");
        }else{
            res.send(err);
        }
    });
});


// for tags
app.route("/bookmarks/tags")

.get((req, res) => {
    // retrieve all tags
    Tag.find((err, foundTags) => {
        if(!err) {
            res.send(foundTags);
        } else {
            res.send(err);
        }
    });
})

.post((req, res) => {
    // create a tag
    const newTag = new Tag({
        title: req.body.title,
        timeCreated: req.body.timeCreated,
        timeUpdated: req.body.timeUpdated
    });

    newTag.save((err) => {
        if(!err){
            res.send("successfully added a tag.");
        }else{
            res.send(err);
        }
    });
});


// FOR SPECIFIC ENDPOINT

// for specific bookmarks
app.route("/bookmarks/:bookmarkTitle")
.delete((req, res) => {
    // delete a specific bookmark
    const bookmarkTitle = req.params.bookmarkTitle;

    Bookmark.deleteOne({title: bookmarkTitle}, (err) => {
        if(!err) {
            res.send("Successfully deleted requested bookmark.");
        } else {
            res.send(err);
        }
    });
});


// for specific tags
app.route("/bookmarks/tags/:tagTitle")
.delete((req, res) => {
    // delete a specific tag
    const tagTitle = req.params.tagTitle;

    Tag.deleteOne({title: tagTitle}, (err) => {
        if(!err) {
            res.send("Successfully deleted requested tag.");
        } else {
            res.send(err);
        }
    });
});

// add or delete tag from specified bookmark
app.route("/bookmarks/:bookmarkTitle/:operation")
.patch((req, res) => {
    const bookmarkTitle = req.params.bookmarkTitle;
    const operation = req.params.operation; // add or delete
    let change;

    if(operation == "delete") {
        change = { $set: { $pull: { tags: req.body.tag } } }
    } else if(operation == "add") {
        change = { $set: { $push: { tags: req.body.tag } } }
    }

    Bookmark.updateOne(
        {title: req.params.bookmarkTitle},
        change,
        function(err){
            if(!err){
                res.send("Article updated successfully.");
            }else{
                res.send(err);
            }
        }
    );
});


app.listen(port, function() {
    console.log(`Server started at port ${port}`);
});