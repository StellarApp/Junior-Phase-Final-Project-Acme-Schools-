const conn = require("./conn");
const School = require("./School");
const Student = require("./Student");
const faker = require("faker");

Student.belongsTo(School);
School.hasMany(Student);

const syncAndSeed = async () => {
  await conn.sync({ force: false});
  //https://www.spellbrand.com/top-10-american-university-college-logos
  const schools = [{name:"Not Enrolled"},
  {name: "Yale", imgURL: "img url" },
  {name: "NYU", imgURL: "img url" },
  {name: "Princeton", imgURL: "img url" },
  {name: "MIT", imgURL: "img url" },
  {name: "CUNY", imgURL: "img url" },
  {name: "Arizona State", imgURL: "img url" },
  {name: "Penn State", imgURL: "img url" },
  {name: "Indiana", imgURL: "img url" },
  {name: "UCLA", imgURL: "img url" },
  {name: "Columbia", imgURL: "img url" }]

  const school_data = await Promise.all(
    schools.map(school => School.create(school))
  );
  // console.log(`data is here----------->`, school_data[0].dataValues.id)

  const students = new Array(10).fill("").map((ele) => {
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
