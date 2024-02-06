import axios from 'axios';
import Cookie from 'universal-cookie';
import { useDispatch } from 'react-redux';

import { clearUser, setUser } from '../app/userSlice';

const cookie = new Cookie();

const useAuth = () => {
  const dispatch = useDispatch();

  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const response = await axios.post('http://localhost:5000/auth/login', {
      email,
      password,
    });

    const { token, user } = response.data;
    dispatch(setUser({ email: user.email, username: user.username }));

    cookie.set('session_token', token);

    return response.data;
  };

  const signup = async ({
    email,
    password,
    username,
  }: {
    email: string;
    password: string;
    username: string;
  }) => {
    const response = await axios.post('http://localhost:5000/auth/signup', {
      email,
      password,
      username,
    });

    const { token, user } = response.data;
    dispatch(setUser({ email: user.email, username: user.username }));

    cookie.set('session_token', token);

    return response.data;
  };

  const fetchUser = async () => {
    const sessionToken = cookie.get('session_token');

    try {
      const response = await axios.get('http://localhost:5000/auth/me', {
        headers: {
          ...(sessionToken
            ? { Authorization: `Bearer ${sessionToken}` }
            : null),
        },
      });

      const { email, username } = response.data;

      if (!username) {
        dispatch(clearUser());
        return;
      }

      dispatch(setUser({ email, username }));
    } catch (error) {
      console.log(error);
      dispatch(clearUser());
    }
  };

  const logout = () => {
    cookie.remove('session_token');
    dispatch(clearUser());
  };

  return { signup, login, fetchUser, logout };
};

export default useAuth;
