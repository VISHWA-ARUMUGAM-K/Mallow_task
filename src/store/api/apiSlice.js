import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const reqresApi = createApi({
  reducerPath: "reqresApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://reqres.in/api" }),
  endpoints: () => ({}),
});
