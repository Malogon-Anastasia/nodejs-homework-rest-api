const contactsOperation = require("../../models/contacts");
const { NotFound } = require("http-errors");

const removeById = async (req, res) => {
    const { contactId } = req.params;
    const result = await contactsOperation.removeById(contactId);
    if (!result) {
        throw new NotFound(`Product with id=${contactId} not found`);
    }
    res.json({
        status: "success",
        code: 200,
        message: "product deleted",
        data: {
            result
        }
    })
}

module.exports = removeById;