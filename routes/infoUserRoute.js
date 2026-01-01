import { Router } from 'express';
import collec from '../connection/connectionToMongoDB.js';
import { authentificationQuery } from '../middlewares/authMiddleware.js';

const router = Router();

router.use(authentificationQuery);

router.get('/', async (req, res) => {
    const user = await collec.findOne({ username: req.query.username });
    return res.status(200).json({ username: req.query.username, encryptedMessagesCount: user.encryptedMessagesCount });
});

export default router;