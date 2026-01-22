const User = require("../models/user-model");
const bcrypt = require("bcryptjs");


const home = async (req, res) => {
    try {
        res.status(200).send("Hello World this is the router setup again ");
    } catch (error) {
        res.status(500).send({ msg: "page not found" })
    }
};

// Registration Logic
// 1. Get Registration Data: Retrieve user data(username, email, password).
// 2. Check Email Existence: Check if the email is already registered.
// 3. Hash password: Securely hash the password.
// 4. Create user: Create a new use with hashed password.
// 5. Save to DB: Save user data to the database.
// 6 . Respond: Respond with "Registration Successful" or handle errors.
const register = async (req, res) => {
    try {

        const { username, email, phone, password } = req.body;

        const userExist = await User.findOne({ email });

        if (userExist) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // hash the password
        // const saltRound = 10;
        //const hash_password = await bcrypt.hash(password, saltRound);

        
        const userCreated = await User.create({
            username, 
            email,
            phone,
            password,
        });


        res.status(201).json({
            msg: "registration successful",
            token: await userCreated.generateToken(),
            userId: userCreated._id.toString(),
        });
    } catch (error) {
        res.status(500).json({ message: "internal server error" })
    }
};


//User Login 
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userExist = await User.findOne({ email });

        if (!userExist) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        //const user = await bcrypt.compare(password, userExist.password);
        const user = await userExist.comparePassword(password);

        if (user) {
            res.status(200).json({
                msg: "Login Successful",
                token: await userExist.generateToken(),
                userId: userExist._id.toString(),
            });

        } else {
            res.status(401).json({ message: "Invalid email or password" });
        }
    } catch (error) {
        return res.status(500).json("internal server error");
    }
}
 
// to send user data - User Logic
const user = async (req, res) => {
    try {
        const userData = req.user;
        return res.status(200).json({ userData });
    } catch (error) {
        console.log(`error from the user router ${error}`);
    }
};


module.exports = { home, register, login, user };