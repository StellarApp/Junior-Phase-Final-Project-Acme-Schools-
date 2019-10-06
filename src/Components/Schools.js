import { connect } from "react-redux";
import React from "react";
import { actions } from "../store";
import { expression } from "@babel/template";

const Schools = ({ schools, students , updateStudent, location}) => {
 
  return (
    <div className="body-content">
      {schools.filter(school => school.name !== "Not Enrolled").map(school => (
        <div key={school.id}>
          <a href={`#${location.pathname}/${school.id}`}><h4>{school.name}</h4></a>
          <div><img src={`${school.imgURL}`} alt={`${school.name}`} /></div>
          <div>Student Count: {school.students.length}</div>
          <div>
          <select onChange = {({target}) => updateStudent(target.value, school.id)}>
            <option value="addStudent">--Add Student--</option>
            {students
              .filter(student => student.schoolId !== school.id)
              .map(student => (
                <option
                  key={student.id}
                  value={student.id}
                >
                  {student.firstName} {student.lastName}
                </option>
              ))}
          </select></div>
        </div>
      ))}
    </div>
  );
};

export default connect(({ schools, students },{history}) => {
  
  return { schools, students, location: history.location};
}, dispatch => {
  return {
    updateStudent:(id, schoolId) => dispatch(actions.updateStudent(id, schoolId))
  };
})(Schools);
