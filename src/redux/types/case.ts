import { ICase } from '@/types/case';

export interface ICaseState {
  isLoading: boolean;
  error: Error | string | null;
  case: ICase | null;
  cases: ICase[] | null;
}
