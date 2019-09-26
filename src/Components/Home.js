const { NavLink } = require("react-router-dom");
const React = require("react");
const { connect } = require("react-redux");
import mapStateToProps from '../store/mapper';

const Home = ({count_schools, count_students, maxStudents, popularSchool, maxGPA, topSchool}) => {
    return(
        <div>This is Home</div>
    )
}

const mapToStateProps = ({schools, students}) => {
    return {schools, students}
}
export default connect(mapStateToProps)(Home);