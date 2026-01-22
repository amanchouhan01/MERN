const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth-controller");
const {signupSchema, loginSchema} = require("../validators/auth-validator");
const validate = require("../middlewares/validate-middleware");
const authMiddleware = require("../middlewares/auth-middleware");

router.route("/").get(authControllers.home);


/*
router.get("/register", (req, res) => {
    res.status(200).send("this is the registration page");
 });
*/

// below is the most efficient way of writing a route than above

router
    .route("/register")
    .post(validate(signupSchema), authControllers.register);

router.route("/login").post(validate(loginSchema), authControllers.login);

router.route("/user").get(authMiddleware, authControllers.user);

module.exports = router;