const mongoose = require('mongoose')
mongoose.connect("mongodb+srv://admin:wieTYUfV5EA48FzK@cluster0.ngudhn8.mongodb.net/test1")
.then(() => {console.log("DB Connected...")})
.catch((err) => console.log(err))

const schema = new mongoose.Schema({
    name: String,
    email: String,
    hobbies: [String]
})

const operations = mongoose.model("CRUD", schema)

module.exports = operations