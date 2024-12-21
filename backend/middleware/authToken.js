import jwt from 'jsonwebtoken';

const authToken = (req, res, next) => {
  try {
    // Retrieve token from cookies or headers
    const token = req.cookies?.token || req.headers?.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        message: 'Please Login First',
        error: true,
        success: false,
        data: [],
      });
    }

    // Verify token
    jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(403).json({
          message: 'Please Login',
          error: true,
          success: false,
          data: [],
        });
      }
 
      // Attach decoded data to the request object for further use
      req.user = decoded
    
      next();
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || 'Authorization failed',
      error: true,
      success: false,
      data: [],
    });
  }
};

export default authToken;
