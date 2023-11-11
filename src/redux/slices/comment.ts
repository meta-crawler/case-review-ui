import { createSlice, Dispatch } from '@reduxjs/toolkit';
import camelcaseKeys from 'camelcase-keys';
import { AxiosResponse } from 'axios';
import { ICommentState, ILocalComment, ILocalCommentData } from '@/redux/types/comment';
import { getCommentsByCaseApi, updateCommentsApi } from '@/lib/apis/comment';

const initialState: ICommentState = {
  isLoading: false,
  error: null,
  comments: null,
  localComment: null,
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
      state.error = null;
      state.comments = action.payload.data;
      if (state.comments) {
        const localComment: ILocalCommentData = {
          comments: state.comments.map((comment) => ({
            id: comment.id,
            author: comment.author.id,
            case: Number(comment.case),
            comment: comment.comment,
          })),
        };
        state.localComment = localComment;
      }
    },

    setLocalCommentSuccess(state, action) {
      if (state.localComment) {
        state.localComment = { ...state.localComment, comments: action.payload };
      }
    },
  },
});

export default slice.reducer;

const { startLoading, hasError, getCommentsSuccess, setLocalCommentSuccess } = slice.actions;

export const getCommentsByCase = (caseId: number) => async (dispatch: Dispatch) => {
  dispatch(startLoading());
  try {
    const { data }: AxiosResponse = await getCommentsByCaseApi(caseId);
    dispatch(getCommentsSuccess(camelcaseKeys(data, { deep: true })));
  } catch (error) {
    dispatch(hasError(error));
  }
};

export const setLocalComment = (payload: ILocalComment[]) => async (dispatch: Dispatch) =>
  dispatch(setLocalCommentSuccess(payload));

export const updateComments = (payload: ILocalComment[]) => async (dispatch: Dispatch) => {
  dispatch(startLoading());
  try {
    const { data }: AxiosResponse = await updateCommentsApi(payload);
    dispatch(getCommentsSuccess(camelcaseKeys(data, { deep: true })));
  } catch (error) {
    dispatch(hasError(error));
  }
};
