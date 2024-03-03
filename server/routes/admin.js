const express = require("express");
const router = express.Router();
// const POst = require("../models/Post");
const Post = require("../models/Post");

const adminLayout = "../views/layouts/admin";

/**
 * GET /
 * Admin - Login Page
 */

router.get('/admin', async (req, res) => {
  const locals = {
    title: "Admin",
    description: "Simple Blog created with NodeJs, Express & MongoDb."
  }

  try {
    const locals = {
      title: "Admin",
      description: "Simple Blog created with NodeJs, Express & MongoDb."
    }

    //const data = await Post.find();
    res.render('admin/index', { locals, layout: adminLayout });
  } catch (error) {
    console.log(error);
  }

});

module.exports = router;
