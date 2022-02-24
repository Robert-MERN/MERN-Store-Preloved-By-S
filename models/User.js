const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        max: 20,
        min: 4,
        unique: true,
        // required: true,
    },
    email: {
        type: String,
        // required: true,
    },
    password: {
        type: String,
        min: 8,
        // required: true,
        max: 20
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    firstName: {
        // required: true,
        max: 25,
        min: 4,
        type: String
    },
    lastName: {
        // required: true,
        max: 25,
        min: 4,
        type: String
    },
    phoneNumber: {
        type: String,
        // required: true,
    },
    birthDate: {
        type: String,
        // required: true,
    }
}, {timestamps: true})

module.exports = mongoose.model("User", UserSchema);