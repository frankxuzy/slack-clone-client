import decode from 'jwt-decode';

export const decodeToken = () => {
  try {
    const token = localStorage.getItem('token');
    const user = decode(token);
    return user;
  } catch (err) {
    return err;
  }
};
