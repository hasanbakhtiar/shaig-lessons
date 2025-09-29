module.exports = async function(req, res, next) {
  try {
    const token = "d832767809bb1a62ceb8168aa4c18072";
    const incomingToken = req.headers["fynode-access"];
    if (
      !Object.keys(req.headers).includes("fynode-access") ||
      !incomingToken ||
      incomingToken !== token
    ) {
      return res.status(401).json({
        message: "NO ACCESS!",
      });
    }
    next();
  } catch (error) {
    console.log(error);
  }
};
