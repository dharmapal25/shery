require("dotenv").config();
const app = require("./src/app");
require("./src/config/dbs");

const PORT = process.env.PORT;


app.listen(PORT,()=> {
    console.log(` Server is running on port ${PORT}`);
})