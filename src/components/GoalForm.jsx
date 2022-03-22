import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { PencilIcon } from '@heroicons/react/solid';
import Container from './Container';
import FormControl from './FormControl';
import { toast } from 'react-toastify';
import { createGoal } from '../features/goals/goalSlice';

export default function Register() {
    const dispatch = useDispatch();
    const { messageSuccess } = useSelector((state) => state.goals);
    const [text, setText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createGoal({ text }));
        if (messageSuccess) toast.success(messageSuccess);
        setText('');
    };

    return (
        <Container>
            <div className="text-center py-8">
                <h1 className="text-md font-black text-black mb-4 flex items-center justify-center">
                    <PencilIcon className="w-7 h-7 mr-3" />
                    Create a Goal
                </h1>
            </div>
            <div className="max-w-lg mx-auto">
                <form action="" method="post" onSubmit={handleSubmit}>
                    <FormControl
                        name="text"
                        type="text"
                        autoFocus
                        value={text}
                        id="text"
                        labelText="Text"
                        onChange={(e) => setText(e.target.value)}
                    />

                    <button className="w-full mt-5 block text-white bg-black rounded p-3 text-base font-medium">
                        Create goal
                    </button>
                </form>
            </div>
        </Container>
    );
}
