import jwt from 'jsonwebtoken';
const { verify } = jwt;
// Create a middleware function that blocks unauthicated users from triggering a route
export const blockGuests = (req, res, next) => {
    // TODO: Retrieve the token cookie from req.cookies
    const token = req.cookies.token;
    if (!token) {
        res.status(401).json({
            message: 'You are not authorized'
        });
        return;
    }
    try {
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error('JWT_SECRET is not defined');
        }
        const userData = verify(token, secret);
        if (userData && typeof userData !== 'string') {
            next();
        }
    }
    catch (error) {
        res.status(401).json({
            message: 'Not authorized'
        });
    }
};
