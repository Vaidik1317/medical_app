module.exports = (sequelize , DataTypes) => {
const Patient = sequelize.define('Patient', {
    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dob: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    contact: {
        type: DataTypes.STRING,
        allowNull: true
    },
    email : {
        type: DataTypes.STRING,
        allowNull: true,
        unique : true,
        validate: {isEmail: true}
    },

    password: {
        type: DataTypes.STRING,
        allowNull: true
    }
},
{
    tableName: 'patients',
    timestamps: false
});

return Patient;

};
