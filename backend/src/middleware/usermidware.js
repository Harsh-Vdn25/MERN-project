const { z, check } = require('zod');
const jwt = require('jsonwebtoken')
const { UserModel } = require('../models/Note');
const JWT_SECRET = process.env.JWT_SECRET;

function checkSignupip(req, res, next) {
    const requiredbody = z.object({
        email: z.string().email("Check the email"),
        password: z.string().min(7).max(30),
        firstName: z.string().min(3),
        lastName: z.string(1)
    })
    const parsed = requiredbody.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({
            message: "Check the input"
        })
    }
    next();
}

async function decodeToken(req, res, next) {
    const token = req.headers.token;
    if (!token) {
        return res.status(400).json({
            message: "No token"
        })
    }
    const user = jwt.verify(token, JWT_SECRET);
    req.userId=user.id;
    next();
}


async function CheckUser(req, res, next) {
    const email=req.body.email;
    const User = await UserModel.findOne({ email });
    if (User) {
        return res.status(400).json({
            message: "Please Signin"
        })
    }
    next();
}

module.exports = {
    CheckUser,
    checkSignupip,
    decodeToken
}