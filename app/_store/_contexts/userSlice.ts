import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../_types/User';

interface userState {
  currentUser: User;
}

const initialState: userState = {
  currentUser: {
    username: ' ',
    email: '',
    password: '',
    role: '',
    profilePic: '',
  },
};
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateAuthInfo: (state, action: PayloadAction<Partial<User>>) => {
      if (state.currentUser) {
        state.currentUser = { ...state.currentUser, ...action.payload };
      }
    },
  },
});

export const { updateAuthInfo } = userSlice.actions;
export default userSlice.reducer;
