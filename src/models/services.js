export default (sequelize, DataTypes) => {
    const Services = sequelize.define( 'Services', {
        id:{
            type:DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,

        },
        cost: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false
        }
    },

    {
        tableName: 'services',
        timestamps: false
    }
)


 return Services;
}
