import { connect } from "react-redux";
import React from "react";
import { actions } from "../store";
import { stringify } from "querystring";

class CreateStudent extends React.Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      GPA: "",
      enrolledAt: "",
      schoolId: "",
      error: ''
    };

    this.onChange = this.onChange.bind(this);
    this.Submit = this.Submit.bind(this);
  }

  onChange(ev) {
    
    if(ev.target.type === "select-one"){
      const selectedSchool = this.props.schools.find(schoolObj => schoolObj.name === ev.target.value);
      this.setState({enrolledAt: selectedSchool.name, schoolId: selectedSchool.id})
    }
    this.setState({ [ev.target.name]: ev.target.value });
  }

  Submit() {
    const { firstName, lastName, email, GPA, schoolId  } = this.state;
    
    this.props
      .create({ firstName, lastName, email, GPA, schoolId })
      .then(() => this.props.history.push("/"))
      .catch(ex => {
        let error = [];
        error = ex.response.data.error.errors.map( _error => _error.message)
        this.setState({ error});
      }
        
        );
  }

  render() {
    const { firstName, lastName, email, GPA, enrolledAt, error } = this.state;
    const { schools } = this.props;
    const { onChange, Submit } = this;

    // console.log(this.state);
    return (
      <div id="newStudentForm">
        <div>
          <label>First Name</label>
          <input
            name="firstName"
            value={firstName}
            onChange={onChange}
            placeholder="Enter First Name"
            // required
          />
        </div>
        <div>
          <label>Last Name</label>
          <input
            name="lastName"
            value={lastName}
            onChange={onChange}
            placeholder="Enter Last Name"
            // required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            name="email"
            type="email"
            value={email}
            onChange={onChange}
            placeholder="Enter Email"
            // required
          />
        </div>
        <div>
          <label>GPA</label>
          <input
            name="GPA"
            value={GPA}
            type="number"
            step="0.1"
            min="0"
            max="4.00"
            onChange={onChange}
            // required
          />
        </div>
        <div>
          <label>Enrolled At</label>
          <select
            name="enrolledAt"
            
            value={enrolledAt}
            onChange={onChange}
            // required
          >
            <option key="notEnrolled" value="Not Enrolled">
              Not Enrolled
            </option>
            {schools.map(school => (
              <option key={school.id} name="school.id" value={school.name}>
                {school.name}
              </option>
            ))}
          </select>
        </div>
        <div>
        <button onClick={Submit}>Save</button>
        {error && <div className="error-box"> {error.map(_error => <p>{_error}</p>
        )} </div>}
      </div></div>
    );
  }
}

const mapStateToProps = ({ schools }) => {
  return { schools };
};

const mapDispatchToProps = dispatch => {
  return {
    create: student => dispatch(actions.createStudent(student))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateStudent);
