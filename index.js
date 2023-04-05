const express = require("express")
const { reg_routes, login_rout } = require("./routes/register")
const app = express()
const cors = require("cors");
app.use(express.json())
const { connection } = require("./connect")
const { notes_post, get_route } = require("./routes/notes")
const auth = require("./middlewares/middleware")
app.use(cors())
app.use("/getnotes", get_route)
app.use("/add", reg_routes)
app.use("/login", login_rout);
app.use("/update", get_route);
app.use("/delete", get_route)
app.use("/getdataById", notes_post)
app.use(auth)
app.use("/addn", notes_post)
app.listen(3000, () => {
    try {
        connection()
    } catch (error) {
        console.log(error);
    }
})
