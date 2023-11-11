import { ICase } from '@/types/case';

export interface ILocalCase {
  id: number;
  authority: number;
  assigner: number;
  status: number;
}

export interface IUpdateCase {
  id: number;
  alert: number;
  status: number;
  authority: number;
  caseReview: number;
}

export interface ILocalCaseData {
  caseReview: ILocalCase;
}

export interface ICaseState {
  isLoading: boolean;
  error: Error | string | null;
  case: ICase | null;
  cases: ICase[] | null;
  localCase: ILocalCaseData | null;
}
