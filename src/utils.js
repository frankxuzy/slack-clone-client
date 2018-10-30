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

export const normalizeErrors = errors => errors.reduce((acc, current) => {
  if (current.path in acc) {
    acc[current.path].push(current.message);
  } else {
    acc[current.path] = [current.message];
  }
  return acc;
},
{});
