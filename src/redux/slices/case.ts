import { createSlice, Dispatch } from '@reduxjs/toolkit';
import camelcaseKeys from 'camelcase-keys';
import { AxiosResponse } from 'axios';
import { ICaseState, ILocalCase, ILocalCaseData, IUpdateCase } from '@/redux/types/case';
import {
  getAllCasesApi,
  getCaseApi,
  getCasesByAuthorityApi,
  updateCaseApi,
  updateCaseReviewForCaseApi,
} from '@/lib/apis/case';

const initialState: ICaseState = {
  isLoading: false,
  error: null,
  case: null,
  cases: null,
  localCase: null,
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

    getCasesSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.cases = action.payload.data;
    },

    getCaseSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.case = action.payload.data?.[0];
      if (state.case) {
        const localCase: ILocalCaseData = {
          caseReview: {
            id: state.case.caseReview.id,
            authority: state.case.caseReview.authority.id,
            assigner: state.case.caseReview.assigner.id,
            status: state.case.caseReview.status.id,
          },
        };
        state.localCase = localCase;
      }
    },

    setLocalCaseSuccess(state, action) {
      if (state.localCase) {
        state.localCase = { ...state.localCase, [action.payload.field]: action.payload.data };
      }
    },
  },
});

export default slice.reducer;

const { startLoading, hasError, getCasesSuccess, getCaseSuccess, setLocalCaseSuccess } =
  slice.actions;

export const getAllCases = () => async (dispatch: Dispatch) => {
  dispatch(startLoading());
  try {
    const { data }: AxiosResponse = await getAllCasesApi();
    dispatch(getCasesSuccess(camelcaseKeys(data, { deep: true })));
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

export const getCasesByAuthority =
  (authorityId: number = -1) =>
  async (dispatch: Dispatch) => {
    dispatch(startLoading());
    try {
      const { data }: AxiosResponse = await getCasesByAuthorityApi(authorityId);
      dispatch(getCasesSuccess(camelcaseKeys(data, { deep: true })));
    } catch (error) {
      dispatch(hasError(error));
    }
  };

export const setLocalCase =
  (payload: { field: string; data: ILocalCase }) => async (dispatch: Dispatch) =>
    dispatch(setLocalCaseSuccess(payload));

export const updateCaseReview = (caseReview: ILocalCase) => async (dispatch: Dispatch) => {
  dispatch(startLoading());
  try {
    const { data }: AxiosResponse = await updateCaseReviewForCaseApi(caseReview);
    dispatch(getCaseSuccess(camelcaseKeys(data, { deep: true })));
  } catch (error) {
    dispatch(hasError(error));
  }
};

export const updateCase = (updatedCase: IUpdateCase) => async (dispatch: Dispatch) => {
  dispatch(startLoading());
  try {
    const { data }: AxiosResponse = await updateCaseApi(updatedCase);
    dispatch(getCaseSuccess(camelcaseKeys(data, { deep: true })));
  } catch (error) {
    dispatch(hasError(error));
  }
};
