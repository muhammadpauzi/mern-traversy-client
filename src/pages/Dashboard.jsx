import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Container from '../components/Container';
import LoadingScreen from '../components/LoadingScreen';
import GoalForm from '../components/GoalForm';
import GoalItem from '../components/GoalItem';
import { getGoals } from '../features/goals/goalSlice';
import { reset } from '../features/auth/authSlice';

export default function Dashboard() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { goals, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.goals
    );

    useEffect(() => {
        if (isError) console.log(isError);

        if (!user) navigate('/login');

        dispatch(getGoals());

        return () => {
            dispatch(reset());
        };
    }, [user, navigate]);

    if (isLoading) return <LoadingScreen />;

    return (
        <Container>
            <div className="py-10 text-center">
                <h1 className="text-2xl text-black font-black mb-4 block">
                    Welcome {user && user.name}
                </h1>
                <p className="text-md text-gray-700 font-medium">
                    Goals Dashboard
                </p>
            </div>

            <GoalForm />

            <div className="max-w-xl mx-auto mt-16 mb-44">
                <h2 className="text-lg text-black mb-3 block font-bold">
                    Goals List
                </h2>
                {goals.length > 0 ? (
                    <div className="space-y-2">
                        {goals.map((goal) => (
                            <GoalItem key={goal._id} goal={goal} />
                        ))}
                    </div>
                ) : (
                    <h3 className="text-base font-medium text-red-500 py-10">
                        You have not set any goals
                    </h3>
                )}
            </div>
        </Container>
    );
}
