export default class Authorize {
    static user(req, res, next) {
        const { user_type } = req.user;
        return user_type === "Client" ? next() : res.status(401).json({ message: "Access reserved to user only" })
    }
    static admin(req, res, next) {
        const { user_type } = req.user;
        console.log(user_type);
        return user_type === "Admin" ? next() : res.status(401).json({ message: "Access reserved to admin only" })
    }
}