import { reqresApi } from "../../../store/api/apiSlice";
const authApiSlice = reqresApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/users",
    }),

    //testing
    createUser: builder.mutation({
      query: (data) => ({ url: `/register`, method: "POST", body: data }),
    }),
  }),
});

export const { useGetUsersQuery } = authApiSlice;
