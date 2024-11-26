import { reqresApi } from "../../../store/api/apiSlice";
const authApiSlice = reqresApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/users",
    }),
  }),
});

export const { useGetUsersQuery } = authApiSlice;
