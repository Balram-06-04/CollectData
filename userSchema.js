const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: String,
    age: Number,
    city: String
});

module.exports = mongoose.model("user", userSchema);
