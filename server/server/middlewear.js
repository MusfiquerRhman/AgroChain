import jwt from 'jsonwebtoken'

export const isLoggedIn = (req, res, next) => {
    if(!req.session.userId){
        res.status(403).send();
    }
    else {
        next();
    }
}

export const isAdmin = (req, res, next) => {
    if(!req.session.userId || req.session.userType !== "AVATER"){
        res.status(403).send();
    }
    else {
        next();
    }
}

export const verifyJWT = (req, res, next) => {
    const token = req.headers["x-access-token"];
    if(!token){
        res.status(403).send();
    }
    else {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if(err){
                res.status(403).json({auth: false});
            }
            else {
                next();
            }
        })
    }
}
