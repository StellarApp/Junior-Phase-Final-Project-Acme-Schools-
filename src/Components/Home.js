const { NavLink } = require("react-router-dom");
const React = require("react");
const { connect } = require("react-redux");
// import mapStateToProps from '../store/mapper';

const Home = ({popularSchool, maxStudents, topSchool, maxGPA}) => {
    return(
        <div>
            <div>Our most popular school is {popularSchool.name} with {maxStudents} students</div>
            <div>Our top performing shool is {topSchool.name} with an average GPA of {maxGPA}</div>
        </div>
    )
}



const mapStateToProps = ({ schools, students }) => {
  const maxStudents = Math.max(
    ...schools.map(school => school.students.length)
  );

  //select first ele as the most popular school
  const popularSchool = {
    ...schools.find(ele => ele.students.length === maxStudents)
  };

  //calculate the avg. GPA for each school
  schools.forEach(school => {
    const noOfStudents = school.students.length;
    const sumOfGPA = school.students.reduce(
      (accum, ele) => (accum += ele.GPA *1),
      0
    );
    school.avgGPA = noOfStudents
      ? Math.floor((sumOfGPA / noOfStudents) * 10) / 10
      : "N/A";
  });

  //calculate the max of average GPA and find the top university
  const maxGPA = schools.reduce(
    (accum, ele) =>
      accum >= ele.avgGPA || ele.avgGPA === "N/A" ? accum : ele.avgGPA,
    0
  );
  const topSchool = {
    ...schools.filter(school => school.avgGPA === maxGPA)[0]
  };

  return {
    popularSchool,
    maxStudents,
    topSchool,
    maxGPA
  };
};

// const mapStateToProps = ({schools, students}) => {
 
//      return {schools, students}
//  }

export default connect(mapStateToProps)(Home);