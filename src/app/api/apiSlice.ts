import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials } from '../../features/auth/authSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:5000/api',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const { token } = getState().auth;

    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  // first try to make the initial request
  let result = await baseQuery(args, api, extraOptions);

  // if the initial request comes back with a 403 the AccessToken has expired
  // sending a request with the refresh token to get a new one
  if (result?.error?.status === 403) {
    console.log('sending refresh token');

    // send refresh token to get a new access token
    const refreshResult = await baseQuery('/auth/refresh', api, extraOptions);

    if (refreshResult?.data) {
      //store the new token
      api.dispatch(setCredentials({ ...refreshResult.data }));
      // retry original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      // if the refresh token has expired
      if (refreshResult?.error?.status === 403) {
        refreshResult.error.data.message = 'Your login has expired.';
      }
      return refreshResult;
    }
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User'],
  endpoints: (builder) => ({}),
});
