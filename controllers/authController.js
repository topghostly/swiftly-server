const loginController = (req, res) => {
  const loginInfo = req.body ? req.body : null;

  if (!loginInfo) {
    res.setHeader("Content-Type", "application/json");
    res.set("Cache-Control", "no-cache");

    return res.status(400).json({
      status: "failed",
      error: "INVALID_LOGIN_DETAILS",
      message: " Recheck the login details ",
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

    return res.status(500).json({
      status: "failed",
      error: "INTERNAL_SERVER_ERROR",
      message: " An unexpected condition was encountered on the server ",
    });
  }
};

const registrationController = (req, res) => {
  const registrationInfo = req.body ? req.body : null;

  if (!registrationInfo) {
    res.setHeader("Content-Type", "application/json");
    res.set("Cache-Control", "no-cache");

    return res.status(400).json({
      status: "failed",
      error: "INVALID_REGISTRATION_DETAILS",
      message: " Recheck the registration details ",
    });
  }
  try {
    const { username, password, usermail } = registrationInfo;

    return res.status(200).json({
      username,
      usermail,
      password,
    });
  } catch {
    res.setHeader("Content-Type", "application/json");
    res.set("Cache-Control", "no-cache");

    return res.status(500).json({
      status: "failed",
      error: "INTERNAL_SERVER_ERROR",
      message: " An unexpected condition was encountered on the server ",
    });
  }
};

module.exports = { loginController, registrationController };
