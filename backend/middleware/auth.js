const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

module.exports = function (req, res, next) {
  // ✅ Check for Authorization header
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // ✅ Expect format:
  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ msg: 'Invalid Authorization header format' });
  }

  const token = parts[1];
  if (!token) {
    return res.status(401).json({ msg: 'No token found' });
  }

  try {
    // ✅ Verify token
    const decoded = jwt.verify(token, JWT_SECRET);

    req.user = decoded;

    next();
  } catch (err) {
    console.error('JWT verification failed:', err.message);
    return res.status(401).json({ msg: 'Token is not valid' });
  }
};
