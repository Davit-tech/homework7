import Users from "../models/usersTable.js";
import createError from "http-errors";
import authUtils from "../utils/authUtils.js";


export default {
    getLogin: async (req, res) => {
        res.render("users/login", {title: "Login"});
    },

    login: async (req, res, next) => {
        const {password, email} = req.body;


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
    },

    getRegister: async (req, res) => {
        res.render("users/register", {title: "register"});
    },

    register: async (req, res, next) => {
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
            return next(createError(500, "An error occurred during registration"));
        }
    },

    usersListView: (req, res) => {
        res.render("users/users", {
            title: "user List",
        });
    },

    usersListData: async (req, res, next) => {


        const users = await Users.findAll()

        res.json({
            users,
        });
    },

    getUserProfileView: async (req, res, next) => {
        res.render("users/userProfile", {
            title: "User Profile",
        });
    },

    getUserProfileData: async (req, res, next) => {
        const id = req.userId;


        const user = await Users.findById(id);
        console.log(user);
        if (!user) {
            return next(createError(404, "User not found"));
        }

        res.json({
            user,
        });
    },
};
