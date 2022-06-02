const mangoose = require("mongoose");
const app = require('./app')
const {PORT = 3003, DB_HOST} = process.env;

mangoose.connect(DB_HOST)
  .then(() => {
    app.listen(PORT);
    console.log("Database connection successful")
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  })
 
