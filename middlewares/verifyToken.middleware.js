import jwt from "jsonwebtoken"

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Formato 'Bearer <token>'

    // Verificar si no hay token
    if (!token) {
        return res.status(401).json({
            msg: 'Access Denied: No token provided'
        });
    }

    // Verificar el token
    jwt.verify(token, process.env.JWT_SECRET || 'mi_secreto_super_secreto', (err, decoded) => {
        if (err) {
            return res.status(403).json({
                msg: 'Invalid token'
            });
        }

        // Si el token es válido, guardamos los datos decodificados en `req.user`
        req.user = decoded;
        next(); // Continuar a la siguiente función o ruta
    });
};