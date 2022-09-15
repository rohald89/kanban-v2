import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../../app/api/apiSlice';

const boardsAdapter = createEntityAdapter({});

const initialState = boardsAdapter.getInitialState();

export const boardsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBoards: builder.query({
      query: () => ({
        url: '/boards',
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData) => {
        const loadedBoards = responseData.map((board) => {
          board.id = board._id;
          return board;
        });
        return boardsAdapter.setAll(initialState, loadedBoards);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: 'Board', id: 'LIST' },
            ...result.ids.map((id) => ({ type: 'Board', id })),
          ];
        }
        return [{ type: 'Board', id: 'LIST' }];
      },
    }),
  }),
});

export const { useGetBoardsQuery } = boardsApiSlice;

export const selectBoardsResult = boardsApiSlice.endpoints.getBoards.select();

// create memoized selector
const selectBoardsData = createSelector(
  selectBoardsResult,
  (boardsResult) => boardsResult.data // normalized state object with ids and entities
);
console.log(selectBoardsData);
export const { selectAll: selectAllBoards } = boardsAdapter.getSelectors(
  (state) => selectBoardsData(state) || initialState
);
