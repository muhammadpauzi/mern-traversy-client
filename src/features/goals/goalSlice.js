import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import goalService from './goalService';

const initialState = {
    goals: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    messageSuccess: '',
    message: '',
};

export const getGoals = createAsyncThunk(
    'goals/getGoals',
    async (goalData, thunkAPI) => {
        try {
            const { token } = thunkAPI.getState().auth.user;
            return await goalService.getGoals(token);
        } catch (error) {
            const message =
                error?.response?.data?.message ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const createGoal = createAsyncThunk(
    'goals/create',
    async (goalData, thunkAPI) => {
        try {
            const { token } = thunkAPI.getState().auth.user;
            return await goalService.createGoal(goalData, token);
        } catch (error) {
            const message =
                error?.response?.data?.message ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const deleteGoal = createAsyncThunk(
    'goals/delete',
    async (goalData, thunkAPI) => {
        try {
            const { token } = thunkAPI.getState().auth.user;
            return await goalService.deleteGoal(goalData, token);
        } catch (error) {
            const message =
                error?.response?.data?.message ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

const goalSlice = createSlice({
    name: 'goal',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            // get goals
            .addCase(getGoals.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getGoals.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.goals = action.payload.data;
                state.messageSuccess = action.payload.message || '';
            })
            .addCase(getGoals.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.goals = [];
                state.message = action.payload;
            })
            // create goal
            .addCase(createGoal.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createGoal.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.goals = [...state.goals, action.payload.data];
                state.messageSuccess = action.payload.message || '';
            })
            .addCase(createGoal.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.goals = [];
                state.message = action.payload;
            })
            // delete goal
            .addCase(deleteGoal.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteGoal.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.goals = state.goals.filter(
                    (goal) => goal._id !== action.payload.goalId
                );
            })
            .addCase(deleteGoal.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.goals = [];
                state.message = action.payload;
            });
    },
});

export const { reset } = goalSlice.actions;
export default goalSlice.reducer;
