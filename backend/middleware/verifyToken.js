const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "../.env" });


function auth(req, res) {
  const { username, password } = req.body;

  if (username !== process.env.ADMIN_USER || password !== process.env.ADMIN_PASS) {
    return res.status(401).json({ error: "Credenciais inválidas" });
  }

  const token = jwt.sign({ user: username }, process.env.JWT_SECRET, { expiresIn: "1h" });

  res.json({ token });
}

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Token not provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    return res.status(403).json({ error: "Invalid token" });
  }
}


module.exports = {
    authMiddleware,
    auth
}
