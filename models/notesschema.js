const mongoose = require("mongoose")

const notesschema = mongoose.Schema({
    title: String,
    body: String,
    sub: String,
    UserID: String
}, {
    versionKey: false
})
const notesmodel = mongoose.model("notes", notesschema)
module.exports = notesmodel