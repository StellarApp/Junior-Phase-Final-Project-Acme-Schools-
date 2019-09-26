import { connect } from "react-redux";
import React from "react";

const Schools = ({ schools, students }) => {
  return (
    <div>
      {schools.map(school => (
        <div key={school.id}>
          <h4>{school.name}</h4>
          <div>{school.img}</div>
          <div>Student Count: {school.students.length}</div>
          <select>
            <option value="addStudent">--Add Student--</option>
            {students
              .filter(student => student.schoolId !== school.id)
              .map(student => (
                <option
                  key={student.id}
                  value={`${student.firstName} ${student.lastName}`}
                >
                  {student.firstName} {student.lastName}
                </option>
              ))}
          </select>
        </div>
      ))}
    </div>
  );
};

export default connect(({ schools, students }) => {
  return { schools, students };
})(Schools);
