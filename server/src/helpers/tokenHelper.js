const jwt = require("jsonwebtoken");
const createError = require("http-errors");

module.exports.signNewUserToken = (payload) => {
  return new Promise((resolve, reject) => {
    const secret = process.env.NEWUSER_TOKEN_SECRET;
    const options = { expiresIn: "1h" };
    jwt.sign(payload, secret, options, (error, token) => {
      if (error) return reject(createError.InternalServerError());
      resolve(token);
    });
  });
};

module.exports.verifyNewUserToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return next(createError.Unauthorized());
  const token = authHeader.split(" ")[1];
  const secret = process.env.NEWUSER_TOKEN_SECRET;
  jwt.verify(token, secret, (error, payload) => {
    if (error) return next(createError.Unauthorized());
    req.payload = payload;
    next();
  });
};

module.exports.signAccessToken = (payload) => {
  return new Promise((resolve, reject) => {
    const secret = process.env.ACCESS_TOKEN_SECRET;
    const options = { expiresIn: "7d" };
    jwt.sign(payload, secret, options, (error, token) => {
      if (error) return reject(createError.InternalServerError());
      resolve(token);
    });
  });
};

module.exports.verifyAccessToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return next(createError.Unauthorized());
  const token = authHeader.split(" ")[1];
  const secret = process.env.ACCESS_TOKEN_SECRET;
  jwt.verify(token, secret, (error, payload) => {
    if (error) return next(createError.Unauthorized());
    req.payload = payload;
    next();
  });
};

module.exports.verifySocketToken = (socket, next) => {
  const authHeader = socket.handshake.auth["accessToken"];
  if (!authHeader) return next(createError.Unauthorized());
  const token = authHeader.split(" ")[1];
  const secret = process.env.ACCESS_TOKEN_SECRET;
  jwt.verify(token, secret, (error, payload) => {
    if (error) return next(createError.Unauthorized());
    socket.payload = payload;
    next();
  });
};
