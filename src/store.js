import { createStore , applyMiddleware } from 'redux'
import thunk from "redux-thunk"
import CombineStore from './reducers';

const store = createStore(CombineStore,{},applyMiddleware(thunk))

export default store;
