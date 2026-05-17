import { createContext, useState, useEffect } from 'react';
import API from '../modules/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    if (token) {
      checkUser();
    } else {
      setLoading(false);
    }
  }, []);

  const checkUser = async () => {
    try {
      const res = await API.get('/auth/me');
      const token = localStorage.getItem('token');
      const userData = { ...res.data.user, token };
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
    } catch (err) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser(null);
    }
    setLoading(false);
  };

  const signup = async (userData) => {
    const res = await API.post('/auth/signup', userData);
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('user', JSON.stringify(res.data));
    setUser(res.data);
    return res.data;
  };

  const signin = async (userData) => {
    const res = await API.post('/auth/signin', userData);
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('user', JSON.stringify(res.data));
    setUser(res.data);
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signup, signin, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
