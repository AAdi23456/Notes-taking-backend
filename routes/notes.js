const express = require("express")
const jwt = require("jsonwebtoken")
const notes_post = express.Router()
const notesmodel = require("../models/notesschema")
const get_route = express.Router()
notes_post.post("/", async (req, res) => {

    const note = new notesmodel(req.body)
    await note.save()
    res.json({ "msg": "new note added" })
})
get_route.get("/", async (req, res) => {
    const token = req.headers.authorization
    console.log(token);
    const decoded = jwt.verify(token, "masai")
    console.log(decoded);
    if (decoded) {
        const notes = await notesmodel.find({ 
            UserID
            : decoded.userID })
        res.status(200).json(notes)
    } else {
        res.json(" notes not found")
    }

})
notes_post.get("/:id", async (req, res) => {
    const token = req.headers.authorization
    console.log(token);
    const decoded = jwt.verify(token, "masai")
    try {
        if (decoded.userID) {
            const { id } = req.params
            const data = await notesmodel.find({ _id: id })
            res.status(200).json(data)
        } else {
            res.status(404).json({ "msg": "login first" })
        }
    } catch (error) {
        res.status(404).json({ "msg": "login first" })
        console.log(error);
    }
})
get_route.patch("/:id", async (req, res) => {
    const newdata = req.body
    const token = req.headers.authorization
    console.log(token);
    const decoded = jwt.verify(token, "masai")
    try {
        if (decoded.userID) {
            const { id } = req.params
            const data = await notesmodel.findByIdAndUpdate(id, newdata, { new: true })
            await data.save()
            console.log(newdata);
            res.status(200).json({ "msg": "data updated", data })
        } else {
            res.status(404).json({ "msg": "logi first" })
        }
    } catch (error) {
        res.status(404).json({ "msg": "login first" })
        console.log(error);
    }
})
get_route.delete("/:id", async (req, res) => {
    const token = req.headers.authorization
    try {
        const decoded = jwt.verify(token, "masai")
        if (decoded.userID) {
            const { id } = req.params
            const data = await notesmodel.findByIdAndDelete(id)
            res.status(200).json({ "msg": "data deleted" })
        } else {
            res.status(404).json({ "msg": "login first" })
        }
    } catch (error) {
        console.log(error)
        res.status(401).json({ "msg": "Invalid token" })
    }
})





module.exports = {
    notes_post, get_route

}