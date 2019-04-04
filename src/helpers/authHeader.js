const authHeader = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.token) {
    return { userToken: user.token };
  }
  return {};
};

export default authHeader;
