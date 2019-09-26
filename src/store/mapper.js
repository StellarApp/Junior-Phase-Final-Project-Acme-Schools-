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


export default mapStateToProps