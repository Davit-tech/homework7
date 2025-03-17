import db from "../clients/db.mysql.js"

export default {

    async createPosts(title, author, text, date, user_id) {
        try {
            const [raws] = await db.query(`
                INSERT INTO posts(title, author, text, date, user_id)
                VALUES (?, ?, ?, ?, ?)
            `, [title, author, text, date, user_id]);
            console.log("All oc created posts")
            return raws;
        } catch (err) {
            console.log(err);
        }

    },

    async findById(post_id) {
        try {
            const [rows] = await db.query("SELECT * FROM posts WHERE id = ?", [post_id]);
            return rows.length > 0 ? rows[0] : null;
        } catch (error) {
            console.error("Error in findById:", error);
            return null;
        }
    }
    ,
    async deletePostById(id) {
        try {
            const [rows] = await db.query("DELETE FROM posts WHERE id = ?", [id]);
            console.log(rows)
            return rows;
        } catch (error) {
            throw new Error("Error deleting post");
        }
    },
    async editPostById(post_id, title, author, text, date) {
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
                throw new Error("Post not found or not updated");
            }

            return {success: true, message: "Post updated successfully"};
        } catch (error) {
            console.error("Error updating post:", error);
            throw new Error("Error updating post");
        }
    }, async countPosts() {
        try {
            const [rows] = await db.query("SELECT COUNT(*) AS count FROM posts");
            return rows[0].count;
        } catch (error) {
            console.error("Error counting posts:", error);
            throw new Error("Error counting posts");
        }
    },


    async findPaginatedPosts(offset, limit) {
        try {
            const [rows] = await db.query(
                "SELECT * FROM posts ORDER BY date DESC LIMIT ? OFFSET ?",
                [limit, offset]
            );
            return rows;
        } catch (error) {
            console.error("Error fetching paginated posts:", error);

        }
    },


}