import db from "../clients/db.mysql.js";
import helpers from "../utils/helpers.js";

export default {


    async findByEmail(email) {
        try {
            const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
            if (rows.length > 0) {
                return rows[0];
            } else {
                return null;
            }
        } catch (error) {
            console.error("Error in findByEmail:", error);

        }
    },

    async findById(id) {
        try {
            const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [id]);
            return rows.length > 0 ? rows[0] : null;
        } catch (error) {
            console.error("Error in findById:", error);
            return null;
        }
    },
    async findAll() {
        const [raws] = await db.query(`
            SELECT *
            FROM users`);
        return raws;
    },
    async createUsers(first_name, last_name, email, password) {
        try {
            const hashedPassword = helpers.passwordHash(password);
            const [raws] = await db.query(`
                INSERT INTO users (first_name, last_name, email, password)
                VALUES (?, ?, ?, ?)
            `, [first_name, last_name, email, hashedPassword]);
            console.log("Successfully registered");
            return raws;

        } catch (error) {
            console.log(error, "chexav");

        }

    },
};