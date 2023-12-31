import { SliceCaseReducers } from '@reduxjs/toolkit';

export { createSlice } from '@reduxjs/toolkit';

export const createReducers: (
  stateKeyName?: string,
  overwriteReducers?: SliceCaseReducers<unknown>
) => SliceCaseReducers<unknown> = (stateKeyName = '', overwriteReducers) => ({
  _REQUEST: () => ({ loading: true }),
  _SUCCESS: (_: AppState, action: ActionRedux) => {
    // noname saved state?
    return stateKeyName === '...'
      ? {
          ...action.payload, // Array? => destructuring e.g. { a:1, b:2, c:3, loading, success }
          loading: false,
          success: true
        }
      : {
          [stateKeyName]: action.payload, // e.g. { state[a]:1, loading, success }
          loading: false,
          success: true
        };
  },
  _FAIL: (_: AppState, action: ActionRedux) => ({
    loading: false,
    error: action.payload
  }),
  _RESET: () => ({}),
  ...overwriteReducers
});

export const adapter: FnType = (name: string, initialState: unknown, reducers: SliceCaseReducers<unknown>) => ({
  initialState,
  reducers,
  name
});
