import { combineReducers } from "redux";
import { SET_SCHOOLS, SET_STUDENTS } from "./constants";

const schoolReducer = (state = [], action) => {
  switch (action.type) {
    case SET_SCHOOLS:
      return action.schools;
      break;
  }
  return state;
};
const studentReducer = (state = [], action) => {
  switch (action.type) {
    case SET_STUDENTS:
      return action.students;
    // default:
    //   return state;
  }
  return state;
};

const reducer = combineReducers({
  schools: schoolReducer,
  students: studentReducer
});
export default reducer;
