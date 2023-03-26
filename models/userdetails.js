const mongoose = require("mongoose")

const reg_schema = mongoose.Schema({
    name: { type: String},
    email: { type: String},
    password: { type: String },

})
const reg_model = mongoose.model("users", reg_schema)
module.exports = reg_model