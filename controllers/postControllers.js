
import createError from "http-errors";
import Posts from "../models/postsTable.js";


const title = "createPOst";
export default {
    getPostsView: async (req, res) => {
        const title = "Posts";

        res.render("posts/posts", {
            title,
        });
    },

    getPostsData: async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 5;
            const offset = (page - 1) * limit;

            const totalPosts = await Posts.countPosts();
            const totalPages = Math.ceil(totalPosts / limit);

            const posts = await Posts.findPaginatedPosts(offset, limit);


            res.json({
                posts,
                totalPages,
                currentPage: page,
            });
        } catch (error) {
            console.error("Error fetching posts data:", error);
            res.status(500).json({message: "Error fetching posts data"});
        }
    }
    ,
    getCreatePostView: (req, res) => {
        res.render("posts/createPost", {title});
    },
    getCreatePostData: async (req, res) => {
        res.json({message: "Post creation is available"});
    },
    createPostData: async (req, res, next) => {
        const {title, author, text, date} = req.body;
        const id = req.userId;

        try {
            await Posts.createPosts(title, author, text, date, id);
            const posts = await Posts.findPaginatedPosts(0, 5);
            res.json({
                success: true,
                message: "Post successfully created",
                posts,
            });
        } catch (error) {
            console.error("Error saving post:", error);
            return next(createError(500, "Error saving post"));
        }
    },
    getEditPost: async (req, res, next) => {
        const {id} = req.params;

        try {
            const post = await Posts.findById(id);

            if (!post) {
                return next(createError(404, "Post not found"));
            }

            res.render("posts/editPost", {post, title: "Edit Post"});
        } catch (error) {
            console.error("Error fetching post:", error);
            return next(createError(500, "Error fetching post"));
        }
    }
    ,
    editPost: async (req, res, next) => {
        const {id} = req.params;
        const {title, author, text, date} = req.body;

        const post = await Posts.findById(id);
        if (!post) {
            return next(createError(404, "Post not found"));
        }


        try {
            await Posts.editPostById(id, title, author, text, date);


            res.json({
                message: "Post updated successfully",

            });
        } catch (error) {
            console.error("Error saving the post:", error);
            return next(createError(500, "Error saving the post"));
        }
    },
    deletePost: async (req, res, next) => {
        const {id} = req.params;

        try {

            const post = await Posts.findById(id);

            if (!post) {
                return res.status(404).json({message: "Post not found"});
            }


            await Posts.deletePostById(id);

            res.status(204).send();
        } catch (error) {
            return next(createError(500, "Error deleting post"));
        }
    },

};
