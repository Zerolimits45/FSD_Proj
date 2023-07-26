module.exports = (sequelize, DataTypes) => {
    const Car = sequelize.define("Car", {
        startDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        endDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        model: {
            type: DataTypes.STRING,
            allowNull: false
        },
        make: {
            type: DataTypes.STRING,
            allowNull: false
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        gear: {
            type: DataTypes.STRING,
            allowNull: false
        },
        seats: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false
        },
        license: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userid: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    })

    Car.associate = models => {
        Car.belongsTo(models.User, { foreignKey: 'userid', as: 'user' })
        Car.hasMany(models.Booking, { foreignKey: 'carid', onDelete: 'cascade' })
    }

    return Car;
}