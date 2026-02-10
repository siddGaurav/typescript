import type { Request, Response, NextFunction } from 'express';
import { verifyJwt } from '../utils/jwt.js';
import type { TokenPayload } from '../utils/jwt.js';



export interface RequestWithUser extends Request {
    user?: TokenPayload;
}

export const requireAuth = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ status: 'failed', message: 'Unauthorized' });
    }

    const token:any = authHeader.split(' ')[1];

    try {
      
     
        const decoded = verifyJwt<TokenPayload>(token);
        if (!decoded) {
            return res.status(401).json({ status: 'failed', message: 'Invalid or expired token' });
        }
        req.user = decoded;
        next();
    } catch (err) {
        console.error('Auth middleware error', err);
        return res.status(500).json({ status: 'failed', message: 'Internal server error' });
    }
};