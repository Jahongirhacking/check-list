import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { backendBaseUrl } from "../../utils/config";
import { ITaskState } from "./taskSlice";
import { IUserState } from "./userSlice";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: backendBaseUrl,
  }),
  endpoints: (builder) => ({
    getTasks: builder.mutation({
      query: ({ userId }: { userId: Required<IUserState>["id"] }) => ({
        url: "/get-tasks",
        method: "POST",
        body: { userId },
      }),
    }),
    createGist: builder.mutation({
      query: ({
        userId,
        firstname,
        lastname,
        tasks,
      }: {
        userId: Required<IUserState>["id"];
        firstname: Required<IUserState>["first_name"];
        lastname: Required<IUserState>["last_name"];
        tasks: Required<ITaskState>["tasks"];
      }) => ({
        url: "/create-gist",
        method: "POST",
        body: { userId, firstname, lastname, tasks },
      }),
    }),
    editGist: builder.mutation({
      query: ({
        userId,
        gistId,
        tasks,
      }: {
        userId: Required<IUserState>["id"];
        gistId: string;
        tasks: ITaskState["tasks"];
      }) => ({
        url: "/edit-gist",
        method: "PATCH",
        body: { userId, gistId, tasks },
      }),
    }),
    getGist: builder.mutation({
      query: ({ gistId }: { gistId: string }) => ({
        url: "/get-gist",
        method: "POST",
        body: { gistId },
      }),
    }),
  }),
});

export const {
  useGetTasksMutation,
  useCreateGistMutation,
  useEditGistMutation,
  useGetGistMutation,
} = apiSlice;
