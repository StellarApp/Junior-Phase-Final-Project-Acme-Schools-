const conn = require("./conn");
const School = require("./School");
const Student = require("./Student");
const faker = require("faker");

Student.belongsTo(School);
School.hasMany(Student);

const syncAndSeed = async () => {
  await conn.sync({ force: true});
  //https://www.spellbrand.com/top-10-american-university-college-logos
  const schools = [
  {name:"Not Enrolled", imgURL: ''},
  {name: "Yale", imgURL: "https://www.spellbrand.com/images/blog/images/yale-university-logo-design.jpg" },
  {name: "Howard", imgURL: "https://www.spellbrand.com/images/blog/images/howard-university-logo-design.jpg" },
  {name: "Princeton", imgURL: "https://www.spellbrand.com/images/blog/images/princeton-university-logo-design.jpg" },
  {name: "Penn State", imgURL: "https://www.spellbrand.com/images/blog/images/penn-state-university-logo-design.jpg" },
  {name: "CUNY", imgURL: "https://www.spellbrand.com/images/blog/images/city-university-new-york-logo-design.jpg" },
  {name: "Arizona State", imgURL: "https://www.spellbrand.com/images/blog/images/arizona-state-university-logo-design.jpg" },
  {name: "Indiana", imgURL: "https://www.spellbrand.com/images/blog/images/indiana-university-logo-design.jpg" },
  {name: "Central Florida", imgURL: "https://www.spellbrand.com/images/blog/images/university-of-central-florida-logo-design.jpg" },
  {name: "Dartmouth College", imgURL: "https://www.spellbrand.com/images/blog/images/dartmouth-college-logo-design.jpg" },
  {name: "Washington State", imgURL: "https://www.spellbrand.com/images/blog/images/washington-state-university-logo-design.jpg" }]

  const school_data = await Promise.all(
    schools.map(school => School.create(school))
  );
  // console.log(`data is here----------->`, school_data[0].dataValues.id)

  const students = new Array(17).fill("").map((ele) => {
    let i = Math.floor(Math.random()* 10)
    return {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      GPA: Math.floor(Math.random() * 40)/10,
      schoolId: school_data[i].dataValues.id
    };
  });

  await Promise.all(students.map(student => Student.create(student)));
};

// syncAndSeed();
module.exports = {
  syncAndSeed,
  models: {
    Student,
    School
  }
};
