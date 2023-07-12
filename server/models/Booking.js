module.exports = (sequelize, DataTypes) => {
    const Booking = sequelize.define("Booking", {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        startdate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        enddate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        licencenumber: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
    return Booking
}