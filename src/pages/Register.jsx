import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { UserAddIcon } from '@heroicons/react/solid';
import Container from '../components/Container';
import FormControl from '../components/FormControl';
import { toast } from 'react-toastify';
import { register, reset } from '../features/auth/authSlice';
import LoadingScreen from '../components/LoadingScreen';

export default function Register() {
    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    );
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
    });
    const { name, email, password, password2 } = formData;

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

        if (password !== password2)
            return toast.error('Passwords do not match');

        const userData = {
            name,
            email,
            password,
        };
        dispatch(register(userData));
    };

    if (isLoading) return <LoadingScreen />;

    return (
        <Container>
            <div className="text-center py-8">
                <h1 className="text-2xl font-black text-black mb-4 flex items-center justify-center">
                    <UserAddIcon className="w-7 h-7 mr-3" />
                    Create an account
                </h1>
            </div>
            <div className="max-w-lg mx-auto">
                <form action="" method="post" onSubmit={handleSubmit}>
                    <FormControl
                        name="name"
                        type="text"
                        autoFocus
                        value={name}
                        id="name"
                        labelText="Name"
                        onChange={handleChange}
                    />
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
                    <FormControl
                        name="password2"
                        type="password"
                        value={password2}
                        id="password2"
                        labelText="Password Confirmation"
                        onChange={handleChange}
                    />
                    <button className="w-full mt-5 block text-white bg-black rounded p-3 text-base font-medium">
                        Create account
                    </button>
                </form>
            </div>
        </Container>
    );
}
