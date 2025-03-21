import express from "express";
import userController from "../controllers/userControllers.js";
import schemas from "../schemas/users.js";
import auth from "../middlewares/auth.js";
import validateUser from "../middlewares/validation.js";

const router = express.Router();

router.get("/register", userController.getRegister);
router.get("/profile", userController.getUserProfileView);
router.get("/users", userController.usersListView);
router.get("/login", userController.getLogin);

router.post("/register", validateUser(schemas.register, "body"), userController.register);
router.post("/login", validateUser(schemas.login, "body"), userController.login);
router.get("/users/data", auth, userController.usersListData);
router.get("/profile/data", auth, userController.getUserProfileData);

export default router;
