const express = require("express");
const router = express.Router();
const POst = require("../models/Post");
const Post = require("../models/Post");

// Requesting endpoints
router.get("/", async (req, res) => {
    try {
        const locals = {
            title: "EJS Tutorial",
            description: "EJS Tutorial using node, express and mongodb"
        }
        //Setting pagination
        let perPage = 3;
        let page = req.query.page || 1;
        const data = await Post.aggregate([ { $sort: { createdAt: -1 } }])
        .skip(perPage * page - perPage)
        .limit(perPage)
        .exec();

        const count = await Post.countDocuments();
        const nextPage = parseInt(page) + 1;
        const hasNextPage = nextPage <= Math.ceil(count / perPage);


        //const data = await Post.find();
        res.render("index", {
            locals,
            data,
            current: page,
            nextPage: hasNextPage ? nextPage : null
        });
    
    } catch (error) {
        console.log(error);
    }
});

// DB Data inserted
// function insertPostData() {
//    Post.insertMany([
//        {
//        title: "Python Flask tutorial",
//        body: "How to make a blog post with python flask"
//        },
//        {
//        title: "Django tutorial",
//        body: "Build powerfull web-applications with Django"
//        },
//        {
//        title: "How to install Redis",
//        body: "Installing redis and using it for Caching"
//        }
//    ]);
// }
// insertPostData();

router.get("/post/:id", async (req, res) => {
    try {
        let postId = req.params.id;
        let data = await Post.findById({ _id: postId});

        const locals = {
            title: data.title,
            description: "Simple blog post with NodeJs, Express & MongoDB"
        }

        res.render("post", { locals, data} );
        } catch (error) {
            console.log(error);
    }
});



router.get("/about", (req, res) => {
    res.render("about");
});

router.get("/contact", (req, res) => {
    res.render("contact");
});

module.exports = router;