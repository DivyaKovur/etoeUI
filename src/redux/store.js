import logger from 'redux-logger'
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from 'redux-saga'
import { appReducer } from './appReducer';
import rootSaga from './sagas/rootsaga';

const sagaMiddleware = createSagaMiddleware();
export const appStore = configureStore({
    reducer: {
        appReducer,
    },
    middleware: () => {
        return [logger, sagaMiddleware]
    }
});

sagaMiddleware.run(rootSaga)