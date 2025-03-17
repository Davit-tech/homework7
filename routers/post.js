import express from "express";
import postController from "../controllers/postControllers.js";
import auth from "../middlewares/auth.js";
import schemas from "../schemas/posts.js";

import validatePost from "../middlewares/validation.js";

const router = express.Router();


// ===== GET Routes =====
// Render the page for creating a new post
router.get("/createPost", postController.getCreatePostView);

// Get data required for creating a post (authentication required)
router.get("/createPost/data", auth, postController.getCreatePostData);

// Render the page that displays all posts
router.get("/posts", postController.getPostsView);

// Get all posts data (authentication required)
router.get("/posts/data", auth, postController.getPostsData);

// Get post data for editing by post ID (authentication required)
router.get("/posts/:id/edit/data", auth, postController.editPost);

// Render the edit post page by post ID
router.get("/posts/:id/edit", postController.getEditPost);


// ===== POST Routes =====
// Create a new post (authentication required)
router.post("/createPost/data", validatePost(schemas.createPost, "body"), auth, postController.createPostData);


// ===== PUT Routes =====
// Update  a post by ID (authentication required)
router.put("/posts/:id/edit/data", auth, postController.editPost);


// ===== DELETE Routes =====
// Delete a specific post by ID (authentication required)
router.delete("/posts/:id", auth, postController.deletePost);


export default router;
