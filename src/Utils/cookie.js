import Cookies from 'js-cookie';

const setUserToCookie = (user) => {
  let temp = user;
  if (temp) {
    temp = JSON.stringify(temp);
  }
  Cookies.set('user', temp, { expires: 7 });
};

const getUserFromCookie = () => {
  let user = Cookies.get('user');
  if (user) {
    user = JSON.parse(user);
  }
  return user;
};

const removeUser = () => {
  Cookies.remove('user');
};

export const StoreToCookies = {
  setUserToCookie,
  getUserFromCookie,
  removeUser,
};
