const loginController = (req, res) => {
  console.log(req.body);
  const loginInfo = req.body ? req.body : null;

  console.log(loginInfo);

  if (!loginInfo) {
    res.setHeader("Content-Type", "application/json");
    res.set("Cache-Control", "no-cache");

    return res.status(400).json({
      status: "failed",
      error: "INVALID_LOGIN_DETAILS",
      message: " Input login details 1 ",
    });
  }
  try {
    const { loginName, loginPassword } = loginInfo;

    return res.status(200).json({
      loginName,
      loginPassword,
    });
  } catch {
    res.setHeader("Content-Type", "application/json");
    res.set("Cache-Control", "no-cache");

    return res.status(400).json({
      status: "failed",
      error: "INVALID_LOGIN_DETAILS",
      message: " Input login details 2 ",
    });
  }
};

module.exports = { loginController };
