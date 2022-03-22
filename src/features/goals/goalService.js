import axios from '../../axios';

const getGoals = async (token) => {
    const res = await axios.get('/goals', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
};

const createGoal = async (goalData, token) => {
    const res = await axios.post('/goals', goalData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
};

const updateGoal = async (goalData) => {
    const res = await axios.put('/goals/' + goalData.id, goalData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
};

const deleteGoal = async (goalId, token) => {
    const res = await axios.delete('/goals/' + goalId, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return { ...res.data, goalId };
};

const goalService = {
    getGoals,
    createGoal,
    updateGoal,
    deleteGoal,
};

export default goalService;
