const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    emailAddress: { type: String, required: true },
    gender: { type: String, enum: ["Male", "Female", "Others"] },
    dateofBirth: { type: Date },
    password: { type: String, required : true },
    role: { type: String },
    lastLoginDate: { type: Date },
    isPhoneNumberVerified: { type: Boolean }
});

module.exports = mongoose.model("Users", userSchema);