import { createSlice, Dispatch } from '@reduxjs/toolkit';
import camelcaseKeys from 'camelcase-keys';
import { AxiosResponse } from 'axios';
import { ICaseState } from '@/redux/types/case';
import { getAllCasesApi, getCaseApi } from '@/lib/apis/case';

const initialState: ICaseState = {
  isLoading: false,
  error: null,
  case: null,
  cases: null,
};

const slice = createSlice({
  name: 'case',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    getAllCasesSuccess(state, action) {
      state.isLoading = false;
      state.cases = action.payload.data;
    },

    getCaseSuccess(state, action) {
      state.isLoading = false;
      state.case = action.payload.data?.[0];
    },
  },
});

export default slice.reducer;

const { startLoading, hasError, getAllCasesSuccess, getCaseSuccess } = slice.actions;

export const getAllCases = () => async (dispatch: Dispatch) => {
  dispatch(startLoading());
  try {
    const { data }: AxiosResponse = await getAllCasesApi();
    dispatch(getAllCasesSuccess(camelcaseKeys(data, { deep: true })));
  } catch (error) {
    dispatch(hasError(error));
  }
};

export const getCase = (id: number) => async (dispatch: Dispatch) => {
  dispatch(startLoading());
  try {
    const { data }: AxiosResponse = await getCaseApi(id);
    dispatch(getCaseSuccess(camelcaseKeys(data, { deep: true })));
  } catch (error) {
    dispatch(hasError(error));
  }
};
