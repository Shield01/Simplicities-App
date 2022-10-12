const Users = require('../models/user');
const StatusCodes = require('http-status-codes');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createUser = async (req, res) => {
    const { body: { firstName, lastName, emailAddress, phoneNumber, password, dateofBirth, gender } } = req;

    if (!firstName || !lastName) {
        return res.status(StatusCodes.BAD_REQUEST).json({ httpStatus: "Bad Request", message: "Firstname and Lastname must be passed" });
    }
    if (!emailAddress || !phoneNumber) {
        return res.status(StatusCodes.BAD_REQUEST).json({ httpStatus: "Bad Request", message: "Email Address and Phone number must be passed" });
    }
    if (!password) {
        return res.status(StatusCodes.BAD_REQUEST).json({ httpStatus: "Bad Request", message: "Password must be passed" });
    }

    try {
        const oldUser = await Users.findOne({emailAddress});
        if (oldUser) {
            return res.status(StatusCodes.BAD_REQUEST).json({ httpStatus: "Bad Request", message: `User with email : ${emailAddress} already exists` });
        }
        const salt = await bcrypt.genSalt(process.env.SALT_FACTOR);

        const hashedPassword = await bcrypt.hash(password, salt);

        await Users.create({
            firstName,
            lastName,
            emailAddress: emailAddress.toLowerCase(),
            phoneNumber,
            password: hashedPassword,
            dateofBirth,
            gender
        });

        return res.status(StatusCodes.CREATED).json({ httpStatus: "Created", message: "User Successfuly Created" });
    } catch (err) {
        console.log(err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ httpStatus: "Internal Server Error", message: err });
    }
}

const userLogin = async (req, res) => {
    const { body: { emailAddress, password } } = req;
    try {
        const user = await Users.findOne({emailAddress});

        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({ httpStatus: "Not Found", message: `User with email address ${emailAddress} not found in the database` });
        }
        
        const rightPassword = await bcrypt.compare(password, user.password);

        if (rightPassword) {
            const token = jwt.sign(
                {
                    user_id: user._id,
                    emailAddress
                },
                process.env.TOKEN_KEY,
                {
                    expiresIn: 1800
                }
            );

            return res.status(StatusCodes.OK).json({ httpStatus: "OK", message: "User Successfully logged in", user: user, token : token });
        }
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ httpStatus: "Internal Server Error", message: err })
    }
}

module.exports = {
    createUser,
    userLogin
}