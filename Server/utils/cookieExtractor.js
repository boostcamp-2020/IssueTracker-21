const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.signedCookies.token;
  }
  return token;
};

export default cookieExtractor;
