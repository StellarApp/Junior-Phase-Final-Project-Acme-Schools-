const conn = require('./conn');
const {Sequelize} = conn;
const {UUID, UUIDV4, STRING, DECIMAL } = Sequelize;

const def_id = {
    type: UUID,
    defaultValue:UUIDV4,
    primaryKey: true
}

const Student = conn.define('student', {
    id: def_id,
    firstName: {
        type: STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    lastName : {
        type: STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    email: {
        type: STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    GPA:  {
        type: STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
    // ,
    // enrolledAt: {
    //     type: STRING,
    //     allowNull: false,
    //     validate: {
    //         notEmpty: true
    //     }
    // }
})

module.exports = Student;