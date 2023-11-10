import { createSlice, Dispatch } from '@reduxjs/toolkit';
import camelcaseKeys from 'camelcase-keys';
import { AxiosResponse } from 'axios';
import { IUserState } from '@/redux/types/user';
import { getUserListApi } from '@/lib/apis/user';

const initialState: IUserState = {
  isLoading: false,
  error: null,
  users: null,
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    getUserListSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.users = action.payload.data;
    },
  },
});

export default slice.reducer;

const { startLoading, hasError, getUserListSuccess } = slice.actions;

export const getUserList = () => async (dispatch: Dispatch) => {
  dispatch(startLoading());
  try {
    const { data }: AxiosResponse = await getUserListApi();
    dispatch(getUserListSuccess(camelcaseKeys(data, { deep: true })));
  } catch (error) {
    dispatch(hasError(error));
  }
};
