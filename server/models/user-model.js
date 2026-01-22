const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
});

// ✅ CORRECT pre-save middleware (NO next)
userSchema.pre("save", async function () {
    if (!this.isModified("password")) {
        return;
    }

    const saltRound = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, saltRound);
});


//compare the password
userSchema.methods.comparePassword = async function(password){
    return bcrypt.compare(password, this.password);
};

// ✅ JWT token
userSchema.methods.generateToken = function () {
    return jwt.sign(
        {
            userId: this._id.toString(),
            email: this.email,
            isAdmin: this.isAdmin,
        },
        process.env.SECRET_KEY,
        { expiresIn: "20d" }
    );
};

const User = mongoose.model("User", userSchema);
module.exports = User;
