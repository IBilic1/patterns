import {configureStore} from '@reduxjs/toolkit';
import {rootReducer} from './reducer';
import {userApi} from "./query/user/User.query";
import {packageApi} from "./query/package/Package.query";
import {userContentApi} from "./query/user-content/UserContent.query";
import {userPackageApi} from "./query/user-package/UserPackage.query";
import {tagContentApi} from "./query/tag-content/TagContent.query";

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(userApi.middleware)
            .concat(packageApi.middleware)
            .concat(userContentApi.middleware)
            .concat(userPackageApi.middleware)
            .concat(tagContentApi.middleware)
});

export default store;