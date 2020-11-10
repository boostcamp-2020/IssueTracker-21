const meOrNot = (user, value) => {
  if (value === "@me") {
    return user.userId;
  } else {
    return value;
  }
};
export default meOrNot;
