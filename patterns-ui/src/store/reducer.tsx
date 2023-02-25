import {combineReducers} from '@reduxjs/toolkit';
import {userApi} from "./query/user/User.query";
import {packageApi} from "./query/package/Package.query";
import {userContentApi} from "./query/user-content/UserContent.query";
import {userPackageApi} from "./query/user-package/UserPackage.query";
import {tagContentApi} from "./query/tag-content/TagContent.query";


const pagesReducers = {
    [userApi.reducerPath]: userApi.reducer,
    [packageApi.reducerPath]: packageApi.reducer,
    [userPackageApi.reducerPath]: userPackageApi.reducer,
    [userContentApi.reducerPath]: userContentApi.reducer,
    [tagContentApi.reducerPath]: tagContentApi.reducer,
};
const sharedReducers = {};

export const rootReducer = combineReducers({
    ...pagesReducers,
    ...sharedReducers,
});

export type RootState = ReturnType<typeof rootReducer>;