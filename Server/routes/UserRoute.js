const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/UserController");

router.post("/register", userCtrl.register);

/**
 * @openapi
 * tags:
 *  name: User Routes
 *  description: The routes for the users
 */

/**
 * @openapi
 *  /user/users:
 *      get:
 *          summary: Retrieve a list of JSONPlaceholder users.
 *          description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
 *          responses:
 *              200:
 *                  description: A list of users.
 *                  content:
 *                      application/json:
 *
 */
router.get("/users", userCtrl.getAll);

router.post("/login", userCtrl.login);
router.get("/verify", userCtrl.verify);
router.get("/logout", userCtrl.logout);
router.get("/:id", userCtrl.getUserDataById);
router.put("/updateUserData/:id", userCtrl.update);
router.patch("/updatePassword/:id", userCtrl.updatePassword);
router.put("/updateUserImage/:id", userCtrl.updateUserImage);
// added

module.exports = router;
