import axios from '../../axios';

const register = async (userData) => {
    // post user data
    const res = await axios.post(
        'http://localhost:5000/api/v1/auth/register',
        userData
    );
    // save user data response to localStorage
    if (res.data) localStorage.setItem('user', JSON.stringify(res.data));
    // and return it
    return res.data;
};

const login = async (userData) => {
    // post user data
    const res = await axios.post('/auth/login', userData);
    // save user data response to localStorage
    if (res.data) localStorage.setItem('user', JSON.stringify(res.data));
    // and return it
    return res.data;
};

const logout = () => {
    localStorage.removeItem('user');
};

const authService = {
    register,
    logout,
    login,
};
export default authService;
