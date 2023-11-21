const indexFunction = (req, res) => {
  console.log(req.body);
  res.json({
    mssg: "Welcome to the swifty api, bleh bleh bleh ...",
  });
};

module.exports = {
  indexFunction,
};
