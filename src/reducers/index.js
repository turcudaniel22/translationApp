import { combineReducers } from "redux";
import { default as userReducer } from "./userReducer";

 const CombineStore = combineReducers({ 
     userReducer,
 });

 export default CombineStore