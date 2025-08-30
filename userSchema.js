const mongoose = require("mongoose");

mongoose.connect(`mongodb://localhost:27017/getUserData`);


const userSchema = mongoose.Schema({
    name: String,
    age: Number,
    city: String
});

module.exports = mongoose.model("user", userSchema);
