const adminAuth = (req, res, next) => {
  const token = "abc"; //req.body
  const isAdmin = token === "abc";
  if (!isAdmin) {
    return res.status(401).send({ message: "Unauthorized Access" });
  }
  next();
};

module.exports = adminAuth;
