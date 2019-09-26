import { connect } from "react-redux";
import React from "react";
import { actions } from "../store";

// class Students extends React.Component{
//   constructor(){
//     super(),
//     this.state= {
//       schoolId: ''
//     }

//     this.onChange = this.onChange.bind(this);
//   }
//   componentDidUpdate(){
//     this.props.students.schoolId = this.state.schoolId;
//   }

//   onChange(ev){
//     this.setState({schoolId: ev.target.value})
//   }

//   render(){
//     const {students} = this.props
//     return (
//       <div>
//         {students.map(student => {
//           // const _schoolId = student.schoolId
//           // const _schoolName = schools.find(s => s.id === _schoolId).name;
//           return (
//             <div key ={student.id}>{student.name}</div>
//           // <div key={student.id} className="box-student">
//           //   <h4>
//           //     {student.firstName} {student.lastName}
//           //   </h4>
//           //   <div> GPA: {student.GPA}</div>
//           //   <select onChange = {this.onChange}>
//           //     <option key={student.id} value={_schoolId} defaultValue> {_schoolName}</option>
//           //     <option key="notEnrolled" value="Not Enrolled">
//           //       Not Enrolled
//           //     </option>
//           //     {schools.filter(x=> x.id !== _schoolId).map(school => (
//           //       <option key={school.id} value={school.id}>{school.name}</option>
//           //     ))}
//           //   </select>
//           //   <button onClick={() => this.props.deleteStudent(student)}>Delete</button>
//           // </div>
//         )}
//         )}
//       </div>
//     );
//   }
// }

const Students = ({ students, schools, deleteStudent, updateStudent }) => {
  return (
    <div>
      {students.map(student => {
        const _schoolId = student.schoolId;
        const _schoolName = schools.find(s => s.id === _schoolId).name;
        return (
          <div key={student.id} className="box-student">
            <h4>
              {student.firstName} {student.lastName}
            </h4>
            <div> GPA: {student.GPA}</div>
            <select onChange={ev => updateStudent(student, ev.target.value)}>
              <option key={student.id} value={_schoolId} defaultValue> {_schoolName} </option>
              <option key="notEnrolled" value="Not Enrolled">
                Not Enrolled
              </option>
              {schools
                .filter(x => x.id !== _schoolId)
                .map(school => (
                  <option key={school.id} value={school.id}>
                    {school.name}
                  </option>
                ))}
            </select>
            <button onClick={() => deleteStudent(student)}>Delete</button>
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
      // updateStudent: student => dispatch(actions.updateStudent(student))
      updateStudent: (student, newSchoolName) => dispatch(actions.updateStudent(student, newSchoolName))
    };
  }
)(Students);
