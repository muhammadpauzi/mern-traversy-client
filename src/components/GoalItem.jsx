import { XIcon } from '@heroicons/react/solid';
import { useDispatch } from 'react-redux';
import { deleteGoal, getGoals } from '../features/goals/goalSlice';

export default function GoalItem({ goal }) {
    const dispatch = useDispatch();
    return (
        <div className="w-full block border-2 border-gray-200 px-4 py-5 rounded">
            <div className="flex items-center justify-between">
                <small className="text-xs block mb-3 text-gray-600">
                    {new Date(goal.createdAt).toLocaleString('en-US')}
                </small>
                <button
                    onClick={() => {
                        dispatch(deleteGoal(goal._id));
                    }}
                >
                    <XIcon className="w-6 h-6 text-red-500" />
                </button>
            </div>
            <h2 className="text-base font-medium text-black">{goal.text}</h2>
        </div>
    );
}
