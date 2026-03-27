import { configureStore } from "@reduxjs/toolkit";
import { useSlice } from "./ui/useSlice";
import { calendarSlice } from "./ui/calendarSlice";
import { authSlice } from "./auth/authSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    ui: useSlice.reducer,
    calendar:calendarSlice.reducer
  },
  middleware: ( getDefaulMiddleware ) => getDefaulMiddleware({
    serializableCheck: false,
  })
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;