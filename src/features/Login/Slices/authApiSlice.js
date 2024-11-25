import { reqresApi } from "../../../store/api/apiSlice";
const authApiSlice = reqresApi.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (details) => ({
        url: "/login",
        method: "POST",
        body: details,
      }),
    }),
  }),
});

export const { useLoginUserMutation } = authApiSlice;
