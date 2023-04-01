import {legacy_createStore as createStore,applyMiddleware} from "redux";
import thunk from 'redux-thunk';
import allReducers from './reducers';
import {composeWithDevTools} from 'redux-devtools-extension';
import {persistReducer,persistStore} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig ={
    key:"root",
    storage:storage,
    blacklist:[]
}
const persistReducers = persistReducer(persistConfig,allReducers);
const store = createStore(persistReducers,composeWithDevTools(applyMiddleware(thunk)));
const persistor = persistStore(store);

export {store,persistor}

