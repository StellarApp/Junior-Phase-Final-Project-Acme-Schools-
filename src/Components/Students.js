import { connect } from "react-redux";
import React from "react";
import { actions } from "../store";

const Students = ({ students, schools, deleteStudent, updateStudent }) => {

  return (
    <div className="body-content">
      {students.map(student => {
        const _schoolId = student.schoolId;
        const _schoolName = schools.find(s => s.id === _schoolId).name;
        const _schoolImg = schools.find(s => s.id === _schoolId).imgURL;
        return (
          <div key={student.id} className="box-student">
            <h4>
              {student.firstName} {student.lastName}
            </h4>
              {(_schoolImg)? <img src={`${_schoolImg}`} alt={`${_schoolName}`} /> : ''}
            <div> GPA: {student.GPA}</div>
            <div><select
              onChange={({ target }) => updateStudent(student.id, target.value)}
            >
              <option key={student.id} value={_schoolId} defaultValue>
                {_schoolName}
              </option>
              {schools
                .filter(x => x.id !== _schoolId)
                .map(school => (
                  <option key={school.id} value={school.id}>
                    {school.name}
                  </option>
                ))}
            </select></div>
            <div><button onClick={() => deleteStudent(student)}>Delete</button></div>
            
          </div>
        );
      })}
    </div>
  );
};

export default connect(
  ({ students, schools }, { match }) => {
    let filtered = students;

    if (match.params.id) {
      const search = match.params.id;
      filtered = students.filter(student => student.schoolId == search);
    }
    return { students: filtered, schools };
  },
  dispatch => {
    return {
      deleteStudent: student => dispatch(actions.deleteStudent(student)),
      updateStudent: (id, schoolId) =>
        dispatch(actions.updateStudent(id, schoolId))
    };
  }
)(Students);
