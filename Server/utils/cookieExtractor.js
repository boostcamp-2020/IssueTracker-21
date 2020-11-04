exports.cookieExtractor = (req) => {
  let token = null;
  if (req.signedCookies || req.cookies) {
    token = req.signedCookies.token;
  }
  return token;
};
