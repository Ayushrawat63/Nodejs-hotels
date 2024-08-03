const jwt = require("jsonwebtoken");

const VerifyTokenMiddlerware = async (req, res, next) => {
  const authorization=req.headers.authorization;
  if(!authorization) return res.status(401).json({ error: "token not found" });
  console.log(authorization)
  const token = req.headers.authorization.split(" ")[1];
  if (!token) return res.status(401).json({ error: "unauthorized" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.payload = decoded;
   
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ error: "Invaild token" });
  }
};

const GenerateToken = (userdata) => {
  return jwt.sign(userdata, process.env.JWT_KEY,{expiresIn:40000});
};

module.exports = { VerifyTokenMiddlerware, GenerateToken };
