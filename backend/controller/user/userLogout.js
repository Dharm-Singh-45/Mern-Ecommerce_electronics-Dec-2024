const userLogoutController = async (req, res) => {
  try {
    res.clearCookie("token");

    res.json({
      message: "Logout Successfully",
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Something went wrong",
      success: false,
      error: true,
    });
  }
};

export default userLogoutController;
