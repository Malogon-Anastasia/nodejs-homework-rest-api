const contactsOperation = require("../../models/contacts");

const getAll = async (req, res) => {
    const products = await contactsOperation.getAll();
    res.json({
        status: "success",
        code: 200,
        data: {
            result: products
        }
    });
};

module.exports = getAll;