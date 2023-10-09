import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { useDispatch } from "react-redux";
import searchReducer from '@/features/search/searchSlice';

const rootReducer = combineReducers({
    search: searchReducer,
})

const store = configureStore({
    reducer: rootReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()

export default store;