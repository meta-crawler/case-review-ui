import { createSlice, Dispatch } from '@reduxjs/toolkit';
import camelcaseKeys from 'camelcase-keys';
import { AxiosResponse } from 'axios';
import { ICommentState } from '@/redux/types/comment';
import { getCommentsByCaseApi } from '@/lib/apis/comment';

const initialState: ICommentState = {
  isLoading: false,
  error: null,
  comments: null,
};

const slice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    getCommentsSuccess(state, action) {
      state.isLoading = false;
      state.comments = action.payload.data;
    },
  },
});

export default slice.reducer;

const { startLoading, hasError, getCommentsSuccess } = slice.actions;

export const getCommentsByCase = (caseId: number) => async (dispatch: Dispatch) => {
  dispatch(startLoading());
  try {
    const { data }: AxiosResponse = await getCommentsByCaseApi(caseId);
    dispatch(getCommentsSuccess(camelcaseKeys(data, { deep: true })));
  } catch (error) {
    dispatch(hasError(error));
  }
};
