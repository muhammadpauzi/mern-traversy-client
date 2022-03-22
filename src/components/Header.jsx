import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout, reset } from '../features/auth/authSlice';
import Container from './Container';

export default function Header() {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        dispatch(reset());
        navigate('/login');
    };

    return (
        <Container>
            <div className="flex items-center justify-between py-5">
                <Link to="/" className="text-black font-black text-xl">
                    Goals
                </Link>

                <ul className="flex items-center space-x-2">
                    {user ? (
                        <li>
                            <button
                                onClick={handleLogout}
                                className="px-3 py-2 bg-black text-white block rounded font-medium text-sm"
                            >
                                Logout
                            </button>
                        </li>
                    ) : (
                        <>
                            <li>
                                <Link
                                    to="/login"
                                    className="px-3 py-2 bg-black text-white block rounded font-medium text-sm"
                                >
                                    Login
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/register"
                                    className="px-3 py-2 bg-white border border-black text-black block rounded font-medium text-sm"
                                >
                                    Register
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </Container>
    );
}
