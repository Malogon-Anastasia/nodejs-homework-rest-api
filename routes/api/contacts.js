
const express = require('express')

const {auth, validation, ctrlWrapper} = require("../../middlewares");
const {joiSchema, favoriteJoiSchema} = require("../../models/contact");
const {contacts: ctrl} = require("../../controllers");

const validateMiddleware = validation(joiSchema);
const router = express.Router()

router.get("/", auth, ctrlWrapper(ctrl.getAll));

router.get('/:id', ctrlWrapper(ctrl.getById));

router.post('/', auth, validateMiddleware, ctrlWrapper(ctrl.add));

router.delete('/:id', ctrlWrapper(ctrl.removeById));

router.put('/:id', validateMiddleware, ctrlWrapper(ctrl.updateById));
router.patch('/:id/favorite', validation(favoriteJoiSchema), ctrlWrapper(ctrl.updateFavById));
module.exports = router
