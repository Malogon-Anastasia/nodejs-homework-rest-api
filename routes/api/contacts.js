const {contacts: ctrl} = require("../../controllers");
const express = require('express')

const {validation, ctrlWrapper} = require("../../middlewares");
const {joiSchema, favoriteJoiSchema} = require("../../models/contact");


const validateMiddleware = validation(joiSchema);
const router = express.Router()

router.get("/", ctrlWrapper(ctrl.getAll));

router.get('/:id', ctrlWrapper(ctrl.getById));

router.post('/', validateMiddleware, ctrlWrapper(ctrl.add));

router.delete('/:id', ctrlWrapper(ctrl.removeById));

router.put('/:id', validation(joiSchema), ctrlWrapper(ctrl.updateById));
router.patch('/:id/favorite', validation(favoriteJoiSchema), ctrlWrapper(ctrl.updateFavById));
module.exports = router
