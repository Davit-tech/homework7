import express from "express";
import userController from "../controllers/userControllers.js";
import schemas from "../schemas/users.js";
import auth from "../middlewares/auth.js";
import validateUser from "../middlewares/validation.js";

const router = express.Router();

// Routes for registration and login
router.get("/register", userController.getRegister);
router.post("/register", validateUser(schemas.register, "body"), userController.register);

// Routes for  login
router.get("/login", userController.getLogin);
router.post("/login", validateUser(schemas.login, "body"), userController.login);

// Routes for working with users
router.get("/users", userController.usersListView);
router.get("/users/data", auth, userController.usersListData);

// Routes for user profile
router.get("/profile", userController.getUserProfileView);
router.get("/profile/data", auth, userController.getUserProfileData);


export default router;
