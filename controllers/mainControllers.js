const indexFunction = (req, res) => {
  res.json({
    mssg: "Welcome to the swifty api, bleh bleh bleh ...",
  });
};

module.exports = {
  indexFunction,
};
