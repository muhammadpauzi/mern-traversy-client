import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { LoginIcon } from '@heroicons/react/solid';
import Container from '../components/Container';
import FormControl from '../components/FormControl';
import { toast } from 'react-toastify';
import { login, reset } from '../features/auth/authSlice';
import LoadingScreen from '../components/LoadingScreen';

export default function Login() {
    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    );
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const { email, password } = formData;

    useEffect(() => {
        if (isError) toast.error(message);
        if (isSuccess || user) navigate('/');
        dispatch(reset());
    }, [user, isError, isSuccess, message, navigate, dispatch]);

    const handleChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const userData = {
            email,
            password,
        };
        dispatch(login(userData));
    };

    if (isLoading) return <LoadingScreen />;

    return (
        <Container>
            <div className="text-center py-8">
                <h1 className="text-2xl font-black text-black mb-4 flex items-center justify-center">
                    <LoginIcon className="w-7 h-7 mr-3" />
                    Login
                </h1>
            </div>
            <div className="max-w-lg mx-auto">
                <form action="" method="post" onSubmit={handleSubmit}>
                    <FormControl
                        name="email"
                        type="email"
                        value={email}
                        id="email"
                        labelText="Email"
                        onChange={handleChange}
                    />
                    <FormControl
                        name="password"
                        type="password"
                        value={password}
                        id="password"
                        labelText="Password"
                        onChange={handleChange}
                    />

                    <button className="w-full mt-5 block text-white bg-black rounded p-3 text-base font-medium">
                        Login
                    </button>
                </form>
            </div>
        </Container>
    );
}
