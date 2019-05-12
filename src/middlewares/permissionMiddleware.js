module.exports = (req, res, next) => {
  if(req.user.positions != "teacher") {
    res.status(401).send({
      error: "you don't have permission student!"
    });
  } else {
    next();
  }
}
