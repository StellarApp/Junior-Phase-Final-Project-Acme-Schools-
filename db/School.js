const conn = require('./conn');
const {Sequelize} = conn;
const {UUID, UUIDV4, STRING, DECIMAL } = Sequelize;

const def_id = {
    type: UUID,
    defaultValue:UUIDV4,
    primaryKey: true
}

const def_str = {
    type: STRING,
    allowNull: false,
    validate: {
        notEmpty: true
    }
}

const School = conn.define('school', {
    id: def_id,
    name: def_str,
    imgURL: {
        type: STRING,
        validation: {
            allowNull:true
        }
    }
})

module.exports = School;