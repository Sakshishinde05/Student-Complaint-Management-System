import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const checkUser = async () => {
            const token = localStorage.getItem('token');
            const storedUser = localStorage.getItem('user');

            if (token && storedUser) {
                setUser(JSON.parse(storedUser));
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            }
            setLoading(false);
        };

        checkUser();
    }, []);

    const login = async (email, password) => {
        try {
            const { data } = await axios.post('http://localhost:5000/api/auth/login', {
                email,
                password,
            });

            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data));
            axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
            setUser(data);
            toast.success('Login Successful');
            navigate(data.role === 'admin' ? '/admin-dashboard' : '/dashboard');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Login Failed');
        }
    };

    const register = async (userData) => {
        try {
            const { data } = await axios.post('http://localhost:5000/api/auth/register', userData);
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data));
            axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
            setUser(data);
            toast.success('Registration Successful');
            navigate('/dashboard');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Registration Failed');
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        delete axios.defaults.headers.common['Authorization'];
        setUser(null);
        toast.success('Logged out successfully');
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
