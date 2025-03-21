import _ from "lodash";
import db from "../clients/db.mysql.js";
import createError from "http-errors";

export default {

    async createPosts(title, author, text, date, user_id, next) {
        try {
            const [raws] = await db.query(`
                INSERT INTO posts(title, author, text, date, user_id)
                VALUES (?, ?, ?, ?, ?)
            `, [title, author, text, date, user_id]);
            return raws;
        } catch (err) {
            return next(createError(500, `Database error: Failed to create post${err.message}`));
        }

    },

    async findById(post_id, next) {
        try {
            const [rows] = await db.query("SELECT * FROM posts WHERE id = ?", [post_id]);
            // return rows.length > 0 ? rows[0] : null;
            return _.head(rows) || null;
        } catch (error) {
            return next(createError(500, `Server error. Please try again later.${error.message}`));
        }
    },
    async deletePostById(id, next) {
        try {
            const [rows] = await db.query("DELETE FROM posts WHERE id = ?", [id]);
            return rows;
        } catch (error) {
            return next(createError(500, `Server error. Please try again later.${error.message}`));
        }
    },
    async editPostById(post_id, title, author, text, date, next) {
        try {
            const [result] = await db.query(`
                UPDATE posts
                SET title  = ?,
                    author = ?,
                    text   = ?,
                    date   = ?
                WHERE id = ?
            `, [title, author, text, date, post_id]);

            if (result.affectedRows === 0) {
                return next(createError(404, "Post not found"));
            }

            return {success: true, message: "Post updated successfully"};
        } catch (error) {
            return next(createError(500, `Server error. Please try again later :${error.message}`));


        }
    }, async countPosts(next) {
        try {
            const [rows] = await db.query("SELECT COUNT(*) AS count FROM posts");
            // return rows[0].count;
            return _.get(_.head(rows), 'count', null);
        } catch (error) {
            return next(createError(500, `Error counting posts: ${error.message}`));
        }
    },

    async findPaginatedPosts(offset, limit, next) {
        try {
            const [rows] = await db.query(
                "SELECT * FROM posts ORDER BY date DESC LIMIT ? OFFSET ?",
                [limit, offset]
            );
            return rows;
        } catch (error) {
            return next(createError(500, `Error fetching paginated posts:${error.message}`));
        }
    },


};