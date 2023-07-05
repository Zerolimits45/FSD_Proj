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
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        license: {
            type: DataTypes.STRING,
            allowNull: false
        },
    })
    return Car;
}