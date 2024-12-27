/*define endpoints based on role*/

const express = require("express");
const verifyToken = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/roleMiddleware");
const router = express.Router();

//Only admin can access this router
router.get("/admin", verifyToken, authorizeRoles("admin"), (req,res) => {
    res.json({message: "Welcome Admin"});
});

//Only admin and coordinator can access this router
router.get("/coordinator", verifyToken, authorizeRoles("coordinator"), (req,res) => {
    res.json({message: "Welcome Coordinator"});
});

//Only admin and user can access this router
router.get("/user", verifyToken, authorizeRoles("user"), (req,res) => {
    res.json({message: "Welcome User"});
});

module.exports = router;