import axios from 'axios';
import {SET_STUDENTS, SET_SCHOOLS, CREATE_STUDENT, UPDATE_STUDENT, DELETE_STUDENT} from './constants';

const set_students = (students) => {
    return({
        type: SET_STUDENTS,
        students
    })
}
const set_schools = (schools) => {
    return({
        type: SET_SCHOOLS,
        schools
    })
}

const create_student = (student) => {
    return({
        type: CREATE_STUDENT,
        student
    })
}

const delete_student = (student) => {
    return({
        type: DELETE_STUDENT,
        student 
    })
}

const update_student = (student) => {
    return({
        type: UPDATE_STUDENT,
        student
    })
}

const fetchStudents = () => {
    return( async (dispatch) => {
        const students = (await axios.get('/api/students')).data;
        return dispatch(set_students(students));
    })
}

const fetchSchools = () => {
    return( async (dispatch) => {
        const schools = (await axios.get('/api/schools')).data;
        return dispatch(set_schools(schools));
    })
}

const createStudent = (student) => {
    return( async (dispatch) => {
        await axios.post('/api/students', student);
        const students = (await axios.get('/api/students')).data;
        return dispatch(create_student(students));
    })
}

const deleteStudent = (student) => {
    return( async dispatch =>{
        await axios.delete(`/api/students/${student.id}`)
        return dispatch(delete_student(student))
    })
}

const updateStudent = (student, newSchoolId) => {
    // console.log(newSchoolId)
    student.schoolId = newSchoolId
    // console.log(student)

    // return( dispatch => {
    //     axios.put(`/api/students/${student.id}`, student)
    //     .then(response => response.data)
    //     .then( _student => dispatch(update_student(_student)))
    // })
    return (async dispatch => {
        await axios.put(`/api/students/${student.id}, student`)
        const students = await axios.get('/api/students').data;
        return dispatch(update_student(students))
    })
}


export {fetchSchools, fetchStudents, createStudent, deleteStudent, updateStudent}