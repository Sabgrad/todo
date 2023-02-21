import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { todoApi, todoCategoriesApi } from "../services/TodoService";
import currentCategotyReducer from "./reducers/CurrentCategotySlice";

const rootReducer = combineReducers({
    [todoApi.reducerPath]: todoApi.reducer,
    [todoCategoriesApi.reducerPath]: todoCategoriesApi.reducer,
    currentCategotyReducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => (
            getDefaultMiddleware().concat([
                todoApi.middleware,
                todoCategoriesApi.middleware
            ])
        )
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']