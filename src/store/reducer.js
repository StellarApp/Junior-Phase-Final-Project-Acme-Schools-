import { combineReducers } from "redux";
import {
  SET_STUDENTS,
  DELETE_STUDENT,
  UPDATE_STUDENT,
  CREATE_STUDENT,
  SET_SCHOOLS
} from "./constants";

const schoolReducer = (state = [], action) => {
  switch (action.type) {
    case SET_SCHOOLS:
      return action.schools;
    
  } 
  return state;
};

const studentReducer = (state = [], action) => {
  switch (action.type) {
    case SET_STUDENTS:
      return action.students;
    case DELETE_STUDENT:
      return state.filter(_student => _student.id !== action.student.id);
    case UPDATE_STUDENT:
      return state.map(_student => (_student.id === action.student.id)? action.student : _student)
    case CREATE_STUDENT:
      return [...state, action.student];
  }
  return state;
};

const reducer = combineReducers({
  schools: schoolReducer,
  students: studentReducer
});
export default reducer;
