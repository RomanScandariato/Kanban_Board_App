import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
const { sign, verify } = jwt;
function createToken(user_id) {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error('JWT_SECRET is not defined');
    }
    return sign({ user_id }, secret);
}
// GET /users
export const getAllUsers = async (_req, res) => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ['password'] }
        });
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// POST /auth/register
export const registerUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const newUser = await User.create({ username, password });
        const token = createToken(newUser.id);
        res.cookie('token', token, {
            httpOnly: true
        });
        res.status(201).json(newUser);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
// TODO: Complete the login controller
// POST /auth/login
export const loginUser = async (req, res) => {
    const { username, password } = req.body;
    // Find a user in the database by the username provided in req.body
    const user = await User.findOne({ where: { username } });
    // If no user found, send a 403 json response with a user not found message and return
    if (!user) {
        res.status(403).json({ message: 'User not found' });
        return;
    }
    // If user is found, verify the password is correct (ie. user.validatePassword(password))
    const isPasswordValid = await user.validatePassword(password);
    // If password is validated then create a jwt token using the createToken function above and passing their id
    if (isPasswordValid) {
        const token = createToken(user.id);
        // Send a cookie back with the name of token and the token as value. Make sure to set httpOnly in the options object (ie. res.cookie())
        res.cookie('token', token, {
            httpOnly: true
        });
        // Send the user in a json response - res.json(user)
        res.json(user);
    }
    else {
        res.status(403).json({ message: 'Invalid password' });
    }
};
// Retrieve a user by their jwt
// GET /auth/user
export const getUser = async (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        res.json(null);
        return;
    }
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error('JWT_SECRET is not defined');
    }
    try {
        const userData = verify(token, secret);
        if (userData && typeof userData !== 'string') {
            const user = await User.findByPk(userData.user_id);
            res.json(user);
            return;
        }
    }
    catch (error) {
        console.log('GET USER ERROR', error);
        res.json(null);
        return;
    }
    res.json(null);
};
// Logout a user
// GET /auth/logout
export const logOutUser = (_, res) => {
    res.clearCookie('token');
    res.json({
        message: 'Logged out successfully!'
    });
};
