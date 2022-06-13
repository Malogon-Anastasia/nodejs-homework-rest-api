const express = require('express');

const {auth, ctrlWrapper} = require("../../middlewares");
const {users : ctrl} = require("../../controllers");

const router = express.Router();

router.get("/current", auth, ctrlWrapper(ctrl.getCarrent))

module.exports = router;