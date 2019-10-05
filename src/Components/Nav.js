const { NavLink } = require("react-router-dom");
const React = require("react");
const { connect } = require("react-redux");
// import mapStateToProps from ('../store/mapper') ;

const Nav = ({count_schools, count_students, maxStudents, popularSchool, maxGPA, topSchool}) => {
  return (
    <div>
      <h2>ACME Schools</h2>
      <div className="nav">
        <NavLink to="/" exact >Acme Schools</NavLink>
        <NavLink exact to="/schools">Schools({count_schools})</NavLink>
        <NavLink exact to="/students">Students({count_students})</NavLink>
        <NavLink to={`/schools/${popularSchool.id}`}>Most Popular [{popularSchool.name}] ({maxStudents})</NavLink>
        <NavLink to={`/schools/${topSchool.id}`}>Top School [{topSchool.name}] ({maxGPA})</NavLink>
      </div>
        
    </div>
  );
};

const mapStateToProps = ({ schools, students }) => {
  const maxStudents = Math.max(
    ...schools.map(school => school.students.length)
  );

  // //popularSchool can be more than one
  // const popularSchool = schools.reduce((accum, ele)=>{
  //   if(ele.students.length === max) {accum.push(ele)};
  //   return accum;
  // }, []);

  //select first ele as the most popular school
  const popularSchool = {
    ...schools.find(ele => ele.students.length === maxStudents)
  };

  //calculate the avg. GPA for each school
  schools.forEach(school => {
    const noOfStudents = school.students.length;
    const sumOfGPA = school.students.reduce(
      (accum, ele) => (accum += ele.GPA * 1),
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
    schools,
    students,
    count_schools: schools.length,
    count_students: students.length,
    popularSchool,
    maxStudents,
    topSchool,
    maxGPA
  };
};

export default connect(mapStateToProps)(Nav);
