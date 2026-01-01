import collec from "../connection/connectionToMongoDB.js";

// export async function authentification(req, res, next) {
//     if (!req.body.username && !req.body.password)
//         return res.status(400).json({ message: 'incorrect user data' });
//     const user = await collec.findOne({ username: req.body.username, password: req.body.password });
//     if (!user)
//         return res.status(401).json({ message: 'incorrect username or password' });
//     next();
// }

// // the same authentification with query not in body because GET not have body
export async function authentificationQuery(req, res, next) {
    if (!req.query.username && !req.query.password)
        return res.status(400).json({ message: 'incorrect user data' });
    const user = await collec.findOne({ username: req.query.username, password: req.query.password });
    if (!user)
        return res.status(401).json({ message: 'incorrect username or password' });
    next();
}