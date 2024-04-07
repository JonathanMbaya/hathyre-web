const express = require("express");
const {
  getUsers,
  getOneUser,
  createUser,
  editUser,
  deleteUser,
} = require("../controllers/user.controller");
const router = express.Router();

router.get("/users", getUsers);
router.get("/user/:id", getOneUser);
router.post("/add/user", createUser);
router.put("/update/user/:id", editUser);
router.delete("/delete/user/:id", deleteUser);

module.exports = router;