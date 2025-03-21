import Users from "../models/usersTable.js";
import createError from "http-errors";
import authUtils from "../utils/authUtils.js";


export default {
    async getLogin(req, res) {
        res.render("users/login", {title: "Login"});
    },

    async login(req, res, next) {
        const {password, email} = req.body;
        try {
            const existingUser = await Users.findByEmail(email);
            if (!existingUser) {
                return res.status(422).json({
                    message: "User not found",
                    success: false,
                    messageType: "error",
                });
            }
            const result = authUtils.validatePasswordAndGenerateToken(existingUser, password);

            if (result.success) {
                return res.status(200).json({
                    token: result.token,
                    expiresIn: result.expiresIn,
                    success: true,
                    message: "Login successful!",
                    messageType: "success",
                    userId: existingUser.id,
                });
            }

            return res.status(401).json({
                success: false,
                messageType: "error",
                message: result.message,
            });
        } catch (err) {
            return next(createError(500, `Server error. Please try again later: ${err.message}`));
        }


    },

    async getRegister(req, res) {
        res.render("users/register", {title: "register"});
    },

    async register(req, res, next) {
        const {firstname, lastname, email, password} = req.body;

        const existingUser = await Users.findByEmail(email);
        if (existingUser) {
            return res.status(422).json({
                success: false,
                message: "User with this email already exists. Please try another one",
                messageType: "error",
            });
        }

        try {
            await Users.createUsers(firstname, lastname, email, password);

            res.status(200).json({
                success: true,
                message: "Registration successful!",
                messageType: "success",
            });
        } catch (err) {
            return next(createError(500, `An error occurred during registration${err.message}`));
        }
    },

    usersListView: (req, res) => {
        res.render("users/users", {
            title: "user List",
        });
    },

    async usersListData(req, res, next) {
        try {
            const users = await Users.findAll();

            res.json({
                users,
            });
        } catch (err) {
            return next(createError(500, `Server error${err.message}`));
        }


    },

    async getUserProfileView(req, res) {
        res.render("users/userProfile", {
            title: "User Profile",
        });
    },

    async getUserProfileData(req, res, next) {
        const id = req.userId;

        try {
            const user = await Users.findById(id);
            if (!user) {
                return next(createError(404, "User not found"));
            }
            res.json({
                user,
            });
        } catch (err) {
            return next(createError(500, `Server error${err.message}`));
        }


    },
};
